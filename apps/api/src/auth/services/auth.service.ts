import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { UsersService } from "@/users/services/users.service";
import { MailService } from "@/mail/mail.service";

import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

import { UserDocument } from "@/users/schemas/user.schema";
import { EmployeesRepository } from "@/employees/repositories/employees.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly employeesRepository: EmployeesRepository,
  ) { }

  // =====================================================
  // Register
  // =====================================================

  async createUser(dto: RegisterDto) {
    const exists =
      await this.usersService.existsByEmail(
        dto.email,
      );

    if (exists) {
      throw new BadRequestException(
        "Email already exists.",
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    const user =
      await this.usersService.createUser({
        ...dto,

        password: hashedPassword,

        isVerified: false,

        mustChangePassword: false,
      });

    const token = randomUUID();

    const expires =
      new Date(
        Date.now() +
        1000 * 60 * 60 * 24,
      );

    await this.usersService.updateVerificationToken(
      String(user._id),
      token,
      expires,
    );

    await this.mailService.sendVerificationEmail(
      user,
    );

    return {
      success: true,

      message:
        "Account created successfully. Verification email sent.",
    };
  }


  // =====================================================
  // Login
  // =====================================================

  async login(dto: LoginDto) {
    const user =
      await this.usersService.findByEmailWithPassword(
        dto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }


    if (
      user.lockUntil &&
      user.lockUntil > new Date()
    ) {
      throw new ForbiddenException(
        "Account temporarily locked.",
      );
    }


    const matched =
      await bcrypt.compare(
        dto.password,
        user.password,
      );


    if (!matched) {
      await this.usersService.incrementLoginAttempts(
        String(user._id),
      );

      throw new UnauthorizedException(
        "Invalid email or password.",
      );
    }


    await this.usersService.resetLoginAttempts(
      String(user._id),
    );


    await this.usersService.updateLastLogin(
      String(user._id),
    );


    const accessToken =
      await this.generateAccessToken(user);


    const refreshToken =
      await this.generateRefreshToken(user);


    const hashedRefresh =
      await bcrypt.hash(
        refreshToken,
        10,
      );


    await this.usersService.updateRefreshToken(
      String(user._id),
      hashedRefresh,
    );
    const employee =
      await this.employeesRepository.findByUserId(
        String(user._id),
      );

    return {
      success: true,

      data: {
        accessToken,

        refreshToken,

        mustChangePassword:
          user.mustChangePassword,

        user: {
          id: user.id,

          employeeId:
            employee?.employeeId ?? "",

          firstName:
            user.firstName,

          lastName:
            user.lastName,

          email:
            user.email,

          avatar:
            user.avatar,

          role:
            user.role,

          isVerified:
            user.isVerified,

          mustChangePassword:
            user.mustChangePassword,
        },
      },
    };
  }


  // =====================================================
  // Forgot Password
  // =====================================================

  async forgotPassword(email: string) {
    const user =
      await this.usersService.findByEmail(
        email,
      );


    if (!user) {
      return {
        success: true,
      };
    }


    const token =
      randomUUID();


    const expires =
      new Date(
        Date.now() +
        1000 * 60 * 60,
      );


    await this.usersService.savePasswordResetToken(
      String(user._id),

      token,

      expires,
    );


    await this.mailService.sendResetPasswordEmail(
      user,

      token,
    );


    return {
      success: true,
    };
  }


  // =====================================================
  // Reset Password
  // =====================================================

  async resetPassword(
    token: string,

    password: string,
  ) {
    const user =
      await this.usersService.findByPasswordResetToken(
        token,
      );


    if (!user) {
      throw new BadRequestException(
        "Invalid token.",
      );
    }


    if (
      user.passwordResetExpires &&
      user.passwordResetExpires <
      new Date()
    ) {
      throw new BadRequestException(
        "Token expired.",
      );
    }


    const hashed =
      await bcrypt.hash(
        password,
        10,
      );


    await this.usersService.updatePassword(
      String(user._id),

      hashed,
    );


    return {
      success: true,

      message:
        "Password updated.",
    };
  }


  // =====================================================
  // Verify Email
  // =====================================================

  async verifyEmail(token: string) {
    const user =
      await this.usersService.findByVerificationToken(
        token,
      );


    if (!user) {
      throw new BadRequestException(
        "Invalid verification link.",
      );
    }


    await this.usersService.verifyEmail(
      String(user._id),
    );


    return {
      success: true,

      message:
        "Email verified.",
    };
  }


  // =====================================================
  // Refresh
  // =====================================================

  async refresh(refreshToken: string) {
    const payload =
      await this.jwtService.verifyAsync(
        refreshToken,

        {
          secret:
            this.configService.get(
              "JWT_REFRESH_SECRET",
            ),
        },
      );


    const user =
      await this.usersService.findById(
        payload.sub,
      );


    if (!user) {
      throw new UnauthorizedException();
    }


    const access =
      await this.generateAccessToken(user);


    const refresh =
      await this.generateRefreshToken(user);


    const hash =
      await bcrypt.hash(
        refresh,
        10,
      );


    await this.usersService.updateRefreshToken(
      user.id,

      hash,
    );


    return {
      accessToken: access,

      refreshToken: refresh,
    };
  }


  // =====================================================
  // Logout
  // =====================================================

  async logout(userId: string) {
    await this.usersService.clearRefreshToken(
      userId,
    );


    return {
      success: true,
    };
  }


  // =====================================================
  // Current User
  // =====================================================

  async me(userId: string) {
    const user =
      await this.usersService.findById(
        userId,
      );


    if (!user) {
      throw new UnauthorizedException();
    }
    const employee =
      await this.employeesRepository.findByUserId(
        String(user._id),
      );

    return {
      success: true,

      data: {
        id: user.id,

        employeeId:
          employee?.employeeId ?? "",

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email,

        avatar:
          user.avatar,

        role:
          user.role,

        isVerified:
          user.isVerified,

        mustChangePassword:
          user.mustChangePassword,
      },
    };
  }


  // =====================================================
  // JWT
  // =====================================================

  private generateAccessToken(
    user: UserDocument,
  ) {
    return this.jwtService.signAsync({
      sub: String(user._id),

      email: user.email,

      role: user.role,
    });
  }


  private generateRefreshToken(
    user: UserDocument,
  ) {
    return this.jwtService.signAsync(
      {
        sub: String(user._id),

        email: user.email,

        role: user.role,
      },

      {
        secret:
          this.configService.get(
            "JWT_REFRESH_SECRET",
          ),

        expiresIn: "30d",
      },
    );
  }
}
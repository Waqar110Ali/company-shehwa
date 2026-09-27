import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { UsersService } from "@/users/services/users.service";
import { MailService } from "@/mail/mail.service";
import { Role } from "@/users/enums/role.enum";

import { TutorialRegisterDto } from "../dto/tutorial-register.dto";
import { generateTemporaryPassword } from "../utils/generate-password";

@Injectable()
export class TutorialsAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  // Public self-registration for the tutorial platform. Always
  // creates a STUDENT account — this is the only place that role
  // can come from, so the endpoint can never be used to create an
  // admin/employee account. The student never types their own
  // password: it's generated here and emailed to them (same
  // "welcome email with temporary password" flow already used for
  // company employees), and they're required to change it on
  // first login (mustChangePassword).
  async register(dto: TutorialRegisterDto) {
    const exists = await this.usersService.existsByEmail(dto.email);

    if (exists) {
      throw new BadRequestException(
        "An account with this email already exists.",
      );
    }

    const temporaryPassword = generateTemporaryPassword();

    const hashedPassword = await bcrypt.hash(
      temporaryPassword,
      10,
    );

    const user = await this.usersService.createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone ?? "",
      password: hashedPassword,
      role: Role.STUDENT,
      isVerified: false,
      mustChangePassword: true,
    });

    try {
      await this.mailService.sendWelcomeEmail(
        user,
        temporaryPassword,
      );
    } catch {
      // Mail delivery issues (e.g. SMTP not configured in this
      // environment) should never block account creation — the
      // account still exists, the admin can resend/share
      // credentials manually.
    }

    return {
      success: true,
      message:
        "Registration submitted. Check your email for your login password — you'll be asked to set a new one on first login.",
      data: {
        email: user.email,
      },
    };
  }
}
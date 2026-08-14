import {
  Injectable,
  Inject,
  forwardRef,
} from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { MailerService } from "@nestjs-modules/mailer";

import { v4 as uuid } from "uuid";

import { UsersService } from "@/users/services/users.service";

import { UserDocument } from "@/users/schemas/user.schema";

import { MailOptions } from "./interfaces/mail-options.interface";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    private readonly configService: ConfigService,

    @Inject(
      forwardRef(() => UsersService),
    )
    private readonly usersService: UsersService,
  ) {}

  // =====================================================
  // Generic Mail Sender
  // =====================================================

  async send(
    options: MailOptions,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: options.to,

      subject: options.subject,

      template: options.template,

      context: options.context,
    });
  }

  // =====================================================
  // Welcome Email
  // =====================================================

 // =====================================================
// Welcome Email
// =====================================================

async sendWelcomeEmail(
  user: UserDocument,
  temporaryPassword: string,
): Promise<void> {
  const verificationToken = uuid();

  await this.usersService.saveVerificationToken(
    user.id,
    verificationToken,
  );

  const verificationUrl =
    `${this.configService.get(
      "FRONTEND_URL",
    )}/verify-email/${verificationToken}`;

  await this.send({
    to: user.email,

    subject:
      "Welcome to AI Company",

    template: "welcome",

    context: {
      // User Information
      firstName: user.firstName,

      lastName: user.lastName,

      fullName: `${user.firstName} ${user.lastName}`,

      email: user.email,

      role: user.role,

      // Login Information
      password: temporaryPassword,

      // Verification
      verificationUrl,

      // Company Information
      companyName: "AI Company Management Platform",

      supportEmail: this.configService.get(
        "MAIL_FROM",
      ),
    },
  });
}

  // =====================================================
  // Password Reset
  // =====================================================

  async sendResetPasswordEmail(
    user: UserDocument,
    resetToken: string,
  ): Promise<void> {
    const resetUrl =
      `${this.configService.get(
        "FRONTEND_URL",
      )}/reset-password/${resetToken}`;

    await this.send({
      to: user.email,

      subject:
        "Reset Your Password",

      template:
        "reset-password",

      context: {
        firstName:
          user.firstName,

        fullName:
          `${user.firstName} ${user.lastName}`,

        resetUrl,
      },
    });
  }

  // =====================================================
  // Email Verification
  // =====================================================

  async sendVerificationEmail(
    user: UserDocument,
  ): Promise<void> {
    const verificationToken =
      uuid();

    await this.usersService.saveVerificationToken(
      user.id,
      verificationToken,
    );

    const verifyUrl =
      `${this.configService.get(
        "FRONTEND_URL",
      )}/verify-email/${verificationToken}`;

    await this.send({
      to: user.email,

      subject:
        "Verify Your Email",

      template:
        "verify-email",

      context: {
        firstName:
          user.firstName,

        fullName:
          `${user.firstName} ${user.lastName}`,

        verifyUrl,
      },
    });
  }
}
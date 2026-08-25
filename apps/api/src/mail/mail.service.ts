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

import {
  APP_NAME,
} from "./mail.constants";

@Injectable()
export class MailService {
  constructor(
    @Inject(MailerService)
    private readonly mailerService: MailerService,

    @Inject(ConfigService)
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
  try {
    console.log("[MAIL] Sending email", {
      to: options.to,
      subject: options.subject,
      template: options.template,
    });

    await this.mailerService.sendMail({
      to: options.to,
      subject: options.subject,
      template: options.template,
      context: options.context,
    });

    console.log("[MAIL] Email sent successfully");
  } catch (error) {
    console.error(
      "[MAIL] Failed to send email:",
      error,
    );

    throw error;
  }
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
  // Newsletter Subscription Notification (to company)
  // =====================================================

  private resolveNotifyEmail(): string {
    return (
      this.configService.get<string>(
        "NEWSLETTER_NOTIFY_EMAIL",
      ) ||
      this.configService.get<string>("MAIL_USER") ||
      ""
    );
  }

  private isMailConfigured(): boolean {
    return Boolean(
      this.configService.get<string>("MAIL_HOST") &&
        this.configService.get<string>("MAIL_USER") &&
        this.configService.get<string>("MAIL_PASSWORD"),
    );
  }

  async sendNewsletterSubscriptionNotification(
    subscriberEmail: string,
  ): Promise<void> {
    if (!this.isMailConfigured()) {
      console.warn(
        "[NEWSLETTER] SMTP not fully configured (MAIL_HOST/USER/PASSWORD) — skipping emails for",
        subscriberEmail,
      );
      return;
    }

    const notifyTo = this.resolveNotifyEmail();

    console.log(
      "[NEWSLETTER] New subscription:",
      subscriberEmail,
    );

    // Confirmation to the person who subscribed
    await this.send({
      to: subscriberEmail,
      subject: `You're subscribed to ${APP_NAME}`,
      template: "newsletter-confirmation",
      context: {
        subscriberEmail,
        companyName: APP_NAME,
      },
    });

    // Admin/company notification
    if (notifyTo) {
      console.log(
        "[NEWSLETTER] Notification recipient:",
        notifyTo,
      );

      await this.send({
        to: notifyTo,
        subject: "New Newsletter Subscriber",
        template: "newsletter-subscription",
        context: {
          subscriberEmail,
          companyName: APP_NAME,
        },
      });
    }
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
import {
  Injectable,
  Inject,
} from "@nestjs/common";

import { MailService } from "@/mail/mail.service";

@Injectable()
export class NewsletterService {
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {
    console.log(
      "[NEWSLETTER] NewsletterService initialized",
    );
  }

  async subscribe(email: string) {
    console.log(
      "========================================",
    );
    console.log(
      "[NEWSLETTER] subscribe() called",
    );
    console.log(
      "[NEWSLETTER] Email received:",
      email,
    );

    try {
      console.log(
        "[NEWSLETTER] Starting email notification...",
      );

      await this.mailService.sendNewsletterSubscriptionNotification(
        email,
      );

      console.log(
        "[NEWSLETTER] Email notification sent successfully",
      );

      const response = {
        success: true,
        message:
          "Thanks for subscribing! We'll keep you posted.",
      };

      console.log(
        "[NEWSLETTER] Returning response:",
        response,
      );

      console.log(
        "========================================",
      );

      return response;
    } catch (error: any) {
      console.error(
        "========================================",
      );
      console.error(
        "[NEWSLETTER] ❌ ERROR IN subscribe()",
      );
      console.error(
        "[NEWSLETTER] Email:",
        email,
      );
      console.error(
        "[NEWSLETTER] Error:",
        error,
      );
      console.error(
        "[NEWSLETTER] Error message:",
        error?.message,
      );
      console.error(
        "[NEWSLETTER] Error name:",
        error?.name,
      );
      console.error(
        "[NEWSLETTER] Error code:",
        error?.code,
      );
      console.error(
        "[NEWSLETTER] Error response:",
        error?.response,
      );
      console.error(
        "[NEWSLETTER] Error stack:",
        error?.stack,
      );
      console.error(
        "========================================",
      );

      throw error;
    }
  }
}
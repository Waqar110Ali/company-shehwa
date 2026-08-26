import { Inject, Injectable } from "@nestjs/common";

import { MailService } from "@/mail/mail.service";
import { NewsletterRepository } from "./repositories/newsletter.repository";

@Injectable()
export class NewsletterService {
  private readonly mailService: MailService;
  private readonly newsletterRepository: NewsletterRepository;

  constructor(
    @Inject(MailService)
    mailService: MailService,

    @Inject(NewsletterRepository)
    newsletterRepository: NewsletterRepository,
  ) {
    this.mailService = mailService;
    this.newsletterRepository = newsletterRepository;
  }

  async subscribe(email: string) {
    const normalized = email.toLowerCase().trim();

    const existing =
      await this.newsletterRepository.findByEmail(
        normalized,
      );

    if (existing) {
      return {
        success: true,
        message:
          "You're already subscribed. Thanks for staying with us.",
        alreadySubscribed: true,
      };
    }

    await this.newsletterRepository.create(
      normalized,
    );

    try {
      await this.mailService.sendNewsletterSubscriptionNotification(
        normalized,
      );
    } catch (error: any) {
      // Persist succeeded; SMTP may be missing in local/dev.
      console.error(
        "[NEWSLETTER] Notification email failed (subscriber saved):",
        error?.message ?? error,
      );
    }

    return {
      success: true,
      message:
        "Thanks for subscribing! We'll keep you posted.",
      alreadySubscribed: false,
    };
  }
}
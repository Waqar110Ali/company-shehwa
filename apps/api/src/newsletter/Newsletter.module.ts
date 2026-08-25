import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { NewsletterController } from "./Newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { NewsletterRepository } from "./repositories/newsletter.repository";
import { MailModule } from "@/mail/mail.module";
import {
  NewsletterSubscriberDoc,
  NewsletterSubscriberSchema,
} from "./schemas/newsletter-subscriber.schema";

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      {
        name: NewsletterSubscriberDoc.name,
        schema: NewsletterSubscriberSchema,
      },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [
    NewsletterService,
    NewsletterRepository,
  ],
})
export class NewsletterModule {}

import {
  Body,
  Controller,
  Inject,
  Post,
} from "@nestjs/common";

import { NewsletterService } from "./newsletter.service";
import { SubscribeNewsletterDto } from "./dto/subscribe-newsletter.dto";

@Controller("newsletter")
export class NewsletterController {
  private readonly service: NewsletterService;

  constructor(
    @Inject(NewsletterService)
    service: NewsletterService,
  ) {
    this.service = service;
  }

    @Post("subscribe")
  subscribe(
    @Body() dto: SubscribeNewsletterDto,
  ) {
    console.log(
      "[NEWSLETTER DEBUG v3] this.service is:",
      this.service,
      "| typeof:",
      typeof this.service,
    );
    return this.service.subscribe(dto.email);
  }
}
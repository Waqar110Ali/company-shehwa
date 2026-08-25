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
  constructor(
    @Inject(NewsletterService)
    private readonly service: NewsletterService,
  ) {}

  @Post("subscribe")
  subscribe(
    @Body() dto: SubscribeNewsletterDto,
  ) {
    return this.service.subscribe(dto.email);
  }
}
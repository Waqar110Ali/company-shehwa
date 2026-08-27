import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from "@nestjs/common";

import { CalcomService } from "./calcom.service";
import { CreateCalBookingDto } from "./dto/create-cal-booking.dto";
import { GetCalSlotsDto } from "./dto/get-cal-slots.dto";

@Controller("calcom")
export class CalcomController {
  constructor(
    @Inject(CalcomService)
    private readonly calcomService: CalcomService,
  ) {}

  @Get("config")
  getConfig() {
    return this.calcomService.getPublicConfig();
  }

  @Get("slots")
  getSlots(@Query() query: GetCalSlotsDto) {
    return this.calcomService.getSlots(query.start, query.end);
  }

  @Post("bookings")
  createBooking(@Body() dto: CreateCalBookingDto) {
    return this.calcomService.createBooking(dto);
  }
}

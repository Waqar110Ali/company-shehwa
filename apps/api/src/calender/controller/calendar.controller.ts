import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards, Inject } from "@nestjs/common";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

import { CalendarService } from "../service/calendar.service";

import { CreateCalendarEventDto } from "../dto/create-calendar-event.dto";
import { UpdateCalendarEventDto } from "../dto/update-calendar-event.dto";
import { CalendarFilterDto } from "../dto/calendar-filter.dto";

@UseGuards(JwtAuthGuard)
@Controller("calendar")
export class CalendarController {
  constructor(
    @Inject(CalendarService) private readonly calendarService: CalendarService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateCalendarEventDto,
  ) {
    return this.calendarService.create(
      dto,
    );
  }

  @Get()
  findAll(
    @Query()
    filter: CalendarFilterDto,
  ) {
    return this.calendarService.findAll(
      filter,
    );
  }

  @Get("statistics")
  statistics() {
    return this.calendarService.statistics();
  }

  @Get("upcoming")
  upcoming() {
    return this.calendarService.upcoming();
  }

  @Get(":id")
  findOne(
    @Param("id")
    id: string,
  ) {
    return this.calendarService.findOne(
      id,
    );
  }

  @Patch(":id")
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateCalendarEventDto,
  ) {
    return this.calendarService.update(
      id,
      dto,
    );
  }

  @Delete(":id")
  remove(
    @Param("id")
    id: string,
  ) {
    return this.calendarService.remove(
      id,
    );
  }
}
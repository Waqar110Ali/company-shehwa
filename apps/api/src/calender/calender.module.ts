import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import {
  CalendarEvent,
  CalendarEventSchema,
} from "./schemas/calendar-event.schema";

import { CalendarController } from "./controller/calendar.controller";

import { CalendarService } from "./service/calendar.service";

import { CalendarRepository } from "./repository/calendar.repository";

import { CalendarMapper } from "./mapper/calendar.mapper";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CalendarEvent.name,
        schema:
          CalendarEventSchema,
      },
    ]),
  ],

  controllers: [
    CalendarController,
  ],

  providers: [
    CalendarRepository,
    CalendarMapper,
    CalendarService,
  ],

  exports: [
    CalendarService,
    CalendarRepository,
  ],
})
export class CalendarModule {}
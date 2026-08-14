import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsHexColor,
  IsMongoId,
  IsOptional,
  IsString,
} from "class-validator";

import { CalendarEventType } from "../enums/calendar-event-type.enum";

export class CreateCalendarEventDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(CalendarEventType)
  type!: CalendarEventType;

  @IsDateString()
  date!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({
    each: true,
  })
  attendees?: string[];

  @IsOptional()
  @IsHexColor()
  color?: string;
}
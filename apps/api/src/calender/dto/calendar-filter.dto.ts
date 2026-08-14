import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

import { CalendarEventType } from "../enums/calendar-event-type.enum";

export class CalendarFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CalendarEventType)
  type?: CalendarEventType;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  order?: "asc" | "desc";
}
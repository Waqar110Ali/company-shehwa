import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from "class-validator";

import { AttendanceStatus } from "../enums/attendance-status.enum";

export class CreateAttendanceDto {
  @IsMongoId()
  employee!: string;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  checkIn?: string;

  @IsOptional()
  @IsString()
  checkOut?: string;

  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;
}
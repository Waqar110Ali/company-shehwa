import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import {
  Transform,
  Type,
} from "class-transformer";

import { EmploymentType } from "../enums/employment-type.enum";
import { EmployeeStatus } from "../enums/employee-status.enum";

export class EmployeeQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsString()
  department?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsString()
  designation?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsString()
  sortBy: string = "createdAt";

  @IsOptional()
  @Transform(({ value }) =>
    value === "" ? undefined : value,
  )
  @IsIn(["asc", "desc"])
  order: "asc" | "desc" = "desc";
}
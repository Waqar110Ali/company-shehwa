import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

import { ProjectPriority } from "../enums/project-priority.enum";
import { ProjectStatus } from "../enums/project-status.enum";

export class ProjectQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsEnum(ProjectPriority)
  priority?: ProjectPriority;

  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc" = "desc";
}
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

import {
  ProjectPriority,
} from "../enums/project-priority.enum";

import {
  ProjectStatus,
} from "../enums/project-status.enum";

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsEnum(ProjectPriority)
  priority?: ProjectPriority;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  members?: string[];
}
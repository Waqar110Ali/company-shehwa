import {
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

import {
  IsInt,
  Min,
} from "class-validator";

import { FileType } from "../enums/file-type.enum";

export class FileQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(FileType)
  type?: FileType;

  @IsOptional()
  @IsString()
  parentFolder?: string;

  @IsOptional()
  favorite?: string;
}
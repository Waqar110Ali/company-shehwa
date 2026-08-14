import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from "class-validator";

import { FileType } from "../enums/file-type.enum";

export class UploadFileDto {
  @IsString()
  name!: string;

  @IsEnum(FileType)
  type!: FileType;

  @IsOptional()
  @IsMongoId()
  parentFolder?: string;
}
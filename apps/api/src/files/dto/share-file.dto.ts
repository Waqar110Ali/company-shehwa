import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
} from "class-validator";

export class ShareFileDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({
    each: true,
  })
  employeeIds!: string[];
}
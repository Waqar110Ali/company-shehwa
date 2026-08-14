import {
  IsMongoId,
  IsOptional,
} from "class-validator";

export class MoveFileDto {
  @IsOptional()
  @IsMongoId()
  parentFolder?: string;
}
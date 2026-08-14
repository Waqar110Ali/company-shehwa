import {
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateFolderDto {
  @IsString()
  @Length(1, 120)
  name!: string;

  @IsOptional()
  @IsMongoId()
  parentFolder?: string;
}
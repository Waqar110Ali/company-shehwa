import {
  IsString,
  Length,
} from "class-validator";

export class RenameFileDto {
  @IsString()
  @Length(1, 120)
  name!: string;
}
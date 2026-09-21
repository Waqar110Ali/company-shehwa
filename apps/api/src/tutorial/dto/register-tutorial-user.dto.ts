import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterTutorialUserDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

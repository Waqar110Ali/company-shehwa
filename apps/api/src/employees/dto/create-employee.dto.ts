import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  IsMongoId,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

import { EmploymentType } from "../enums/employment-type.enum";
import { EmployeeStatus } from "../enums/employee-status.enum";
import { Gender } from "../enums/gender.enum";
import { Role } from "@/users/enums/role.enum";

export class CreateEmployeeDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(2)
  designation!: string;

  @IsString()
  @MinLength(2)
  department!: string;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  cnic?: string;

  // NOTE: form fields arrive as strings over multipart/form-data now
  // (since the request also carries the avatar file), so numeric
  // fields need an explicit @Type(() => Number) to be coerced before
  // @IsNumber() validates them.

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @IsOptional()
  @IsMongoId()
  user?: string;

  /*
   * Fields required by the current frontend
   *
   * `avatar` is intentionally NOT a field here anymore. The profile
   * picture can only be set by uploading an actual image file (the
   * "avatar" multipart field the controller pulls out via
   * FileInterceptor) — there is no free-text avatar-link input.
   */

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  performance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  attendance?: number;

  @IsOptional()
  @IsDateString()
  joinedAt?: string;

  @IsEnum(Role)
  role!: Role;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    {
      message:
        "Password must contain uppercase, lowercase and number",
    },
  )
  password!: string;
}
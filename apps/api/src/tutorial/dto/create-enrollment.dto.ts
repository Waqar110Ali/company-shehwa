import { IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateEnrollmentDto {
  @IsMongoId()
  courseId!: string;

  @IsOptional()
  @IsString()
  note?: string;
}
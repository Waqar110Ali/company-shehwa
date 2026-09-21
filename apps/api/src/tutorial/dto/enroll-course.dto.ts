import { IsString } from "class-validator";

export class EnrollCourseDto {
  @IsString()
  userId!: string;

  @IsString()
  courseId!: string;
}

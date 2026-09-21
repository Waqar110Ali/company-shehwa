import { IsString } from "class-validator";

export class WatchLectureDto {
  @IsString()
  userId!: string;

  @IsString()
  courseId!: string;

  @IsString()
  lectureId!: string;
}

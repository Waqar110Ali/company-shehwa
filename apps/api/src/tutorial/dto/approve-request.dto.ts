import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ApproveRequestDto {
  // Optional override — lets an admin grant a different amount of
  // coins than the student requested on a top-up (e.g. partial
  // payment, a rounding adjustment, or a bonus).
  @IsOptional()
  @IsNumber()
  @Min(0)
  coinsGranted?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SubmitPaymentDto {
  @IsString()
  userId!: string;

  @IsString()
  courseId!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  paymentMethod!: string;

  @IsOptional()
  @IsString()
  screenshotUrl?: string;
}

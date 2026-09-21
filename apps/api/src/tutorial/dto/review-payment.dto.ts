import { IsIn, IsOptional, IsString } from "class-validator";

export class ReviewPaymentDto {
  @IsIn(["approved", "rejected"])
  status!: "approved" | "rejected";

  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @IsOptional()
  @IsString()
  reviewedBy?: string;
}

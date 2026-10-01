import { IsOptional, IsString } from "class-validator";

export class UpdatePaymentSettingsDto {
  @IsOptional()
  @IsString()
  qrCodeUrl?: string;

  @IsOptional()
  @IsString()
  accountTitle?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}

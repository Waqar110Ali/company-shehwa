import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateTopupDto {
  @IsNumber()
  @Min(1)
  coinsRequested!: number;

  @IsOptional()
  @IsString()
  note?: string;
}

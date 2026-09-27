import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class AddVideoDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  videoUrl!: string;

  @IsNumber()
  @Min(0)
  durationMinutes!: number;

  @IsNumber()
  @Min(0)
  coinCost!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
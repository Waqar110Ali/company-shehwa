import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class CreateCourseDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  priceLabel?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  coinsIncluded?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
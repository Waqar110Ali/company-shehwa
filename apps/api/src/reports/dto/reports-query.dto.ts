import {
  IsInt,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class ReportsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(24)
  months?: number = 12;
}
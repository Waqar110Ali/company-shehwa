import { IsNotEmpty, IsString, Matches } from "class-validator";

export class GetCalSlotsDto {
  /** Inclusive range start — `YYYY-MM-DD` or ISO datetime */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, {
    message: "start must be a date (YYYY-MM-DD) or ISO datetime",
  })
  start!: string;

  /** Inclusive range end — `YYYY-MM-DD` or ISO datetime */
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}/, {
    message: "end must be a date (YYYY-MM-DD) or ISO datetime",
  })
  end!: string;
}

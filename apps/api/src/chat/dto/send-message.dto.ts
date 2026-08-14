import { Transform } from "class-transformer";
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { MessageType } from "../enums/message-status.enum";

export class SendMessageDto {
  @IsMongoId()
  conversationId!: string;

  @Transform(({ value }) =>
    String(value).toUpperCase(),
  )
  @IsEnum(MessageType)
  type: MessageType = MessageType.TEXT;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content: string = "";

  @IsOptional()
  @IsString()
  attachment?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsMongoId()
  replyTo?: string;
}
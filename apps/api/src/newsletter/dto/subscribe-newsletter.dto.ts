import { IsEmail, IsNotEmpty } from "class-validator";

export class SubscribeNewsletterDto {
  @IsEmail(
    {},
    { message: "Please enter a valid email address." },
  )
  @IsNotEmpty()
  email!: string;
}
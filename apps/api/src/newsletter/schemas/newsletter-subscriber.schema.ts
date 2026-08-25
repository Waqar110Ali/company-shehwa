import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
  timestamps: true,
  collection: "newsletter_subscribers",
})
export class NewsletterSubscriberDoc {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  email!: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  active!: boolean;
}

export type NewsletterSubscriberDocument =
  HydratedDocument<NewsletterSubscriberDoc>;

export const NewsletterSubscriberSchema =
  SchemaFactory.createForClass(
    NewsletterSubscriberDoc,
  );

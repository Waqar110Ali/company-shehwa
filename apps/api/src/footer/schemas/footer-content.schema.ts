import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class FooterContentDoc {
  @Prop({ type: Object, required: true })
  content!: Record<string, any>;
}

export type FooterContentDocument = HydratedDocument<FooterContentDoc>;
export const FooterContentSchema = SchemaFactory.createForClass(FooterContentDoc);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TutorialPaymentRequestDocument = HydratedDocument<TutorialPaymentRequest>;

@Schema({ timestamps: true })
export class TutorialPaymentRequest {
  @Prop({ type: String, required: true })
  userId!: string;

  @Prop({ type: String, required: true })
  courseId!: string;

  @Prop({ type: Number, required: true })
  amount!: number;

  @Prop({ type: String, required: true })
  paymentMethod!: string;

  @Prop({ type: String, default: "" })
  screenshotUrl!: string;

  @Prop({ type: String, default: "pending" })
  status!: "pending" | "approved" | "rejected";

  @Prop({ type: String, default: "" })
  rejectionReason!: string;

  @Prop({ type: String, default: "" })
  reviewedBy!: string;
}

export const TutorialPaymentRequestSchema = SchemaFactory.createForClass(TutorialPaymentRequest);

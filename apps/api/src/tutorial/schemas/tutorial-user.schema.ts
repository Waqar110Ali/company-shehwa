import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TutorialUserDocument = HydratedDocument<TutorialUser>;

@Schema({ timestamps: true })
export class TutorialUser {
  @Prop({ type: String, required: true, trim: true })
  fullName!: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, default: "" })
  phone!: string;

  @Prop({ type: String, default: "" })
  city!: string;

  @Prop({ type: String, default: "pending" })
  status!: "pending" | "approved" | "rejected";

  @Prop({ type: Boolean, default: false })
  hasAccess!: boolean;

  @Prop({ type: Boolean, default: false })
  isPaymentVerified!: boolean;

  @Prop({ type: Number, default: 0 })
  coins!: number;

  @Prop({ type: [{ courseId: String, enrolledAt: Date, isActive: Boolean }], default: [] })
  enrollments!: Array<{ courseId: string; enrolledAt: Date; isActive: boolean }>;

  @Prop({ type: [{ paymentId: String, createdAt: Date }], default: [] })
  paymentHistory!: Array<{ paymentId: string; createdAt: Date }>;
}

export const TutorialUserSchema = SchemaFactory.createForClass(TutorialUser);

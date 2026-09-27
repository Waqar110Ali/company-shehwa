import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

import {
  PaymentRequestStatus,
  PaymentRequestType,
} from "../enums/payment-request-enums";

export type PaymentRequestDocument =
  HydratedDocument<PaymentRequest>;

// A single request created whenever a student submits payment
// proof — either to enroll in a course, or to top up their wallet.
// Admins review these; nothing here is ever mutated by the student
// once submitted, only by AdminReviewService.
@Schema({ timestamps: true })
export class PaymentRequest {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user!: Types.ObjectId;

  @Prop({
    type: String,
    enum: PaymentRequestType,
    required: true,
  })
  type!: PaymentRequestType;

  // Only set for ENROLLMENT requests.
  @Prop({ type: Types.ObjectId, ref: "Course", default: null })
  course?: Types.ObjectId | null;

  // Only set for TOPUP requests — how many coins the student says
  // they paid for.
  @Prop({ type: Number, default: null })
  coinsRequested?: number | null;

  // Filled in once approved — how many coins were actually granted
  // (course bonus, or the approved top-up amount).
  @Prop({ type: Number, default: null })
  coinsGranted?: number | null;

  @Prop({ type: String, default: "" })
  note!: string;

  @Prop({ type: String, required: true })
  proofUrl!: string;

  @Prop({ type: String, default: "" })
  proofPublicId!: string;

  @Prop({
    type: String,
    enum: PaymentRequestStatus,
    default: PaymentRequestStatus.PENDING,
  })
  status!: PaymentRequestStatus;

  @Prop({ type: Types.ObjectId, ref: "User", default: null })
  reviewedBy?: Types.ObjectId | null;

  @Prop({ type: Date, default: null })
  reviewedAt?: Date | null;

  @Prop({ type: String, default: "" })
  reviewNote?: string;

  @Prop({ type: String, default: "" })
  rejectionReason?: string;
}

export const PaymentRequestSchema =
  SchemaFactory.createForClass(PaymentRequest);

PaymentRequestSchema.index({ status: 1, type: 1, createdAt: -1 });
PaymentRequestSchema.index({ user: 1, createdAt: -1 });
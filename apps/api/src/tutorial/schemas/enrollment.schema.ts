import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

import { EnrollmentStatus } from "../enums/Enrollment-status-enums";

export type EnrollmentDocument = HydratedDocument<Enrollment>;

// One document per (user, course) pair — tracks whether this
// particular student currently has access to this particular
// course. Kept separate from the payment request so the review
// history (possibly several attempts) doesn't have to live on the
// access record itself.
@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Course", required: true })
  course!: Types.ObjectId;

  @Prop({
    type: String,
    enum: EnrollmentStatus,
    default: EnrollmentStatus.PENDING,
  })
  status!: EnrollmentStatus;

  @Prop({ type: Date, default: null })
  approvedAt?: Date | null;
}

export const EnrollmentSchema =
  SchemaFactory.createForClass(Enrollment);

EnrollmentSchema.index(
  { user: 1, course: 1 },
  { unique: true },
);
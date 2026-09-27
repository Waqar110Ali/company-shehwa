import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

// =====================================================
// Video (lecture) — embedded inside a course. Each video
// has its own coin cost, so students unlock them one at a
// time by spending coins from their wallet.
// =====================================================

@Schema({ _id: true, timestamps: false })
export class CourseVideo {
  _id!: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  title!: string;

  @Prop({ type: String, default: "", trim: true })
  description!: string;

  @Prop({ type: String, required: true })
  videoUrl!: string;

  @Prop({ type: Number, required: true, default: 0 })
  durationMinutes!: number;

  // 0 = free preview, always watchable once enrolled.
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  coinCost!: number;

  @Prop({ type: Number, required: true, default: 0 })
  order!: number;
}

export const CourseVideoSchema =
  SchemaFactory.createForClass(CourseVideo);

// =====================================================
// Course
// =====================================================

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: String, required: true, trim: true })
  title!: string;

  @Prop({ type: String, default: "", trim: true })
  description!: string;

  @Prop({ type: String, default: "" })
  thumbnailUrl!: string;

  // Human-readable price shown to the student on the course card
  // and the payment page (e.g. "PKR 2,500"). The actual amount is
  // verified manually by an admin against the payment proof, so
  // this is a label, not a billing amount.
  @Prop({ type: String, default: "" })
  priceLabel!: string;

  // Coins credited to the wallet automatically the moment
  // enrollment is approved (a signup bonus for this course).
  @Prop({ type: Number, default: 0, min: 0 })
  coinsIncluded!: number;

  @Prop({ type: [CourseVideoSchema], default: [] })
  videos!: CourseVideo[];

  // Draft courses never show up on the public /tutorials/courses
  // list or the student dashboard.
  @Prop({ type: Boolean, default: false })
  isPublished!: boolean;

  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy?: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
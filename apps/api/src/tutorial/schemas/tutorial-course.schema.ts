import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TutorialCourseDocument = HydratedDocument<TutorialCourse>;

@Schema({ timestamps: true })
export class TutorialLecture {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: Number, required: true })
  duration!: number;

  @Prop({ type: Number, default: 0 })
  coinCost!: number;

  @Prop({ type: String, default: "" })
  videoUrl!: string;

  @Prop({ type: Boolean, default: false })
  isUnlocked!: boolean;

  @Prop({ type: Boolean, default: false })
  watched!: boolean;
}

@Schema({ timestamps: true })
export class TutorialCourse {
  @Prop({ type: String, required: true, trim: true })
  title!: string;

  @Prop({ type: String, required: true, trim: true })
  description!: string;

  @Prop({ type: Number, required: true, default: 0 })
  price!: number;

  @Prop({ type: Number, default: 0 })
  rewardCoins!: number;

  @Prop({ type: [TutorialLecture], default: [] })
  lectures!: TutorialLecture[];
}

export const TutorialLectureSchema = SchemaFactory.createForClass(TutorialLecture);
export const TutorialCourseSchema = SchemaFactory.createForClass(TutorialCourse);

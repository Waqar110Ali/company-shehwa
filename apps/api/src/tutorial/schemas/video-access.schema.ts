import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

export type VideoAccessDocument = HydratedDocument<VideoAccess>;

// Created once, the first time a student spends coins to unlock a
// video. Its existence IS the unlock — checked before ever
// charging coins again for the same video, so re-watching is free.
@Schema({ timestamps: true })
export class VideoAccess {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Course", required: true })
  course!: Types.ObjectId;

  // Sub-document id of the video inside Course.videos — stored as
  // a plain string since it's compared against route params.
  @Prop({ type: String, required: true })
  videoId!: string;

  @Prop({ type: Number, required: true, default: 0 })
  coinsSpent!: number;
}

export const VideoAccessSchema =
  SchemaFactory.createForClass(VideoAccess);

VideoAccessSchema.index(
  { user: 1, videoId: 1 },
  { unique: true },
);

import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

export type VideoAccessDocument =
  HydratedDocument<VideoAccess>;

// Once a student spends coins to unlock a video, we record it here
// so they never get charged again for the same video and can
// rewatch it anytime from their dashboard.

@Schema({
  timestamps: true,
})
export class VideoAccess {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  user!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: "Course",
    required: true,
  })
  course!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  videoId!: string;

  @Prop({
    type: Number,
    default: 0,
  })
  coinsSpent!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const VideoAccessSchema =
  SchemaFactory.createForClass(VideoAccess);

VideoAccessSchema.index(
  {
    user: 1,
    videoId: 1,
  },
  {
    unique: true,
  },
);
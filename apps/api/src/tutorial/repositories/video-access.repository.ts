import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  VideoAccess,
  VideoAccessDocument,
} from "../schemas/video-access.schema";

@Injectable()
export class VideoAccessRepository {
  constructor(
    @InjectModel(VideoAccess.name)
    private readonly videoAccessModel: Model<VideoAccessDocument>,
  ) {}

  async findOne(userId: string, videoId: string) {
    return this.videoAccessModel
      .findOne({ user: userId, videoId })
      .exec();
  }

  async findAllForUserAndCourse(userId: string, courseId: string) {
    return this.videoAccessModel
      .find({ user: userId, course: courseId })
      .exec();
  }

  async create(data: Partial<VideoAccess>) {
    return this.videoAccessModel.create(data);
  }
}
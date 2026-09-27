import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Course, CourseDocument } from "../schemas/course.schema";

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) {}

  async create(data: Partial<Course>) {
    return this.courseModel.create(data);
  }

  async findAll() {
    return this.courseModel.find().sort({ createdAt: -1 }).exec();
  }

  async findPublished() {
    return this.courseModel
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.courseModel.findById(id).exec();
  }

  async update(id: string, data: Record<string, any>) {
    return this.courseModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  async addVideo(id: string, video: Record<string, any>) {
    return this.courseModel
      .findByIdAndUpdate(
        id,
        { $push: { videos: video } },
        { new: true },
      )
      .exec();
  }

  async updateVideo(
    id: string,
    videoId: string,
    data: Record<string, any>,
  ) {
    const set: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        set[`videos.$.${key}`] = value;
      }
    }

    return this.courseModel
      .findOneAndUpdate(
        { _id: id, "videos._id": videoId },
        { $set: set },
        { new: true },
      )
      .exec();
  }

  async removeVideo(id: string, videoId: string) {
    return this.courseModel
      .findByIdAndUpdate(
        id,
        { $pull: { videos: { _id: videoId } } },
        { new: true },
      )
      .exec();
  }
}
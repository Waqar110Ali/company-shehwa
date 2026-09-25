import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import {
  TutorialCourse,
  TutorialCourseDocument,
} from "../schemas/tutorial-course.schema";
import {
  TutorialPaymentRequest,
  TutorialPaymentRequestDocument,
} from "../schemas/tutorial-payment-request.schema";
import {
  TutorialUser,
  TutorialUserDocument,
} from "../schemas/tutorial-user.schema";

@Injectable()
export class TutorialRepository {
  constructor(
    @InjectModel(TutorialUser.name)
    private readonly tutorialUserModel: Model<TutorialUserDocument>,
    @InjectModel(TutorialCourse.name)
    private readonly tutorialCourseModel: Model<TutorialCourseDocument>,
    @InjectModel(TutorialPaymentRequest.name)
    private readonly tutorialPaymentModel: Model<TutorialPaymentRequestDocument>,
  ) {}

  async createUser(data: Partial<TutorialUser>) {
    return this.tutorialUserModel.create({
      ...data,
      coins: 0,
      status: "pending",
      hasAccess: false,
      isPaymentVerified: false,
      enrollments: [],
      paymentHistory: [],
    });
  }

  async findOrCreateUser(data: Partial<TutorialUser>) {
    const existing = await this.findUserByEmail(String(data.email).toLowerCase());
    if (existing) return existing;
    return this.createUser(data);
  }

  async findUserByEmail(email: string) {
    return this.tutorialUserModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    return this.tutorialUserModel.findById(id).exec();
  }

  async listUsers() {
    return this.tutorialUserModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async updateUser(id: string, data: Record<string, any>) {
    return this.tutorialUserModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async addEnrollment(userId: string, courseId: string) {
    return this.tutorialUserModel
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            enrollments: {
              courseId,
              enrolledAt: new Date(),
              isActive: true,
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  async ensureCourseSeed() {
    const count = await this.tutorialCourseModel.countDocuments();

    if (count > 0) {
      return this.tutorialCourseModel.find().exec();
    }

    const seedCourses = [
      {
        title: "HTML & CSS Fundamentals",
        description:
          "Build strong frontend foundations and learn page structure, styling, and responsive layouts.",
        price: 2500,
        rewardCoins: 40,
        lectures: [
          {
            _id: new Types.ObjectId(),
            title: "Intro to HTML",
            duration: 12,
            coinCost: 10,
            videoUrl: "https://example.com/video/html-intro.mp4",
            isUnlocked: true,
            watched: false,
          },
          {
            _id: new Types.ObjectId(),
            title: "CSS Layouts",
            duration: 15,
            coinCost: 12,
            videoUrl: "https://example.com/video/css-layouts.mp4",
            isUnlocked: false,
            watched: false,
          },
        ],
      },
      {
        title: "JavaScript Essentials",
        description:
          "Understand variables, functions, loops, events, and web interactions.",
        price: 4200,
        rewardCoins: 60,
        lectures: [
          {
            _id: new Types.ObjectId(),
            title: "Variables & Functions",
            duration: 18,
            coinCost: 12,
            videoUrl: "https://example.com/video/js-functions.mp4",
            isUnlocked: true,
            watched: false,
          },
          {
            _id: new Types.ObjectId(),
            title: "DOM Events",
            duration: 20,
            coinCost: 15,
            videoUrl: "https://example.com/video/js-events.mp4",
            isUnlocked: false,
            watched: false,
          },
        ],
      },
    ];

    return this.tutorialCourseModel.insertMany(seedCourses);
  }

  async findCourses() {
    return this.tutorialCourseModel.find().exec();
  }

  async findCourseById(id: string) {
    return this.tutorialCourseModel.findById(id).exec();
  }

  async createPaymentRequest(data: Record<string, any>) {
    return this.tutorialPaymentModel.create(data);
  }

  async findPaymentById(id: string) {
    return this.tutorialPaymentModel.findById(id).exec();
  }

  async listPayments(userId?: string) {
    const query = userId ? { userId } : {};
    return this.tutorialPaymentModel.find(query).sort({ createdAt: -1 }).lean().exec();
  }

  async updatePaymentRequest(id: string, data: Record<string, any>) {
    return this.tutorialPaymentModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async addPaymentHistory(userId: string, paymentId: string) {
    return this.tutorialUserModel
      .findByIdAndUpdate(
        userId,
        {
          $push: {
            paymentHistory: {
              paymentId,
              createdAt: new Date(),
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  async setLectureUnlock(courseId: string, lectureId: string, unlocked: boolean) {
    return this.tutorialCourseModel
      .findOneAndUpdate(
        { _id: courseId, "lectures._id": lectureId },
        {
          $set: {
            "lectures.$.isUnlocked": unlocked,
          },
        },
        { new: true },
      )
      .exec();
  }

  async markLectureWatched(courseId: string, lectureId: string) {
    return this.tutorialCourseModel
      .findOneAndUpdate(
        { _id: courseId, "lectures._id": lectureId },
        {
          $set: {
            "lectures.$.watched": true,
          },
        },
        { new: true },
      )
      .exec();
  }
}

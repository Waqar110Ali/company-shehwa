import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  Enrollment,
  EnrollmentDocument,
} from "../schemas/enrollment.schema";
import { EnrollmentStatus } from "../enums/enrollment-status.enum";

@Injectable()
export class EnrollmentsRepository {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async findOne(userId: string, courseId: string) {
    return this.enrollmentModel
      .findOne({ user: userId, course: courseId })
      .exec();
  }

  // Creates a PENDING enrollment record the first time a student
  // requests a course, or simply reuses the existing one on a
  // repeat attempt (e.g. after a rejection) so history stays on
  // one row per (user, course) pair.
  async upsertPending(userId: string, courseId: string) {
    return this.enrollmentModel
      .findOneAndUpdate(
        { user: userId, course: courseId },
        {
          $setOnInsert: {
            user: userId,
            course: courseId,
            status: EnrollmentStatus.PENDING,
          },
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  async setStatus(
    userId: string,
    courseId: string,
    status: EnrollmentStatus,
  ) {
    const approvedAt =
      status === EnrollmentStatus.ACTIVE ? new Date() : null;

    return this.enrollmentModel
      .findOneAndUpdate(
        { user: userId, course: courseId },
        { $set: { status, approvedAt } },
        { new: true, upsert: true },
      )
      .exec();
  }

  async findActiveForUser(userId: string) {
    return this.enrollmentModel
      .find({ user: userId, status: EnrollmentStatus.ACTIVE })
      .populate("course")
      .sort({ approvedAt: -1 })
      .exec();
  }
}

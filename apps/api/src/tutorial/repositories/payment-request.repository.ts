import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import {
  PaymentRequest,
  PaymentRequestDocument,
} from "../schemas/payment-request.schema";
import {
  PaymentRequestStatus,
  PaymentRequestType,
} from "../enums/payment-request-enums";

@Injectable()
export class PaymentRequestsRepository {
  constructor(
    @InjectModel(PaymentRequest.name)
    private readonly paymentRequestModel: Model<PaymentRequestDocument>,
  ) {}

  async create(data: Partial<PaymentRequest>) {
    return this.paymentRequestModel.create(data);
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.paymentRequestModel.findById(id).exec();
  }

  async findPendingForUserAndCourse(userId: string, courseId: string) {
    return this.paymentRequestModel
      .findOne({
        user: userId,
        course: courseId,
        type: PaymentRequestType.ENROLLMENT,
        status: PaymentRequestStatus.PENDING,
      })
      .exec();
  }

  async findAllForUser(userId: string) {
    return this.paymentRequestModel
      .find({ user: userId })
      .populate("course")
      .sort({ createdAt: -1 })
      .exec();
  }

  async findForAdmin(filter: {
    status?: PaymentRequestStatus;
    type?: PaymentRequestType;
  }) {
    const query: Record<string, any> = {};

    if (filter.status) query.status = filter.status;
    if (filter.type) query.type = filter.type;

    return this.paymentRequestModel
      .find(query)
      .populate("user", "firstName lastName email")
      .populate("course", "title thumbnailUrl coinsIncluded")
      .sort({ createdAt: -1 })
      .exec();
  }
}
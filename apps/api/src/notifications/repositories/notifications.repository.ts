// apps/api/src/notifications/repositories/notifications.repository.ts
import {
  Injectable, Inject } from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  Model,
} from "mongoose";

import {
  NotificationDoc,
  NotificationDocument,
} from "../schemas/notification.schema";

@Injectable()
export class NotificationsRepository {

  constructor(
    @InjectModel(NotificationDoc.name) @Inject(Model<NotificationDocument>)
    private readonly notificationModel:
      Model<NotificationDocument>,
  ) {}

  async findByUser(userId: string) {
    return this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }

  async create(data: {
    userId: string;
    title: string;
    description: string;
    type: string;
  }) {
    return this.notificationModel.create(data);
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    return this.notificationModel.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true },
    ).lean();
  }

  async markAllAsRead(userId: string) {
    return this.notificationModel.updateMany(
      { userId, read: false },
      { read: true },
    );
  }

  async clearAll(userId: string) {
    return this.notificationModel.deleteMany({
      userId,
    });
  }
}
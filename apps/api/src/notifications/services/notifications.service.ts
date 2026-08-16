// apps/api/src/notifications/services/notifications.service.ts
import {
  Injectable,
} from "@nestjs/common";

import {
  NotificationsRepository,
} from "../repositories/notifications.repository";

@Injectable()
export class NotificationsService {

  constructor(
    private readonly notificationsRepository:
      NotificationsRepository,
  ) {}

  async getMyNotifications(userId: string) {

    const notifications =
      await this.notificationsRepository.findByUser(
        userId,
      );

    return {
      success: true,
      data: notifications,
    };
  }

  // Other modules (employees, projects, attendance, calendar)
  // can call this later to create real notifications when
  // something relevant happens. Not wired to any trigger yet —
  // that's a separate task per module.
  async create(
    userId: string,
    title: string,
    description: string,
    type: string,
  ) {
    return this.notificationsRepository.create({
      userId,
      title,
      description,
      type,
    });
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    const updated =
      await this.notificationsRepository.markAsRead(
        id,
        userId,
      );

    return {
      success: true,
      data: updated,
    };
  }

  async markAllAsRead(userId: string) {
    await this.notificationsRepository.markAllAsRead(
      userId,
    );

    return {
      success: true,
      message: "All notifications marked as read.",
    };
  }

  async clearAll(userId: string) {
    await this.notificationsRepository.clearAll(
      userId,
    );

    return {
      success: true,
      message: "All notifications cleared.",
    };
  }
}
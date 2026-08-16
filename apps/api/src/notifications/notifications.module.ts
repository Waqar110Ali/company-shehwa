// apps/api/src/notifications/notifications.module.ts
import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

import {
  NotificationsController,
} from "./controllers/notifications.controller";

import {
  NotificationsService,
} from "./services/notifications.service";

import {
  NotificationsRepository,
} from "./repositories/notifications.repository";

import {
  NotificationDoc,
  NotificationSchema,
} from "./schemas/notification.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotificationDoc.name,
        schema: NotificationSchema,
      },
    ]),
  ],

  controllers: [
    NotificationsController,
  ],

  providers: [
    NotificationsService,
    NotificationsRepository,
  ],

  exports: [
    NotificationsService,
  ],
})
export class NotificationsModule {}
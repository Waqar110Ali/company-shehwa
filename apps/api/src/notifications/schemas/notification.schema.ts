// apps/api/src/notifications/schemas/notification.schema.ts
import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
} from "mongoose";

@Schema({
  timestamps: true,
})
export class NotificationDoc {

  @Prop({
    required: true,
    index: true,
  })
  userId!: string;

  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
    enum: [
      "employee",
      "project",
      "attendance",
      "task",
      "calendar",
      "system",
    ],
  })
  type!: string;

  @Prop({
    default: false,
  })
  read!: boolean;
}

export type NotificationDocument =
  HydratedDocument<NotificationDoc>;

export const NotificationSchema =
  SchemaFactory.createForClass(
    NotificationDoc,
  );
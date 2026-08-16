// apps/web/src/features/notifications/types/notification.ts
export interface Notification {
  _id: string;

  title: string;

  description: string;

  createdAt: string;

  read: boolean;

  type:
    | "employee"
    | "project"
    | "attendance"
    | "task"
    | "calendar"
    | "system";
}
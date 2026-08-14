export interface Notification {
  id: string;

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
import type { Notification } from "../types/notification";

export const notifications: Notification[] = [
  {
    id: "1",
    title: "New Employee Joined",
    description:
      "Ahmed Khan joined the Engineering department.",
    createdAt: "2 min ago",
    read: false,
    type: "employee",
  },
  {
    id: "2",
    title: "Project Updated",
    description:
      "Website Redesign status changed to In Progress.",
    createdAt: "15 min ago",
    read: false,
    type: "project",
  },
  {
    id: "3",
    title: "Attendance Submitted",
    description:
      "Today's attendance has been recorded.",
    createdAt: "1 hour ago",
    read: true,
    type: "attendance",
  },
  {
    id: "4",
    title: "Meeting Reminder",
    description:
      "Sprint Planning starts in 30 minutes.",
    createdAt: "2 hours ago",
    read: true,
    type: "calendar",
  },
];
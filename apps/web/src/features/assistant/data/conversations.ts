import type { Conversation } from "../types/chat";

export const conversations: Conversation[] = [
  {
    id: "1",
    title: "Attendance Report",
    pinned: true,
    favorite: false,
    updatedAt: "Today",
  },
  {
    id: "2",
    title: "Employee Summary",
    pinned: false,
    favorite: true,
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Revenue Analysis",
    pinned: false,
    favorite: false,
    updatedAt: "2 days ago",
  },
];
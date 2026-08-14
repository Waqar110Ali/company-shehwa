import type { Conversation } from "../types/chat";

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "Project Manager",
    online: true,
    unread: 3,
    lastMessage: "Please review the project proposal.",
    lastMessageTime: "09:35 AM",
  },
  {
    id: "2",
    name: "Ahmed Ali",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "Backend Developer",
    online: true,
    unread: 0,
    lastMessage: "API is ready for testing.",
    lastMessageTime: "Yesterday",
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=24",
    role: "UI Designer",
    online: false,
    unread: 1,
    lastMessage: "I've uploaded the new Figma design.",
    lastMessageTime: "Monday",
  },
  {
    id: "4",
    name: "Muhammad Hassan",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "AI Engineer",
    online: true,
    unread: 0,
    lastMessage: "Training completed successfully.",
    lastMessageTime: "08:10 AM",
  },
];
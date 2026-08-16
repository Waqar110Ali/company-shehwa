import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  ClipboardCheck,
  MessageSquare,
  Folder,
  BarChart3,
  Bot,
  Settings,
  Globe,
} from "lucide-react";

import { Role } from "@/features/auth/types/role";

export const menu = [
  {
    section: "MAIN",
    items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    section: "MANAGEMENT",
    items: [
      { label: "Employees", icon: Users, path: "/dashboard/employees" },
      { label: "Projects", icon: FolderKanban, path: "/dashboard/projects" },
      { label: "Tasks", icon: CheckSquare, path: "/dashboard/tasks" },
      { label: "Attendance", icon: ClipboardCheck, path: "/dashboard/attendance" },
      { label: "Calendar", icon: CalendarDays, path: "/dashboard/calendar" },
    ],
  },
  {
    section: "WORKSPACE",
    items: [
      { label: "Chat", icon: MessageSquare, path: "/dashboard/chat" },
      { label: "Files", icon: Folder, path: "/dashboard/files" },
      { label: "Reports", icon: BarChart3, path: "/dashboard/reports" },
      { label: "AI Assistant", icon: Bot, path: "/dashboard/assistant" },
    ],
  },
  {
    section: "WEBSITE",
    items: [
      {
        label: "Portfolio Content",
        icon: Globe,
        path: "/dashboard/portfolio",
        roles: [Role.ADMIN],
      },
    ],
  },
  {
    section: "SYSTEM",
    items: [{ label: "Settings", icon: Settings, path: "/dashboard/settings" }],
  },
];
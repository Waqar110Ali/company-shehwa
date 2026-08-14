import type { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design Dashboard UI",
    description:
      "Create premium dashboard interface using React and Tailwind.",

    projectId: "P-101",
    projectName: "Company ERP",

    assignedTo: "Ahmed Ali",
    assignedAvatar:
      "https://i.pravatar.cc/150?img=11",

    dueDate: "2026-07-25",

    progress: 80,

    priority: "High",

    status: "In Progress",

    createdAt: "2026-07-10",
  },

  {
    id: "2",
    title: "Employee Authentication",
    description:
      "Implement secure login with JWT authentication.",

    projectId: "P-101",
    projectName: "Company ERP",

    assignedTo: "Waqar Ali",
    assignedAvatar:
      "https://i.pravatar.cc/150?img=12",

    dueDate: "2026-07-28",

    progress: 40,

    priority: "Critical",

    status: "Review",

    createdAt: "2026-07-11",
  },

  {
    id: "3",
    title: "Attendance Module",
    description:
      "Develop attendance management with reports.",

    projectId: "P-102",
    projectName: "HRMS",

    assignedTo: "Sara Khan",
    assignedAvatar:
      "https://i.pravatar.cc/150?img=13",

    dueDate: "2026-08-02",

    progress: 100,

    priority: "Medium",

    status: "Completed",

    createdAt: "2026-07-12",
  },

  {
    id: "4",
    title: "Reports Dashboard",
    description:
      "Create analytics charts and export functionality.",

    projectId: "P-103",
    projectName: "Analytics",

    assignedTo: "Ali Hassan",
    assignedAvatar:
      "https://i.pravatar.cc/150?img=14",

    dueDate: "2026-08-05",

    progress: 10,

    priority: "Low",

    status: "Todo",

    createdAt: "2026-07-15",
  },
];
import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "1",

    name: "AI Company Management",

    description:
      "Enterprise company management platform powered by AI.",

    status: "Active",

    priority: "High",

    progress: 78,

    totalTasks: 142,

    completedTasks: 110,

    startDate: "2026-07-01",

    dueDate: "2026-08-25",

    members: [
      {
        id: "1",
        name: "Waqar Ali",
        role: "CEO",
        avatar: "https://i.pravatar.cc/100?img=11",
      },
      {
        id: "2",
        name: "Ahmed",
        role: "Backend",
        avatar: "https://i.pravatar.cc/100?img=13",
      },
      {
        id: "3",
        name: "Sara",
        role: "Designer",
        avatar: "https://i.pravatar.cc/100?img=32",
      },
    ],
  },

  {
    id: "2",

    name: "AI HR Portal",

    description:
      "Recruitment and employee onboarding system.",

    status: "Planning",

    priority: "Medium",

    progress: 18,

    totalTasks: 48,

    completedTasks: 7,

    startDate: "2026-08-01",

    dueDate: "2026-10-15",

    members: [
      {
        id: "1",
        name: "Waqar Ali",
        role: "Manager",
        avatar: "https://i.pravatar.cc/100?img=18",
      },
      {
        id: "2",
        name: "Ali",
        role: "Frontend",
        avatar: "https://i.pravatar.cc/100?img=15",
      },
    ],
  },
];
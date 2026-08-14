export type ProjectStatus =
  | "Planning"
  | "Active"
  | "On Hold"
  | "Completed";

export type ProjectPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface TeamMember {
  id: string;

  name: string;

  role: string;

  avatar: string;
}

export interface Project {
  id: string;

  name: string;

  description: string;

  status: ProjectStatus;

  priority: ProjectPriority;

  progress: number;

  totalTasks: number;

  completedTasks: number;

  startDate: string;

  dueDate: string;

  members: TeamMember[];
}
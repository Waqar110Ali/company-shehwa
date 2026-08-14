export type TaskStatus =
  | "Todo"
  | "In Progress"
  | "Review"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface Task {
  id: string;

  title: string;

  description: string;

  projectId: string;

  projectName: string;

  assignedTo: string;

  assignedName: string;

  assignedAvatar: string;

  dueDate: string;

  progress: number;

  priority: TaskPriority;

  status: TaskStatus;

  createdAt: string;

  updatedAt?: string;
}
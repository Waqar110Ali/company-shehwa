import type { Task } from "../types/task";

export interface TasksResponse {
  items: Task[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TaskStatistics {
  total: number;

  todo: number;

  progress: number;

  review: number;

  completed: number;
}

function mapTask(task: any): Task {
  return {
    id:
      task.id ??
      task._id ??
      "",

    title:
      task.title ??
      "",

    description:
      task.description ??
      "",

    projectId:
      task.project?.id ??
      task.project?._id ??
      task.project ??
      "",

    projectName:
      task.project?.name ??
      "",

    assignedTo:
      task.assignedTo?.id ??
      task.assignedTo?._id ??
      task.assignedTo ??
      "",

    assignee:
      task.assignedTo?.fullName ??
      task.assignedTo?.name ??
      `${task.assignedTo?.firstName ?? ""} ${task.assignedTo?.lastName ?? ""}`.trim(),

    assignedAvatar:
      task.assignedTo?.avatar ??
      "",

    dueDate:
      task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .slice(0, 10)
        : "",

    progress:
      task.progress ?? 0,

    priority:
      task.priority,

    status:
      task.status,

    createdAt:
      task.createdAt ??
      "",
  };
}

export function mapTasks(
  response: any,
): TasksResponse {
  const data =
    response?.data ??
    response;

  // Backend returns:
  // [ {...}, {...} ]
  if (Array.isArray(data)) {
    return {
      items: data.map(mapTask),
    };
  }

  // Backend returns:
  // { items: [...] }
  if (
    Array.isArray(
      data?.items,
    )
  ) {
    return {
      items:
        data.items.map(
          mapTask,
        ),

      pagination:
        data.pagination,
    };
  }

  return {
    items: [],
  };
}

export function mapTaskDetails(
  response: any,
): Task {
  const data =
    response?.data ??
    response;

  return mapTask(data);
}

export function mapTaskStatistics(
  response: any,
): TaskStatistics {
  const data =
    response?.data ??
    response;

  return {
    total:
      data?.total ?? 0,

    todo:
      data?.todo ?? 0,

    progress:
      data?.progress ?? 0,

    review:
      data?.review ?? 0,

    completed:
      data?.completed ?? 0,
  };
}
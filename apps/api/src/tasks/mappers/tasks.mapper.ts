import { Injectable } from "@nestjs/common";

import { Task } from "../schemas/task.schema";

@Injectable()
export class TasksMapper {
  toResponse(
    task: Task | any,
  ) {
    return {
      id:
        task._id.toString(),

      title:
        task.title,

      description:
        task.description,

      projectId:
        task.project?._id?.toString() ??
        task.project?.toString() ??
        "",

      projectName:
        task.project?.name ??
        "",

      assignedTo:
        task.assignedTo?._id?.toString() ??
        task.assignedTo?.toString() ??
        "",

      assignee:
        task.assignedTo?.fullName ??
        task.assignedTo?.name ??
        `${task.assignedTo?.firstName ?? ""} ${task.assignedTo?.lastName ?? ""}`.trim(),

      assignedAvatar:
        task.assignedTo?.avatar ??
        "",

      status:
        task.status,

      priority:
        task.priority,

      progress:
        task.progress ?? 0,

      dueDate:
        task.dueDate,

      createdAt:
        task.createdAt,

      updatedAt:
        task.updatedAt,
    };
  }

  toCollection(
    tasks: Task[] | any[],
  ) {
    return tasks.map((task) =>
      this.toResponse(task),
    );
  }
}
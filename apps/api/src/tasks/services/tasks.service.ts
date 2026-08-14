import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { TaskRepository } from "../repositories/tasks.repository";

import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskFilterDto } from "../dto/task-filter.dto";

@Injectable()
export class TaskService {
  constructor(
    private readonly tasksRepository: TaskRepository,
  ) {}

  async create(
    dto: CreateTaskDto,
  ) {
    return this.tasksRepository.create(
      dto,
    );
  }

  async findAll(filter: TaskFilterDto) {
  const query: any = {};

  if (filter.status) {
    query.status = filter.status;
  }

  if (filter.priority) {
    query.priority = filter.priority;
  }

  if (filter.project) {
    query.project = filter.project;
  }

  if (filter.employee) {
    query.assignedTo = filter.employee;
  }

  if (filter.search) {
    query.$or = [
      {
        title: {
          $regex: filter.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: filter.search,
          $options: "i",
        },
      },
    ];
  }

  return this.tasksRepository.findAll(query);
}

  async findOne(
    id: string,
  ) {
    const task =
      await this.tasksRepository.findById(
        id,
      );

    if (!task) {
      throw new NotFoundException(
        "Task not found.",
      );
    }

    return task;
  }

  async update(
    id: string,
    dto: UpdateTaskDto,
  ) {
    const task =
      await this.tasksRepository.update(
        id,
        dto,
      );

    if (!task) {
      throw new NotFoundException(
        "Task not found.",
      );
    }

    return task;
  }

  async remove(
    id: string,
  ) {
    await this.tasksRepository.remove(
      id,
    );

    return {
      message:
        "Task deleted successfully.",
    };
  }

  async statistics() {
    return this.tasksRepository.getStatistics();
  }
}
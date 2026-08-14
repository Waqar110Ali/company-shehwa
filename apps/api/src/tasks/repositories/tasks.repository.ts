import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
} from "mongoose";

import {
  Task,
  TaskDocument,
} from "../schemas/task.schema";

import {
  CreateTaskDto,
} from "../dto/create-task.dto";

import {
  UpdateTaskDto,
} from "../dto/update-task.dto";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    dto: CreateTaskDto,
  ) {
    return this.taskModel.create({
      ...dto,
      dueDate: new Date(
        dto.dueDate,
      ),
    });
  }

  async findAll(
    filter: FilterQuery<Task> = {},
  ) {
    return this.taskModel
      .find(filter)
      .populate({
        path: "project",
        select: "name",
      })
      .populate({
        path: "assignedTo",
        select:
          "firstName lastName fullName avatar designation",
      })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findById(
    id: string,
  ) {
    const task =
      await this.taskModel
        .findById(id)
        .populate({
          path: "project",
          select: "name",
        })
        .populate({
          path: "assignedTo",
          select:
            "firstName lastName fullName avatar designation",
        })
        .lean();

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
      await this.taskModel
        .findByIdAndUpdate(
          id,
          {
            ...dto,
            ...(dto.dueDate && {
              dueDate:
                new Date(
                  dto.dueDate,
                ),
            }),
          },
          {
            new: true,
          },
        )
        .populate({
          path: "project",
          select: "name",
        })
        .populate({
          path: "assignedTo",
          select:
            "firstName lastName fullName avatar designation",
        });

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
    const task =
      await this.taskModel.findByIdAndDelete(
        id,
      );

    if (!task) {
      throw new NotFoundException(
        "Task not found.",
      );
    }

    return task;
  }

  async count(
    filter: FilterQuery<Task> = {},
  ) {
    return this.taskModel.countDocuments(
      filter,
    );
  }

  async getStatistics() {
    const [
      total,
      todo,
      progress,
      review,
      completed,
    ] = await Promise.all([
      this.count(),
      this.count({
        status: "Todo",
      }),
      this.count({
        status:
          "In Progress",
      }),
      this.count({
        status:
          "Review",
      }),
      this.count({
        status:
          "Completed",
      }),
    ]);

    return {
      total,
      todo,
      progress,
      review,
      completed,
    };
  }
}
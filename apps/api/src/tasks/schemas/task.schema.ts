import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument, Types } from "mongoose";

import { TaskPriority } from "../enums/task-priority.enum";
import { TaskStatus } from "../enums/task-status.enum";

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    required: true,
    trim: true,
  })
  title!: string;

  @Prop({
    default: "",
    trim: true,
  })
  description!: string;

  @Prop({
    type: Types.ObjectId,
    ref: "Project",
    required: true,
  })
  project!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: "Employee",
    required: true,
  })
  assignedTo!: Types.ObjectId;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: TaskStatus;

  @Prop({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority!: TaskPriority;

  @Prop({
    min: 0,
    max: 100,
    default: 0,
  })
  progress!: number;

  @Prop({
    required: true,
  })
  dueDate!: Date;
}

export const TaskSchema =
  SchemaFactory.createForClass(Task);
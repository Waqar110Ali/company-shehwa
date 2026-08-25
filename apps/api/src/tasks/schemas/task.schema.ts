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
    type: String,
    required: true,
    trim: true,
  })
  title!: string;

  @Prop({
    type: String,
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
    type: String,
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status!: TaskStatus;

  @Prop({
    type: String,
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority!: TaskPriority;

  @Prop({
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  })
  progress!: number;

  @Prop({
    type: Date,
    required: true,
  })
  dueDate!: Date;
}

export const TaskSchema =
  SchemaFactory.createForClass(Task);
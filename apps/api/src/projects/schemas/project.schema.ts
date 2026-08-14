import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import {
  ProjectPriority,
} from "../enums/project-priority.enum";

import {
  ProjectStatus,
} from "../enums/project-status.enum";

export type ProjectDocument =
  HydratedDocument<Project>;

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    default: "",
    trim: true,
  })
  description!: string;

  @Prop({
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status!: ProjectStatus;

  @Prop({
    type: String,
    enum: ProjectPriority,
    default: ProjectPriority.MEDIUM,
  })
  priority!: ProjectPriority;

  @Prop({
    default: 0,
    min: 0,
    max: 100,
  })
  progress!: number;

  @Prop({
    default: 0,
  })
  totalTasks!: number;

  @Prop({
    default: 0,
  })
  completedTasks!: number;

  @Prop({
    required: true,
  })
  startDate!: Date;

  @Prop({
    required: true,
  })
  dueDate!: Date;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: "Employee",
      },
    ],
    default: [],
  })
  members!: Types.ObjectId[];
}

export const ProjectSchema =
  SchemaFactory.createForClass(Project);
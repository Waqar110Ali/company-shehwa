import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  Employee,
  EmployeeSchema,
} from "@/employees/schemas/employee.schema";

import {
  Project,
  ProjectSchema,
} from "@/projects/schemas/project.schema";

import {
  Task,
  TaskSchema,
} from "@/tasks/schemas/task.schema";

import { DashboardController } from "./controllers/dashboard.controller";
import { DashboardRepository } from "./repositories/dashboard.repository";
import { DashboardService } from "./services/dashboard.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
  name: Task.name,
  schema: TaskSchema,
},
    ]),
  ],

  controllers: [
    DashboardController,
  ],

  providers: [
    DashboardRepository,
    DashboardService,
  ],

  exports: [
    DashboardRepository,
    DashboardService,
  ],
})
export class DashboardModule {}
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  Employee,
  EmployeeSchema,
} from "@/employees/schemas/employee.schema";

import {
  Project,
  ProjectSchema,
} from "./schemas/project.schema";

import { ProjectsController } from "./controllers/projects.controller";
import { ProjectsService } from "./services/projects.service";
import { ProjectsRepository } from "./repositories/projects.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],

  controllers: [
    ProjectsController,
  ],

  providers: [
    ProjectsRepository,
    ProjectsService,
  ],

  exports: [
    ProjectsRepository,
    ProjectsService,
  ],
})
export class ProjectsModule {}
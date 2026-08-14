import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

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

import {
  Attendance,
  AttendanceSchema,
} from "@/attendance/schemas/attendance.schema";

import {
  ReportsController,
} from "./controllers/reports.controller";

import {
  ReportsRepository,
} from "./repositories/reports.repository";

import {
  ReportsService,
} from "./services/reports.service";

import {
  ReportsAccessGuard,
} from "./guards/reports-access.guard";
import { ReportsExportService } from "./services/reports-export.service";

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
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
    ]),
  ],

  controllers: [
    ReportsController,
  ],

  providers: [
     ReportsRepository,
  ReportsService,
  ReportsExportService,
  ReportsAccessGuard,
  ],
})
export class ReportsModule {}
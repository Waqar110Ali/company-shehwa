import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  Attendance,
  AttendanceSchema,
} from "./schemas/attendance.schema";

import {
  Employee,
  EmployeeSchema,
} from "../employees/schemas/employee.schema";

import { AttendanceController } from "./controllers/attendance.controller";

import { AttendanceService } from "./services/attendance.service";

import { AttendanceRepository } from "./repositories/attendance.repository";

import { AttendanceMapper } from "./mapper/attendance.mapper";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],

  controllers: [
    AttendanceController,
  ],

  providers: [
    AttendanceService,
    AttendanceRepository,
    AttendanceMapper,
  ],

  exports: [
    AttendanceService,
    AttendanceRepository,
  ],
})
export class AttendanceModule {}
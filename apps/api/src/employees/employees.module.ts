import {
  Module,
  forwardRef,
} from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import {
  Employee,
  EmployeeSchema,
} from "./schemas/employee.schema";

import { EmployeesController } from "./controllers/employees.controller";

import { EmployeesService } from "./services/employees.service";

import { EmployeesRepository } from "./repositories/employees.repository";

import { UsersModule } from "@/users/users.module";

import { MailModule } from "@/mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),

    forwardRef(() => UsersModule),

    forwardRef(() => MailModule),
  ],

  controllers: [
    EmployeesController,
  ],

  providers: [
    EmployeesRepository,
    EmployeesService,
  ],

  exports: [
    EmployeesRepository,
    EmployeesService,
  ],
})
export class EmployeesModule {}
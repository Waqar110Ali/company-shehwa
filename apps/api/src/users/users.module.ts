import {
  Module,
  forwardRef,
} from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./controllers/users.controller";

import {
  User,
  UserSchema,
} from "./schemas/user.schema";

import { UsersRepository } from "./repositories/users.repository";
import { UsersService } from "./services/users.service";

import { EmployeesModule } from "@/employees/employees.module";
import { MailModule } from "@/mail/mail.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    forwardRef(() => EmployeesModule),
    forwardRef(() => MailModule),
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersRepository,
    UsersService,
  ],

  exports: [
    UsersRepository,
    UsersService,
  ],
})
export class UsersModule {}
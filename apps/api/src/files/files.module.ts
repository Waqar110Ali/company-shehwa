import {
  Module,
} from "@nestjs/common";

import {
  MongooseModule,
} from "@nestjs/mongoose";

import { FilesController } from "./controllers/files.controller";
import { FilesService } from "./services/files.service";
import { FilesRepository } from "./repository/files.repository";
import { FilesMapper } from "./mapper/files.mapper";

import {
  File,
  FileSchema,
} from "./schemas/file.schema";

import { EmployeesModule } from "@/employees/employees.module";
import { UsersModule } from "@/users/users.module";

import { CloudinaryModule } from "@/common/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),

    EmployeesModule,

    UsersModule,

    CloudinaryModule,
  ],

  controllers: [
    FilesController,
  ],

  providers: [
    FilesService,

    FilesRepository,

    FilesMapper,
  ],

  exports: [
    FilesService,

    FilesRepository,
  ],
})
export class FilesModule {}
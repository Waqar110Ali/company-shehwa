import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TaskController } from "./controllers/tasks.controller";
import { TaskService } from "./services/tasks.service";
import { TaskRepository } from "./repositories/tasks.repository";
import { TasksMapper } from "./mappers/tasks.mapper";
import {
  Task,
  TaskSchema,
} from "./schemas/task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],

  controllers: [TaskController],

  providers: [
    TaskService,
    TaskRepository,
     TasksMapper,
  ],

  exports: [
    TaskService,
    TaskRepository,
  ],
})
export class TaskModule {}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards, Inject } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";

import {
  VIEW_ROLES,
  MANAGE_ROLES,
  ADMIN_ONLY,
} from "@/auth/constants/role-groups";

import { TaskService } from "../services/tasks.service";

import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskFilterDto } from "../dto/task-filter.dto";

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller("tasks")
export class TaskController {
  constructor(
    @Inject(TaskService) private readonly taskService: TaskService,
  ) {}

  // ==========================================
  // Create
  // ==========================================

  @Post()
  @Roles(...MANAGE_ROLES)
  create(
    @Body()
    dto: CreateTaskDto,
  ) {
    return this.taskService.create(dto);
  }

  // ==========================================
  // Find All
  // ==========================================

  @Get()
  @Roles(...VIEW_ROLES)
  findAll(
    @Query()
    filter: TaskFilterDto,
  ) {
    return this.taskService.findAll(
      filter,
    );
  }

  // ==========================================
  // Statistics
  // ==========================================

  @Get("statistics")
  @Roles(...VIEW_ROLES)
  statistics() {
    return this.taskService.statistics();
  }

  // ==========================================
  // Find One
  // ==========================================

  @Get(":id")
  @Roles(...VIEW_ROLES)
  findOne(
    @Param("id")
    id: string,
  ) {
    return this.taskService.findOne(
      id,
    );
  }

  // ==========================================
  // Update
  // ==========================================

  @Patch(":id")
  @Roles(...MANAGE_ROLES)
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateTaskDto,
  ) {
    return this.taskService.update(
      id,
      dto,
    );
  }

  // ==========================================
  // Delete
  // ==========================================

  @Delete(":id")
  @Roles(...ADMIN_ONLY)
  remove(
    @Param("id")
    id: string,
  ) {
    return this.taskService.remove(
      id,
    );
  }
}
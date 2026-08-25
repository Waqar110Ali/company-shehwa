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
import {
  VIEW_ROLES,
  MANAGE_ROLES,
  ADMIN_ONLY,
} from "@/auth/constants/role-groups";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";

import { Role } from "@/users/enums/role.enum";

import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { ProjectQueryDto } from "../dto/project-query.dto";

import { ProjectsService } from "../services/projects.service";

@ApiTags("Projects")
@ApiBearerAuth()
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller("projects")
export class ProjectsController {
  constructor(
    @Inject(ProjectsService) private readonly projectsService: ProjectsService,
  ) {}

  @Post()
 @Roles(...MANAGE_ROLES)
  create(
    @Body()
    dto: CreateProjectDto,
  ) {
    return this.projectsService.create(dto);
  }

  @Get()
 @Roles(...VIEW_ROLES)
  findAll(
    @Query()
    query: ProjectQueryDto,
  ) {
    return this.projectsService.findAll(
      query,
    );
  }

  @Get("stats")
  @Roles(...VIEW_ROLES)
  getStatistics() {
    return this.projectsService.getStatistics();
  }

  @Get(":id")
  @Roles(...VIEW_ROLES)
  findById(
    @Param("id")
    id: string,
  ) {
    return this.projectsService.findById(
      id,
    );
  }

  @Patch(":id")
  @Roles(...MANAGE_ROLES)
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      dto,
    );
  }

  @Delete(":id")
  @Roles(...ADMIN_ONLY)
  remove(
    @Param("id")
    id: string,
  ) {
    return this.projectsService.remove(
      id,
    );
  }
}
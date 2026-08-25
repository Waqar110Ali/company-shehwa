import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors, Inject } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";

import {
  ADMIN_ONLY,
  MANAGE_ROLES,
  VIEW_ROLES,
} from "@/auth/constants/role-groups";

import { EmployeesService } from "../services/employees.service";

import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeQueryDto } from "../dto/employee-query.dto";

import { avatarUploadOptions } from "../config/Avatar-upload.config";

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller("employees")
export class EmployeesController {
  constructor(
    @Inject(EmployeesService) private readonly service: EmployeesService,
  ) {}

  // =====================================================
  // Create
  //
  // multipart/form-data now: all CreateEmployeeDto fields as plain
  // form fields, plus a file field named "avatar" (required — only
  // MANAGE_ROLES/admins can hit this endpoint at all, per @Roles
  // below, so the upload is effectively admin-only).
  // =====================================================

  @Post()
  @Roles(...MANAGE_ROLES)
  @UseInterceptors(FileInterceptor("avatar", avatarUploadOptions))
  create(
    @Body()
    dto: CreateEmployeeDto,

    @UploadedFile()
    avatar?: Express.Multer.File,
  ) {
    return this.service.create(dto, avatar);
  }

  // =====================================================
  // Find All
  // =====================================================

  @Get()
  @Roles(...VIEW_ROLES)
  findAll(
    @Query()
    query: EmployeeQueryDto,
  ) {
    return this.service.findAll(query);
  }

  // =====================================================
  // Find One
  // =====================================================

  @Get(":id")
  @Roles(...VIEW_ROLES)
  findOne(
    @Param("id")
    id: string,
  ) {
    return this.service.findById(id);
  }

  // =====================================================
  // Update
  //
  // Also multipart now. The "avatar" file is optional here — omit it
  // to keep the employee's existing photo, send a new file to
  // replace it.
  // =====================================================

  @Patch(":id")
  @Roles(...MANAGE_ROLES)
  @UseInterceptors(FileInterceptor("avatar", avatarUploadOptions))
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateEmployeeDto,

    @UploadedFile()
    avatar?: Express.Multer.File,
  ) {
    return this.service.update(
      id,
      dto,
      avatar,
    );
  }

  // =====================================================
  // Approve Employee
  // =====================================================

  @Patch(":id/approve")
  @Roles(...ADMIN_ONLY)
  approve(
    @Param("id")
    id: string,
  ) {
    return this.service.approve(id);
  }

  // =====================================================
  // Reject Employee
  // =====================================================

  @Delete(":id/reject")
  @Roles(...ADMIN_ONLY)
  reject(
    @Param("id")
    id: string,
  ) {
    return this.service.reject(id);
  }

  // =====================================================
  // Delete Employee
  // =====================================================

  @Delete(":id")
  @Roles(...ADMIN_ONLY)
  remove(
    @Param("id")
    id: string,
  ) {
    return this.service.delete(id);
  }
}
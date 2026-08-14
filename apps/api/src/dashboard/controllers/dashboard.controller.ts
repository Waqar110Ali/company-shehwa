import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";

import { Role } from "@/users/enums/role.enum";

import { DashboardService } from "../services/dashboard.service";
import { VIEW_ROLES } from "@/auth/constants/role-groups";

@ApiTags("Dashboard")
@ApiBearerAuth()
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Controller("dashboard")
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

 @Get()
@Roles(...VIEW_ROLES)
  getDashboard() {
    return this.dashboardService.getDashboard();
  }
}
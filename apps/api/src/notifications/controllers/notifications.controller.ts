// apps/api/src/notifications/controllers/notifications.controller.ts
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";

import {
  Request,
} from "express";

import {
  NotificationsService,
} from "../services/notifications.service";

import {
  JwtAuthGuard,
} from "@/auth/guards/jwt-auth.guard";

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationsController {

  constructor(
    private readonly notificationsService:
      NotificationsService,
  ) {}

  @Get()
  getMine(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.getMyNotifications(
      req.user.sub,
    );
  }

  @Patch(":id/read")
  markAsRead(
    @Param("id") id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.markAsRead(
      id,
      req.user.sub,
    );
  }

  @Patch("read-all")
  markAllAsRead(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.markAllAsRead(
      req.user.sub,
    );
  }

  @Delete()
  clearAll(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.clearAll(
      req.user.sub,
    );
  }
}
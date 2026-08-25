// apps/api/src/settings/controllers/settings.controller.ts
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Put,
  Req,
  UseGuards, Inject } from "@nestjs/common";

import {
  Request,
} from "express";

import {
  SettingsService,
} from "../services/settings.service";

import {
  JwtAuthGuard,
} from "@/auth/guards/jwt-auth.guard";

import {
  Role,
} from "@/users/enums/role.enum";

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

// Fields that only an ADMIN is allowed to set via Settings.
const ADMIN_ONLY_FIELDS = [
  "company",
  "website",
  "address",
];

@UseGuards(JwtAuthGuard)
@Controller("settings")
export class SettingsController {

  constructor(
    @Inject(SettingsService) private readonly settingsService:
      SettingsService,
  ) {}

  @Get()
  getSettings(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.settingsService.getSettings(
      req.user.sub,
    );
  }

  @Put()
  updateSettings(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: Record<string, any>,
  ) {
    const isAdmin =
      req.user.role === Role.ADMIN;

    if (!isAdmin) {
      const attemptedAdminField =
        ADMIN_ONLY_FIELDS.find(
          (field) => field in body,
        );

      if (attemptedAdminField) {
        throw new ForbiddenException(
          "Only an admin can update company settings.",
        );
      }
    }

    return this.settingsService.updateSettings(
      req.user.sub,
      body,
    );
  }
}
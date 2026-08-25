// apps/api/src/portfolio/controllers/portfolio.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors, Inject } from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import {
  PortfolioService,
} from "../services/portfolio.service";

import {
  JwtAuthGuard,
} from "@/auth/guards/jwt-auth.guard";

import {
  RolesGuard,
} from "@/auth/guards/roles.guard";

import {
  Roles,
} from "@/auth/decorators/roles.decorator";

import {
  Role,
} from "@/users/enums/role.enum";

import {
  CloudinaryService,
} from "@/common/cloudinary/cloudinary.service";

@Controller("portfolio")
export class PortfolioController {

  constructor(
    @Inject(PortfolioService) private readonly portfolioService:
      PortfolioService,

    @Inject(CloudinaryService) private readonly cloudinary:
      CloudinaryService,
  ) {}

  // PUBLIC
  @Get()
  getPortfolio() {
    return this.portfolioService.getPortfolio();
  }

  // ADMIN ONLY — full-content overwrite (bulk import/seed use)
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Put()
  updatePortfolio(
    @Body()
    body: Record<string, any>,
  ) {
    return this.portfolioService.updatePortfolio(
      body,
    );
  }

  // ADMIN ONLY — merge-safe, single section
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Put(":key")
  updateSection(
    @Body()
    body: Record<string, any>,
    @Param("key")
    key: string,
  ) {
    return this.portfolioService.updateSection(
      key,
      body,
    );
  }

  // ADMIN ONLY — upload a replacement photo for any image/avatar
  // field (team member photo, testimonial photo, client review
  // avatar, etc.). Returns the new Cloudinary URL; the admin
  // dashboard then saves that URL into the relevant field via the
  // normal updateSection call above.
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Post("upload-image")
  @UseInterceptors(
    FileInterceptor("file"),
  )
  async uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const upload: any =
      await this.cloudinary.uploadFile(
        file,
        "company-management/portfolio/images",
      );

    return {
      success: true,
      data: {
        url: upload.secure_url,
      },
    };
  }
}
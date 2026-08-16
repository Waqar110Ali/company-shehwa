// apps/api/src/updates/controllers/updates.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import {
  UpdatesService,
} from "../services/updates.service";

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

@Controller("updates")
export class UpdatesController {

  constructor(
    private readonly updatesService:
      UpdatesService,

    private readonly cloudinary:
      CloudinaryService,
  ) {}

  // PUBLIC — home page reads this, no auth needed.
  @Get()
  getUpdates() {
    return this.updatesService.getUpdates();
  }

  // ADMIN ONLY — replaces only the CEO/team message, galleries
  // untouched.
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Put("ceo-message")
  updateCeoMessage(
    @Body()
    body: Record<string, any>,
  ) {
    return this.updatesService.updateCeoMessage(
      body,
    );
  }

  // ADMIN ONLY — replaces only the galleries list, CEO message
  // untouched.
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Put("galleries")
  updateGalleries(
    @Body()
    body: {
      galleries: Record<string, any>[];
    },
  ) {
    return this.updatesService.updateGalleries(
      body.galleries,
    );
  }

  // ADMIN ONLY — upload the CEO/team message video.
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(Role.ADMIN)
  @Post("upload-video")
  @UseInterceptors(
    FileInterceptor("file"),
  )
  async uploadVideo(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const upload: any =
      await this.cloudinary.uploadFile(
        file,
        "company-management/updates/videos",
      );

    return {
      success: true,
      data: {
        url: upload.secure_url,
      },
    };
  }

  // ADMIN ONLY — upload one event-gallery photo at a time.
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
        "company-management/updates/gallery",
      );

    return {
      success: true,
      data: {
        url: upload.secure_url,
      },
    };
  }
}
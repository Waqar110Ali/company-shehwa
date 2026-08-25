import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors, Inject } from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

import { FilesService } from "../services/files.service";

import { FileQueryDto } from "../dto/file-query.dto";
import { CreateFolderDto } from "../dto/create-folder.dto";
import { UploadFileDto } from "../dto/upload-file.dto";
import { RenameFileDto } from "../dto/rename-file.dto";
import { MoveFileDto } from "../dto/move-file.dto";
import { ShareFileDto } from "../dto/share-file.dto";

@Controller("files")
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(
    @Inject(FilesService) private readonly filesService: FilesService,
  ) {}

  // =====================================================
  // List Files
  // =====================================================

  @Get()
  files(
    @Req()
    req: any,

    @Query()
    query: FileQueryDto,
  ) {
    return this.filesService.files(
      req.user.sub,
      query,
    );
  }

  // =====================================================
  // Storage
  // =====================================================

  @Get("storage")
  storage(
    @Req()
    req: any,
  ) {
    return this.filesService.storage(
      req.user.sub,
    );
  }

  // =====================================================
  // Download
  // =====================================================

  @Get(":id/download")
  download(
    @Req()
    req: any,

    @Param("id")
    id: string,
  ) {
    return this.filesService.download(
      req.user.sub,
      id,
    );
  }

  // =====================================================
  // Create Folder
  // =====================================================

  @Post("folders")
  createFolder(
    @Req()
    req: any,

    @Body()
    dto: CreateFolderDto,
  ) {
    return this.filesService.createFolder(
      req.user.sub,
      dto,
    );
  }

  // =====================================================
  // Upload
  // =====================================================

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file"),
  )
  upload(
    @Req()
    req: any,

    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    dto: UploadFileDto,
  ) {
    return this.filesService.upload(
      req.user.sub,
      file,
      dto,
    );
  }

  // =====================================================
  // Rename
  // =====================================================

  @Patch(":id/rename")
  rename(
    @Req()
    req: any,

    @Param("id")
    id: string,

    @Body()
    dto: RenameFileDto,
  ) {
    return this.filesService.rename(
      req.user.sub,
      id,
      dto.name,
    );
  }

  // =====================================================
  // Move
  // =====================================================

  @Patch(":id/move")
  move(
    @Req()
    req: any,

    @Param("id")
    id: string,

    @Body()
    dto: MoveFileDto,
  ) {
    return this.filesService.move(
      req.user.sub,
      id,
      dto.parentFolder ?? null,
    );
  }

  // =====================================================
  // Share
  // =====================================================

  @Patch(":id/share")
  share(
    @Req()
    req: any,

    @Param("id")
    id: string,

    @Body()
    dto: ShareFileDto,
  ) {
    return this.filesService.share(
      req.user.sub,
      id,
      dto.employeeIds,
    );
  }

  // =====================================================
  // Favorite
  // =====================================================

  @Patch(":id/favorite")
  favorite(
    @Req()
    req: any,

    @Param("id")
    id: string,
  ) {
    return this.filesService.toggleFavorite(
      req.user.sub,
      id,
    );
  }

  // =====================================================
  // Delete
  // =====================================================

  @Delete(":id")
  delete(
    @Req()
    req: any,

    @Param("id")
    id: string,
  ) {
    return this.filesService.delete(
      req.user.sub,
      id,
    );
  }
}
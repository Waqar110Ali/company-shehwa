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
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";
import { Role } from "@/users/enums/role.enum";

import { CloudinaryService } from "@/common/cloudinary/cloudinary.service";

import { CoursesService } from "../services/courses.service";
import { AdminReviewService } from "../services/admin-review.service";
import { PaymentSettingsService } from "../services/payment-settings.service";

import { CreateCourseDto } from "../dto/create-course.dto";
import { UpdateCourseDto } from "../dto/update-course.dto";
import { AddVideoDto } from "../dto/add-video.dto";
import { UpdateVideoDto } from "../dto/update-video.dto";
import { ApproveRequestDto } from "../dto/approve-request.dto";
import { RejectRequestDto } from "../dto/reject-request.dto";
import { UpdatePaymentSettingsDto } from "../dto/update-payment-settings.dto";

import {
  PaymentRequestStatus,
  PaymentRequestType,
} from "../enums/payment-request.enum";

// Deliberately its own controller/prefix (/tutorials/admin/*) —
// gated by the ADMIN role for security, but not wired into any of
// the existing admin-portal pages or navigation. Whoever manages
// this ends up with a standalone screen, same as the rest of the
// student side.
@Controller("tutorials/admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class TutorialsAdminController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly adminReviewService: AdminReviewService,
    private readonly paymentSettingsService: PaymentSettingsService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // =====================================================
  // Courses
  // =====================================================

  @Get("courses")
  listCourses() {
    return this.coursesService.listAllForAdmin();
  }

  @Get("courses/:id")
  getCourse(@Param("id") id: string) {
    return this.coursesService.getByIdOrThrow(id);
  }

  @Post("courses")
  createCourse(
    @Req() req: any,
    @Body() dto: CreateCourseDto,
  ) {
    return this.coursesService.create(dto, req.user.sub);
  }

  @Patch("courses/:id")
  updateCourse(
    @Param("id") id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, dto);
  }

  @Delete("courses/:id")
  removeCourse(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }

  // =====================================================
  // Lecture (video) uploads — same pattern as the portfolio
  // module's "upload-image": upload the file first, get back a
  // hosted URL, then save that URL onto the course.
  // =====================================================

  @Post("upload-thumbnail")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const upload: any = await this.cloudinary.uploadFile(
      file,
      "company-management/tutorials/thumbnails",
    );

    return {
      success: true,
      data: { url: upload.secure_url },
    };
  }

  @Post("upload-video")
  @UseInterceptors(
    FileInterceptor("file", {
      // Lecture videos can be large — allow up to ~500MB. For very
      // large libraries, prefer pasting an external hosted URL
      // (YouTube/S3/etc) into `videoUrl` instead of uploading here.
      limits: { fileSize: 500 * 1024 * 1024 },
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const upload: any = await this.cloudinary.uploadFile(
      file,
      "company-management/tutorials/videos",
    );

    return {
      success: true,
      data: {
        url: upload.secure_url,
        durationMinutes: upload.duration
          ? Math.ceil(upload.duration / 60)
          : undefined,
      },
    };
  }

  // =====================================================
  // Lectures (videos) on a course
  // =====================================================

  @Post("courses/:id/videos")
  addVideo(
    @Param("id") id: string,
    @Body() dto: AddVideoDto,
  ) {
    return this.coursesService.addVideo(id, dto);
  }

  @Patch("courses/:id/videos/:videoId")
  updateVideo(
    @Param("id") id: string,
    @Param("videoId") videoId: string,
    @Body() dto: UpdateVideoDto,
  ) {
    return this.coursesService.updateVideo(id, videoId, dto);
  }

  @Delete("courses/:id/videos/:videoId")
  removeVideo(
    @Param("id") id: string,
    @Param("videoId") videoId: string,
  ) {
    return this.coursesService.removeVideo(id, videoId);
  }

  // =====================================================
  // Payment requests (enrollments + wallet top-ups)
  // =====================================================

  @Get("requests")
  listRequests(
    @Query("status") status?: PaymentRequestStatus,
    @Query("type") type?: PaymentRequestType,
  ) {
    return this.adminReviewService.list(status, type);
  }

  @Patch("requests/:id/approve")
  approveRequest(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: ApproveRequestDto,
  ) {
    return this.adminReviewService.approve(id, req.user.sub, dto);
  }

  @Patch("requests/:id/reject")
  rejectRequest(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: RejectRequestDto,
  ) {
    return this.adminReviewService.reject(id, req.user.sub, dto);
  }

  // =====================================================
  // Payment settings (QR code + bank details) — edited the same
  // way as any other content section, just scoped to tutorials.
  // =====================================================

  @Get("payment-settings")
  getPaymentSettings() {
    return this.paymentSettingsService.get();
  }

  @Patch("payment-settings")
  updatePaymentSettings(@Body() dto: UpdatePaymentSettingsDto) {
    return this.paymentSettingsService.update(dto);
  }

  @Post("upload-qr-code")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadQrCode(@UploadedFile() file: Express.Multer.File) {
    const upload: any = await this.cloudinary.uploadFile(
      file,
      "company-management/tutorials/payment-qr",
    );

    return {
      success: true,
      data: { url: upload.secure_url },
    };
  }
}
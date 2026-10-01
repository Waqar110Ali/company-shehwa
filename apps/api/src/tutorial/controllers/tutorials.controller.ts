import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

import { TutorialsAuthService } from "../services/tutorials-auth.service";
import { CoursesService } from "../services/courses.service";
import { WalletService } from "../services/wallet.service";
import { EnrollmentService } from "../services/enrollment.service";
import { PaymentSettingsService } from "../services/payment-settings.service";

import { TutorialRegisterDto } from "../dto/tutorial-register.dto";
import { CreateEnrollmentDto } from "../dto/create-enrollment.dto";
import { CreateTopupDto } from "../dto/create-topup.dto";

// Everything here is intentionally separate from /auth/create-user
// (admin-only) and from the main company dashboard's data — this
// controller is the entire surface area of the public "apply for a
// tutorial" flow.
@Controller("tutorials")
export class TutorialsController {
  constructor(
    private readonly tutorialsAuthService: TutorialsAuthService,
    private readonly coursesService: CoursesService,
    private readonly walletService: WalletService,
    private readonly enrollmentService: EnrollmentService,
    private readonly paymentSettingsService: PaymentSettingsService,
  ) {}

  // =====================================================
  // Public
  // =====================================================

  @Post("register")
  register(
    @Body()
    dto: TutorialRegisterDto,
  ) {
    return this.tutorialsAuthService.register(dto);
  }

  @Get("courses")
  listCourses() {
    return this.coursesService.listPublished();
  }

  // QR code / bank details shown on the payment & top-up pages.
  // Public (no guard) so it can render on the payment page even in
  // the split second before the JWT interceptor has attached, and
  // there's nothing sensitive in it — it's meant to be shown to
  // anyone who's about to pay.
  @Get("payment-settings")
  paymentSettings() {
    return this.paymentSettingsService.get();
  }

  // =====================================================
  // Authenticated student
  // =====================================================

  @UseGuards(JwtAuthGuard)
  @Get("courses/:id")
  courseDetail(
    @Req() req: any,
    @Param("id") id: string,
  ) {
    return this.enrollmentService.courseDetail(
      req.user.sub,
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("enrollments")
  @UseInterceptors(
    FileInterceptor("proof", {
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  enroll(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEnrollmentDto,
  ) {
    return this.enrollmentService.requestEnrollment(
      req.user.sub,
      dto.courseId,
      file,
      dto.note,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("enrollments/me")
  myEnrollments(@Req() req: any) {
    return this.enrollmentService.myEnrollments(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get("my-courses")
  myCourses(@Req() req: any) {
    return this.enrollmentService.myCourses(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get("wallet")
  wallet(@Req() req: any) {
    return this.walletService.getWallet(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post("wallet/topup")
  @UseInterceptors(
    FileInterceptor("proof", {
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  topup(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateTopupDto,
  ) {
    return this.enrollmentService.requestTopup(
      req.user.sub,
      dto.coinsRequested,
      file,
      dto.note,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post("courses/:courseId/videos/:videoId/watch")
  watchVideo(
    @Req() req: any,
    @Param("courseId") courseId: string,
    @Param("videoId") videoId: string,
  ) {
    return this.enrollmentService.watchVideo(
      req.user.sub,
      courseId,
      videoId,
    );
  }
}
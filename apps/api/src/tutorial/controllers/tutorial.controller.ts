import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";

import { TutorialService } from "../services/tutorial.service";
import { RegisterTutorialUserDto } from "../dto/register-tutorial-user.dto";
import { EnrollCourseDto } from "../dto/enroll-course.dto";
import { SubmitPaymentDto } from "../dto/submit-payment.dto";
import { ReviewPaymentDto } from "../dto/review-payment.dto";
import { WatchLectureDto } from "../dto/watch-lecture.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../users/enums/role.enum";

@Controller("tutorial")
export class TutorialController {
  constructor(
    private readonly tutorialService: TutorialService,
  ) {}

  @Post("register")
  register(@Body() dto: RegisterTutorialUserDto) {
    return this.tutorialService.createTutorialUser(dto);
  }

  @Get("courses")
  getCourses() {
    return this.tutorialService.listCourses();
  }

  @Get("profile")
  getProfile(@Req() req: any) {
    const userId = req?.user?.id ?? req?.query?.userId;

    if (!userId) {
      return {
        success: false,
        message: "User id is required.",
      };
    }

    return this.tutorialService.getTutorialProfile(userId);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Req() req: any) {
    return this.tutorialService.getOrCreateAuthUser(req.user);
  }

  @Post("enroll")
  enroll(@Body() dto: EnrollCourseDto) {
    return this.tutorialService.enrollCourse(
      dto.userId,
      dto.courseId,
    );
  }

  @Post("payment/submit")
  submitPayment(@Body() dto: SubmitPaymentDto) {
    return this.tutorialService.submitPayment(
      dto.userId,
      dto,
    );
  }

  @Get("payments")
  getPayments(@Query("userId") userId?: string) {
    return this.tutorialService.listPayments(userId);
  }

  @Get("admin-overview")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAdminOverview() {
    return this.tutorialService.getAdminOverview();
  }

  @Post("payments/:id/review")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  reviewPayment(
    @Param("id") id: string,
    @Body() dto: ReviewPaymentDto,
  ) {
    return this.tutorialService.reviewPayment(
      id,
      dto,
    );
  }

  @Post("lecture/watch")
  watchLecture(@Body() dto: WatchLectureDto) {
    return this.tutorialService.watchLecture(
      dto.userId,
      dto.courseId,
      dto.lectureId,
    );
  }
}

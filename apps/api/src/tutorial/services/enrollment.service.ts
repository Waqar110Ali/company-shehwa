import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CloudinaryService } from "@/common/cloudinary/cloudinary.service";

import { CoursesService } from "./courses.service";
import { WalletService } from "./wallet.service";

import { EnrollmentsRepository } from "../repositories/enrollments.repository";
import { PaymentRequestsRepository } from "../repositories/payment-requests.repository";
import { VideoAccessRepository } from "../repositories/video-access.repository";

import { EnrollmentStatus } from "../enums/enrollment-status.enum";
import {
  PaymentRequestStatus,
  PaymentRequestType,
} from "../enums/payment-request.enum";

const PROOF_FOLDER = "company-management/tutorials/payment-proofs";

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly walletService: WalletService,
    private readonly enrollmentsRepository: EnrollmentsRepository,
    private readonly paymentRequestsRepository: PaymentRequestsRepository,
    private readonly videoAccessRepository: VideoAccessRepository,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // =====================================================
  // Course detail (teaser vs unlocked, depending on access)
  // =====================================================

  async courseDetail(userId: string, courseId: string) {
    const course = await this.coursesService.getPublishedOrThrow(
      courseId,
    );

    const enrollment = await this.enrollmentsRepository.findOne(
      userId,
      courseId,
    );

    const isActive =
      enrollment?.status === EnrollmentStatus.ACTIVE;

    let unlockedVideoIds = new Set<string>();

    if (isActive) {
      const access =
        await this.videoAccessRepository.findAllForUserAndCourse(
          userId,
          courseId,
        );

      unlockedVideoIds = new Set(access.map((a) => a.videoId));
    }

    const videos = [...course.videos]
      .sort((a, b) => a.order - b.order)
      .map((video) => {
        const unlocked =
          isActive &&
          (video.coinCost === 0 ||
            unlockedVideoIds.has(String(video._id)));

        return {
          id: String(video._id),
          title: video.title,
          durationMinutes: video.durationMinutes,
          coinCost: video.coinCost,
          order: video.order,
          // Only ever reveal the description/URL for videos the
          // student can actually access.
          description: isActive ? video.description : undefined,
          videoUrl: unlocked ? video.videoUrl : null,
          unlocked: isActive ? unlocked : false,
        };
      });

    return {
      id: String(course._id),
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      priceLabel: course.priceLabel,
      coinsIncluded: course.coinsIncluded,
      enrollmentStatus: enrollment?.status ?? "NONE",
      videos,
    };
  }

  // =====================================================
  // Enroll (payment proof -> pending review)
  // =====================================================

  async requestEnrollment(
    userId: string,
    courseId: string,
    file: Express.Multer.File,
    note?: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        "Please attach your payment proof (screenshot or PDF).",
      );
    }

    const course = await this.coursesService.getPublishedOrThrow(
      courseId,
    );

    const existingEnrollment =
      await this.enrollmentsRepository.findOne(userId, courseId);

    if (existingEnrollment?.status === EnrollmentStatus.ACTIVE) {
      throw new BadRequestException(
        "You already have access to this course.",
      );
    }

    const pendingRequest =
      await this.paymentRequestsRepository.findPendingForUserAndCourse(
        userId,
        courseId,
      );

    if (pendingRequest) {
      throw new BadRequestException(
        "You already have a pending enrollment request for this course.",
      );
    }

    const upload: any = await this.cloudinary.uploadFile(
      file,
      PROOF_FOLDER,
    );

    const request = await this.paymentRequestsRepository.create({
      user: userId as any,
      type: PaymentRequestType.ENROLLMENT,
      course: course._id as any,
      note: note ?? "",
      proofUrl: upload.secure_url,
      proofPublicId: upload.public_id,
      status: PaymentRequestStatus.PENDING,
    });

    await this.enrollmentsRepository.upsertPending(userId, courseId);

    return {
      success: true,
      message:
        "Enrollment request submitted. You'll get access once an admin approves your payment proof.",
      data: request,
    };
  }

  // =====================================================
  // Wallet top-up (payment proof -> pending review)
  // =====================================================

  async requestTopup(
    userId: string,
    coinsRequested: number,
    file: Express.Multer.File,
    note?: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        "Please attach your payment proof (screenshot or PDF).",
      );
    }

    const upload: any = await this.cloudinary.uploadFile(
      file,
      PROOF_FOLDER,
    );

    const request = await this.paymentRequestsRepository.create({
      user: userId as any,
      type: PaymentRequestType.TOPUP,
      coinsRequested,
      note: note ?? "",
      proofUrl: upload.secure_url,
      proofPublicId: upload.public_id,
      status: PaymentRequestStatus.PENDING,
    });

    return {
      success: true,
      message:
        "Top-up request submitted. Coins will appear in your wallet once an admin approves your payment proof.",
      data: request,
    };
  }

  // =====================================================
  // My enrollments / my courses
  // =====================================================

  async myEnrollments(userId: string) {
    return this.paymentRequestsRepository.findAllForUser(userId);
  }

  async myCourses(userId: string) {
    const enrollments =
      await this.enrollmentsRepository.findActiveForUser(userId);

    return enrollments.map((e: any) => ({
      enrollmentId: String(e._id),
      approvedAt: e.approvedAt,
      course: {
        id: String(e.course._id),
        title: e.course.title,
        thumbnailUrl: e.course.thumbnailUrl,
        videosCount: e.course.videos?.length ?? 0,
      },
    }));
  }

  // =====================================================
  // Watch / unlock a lecture
  // =====================================================

  async watchVideo(
    userId: string,
    courseId: string,
    videoId: string,
  ) {
    const enrollment = await this.enrollmentsRepository.findOne(
      userId,
      courseId,
    );

    if (enrollment?.status !== EnrollmentStatus.ACTIVE) {
      throw new ForbiddenException(
        "Enroll in this course and get approved to watch its lectures.",
      );
    }

    const course = await this.coursesService.getByIdOrThrow(courseId);

    const video = await this.coursesService.findVideoOrThrow(
      course,
      videoId,
    );

    // Free preview lecture — always watchable, nothing to unlock.
    if (video.coinCost === 0) {
      return {
        success: true,
        data: { videoUrl: video.videoUrl, unlocked: true },
      };
    }

    const existingAccess = await this.videoAccessRepository.findOne(
      userId,
      videoId,
    );

    if (existingAccess) {
      return {
        success: true,
        data: { videoUrl: video.videoUrl, unlocked: true },
      };
    }

    if (!course.isPublished) {
      throw new NotFoundException("Course not found.");
    }

    await this.walletService.debit(
      userId,
      video.coinCost,
      `Unlocked lecture: ${video.title}`,
      { course: courseId, videoId },
    );

    await this.videoAccessRepository.create({
      user: userId as any,
      course: courseId as any,
      videoId,
      coinsSpent: video.coinCost,
    });

    return {
      success: true,
      data: { videoUrl: video.videoUrl, unlocked: true },
    };
  }
}
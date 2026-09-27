import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PaymentRequestsRepository } from "../repositories/payment-request.repository";
import { EnrollmentsRepository } from "../repositories/enrollment.repository";
import { CoursesRepository } from "../repositories/courses.repository";

import { WalletService } from "../services/wallet.services";

import { EnrollmentStatus } from "../enums/Enrollment-status-enums";
import {
  PaymentRequestStatus,
  PaymentRequestType,
} from "../enums/payment-request-enums";

import { ApproveRequestDto } from "../dto/approve-request.dto";
import { RejectRequestDto } from "../dto/reject-request.dto";

@Injectable()
export class AdminReviewService {
  constructor(
    private readonly paymentRequestsRepository: PaymentRequestsRepository,
    private readonly enrollmentsRepository: EnrollmentsRepository,
    private readonly coursesRepository: CoursesRepository,
    private readonly walletService: WalletService,
  ) {}

  async list(status?: PaymentRequestStatus, type?: PaymentRequestType) {
    return this.paymentRequestsRepository.findForAdmin({
      status,
      type,
    });
  }

  async approve(
    requestId: string,
    adminId: string,
    dto: ApproveRequestDto,
  ) {
    const request = await this.paymentRequestsRepository.findById(
      requestId,
    );

    if (!request) {
      throw new NotFoundException("Request not found.");
    }

    if (request.status !== PaymentRequestStatus.PENDING) {
      throw new BadRequestException(
        "This request has already been reviewed.",
      );
    }

    const userId = String(request.user);

    if (request.type === PaymentRequestType.ENROLLMENT) {
      const courseId = String(request.course);

      const course = await this.coursesRepository.findById(courseId);

      if (!course) {
        throw new NotFoundException(
          "The course for this request no longer exists.",
        );
      }

      await this.enrollmentsRepository.setStatus(
        userId,
        courseId,
        EnrollmentStatus.ACTIVE,
      );

      if (course.coinsIncluded > 0) {
        await this.walletService.credit(
          userId,
          course.coinsIncluded,
          `Enrollment bonus — ${course.title}`,
          { course: courseId, paymentRequest: requestId },
        );
      }

      request.coinsGranted = course.coinsIncluded;
    } else {
      const coinsGranted =
        dto.coinsGranted ?? request.coinsRequested ?? 0;

      await this.walletService.credit(
        userId,
        coinsGranted,
        "Wallet top-up approved",
        { paymentRequest: requestId },
      );

      request.coinsGranted = coinsGranted;
    }

    request.status = PaymentRequestStatus.APPROVED;
    request.reviewedBy = adminId as any;
    request.reviewedAt = new Date();
    request.reviewNote = dto.note ?? "";

    await request.save();

    return {
      success: true,
      message: "Request approved.",
      data: request,
    };
  }

  async reject(
    requestId: string,
    adminId: string,
    dto: RejectRequestDto,
  ) {
    const request = await this.paymentRequestsRepository.findById(
      requestId,
    );

    if (!request) {
      throw new NotFoundException("Request not found.");
    }

    if (request.status !== PaymentRequestStatus.PENDING) {
      throw new BadRequestException(
        "This request has already been reviewed.",
      );
    }

    if (request.type === PaymentRequestType.ENROLLMENT) {
      await this.enrollmentsRepository.setStatus(
        String(request.user),
        String(request.course),
        EnrollmentStatus.REJECTED,
      );
    }

    request.status = PaymentRequestStatus.REJECTED;
    request.reviewedBy = adminId as any;
    request.reviewedAt = new Date();
    request.rejectionReason = dto.reason;

    await request.save();

    return {
      success: true,
      message: "Request rejected.",
      data: request,
    };
  }
}
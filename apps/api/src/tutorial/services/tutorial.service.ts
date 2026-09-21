import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { RegisterTutorialUserDto } from "../dto/register-tutorial-user.dto";
import { SubmitPaymentDto } from "../dto/submit-payment.dto";
import { ReviewPaymentDto } from "../dto/review-payment.dto";
import { TutorialRepository } from "../repositories/tutorial.repository";

@Injectable()
export class TutorialService {
  constructor(
    private readonly tutorialRepository: TutorialRepository,
  ) {}

  async createTutorialUser(data: RegisterTutorialUserDto) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existing = await this.tutorialRepository.findUserByEmail(normalizedEmail);

    if (existing) {
      throw new BadRequestException("This email is already registered.");
    }

    const user = await this.tutorialRepository.createUser({
      fullName: data.fullName.trim(),
      email: normalizedEmail,
      phone: data.phone ?? "",
      city: data.city ?? "",
      status: "pending",
      hasAccess: false,
      isPaymentVerified: false,
      coins: 0,
    });

    return {
      success: true,
      data: user,
    };
  }

  async listCourses() {
    const courses = await this.tutorialRepository.ensureCourseSeed();

    return {
      success: true,
      data: courses,
    };
  }

  async getTutorialProfile(userId: string) {
    const user = await this.tutorialRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException("Tutorial user not found.");
    }

    return {
      success: true,
      data: user,
    };
  }

  async enrollCourse(userId: string, courseId: string) {
    const user = await this.tutorialRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const course = await this.tutorialRepository.findCourseById(courseId);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    const alreadyEnrolled = (user.enrollments ?? []).some(
      (entry: any) => String(entry.courseId) === String(courseId),
    );

    if (alreadyEnrolled) {
      return {
        success: false,
        message: "User is already enrolled in this course.",
      };
    }

    const updatedUser = await this.tutorialRepository.addEnrollment(userId, courseId);

    return {
      success: true,
      message: "Enrollment created successfully.",
      data: {
        user: updatedUser,
        course,
      },
    };
  }

  async submitPayment(userId: string, dto: SubmitPaymentDto) {
    const user = await this.tutorialRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const course = await this.tutorialRepository.findCourseById(dto.courseId);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    const paymentRequest = await this.tutorialRepository.createPaymentRequest({
      userId,
      courseId: dto.courseId,
      amount: dto.amount,
      paymentMethod: dto.paymentMethod,
      screenshotUrl: dto.screenshotUrl ?? "",
      status: "pending",
      rejectionReason: "",
      reviewedBy: "",
    });

    await this.tutorialRepository.addPaymentHistory(userId, String(paymentRequest._id));

    return {
      success: true,
      message: "Payment request submitted successfully. Admin review is pending.",
      data: paymentRequest,
    };
  }

  async listPayments(userId?: string) {
    const payments = await this.tutorialRepository.listPayments(userId);

    return {
      success: true,
      data: payments,
    };
  }

  async reviewPayment(id: string, dto: ReviewPaymentDto) {
    const payment = await this.tutorialRepository.findPaymentById(id);

    if (!payment) {
      throw new NotFoundException("Payment request not found.");
    }

    const user = await this.tutorialRepository.findUserById(String(payment.userId));

    if (!user) {
      throw new NotFoundException("User not found for payment review.");
    }

    const course = await this.tutorialRepository.findCourseById(String(payment.courseId));

    if (!course) {
      throw new NotFoundException("Course not found for payment review.");
    }

    if (dto.status === "approved") {
      await this.tutorialRepository.updateUser(String(user._id), {
        status: "approved",
        hasAccess: true,
        isPaymentVerified: true,
        coins: Number(user.coins ?? 0) + Number(course.rewardCoins ?? 0),
      });
    } else if (dto.status === "rejected") {
      await this.tutorialRepository.updateUser(String(user._id), {
        status: "rejected",
        hasAccess: false,
        isPaymentVerified: false,
      });
    }

    const updatedPayment = await this.tutorialRepository.updatePaymentRequest(id, {
      status: dto.status,
      rejectionReason: dto.rejectionReason ?? "",
      reviewedBy: dto.reviewedBy ?? "admin",
    });

    return {
      success: true,
      data: updatedPayment,
    };
  }

  async watchLecture(userId: string, courseId: string, lectureId: string) {
    const user = await this.tutorialRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    if (user.status !== "approved" || !user.hasAccess) {
      throw new UnauthorizedException("User access is not approved yet.");
    }

    const course = await this.tutorialRepository.findCourseById(courseId);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    const lecture = (course.lectures ?? []).find(
      (item: any) => String(item._id) === String(lectureId),
    );

    if (!lecture) {
      throw new NotFoundException("Lecture not found.");
    }

    if (lecture.watched) {
      return {
        success: true,
        message: "Lecture already watched.",
        data: lecture,
      };
    }

    const requiredCoins = Number(lecture.coinCost ?? 0);
    const currentCoins = Number(user.coins ?? 0);

    if (currentCoins < requiredCoins) {
      throw new BadRequestException(
        `You need ${requiredCoins} coins to unlock this lecture.`,
      );
    }

    const updatedUser = await this.tutorialRepository.updateUser(userId, {
      coins: currentCoins - requiredCoins,
    });

    await this.tutorialRepository.markLectureWatched(courseId, lectureId);

    return {
      success: true,
      message: "Lecture completed and coins deducted successfully.",
      data: {
        user: updatedUser,
        lecture: {
          ...lecture,
          watched: true,
        },
      },
    };
  }
}

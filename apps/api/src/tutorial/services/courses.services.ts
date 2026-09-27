import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CoursesRepository } from "../repositories/courses.repository";
import { Course, CourseDocument } from "../schemas/course.schema";
import { CreateCourseDto } from "../dto/create-course.dto";
import { UpdateCourseDto } from "../dto/update-course.dto";
import { AddVideoDto } from "../dto/add-video.dto";
import { UpdateVideoDto } from "../dto/update-video.dto";

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
  ) {}

  // =====================================================
  // Public / student-facing
  // =====================================================

  async listPublished() {
    const courses = await this.coursesRepository.findPublished();

    return {
      success: true,
      data: courses.map((course) => this.toPublicSummary(course)),
    };
  }

  async getPublishedOrThrow(id: string) {
    const course = await this.coursesRepository.findById(id);

    if (!course || !course.isPublished) {
      throw new NotFoundException("Course not found.");
    }

    return course;
  }

  async getByIdOrThrow(id: string) {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    return course;
  }

  findVideoOrThrow(course: CourseDocument, videoId: string) {
    const video = course.videos.find(
      (item) => String(item._id) === String(videoId),
    );

    if (!video) {
      throw new NotFoundException("Lecture not found.");
    }

    return video;
  }

  // =====================================================
  // Admin
  // =====================================================

  async listAllForAdmin() {
    const courses = await this.coursesRepository.findAll();

    return {
      success: true,
      data: courses,
    };
  }

  async create(dto: CreateCourseDto, adminId: string) {
    const course = await this.coursesRepository.create({
      ...dto,
      videos: [],
      createdBy: adminId as any,
    } as Partial<Course>);

    return {
      success: true,
      message: "Course created.",
      data: course,
    };
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.coursesRepository.update(id, dto);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    return {
      success: true,
      message: "Course updated.",
      data: course,
    };
  }

  async remove(id: string) {
    const course = await this.coursesRepository.remove(id);

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    return {
      success: true,
      message: "Course deleted.",
    };
  }

  async addVideo(id: string, dto: AddVideoDto) {
    const existing = await this.getByIdOrThrow(id);

    const order =
      dto.order ??
      existing.videos.reduce(
        (max, video) => Math.max(max, video.order),
        0,
      ) + 1;

    const course = await this.coursesRepository.addVideo(id, {
      ...dto,
      order,
    });

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    return {
      success: true,
      message: "Lecture added.",
      data: course,
    };
  }

  async updateVideo(id: string, videoId: string, dto: UpdateVideoDto) {
    const course = await this.coursesRepository.updateVideo(
      id,
      videoId,
      dto,
    );

    if (!course) {
      throw new NotFoundException("Course or lecture not found.");
    }

    return {
      success: true,
      message: "Lecture updated.",
      data: course,
    };
  }

  async removeVideo(id: string, videoId: string) {
    const course = await this.coursesRepository.removeVideo(
      id,
      videoId,
    );

    if (!course) {
      throw new NotFoundException("Course not found.");
    }

    return {
      success: true,
      message: "Lecture removed.",
      data: course,
    };
  }

  // =====================================================
  // Helpers
  // =====================================================

  private toPublicSummary(course: CourseDocument) {
    return {
      id: String(course._id),
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      priceLabel: course.priceLabel,
      coinsIncluded: course.coinsIncluded,
      videosCount: course.videos.length,
      freePreviewCount: course.videos.filter(
        (video) => video.coinCost === 0,
      ).length,
    };
  }
}
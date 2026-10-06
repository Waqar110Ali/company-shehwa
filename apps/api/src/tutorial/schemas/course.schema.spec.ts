import { model } from "mongoose";
import { describe, it, expect } from "@jest/globals";
import { CourseSchema } from "./course.schema";

describe("lecture upload metadata persistence", () => {
  const Course = model("UploadMetadataTestCourse", CourseSchema);

  it("retains the URL and public ID in the serialized database document", () => {
    const course = new Course({
      title: "Course",
      videos: [{
        title: "Lecture", videoUrl: "https://res.cloudinary.com/cloud/video/upload/lecture.mp4",
        cloudinaryPublicId: "company-management/tutorials/videos/lecture",
        durationMinutes: 2, coinCost: 0, order: 1,
      }],
    });
    expect(course.validateSync()).toBeUndefined();
    expect(course.toObject().videos[0]).toMatchObject({
      videoUrl: "https://res.cloudinary.com/cloud/video/upload/lecture.mp4",
      cloudinaryPublicId: "company-management/tutorials/videos/lecture",
    });
  });

  it("continues to accept externally hosted and existing video URLs", () => {
    const course = new Course({ title: "Course", videos: [{ title: "Lecture", videoUrl: "https://example.com/video.mp4" }] });
    expect(course.validateSync()).toBeUndefined();
    expect(course.toObject().videos[0].cloudinaryPublicId).toBe("");
  });
});

import { Injectable } from "@nestjs/common";

import { Attendance } from "../schemas/attendance.schema";

@Injectable()
export class AttendanceMapper {
  toResponse(attendance: Attendance | any) {
    return {
      id: attendance._id.toString(),

      employeeId:
        attendance.employee?._id?.toString() ??
        attendance.employee?.toString(),

      employeeName:
        attendance.employee?.fullName ??
        `${attendance.employee?.firstName ?? ""} ${attendance.employee?.lastName ?? ""}`.trim(),

      avatar:
        attendance.employee?.avatar ?? "",

      department:
        attendance.employee?.department ?? "",

      date: attendance.date,

      checkIn: attendance.checkIn,

      checkOut: attendance.checkOut,

      workingHours:
        attendance.workingHours,

      status: attendance.status,

      createdAt:
        attendance.createdAt,

      updatedAt:
        attendance.updatedAt,
    };
  }

  toCollection(
    attendance: Attendance[] | any[],
  ) {
    return attendance.map((item) =>
      this.toResponse(item),
    );
  }
}
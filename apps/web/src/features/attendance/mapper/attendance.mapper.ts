import type { Attendance } from "../types/attendance";

export interface AttendanceResponse {
  items: Attendance[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AttendanceStatistics {
  total: number;

  present: number;

  late: number;

  absent: number;

  leave: number;
}

function mapAttendance(
  attendance: any,
): Attendance {
  return {
    id:
      attendance._id ??
      attendance.id,

    employeeId:
      attendance.employee?._id ??
      attendance.employee?.id ??
      attendance.employee ??
      "",

    employeeName:
      attendance.employee?.fullName ??
      attendance.employee?.name ??
      `${attendance.employee?.firstName ?? ""} ${attendance.employee?.lastName ?? ""}`.trim(),

    avatar:
      attendance.employee?.avatar ??
      "",

    department:
      attendance.employee?.department ??
      "",

    date:
      attendance.date
        ? attendance.date.substring(
            0,
            10,
          )
        : "",

    checkIn:
      attendance.checkIn ??
      "",

    checkOut:
      attendance.checkOut ??
      "",

    workingHours:
      attendance.workingHours ??
      0,

    status:
      attendance.status,
  };
}

export function mapAttendanceList(
  response: any,
): AttendanceResponse {
  const data =
    response.data ??
    response;

  if (
    Array.isArray(data)
  ) {
    return {
      items:
        data.map(
          mapAttendance,
        ),
    };
  }

  return {
    items:
      (
        data.items ??
        []
      ).map(
        mapAttendance,
      ),

    pagination:
      data.pagination,
  };
}

export function mapAttendanceDetails(
  response: any,
): Attendance {
  const data =
    response.data ??
    response;

  return mapAttendance(
    data,
  );
}

export function mapAttendanceStatistics(
  response: any,
): AttendanceStatistics {
  const data =
    response.data ??
    response;

  return {
    total:
      data.total ?? 0,

    present:
      data.present ?? 0,

    late:
      data.late ?? 0,

    absent:
      data.absent ?? 0,

    leave:
      data.leave ?? 0,
  };
}
import {
  Injectable,
  NotFoundException, Inject } from "@nestjs/common";

import { AttendanceRepository } from "../repositories/attendance.repository";

import { CreateAttendanceDto } from "../dto/create-attendance.dto";
import { UpdateAttendanceDto } from "../dto/update-attendance.dto";
import { AttendanceFilterDto } from "../dto/attendance-filter.dto";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(AttendanceRepository) private readonly attendanceRepository: AttendanceRepository,
  ) {}

  async create(
    dto: CreateAttendanceDto,
  ) {
    return this.attendanceRepository.create(
      dto,
    );
  }

  async findAll(
    filter: AttendanceFilterDto,
  ) {
    const query: any = {};

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.employee) {
      query.employee = filter.employee;
    }

    if (filter.date) {
      query.date = new Date(
        filter.date,
      );
    }

    const records =
      await this.attendanceRepository.findAll(
        query,
      );

    const items = records.filter(
      (record: any) => {
        const fullName =
          record.employee?.fullName ??
          `${record.employee?.firstName ?? ""} ${record.employee?.lastName ?? ""}`.trim();

        const matchesSearch =
          !filter.search ||
          fullName
            .toLowerCase()
            .includes(
              filter.search.toLowerCase(),
            );

        const matchesDepartment =
          !filter.department ||
          record.employee?.department ===
            filter.department;

        return (
          matchesSearch &&
          matchesDepartment
        );
      },
    );

    return items;
  }

  async findOne(
    id: string,
  ) {
    const attendance =
      await this.attendanceRepository.findById(
        id,
      );

    if (!attendance) {
      throw new NotFoundException(
        "Attendance record not found.",
      );
    }

    return attendance;
  }

  async update(
    id: string,
    dto: UpdateAttendanceDto,
  ) {
    const attendance =
      await this.attendanceRepository.update(
        id,
        dto,
      );

    if (!attendance) {
      throw new NotFoundException(
        "Attendance record not found.",
      );
    }

    return attendance;
  }

  async remove(
    id: string,
  ) {
    await this.attendanceRepository.remove(
      id,
    );

    return {
      message:
        "Attendance deleted successfully.",
    };
  }

  async statistics() {
    return this.attendanceRepository.getStatistics();
  }
}
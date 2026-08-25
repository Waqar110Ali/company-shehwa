import {
  Injectable,
  NotFoundException, Inject } from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
} from "mongoose";

import {
  Attendance,
  AttendanceDocument,
} from "../schemas/attendance.schema";

import {
  CreateAttendanceDto,
} from "../dto/create-attendance.dto";

import {
  UpdateAttendanceDto,
} from "../dto/update-attendance.dto";

@Injectable()
export class AttendanceRepository {
  constructor(
    @InjectModel(
      Attendance.name,
    ) @Inject(Model<AttendanceDocument>)
    private readonly attendanceModel: Model<AttendanceDocument>,
  ) {}

  private calculateWorkingHours(
    checkIn?: string,
    checkOut?: string,
  ): number {
    if (
      !checkIn ||
      !checkOut
    ) {
      return 0;
    }

    const start =
      new Date(
        `2026-01-01T${checkIn}`,
      );

    const end =
      new Date(
        `2026-01-01T${checkOut}`,
      );

    return Number(
      (
        (end.getTime() -
          start.getTime()) /
        3600000
      ).toFixed(1),
    );
  }

  async create(
    dto: CreateAttendanceDto,
  ) {
    const attendance =
      await this.attendanceModel.create(
        {
          employee:
            dto.employee,

          date: new Date(
            dto.date,
          ),

          checkIn:
            dto.checkIn,

          checkOut:
            dto.checkOut,

          workingHours:
            this.calculateWorkingHours(
              dto.checkIn,
              dto.checkOut,
            ),

          status:
            dto.status,
        },
      );

    return this.findById(
      attendance.id,
    );
  }

  async findAll(
    filter: FilterQuery<Attendance> = {},
  ) {
    return this.attendanceModel
      .find(filter)
      .populate({
        path: "employee",
        select:
          "firstName lastName fullName avatar department designation",
      })
      .sort({
        date: -1,
      })
      .lean();
  }

  async findById(
    id: string,
  ) {
    const attendance =
      await this.attendanceModel
        .findById(id)
        .populate({
          path: "employee",
          select:
            "firstName lastName fullName avatar department designation",
        })
        .lean();

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
    const existing =
      await this.attendanceModel.findById(
        id,
      );

    if (!existing) {
      throw new NotFoundException(
        "Attendance record not found.",
      );
    }

    const checkIn =
      dto.checkIn ??
      existing.checkIn;

    const checkOut =
      dto.checkOut ??
      existing.checkOut;

    await this.attendanceModel.findByIdAndUpdate(
      id,
      {
        ...dto,

        ...(dto.date && {
          date: new Date(
            dto.date,
          ),
        }),

        workingHours:
          this.calculateWorkingHours(
            checkIn,
            checkOut,
          ),
      },
      {
        new: true,
      },
    );

    return this.findById(id);
  }

  async remove(
    id: string,
  ) {
    const attendance =
      await this.attendanceModel.findByIdAndDelete(
        id,
      );

    if (!attendance) {
      throw new NotFoundException(
        "Attendance record not found.",
      );
    }

    return attendance;
  }

  async count(
    filter: FilterQuery<Attendance> = {},
  ) {
    return this.attendanceModel.countDocuments(
      filter,
    );
  }

  async getStatistics() {
    const [
      present,
      late,
      absent,
      leave,
    ] = await Promise.all([
      this.count({
        status:
          "Present",
      }),
      this.count({
        status:
          "Late",
      }),
      this.count({
        status:
          "Absent",
      }),
      this.count({
        status:
          "Leave",
      }),
    ]);

    return {
      total:
        present +
        late +
        absent +
        leave,

      present,

      late,

      absent,

      leave,
    };
  }
}
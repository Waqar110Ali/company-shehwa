import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

import { AttendanceService } from "../services/attendance.service";

import { CreateAttendanceDto } from "../dto/create-attendance.dto";
import { UpdateAttendanceDto } from "../dto/update-attendance.dto";
import { AttendanceFilterDto } from "../dto/attendance-filter.dto";

@UseGuards(JwtAuthGuard)
@Controller("attendance")
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateAttendanceDto,
  ) {
    return this.attendanceService.create(
      dto,
    );
  }

  @Get()
  findAll(
    @Query()
    filter: AttendanceFilterDto,
  ) {
    return this.attendanceService.findAll(
      filter,
    );
  }

  @Get("statistics")
  statistics() {
    return this.attendanceService.statistics();
  }

  @Get(":id")
  findOne(
    @Param("id")
    id: string,
  ) {
    return this.attendanceService.findOne(
      id,
    );
  }

  @Patch(":id")
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(
      id,
      dto,
    );
  }

  @Delete(":id")
  remove(
    @Param("id")
    id: string,
  ) {
    return this.attendanceService.remove(
      id,
    );
  }
}
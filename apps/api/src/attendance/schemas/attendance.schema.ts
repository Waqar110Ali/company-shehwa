import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { AttendanceStatus } from "../enums/attendance-status.enum";

@Schema({
  timestamps: true,
})
export class Attendance {
  @Prop({
    type: Types.ObjectId,
    ref: "Employee",
    required: true,
  })
  employee!: Types.ObjectId;

  @Prop({
    required: true,
  })
  date!: Date;

  @Prop()
  checkIn?: string;

  @Prop()
  checkOut?: string;

  @Prop({
    default: 0,
  })
  workingHours!: number;

  @Prop({
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status!: AttendanceStatus;
}

export type AttendanceDocument =
  HydratedDocument<Attendance>;

export const AttendanceSchema =
  SchemaFactory.createForClass(
    Attendance,
  );
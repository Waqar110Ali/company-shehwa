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
    type: Date,
    required: true,
  })
  date!: Date;

  @Prop({
    type: String,
  })
  checkIn?: string;

  @Prop({
    type: String,
  })
  checkOut?: string;

  @Prop({
    type: Number,
    default: 0,
  })
  workingHours!: number;

  @Prop({
    type: String,
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
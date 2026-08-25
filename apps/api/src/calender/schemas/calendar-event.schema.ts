import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { Employee } from "../../employees/schemas/employee.schema";

import { CalendarEventType } from "../enums/calendar-event-type.enum";

export type CalendarEventDocument =
  HydratedDocument<CalendarEvent>;

@Schema({
  timestamps: true,
})
export class CalendarEvent {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title!: string;

  @Prop({
    type: String,
    trim: true,
    default: "",
  })
  description!: string;

  @Prop({
    type: String,
    required: true,
    enum: CalendarEventType,
  })
  type!: CalendarEventType;

  @Prop({
    type: Date,
    required: true,
  })
  date!: Date;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  startTime!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  endTime!: string;

  @Prop({
    type: String,
    trim: true,
    default: "",
  })
  location!: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: Employee.name,
      },
    ],
    default: [],
  })
  attendees!: Types.ObjectId[];

  @Prop({
    type: String,
    default: "#06b6d4",
    trim: true,
  })
  color!: string;
}

export const CalendarEventSchema =
  SchemaFactory.createForClass(
    CalendarEvent,
  );
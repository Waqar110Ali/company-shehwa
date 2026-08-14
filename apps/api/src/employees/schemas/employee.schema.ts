import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import {
  HydratedDocument,
  Types,
} from "mongoose";

import { User } from "@/users/schemas/user.schema";

import { EmploymentType } from "../enums/employment-type.enum";
import { EmployeeStatus } from "../enums/employee-status.enum";
import { Gender } from "../enums/gender.enum";

export type EmployeeDocument =
  HydratedDocument<Employee>;

@Schema({
  timestamps: true,
})
export class Employee {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  employeeId!: string;

  /*
  ----------------------------------------------------
  NEW FIELD
  Does NOT affect existing modules
  ----------------------------------------------------
  */

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
    unique: true,
    sparse: true,
    index: true,
  })
  user?: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  firstName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName!: string;

  @Prop({
    required: true,
    trim: true,
  })
  fullName!: string;

  @Prop({
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  })
  email!: string;

  @Prop()
  phone?: string;

  @Prop({
    enum: Gender,
  })
  gender?: Gender;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  cnic?: string;

  @Prop({
    required: true,
  })
  department!: string;

  @Prop({
    required: true,
  })
  designation!: string;

  @Prop({
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType!: EmploymentType;

  @Prop()
  joiningDate?: Date;

  @Prop({
    default: 0,
  })
  salary!: number;

  @Prop({
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status!: EmployeeStatus;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  @Prop()
  emergencyContactName?: string;

  @Prop()
  emergencyContactPhone?: string;

  @Prop({
    default: "",
  })
  avatar!: string;

  @Prop({
    default: 0,
  })
  performance!: number;

  @Prop({
    default: 0,
  })
  attendance!: number;
}

export const EmployeeSchema =
  SchemaFactory.createForClass(Employee);

EmployeeSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

EmployeeSchema.set("toJSON", {
  virtuals: true,
});

EmployeeSchema.set("toObject", {
  virtuals: true,
});
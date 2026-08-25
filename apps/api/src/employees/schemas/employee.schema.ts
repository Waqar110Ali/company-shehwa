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
    type: String,
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
    type: String,
    required: true,
    trim: true,
  })
  firstName!: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  lastName!: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  fullName!: string;
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  })
  email!: string;
  @Prop({
    type: String,
  })
  phone?: string;
  @Prop({
    type: String,
    enum: Gender,
  })
  gender?: Gender;
  @Prop({
    type: Date,
  })
  dateOfBirth?: Date;
  @Prop({
    type: String,
  })
  cnic?: string;
  @Prop({
    type: String,
    required: true,
  })
  department!: string;
  @Prop({
    type: String,
    required: true,
  })
  designation!: string;
  @Prop({
    type: String,
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType!: EmploymentType;
  @Prop({
    type: Date,
  })
  joiningDate?: Date;
  @Prop({
    type: Number,
    default: 0,
  })
  salary!: number;
  @Prop({
    type: String,
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status!: EmployeeStatus;
  @Prop({
    type: String,
  })
  address?: string;
  @Prop({
    type: String,
  })
  city?: string;
  @Prop({
    type: String,
  })
  country?: string;
  @Prop({
    type: String,
  })
  emergencyContactName?: string;
  @Prop({
    type: String,
  })
  emergencyContactPhone?: string;
  @Prop({
    type: String,
    default: "",
  })
  avatar!: string;
  @Prop({
    type: Number,
    default: 0,
  })
  performance!: number;
  @Prop({
    type: Number,
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
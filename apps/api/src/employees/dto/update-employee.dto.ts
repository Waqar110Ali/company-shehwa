import { PartialType } from "@nestjs/mapped-types";

import { CreateEmployeeDto } from "./create-employee.dto";

export class UpdateEmployeeDto extends PartialType(
  CreateEmployeeDto,
) {
    firstName: any;
    lastName: any;
    joiningDate: any;
  dateOfBirth: any;
  email?: string;
  phone?: string;
  role?: import("../../users/enums/role.enum").Role;

  // No `avatar` override here — same reasoning as CreateEmployeeDto.
  // A new photo can only come from an uploaded "avatar" file on this
  // same PATCH request, never a plain string.
}
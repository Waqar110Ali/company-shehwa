import type { Employee } from "../types/employee";

import { Role } from "@/features/auth/types/role";

export interface EmployeesResponse {
  items: Employee[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ======================================================
// Employee Mapper
// ======================================================

export function mapEmployee(
  employee: any,
): Employee {
  const user =
    employee.user ?? {};

  return {
    id:
      employee._id ??
      employee.id ??
      "",

    firstName:
      employee.firstName ??
      user.firstName ??
      "",

    lastName:
      employee.lastName ??
      user.lastName ??
      "",

    name:
      employee.fullName ??
      employee.name ??
      `${employee.firstName ?? user.firstName ?? ""} ${
        employee.lastName ?? user.lastName ?? ""
      }`.trim(),

    email:
      employee.email ??
      user.email ??
      "",

    phone:
      employee.phone ??
      user.phone ??
      "",

    designation:
      employee.designation ??
      "",

    department:
      employee.department ??
      "",

    role:
      user.role ??
      employee.role ??
      Role.EMPLOYEE,

    avatar:
      employee.avatar ??
      user.avatar ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${employee.firstName ?? ""} ${employee.lastName ?? ""}`,
      )}`,

    performance:
      employee.performance ??
      0,

    attendance:
      employee.attendance ??
      0,

    joinedAt:
      employee.joiningDate ??
      employee.joinedAt ??
      employee.createdAt ??
      "",

    status:
      employee.status ??
      "ACTIVE",
  };
}

// ======================================================
// Employees Mapper
// ======================================================

export function mapEmployees(
  response: any,
): EmployeesResponse {
  const data =
    response?.data ??
    response;

  const list =
    data?.items ??
    data?.employees ??
    data?.data?.items ??
    data?.data?.employees ??
    [];

  return {
    items: list.map(
      mapEmployee,
    ),

    pagination:
      data?.pagination ??
      data?.data?.pagination,
  };
}

// ======================================================
// Employee Details
// ======================================================

export function mapEmployeeDetails(
  response: any,
): Employee {
  const data =
    response?.data ??
    response;

  return mapEmployee(data);
}
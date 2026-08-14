import { Role } from "@/features/auth/types/role";

export type EmployeeStatus =
  | "ACTIVE"
  | "ON_LEAVE"
  | "RESIGNED"
  | "TERMINATED";

export interface Employee {
  id: string;

  firstName: string;
  lastName: string;

  name: string;

  email: string;
  phone: string;

  designation: string;
  department: string;

  role: Role;

  avatar: string;

  performance: number;
  attendance: number;

  joinedAt: string;

  status: EmployeeStatus;

  /*
   * Only used while creating account.
   * Backend never returns them.
   */
  password?: string;
  confirmPassword?: string;
  avatarFile?: File | null;
}
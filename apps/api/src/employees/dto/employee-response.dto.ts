export class EmployeeResponseDto {
  id!: string;

  employeeId!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  phone?: string;

  designation!: string;

  department!: string;

  status!: string;

  avatar?: string;

  performance?: number;

  attendance?: number;

  joinedAt?: Date;
}
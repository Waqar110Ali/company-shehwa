export interface Employee {
  _id: string;

  employeeId: string;

  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  department: string;

  designation: string;

  status:
    | "Active"
    | "Pending"
    | "Suspended";

  avatar?: string;

  performance?: number;

  attendance?: number;

  joiningDate?: string;
}
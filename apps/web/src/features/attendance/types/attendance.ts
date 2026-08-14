export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Late"
  | "Leave";

export interface Attendance {
  id: string;

  employeeId: string;

  employeeName: string;

  avatar: string;

  department: string;

  date: string;

  checkIn: string;

  checkOut: string;

  workingHours: number;

  status: AttendanceStatus;
}
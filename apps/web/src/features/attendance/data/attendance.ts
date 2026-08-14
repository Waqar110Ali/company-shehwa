import type { Attendance } from "../types/attendance";

export const attendance: Attendance[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Waqar Ali",
    avatar: "https://i.pravatar.cc/100?img=11",
    department: "Management",
    date: "2026-07-18",
    checkIn: "09:00",
    checkOut: "06:00",
    workingHours: 9,
    status: "Present",
  },

  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Ahmed Khan",
    avatar: "https://i.pravatar.cc/100?img=13",
    department: "Backend",
    date: "2026-07-18",
    checkIn: "09:25",
    checkOut: "06:10",
    workingHours: 8.7,
    status: "Late",
  },

  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Sara Ahmed",
    avatar: "https://i.pravatar.cc/100?img=32",
    department: "Design",
    date: "2026-07-18",
    checkIn: "--",
    checkOut: "--",
    workingHours: 0,
    status: "Leave",
  },

  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Ali Raza",
    avatar: "https://i.pravatar.cc/100?img=25",
    department: "Frontend",
    date: "2026-07-18",
    checkIn: "--",
    checkOut: "--",
    workingHours: 0,
    status: "Absent",
  },

  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Fatima Noor",
    avatar: "https://i.pravatar.cc/100?img=45",
    department: "HR",
    date: "2026-07-18",
    checkIn: "08:50",
    checkOut: "05:45",
    workingHours: 8.9,
    status: "Present",
  },
];
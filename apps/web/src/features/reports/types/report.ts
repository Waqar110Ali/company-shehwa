export interface ReportStatistics {
  employees: number;
  projects: number;
  activeProjects: number;
  completedProjects: number;
  monthlyPayroll: number;
  averageSalary: number;
}

export interface PayrollDepartment {
  department: string;
  payroll: number;
  employees: number;
}

export interface PayrollReport {
  totalMonthly: number;
  averageSalary: number;
  byDepartment: PayrollDepartment[];
}

export interface AttendanceDepartment {
  department: string;
  attendance: number;
  employees: number;
}

export interface AttendanceReport {
  overall: number;
  employees: number;
  byDepartment: AttendanceDepartment[];
}

export interface PerformancePoint {
  id: string;
  employee: string;
  role: string;
  department: string;
  score: number;
}

export interface DepartmentReport {
  name: string;
  employees: number;
  payroll: number;
  averagePerformance: number;
  averageAttendance: number;
}

export interface ProjectReport {
  id: string;
  name: string;
  status: string;
  priority: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  startDate: string;
  dueDate: string;
  members: number;
}

export interface TaskStatistics {
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;
  completionRate: number;
}

export interface MonthlyEmployees {
  month: string;
  year: number;
  employees: number;
}

export interface ReportInsight {
  type:
    | "positive"
    | "neutral"
    | "warning";

  title: string;
  message: string;
}

export interface Reports {
  statistics: ReportStatistics;

  payroll: PayrollReport;

  attendance: AttendanceReport;

  performance: PerformancePoint[];

  departments: DepartmentReport[];

  projects: ProjectReport[];

  taskStatistics: TaskStatistics;

  monthlyEmployees: MonthlyEmployees[];

  insights: ReportInsight[];
}
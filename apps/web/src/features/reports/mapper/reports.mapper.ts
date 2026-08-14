import type {
  Reports,
} from "../types/report";

export function mapReports(
  response: Reports,
): Reports {
  return {
    statistics: {
      employees:
        response.statistics
          ?.employees ?? 0,

      projects:
        response.statistics
          ?.projects ?? 0,

      activeProjects:
        response.statistics
          ?.activeProjects ?? 0,

      completedProjects:
        response.statistics
          ?.completedProjects ?? 0,

      monthlyPayroll:
        response.statistics
          ?.monthlyPayroll ?? 0,

      averageSalary:
        response.statistics
          ?.averageSalary ?? 0,
    },

    payroll: {
      totalMonthly:
        response.payroll
          ?.totalMonthly ?? 0,

      averageSalary:
        response.payroll
          ?.averageSalary ?? 0,

      byDepartment:
        response.payroll
          ?.byDepartment ?? [],
    },

    attendance: {
      overall:
        response.attendance
          ?.overall ?? 0,

      employees:
        response.attendance
          ?.employees ?? 0,

      byDepartment:
        response.attendance
          ?.byDepartment ?? [],
    },

    performance:
      response.performance ?? [],

    departments:
      response.departments ?? [],

    projects:
      response.projects ?? [],

    taskStatistics: {
      totalTasks:
        response.taskStatistics
          ?.totalTasks ?? 0,

      completedTasks:
        response.taskStatistics
          ?.completedTasks ?? 0,

      remainingTasks:
        response.taskStatistics
          ?.remainingTasks ?? 0,

      completionRate:
        response.taskStatistics
          ?.completionRate ?? 0,
    },

    monthlyEmployees:
      response.monthlyEmployees ?? [],

    insights:
      response.insights ?? [],
  };
}
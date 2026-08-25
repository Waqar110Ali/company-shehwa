import {
  Injectable, Inject } from "@nestjs/common";

import {
  ReportsRepository,
} from "../repositories/reports.repository";

import ExcelJS from "exceljs";

import PDFDocument from "pdfkit";

@Injectable()
export class ReportsExportService {
  constructor(
    @Inject(ReportsRepository) private readonly reportsRepository: ReportsRepository,
  ) {}

  async csv(): Promise<Buffer> {
    const report =
      await this.reportsRepository.getReports();

    const rows = [
      [
        "Report",
        "Value",
      ],

      [
        "Employees",
        report.statistics.employees,
      ],

      [
        "Projects",
        report.statistics.projects,
      ],

      [
        "Active Projects",
        report.statistics.activeProjects,
      ],

      [
        "Completed Projects",
        report.statistics.completedProjects,
      ],

      [
        "Monthly Payroll",
        report.statistics.monthlyPayroll,
      ],

      [
        "Average Salary",
        report.statistics.averageSalary,
      ],

      [
        "Total Tasks",
        report.taskStatistics.totalTasks,
      ],

      [
        "Completed Tasks",
        report.taskStatistics.completedTasks,
      ],

      [
        "Remaining Tasks",
        report.taskStatistics.remainingTasks,
      ],

      [
        "Task Completion Rate",
        report.taskStatistics.completionRate,
      ],
    ];

    const csv =
      rows
        .map((row) =>
          row
            .map((value) =>
              `"${String(value).replace(
                /"/g,
                '""',
              )}"`,
            )
            .join(","),
        )
        .join("\n");

    return Buffer.from(
      csv,
      "utf-8",
    );
  }

  async excel(): Promise<Buffer> {
    const report =
      await this.reportsRepository.getReports();

    const workbook =
      new ExcelJS.Workbook();

    const summary =
      workbook.addWorksheet(
        "Summary",
      );

    summary.columns = [
      {
        header: "Metric",
        key: "metric",
        width: 30,
      },
      {
        header: "Value",
        key: "value",
        width: 25,
      },
    ];

    summary.addRows([
      {
        metric: "Employees",
        value:
          report.statistics
            .employees,
      },

      {
        metric: "Projects",
        value:
          report.statistics
            .projects,
      },

      {
        metric: "Active Projects",
        value:
          report.statistics
            .activeProjects,
      },

      {
        metric: "Completed Projects",
        value:
          report.statistics
            .completedProjects,
      },

      {
        metric: "Monthly Payroll",
        value:
          report.statistics
            .monthlyPayroll,
      },

      {
        metric: "Average Salary",
        value:
          report.statistics
            .averageSalary,
      },

      {
        metric: "Total Tasks",
        value:
          report.taskStatistics
            .totalTasks,
      },

      {
        metric: "Completed Tasks",
        value:
          report.taskStatistics
            .completedTasks,
      },

      {
        metric: "Task Completion Rate",
        value:
          report.taskStatistics
            .completionRate,
      },
    ]);

    const employees =
      workbook.addWorksheet(
        "Performance",
      );

    employees.columns = [
      {
        header: "Employee",
        key: "employee",
        width: 30,
      },

      {
        header: "Role",
        key: "role",
        width: 25,
      },

      {
        header: "Department",
        key: "department",
        width: 25,
      },

      {
        header: "Performance",
        key: "score",
        width: 20,
      },
    ];

    employees.addRows(
      report.performance,
    );

    const projects =
      workbook.addWorksheet(
        "Projects",
      );

    projects.columns = [
      {
        header: "Project",
        key: "name",
        width: 30,
      },

      {
        header: "Status",
        key: "status",
        width: 20,
      },

      {
        header: "Priority",
        key: "priority",
        width: 20,
      },

      {
        header: "Progress",
        key: "progress",
        width: 20,
      },

      {
        header: "Total Tasks",
        key: "totalTasks",
        width: 20,
      },

      {
        header: "Completed Tasks",
        key: "completedTasks",
        width: 20,
      },
    ];

    projects.addRows(
      report.projects,
    );

    const payroll =
      workbook.addWorksheet(
        "Payroll",
      );

    payroll.columns = [
      {
        header: "Department",
        key: "department",
        width: 30,
      },

      {
        header: "Employees",
        key: "employees",
        width: 20,
      },

      {
        header: "Payroll",
        key: "payroll",
        width: 20,
      },
    ];

    payroll.addRows(
      report.payroll
        .byDepartment,
    );

    return Buffer.from(
      await workbook.xlsx.writeBuffer(),
    );
  }

  async pdf(): Promise<Buffer> {
    const report =
      await this.reportsRepository.getReports();

    return new Promise(
      (resolve) => {
        const document =
          new PDFDocument({
            margin: 40,
          });

        const chunks: Buffer[] =
          [];

        document.on(
          "data",
          (chunk) =>
            chunks.push(chunk),
        );

        document.on(
          "end",
          () =>
            resolve(
              Buffer.concat(
                chunks,
              ),
            ),
        );

        document
          .fontSize(24)
          .text(
            "Reports & Analytics",
          );

        document.moveDown();

        document
          .fontSize(14)
          .text(
            `Employees: ${report.statistics.employees}`,
          );

        document.text(
          `Projects: ${report.statistics.projects}`,
        );

        document.text(
          `Active Projects: ${report.statistics.activeProjects}`,
        );

        document.text(
          `Completed Projects: ${report.statistics.completedProjects}`,
        );

        document.text(
          `Monthly Payroll: $${report.statistics.monthlyPayroll.toLocaleString()}`,
        );

        document.text(
          `Average Salary: $${report.statistics.averageSalary.toLocaleString()}`,
        );

        document.moveDown();

        document
          .fontSize(18)
          .text(
            "Task Statistics",
          );

        document
          .fontSize(14)
          .text(
            `Total Tasks: ${report.taskStatistics.totalTasks}`,
          );

        document.text(
          `Completed Tasks: ${report.taskStatistics.completedTasks}`,
        );

        document.text(
          `Remaining Tasks: ${report.taskStatistics.remainingTasks}`,
        );

        document.text(
          `Completion Rate: ${Math.round(report.taskStatistics.completionRate)}%`,
        );

        document.moveDown();

        document
          .fontSize(18)
          .text(
            "Projects",
          );

        document.moveDown(0.5);

        for (const project of report.projects) {
          document
            .fontSize(11)
            .text(
              `${project.name} — ${project.status} — ${project.progress}% — ${project.completedTasks}/${project.totalTasks} tasks`,
            );
        }

        document.moveDown();

        document
          .fontSize(18)
          .text(
            "Employee Performance",
          );

        document.moveDown(0.5);

        for (const employee of report.performance) {
          document
            .fontSize(11)
            .text(
              `${employee.employee} — ${employee.department} — ${employee.score}%`,
            );
        }

        document.end();
      },
    );
  }
}
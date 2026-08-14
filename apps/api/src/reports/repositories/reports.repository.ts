import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
  Model,
  Types,
} from "mongoose";

import {
  Employee,
  EmployeeDocument,
} from "@/employees/schemas/employee.schema";

import {
  Project,
  ProjectDocument,
} from "@/projects/schemas/project.schema";

import {
  Task,
  TaskDocument,
} from "@/tasks/schemas/task.schema";

import {
  Attendance,
  AttendanceDocument,
} from "@/attendance/schemas/attendance.schema";

export interface MonthlyEmployeeReport {
  month: string;
  year: number;
  employees: number;
}

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,

    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,

    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,

    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<AttendanceDocument>,
  ) {}

  // ---------------------------------------------------------
  // MAIN REPORT
  // ---------------------------------------------------------

  async getReports() {
    const [
      statistics,
      payroll,
      attendance,
      performance,
      departments,
      projects,
      taskStatistics,
      monthlyEmployees,
    ] = await Promise.all([
      this.getStatistics(),
      this.getPayroll(),
      this.getAttendance(),
      this.getPerformance(),
      this.getDepartments(),
      this.getProjects(),
      this.getTaskStatistics(),
      this.getMonthlyEmployees(),
    ]);

    const insights =
      this.generateInsights({
        statistics,
        attendance,
        performance,
        projects,
        taskStatistics,
      });

    return {
      statistics,
      payroll,
      attendance,
      performance,
      departments,
      projects,
      taskStatistics,
      monthlyEmployees,
      insights,
    };
  }

  // ---------------------------------------------------------
  // STATISTICS
  // ---------------------------------------------------------

  private async getStatistics() {
    const [
      employees,
      projects,
      activeProjects,
      completedProjects,
      payrollResult,
    ] = await Promise.all([
      this.employeeModel.countDocuments(),

      this.projectModel.countDocuments(),

      this.projectModel.countDocuments({
        status: "Active",
      }),

      this.projectModel.countDocuments({
        status: "Completed",
      }),

      this.employeeModel.aggregate([
        {
          $group: {
            _id: null,

            totalSalary: {
              $sum: {
                $ifNull: ["$salary", 0],
              },
            },

            averageSalary: {
              $avg: {
                $ifNull: ["$salary", 0],
              },
            },
          },
        },
      ]),
    ]);

    const payrollData =
      payrollResult[0] ?? {
        totalSalary: 0,
        averageSalary: 0,
      };

    return {
      employees,

      projects,

      activeProjects,

      completedProjects,

      monthlyPayroll:
        Math.round(
          payrollData.totalSalary ?? 0,
        ),

      averageSalary:
        Math.round(
          payrollData.averageSalary ?? 0,
        ),
    };
  }

  // ---------------------------------------------------------
  // PAYROLL
  // ---------------------------------------------------------

  private async getPayroll() {
    const [
      overall,
      byDepartment,
    ] = await Promise.all([
      this.employeeModel.aggregate([
        {
          $group: {
            _id: null,

            totalMonthly: {
              $sum: {
                $ifNull: ["$salary", 0],
              },
            },

            averageSalary: {
              $avg: {
                $ifNull: ["$salary", 0],
              },
            },
          },
        },
      ]),

      this.employeeModel.aggregate([
        {
          $group: {
            _id: "$department",

            payroll: {
              $sum: {
                $ifNull: ["$salary", 0],
              },
            },

            employees: {
              $sum: 1,
            },
          },
        },

        {
          $project: {
            _id: 0,

            department: "$_id",

            payroll: 1,

            employees: 1,
          },
        },

        {
          $sort: {
            payroll: -1,
          },
        },
      ]),
    ]);

    const data =
      overall[0] ?? {
        totalMonthly: 0,
        averageSalary: 0,
      };

    return {
      totalMonthly:
        Math.round(
          data.totalMonthly ?? 0,
        ),

      averageSalary:
        Math.round(
          data.averageSalary ?? 0,
        ),

      byDepartment,
    };
  }

  // ---------------------------------------------------------
  // ATTENDANCE
  // ---------------------------------------------------------

  private async getAttendance() {
    const [
      overallResult,
      byDepartment,
    ] = await Promise.all([
      this.attendanceModel.aggregate([
        {
          $group: {
            _id: null,

            totalRecords: {
              $sum: 1,
            },

            presentRecords: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),

      this.attendanceModel.aggregate([
        {
          $lookup: {
            from:
              this.employeeModel
                .collection.name,

            localField: "employee",

            foreignField: "_id",

            as: "employeeData",
          },
        },

        {
          $unwind: {
            path: "$employeeData",

            preserveNullAndEmptyArrays:
              false,
          },
        },

        {
          $group: {
            _id:
              "$employeeData.department",

            totalRecords: {
              $sum: 1,
            },

            presentRecords: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            employees: {
              $addToSet:
                "$employeeData._id",
            },
          },
        },

        {
          $project: {
            _id: 0,

            department: "$_id",

            attendance: {
              $cond: [
                {
                  $gt: [
                    "$totalRecords",
                    0,
                  ],
                },

                {
                  $multiply: [
                    {
                      $divide: [
                        "$presentRecords",
                        "$totalRecords",
                      ],
                    },

                    100,
                  ],
                },

                0,
              ],
            },

            employees: {
              $size: "$employees",
            },
          },
        },

        {
          $sort: {
            attendance: -1,
          },
        },
      ]),
    ]);

    const data =
      overallResult[0] ?? {
        totalRecords: 0,
        presentRecords: 0,
      };

    const overall =
      data.totalRecords > 0
        ? (data.presentRecords /
            data.totalRecords) *
          100
        : 0;

    return {
      overall:
        Math.round(
          overall * 10,
        ) / 10,

      employees:
        await this.employeeModel.countDocuments(),

      byDepartment:
        byDepartment.map(
          (item) => ({
            department:
              item.department,

            attendance:
              Math.round(
                item.attendance * 10,
              ) / 10,

            employees:
              item.employees,
          }),
        ),
    };
  }

  // ---------------------------------------------------------
  // PERFORMANCE
  // ---------------------------------------------------------

  private async getPerformance() {
    const employees =
      await this.employeeModel
        .find()
        .select(
          "_id firstName lastName fullName designation department",
        )
        .lean();

    const taskScores =
      await this.taskModel.aggregate([
        {
          $project: {
            assignedTo: 1,

            score: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Completed",
                  ],
                },

                100,

                {
                  $min: [
                    100,

                    {
                      $max: [
                        0,

                        {
                          $ifNull: [
                            "$progress",
                            0,
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },

        {
          $group: {
            _id: "$assignedTo",

            averageScore: {
              $avg: "$score",
            },

            totalTasks: {
              $sum: 1,
            },

            completedTasks: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$score",
                      100,
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

    const scoreMap =
      new Map<
        string,
        {
          averageScore: number;
          totalTasks: number;
          completedTasks: number;
        }
      >();

    for (const item of taskScores) {
      if (!item._id) {
        continue;
      }

      scoreMap.set(
        item._id.toString(),
        {
          averageScore:
            item.averageScore ?? 0,

          totalTasks:
            item.totalTasks ?? 0,

          completedTasks:
            item.completedTasks ?? 0,
        },
      );
    }

    return employees
      .map((employee: any) => {
        const stats =
          scoreMap.get(
            employee._id.toString(),
          );

        const score =
          stats?.averageScore ?? 0;

        return {
          id:
            employee._id.toString(),

          employee:
            employee.fullName ??
            `${employee.firstName} ${employee.lastName}`,

          role:
            employee.designation,

          department:
            employee.department,

          score:
            Math.round(
              score * 10,
            ) / 10,

          totalTasks:
            stats?.totalTasks ?? 0,

          completedTasks:
            stats?.completedTasks ?? 0,
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score,
      );
  }

  // ---------------------------------------------------------
  // DEPARTMENTS
  // ---------------------------------------------------------

  private async getDepartments() {
    const [
      employeeData,
      attendanceData,
      performanceData,
    ] = await Promise.all([
      this.employeeModel.aggregate([
        {
          $group: {
            _id: "$department",

            employees: {
              $sum: 1,
            },

            payroll: {
              $sum: {
                $ifNull: ["$salary", 0],
              },
            },
          },
        },
      ]),

      this.attendanceModel.aggregate([
        {
          $lookup: {
            from:
              this.employeeModel
                .collection.name,

            localField: "employee",

            foreignField: "_id",

            as: "employeeData",
          },
        },

        {
          $unwind:
            "$employeeData",
        },

        {
          $group: {
            _id:
              "$employeeData.department",

            total: {
              $sum: 1,
            },

            present: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),

      this.getPerformance(),
    ]);

    const attendanceMap =
      new Map<string, number>();

    for (const item of attendanceData) {
      const percentage =
        item.total > 0
          ? (item.present /
              item.total) *
            100
          : 0;

      attendanceMap.set(
        item._id,
        Math.round(
          percentage * 10,
        ) / 10,
      );
    }

    const performanceMap =
      new Map<
        string,
        {
          total: number;
          count: number;
        }
      >();

    for (const item of performanceData) {
      const current =
        performanceMap.get(
          item.department,
        ) ?? {
          total: 0,
          count: 0,
        };

      current.total += item.score;
      current.count += 1;

      performanceMap.set(
        item.department,
        current,
      );
    }

    return employeeData.map(
      (department) => {
        const performance =
          performanceMap.get(
            department._id,
          );

        return {
          name: department._id,

          employees:
            department.employees,

          payroll:
            Math.round(
              department.payroll ?? 0,
            ),

          averagePerformance:
            performance &&
            performance.count > 0
              ? Math.round(
                  (performance.total /
                    performance.count) *
                    10,
                ) / 10
              : 0,

          averageAttendance:
            attendanceMap.get(
              department._id,
            ) ?? 0,
        };
      },
    );
  }

  // ---------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------

  private async getProjects() {
    const projects =
      await this.projectModel
        .find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return projects.map(
      (project: any) => {
        /**
         * A project marked "Completed" should always report
         * 100% progress in the report output, even if its stored
         * `progress` field is stale/inconsistent (e.g. left at 0
         * from before it was marked complete). This does not
         * modify the underlying document — only what the report
         * displays.
         */
        const progress =
          project.status ===
          "Completed"
            ? 100
            : Math.max(
                0,
                Math.min(
                  100,
                  project.progress ??
                    0,
                ),
              );

        return {
          id:
            project._id.toString(),

          name:
            project.name,

          status:
            project.status,

          priority:
            project.priority,

          progress,

          totalTasks:
            project.totalTasks ?? 0,

          completedTasks:
            project.completedTasks ?? 0,

          startDate:
            project.startDate,

          dueDate:
            project.dueDate,

          members:
            Array.isArray(
              project.members,
            )
              ? project.members.length
              : 0,
        };
      },
    );
  }

  // ---------------------------------------------------------
  // TASK STATISTICS
  // ---------------------------------------------------------

  private async getTaskStatistics() {
    const result =
      await this.taskModel.aggregate([
        {
          $group: {
            _id: null,

            totalTasks: {
              $sum: 1,
            },

            completedTasks: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

    const data =
      result[0] ?? {
        totalTasks: 0,
        completedTasks: 0,
      };

    const remainingTasks =
      Math.max(
        0,
        data.totalTasks -
          data.completedTasks,
      );

    const completionRate =
      data.totalTasks > 0
        ? (data.completedTasks /
            data.totalTasks) *
          100
        : 0;

    return {
      totalTasks:
        data.totalTasks,

      completedTasks:
        data.completedTasks,

      remainingTasks,

      completionRate:
        Math.round(
          completionRate * 10,
        ) / 10,
    };
  }

  // ---------------------------------------------------------
  // MONTHLY EMPLOYEES
  // ---------------------------------------------------------

  private async getMonthlyEmployees() {
    const now = new Date();

    const start =
      new Date(
        now.getFullYear(),
        now.getMonth() - 11,
        1,
      );

    const result =
      await this.employeeModel.aggregate([
        {
          $match: {
            joiningDate: {
              $gte: start,
            },
          },
        },

        {
          $group: {
            _id: {
              year: {
                $year: "$joiningDate",
              },

              month: {
                $month: "$joiningDate",
              },
            },

            employees: {
              $sum: 1,
            },
          },
        },
      ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const output: MonthlyEmployeeReport[] =
      [];

    for (
      let i = 11;
      i >= 0;
      i--
    ) {
      const date =
        new Date(
          now.getFullYear(),
          now.getMonth() - i,
          1,
        );

      const year =
        date.getFullYear();

      const month =
        date.getMonth() + 1;

      const found =
        result.find(
          (item) =>
            item._id.year ===
              year &&
            item._id.month ===
              month,
        );

      output.push({
        month:
          months[month - 1],

        year,

        employees:
          found?.employees ?? 0,
      });
    }

    return output;
  }

  // ---------------------------------------------------------
  // INSIGHTS
  // ---------------------------------------------------------

  private generateInsights(data: any) {
    const insights: any[] = [];

    const topPerformer =
      data.performance?.[0];

    if (topPerformer) {
      insights.push({
        type:
          topPerformer.score >= 70
            ? "positive"
            : "neutral",

        title:
          "Top performer",

        message:
          `${topPerformer.employee} currently has the highest task-based performance score at ${topPerformer.score}%.`,
      });
    }

    if (
      data.attendance.overall >= 90
    ) {
      insights.push({
        type: "positive",

        title:
          "Strong attendance",

        message:
          `Overall attendance is ${data.attendance.overall}%.`,
      });
    } else {
      insights.push({
        type: "neutral",

        title:
          "Attendance needs attention",

        message:
          `Overall attendance is ${data.attendance.overall}%.`,
      });
    }

    if (
      data.taskStatistics
        .completionRate >= 70
    ) {
      insights.push({
        type: "positive",

        title:
          "Strong task completion",

        message:
          `${data.taskStatistics.completionRate}% of tasks are completed.`,
      });
    } else {
      insights.push({
        type: "neutral",

        title:
          "Task completion",

        message:
          `Current task completion rate is ${data.taskStatistics.completionRate}%.`,
      });
    }

    return insights;
  }
}
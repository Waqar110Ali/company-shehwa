import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import {
  Employee,
  EmployeeDocument,
} from "@/employees/schemas/employee.schema";

import {
  EmployeeStatus,
} from "@/employees/enums/employee-status.enum";

import {
  Project,
  ProjectDocument,
} from "@/projects/schemas/project.schema";

import {
  ProjectStatus,
} from "@/projects/enums/project-status.enum";

import {
  Task,
  TaskDocument,
} from "@/tasks/schemas/task.schema";

@Injectable()
export class DashboardRepository {
 constructor(
  @InjectModel(Employee.name) @Inject(Model<EmployeeDocument>)
  private readonly employeeModel: Model<EmployeeDocument>,

  @InjectModel(Project.name) @Inject(Model<ProjectDocument>)
  private readonly projectModel: Model<ProjectDocument>,

  @InjectModel(Task.name) @Inject(Model<TaskDocument>)
  private readonly taskModel: Model<TaskDocument>,
) {}

  async getStatistics() {
  const [
    employees,
    projects,
    tasks,
  ] = await Promise.all([
    this.employeeModel.countDocuments(),

    this.projectModel.countDocuments(),

    this.taskModel.countDocuments(),
  ]);

  return {
    employees,
    projects,
    tasks,
    revenue: 0,
  };
}

  async getAnalytics() {
    const analytics =
      await this.employeeModel.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$joiningDate",
              },
            },

            employees: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.month": 1,
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

    return analytics.map(
      (item) => ({
        month:
          months[item._id.month - 1],

        employees:
          item.employees,

        revenue: 0,
      }),
    );
  }

  async getRecentActivities() {
    const employees =
      await this.employeeModel
        .find()
        .sort({
          joiningDate: -1,
        })
        .limit(5)
        .select(
          "firstName lastName joiningDate",
        )
        .lean();

    return employees.map(
      (employee: any) => ({
        id:
          employee._id.toString(),

        title:
          `${employee.firstName} ${employee.lastName} joined the company`,

        time:
          employee.joiningDate
            ? new Date(
                employee.joiningDate,
              ).toLocaleDateString()
            : "",
      }),
    );
  }

  // async getPendingApprovals() {
  //   const employees =
  //     await this.employeeModel
  //       .find({
  //         status:
  //           EmployeeStatus.ACTIVE,
  //       })
  //       .limit(5)
  //       .select(
  //         "firstName lastName designation",
  //       )
  //       .lean();

  //   return employees.map(
  //     (employee: any) => ({
  //       id:
  //         employee._id.toString(),

  //       name:
  //         `${employee.firstName} ${employee.lastName}`,

  //       role:
  //         employee.designation,

  //       status:
  //         employee.status,
  //     }),
  //   );
  // }

  async getLatestProjects() {
    const projects =
      await this.projectModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();

    return projects.map(
      (project: any) => ({
        id:
          project._id.toString(),

        name:
          project.name,

        progress:
          project.progress,

        due:
          project.dueDate
            ? new Date(
                project.dueDate,
              ).toLocaleDateString()
            : "",

        members:
          project.members?.length ?? 0,

        status:
          project.status,
      }),
    );
  }

  async getPerformance() {
    const employees =
      await this.employeeModel
        .find()
        .sort({
          performance: -1,
        })
        .limit(5)
        .select(
          "firstName lastName designation performance",
        )
        .lean();

    return employees.map(
      (employee: any) => ({
        id:
          employee._id.toString(),

        name:
          `${employee.firstName} ${employee.lastName}`,

        role:
          employee.designation,

        performance:
          employee.performance ?? 0,
      }),
    );
  }
}
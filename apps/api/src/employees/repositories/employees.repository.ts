import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
  Types,
} from "mongoose";

import {
  Employee,
  EmployeeDocument,
} from "../schemas/employee.schema";

import { EmployeeQueryDto } from "../dto/employee-query.dto";

@Injectable()
export class EmployeesRepository {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  // ======================================================
  // Create
  // ======================================================

  async create(
    employee: Partial<Employee>,
  ): Promise<EmployeeDocument> {
    return this.employeeModel.create(employee);
  }

  // ======================================================
  // Find All
  // ======================================================

  async findAll(
    query: EmployeeQueryDto,
  ) {
    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const filter: FilterQuery<Employee> =
      {};

    if (query.search?.trim()) {
      filter.$or = [
        {
          firstName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.search,
            $options: "i",
          },
        },
      ];
    }

    if (query.department) {
      filter.department =
        query.department;
    }

    if (query.designation) {
      filter.designation =
        query.designation;
    }

    if (query.status) {
      filter.status =
        query.status;
    }

    if (query.employmentType) {
      filter.employmentType =
        query.employmentType;
    }

    const total =
      await this.employeeModel.countDocuments(
        filter,
      );

    const items =
      await this.employeeModel
        .find(filter)
        .populate({
          path: "user",
          select:
            "firstName lastName email avatar role",
        })
        .sort({
          [query.sortBy ??
          "createdAt"]:
            query.order === "asc"
              ? 1
              : -1,
        })
        .skip(skip)
        .limit(limit)
        .lean();

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages:
          Math.ceil(
            total / limit,
          ),
      },
    };
  }

  // ======================================================
  // Find By Id
  // ======================================================

  async findById(
    id: string,
  ): Promise<any> {
    if (
      !Types.ObjectId.isValid(id)
    ) {
      return null;
    }

    return this.employeeModel
      .findById(id)
      .populate({
        path: "user",
        select:
          "firstName lastName email avatar role",
      })
      .lean();
  }

  // ======================================================
  // Find By User Id
  // ======================================================

  async findByUserId(
    userId: string,
  ): Promise<EmployeeDocument | null> {
    if (
      !Types.ObjectId.isValid(
        userId,
      )
    ) {
      return null;
    }

    return this.employeeModel
      .findOne({
        user: new Types.ObjectId(
          userId,
        ),
      })
      .populate({
        path: "user",
        select:
          "firstName lastName email avatar role",
      });
  }

  // ======================================================
  // Find By Employee Id
  // ======================================================

  async findByEmployeeId(
    employeeId: string,
  ): Promise<EmployeeDocument | null> {
    return this.employeeModel
      .findOne({
        employeeId,
      })
      .populate({
        path: "user",
        select:
          "firstName lastName email avatar role",
      });
  }

  // ======================================================
  // Find By Email
  // ======================================================

  async findByEmail(
    email: string,
  ): Promise<EmployeeDocument | null> {
    return this.employeeModel.findOne({
      email,
    });
  }

  // ======================================================
  // Exists By User
  // ======================================================

  async existsByUser(
    userId: string,
  ): Promise<boolean> {
    if (
      !Types.ObjectId.isValid(
        userId,
      )
    ) {
      return false;
    }

    const exists =
      await this.employeeModel.exists(
        {
          user: new Types.ObjectId(
            userId,
          ),
        },
      );

    return !!exists;
  }

  // ======================================================
  // Update
  // ======================================================

  async update(
    id: string,
    data: Partial<Employee>,
  ): Promise<any> {
    if (
      !Types.ObjectId.isValid(id)
    ) {
      return null;
    }

    return this.employeeModel
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        },
      )
      .populate({
        path: "user",
        select:
          "firstName lastName email avatar role",
      })
      .lean();
  }

  // ======================================================
  // Delete
  // ======================================================

  async delete(
    id: string,
  ): Promise<EmployeeDocument | null> {
    if (
      !Types.ObjectId.isValid(id)
    ) {
      return null;
    }

    return this.employeeModel.findByIdAndDelete(
      id,
    );
  }
}
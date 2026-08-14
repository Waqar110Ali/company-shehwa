import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { unlink } from "fs/promises";
import { join } from "path";

import { EmployeesRepository } from "../repositories/employees.repository";

import { UsersService } from "@/users/services/users.service";
import { MailService } from "@/mail/mail.service";

import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeQueryDto } from "../dto/employee-query.dto";

import { EmploymentType } from "../enums/employment-type.enum";
import { EmployeeStatus } from "../enums/employee-status.enum";

import {
  AVATAR_UPLOAD_DIR,
  avatarPublicPath,
  isLocalAvatarPath,
} from "../config/Avatar-upload.config";

@Injectable()
export class EmployeesService {
  constructor(
    private readonly repository: EmployeesRepository,

    private readonly usersService: UsersService,

    private readonly mailService: MailService,
  ) {}

  // =====================================================
  // Create Employee
  // =====================================================

  async create(
    dto: CreateEmployeeDto,
    avatarFile?: Express.Multer.File,
  ) {
    // -----------------------------------------
    // Profile picture is required when adding an employee
    // -----------------------------------------

    if (!avatarFile) {
      throw new BadRequestException(
        "A profile picture is required to add an employee.",
      );
    }

    // -----------------------------------------
    // Check Employee Email
    // -----------------------------------------

    const employeeExists =
      await this.repository.findByEmail(
        dto.email,
      );

    if (employeeExists) {
      await this.removeAvatarFile(
        avatarPublicPath(avatarFile.filename),
      );
      throw new BadRequestException(
        "Employee email already exists.",
      );
    }

    // -----------------------------------------
    // Check User Email
    // -----------------------------------------

    const userExists =
      await this.usersService.findByEmail(
        dto.email,
      );

    if (userExists) {
      await this.removeAvatarFile(
        avatarPublicPath(avatarFile.filename),
      );
      throw new BadRequestException(
        "User already exists.",
      );
    }

    // -----------------------------------------
    // Generate Temporary Password
    // -----------------------------------------

    const temporaryPassword =
      this.generateTemporaryPassword();

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        10,
      );

    // -----------------------------------------
    // Uploaded avatar URL — single source of truth used for both the
    // login User record and the Employee record below.
    // -----------------------------------------

    const avatarUrl = avatarPublicPath(avatarFile.filename);

    // -----------------------------------------
    // Create Login User
    // -----------------------------------------

    const user =
      await this.usersService.createUser({
        firstName: dto.firstName,

        lastName: dto.lastName,

        email: dto.email,

        password: hashedPassword,

        phone: dto.phone,

        avatar: avatarUrl,

        role: dto.role,

        isActive: true,

        isVerified: false,

        mustChangePassword: true,
      });

    // -----------------------------------------
    // Generate Employee ID
    // -----------------------------------------

    const employeeId =
      await this.generateEmployeeId();

    // -----------------------------------------
    // Create Employee
    // -----------------------------------------

    const employee =
      await this.repository.create({
        user:
          user._id as Types.ObjectId,

        employeeId,

        firstName:
          dto.firstName,

        lastName:
          dto.lastName,

        fullName:
          `${dto.firstName} ${dto.lastName}`,

        email:
          dto.email,

        phone:
          dto.phone,

        designation:
          dto.designation,

        department:
          dto.department,

        employmentType:
          dto.employmentType ??
          EmploymentType.FULL_TIME,

        status:
          dto.status ??
          EmployeeStatus.ACTIVE,

        gender:
          dto.gender,

        salary:
          dto.salary ?? 0,

        cnic:
          dto.cnic,

        address:
          dto.address,

        city:
          dto.city,

        country:
          dto.country,

        emergencyContactName:
          dto.emergencyContactName,

        emergencyContactPhone:
          dto.emergencyContactPhone,

        avatar: avatarUrl,

        performance:
          dto.performance ?? 0,

        attendance:
          dto.attendance ?? 0,

        dateOfBirth:
          dto.dateOfBirth
            ? new Date(
                dto.dateOfBirth,
              )
            : undefined,

        joiningDate:
          dto.joiningDate
            ? new Date(
                dto.joiningDate,
              )
            : undefined,
      });

    // -----------------------------------------
    // Send Welcome Email
    // -----------------------------------------

    await this.mailService.sendWelcomeEmail(
      user,
      temporaryPassword,
    );

    return {
      success: true,

      message:
        "Employee created successfully.",

      data: employee,
    };
  }
    // =====================================================
  // Find All Employees
  // =====================================================

  async findAll(
    query: EmployeeQueryDto,
  ) {
    return this.repository.findAll(
      query,
    );
  }

  // =====================================================
  // Find Employee By Id
  // =====================================================

  async findById(
    id: string,
  ) {
    const employee =
      await this.repository.findById(
        id,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee not found.",
      );
    }

    return {
      success: true,

      data: employee,
    };
  }

  // =====================================================
  // Update Employee
  // =====================================================

  async update(
    id: string,
    dto: UpdateEmployeeDto,
    avatarFile?: Express.Multer.File,
  ) {
    const employee =
      await this.repository.findById(
        id,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee not found.",
      );
    }

    const updateData: Partial<any> = {
      ...dto,
    };

    // Never update these fields directly
    delete updateData.user;
    delete updateData.password;
    delete updateData.employeeId;

    // -----------------------------------------
    // Replace the profile picture, if a new one was uploaded.
    // Leave the existing one alone otherwise.
    // -----------------------------------------

    let newAvatarUrl: string | undefined;

    if (avatarFile) {
      newAvatarUrl = avatarPublicPath(avatarFile.filename);
      updateData.avatar = newAvatarUrl;

      await this.removeAvatarFile(employee.avatar);
    } else {
      delete updateData.avatar;
    }

    // Update Full Name
    if (
      dto.firstName ||
      dto.lastName
    ) {
      updateData.fullName =
        `${dto.firstName ?? employee.firstName} ${
          dto.lastName ?? employee.lastName
        }`;
    }

    // Convert Date Fields
    if (dto.dateOfBirth) {
      updateData.dateOfBirth =
        new Date(dto.dateOfBirth);
    }

    if (dto.joiningDate) {
      updateData.joiningDate =
        new Date(dto.joiningDate);
    }

    // Update Employee Record
    const updatedEmployee =
      await this.repository.update(
        id,
        updateData,
      );

    // =====================================
    // Update Linked User (keeps the photo in sync everywhere the
    // User record's avatar is read — chat, headers, etc. need no
    // changes)
    // =====================================

    let userId = "";

    if (
      employee.user instanceof Types.ObjectId
    ) {
      userId =
        employee.user.toString();
    } else if (
      employee.user &&
      "_id" in employee.user
    ) {
      userId =
        employee.user._id.toString();
    }

    if (userId) {
      const user =
        await this.usersService.findById(
          userId,
        );

      if (user) {
        await this.usersService.update(
          userId,
          {
            firstName:
              dto.firstName ??
              user.firstName,

            lastName:
              dto.lastName ??
              user.lastName,

            email:
              dto.email ??
              user.email,

            phone:
              dto.phone ??
              user.phone,

            avatar:
              newAvatarUrl ??
              user.avatar,

            role:
              dto.role ??
              user.role,
          } as any,
        );
      }
    }

    return {
      success: true,

      message:
        "Employee updated successfully.",

      data: updatedEmployee,
    };
  }
    // =====================================================
  // Delete Employee
  // =====================================================

  async delete(
    id: string,
  ) {
    const employee =
      await this.repository.findById(
        id,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee not found.",
      );
    }

    let userId = "";

    if (
      employee.user instanceof Types.ObjectId
    ) {
      userId =
        employee.user.toString();
    } else if (
      employee.user &&
      "_id" in employee.user
    ) {
      userId =
        employee.user._id.toString();
    }

    if (userId) {
      await this.usersService.delete(
        userId,
      );
    }

    await this.removeAvatarFile(employee.avatar);

    await this.repository.delete(
      id,
    );

    return {
      success: true,

      message:
        "Employee deleted successfully.",
    };
  }

  // =====================================================
  // Approve Employee
  // =====================================================

  async approve(
    id: string,
  ) {
    const employee =
      await this.repository.findById(
        id,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee not found.",
      );
    }

    await this.repository.update(
      id,
      {
        status:
          EmployeeStatus.ACTIVE,
      },
    );

    let userId = "";

    if (
      employee.user instanceof Types.ObjectId
    ) {
      userId =
        employee.user.toString();
    } else if (
      employee.user &&
      "_id" in employee.user
    ) {
      userId =
        employee.user._id.toString();
    }

    if (userId) {
      await this.usersService.update(
        userId,
        {
          isActive: true,

          isVerified: true,
        } as any,
      );
    }

    return {
      success: true,

      message:
        "Employee approved successfully.",
    };
  }

  // =====================================================
  // Reject Employee
  // =====================================================

  async reject(
    id: string,
  ) {
    const employee =
      await this.repository.findById(
        id,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee not found.",
      );
    }

    let userId = "";

    if (
      employee.user instanceof Types.ObjectId
    ) {
      userId =
        employee.user.toString();
    } else if (
      employee.user &&
      "_id" in employee.user
    ) {
      userId =
        employee.user._id.toString();
    }

    if (userId) {
      await this.usersService.delete(
        userId,
      );
    }

    await this.removeAvatarFile(employee.avatar);

    await this.repository.delete(
      id,
    );

    return {
      success: true,

      message:
        "Employee rejected successfully.",
    };
  }

  // =====================================================
  // Generate Employee ID
  // =====================================================

  private async generateEmployeeId(): Promise<string> {
    const year =
      new Date().getFullYear();

    const random =
      Math.floor(
        1000 +
          Math.random() * 9000,
      );

    return `EMP-${year}-${random}`;
  }

  // =====================================================
  // Generate Temporary Password
  // =====================================================

  private generateTemporaryPassword(): string {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";

    let password = "";

    for (
      let i = 0;
      i < 12;
      i++
    ) {
      password +=
        chars[
          Math.floor(
            Math.random() *
              chars.length,
          )
        ];
    }

    return password;
  }

  // =====================================================
  // Avatar file cleanup
  //
  // Only ever deletes files that live under our own uploads/avatars
  // folder (isLocalAvatarPath guards against trying to unlink some
  // unrelated external URL or an empty string).
  // =====================================================

  private async removeAvatarFile(
    avatarPath?: string,
  ): Promise<void> {
    if (!isLocalAvatarPath(avatarPath)) {
      return;
    }

    const filename = avatarPath.split("/uploads/avatars/")[1];
    const fullPath = join(AVATAR_UPLOAD_DIR, filename);

    try {
      await unlink(fullPath);
    } catch {
      // File already gone / never existed — not fatal.
    }
  }
}
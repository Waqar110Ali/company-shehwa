import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Types } from "mongoose";

import { FilesRepository } from "../repository/files.repository";
import { FilesMapper } from "../mapper/files.mapper";

import { EmployeesRepository } from "@/employees/repositories/employees.repository";
import { EmployeeDocument } from "@/employees/schemas/employee.schema";
import { CloudinaryService } from "@/common/cloudinary/cloudinary.service";

import { CreateFolderDto } from "../dto/create-folder.dto";
import { UploadFileDto } from "../dto/upload-file.dto";
import { FileQueryDto } from "../dto/file-query.dto";

import { Role } from "@/users/enums/role.enum";
import { FileType } from "../enums/file-type.enum";

@Injectable()
export class FilesService {
  constructor(
    private readonly repository: FilesRepository,

    private readonly employeesRepository: EmployeesRepository,

    private readonly mapper: FilesMapper,

    private readonly cloudinary: CloudinaryService,
  ) {}

  // =====================================================
  // List Files
  // =====================================================

  async files(
    userId: string,
    query: FileQueryDto,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const canManage =
      this.canManage(
        this.getRole(
          employee,
        ),
      );

    const result =
      await this.repository.findAll(
        employee._id.toString(),
        query,
      );

    return this.mapper.toFileList(
      result,
      employee._id.toString(),
      canManage,
    );
  }

  // =====================================================
  // Create Folder — admin/HR only
  // =====================================================

  async createFolder(
    userId: string,
    dto: CreateFolderDto,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    this.ensureCanManage(
      this.getRole(
        employee,
      ),
    );

    if (
      dto.parentFolder
    ) {
      const folder =
        await this.repository.findFolder(
          dto.parentFolder,
        );

      if (!folder) {
        throw new NotFoundException(
          "Parent folder not found.",
        );
      }
    }

    const created =
      await this.repository.create({
        name:
          dto.name,

        originalName:
          dto.name,

        extension:
          "",

        mimeType:
          "",

        url:
          "",

        thumbnail:
          "",

        size:
          0,

        type:
          FileType.FOLDER,

        owner:
          new Types.ObjectId(
            employee._id,
          ),

        createdBy:
          new Types.ObjectId(
            employee._id,
          ),

        updatedBy:
          new Types.ObjectId(
            employee._id,
          ),

        parentFolder:
          dto.parentFolder
            ? new Types.ObjectId(
                dto.parentFolder,
              )
            : undefined,

        sharedWith:
          [],

        favoriteBy:
          [],

        isDeleted:
          false,
      });

    const folder =
      await this.repository.findById(
        created.id,
      );

    return this.mapper.toFile(
      folder!,
      employee._id.toString(),
      true,
    );
  }

  // =====================================================
  // Upload File — any employee can upload; they own what
  // they upload.
  // =====================================================

  async upload(
    userId: string,
    file: Express.Multer.File,
    dto: UploadFileDto,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    if (!file) {
      throw new NotFoundException(
        "No file uploaded.",
      );
    }

    if (
      dto.parentFolder
    ) {
      const folder =
        await this.repository.findFolder(
          dto.parentFolder,
        );

      if (!folder) {
        throw new NotFoundException(
          "Parent folder not found.",
        );
      }
    }

    const upload: any =
      await this.cloudinary.uploadFile(
        file,
        "company-management/files",
      );

    const created =
      await this.repository.create({
        name:
          dto.name,

        originalName:
          file.originalname,

        extension:
          file.originalname
            .split(".")
            .pop() ??
          "",

        mimeType:
          file.mimetype,

        size:
          file.size,

        url:
          upload.secure_url,

        thumbnail:
          file.mimetype.startsWith(
            "image/",
          )
            ? upload.secure_url
            : "",

        type:
          dto.type,

        owner:
          new Types.ObjectId(
            employee._id,
          ),

        createdBy:
          new Types.ObjectId(
            employee._id,
          ),

        updatedBy:
          new Types.ObjectId(
            employee._id,
          ),

        parentFolder:
          dto.parentFolder
            ? new Types.ObjectId(
                dto.parentFolder,
              )
            : undefined,

        sharedWith:
          [],

        favoriteBy:
          [],

        isDeleted:
          false,
      });

    const uploaded =
      await this.repository.findById(
        created.id,
      );

    return this.mapper.toFile(
      uploaded!,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee,
        ),
      ),
    );
  }

  // =====================================================
  // Rename — owner or admin/HR
  // =====================================================

  async rename(
    userId: string,
    fileId: string,
    name: string,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    this.ensureCanModify(
      file,
      employee,
    );

    const updated =
      await this.repository.rename(
        fileId,
        name,
        employee._id.toString(),
      );

    if (!updated) {
      throw new NotFoundException(
        "Unable to rename file.",
      );
    }

    return this.mapper.toFile(
      updated,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee,
        ),
      ),
    );
  }

  // =====================================================
  // Move — owner or admin/HR
  // =====================================================

  async move(
    userId: string,
    fileId: string,
    parentFolder:
      | string
      | null,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    this.ensureCanModify(
      file,
      employee,
    );

    if (parentFolder) {
      const folder =
        await this.repository.findFolder(
          parentFolder,
        );

      if (!folder) {
        throw new NotFoundException(
          "Destination folder not found.",
        );
      }
    }

    const moved =
      await this.repository.move(
        fileId,
        parentFolder,
        employee._id.toString(),
      );

    if (!moved) {
      throw new NotFoundException(
        "Unable to move file.",
      );
    }

    return this.mapper.toFile(
      moved,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee,
        ),
      ),
    );
  }

  // =====================================================
  // Share — owner or admin/HR
  // =====================================================

  async share(
    userId: string,
    fileId: string,
    employeeIds: string[],
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    this.ensureCanModify(
      file,
      employee,
    );

    const shared =
      await this.repository.share(
        fileId,
        employeeIds,
        employee._id.toString(),
      );

    if (!shared) {
      throw new NotFoundException(
        "Unable to share file.",
      );
    }

    return this.mapper.toFile(
      shared,
      employee._id.toString(),
      this.canManage(
        this.getRole(
          employee,
        ),
      ),
    );
  }

  // =====================================================
  // Favorite — owner, shared-with, or admin/HR
  // =====================================================

  async toggleFavorite(
    userId: string,
    fileId: string,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    const canManage =
      this.canManage(
        this.getRole(
          employee,
        ),
      );

    const canAccess =
      canManage ||
      this.toIdString(
        file.owner,
      ) ===
        employee._id.toString() ||
      file.sharedWith.some(
        (entry) =>
          this.toIdString(
            entry,
          ) ===
          employee._id.toString(),
      );

    if (!canAccess) {
      throw new ForbiddenException(
        "You don't have permission to access this file.",
      );
    }

    const alreadyFavorite =
      file.favoriteBy.some(
        (id) =>
          this.toIdString(
            id,
          ) ===
          employee._id.toString(),
      );

    const updated =
      alreadyFavorite
        ? await this.repository.removeFavorite(
            fileId,
            employee._id.toString(),
          )
        : await this.repository.addFavorite(
            fileId,
            employee._id.toString(),
          );

    if (!updated) {
      throw new NotFoundException(
        "Unable to update favorite status.",
      );
    }

    return this.mapper.toFile(
      updated,
      employee._id.toString(),
      canManage,
    );
  }

  // =====================================================
  // Delete — owner or admin/HR
  // =====================================================

  async delete(
    userId: string,
    fileId: string,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    this.ensureCanModify(
      file,
      employee,
    );

    await this.repository.delete(
      fileId,
      employee._id.toString(),
    );

    return {
      success:
        true,
    };
  }

  // =====================================================
  // Download — owner, shared-with, or admin/HR
  // =====================================================

  async download(
    userId: string,
    fileId: string,
  ) {
    const employee =
      await this.getEmployee(
        userId,
      );

    const file =
      await this.repository.findById(
        fileId,
      );

    if (!file) {
      throw new NotFoundException(
        "File not found.",
      );
    }

    const canManage =
      this.canManage(
        this.getRole(
          employee,
        ),
      );

    const canAccess =
      canManage ||
      this.toIdString(
        file.owner,
      ) ===
        employee._id.toString() ||
      file.sharedWith.some(
        (entry) =>
          this.toIdString(
            entry,
          ) ===
          employee._id.toString(),
      );

    if (!canAccess) {
      throw new ForbiddenException(
        "You don't have permission to access this file.",
      );
    }

    return {
      url:
        file.url,

      fileName:
        file.originalName,

      mimeType:
        file.mimeType,
    };
  }

  // =====================================================
  // Storage Statistics — global across all files, same
  // for everyone.
  // =====================================================

  async storage(
    userId: string,
  ) {
    await this.getEmployee(
      userId,
    );

    const used =
      await this.repository.storageUsed();

    return {
      used,

      limit:
        100 *
        1024 *
        1024 *
        1024,
    };
  }

  // =====================================================
  // Helpers
  // =====================================================

  private async getEmployee(
    userId: string,
  ) {
    const employee =
      await this.employeesRepository.findByUserId(
        userId,
      );

    if (!employee) {
      throw new NotFoundException(
        "Employee profile not found.",
      );
    }

    return employee;
  }

  /**
   * Employee.user is declared as `Types.ObjectId` in the shared
   * employee.schema.ts, but EmployeesRepository.findByUserId()
   * populates it with a select that includes `role`. This cast is
   * scoped to the Files module only.
   */
  private getRole(
    employee: EmployeeDocument,
  ): Role {
    const user =
      employee.user as unknown as
        | {
            role?: Role;
          }
        | undefined;

    return user?.role as Role;
  }

  private canManage(
    role: Role,
  ) {
    return (
      role ===
        Role.ADMIN ||
      role ===
        Role.HR
    );
  }

  private ensureCanManage(
    role: Role,
  ) {
    if (
      !this.canManage(
        role,
      )
    ) {
      throw new ForbiddenException(
        "You don't have permission to perform this action.",
      );
    }
  }

  /**
   * Rename/move/share/delete: allowed for the file's owner, or
   * admin/HR on any file. Uses toIdString() because `file.owner`
   * may be a populated Employee document (from
   * FilesRepository.findById()'s .populate("owner")), not a raw
   * ObjectId — comparing a populated document with
   * `.toString() === someIdString` silently never matches.
   */
  private ensureCanModify(
    file: {
      owner: any;
    },
    employee: EmployeeDocument,
  ) {
    const role =
      this.getRole(
        employee,
      );

    const isOwner =
      this.toIdString(
        file.owner,
      ) ===
      employee._id.toString();

    if (
      !this.canManage(
        role,
      ) &&
      !isOwner
    ) {
      throw new ForbiddenException(
        "You can only modify files you uploaded.",
      );
    }
  }

  /**
   * Safely extracts an id string whether the value is a raw
   * ObjectId, a populated document (has ._id), or already a
   * string. Populated Mongoose documents do NOT stringify to
   * their id via .toString() — this normalizes both cases.
   */
  private toIdString(
    value: any,
  ): string {
    if (!value) {
      return "";
    }

    if (value._id) {
      return value._id.toString();
    }

    return value.toString();
  }
}
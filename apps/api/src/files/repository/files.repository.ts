import {
  Injectable, Inject } from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
  Types,
} from "mongoose";

import {
  File,
  FileDocument,
} from "../schemas/file.schema";

import { FileQueryDto } from "../dto/file-query.dto";

@Injectable()
export class FilesRepository {
  constructor(
    @InjectModel(File.name) @Inject(Model<FileDocument>)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  // =====================================================
  // Create
  // =====================================================

  create(
    data: Partial<File>,
  ) {
    return this.fileModel.create(
      data,
    );
  }

  // =====================================================
  // Find By Id
  // =====================================================

  findById(
    id: string,
  ) {
    return this.fileModel
      .findById(id)
      .populate(
        "owner",
      )
      .populate(
        "sharedWith",
      )
      .populate(
        "createdBy",
      )
      .populate(
        "updatedBy",
      )
      .populate(
        "parentFolder",
      );
  }

  // =====================================================
  // Find Folder
  // =====================================================

  findFolder(
    id: string,
  ) {
    return this.fileModel.findOne({
      _id: id,

      type: "folder",

      isDeleted: false,
    });
  }

  // =====================================================
  // List Files
  //
  // Everyone sees the full list (every employee's files,
  // including admin-uploaded ones) — access to individual
  // files (url/thumbnail, and every write action) is
  // enforced separately in the mapper/service, not here.
  // `employeeId` is only needed for the "favorite" filter,
  // which is inherently per-viewer.
  // =====================================================

  async findAll(
    employeeId: string,
    query: FileQueryDto,
  ) {
    const filter: FilterQuery<FileDocument> =
      {
        isDeleted: false,
      };

    if (
      query.parentFolder
    ) {
      filter.parentFolder =
        new Types.ObjectId(
          query.parentFolder,
        );
    }

    if (query.type) {
      filter.type =
        query.type;
    }

    if (
      query.search
    ) {
      filter.$text = {
        $search:
          query.search,
      };
    }

    if (
      query.favorite ===
      "true"
    ) {
      filter.favoriteBy = {
        $in: [
          new Types.ObjectId(
            employeeId,
          ),
        ],
      };
    }

    const total =
      await this.fileModel.countDocuments(
        filter,
      );

    const items =
      await this.fileModel
        .find(filter)
        .populate(
          "owner",
        )
        .populate(
          "parentFolder",
        )
        .sort({
          updatedAt: -1,
        })
        .skip(
          (query.page - 1) *
            query.limit,
        )
        .limit(
          query.limit,
        );

    return {
      items,

      total,

      page: query.page,

      limit:
        query.limit,
    };
  }

  // =====================================================
  // Rename
  // =====================================================

  rename(
    id: string,
    name: string,
    updatedBy: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        name,

        updatedBy:
          new Types.ObjectId(
            updatedBy,
          ),
      },
      {
        new: true,
      },
    );
  }

  // =====================================================
  // Move
  // =====================================================

  move(
    id: string,
    parentFolder:
      | string
      | null,
    updatedBy: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        parentFolder:
          parentFolder
            ? new Types.ObjectId(
                parentFolder,
              )
            : null,

        updatedBy:
          new Types.ObjectId(
            updatedBy,
          ),
      },
      {
        new: true,
      },
    );
  }

  // =====================================================
  // Share
  // =====================================================

  share(
    id: string,
    employeeIds: string[],
    updatedBy: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        sharedWith:
          employeeIds.map(
            (id) =>
              new Types.ObjectId(
                id,
              ),
          ),

        updatedBy:
          new Types.ObjectId(
            updatedBy,
          ),
      },
      {
        new: true,
      },
    );
  }

  // =====================================================
  // Favorite
  // =====================================================

  async addFavorite(
    fileId: string,
    employeeId: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      fileId,
      {
        $addToSet: {
          favoriteBy:
            new Types.ObjectId(
              employeeId,
            ),
        },
      },
      {
        new: true,
      },
    );
  }

  async removeFavorite(
    fileId: string,
    employeeId: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      fileId,
      {
        $pull: {
          favoriteBy:
            new Types.ObjectId(
              employeeId,
            ),
        },
      },
      {
        new: true,
      },
    );
  }

  // =====================================================
  // Soft Delete
  // =====================================================

  delete(
    id: string,
    updatedBy: string,
  ) {
    return this.fileModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,

        updatedBy:
          new Types.ObjectId(
            updatedBy,
          ),
      },
      {
        new: true,
      },
    );
  }

  // =====================================================
  // Storage
  //
  // Global total across every file — matches the list now
  // being global too, rather than split by role.
  // =====================================================

  async storageUsed() {
    const result =
      await this.fileModel.aggregate([
        {
          $match: {
            isDeleted: false,

            type: {
              $ne: "folder",
            },
          },
        },

        {
          $group: {
            _id: null,

            total: {
              $sum: "$size",
            },
          },
        },
      ]);

    return (
      result[0]?.total ??
      0
    );
  }
}
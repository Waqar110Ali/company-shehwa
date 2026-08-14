import {
  Injectable,
} from "@nestjs/common";

import { FileDocument } from "../schemas/file.schema";

@Injectable()
export class FilesMapper {
  // =====================================================
  // Single File
  // =====================================================

  toFile(
    file: FileDocument,
    employeeId: string,
    canManage: boolean,
  ) {
    const owner =
      file.owner as any;

    const ownerId =
      owner?._id?.toString() ??
      owner?.toString();

    const isOwner =
      ownerId === employeeId;

    /**
     * sharedWith comes back as populated Employee documents (see
     * FilesRepository.findById()'s .populate("sharedWith")), not
     * raw ObjectIds — so each entry needs its own ._id unwrapped
     * before comparing. Calling .toString() directly on a
     * populated document does NOT return its id (it falls back to
     * Object.prototype.toString → "[object Object]"), which is
     * why shared access was silently always failing.
     */
    const isSharedWithMe =
      file.sharedWith.some(
        (entry: any) => {
          const id =
            entry?._id?.toString() ??
            entry?.toString();

          return (
            id === employeeId
          );
        },
      );

    const canAccess =
      canManage ||
      isOwner ||
      isSharedWithMe;

    return {
      id: file.id,

      name: file.name,

      type: file.type,

      size: this.formatSize(
        file.size,
      ),

      uploadedBy:
        owner?.fullName ??
        "",

      uploadedAt:
        this.formatDate(
          file.createdAt,
        ),

      favorite:
        file.favoriteBy.some(
          (id: any) => {
            const favId =
              id?._id?.toString() ??
              id?.toString();

            return (
              favId ===
              employeeId
            );
          },
        ),

      shared:
        file.sharedWith.length >
        0,

      url: canAccess
        ? file.url
        : "",

      thumbnail:
        canAccess
          ? file.thumbnail
          : "",

      ownerId,

      isMine: isOwner,

      canAccess,

      parentFolder:
        file.parentFolder
          ? (
              file.parentFolder as any
            )._id.toString()
          : null,

      mimeType:
        file.mimeType,

      extension:
        file.extension,

      originalName:
        file.originalName,

      createdAt:
        file.createdAt,

      updatedAt:
        file.updatedAt,
    };
  }

  // =====================================================
  // List
  // =====================================================

  toFileList(
    result: {
      items: FileDocument[];

      total: number;

      page: number;

      limit: number;
    },
    employeeId: string,
    canManage: boolean,
  ) {
    return {
      items:
        result.items.map(
          (file) =>
            this.toFile(
              file,
              employeeId,
              canManage,
            ),
        ),

      pagination: {
        total:
          result.total,

        page:
          result.page,

        limit:
          result.limit,

        totalPages:
          Math.ceil(
            result.total /
              result.limit,
          ),
      },
    };
  }

  // =====================================================
  // Helpers
  // =====================================================

  private formatSize(
    bytes: number,
  ) {
    if (!bytes) {
      return "0 Bytes";
    }

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
      "TB",
    ];

    let index = 0;

    let size = bytes;

    while (
      size >= 1024 &&
      index <
        units.length - 1
    ) {
      size /= 1024;

      index++;
    }

    return `${size.toFixed(
      size < 10 ? 1 : 0,
    )} ${
      units[index]
    }`;
  }

  private formatDate(
    date: Date,
  ) {
    const now =
      new Date();

    const diff =
      now.getTime() -
      date.getTime();

    const minutes =
      Math.floor(
        diff / 60000,
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${
        minutes > 1
          ? "s"
          : ""
      } ago`;
    }

    const hours =
      Math.floor(
        minutes / 60,
      );

    if (hours < 24) {
      return `${hours} hour${
        hours > 1
          ? "s"
          : ""
      } ago`;
    }

    const days =
      Math.floor(
        hours / 24,
      );

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return date.toLocaleDateString(
      "en-US",
      {
        day: "numeric",

        month: "short",

        year: "numeric",
      },
    );
  }
}
import { api } from "@/lib/api";

// ======================================================
// Query
// ======================================================

export interface FileQuery {
  search?: string;

  type?: string;

  parentFolder?: string;

  favorite?: boolean;

  page?: number;

  limit?: number;
}

// ======================================================
// Upload
// ======================================================

export interface UploadFileResponse {
  id: string;

  name: string;

  type: string;

  url: string;

  thumbnail?: string;

  size: number;

  mimeType: string;
}

// ======================================================
// Rename
// ======================================================

export interface RenameFileDto {
  name: string;
}

// ======================================================
// Move
// ======================================================

export interface MoveFileDto {
  parentFolder: string | null;
}

// ======================================================
// Share
// ======================================================

export interface ShareFileDto {
  employeeIds: string[];
}

// ======================================================
// Storage
// ======================================================

export interface FileStorageResponse {
  used: number;

  limit: number;
}

// ======================================================
// Download
// ======================================================

export interface FileDownloadInfo {
  url: string;

  fileName: string;

  mimeType: string;
}

// ======================================================
// Helpers
// ======================================================

/**
 * Maps a browser File's mime-type/extension to the backend's
 * FileType enum values. The backend's UploadFileDto requires
 * a `type`, but the browser File object doesn't carry one in
 * that shape, so we derive it client-side before upload.
 */
function resolveUploadType(file: File): string {
  const mime = file.type;

  const extension =
    file.name.split(".").pop()?.toLowerCase() ?? "";

  if (mime.startsWith("image/")) {
    return "image";
  }

  if (mime.startsWith("video/")) {
    return "video";
  }

  if (mime === "application/pdf") {
    return "pdf";
  }

  if (
    mime.includes("spreadsheet") ||
    ["xlsx", "xls", "csv"].includes(extension)
  ) {
    return "spreadsheet";
  }

  if (
    mime.includes("zip") ||
    mime.includes("compressed") ||
    ["zip", "rar", "7z", "tar", "gz"].includes(extension)
  ) {
    return "archive";
  }

  if (
    mime.includes("word") ||
    mime.includes("document") ||
    mime === "text/plain" ||
    ["doc", "docx", "txt", "rtf", "ppt", "pptx"].includes(extension)
  ) {
    return "document";
  }

  return "other";
}

// ======================================================
// Files API
// ======================================================

export const filesApi = {
  // ====================================================
  // List Files
  // ====================================================

  async getFiles(
    query: FileQuery = {},
  ) {
    const { data } =
      await api.get(
        "/files",
        {
          params: query,
        },
      );

    return data;
  },

  // ====================================================
  // Storage
  // ====================================================

  async getStorage(): Promise<FileStorageResponse> {
    const { data } =
      await api.get(
        "/files/storage",
      );

    return data;
  },

  // ====================================================
  // Upload
  // ====================================================

  async upload(
    file: File,
    parentFolder?: string,
  ): Promise<UploadFileResponse> {
    const form =
      new FormData();

    form.append(
      "file",
      file,
    );

    /**
     * Backend's UploadFileDto requires both `name` and `type` —
     * these were previously never sent, so every upload failed
     * validation before it ever reached the file handling logic.
     */
    form.append(
      "name",
      file.name,
    );

    form.append(
      "type",
      resolveUploadType(file),
    );

    if (
      parentFolder
    ) {
      form.append(
        "parentFolder",
        parentFolder,
      );
    }

    const { data } =
      await api.post(
        "/files/upload",
        form,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return data;
  },

  // ====================================================
  // Rename
  // ====================================================

  async rename(
    id: string,
    dto: RenameFileDto,
  ) {
    const { data } =
      await api.patch(
        `/files/${id}/rename`,
        dto,
      );

    return data;
  },

  // ====================================================
  // Move
  // ====================================================

  async move(
    id: string,
    dto: MoveFileDto,
  ) {
    const { data } =
      await api.patch(
        `/files/${id}/move`,
        dto,
      );

    return data;
  },

  // ====================================================
  // Share
  // ====================================================

  async share(
    id: string,
    dto: ShareFileDto,
  ) {
    const { data } =
      await api.patch(
        `/files/${id}/share`,
        dto,
      );

    return data;
  },

  // ====================================================
  // Favorite
  // ====================================================

  async toggleFavorite(
    id: string,
  ) {
    const { data } =
      await api.patch(
        `/files/${id}/favorite`,
      );

    return data;
  },

  // ====================================================
  // Delete
  // ====================================================

  async delete(
    id: string,
  ) {
    const { data } =
      await api.delete(
        `/files/${id}`,
      );

    return data;
  },

  // ====================================================
  // Download
  //
  // The backend endpoint returns JSON metadata (the file's
  // Cloudinary URL, name, and mime type) — it does not stream
  // raw bytes. So this returns that JSON as-is; the actual
  // file content is fetched from `url` separately, in
  // useDownloadFile.
  // ====================================================

  async download(
    id: string,
  ): Promise<FileDownloadInfo> {
    const { data } =
      await api.get(
        `/files/${id}/download`,
      );

    return data;
  },
};
export interface FileItem {
  id: string;

  name: string;

  type:
    | "image"
    | "pdf"
    | "document"
    | "spreadsheet"
    | "video"
    | "archive"
    | "folder";

  size: string;

  uploadedBy: string;

  uploadedAt: string;

  favorite: boolean;

  shared: boolean;

  url: string;

  thumbnail?: string;

  /**
   * The current viewer's employee id owns this file. Everyone can
   * see every file in the list, but only the owner (or admin/HR)
   * can rename/move/share/delete it, and only the owner, someone
   * it's shared with, or admin/HR can open/download it.
   */
  isMine?: boolean;

  /**
   * Whether the current viewer can open/download this specific
   * file (owner, shared-with, or admin/HR). When false, `url`/
   * `thumbnail` are empty strings from the backend.
   */
  canAccess?: boolean;

  ownerId?: string;
}
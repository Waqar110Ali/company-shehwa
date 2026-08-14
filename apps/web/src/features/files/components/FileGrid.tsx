import FileCard from "./FileCard";

import type { FileItem } from "../types/file";

interface Props {
  files: FileItem[];

  onFavorite: (id: string) => void;

  onView: (file: FileItem) => void;

  onRename: (file: FileItem) => void;

  onShare: (file: FileItem) => void;

  onDownload: (file: FileItem) => void;

  onDelete: (id: string) => void;
}

export default function FileGrid({
  files,
  onFavorite,
  onView,
  onRename,
  onShare,
  onDownload,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onFavorite={onFavorite}
          onView={onView}
          onRename={onRename}
          onShare={onShare}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
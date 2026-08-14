import GlassCard from "@/components/premium/GlassCard";

import FileActions from "./FileActions";
import FileIcon from "./FileIcon";

import type { FileItem } from "../types/file";

interface Props {
  file: FileItem;

  onFavorite: (id: string) => void;

  onView: (file: FileItem) => void;

  onRename: (file: FileItem) => void;

  onShare: (file: FileItem) => void;

  onDownload: (file: FileItem) => void;

  onDelete: (id: string) => void;
}

export default function FileCard({
  file,
  onFavorite,
  onView,
  onRename,
  onShare,
  onDownload,
  onDelete,
}: Props) {
  return (
    <GlassCard className="space-y-4 p-5">

      <div className="flex justify-center">
        {file.thumbnail ? (
          <img
            src={file.thumbnail}
            alt={file.name}
            className="h-24 w-24 rounded-xl object-cover"
          />
        ) : (
          <FileIcon type={file.type} />
        )}
      </div>

      <div className="space-y-1 text-center">
        <h3 className="truncate font-semibold text-white">
          {file.name}
        </h3>

        <p className="text-sm text-slate-400">
          {file.size}
        </p>

        <p className="text-xs text-slate-500">
          {file.uploadedBy}
        </p>
      </div>

      <FileActions
        favorite={file.favorite}
        onFavorite={() => onFavorite(file.id)}
        onView={() => onView(file)}
        onRename={() => onRename(file)}
        onShare={() => onShare(file)}
        onDownload={() => onDownload(file)}
        onDelete={() => onDelete(file.id)}
      />

    </GlassCard>
  );
}
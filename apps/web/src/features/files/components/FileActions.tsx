import {
  Download,
  Eye,
  Pencil,
  Share2,
  Star,
  Trash2,
} from "lucide-react";

interface Props {
  favorite: boolean;

  onFavorite: () => void;

  onView: () => void;

  onRename: () => void;

  onShare: () => void;

  onDownload: () => void;

  onDelete: () => void;
}

export default function FileActions({
  favorite,
  onFavorite,
  onView,
  onRename,
  onShare,
  onDownload,
  onDelete,
}: Props) {
  const button =
    "rounded-lg p-2 transition hover:bg-white/10";

  return (
    <div className="mt-5 flex flex-wrap gap-2">

      <button
        onClick={onFavorite}
        className={button}
      >
        <Star
          size={17}
          className={
            favorite
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-400"
          }
        />
      </button>

      <button
        onClick={onView}
        className={button}
      >
        <Eye
          size={17}
          className="text-cyan-400"
        />
      </button>

      <button
        onClick={onRename}
        className={button}
      >
        <Pencil
          size={17}
          className="text-yellow-400"
        />
      </button>

      <button
        onClick={onShare}
        className={button}
      >
        <Share2
          size={17}
          className="text-violet-400"
        />
      </button>

      <button
        onClick={onDownload}
        className={button}
      >
        <Download
          size={17}
          className="text-green-400"
        />
      </button>

      <button
        onClick={onDelete}
        className={button}
      >
        <Trash2
          size={17}
          className="text-red-400"
        />
      </button>

    </div>
  );
}
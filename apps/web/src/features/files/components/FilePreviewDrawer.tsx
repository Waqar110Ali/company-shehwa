import {
  Download,
  X,
} from "lucide-react";

import type {
  FileItem,
} from "../types/file";

import FileIcon from "./FileIcon";

// ======================================================
// Props
// ======================================================

interface Props {
  open: boolean;

  file: FileItem | null;

  onClose: () => void;

  onDownload?: (
    file: FileItem,
  ) => void;
}

// ======================================================
// Component
// ======================================================

export default function FilePreviewDrawer({
  open,
  file,
  onClose,
  onDownload,
}: Props) {
  // ====================================================
  // Closed State
  // ====================================================

  if (
    !open ||
    !file
  ) {
    return null;
  }

  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">

      {/* ==================================================
          Drawer
      ================================================== */}

      <div className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-950 p-6 shadow-2xl">

        {/* ==================================================
            Header
        ================================================== */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-white">
            File Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close file preview"
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X
              size={20}
              className="text-white"
            />
          </button>

        </div>

        {/* ==================================================
            Preview
        ================================================== */}

        {file.thumbnail ? (
          <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">

            <img
              src={file.thumbnail}
              alt={file.name}
              className="max-h-80 w-full object-contain"
            />

          </div>
        ) : (
          <div className="mb-6 flex h-56 items-center justify-center rounded-xl border border-white/10 bg-white/5">

            <FileIcon
              type={file.type}
            />

          </div>
        )}

        {/* ==================================================
            File Information
        ================================================== */}

        <div className="space-y-5">

          <Info
            title="Name"
            value={
              file.name ||
              "Unknown"
            }
          />

          <Info
            title="Type"
            value={
              file.type ||
              "Unknown"
            }
          />

          <Info
            title="Size"
            value={
              file.size ||
              "0 Bytes"
            }
          />

          <Info
            title="Uploaded By"
            value={
              file.uploadedBy ||
              "Unknown"
            }
          />

          <Info
            title="Uploaded At"
            value={
              formatDate(
                file.uploadedAt,
              )
            }
          />

        </div>

        {/* ==================================================
            Download
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            onDownload?.(
              file,
            )
          }
          disabled={
            !onDownload
          }
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download
            size={18}
          />

          Download
        </button>

      </div>

    </div>
  );
}

// ======================================================
// Info
// ======================================================

function Info({
  title,
  value,
}: {
  title: string;

  value: string;
}) {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words text-sm text-white">
        {value}
      </p>

    </div>
  );
}

// ======================================================
// Date Formatter
// ======================================================

function formatDate(
  value?: string,
): string {
  if (!value) {
    return "Unknown";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return date.toLocaleString();
}
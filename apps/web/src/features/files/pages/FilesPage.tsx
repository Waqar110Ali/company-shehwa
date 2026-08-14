import {
  useMemo,
  useState,
} from "react";

import {
  Upload,
} from "lucide-react";

import {
  toast,
} from "sonner";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

import FileStats from "../components/FileStats";
import FileSearch from "../components/FileSearch";
import FileFilters from "../components/FileFilters";
import FileGrid from "../components/FileGrid";
import FilePreviewDrawer from "../components/FilePreviewDrawer";
import RenameFileModal from "../components/RenameFileModal";
import ShareFileModal from "../components/ShareFileModal";

import type {
  FileItem,
} from "../types/file";

import {
  useFiles,
} from "../hooks/useFiles";

import {
  useUploadFile,
} from "../hooks/useUploadFile";

import {
  useRenameFile,
} from "../hooks/useRenameFile";

import {
  useDeleteFile,
} from "../hooks/useDeleteFile";

import {
  useFavoriteFile,
} from "../hooks/useFavoriteFile";

import {
  useDownloadFile,
} from "../hooks/useDownloadFile";

import {
  useShareFile,
} from "../hooks/useShareFile";

import { useAuth } from "@/context/AuthContext";

import {
  Role,
} from "@/users/enums/role.enum";

// ======================================================
// Helpers
// ======================================================

function formatFileSize(
  bytes: number,
): string {
  if (
    bytes === 0
  ) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const index =
    Math.floor(
      Math.log(bytes) /
        Math.log(1024),
    );

  const value =
    bytes /
    Math.pow(
      1024,
      index,
    );

  return `${value.toFixed(
    value >= 10 ||
      index === 0
      ? 0
      : 1,
  )} ${units[index]}`;
}

// ======================================================
// Page
// ======================================================

export default function FilesPage() {
  // ====================================================
  // Authentication
  //
  // canManage (admin/HR) can act on ANY file. Everyone else
  // can only act on files where item.isMine is true — that
  // per-file check happens in each handler below, not here.
  // ====================================================

  const {
    user,
  } = useAuth();

  const canManage =
    user?.role ===
      Role.ADMIN ||
    user?.role ===
      Role.HR;

  // ====================================================
  // Filters
  // ====================================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filter,
    setFilter,
  ] = useState("");

  // ====================================================
  // Selected File
  // ====================================================

  const [
    selectedFile,
    setSelectedFile,
  ] =
    useState<FileItem | null>(
      null,
    );

  const [
    renameFile,
    setRenameFile,
  ] =
    useState<FileItem | null>(
      null,
    );

  const [
    shareFile,
    setShareFile,
  ] =
    useState<FileItem | null>(
      null,
    );

  // ====================================================
  // Modal State
  // ====================================================

  const [
    previewOpen,
    setPreviewOpen,
  ] = useState(false);

  const [
    renameOpen,
    setRenameOpen,
  ] = useState(false);

  const [
    shareOpen,
    setShareOpen,
  ] = useState(false);

  // ====================================================
  // Files Query
  // ====================================================

  const {
    data,
    isLoading,
    isError,
  } = useFiles({
    search:
      search.trim() ||
      undefined,

    type:
      filter ||
      undefined,

    page: 1,

    limit: 100,
  });

  // ====================================================
  // Mutations
  // ====================================================

  const uploadFile =
    useUploadFile();

  const renameFileMutation =
    useRenameFile();

  const deleteFileMutation =
    useDeleteFile();

  const favoriteFileMutation =
    useFavoriteFile();

  const downloadFile =
    useDownloadFile();

  const shareFileMutation =
    useShareFile();

  // ====================================================
  // Backend Response
  // ====================================================

  const files =
    useMemo(() => {
      const items =
        data?.items ??
        data?.data ??
        [];

      return items.map(
        (
          item: any,
        ): FileItem => ({
          id:
            item.id ??
            item._id,

          name:
            item.name,

          type:
            item.type,

          size:
            typeof item.size ===
            "number"
              ? formatFileSize(
                  item.size,
                )
              : item.size ??
                "0 Bytes",

          uploadedBy:
            item.owner
              ?.fullName ??
            item.owner
              ?.name ??
            item.uploadedBy ??
            "Unknown",

          uploadedAt:
            item.createdAt ??
            item.uploadedAt ??
            "",

          favorite:
            item.favorite ??
            false,

          shared:
            item.shared ??
            false,

          url:
            item.url ??
            "",

          thumbnail:
            item.thumbnail,

          isMine:
            item.isMine ??
            false,

          canAccess:
            item.canAccess ??
            false,

          ownerId:
            item.ownerId,
        }),
      );
    }, [
      data,
    ]);

  // ====================================================
  // Favorite
  // ====================================================

  function toggleFavorite(
    file: FileItem,
  ) {
    favoriteFileMutation.mutate({
      id: file.id,

      favorite:
        !file.favorite,
    });
  }

  // ====================================================
  // View
  // ====================================================

  function handleView(
    file: FileItem,
  ) {
    setSelectedFile(
      file,
    );

    setPreviewOpen(
      true,
    );
  }

  // ====================================================
  // Rename — owner or admin/HR
  // ====================================================

  function handleRename(
    file: FileItem,
  ) {
    if (
      !canManage &&
      !file.isMine
    ) {
      toast.error(
        "You can only rename files you uploaded.",
      );

      return;
    }

    setRenameFile(
      file,
    );

    setRenameOpen(
      true,
    );
  }

  async function handleRenameSave(
    id: string,
    name: string,
  ) {
    const trimmedName =
      name.trim();

    if (!trimmedName) {
      toast.error(
        "File name cannot be empty.",
      );

      return;
    }

    await renameFileMutation.mutateAsync({
      id,

      dto: {
        name:
          trimmedName,
      },
    });

    setRenameOpen(
      false,
    );

    setRenameFile(
      null,
    );
  }

  // ====================================================
  // Share — owner or admin/HR
  // ====================================================

  function handleShare(
    file: FileItem,
  ) {
    if (
      !canManage &&
      !file.isMine
    ) {
      toast.error(
        "You can only share files you uploaded.",
      );

      return;
    }

    setShareFile(
      file,
    );

    setShareOpen(
      true,
    );
  }

  // ====================================================
  // Delete — owner or admin/HR
  // ====================================================

  async function handleDelete(
    id: string,
  ) {
    const file =
      files.find(
        (item) =>
          item.id === id,
      );

    if (
      !canManage &&
      !file?.isMine
    ) {
      toast.error(
        "You can only delete files you uploaded.",
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Delete this file?",
      );

    if (!confirmed) {
      return;
    }

    await deleteFileMutation.mutateAsync(
      id,
    );
  }

  // ====================================================
  // Download
  //
  // No client-side gate here — the backend already enforces
  // owner/shared/admin-HR access and returns a 403 (surfaced
  // as a toast below) for files the viewer can't open.
  // ====================================================

  async function handleDownload(
    file: FileItem,
  ) {
    try {
      await downloadFile.mutateAsync(
        {
          id:
            file.id,

          fileName:
            file.name,
        },
      );
    } catch {
      toast.error(
        "Unable to download file.",
      );
    }
  }

  // ====================================================
  // Upload
  //
  // Open to every role now — everyone can upload their own
  // files, not just admin/HR.
  // ====================================================

  function handleUploadClick() {
    const input =
      document.createElement(
        "input",
      );

    input.type =
      "file";

    input.multiple =
      false;

    input.onchange =
      async () => {
        const file =
          input.files?.[0];

        if (!file) {
          return;
        }

        try {
          await uploadFile.mutateAsync({
            file,

            parentFolder:
              undefined,
          });
        } catch {
          toast.error(
            "Unable to upload file.",
          );
        }
      };

    input.click();
  }

  // ====================================================
  // Loading
  // ====================================================

  if (isLoading) {
    return (
      <div className="space-y-8">
        <SectionHeading
          title="Files Manager"
          subtitle="Manage company files and folders."
        />

        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/5">
          <p className="text-slate-400">
            Loading files...
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // Error
  // ====================================================

  if (isError) {
    return (
      <div className="space-y-8">
        <SectionHeading
          title="Files Manager"
          subtitle="Manage company files and folders."
        />

        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-red-400/20 bg-red-400/5">
          <p className="text-red-400">
            Unable to load files.
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="space-y-8">

      {/* ==================================================
          Header
      ================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <SectionHeading
          title="Files Manager"
          subtitle="Manage company files and folders."
        />

        <button
          type="button"
          onClick={
            handleUploadClick
          }
          disabled={
            uploadFile.isPending
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload
            size={18}
          />

          {uploadFile.isPending
            ? "Uploading..."
            : "Upload File"}
        </button>

      </div>

      {/* ==================================================
          Statistics
      ================================================== */}

      <FileStats />

      {/* ==================================================
          Search / Filter
      ================================================== */}

      <div className="grid gap-5 lg:grid-cols-2">

        <FileSearch
          value={
            search
          }
          onChange={
            setSearch
          }
        />

        <FileFilters
          value={
            filter
          }
          onChange={
            setFilter
          }
        />

      </div>

      {/* ==================================================
          Files
      ================================================== */}

      {files.length ===
      0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-white/10 bg-white/5">
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              No files found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        </div>
      ) : (
        <FileGrid
          files={
            files
          }

          onFavorite={(
            id,
          ) => {
            const file =
              files.find(
                (
                  item,
                ) =>
                  item.id ===
                  id,
              );

            if (!file) {
              return;
            }

            toggleFavorite(
              file,
            );
          }}

          onView={
            handleView
          }

          onRename={
            handleRename
          }

          onShare={
            handleShare
          }

          onDownload={
            handleDownload
          }

          onDelete={
            handleDelete
          }
        />
      )}

      {/* ==================================================
          Preview
      ================================================== */}

      <FilePreviewDrawer
        open={previewOpen}
        file={selectedFile}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedFile(null);
        }}
        onDownload={handleDownload}
      />

      {/* ==================================================
          Rename
      ================================================== */}

      <RenameFileModal
        open={
          renameOpen
        }

        file={
          renameFile
        }

        onClose={() => {
          setRenameOpen(
            false,
          );

          setRenameFile(
            null,
          );
        }}

        onSave={
          handleRenameSave
        }
      />

      {/* ==================================================
          Share
      ================================================== */}

      <ShareFileModal
        open={shareOpen}
        file={shareFile}
        onClose={() => {
          setShareOpen(
            false,
          );

          setShareFile(
            null,
          );
        }}
      />

    </div>
  );
}
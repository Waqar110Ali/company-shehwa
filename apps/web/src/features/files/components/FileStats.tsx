import {
  FileText,
  Folder,
  HardDrive,
  Image,
} from "lucide-react";

import StatisticCard from "@/features/dashboard/components/StatisticCard";

import {
  useFiles,
} from "../hooks/useFiles";

import {
  useFileStorage,
} from "../hooks/useFileStorage";

// ======================================================
// Helpers
// ======================================================

function formatBytes(
  bytes: number,
): string {
  if (
    !bytes ||
    bytes <= 0
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
// Component
// ======================================================

export default function FileStats() {
  // ====================================================
  // Files
  // ====================================================

  const {
    data,
    isLoading:
      filesLoading,
  } = useFiles({
    page: 1,

    limit: 1000,
  });

  // ====================================================
  // Storage
  // ====================================================

  const {
    data:
      storageData,

    isLoading:
      storageLoading,
  } =
    useFileStorage();

  // ====================================================
  // Backend Files
  // ====================================================

  const files =
    data?.items ??
    data?.data ??
    [];

  // ====================================================
  // Statistics
  // ====================================================

  const folders =
    files.filter(
      (
        file: any,
      ) =>
        file.type ===
        "folder",
    ).length;

  const documents =
    files.filter(
      (
        file: any,
      ) =>
        file.type ===
          "document" ||
        file.type ===
          "pdf" ||
        file.type ===
          "spreadsheet",
    ).length;

  const images =
    files.filter(
      (
        file: any,
      ) =>
        file.type ===
        "image",
    ).length;

  // ====================================================
  // Storage Response
  // ====================================================

  const storageUsed =
    storageData?.used ??
    storageData?.total ??
    storageData?.storageUsed ??
    0;

  const storageLimit =
    storageData?.limit ??
    storageData?.maxStorage ??
    storageData?.storageLimit ??
    100 *
      1024 *
      1024 *
      1024;

  // ====================================================
  // Loading
  // ====================================================

  const loading =
    filesLoading ||
    storageLoading;

  // ====================================================
  // Render
  // ====================================================

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* ==================================================
          Folders
      ================================================== */}

      <StatisticCard
        title="Folders"
        value={
          loading
            ? "..."
            : folders.toString()
        }
        change="Available"
        icon={Folder}
      />

      {/* ==================================================
          Documents
      ================================================== */}

      <StatisticCard
        title="Documents"
        value={
          loading
            ? "..."
            : documents.toString()
        }
        change="Stored"
        icon={FileText}
      />

      {/* ==================================================
          Images
      ================================================== */}

      <StatisticCard
        title="Images"
        value={
          loading
            ? "..."
            : images.toString()
        }
        change="Uploaded"
        icon={Image}
      />

      {/* ==================================================
          Storage
      ================================================== */}

      <StatisticCard
        title="Storage"
        value={
          loading
            ? "..."
            : formatBytes(
                storageUsed,
              )
        }
        change={
          loading
            ? "Loading"
            : `of ${formatBytes(
                storageLimit,
              )}`
        }
        icon={HardDrive}
      />

    </div>
  );
}
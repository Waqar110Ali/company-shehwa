import { useState } from "react";

import TaskModal from "@/features/tasks/components/TaskModal";

import type { FileItem } from "../types/file";

interface Props {
  open: boolean;

  file: FileItem | null;

  onClose: () => void;

  onSave: (
    id: string,
    name: string
  ) => void;
}

export default function RenameFileModal({
  open,
  file,
  onClose,
  onSave,
}: Props) {
  const [name, setName] =
    useState(file?.name ?? "");

  if (!open || !file) return null;

  return (
    <TaskModal
      open={open}
      title="Rename File"
      onClose={onClose}
    >
      <div className="space-y-5">

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        />

        <button
          onClick={() => {
            onSave(file.id, name);

            onClose();
          }}
          className="w-full rounded-xl bg-cyan-500 py-3 text-white"
        >
          Save

        </button>

      </div>

    </TaskModal>
  );
}
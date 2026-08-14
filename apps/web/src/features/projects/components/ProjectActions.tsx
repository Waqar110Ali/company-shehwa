import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <DropdownMenu.Root>

      <DropdownMenu.Trigger asChild>

        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">

          <MoreVertical size={18} />

        </button>

      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>

        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 w-48 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl"
        >

          <DropdownMenu.Item
            onClick={onEdit}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-200 outline-none transition hover:bg-cyan-500/10"
          >

            <Pencil size={16} />

            Edit Project

          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={onDelete}
            className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-red-400 outline-none transition hover:bg-red-500/10"
          >

            <Trash2 size={16} />

            Delete Project

          </DropdownMenu.Item>

        </DropdownMenu.Content>

      </DropdownMenu.Portal>

    </DropdownMenu.Root>
  );
}
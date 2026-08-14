import { useState } from "react";

import {
  FolderKanban,
  Plus,
} from "lucide-react";

import PremiumButton from "@/components/premium/PremiumButton";

import CreateProjectDialog from "./CreateProjectDialog";

export default function ProjectHeader() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <div className="mb-3 flex items-center gap-3">

            <FolderKanban className="text-cyan-300" />

            <span className="font-semibold uppercase tracking-wider text-cyan-300">
              Project Management
            </span>

          </div>

          <h1 className="text-5xl font-black text-white">
            Projects
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Manage all active company projects,
            monitor progress, assign teams,
            and track productivity.
          </p>

        </div>

        <PremiumButton
          onClick={() =>
            setOpen(true)
          }
        >
          <Plus className="mr-2 h-5 w-5" />

          New Project
        </PremiumButton>

      </div>

      <CreateProjectDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
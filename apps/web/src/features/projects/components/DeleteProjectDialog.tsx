import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteProject } from "../hooks/useDeleteProject";

interface Props {
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
  projectId: string;
  projectName: string;
}

export default function DeleteProjectDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: Props) {
  const deleteProject =
    useDeleteProject();

  async function handleDelete() {
    await deleteProject.mutateAsync(
      projectId,
    );

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Delete Project
          </DialogTitle>

        </DialogHeader>

        <p className="text-sm leading-7 text-slate-400">
          Are you sure you want to
          delete{" "}
          <span className="font-semibold text-white">
            {projectName}
          </span>
          ?
        </p>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={
              handleDelete
            }
            disabled={
              deleteProject.isPending
            }
          >
            {deleteProject.isPending
              ? "Deleting..."
              : "Delete"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
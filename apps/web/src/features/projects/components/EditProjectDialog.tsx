import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import MemberSelector from "../components/MemberSelector";

import { useUpdateProject } from "../hooks/useUpdateProject";

import type { Project } from "../types/project";

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  project: Project;
}

type FormValues = {
  name: string;

  description: string;

  status:
    | "Planning"
    | "Active"
    | "On Hold"
    | "Completed";

  priority:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  startDate: string;

  dueDate: string;

  members: string[];
};

export default function EditProjectDialog({
  open,
  onOpenChange,
  project,
}: Props) {
  const updateProject =
    useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
    },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      dueDate: "",
      members: [],
    },
  });

  const members =
    watch("members") ?? [];

  useEffect(() => {
    if (!project) {
      return;
    }

    reset({
      name: project.name,

      description:
        project.description,

      status:
        project.status as FormValues["status"],

      priority:
        project.priority as FormValues["priority"],

      startDate:
        project.startDate.slice(
          0,
          10,
        ),

      dueDate:
        project.dueDate.slice(
          0,
          10,
        ),

      members:
        project.members.map(
          (member) =>
            member.id,
        ),
    });
  }, [
    project,
    reset,
  ]);

  async function onSubmit(
    values: FormValues,
  ) {
    await updateProject.mutateAsync({
      id: project.id,

      data: values,
    });

    reset();

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Project
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-6"
        >
          <div>
            <Input
              placeholder="Project Name"
              {...register("name", {
                required:
                  "Project name is required.",
              })}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          <Textarea
            rows={5}
            placeholder="Project Description"
            {...register(
              "description",
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
                {...register(
                  "status",
                )}
              >
                <option value="Planning">
                  Planning
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="On Hold">
                  On Hold
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Priority
              </label>

              <select
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
                {...register(
                  "priority",
                )}
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

                <option value="Critical">
                  Critical
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Start Date
              </label>

              <Input
                type="date"
                {...register(
                  "startDate",
                )}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Due Date
              </label>

              <Input
                type="date"
                {...register(
                  "dueDate",
                )}
              />
            </div>
          </div>

          <MemberSelector
            value={members}
            onChange={(
              value,
            ) =>
              setValue(
                "members",
                value,
                {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                },
              )
            }
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(
                  false,
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                updateProject.isPending
              }
            >
              {updateProject.isPending
                ? "Updating..."
                : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
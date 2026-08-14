import {
  CalendarDays,
  User,
  AlignLeft,
  X,
} from "lucide-react";

import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";

import type { Task } from "../types/task";

interface Props {
  task: Task | null;

  open: boolean;

  onClose: () => void;

  onEdit: (task: Task) => void;

  onDelete: (id: string) => void;
}

export default function TaskDetailsDrawer({
  task,
  open,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">

      <div className="flex h-full w-full max-w-lg flex-col bg-slate-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <h2 className="text-2xl font-bold text-white">
            Task Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">

          <div>

            <h3 className="text-2xl font-bold text-white">
              {task.title}
            </h3>

            <div className="mt-4 flex gap-3">

              <TaskStatus
                status={task.status}
              />

              <TaskPriority
                priority={task.priority}
              />

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-start gap-3">

              <AlignLeft
                size={20}
                className="mt-1 text-cyan-400"
              />

              <div>

                <h4 className="font-semibold text-white">
                  Description
                </h4>

                <p className="mt-2 text-slate-400">
                  {task.description}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <CalendarDays
                size={20}
                className="text-cyan-400"
              />

              <div>

                <h4 className="font-semibold text-white">
                  Due Date
                </h4>

                <p className="text-slate-400">
                  {task.dueDate}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <User
                size={20}
                className="text-cyan-400"
              />

              <div>

                <h4 className="font-semibold text-white">
                  Assigned To
                </h4>

                <p className="text-slate-400">
                  {task.assignee}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-3 border-t border-white/10 p-6">

          <button
            onClick={() => onEdit(task)}
            className="flex-1 rounded-xl bg-yellow-500 py-3 font-semibold text-white hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
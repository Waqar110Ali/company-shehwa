import { useEffect, useState } from "react";

import ProjectSelector from "./ProjectSelector";
import EmployeeSelector from "./EmployeeSelector";

import type {
  TaskPriority,
  TaskStatus,
} from "../types/task";

interface Props {
  task?: any;

  onSubmit: (
    task: any,
  ) => void;
}

export default function TaskForm({
  task,
  onSubmit,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [project, setProject] =
    useState("");

  const [
    assignedTo,
    setAssignedTo,
  ] = useState("");

  const [priority, setPriority] =
    useState<TaskPriority>(
      "Medium",
    );

  const [status, setStatus] =
    useState<TaskStatus>(
      "Todo",
    );

  const [progress, setProgress] =
    useState(0);

  const [dueDate, setDueDate] =
    useState("");

  useEffect(() => {
    if (!task) {
      reset();

      return;
    }

    setTitle(task.title);

    setDescription(
      task.description,
    );

    setProject(
      task.projectId,
    );

    setAssignedTo(
      task.assignedTo,
    );

    setPriority(
      task.priority,
    );

    setStatus(
      task.status,
    );

    setProgress(
      task.progress,
    );

    setDueDate(
      task.dueDate,
    );
  }, [task]);

  function reset() {
    setTitle("");

    setDescription("");

    setProject("");

    setAssignedTo("");

    setPriority(
      "Medium",
    );

    setStatus(
      "Todo",
    );

    setProgress(0);

    setDueDate("");
  }

  function submit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    if (
      !title.trim() ||
      !project ||
      !assignedTo
    ) {
      return;
    }

    onSubmit({
      title,

      description,

      project,

      assignedTo,

      priority,

      status,

      progress,

      dueDate,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-7"
    >
      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-300">

          Task Title

        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value,
            )
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
          placeholder="Authentication Module"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-300">

          Description

        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value,
            )
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
        />

      </div>

      <ProjectSelector
        value={project}
        onChange={
          setProject
        }
      />

      <EmployeeSelector
        value={assignedTo}
        onChange={
          setAssignedTo
        }
      />

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">

            Priority

          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as TaskPriority,
              )
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
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

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-300">

            Status

          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target
                  .value as TaskStatus,
              )
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
          >
            <option value="Todo">
              Todo
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Review">
              Review
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-300">

          Progress

        </label>

        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) =>
            setProgress(
              Number(
                e.target.value,
              ),
            )
          }
          className="w-full"
        />

        <div className="mt-2 text-right text-cyan-400">

          {progress}%

        </div>

      </div>

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-300">

          Due Date

        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              e.target.value,
            )
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        />

      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-500 py-4 font-semibold text-white transition hover:bg-cyan-600"
      >
        {task
          ? "Update Task"
          : "Create Task"}
      </button>

    </form>
  );
}
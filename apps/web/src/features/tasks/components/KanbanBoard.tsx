import { useState } from "react";
import { Plus } from "lucide-react";

import type { Task } from "../types/task";
import { tasks as initialTasks } from "../data/tasks";

import KanbanColumn from "./KanbanColumn";
import TaskModal from "./TaskModal";
import TaskForm from "./TaskForm";

export default function KanbanBoard() {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [open, setOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  function openCreateModal() {
    setEditingTask(null);
    setOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setOpen(true);
  }

  function closeModal() {
    setEditingTask(null);
    setOpen(false);
  }

  function saveTask(task: Task) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id
            ? task
            : item
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        task,
      ]);
    }

    closeModal();
  }

  function deleteTask(id: string) {
    setTasks((prev) =>
      prev.filter(
        (task) => task.id !== id
      )
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Project Tasks
          </h2>

          <p className="mt-2 text-slate-400">
            Organize your project workflow.
          </p>

        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          <Plus size={18} />

          New Task

        </button>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <KanbanColumn
          title="Todo"
          tasks={tasks.filter(
            (task) =>
              task.status === "Todo"
          )}
          onEdit={openEditModal}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="In Progress"
          tasks={tasks.filter(
            (task) =>
              task.status ===
              "In Progress"
          )}
          onEdit={openEditModal}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="Review"
          tasks={tasks.filter(
            (task) =>
              task.status ===
              "Review"
          )}
          onEdit={openEditModal}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="Done"
          tasks={tasks.filter(
            (task) =>
              task.status === "Done"
          )}
          onEdit={openEditModal}
          onDelete={deleteTask}
        />

      </div>

      <TaskModal
        open={open}
        title={
          editingTask
            ? "Edit Task"
            : "Create Task"
        }
        onClose={closeModal}
      >
        <TaskForm
          task={editingTask}
          onSubmit={saveTask}
        />
      </TaskModal>
    </>
  );
}
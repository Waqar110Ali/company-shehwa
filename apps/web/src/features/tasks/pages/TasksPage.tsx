import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";
import { appToast } from "@/lib/toast";

import TaskStats from "../components/TaskStats";
import TaskSearch from "../components/TaskSearch";
import TaskFilters from "../components/TaskFilters";
import TaskBoard from "../components/TaskBoard";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import TaskDetailsDrawer from "../components/TaskDetailsDrawer";
import TaskViewToggle from "../components/TaskViewToggle";

import type { Task } from "../types/task";

import { useTasks } from "../hooks/useTasks";
import { useTaskStatistics } from "../hooks/useTaskStatistics";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";

import {
  mapTasks,
  mapTaskStatistics,
} from "../mapper/task.mapper";

export default function TasksPage() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [view, setView] =
    useState<"board" | "list">(
      "board",
    );

  const [modalOpen, setModalOpen] =
    useState(false);

  const [
    editingTask,
    setEditingTask,
  ] =
    useState<Task | null>(
      null,
    );

  const [
    selectedTask,
    setSelectedTask,
  ] =
    useState<Task | null>(
      null,
    );

  const {
    data: tasksResponse,
    isLoading,
  } = useTasks({
    search,
    status,
  });

  const {
    data: statisticsResponse,
  } =
    useTaskStatistics();

  const createTask =
    useCreateTask();

  const updateTask =
    useUpdateTask();

  const deleteTask =
    useDeleteTask();

  const tasks =
    useMemo(() => {
      if (!tasksResponse) {
        return [];
      }

      return mapTasks(
        tasksResponse,
      ).items;
    }, [tasksResponse]);

  const statistics =
    useMemo(() => {
      if (!statisticsResponse) {
        return {
          total: 0,
          todo: 0,
          progress: 0,
          review: 0,
          completed: 0,
        };
      }

      return mapTaskStatistics(
        statisticsResponse,
      );
    }, [
      statisticsResponse,
    ]);

  async function saveTask(
    task: any,
  ) {
    try {
      if (editingTask) {
        await updateTask.mutateAsync(
          {
            id: editingTask.id,
            data: task,
          },
        );

        appToast.success(
          "Task updated successfully.",
        );
      } else {
        await createTask.mutateAsync(
          task,
        );

        appToast.success(
          "Task created successfully.",
        );
      }

      setModalOpen(false);

      setEditingTask(
        null,
      );
    } catch (error) {
      console.error(error);

      appToast.error(
        "Unable to save task.",
      );
    }
  }

  async function handleDelete(
    id: string,
  ) {
    if (
      !window.confirm(
        "Delete this task?",
      )
    )
      return;

    try {
      await deleteTask.mutateAsync(
        id,
      );

      appToast.success(
        "Task deleted successfully.",
      );

      if (
        selectedTask?.id ===
        id
      ) {
        setSelectedTask(
          null,
        );
      }
    } catch {
      appToast.error(
        "Unable to delete task.",
      );
    }
  }

  function editTask(
    task: Task,
  ) {
    setEditingTask(task);

    setModalOpen(true);
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading Tasks...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <SectionHeading
          title="Task Management"
          subtitle="Manage all company tasks."
        />

        <button
          onClick={() => {
            setEditingTask(
              null,
            );

            setModalOpen(
              true,
            );
          }}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
        >
          <Plus size={18} />

          Add Task

        </button>

      </div>

     <TaskStats
  total={statistics.total}
  todo={statistics.todo}
  progress={statistics.progress}
  review={statistics.review}
  completed={statistics.completed}
/>

      <div className="grid gap-5 lg:grid-cols-2">

        <TaskSearch
          value={search}
          onChange={
            setSearch
          }
        />

        <TaskFilters
          value={status}
          onChange={
            setStatus
          }
        />

      </div>

      <div className="flex justify-end">

        <TaskViewToggle
          view={view}
          onChange={
            setView
          }
        />

      </div>

      {view ===
      "board" ? (
        <TaskBoard
          tasks={tasks}
          onView={
            setSelectedTask
          }
          onEdit={
            editTask
          }
          onDelete={
            handleDelete
          }
        />
      ) : (
        <TaskList
          tasks={tasks}
          onView={
            setSelectedTask
          }
          onEdit={
            editTask
          }
          onDelete={
            handleDelete
          }
        />
      )}

      <TaskModal
        open={modalOpen}
        title={
          editingTask
            ? "Edit Task"
            : "Create Task"
        }
        onClose={() => {
          setModalOpen(
            false,
          );

          setEditingTask(
            null,
          );
        }}
      >
        <TaskForm
          task={
            editingTask
          }
          onSubmit={
            saveTask
          }
        />
      </TaskModal>

      <TaskDetailsDrawer
        open={
          selectedTask !==
          null
        }
        task={
          selectedTask
        }
        onClose={() =>
          setSelectedTask(
            null,
          )
        }
        onEdit={(
          task,
        ) => {
          setSelectedTask(
            null,
          );

          editTask(task);
        }}
        onDelete={(
          id,
        ) => {
          handleDelete(
            id,
          );
        }}
      />

    </div>
  );
}
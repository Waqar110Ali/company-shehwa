import TaskColumn from "./TaskColumn";

import type { Task } from "../types/task";

interface Props {
  tasks: Task[];

  onView: (task: Task) => void;

  onEdit: (task: Task) => void;

  onDelete: (id: string) => void;
}

export default function TaskBoard({
  tasks,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-6 xl:grid-cols-4">

      <TaskColumn
        title="Todo"
        tasks={tasks.filter(
          (task) =>
            task.status === "Todo"
        )}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="In Progress"
        tasks={tasks.filter(
          (task) =>
            task.status ===
            "In Progress"
        )}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Review"
        tasks={tasks.filter(
          (task) =>
            task.status ===
            "Review"
        )}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Completed"
        tasks={tasks.filter(
          (task) =>
            task.status ===
            "Completed"
        )}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
}
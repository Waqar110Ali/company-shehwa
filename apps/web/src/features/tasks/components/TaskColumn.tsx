import TaskCard from "./TaskCard";

import type { Task } from "../types/task";

interface Props {
  title: string;

  tasks: Task[];

  onView: (task: Task) => void;

  onEdit: (task: Task) => void;

  onDelete: (id: string) => void;
}

export default function TaskColumn({
  title,
  tasks,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-white">

          {title}

        </h2>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">

          {tasks.length}

        </span>

      </div>

      <div className="space-y-4">

        {tasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))}

      </div>

    </div>
  );
}
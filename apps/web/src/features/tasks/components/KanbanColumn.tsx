import { motion } from "framer-motion";

import TaskCard from "./TaskCard";

import type { Task } from "../types/task";

interface Props {
  title: string;
  tasks: Task[];

  onEdit: (task: Task) => void;

  onDelete: (id: string) => void;
}

export default function KanbanColumn({
  title,
  tasks,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.div
      layout
      className="rounded-3xl border border-cyan-400/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
          {tasks.length}
        </span>

      </div>

      <div className="space-y-5">

        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-500">
            No Tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

      </div>

    </motion.div>
  );
}
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

import GlassCard from "@/components/premium/GlassCard";

import TaskPriority from "./TaskPriority";
import TaskActions from "./TaskActions";

import type { Task } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.div
      layout
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <GlassCard className="group cursor-pointer rounded-2xl border border-cyan-400/10 p-5 transition-all duration-300 hover:border-cyan-400/30">

        <div className="flex items-start justify-between gap-4">

          <div className="flex-1">

            <h3 className="text-lg font-bold text-white">
              {task.title}
            </h3>

            <p className="mt-2 line-clamp-3 text-sm text-slate-400">
              {task.description}
            </p>

          </div>

          <TaskActions
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />

        </div>

        <div className="mt-5 flex items-center justify-between">

          <TaskPriority
            priority={task.priority}
          />

          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
            {task.status}
          </span>

        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">

          <div>

            <p className="text-xs text-slate-500">
              Assigned To
            </p>

            <p className="font-medium text-white">
              {task.assignee}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs text-slate-500">
              Due Date
            </p>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-300">

              <Calendar size={15} />

              {task.dueDate}

            </div>

          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
}
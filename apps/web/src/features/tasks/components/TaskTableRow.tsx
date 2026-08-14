import TaskActions from "./TaskActions";
import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";

import type { Task } from "../types/task";

interface Props {
  task: Task;

  onView: (
    task: Task
  ) => void;

  onEdit: (
    task: Task
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function TaskTableRow({
  task,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5">

      <td className="px-5 py-4 text-white">

        {task.title}

      </td>

      <td className="px-5 py-4">

        <TaskPriority
          priority={task.priority}
        />

      </td>

      <td className="px-5 py-4">

        <TaskStatus
          status={task.status}
        />

      </td>

      <td className="px-5 py-4 text-slate-300">

        {task.assignee}

      </td>

      <td className="px-5 py-4 text-slate-300">

        {task.dueDate}

      </td>

      <td className="px-5 py-4">

        <TaskActions
          onView={() =>
            onView(task)
          }
          onEdit={() =>
            onEdit(task)
          }
          onDelete={() =>
            onDelete(task.id)
          }
        />

      </td>

    </tr>
  );
}
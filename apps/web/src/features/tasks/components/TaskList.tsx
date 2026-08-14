import TaskTableRow from "./TaskTableRow";

import type { Task } from "../types/task";

interface Props {
  tasks: Task[];

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

export default function TaskList({
  tasks,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

      <table className="w-full">

        <thead className="bg-white/5">

          <tr>

            <th className="px-5 py-4 text-left text-slate-400">
              Task
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Priority
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Status
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Assignee
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Due Date
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <TaskTableRow
              key={task.id}
              task={task}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}
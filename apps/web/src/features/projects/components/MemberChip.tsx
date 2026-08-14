import { X } from "lucide-react";

import type { Employee } from "@/features/employees/types/employee";

interface Props {
  employee: Employee;
  onRemove: (id: string) => void;
}

export default function MemberChip({
  employee,
  onRemove,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-cyan-500/20
      bg-cyan-500/10
      px-3
      py-2
      "
    >
      <img
        src={employee.avatar}
        alt={employee.name}
        className="h-8 w-8 rounded-full object-cover"
      />

      <div>

        <p className="text-sm font-medium text-white">
          {employee.name}
        </p>

        <p className="text-xs text-slate-400">
          {employee.role}
        </p>

      </div>

      <button
        type="button"
        onClick={() =>
          onRemove(employee.id)
        }
      >
        <X
          size={15}
          className="text-slate-400 hover:text-red-400"
        />
      </button>
    </div>
  );
}
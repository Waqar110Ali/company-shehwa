import { useMemo } from "react";

import { Check } from "lucide-react";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { mapEmployee } from "@/features/employees/mapper/employee.mapper";

interface Props {
  value: string;

  onChange: (
    value: string,
  ) => void;
}

export default function EmployeeSelector({
  value,
  onChange,
}: Props) {
  const {
    data,
    isLoading,
  } = useEmployees();

  const employees =
    useMemo(() => {
      const list =
        data?.items ??
        data?.employees ??
        [];

      return list.map(
        mapEmployee,
      );
    }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/10 p-4 text-slate-400">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="space-y-3">

      <label className="text-sm font-semibold text-slate-300">
        Assigned Employee
      </label>

      <div className="max-h-72 overflow-y-auto rounded-2xl border border-white/10">

        {employees.map(
          (employee) => {
            const active =
              employee.id ===
              value;

            return (
              <button
                key={
                  employee.id
                }
                type="button"
                onClick={() =>
                  onChange(
                    employee.id,
                  )
                }
                className={`flex w-full items-center gap-4 border-b border-white/10 p-4 transition hover:bg-white/5 ${
                  active
                    ? "bg-cyan-500/10"
                    : ""
                }`}
              >
                <img
                  src={
                    employee.avatar
                  }
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div className="flex-1 text-left">

                  <h4 className="font-semibold text-white">
                    {
                      employee.name
                    }
                  </h4>

                  <p className="text-sm text-slate-400">
                    {
                      employee.role
                    }
                  </p>

                </div>

                {active && (
                  <Check
                    size={20}
                    className="text-cyan-400"
                  />
                )}

              </button>
            );
          },
        )}

      </div>

    </div>
  );
}
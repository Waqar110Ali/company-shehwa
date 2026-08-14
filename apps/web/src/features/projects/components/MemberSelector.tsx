import {
  useMemo,
  useState,
} from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { mapEmployee } from "@/features/employees/mapper/employee.mapper";

import MemberChip from "./MemberChip";

interface Props {
  value: string[];

  onChange: (
    members: string[],
  ) => void;
}

export default function MemberSelector({
  value,
  onChange,
}: Props) {
  const [search, setSearch] =
    useState("");

  const {
    data,
    isLoading,
  } = useEmployees();

  // ===================================================
  // Normalize employees from every API response shape
  // ===================================================

  const employees =
    useMemo(() => {
      const list =
        data?.items ??
        data?.employees ??
        data?.data?.items ??
        data?.data?.employees ??
        [];

      return list.map(
        mapEmployee,
      );
    }, [data]);

  // ===================================================

  const filteredEmployees =
    useMemo(() => {
      if (!search.trim()) {
        return employees;
      }

      const keyword =
        search.toLowerCase();

      return employees.filter(
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(keyword) ||
          employee.designation
            .toLowerCase()
            .includes(keyword) ||
          employee.department
            .toLowerCase()
            .includes(keyword),
      );
    }, [
      employees,
      search,
    ]);

  function toggleMember(
    id: string,
  ) {
    if (!id) {
      return;
    }

    if (value.includes(id)) {
      onChange(
        value.filter(
          (memberId) =>
            memberId !== id,
        ),
      );

      return;
    }

    onChange([
      ...value,
      id,
    ]);
  }

  return (
    <div className="space-y-5">

      <label className="text-sm font-semibold text-slate-300">
        Team Members
      </label>

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-500"
        />

        <Input
          className="pl-10"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />

      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {employees
            .filter((employee) =>
              value.includes(
                employee.id,
              ),
            )
            .map((employee) => (
              <MemberChip
                key={
                  employee.id
                }
                employee={
                  employee
                }
                onRemove={
                  toggleMember
                }
              />
            ))}
        </div>
      )}

      <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-700">

        {isLoading && (
          <div className="p-5 text-slate-400">
            Loading employees...
          </div>
        )}

        {!isLoading &&
          filteredEmployees.length ===
            0 && (
            <div className="p-5 text-center text-slate-500">
              No employees found.
            </div>
          )}

        {!isLoading &&
          filteredEmployees.map(
            (
              employee,
            ) => {
              const selected =
                value.includes(
                  employee.id,
                );

              return (
                <button
                  key={
                    employee.id
                  }
                  type="button"
                  onClick={() =>
                    toggleMember(
                      employee.id,
                    )
                  }
                  className={`flex w-full items-center gap-4 border-b border-slate-800 p-4 text-left transition hover:bg-slate-800 ${
                    selected
                      ? "bg-cyan-500/10"
                      : ""
                  }`}
                >
                  <img
                    src={
                      employee.avatar
                    }
                    alt={
                      employee.name
                    }
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div className="flex-1">

                    <h4 className="font-semibold text-white">
                      {
                        employee.name
                      }
                    </h4>

                    <p className="text-sm text-slate-400">
                      {
                        employee.designation
                      }
                    </p>

                    <p className="text-xs text-slate-500">
                      {
                        employee.department
                      }
                    </p>

                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border ${
                      selected
                        ? "border-cyan-400 bg-cyan-400"
                        : "border-slate-500"
                    }`}
                  />

                </button>
              );
            },
          )}

      </div>

    </div>
  );
}
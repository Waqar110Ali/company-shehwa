// ShareFileModal.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import type {
  FileItem,
} from "../types/file";

import {
  useShareFile,
} from "../hooks/useShareFile";

import { employeesApi } from "@/features/employees/api/employees.api";

interface ShareFileModalProps {
  open: boolean;

  file: FileItem | null;

  onClose: () => void;
}

export default function ShareFileModal({
  open,
  file,
  onClose,
}: ShareFileModalProps) {
  const [
    selectedEmployeeIds,
    setSelectedEmployeeIds,
  ] = useState<string[]>([]);

  const shareFile =
    useShareFile();

  /**
   * Fetches directly via employeesApi rather than through the
   * useEmployees hook — that hook takes 3 positional string args
   * (search, department, status), not a { page, limit } object,
   * so passing one in caused every request to throw and silently
   * resolve to an empty list for every role, including admin.
   */
  const {
    data,
    isLoading:
      employeesLoading,
  } = useQuery({
    queryKey: [
      "employees",
      "share-picker",
    ],

    queryFn: () =>
      employeesApi.getAll({
        page: 1,

        limit: 1000,
      }),

    enabled: open,
  });

  const employees =
    data?.data?.items ??
    data?.items ??
    data?.data ??
    data ??
    [];

  useEffect(() => {
    if (!open || !file) {
      return;
    }

    setSelectedEmployeeIds(
      [],
    );
  }, [
    open,
    file,
  ]);

  function toggleEmployee(
    employeeId: string,
  ) {
    setSelectedEmployeeIds(
      (previous) =>
        previous.includes(
          employeeId,
        )
          ? previous.filter(
              (id) =>
                id !== employeeId,
            )
          : [
              ...previous,
              employeeId,
            ],
    );
  }

  async function handleShare() {
    if (!file) {
      return;
    }

    if (
      selectedEmployeeIds.length ===
      0
    ) {
      toast.error(
        "Select at least one employee.",
      );

      return;
    }

    try {
      await shareFile.mutateAsync({
        id: file.id,

        dto: {
          employeeIds:
            selectedEmployeeIds,
        },
      });

      toast.success(
        "File shared successfully.",
      );

      onClose();
    } catch {
      toast.error(
        "Unable to share file.",
      );
    }
  }

  if (!open || !file) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">

        {/* Header */}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Share File
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Select employees who can access:
          </p>

          <p className="mt-1 truncate text-sm font-medium text-cyan-400">
            {file.name}
          </p>
        </div>

        {/* Employees */}

        <div className="max-h-72 space-y-2 overflow-y-auto">

          {employeesLoading ? (
            <p className="py-6 text-center text-sm text-slate-400">
              Loading employees...
            </p>
          ) : employees.length ===
            0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              No employees found.
            </p>
          ) : (
            employees.map(
              (employee: any) => {
                const employeeId =
                  employee.id ??
                  employee._id;

                const selected =
                  selectedEmployeeIds.includes(
                    employeeId,
                  );

                return (
                  <button
                    key={
                      employeeId
                    }
                    type="button"
                    onClick={() =>
                      toggleEmployee(
                        employeeId,
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-white">
                        {employee.fullName ??
                          employee.name ??
                          "Unnamed Employee"}
                      </p>

                      {employee.email && (
                        <p className="text-xs text-slate-400">
                          {
                            employee.email
                          }
                        </p>
                      )}
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        selected
                          ? "border-cyan-400 bg-cyan-400"
                          : "border-slate-500"
                      }`}
                    >
                      {selected && (
                        <span className="text-xs font-bold text-slate-950">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              },
            )
          )}

        </div>

        {/* Footer */}

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={
              shareFile.isPending
            }
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={
              handleShare
            }
            disabled={
              shareFile.isPending ||
              selectedEmployeeIds.length ===
                0
            }
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {shareFile.isPending
              ? "Sharing..."
              : "Share File"}
          </button>

        </div>

      </div>
    </div>
  );
}
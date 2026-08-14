import { useEffect, useState } from "react";

import type { Attendance } from "../types/attendance";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { mapEmployees } from "@/features/employees/mapper/employee.mapper";

interface Props {
  initialData?: Attendance;

  onSubmit: (attendance: any) => void;
}

export default function AttendanceForm({
  initialData,
  onSubmit,
}: Props) {
  const [employee, setEmployee] =
    useState("");

  const [date, setDate] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [status, setStatus] =
    useState<
      Attendance["status"]
    >("Present");

  const {
    data: employeesResponse,
  } = useEmployees();

  const employees =
    employeesResponse
      ? mapEmployees(
          employeesResponse,
        ).items
      : [];

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setEmployee(
      initialData.employeeId,
    );

    setDate(
      initialData.date,
    );

    setCheckIn(
      initialData.checkIn,
    );

    setCheckOut(
      initialData.checkOut,
    );

    setStatus(
      initialData.status,
    );
  }, [initialData]);

  function submit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    onSubmit({
      employee,

      date,

      checkIn,

      checkOut,

      status,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <select
        value={employee}
        onChange={(e) =>
          setEmployee(
            e.target.value,
          )
        }
        className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
        required
      >
        <option value="">
          Select Employee
        </option>

        {employees.map(
          (employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name} (
              {
                employee.department
              }
              )
            </option>
          ),
        )}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(
            e.target.value,
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        required
      />

      <div className="grid gap-5 md:grid-cols-2">
        <input
          type="time"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(
              e.target.value,
            )
          }
          className="rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        />

        <input
          type="time"
          value={checkOut}
          onChange={(e) =>
            setCheckOut(
              e.target.value,
            )
          }
          className="rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        />
      </div>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target
              .value as Attendance["status"],
          )
        }
        className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white"
      >
        <option value="Present">
          Present
        </option>

        <option value="Late">
          Late
        </option>

        <option value="Absent">
          Absent
        </option>

        <option value="Leave">
          Leave
        </option>
      </select>

      <button className="w-full rounded-xl bg-cyan-500 py-4 font-semibold text-white transition hover:bg-cyan-600">
        {initialData
          ? "Update Attendance"
          : "Save Attendance"}
      </button>
    </form>
  );
}
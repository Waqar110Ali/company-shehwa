import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { mapEmployee } from "@/features/employees/mapper/employee.mapper";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  initialData?: CalendarEvent;
  onSubmit: (event: {
    title: string;
    description: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    attendees: string[];
    color: string;
  }) => void;
}

const EVENT_TYPES = [
  "Meeting",
  "Project",
  "Holiday",
  "Birthday",
  "Leave",
  "Interview",
  "Deadline",
];

const MONGO_ID =
  /^[a-f\d]{24}$/i;

export default function EventForm({
  initialData,
  onSubmit,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [type, setType] =
    useState("Meeting");

  const [date, setDate] =
    useState("");

  const [
    startTime,
    setStartTime,
  ] = useState("");

  const [
    endTime,
    setEndTime,
  ] = useState("");

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    attendees,
    setAttendees,
  ] = useState<string[]>([]);

  const [color, setColor] =
    useState("#06b6d4");

  const {
    data: employeesResponse,
    isLoading,
  } = useEmployees();

  const employees =
    useMemo(() => {
      const raw =
        Array.isArray(
          employeesResponse,
        )
          ? employeesResponse
          : employeesResponse
              ?.items ?? [];

      return raw.map(
        mapEmployee,
      );
    }, [employeesResponse]);

  useEffect(() => {
    if (!initialData) {
      setTitle("");
      setDescription("");
      setType("Meeting");
      setDate("");
      setStartTime("");
      setEndTime("");
      setLocation("");
      setColor("#06b6d4");
      setAttendees([]);
      return;
    }

    setTitle(
      initialData.title,
    );

    setDescription(
      initialData.description,
    );

    setType(
      initialData.type,
    );

    setDate(
      initialData.date,
    );

    setStartTime(
      initialData.startTime,
    );

    setEndTime(
      initialData.endTime,
    );

    setLocation(
      initialData.location,
    );

    setColor(
      initialData.color,
    );

    const ids =
      initialData.attendees
        ?.map((employee: any) =>
          typeof employee ===
          "string"
            ? employee
            : employee.id ??
              employee._id,
        )
        .filter(
          (
            id,
          ): id is string =>
            !!id &&
            MONGO_ID.test(id),
        ) ?? [];

    setAttendees(ids);
  }, [initialData]);

  function toggleAttendee(
    id: string,
  ) {
    setAttendees((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) =>
              item !== id,
          )
        : [...prev, id],
    );
  }

  function submit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    const ids =
      attendees.filter((id) =>
        MONGO_ID.test(id),
      );

    console.log(
      "Employees:",
      employees,
    );

    console.log(
      "Submitting attendee ids:",
      ids,
    );

    onSubmit({
      title,
      description,
      type,
      date,
      startTime,
      endTime,
      location,
      attendees: ids,
      color,
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value,
          )
        }
        placeholder="Event Title"
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value,
          )
        }
        placeholder="Description"
        className="h-32 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <select
        value={type}
        onChange={(e) =>
          setType(
            e.target.value,
          )
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
      >
        {EVENT_TYPES.map(
          (item) => (
            <option
              key={item}
            >
              {item}
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
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <div className="grid grid-cols-2 gap-5">
        <input
          type="time"
          value={startTime}
          onChange={(e) =>
            setStartTime(
              e.target.value,
            )
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e) =>
            setEndTime(
              e.target.value,
            )
          }
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <input
        value={location}
        onChange={(e) =>
          setLocation(
            e.target.value,
          )
        }
        placeholder="Location"
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
      />

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-300">
          Attendees
        </label>

        <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900">
          {isLoading && (
            <div className="p-4 text-slate-400">
              Loading employees...
            </div>
          )}

          {!isLoading &&
            employees.map(
              (
                employee,
              ) => (
                <label
                  key={
                    employee.id
                  }
                  className="flex cursor-pointer items-center gap-3 border-b border-slate-800 px-4 py-3 hover:bg-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={attendees.includes(
                      employee.id,
                    )}
                    onChange={() =>
                      toggleAttendee(
                        employee.id,
                      )
                    }
                  />

                  <div className="flex flex-1 flex-col">
                    <span className="font-medium text-white">
                      {
                        employee.name
                      }
                    </span>

                    <span className="text-xs text-slate-400">
                      {
                        employee.department
                      }
                    </span>
                  </div>
                </label>
              ),
            )}
        </div>
      </div>

      <input
        type="color"
        value={color}
        onChange={(e) =>
          setColor(
            e.target.value,
          )
        }
        className="h-12 w-full rounded-xl border border-slate-700 bg-transparent"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600"
      >
        {initialData
          ? "Update Event"
          : "Create Event"}
      </button>
    </form>
  );
}
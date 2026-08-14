import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";
import { appToast } from "@/lib/toast";

import AttendanceStats from "../components/AttendanceStats";
import AttendanceSearch from "../components/AttendanceSearch";
import AttendanceFilters from "../components/AttendanceFilters";
import AttendanceTable from "../components/AttendanceTable";

import AttendanceForm from "../components/AttendanceForm";
import AttendanceProfileDrawer from "../components/AttendanceProfileDrawer";

import type { Attendance } from "../types/attendance";

import { useAttendance } from "../hooks/useAttendance";
import { useAttendanceStatistics } from "../hooks/useAttendanceStatistics";
import { useCreateAttendance } from "../hooks/useCreateAttendance";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import { useDeleteAttendance } from "../hooks/useDeleteAttendance";
import AttendanceModal from "../components/AttendanceModal";
import {
  mapAttendanceList,
  mapAttendanceStatistics,
} from "../mapper/attendance.mapper";

export default function AttendancePage() {
  const [search, setSearch] =
    useState("");

  const [
    department,
    setDepartment,
  ] = useState("");

  const [status, setStatus] =
    useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editingAttendance,
    setEditingAttendance,
  ] =
    useState<Attendance | null>(
      null,
    );

  const [
    selectedAttendance,
    setSelectedAttendance,
  ] =
    useState<Attendance | null>(
      null,
    );

  const {
    data: attendanceResponse,
    isLoading,
  } = useAttendance({
    search,
    department,
    status,
  });

  const {
    data: statisticsResponse,
  } =
    useAttendanceStatistics();

  const createAttendance =
    useCreateAttendance();

  const updateAttendance =
    useUpdateAttendance();

  const deleteAttendance =
    useDeleteAttendance();

  const attendance =
    useMemo(() => {
      if (!attendanceResponse) {
        return [];
      }

      return mapAttendanceList(
        attendanceResponse,
      ).items;
    }, [
      attendanceResponse,
    ]);

  const statistics =
    useMemo(() => {
      if (!statisticsResponse) {
        return {
          total: 0,
          present: 0,
          late: 0,
          absent: 0,
          leave: 0,
        };
      }

      return mapAttendanceStatistics(
        statisticsResponse,
      );
    }, [
      statisticsResponse,
    ]);

  async function saveAttendance(
    record: any,
  ) {
    try {
      if (
        editingAttendance
      ) {
        await updateAttendance.mutateAsync(
          {
            id:
              editingAttendance.id,
            data: record,
          },
        );

        appToast.success(
          "Attendance updated successfully.",
        );
      } else {
        await createAttendance.mutateAsync(
          record,
        );

        appToast.success(
          "Attendance added successfully.",
        );
      }

      setModalOpen(false);

      setEditingAttendance(
        null,
      );
    } catch (error) {
      console.error(error);

      appToast.error(
        "Unable to save attendance.",
      );
    }
  }

  async function handleDelete(
    id: string,
  ) {
    if (
      !window.confirm(
        "Delete this attendance record?",
      )
    ) {
      return;
    }

    try {
      await deleteAttendance.mutateAsync(
        id,
      );

      appToast.success(
        "Attendance deleted successfully.",
      );

      if (
        selectedAttendance?.id ===
        id
      ) {
        setSelectedAttendance(
          null,
        );
      }
    } catch {
      appToast.error(
        "Unable to delete attendance.",
      );
    }
  }

  function editAttendance(
    attendance: Attendance,
  ) {
    setEditingAttendance(
      attendance,
    );

    setModalOpen(true);
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading Attendance...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <SectionHeading
          title="Attendance"
          subtitle="Track employee attendance."
        />

        <button
          onClick={() => {
            setEditingAttendance(
              null,
            );

            setModalOpen(
              true,
            );
          }}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
        >
          <Plus size={18} />

          Add Attendance

        </button>

      </div>

     <AttendanceStats
  total={statistics.total}
  present={statistics.present}
  late={statistics.late}
  absent={statistics.absent}
  leave={statistics.leave}
/>

      <AttendanceSearch
        value={search}
        onChange={
          setSearch
        }
      />

      <AttendanceFilters
        department={
          department
        }
        status={status}
        onDepartmentChange={
          setDepartment
        }
        onStatusChange={
          setStatus
        }
      />

      <AttendanceTable
        attendance={
          attendance
        }
        onView={
          setSelectedAttendance
        }
        onEdit={
          editAttendance
        }
        onDelete={
          handleDelete
        }
      />

     <AttendanceModal
        open={modalOpen}
        title={
          editingAttendance
            ? "Edit Attendance"
            : "Add Attendance"
        }
        onClose={() => {
          setModalOpen(
            false,
          );

          setEditingAttendance(
            null,
          );
        }}
      >
        <AttendanceForm
          initialData={
            editingAttendance ??
            undefined
          }
          onSubmit={
            saveAttendance
          }
        />
      </AttendanceModal>

      <AttendanceProfileDrawer
        attendance={
          selectedAttendance
        }
        open={
          selectedAttendance !==
          null
        }
        onClose={() =>
          setSelectedAttendance(
            null,
          )
        }
      />

    </div>
  );
}
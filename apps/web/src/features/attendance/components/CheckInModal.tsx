import TaskModal from "@/features/tasks/components/TaskModal";

import AttendanceForm from "./AttendanceForm";

import type { Attendance } from "../types/attendance";

interface Props {
  open: boolean;

  attendance?: Attendance | null;

  onClose: () => void;

  onSubmit: (attendance: Attendance) => void;
}

export default function CheckInModal({
  open,
  attendance,
  onClose,
  onSubmit,
}: Props) {
  return (
    <TaskModal
      open={open}
      title={
        attendance
          ? "Edit Attendance"
          : "Add Attendance"
      }
      onClose={onClose}
    >
      <AttendanceForm
        initialData={attendance ?? undefined}
        onSubmit={(data) => {
          onSubmit(data);
          onClose();
        }}
      />
    </TaskModal>
  );
}
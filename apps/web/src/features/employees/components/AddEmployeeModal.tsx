import TaskModal from "@/features/tasks/components/TaskModal";

import EmployeeForm from "./EmployeeForm";

import type { Employee } from "../types/employee";

interface Props {
  open: boolean;
  employee?: Employee | null;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

export default function AddEmployeeModal({
  open,
  employee,
  onClose,
  onSubmit,
}: Props) {
  return (
    <TaskModal
      open={open}
      title={
        employee
          ? "Edit Employee"
          : "Add Employee"
      }
      onClose={onClose}
    >
      <EmployeeForm
        initialData={employee ?? undefined}
        onSubmit={onSubmit}
      />
    </TaskModal>
  );
}
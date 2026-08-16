// import { useMemo, useState } from "react";
// import { Plus } from "lucide-react";

// import SectionHeading from "@/features/dashboard/components/SectionHeading";
// import { appToast } from "@/lib/toast";

// import EmployeeStats from "../components/EmployeeStats";
// import EmployeeSearch from "../components/EmployeeSearch";
// import EmployeeFilters from "../components/EmployeeFilters";
// import EmployeeTable from "../components/EmployeeTable";
// import AddEmployeeModal from "../components/AddEmployeeModal";
// import EmployeeProfileDrawer from "../components/EmployeeProfileDrawer";

// import type { Employee } from "../types/employee";

// import { useEmployees } from "../hooks/useEmployees";
// import { useCreateEmployee } from "../hooks/useCreateEmployee";
// import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
// import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

// import { mapEmployee } from "../mapper/employee.mapper";

// export default function EmployeesPage() {
//   const [search, setSearch] =
//     useState("");

//   const [department, setDepartment] =
//     useState("");

//   const [status, setStatus] =
//     useState("");

//   const [modalOpen, setModalOpen] =
//     useState(false);

//   const [
//     selectedEmployee,
//     setSelectedEmployee,
//   ] =
//     useState<Employee | null>(
//       null,
//     );

//   const [
//     editingEmployee,
//     setEditingEmployee,
//   ] =
//     useState<Employee | null>(
//       null,
//     );

//   const {
//     data,
//     isLoading,
//   } = useEmployees(
//     search,
//     department,
//     status,
//   );
// console.log("================================");
// console.log("Employees API Response");
// console.log(data);
// console.log("================================");

//   const createEmployee =
//     useCreateEmployee();

//   const updateEmployee =
//     useUpdateEmployee();

//   const deleteEmployee =
//     useDeleteEmployee();

//   const employees = useMemo(() => {
//   console.log("================================");
//   console.log("Employees Response");
//   console.log(data);

//   const list =
//     data?.items ??
//     data?.employees ??
//     data?.data?.items ??
//     data?.data?.employees ??
//     [];

//   console.log("Employees List");
//   console.log(list);

//   const mapped = list.map(mapEmployee);

//   console.log("Mapped Employees");
//   console.log(mapped);
//   console.log("================================");

//   return mapped;
// }, [data]);

//   async function saveEmployee(
//     employee: any,
//   ) {
//    // avatarFile travels alongside the regular fields (set by
//    // EmployeeForm only when the admin picked a new photo) — pull it
//    // out here so it goes to the API as an actual file, not a form
//    // field, and never ends up inside the JSON-ish payload below.
//    const {
//      avatarFile,
//      ...employeeFields
//    } = employee;

//    const payload: any = {
//   ...employeeFields,

//   status:
//     employee.status ??
//     "ACTIVE",

//   employmentType:
//     "FULL_TIME",

//   performance:
//     employee.performance ?? 0,

//   attendance:
//     employee.attendance ?? 0,

//   joiningDate:
//     employee.joiningDate ??
//     new Date()
//       .toISOString()
//       .split("T")[0],
// };

// // VERY IMPORTANT
// if (editingEmployee) {
//   delete payload.password;
//   delete payload.confirmPassword;
// }

//     console.log(
//       "Employee Payload:",
//       payload,
//     );

//     try {
//       if (editingEmployee) {
//         // Remove id before sending to backend
//         const {
//           id,
//           ...updateData
//         } = payload;

//         await updateEmployee.mutateAsync({
//           id: editingEmployee.id,

//           data: updateData,

//           avatarFile,
//         });

//         appToast.success(
//           "Employee updated successfully.",
//         );
//       } else {
//         await createEmployee.mutateAsync({
//           data: payload,

//           avatarFile,
//         });

//         appToast.success(
//           "Employee added successfully.",
//         );
//       }

//       setModalOpen(false);

//       setEditingEmployee(
//         null,
//       );
//     } catch (error: any) {
//       console.error(
//         error.response?.data,
//       );

//       appToast.error(
//         JSON.stringify(
//           error.response?.data,
//         ),
//       );
//     }
//   }

//   async function handleDelete(
//     id: string,
//   ) {
//     if (
//       !window.confirm(
//         "Delete this employee?",
//       )
//     ) {
//       return;
//     }

//     try {
//       await deleteEmployee.mutateAsync(
//         id,
//       );

//       appToast.success(
//         "Employee deleted successfully.",
//       );
//     } catch (error) {
//       console.error(error);

//       appToast.error(
//         "Unable to delete employee.",
//       );
//     }
//   }

//   function openEdit(
//     employee: Employee,
//   ) {
//     setEditingEmployee(
//       employee,
//     );

//     setModalOpen(true);

//     appToast.info(
//       "Editing employee...",
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <SectionHeading
//           title="Employees"
//           subtitle="Manage all company employees."
//         />

//         <button
//           onClick={() => {
//             setEditingEmployee(
//               null,
//             );

//             setModalOpen(true);

//             appToast.info(
//               "Create a new employee.",
//             );
//           }}
//           className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600"
//         >
//           <Plus size={18} />
//           Add Employee
//         </button>
//       </div>

//       <EmployeeStats
//         employees={employees}
//       />

//       <EmployeeSearch
//         value={search}
//         onChange={setSearch}
//       />

//       <EmployeeFilters
//         department={department}
//         status={status}
//         onDepartmentChange={
//           setDepartment
//         }
//         onStatusChange={
//           setStatus
//         }
//       />

//       <EmployeeTable
//         employees={employees}
//         onView={
//           setSelectedEmployee
//         }
//         onEdit={openEdit}
//         onDelete={
//           handleDelete
//         }
//       />

//       <AddEmployeeModal
//         open={modalOpen}
//         employee={
//           editingEmployee
//         }
//         onClose={() => {
//           setModalOpen(false);

//           setEditingEmployee(
//             null,
//           );
//         }}
//         onSubmit={
//           saveEmployee
//         }
//       />

//       <EmployeeProfileDrawer
//         employee={
//           selectedEmployee
//         }
//         open={
//           selectedEmployee !==
//           null
//         }
//         onClose={() =>
//           setSelectedEmployee(
//             null,
//           )
//         }
//       />

//       {isLoading && (
//         <div className="text-center text-slate-400">
//           Loading employees...
//         </div>
//       )}
//     </div>
//   );
// }


// apps/web/src/features/employees/pages/EmployeesPage.tsx
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";
import { appToast } from "@/lib/toast";

import EmployeeStats from "../components/EmployeeStats";
import EmployeeSearch from "../components/EmployeeSearch";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeProfileDrawer from "../components/EmployeeProfileDrawer";

import type { Employee } from "../types/employee";

import { useEmployees } from "../hooks/useEmployees";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

import { mapEmployee } from "../mapper/employee.mapper";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  const { data, isLoading } = useEmployees(search, department, status);

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  const employees = useMemo(() => {
    const list =
      data?.items ??
      data?.employees ??
      data?.data?.items ??
      data?.data?.employees ??
      [];

    return list.map(mapEmployee);
  }, [data]);

  async function saveEmployee(employee: any) {
    // avatarFile travels alongside the regular fields (set by
    // EmployeeForm only when the admin picked a new photo) — pull it
    // out here so it goes to the API as an actual file, not a form
    // field, and never ends up inside the JSON-ish payload below.
    const { avatarFile, ...employeeFields } = employee;

    const payload: any = {
      ...employeeFields,
      status: employee.status ?? "ACTIVE",
      employmentType: "FULL_TIME",
      performance: employee.performance ?? 0,
      attendance: employee.attendance ?? 0,
      joiningDate:
        employee.joiningDate ?? new Date().toISOString().split("T")[0],
    };

    // VERY IMPORTANT
    if (editingEmployee) {
      delete payload.password;
      delete payload.confirmPassword;
    }

    try {
      if (editingEmployee) {
        // Remove id before sending to backend
        const { id, ...updateData } = payload;

        await updateEmployee.mutateAsync({
          id: editingEmployee.id,
          data: updateData,
          avatarFile,
        });

        appToast.success("Employee updated successfully.");
      } else {
        await createEmployee.mutateAsync({
          data: payload,
          avatarFile,
        });

        appToast.success("Employee added successfully.");
      }

      setModalOpen(false);
      setEditingEmployee(null);
    } catch (error: any) {
      appToast.error(JSON.stringify(error.response?.data));
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this employee?")) {
      return;
    }

    try {
      await deleteEmployee.mutateAsync(id);
      appToast.success("Employee deleted successfully.");
    } catch {
      appToast.error("Unable to delete employee.");
    }
  }

  function openEdit(employee: Employee) {
    setEditingEmployee(employee);
    setModalOpen(true);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          title="Employees"
          subtitle="Manage all company employees."
        />

        <button
          onClick={() => {
            setEditingEmployee(null);
            setModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600 sm:w-auto"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      <EmployeeStats employees={employees} />

      <EmployeeSearch value={search} onChange={setSearch} />

      <EmployeeFilters
        department={department}
        status={status}
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
      />

      <EmployeeTable
        employees={employees}
        onView={setSelectedEmployee}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AddEmployeeModal
        open={modalOpen}
        employee={editingEmployee}
        onClose={() => {
          setModalOpen(false);
          setEditingEmployee(null);
        }}
        onSubmit={saveEmployee}
      />

      <EmployeeProfileDrawer
        employee={selectedEmployee}
        open={selectedEmployee !== null}
        onClose={() => setSelectedEmployee(null)}
      />

      {isLoading && (
        <div className="text-center text-slate-400">
          Loading employees...
        </div>
      )}
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";

import { attendanceApi } from "../api/attendance.api";

interface AttendanceFilters {
  search?: string;
  department?: string;
  status?: string;
  employee?: string;
  date?: string;
}

export function useAttendance(
  filters?: AttendanceFilters,
) {
  return useQuery({
    queryKey: [
      "attendance",
      filters,
    ],

    queryFn: async () => {
      const params: AttendanceFilters = {};

      if (filters?.search?.trim()) {
        params.search =
          filters.search.trim();
      }

      if (filters?.department?.trim()) {
        params.department =
          filters.department.trim();
      }

      if (filters?.status?.trim()) {
        params.status =
          filters.status.trim();
      }

      if (filters?.employee?.trim()) {
        params.employee =
          filters.employee.trim();
      }

      if (filters?.date?.trim()) {
        params.date =
          filters.date.trim();
      }

      console.log(
        "Attendance Filters:",
        filters,
      );

      console.log(
        "Attendance Request Params:",
        params,
      );

      const response =
        await attendanceApi.getAll(
          params,
        );

      console.log(
        "Attendance Response:",
        response.data,
      );

      return response.data;
    },

    staleTime: 1000 * 60,
  });
}
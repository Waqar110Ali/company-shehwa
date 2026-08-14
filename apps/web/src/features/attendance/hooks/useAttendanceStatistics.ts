import { useQuery } from "@tanstack/react-query";

import { attendanceApi } from "../api/attendance.api";

export function useAttendanceStatistics() {
  return useQuery({
    queryKey: [
      "attendance-statistics",
    ],

    queryFn: async () => {
      const response =
        await attendanceApi.statistics();

      return response.data;
    },
  });
}
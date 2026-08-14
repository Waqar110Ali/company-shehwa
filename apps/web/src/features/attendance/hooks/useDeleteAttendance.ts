import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { attendanceApi } from "../api/attendance.api";

export function useDeleteAttendance() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      attendanceApi.delete,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          "attendance",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "attendance-statistics",
        ],
      });
    },
  });
}
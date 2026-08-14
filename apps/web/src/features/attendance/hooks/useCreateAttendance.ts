import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { attendanceApi } from "../api/attendance.api";

export function useCreateAttendance() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      attendanceApi.create,

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
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { attendanceApi } from "../api/attendance.api";

export function useUpdateAttendance() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;

      data: any;
    }) =>
      attendanceApi.update(
        id,
        data,
      ),

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
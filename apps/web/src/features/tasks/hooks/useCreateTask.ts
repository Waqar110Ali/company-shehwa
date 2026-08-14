import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

export function useCreateTask() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: any,
    ) =>
      tasksApi.create(
        data,
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "task-statistics",
        ],
      });
    },
  });
}
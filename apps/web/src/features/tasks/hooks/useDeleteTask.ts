import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

export function useDeleteTask() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      tasksApi.delete(
        id,
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
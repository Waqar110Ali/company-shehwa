import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

export function useUpdateTask() {
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
      tasksApi.update(
        id,
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
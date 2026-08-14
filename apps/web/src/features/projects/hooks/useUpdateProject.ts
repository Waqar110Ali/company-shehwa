import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

import { appToast } from "@/lib/toast";

export function useUpdateProject() {
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
      projectsApi.update(
        id,
        data,
      ),

    onSuccess: () => {
      appToast.success(
        "Project updated successfully.",
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "project-statistics",
        ],
      });
    },

    onError: (error: any) => {
      appToast.error(
        error?.response?.data?.message ??
          "Unable to update project.",
      );
    },
  });
}
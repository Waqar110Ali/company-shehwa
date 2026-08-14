import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

import { appToast } from "@/lib/toast";

export function useDeleteProject() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      projectsApi.remove(id),

    onSuccess: () => {
      appToast.success(
        "Project deleted successfully.",
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "project-statistics",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: (error: any) => {
      appToast.error(
        error?.response?.data?.message ??
          "Unable to delete project.",
      );
    },
  });
}
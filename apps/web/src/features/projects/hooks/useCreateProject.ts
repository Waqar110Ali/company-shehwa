import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

import { appToast } from "@/lib/toast";

export function useCreateProject() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: projectsApi.create,

    onSuccess: () => {
      appToast.success(
        "Project created successfully.",
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
          "Unable to create project.",
      );
    },
  });
}
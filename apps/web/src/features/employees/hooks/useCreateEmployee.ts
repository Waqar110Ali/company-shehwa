import { useMutation, useQueryClient } from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

interface CreateEmployeePayload {
  data: unknown;

  avatarFile?: File | null;
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      avatarFile,
    }: CreateEmployeePayload) =>
      employeesApi.create(
        data,
        avatarFile,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}
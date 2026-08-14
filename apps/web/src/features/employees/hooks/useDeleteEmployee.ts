import { useMutation, useQueryClient } from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeesApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}
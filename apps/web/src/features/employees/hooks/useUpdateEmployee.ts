import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

interface UpdateEmployeePayload {
  id: string;

  data: unknown;

  avatarFile?: File | null;
}

export function useUpdateEmployee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      avatarFile,
    }: UpdateEmployeePayload) =>
      employeesApi.update(
        id,
        data,
        avatarFile,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "employees",
        ],
      });
    },
  });
}
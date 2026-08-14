import { api } from "@/lib/api";

export interface EmployeeQuery {
 page?: number;
  limit?: number;

  search?: string;

  department?: string;

  designation?: string;

  status?: string;

  employmentType?: string;

  sortBy?: string;

  order?: "asc" | "desc";
  
}

/**
 * Builds multipart FormData from a plain fields object plus an
 * optional avatar File. Empty/undefined/null values are skipped so
 * partial updates don't clobber existing data with blank strings.
 */
function toFormData(
  data: Record<string, unknown>,
  avatarFile?: File | null,
) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return;
    }

    formData.append(key, String(value));
  });

  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  return formData;
}

export const employeesApi = {
  getAll(params?: EmployeeQuery) {
    return api.get("/employees", {
      params,
    });
  },

  getById(id: string) {
    return api.get(`/employees/${id}`);
  },

  create(
    data: unknown,
    avatarFile?: File | null,
  ) {
    return api.post(
      "/employees",
      toFormData(
        data as Record<string, unknown>,
        avatarFile,
      ),
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );
  },

  update(
    id: string,
    data: unknown,
    avatarFile?: File | null,
  ) {
    return api.patch(
      `/employees/${id}`,
      toFormData(
        data as Record<string, unknown>,
        avatarFile,
      ),
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );
  },

  delete(id: string) {
    return api.delete(
      `/employees/${id}`,
    );
  },
};
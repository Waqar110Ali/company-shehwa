import { api } from "@/lib/api";

export const reportsApi = {
  async getReports() {
    const response =
      await api.get("/reports");

    return response.data;
  },

  async exportCsv() {
    const response =
      await api.get(
        "/reports/export/csv",
        {
          responseType: "blob",
        },
      );

    return response.data;
  },

  async exportExcel() {
    const response =
      await api.get(
        "/reports/export/excel",
        {
          responseType: "blob",
        },
      );

    return response.data;
  },

  async exportPdf() {
    const response =
      await api.get(
        "/reports/export/pdf",
        {
          responseType: "blob",
        },
      );

    return response.data;
  },
};
import { api } from "@/lib/api";

export const dashboardApi = {
  async getDashboard() {
    console.log("➡️ GET /dashboard");

    const response =
      await api.get("/dashboard");

    console.log(
      "⬅️ Dashboard Response:",
      response.status,
    );

    return response;
  },
};
import type { Dashboard } from "../types/dashboard";

export function mapDashboard(
  response: any,
): Dashboard {
  const data =
    response.data ?? response;

  return {
    statistics: {
      employees:
        data.statistics?.employees ?? 0,

      projects:
        data.statistics?.projects ?? 0,

      tasks:
        data.statistics?.tasks ?? 0,

      revenue:
        data.statistics?.revenue ?? 0,
    },

    analytics:
      data.analytics ?? [],

    activities:
      data.activities ?? [],

    pendingApprovals:
      data.pendingApprovals ?? [],

    latestProjects:
      data.latestProjects ?? [],

    performance:
      data.performance ?? [],
  };
}
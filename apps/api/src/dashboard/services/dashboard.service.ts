import { Injectable, Inject } from "@nestjs/common";

import { DashboardRepository } from "../repositories/dashboard.repository";

import { DashboardResponse } from "../interfaces/dashboard.interface";

@Injectable()
export class DashboardService {
  constructor(
    @Inject(DashboardRepository) private readonly repository: DashboardRepository,
  ) {}

  async getDashboard(): Promise<DashboardResponse> {
    const [
  statistics,
  analytics,
  activities,
  latestProjects,
  performance,
] = await Promise.all([
  this.repository.getStatistics(),

  this.repository.getAnalytics(),

  this.repository.getRecentActivities(),

  this.repository.getLatestProjects(),

  this.repository.getPerformance(),
]);
   return {
  statistics,

  analytics,

  activities,

  latestProjects,

  performance,
};
  }
}
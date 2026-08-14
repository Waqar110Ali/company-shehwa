export interface DashboardStatistics {
  employees: number;
  projects: number;
  tasks: number;
  revenue: number;
}

export interface DashboardAnalytics {
  month: string;
  employees: number;
  revenue: number;
}

export interface DashboardActivity {
  id: string;
  title: string;
  time: string;
}

export interface DashboardProject {
  id: string;
  name: string;
  progress: number;
  due: string;
  members: number;
  status: string;
}

export interface DashboardPerformance {
  id: string;
  name: string;
  role: string;
  performance: number;
}

export interface DashboardResponse {
  statistics: DashboardStatistics;

  analytics: DashboardAnalytics[];

  activities: DashboardActivity[];

  latestProjects: DashboardProject[];

  performance: DashboardPerformance[];
}
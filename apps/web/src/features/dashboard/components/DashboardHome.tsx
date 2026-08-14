import {
  Briefcase,
  CheckCircle2,
  FolderKanban,
  Users,
  UserPlus,
  FileText,
  Bot,
} from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";

import StatisticCard from "@/features/dashboard/components/StatisticCard";
import SectionHeading from "@/features/dashboard/components/SectionHeading";
import QuickActionCard from "@/features/dashboard/components/QuickActionCard";
import RecentActivity from "@/features/dashboard/components/RecentActivity";
import DashboardChart from "@/features/dashboard/components/DashboardChart";
// import PendingApprovals from "@/features/dashboard/components/PendingApprovalCard";
import LatestProjects from "@/features/dashboard/components/LatestProjects";
import PerformanceCard from "@/features/dashboard/components/PerformanceCard";

import { useDashboard } from "../hooks/useDashboard";
import { mapDashboard } from "../mapper/dashboard.mapper";

export default function DashboardHome() {
  const {
    data,
    isLoading,
  } = useDashboard();

  const dashboard = data
    ? mapDashboard(data)
    : null;

  if (isLoading || !dashboard) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <FadeUp>
        <SectionHeading
          title="Welcome back, Waqar 👋"
          subtitle="Here's everything happening across your company today."
        />
      </FadeUp>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticCard
          title="Employees"
          value={dashboard.statistics.employees.toString()}
          change="+12 This Month"
          icon={Users}
        />

        <StatisticCard
          title="Projects"
          value={dashboard.statistics.projects.toString()}
          change="4 Active"
          icon={FolderKanban}
        />

        <StatisticCard
          title="Tasks"
          value={dashboard.statistics.tasks.toString()}
          change="+38 Today"
          icon={CheckCircle2}
        />

        <StatisticCard
          title="Revenue"
          value={`$${dashboard.statistics.revenue}`}
          change="+8.4%"
          icon={Briefcase}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardChart
            data={dashboard.analytics}
          />
        </div>

        {/* <PendingApprovals
          approvals={
            dashboard.pendingApprovals
          }
        /> */}
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentActivity
            activities={
              dashboard.activities
            }
          />
        </div>

        <LatestProjects
          projects={
            dashboard.latestProjects
          }
        />
      </div>

      <PerformanceCard
        employees={
          dashboard.performance
        }
      />

      <div>
        <SectionHeading
          title="Quick Actions"
          subtitle="Frequently used shortcuts"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <QuickActionCard
            icon={UserPlus}
            title="Add Employee"
            description="Create a new employee."
            to="/dashboard/employees"
          />

          <QuickActionCard
            icon={FolderKanban}
            title="Create Project"
            description="Start a new project."
            to="/dashboard/projects"
          />

          <QuickActionCard
            icon={FileText}
            title="Reports"
            description="Generate company reports."
            to="/dashboard/reports"
          />

          <QuickActionCard
            icon={Bot}
            title="AI Assistant"
            description="Open company AI."
            to="/dashboard/assistant"
          />
        </div>
      </div>
    </div>
  );
}
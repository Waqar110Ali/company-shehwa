import GlassCard from "@/components/premium/GlassCard";

import ActivityItem from "./ActivityItem";

import type { DashboardActivity } from "../types/dashboard";

interface Props {
  activities?: DashboardActivity[];
}

export default function RecentActivity({
  activities = [],
}: Props) {
  console.log("RecentActivity", activities);

  return (
    <GlassCard className="p-8">
      <h3 className="mb-8 text-2xl font-bold text-white">
        Recent Activity
      </h3>

      <div className="space-y-8">
        {activities.length === 0 ? (
          <p className="text-slate-400">
            No recent activity.
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              time={activity.time}
            />
          ))
        )}
      </div>
    </GlassCard>
  );
}
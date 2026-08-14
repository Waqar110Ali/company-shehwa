import {
  CalendarDays,
  Users,
  Cake,
  Flag,
} from "lucide-react";

import StatisticCard from "@/features/dashboard/components/StatisticCard";

interface Props {
  statistics: {
    total: number;

    today: number;

    meetings: number;

    birthdays: number;

    deadlines: number;
  };
}

export default function CalendarStats({
  statistics,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatisticCard
        title="Today's Events"
        value={statistics.today.toString()}
        change="Scheduled"
        icon={CalendarDays}
      />

      <StatisticCard
        title="Meetings"
        value={statistics.meetings.toString()}
        change="This Month"
        icon={Users}
      />

      <StatisticCard
        title="Birthdays"
        value={statistics.birthdays.toString()}
        change="Upcoming"
        icon={Cake}
      />

      <StatisticCard
        title="Deadlines"
        value={statistics.deadlines.toString()}
        change="Pending"
        icon={Flag}
      />

    </div>
  );
}
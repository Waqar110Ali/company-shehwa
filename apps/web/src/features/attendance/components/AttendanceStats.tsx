import {
  UserCheck,
  UserX,
  Clock3,
  Plane,
} from "lucide-react";

import StatisticCard from "@/features/dashboard/components/StatisticCard";

interface AttendanceStatsProps {
  total: number;

  present: number;

  late: number;

  absent: number;

  leave: number;
}

export default function AttendanceStats({
  total,
  present,
  late,
  absent,
  leave,
}: AttendanceStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatisticCard
        title="Present"
        value={present.toString()}
        change={`${total} Total`}
        icon={UserCheck}
      />

      <StatisticCard
        title="Late"
        value={late.toString()}
        change={`${total} Total`}
        icon={Clock3}
      />

      <StatisticCard
        title="Absent"
        value={absent.toString()}
        change={`${total} Total`}
        icon={UserX}
      />

      <StatisticCard
        title="Leave"
        value={leave.toString()}
        change={`${total} Total`}
        icon={Plane}
      />

    </div>
  );
}
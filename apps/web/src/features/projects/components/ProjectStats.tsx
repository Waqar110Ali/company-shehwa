import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  Activity,
} from "lucide-react";

import StatisticCard from "@/features/dashboard/components/StatisticCard";

interface Props {
  total: number;
  active: number;
  completed: number;
  planning: number;
}

export default function ProjectStats({
  total,
  active,
  completed,
  planning,
}: Props) {
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatisticCard
        title="Projects"
        value={String(total)}
        change="Total"
        icon={FolderKanban}
      />

      <StatisticCard
        title="Active"
        value={String(active)}
        change="Running"
        icon={Activity}
      />

      <StatisticCard
        title="Completed"
        value={String(completed)}
        change="Finished"
        icon={CheckCircle2}
      />

      <StatisticCard
        title="Planning"
        value={String(planning)}
        change="Upcoming"
        icon={Clock3}
      />

    </div>
  );
}
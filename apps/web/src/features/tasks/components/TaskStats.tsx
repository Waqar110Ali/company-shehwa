import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  SearchCheck,
  AlertTriangle,
} from "lucide-react";

import GlassCard from "@/components/premium/GlassCard";

interface Props {
  total: number;

  todo: number;

  progress: number;

  review: number;

  completed: number;
}

export default function TaskStats({
  total,
  todo,
  progress,
  review,
  completed,
}: Props) {
  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ClipboardList,
      color: "text-cyan-400",
    },

    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-emerald-400",
    },

    {
      title: "In Progress",
      value: progress,
      icon: Clock3,
      color: "text-yellow-400",
    },

    {
      title: "Review",
      value: review,
      icon: SearchCheck,
      color: "text-purple-400",
    },

    {
      title: "Todo",
      value: todo,
      icon: AlertTriangle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      {stats.map((item) => {

        const Icon = item.icon;

        return (
          <GlassCard
            key={item.title}
            className="rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl bg-white/5 p-4 ${item.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </GlassCard>
        );

      })}

    </div>
  );
}
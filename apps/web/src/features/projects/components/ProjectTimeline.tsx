import {
  Calendar,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectTimeline({
  project,
}: Props) {
  const timeline = [
    {
      title: "Project Created",
      value: new Date(
        project.startDate,
      ).toLocaleDateString(),
      icon: Calendar,
    },

    {
      title: "Team Assigned",
      value: `${project.members.length} Member${
        project.members.length === 1
          ? ""
          : "s"
      }`,
      icon: Users,
    },

    {
      title: "Current Status",
      value: project.status,
      icon: Clock3,
    },

    {
      title: "Progress",
      value: `${project.progress}% Completed`,
      icon: CheckCircle2,
    },

    {
      title: "Due Date",
      value: new Date(
        project.dueDate,
      ).toLocaleDateString(),
      icon: Calendar,
    },
  ];

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-8">

      <h3 className="mb-8 text-2xl font-bold text-white">
        Timeline
      </h3>

      <div className="space-y-6">

        {timeline.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-4"
            >
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Icon
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <h4 className="font-semibold text-white">
                  {item.title}
                </h4>

                <p className="text-slate-400">
                  {item.value}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
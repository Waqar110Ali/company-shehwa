import {
  Activity,
  Calendar,
  Users,
  CheckCircle2,
} from "lucide-react";

import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectActivity({
  project,
}: Props) {
  const activities = [
    {
      icon: Activity,
      text: `"${project.name}" project created`,
    },

    {
      icon: Users,
      text: `${project.members.length} team member${
        project.members.length === 1
          ? ""
          : "s"
      } assigned`,
    },

    {
      icon: CheckCircle2,
      text: `Project is currently "${project.status}"`,
    },

    {
      icon: Calendar,
      text: `Deadline is ${new Date(
        project.dueDate,
      ).toLocaleDateString()}`,
    },
  ];

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-8">

      <h3 className="mb-8 text-2xl font-bold text-white">
        Recent Activity
      </h3>

      <div className="space-y-5">

        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.text}
              className="flex items-center gap-4 rounded-xl bg-white/5 p-4"
            >
              <Icon
                size={20}
                className="text-cyan-400"
              />

              <span className="text-slate-300">
                {activity.text}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}
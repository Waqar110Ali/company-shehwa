import {
  Calendar,
  FolderKanban,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  DashboardProject,
} from "../types/dashboard";

interface Props {
  projects: DashboardProject[];
}

function progressColor(
  progress: number,
) {
  if (progress >= 80)
    return "bg-emerald-500";

  if (progress >= 50)
    return "bg-cyan-500";

  return "bg-yellow-500";
}

function statusColor(
  status: string,
) {
  switch (status) {
    case "Active":
      return "bg-emerald-500/20 text-emerald-300";

    case "Planning":
      return "bg-yellow-500/20 text-yellow-300";

    case "Review":
      return "bg-blue-500/20 text-blue-300";

    default:
      return "bg-slate-500/20 text-slate-300";
  }
}

export default function LatestProjects({
  projects,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-3xl">
      <div className="mb-6 flex items-center gap-3">
        <FolderKanban className="text-cyan-400" />

        <div>
          <h2 className="text-xl font-bold text-white">
            Latest Projects
          </h2>

          <p className="text-sm text-slate-400">
            Recently updated projects
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {projects.length === 0 ? (
          <p className="text-slate-400">
            No projects found.
          </p>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {project.name}
                  </h3>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                      project.status,
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                <span className="text-lg font-bold text-cyan-300">
                  {project.progress}%
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${progressColor(
                    project.progress,
                  )}`}
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Users size={15} />

                  {project.members}
                  {" "}
                  Members
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={15} />

                  {project.due}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
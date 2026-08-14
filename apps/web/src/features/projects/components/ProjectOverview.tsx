import {
  Calendar,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import ProgressBar from "./ProgressBar";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectOverview({
  project,
}: Props) {
  const progress =
    project.progress ?? 0;

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-8 backdrop-blur-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="flex-1">

          <h1 className="text-3xl font-black text-white">
            {project.name}
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            {project.description ||
              "No description available."}
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <StatusBadge
            status={project.status}
          />

          <PriorityBadge
            priority={project.priority}
          />

        </div>

      </div>

      <div className="mt-8">

        <ProgressBar
          value={progress}
        />

      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="mb-3 flex items-center gap-2 text-cyan-400">

            <Users size={18} />

            <span className="text-sm font-medium">
              Team Members
            </span>

          </div>

          <p className="text-3xl font-bold text-white">
            {project.members.length}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="mb-3 flex items-center gap-2 text-cyan-400">

            <CheckCircle2 size={18} />

            <span className="text-sm font-medium">
              Tasks
            </span>

          </div>

          <p className="text-3xl font-bold text-white">
            {project.completedTasks}/
            {project.totalTasks}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="mb-3 flex items-center gap-2 text-cyan-400">

            <Calendar size={18} />

            <span className="text-sm font-medium">
              Start Date
            </span>

          </div>

          <p className="font-semibold text-white">
            {new Date(
              project.startDate,
            ).toLocaleDateString()}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <div className="mb-3 flex items-center gap-2 text-cyan-400">

            <Clock3 size={18} />

            <span className="text-sm font-medium">
              Due Date
            </span>

          </div>

          <p className="font-semibold text-white">
            {new Date(
              project.dueDate,
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>
  );
}
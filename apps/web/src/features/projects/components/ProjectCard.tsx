import { useState } from "react";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  MoreVertical,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import GlassCard from "@/components/premium/GlassCard";

import DeleteProjectDialog from "./DeleteProjectDialog";
import EditProjectDialog from "./EditProjectDialog";
import PriorityBadge from "./PriorityBadge";
import ProgressBar from "./ProgressBar";
import ProjectActions from "./ProjectActions";
import StatusBadge from "./StatusBadge";
import TeamAvatarGroup from "./TeamAvatarGroup";

import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {
  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>
      <motion.div
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <GlassCard className="group relative h-full p-7">
          <div className="absolute right-5 top-5">
            <ProjectActions
              onEdit={() =>
                setEditOpen(true)
              }
              onDelete={() =>
                setDeleteOpen(true)
              }
            >
              <button className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <MoreVertical
                  size={18}
                />
              </button>
            </ProjectActions>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="pr-8">
              <h3 className="text-2xl font-bold text-white">
                {project.name}
              </h3>

              <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
                {project.description}
              </p>
            </div>

            <StatusBadge
              status={project.status}
            />
          </div>

          <div className="mt-7">
            <PriorityBadge
              priority={
                project.priority
              }
            />
          </div>

          <div className="mt-8">
            <ProgressBar
              value={project.progress}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
              />

              {project.completedTasks}/
              {project.totalTasks}
            </div>

            <div className="flex items-center gap-3">
              <Users size={18} />

              <TeamAvatarGroup
                members={
                  project.members
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar
                size={18}
              />

              {project.dueDate}
            </div>
          </div>

          <Link
            to={`/dashboard/projects/${project.id}`}
            className="mt-8 flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            View Project

            <ArrowRight
              size={18}
            />
          </Link>
        </GlassCard>
      </motion.div>

      <EditProjectDialog
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
        project={project}
      />

      <DeleteProjectDialog
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        projectId={project.id}
        projectName={
          project.name
        }
      />
    </>
  );
}
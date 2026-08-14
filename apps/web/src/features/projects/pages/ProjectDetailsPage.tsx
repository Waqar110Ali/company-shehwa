import { useParams } from "react-router-dom";

import ProjectOverview from "@/features/projects/components/ProjectOverview";
import TeamSection from "@/features/projects/components/TeamSection";
import ProjectTimeline from "@/features/projects/components/ProjectTimeline";
import ProjectActivity from "@/features/projects/components/ProjectActivity";

import { useProject } from "@/features/projects/hooks/useProject";

import { mapProjectDetails } from "@/features/projects/mapper/project.mapper";

export default function ProjectDetailsPage() {
  const { id = "" } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">
          Loading project...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-400">
          Failed to load project.
        </p>
      </div>
    );
  }

  const project =
    mapProjectDetails(data);

  return (
    <div className="space-y-8">

      <ProjectOverview
        project={project}
      />

      <div className="grid gap-8 xl:grid-cols-2">

        <TeamSection
          project={project}
        />

        <ProjectTimeline
          project={project}
        />

      </div>

      <ProjectActivity
        project={project}
      />

    </div>
  );
}
import { projects } from "@/features/projects/data/projects";

import ProjectGrid from "@/features/projects/components/ProjectGrid";
import ProjectHeader from "@/features/projects/components/ProjectHeader";

export default function ProjectsPage() {
  return (
    <div>

      <ProjectHeader />

      <ProjectGrid
        projects={projects}
      />

    </div>
  );
}
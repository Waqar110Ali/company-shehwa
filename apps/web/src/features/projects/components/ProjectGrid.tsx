import ProjectCard from "./ProjectCard";

import type { Project } from "../types/project";

interface Props {
  projects: Project[];
}

export default function ProjectGrid({
  projects,
}: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}

    </div>
  );
}
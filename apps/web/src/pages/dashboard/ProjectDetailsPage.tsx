import { useParams } from "react-router-dom";

import { projects } from "@/features/projects/data/projects";

import ProjectOverview from "@/features/projects/components/ProjectOverview";
import TeamSection from "@/features/projects/components/TeamSection";
import ProjectTimeline from "@/features/projects/components/ProjectTimeline";
import ProjectActivity from "@/features/projects/components/ProjectActivity";
import KanbanBoard from "@/features/tasks/components/KanbanBoard";

export default function ProjectDetailsPage() {
    const { id } = useParams();

    const project = projects.find(
        (p) => p.id === id
    );

    if (!project) {
        return (
            <h2 className="text-2xl text-white">
                Project not found
            </h2>
        );
    }

    return (
        <div className="space-y-8">

            <ProjectOverview
                project={project}
            />

            <div className="grid gap-8 xl:grid-cols-2">

                <TeamSection
                    project={project}
                />

                <ProjectTimeline />

            </div>

            <ProjectActivity />

            <KanbanBoard/>


        </div>
    );
}
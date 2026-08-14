import type { Project } from "../types/project";

import MemberCard from "./MemberCard";

interface Props {
  project: Project;
}

export default function TeamSection({
  project,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-8">

      <h3 className="mb-6 text-2xl font-bold text-white">
        Team Members
      </h3>

      <div className="grid gap-4">

        {project.members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
          />
        ))}

      </div>

    </div>
  );
}
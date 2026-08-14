import type { TeamMember } from "../types/project";

interface Props {
  member: TeamMember;
}

export default function MemberCard({
  member,
}: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-cyan-400/10 bg-white/5 p-4">

      <img
        src={member.avatar}
        alt={member.name}
        className="h-14 w-14 rounded-full object-cover"
      />

      <div>

        <h4 className="font-semibold text-white">
          {member.name}
        </h4>

        <p className="text-sm text-slate-400">
          {member.role}
        </p>

      </div>

    </div>
  );
}
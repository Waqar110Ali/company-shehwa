import type { TeamMember } from "../types/project";

interface Props {
  members: TeamMember[];
}

export default function TeamAvatarGroup({
  members,
}: Props) {
  return (
    <div className="flex">

      {members.slice(0, 4).map((member, index) => (
        <img
          key={member.id}
          src={member.avatar}
          alt={member.name}
          className="-ml-2 h-10 w-10 rounded-full border-2 border-slate-900 object-cover first:ml-0"
          style={{
            zIndex: 20 - index,
          }}
        />
      ))}

      {members.length > 4 && (
        <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-cyan-500 text-xs font-bold text-white">
          +{members.length - 4}
        </div>
      )}

    </div>
  );
}
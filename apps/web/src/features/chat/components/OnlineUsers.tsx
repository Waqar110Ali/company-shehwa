import type { Conversation } from "../types/chat";

interface Props {
  users: Conversation[];
}

export default function OnlineUsers({
  users,
}: Props) {
  const onlineUsers = users.filter(
    (user) => user.online
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <h3 className="mb-4 text-lg font-semibold text-white">
        Online Now
      </h3>

      <div className="flex flex-wrap gap-4">

        {onlineUsers.map((user) => (

          <div
            key={user.id}
            className="flex flex-col items-center"
          >

            <div className="relative">

              <img
                src={user.avatar}
                alt={user.name}
                className="h-14 w-14 rounded-full object-cover"
              />

              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-green-500" />

            </div>

            <p className="mt-2 text-xs text-slate-300">
              {user.name.split(" ")[0]}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
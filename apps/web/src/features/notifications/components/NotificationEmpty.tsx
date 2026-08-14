import { BellOff } from "lucide-react";

export default function NotificationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-14">

      <div className="rounded-full bg-white/5 p-5">

        <BellOff
          size={34}
          className="text-slate-500"
        />

      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">

        No Notifications

      </h3>

      <p className="mt-2 text-center text-sm text-slate-400">

        You're all caught up.
        <br />
        New notifications will appear here.

      </p>

    </div>
  );
}
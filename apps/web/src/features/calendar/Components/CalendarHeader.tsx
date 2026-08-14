interface Props {
  currentMonth: string;
}

export default function CalendarHeader({
  currentMonth,
}: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Calendar
        </h1>

        <p className="mt-2 text-slate-400">
          Manage meetings, holidays and events.
        </p>

      </div>

      <h2 className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-3 text-xl font-semibold text-cyan-300">

        {currentMonth}

      </h2>

    </div>
  );
}
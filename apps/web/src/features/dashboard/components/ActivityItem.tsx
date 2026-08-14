interface Props {
  title: string;
  time: string;
}

export default function ActivityItem({
  title,
  time,
}: Props) {
  return (
    <div className="flex gap-4">

      <div className="mt-2 h-3 w-3 rounded-full bg-cyan-400" />

      <div>

        <p className="font-medium text-white">
          {title}
        </p>

        <span className="text-sm text-slate-500">
          {time}
        </span>

      </div>

    </div>
  );
}
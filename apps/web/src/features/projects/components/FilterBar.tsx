interface Props {
  status: string;
  setStatus: (value: string) => void;
}

export default function FilterBar({
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="
rounded-xl
border
border-cyan-400/10
bg-slate-900
px-5
py-3
text-white
"
      >
        <option>All</option>
        <option>Planning</option>
        <option>Active</option>
        <option>Completed</option>
        <option>On Hold</option>
      </select>

    </div>
  );
}
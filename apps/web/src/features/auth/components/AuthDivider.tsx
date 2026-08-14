export default function AuthDivider() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-white/10" />

      <span className="text-sm font-medium text-slate-400">
        OR
      </span>

      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
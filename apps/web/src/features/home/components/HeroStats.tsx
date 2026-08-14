interface HeroStatsProps {
  value: string;
  label: string;
}

export default function HeroStats({
  value,
  label,
}: HeroStatsProps) {
  return (
    <div className="text-center">
      <h3 className="text-4xl font-black text-white">
        {value}
      </h3>

      <p className="mt-2 text-slate-400">
        {label}
      </p>
    </div>
  );
}
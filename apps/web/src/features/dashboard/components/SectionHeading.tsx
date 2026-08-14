interface Props {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-black text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}
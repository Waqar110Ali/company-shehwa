interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
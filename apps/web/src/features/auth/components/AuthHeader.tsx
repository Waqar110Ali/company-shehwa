import GradientText from "@/components/premium/GradientText";

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-black text-white">
        <GradientText>{title}</GradientText>
      </h1>

      <p className="mt-4 leading-7 text-slate-300">
        {subtitle}
      </p>
    </div>
  );
}
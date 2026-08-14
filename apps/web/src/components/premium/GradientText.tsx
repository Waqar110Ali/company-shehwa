interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={`
      bg-gradient-to-r
      from-blue-500
      via-cyan-400
      to-violet-500
      bg-clip-text
      text-transparent
      ${className}
      `}
    >
      {children}
    </span>
  );
}
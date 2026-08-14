import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
  className?: string;
}

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      {children}
    </section>
  );
}
import { PropsWithChildren } from "react";

import { spacing } from "@/styles";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`${spacing.container} ${spacing.sectionX} ${className}`}>
      {children}
    </div>
  );
}
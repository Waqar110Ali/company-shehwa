import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import PremiumButton from "@/components/premium/PremiumButton";

type ScheduleMeetingButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "link";
};

/** Navigates to the on-site booking page (no Cal.com iframe). */
export default function ScheduleMeetingButton({
  children = "Schedule Meeting",
  className,
  variant = "outline",
}: ScheduleMeetingButtonProps) {
  return (
    <Link to="/book">
      <PremiumButton variant={variant} className={className}>
        {children}
      </PremiumButton>
    </Link>
  );
}

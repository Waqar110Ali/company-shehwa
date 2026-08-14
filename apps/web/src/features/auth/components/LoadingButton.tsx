import { Loader2 } from "lucide-react";

import PremiumButton from "@/components/premium/PremiumButton";

interface Props {
  loading?: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({
  loading = false,
  children,
}: Props) {
  return (
    <PremiumButton
      type="submit"
      className="h-12 w-full"
      disabled={loading}
    >
      {loading && (
        <Loader2
          size={18}
          className="mr-2 animate-spin"
        />
      )}

      {children}
    </PremiumButton>
  );
}
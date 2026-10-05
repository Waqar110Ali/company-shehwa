import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "@/features/auth/api/auth.api";
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";

export default function VerifyEmailPage() {
  const { token = "" } = useParams();
  const { isPending, error } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <AuthLayout>
      <AuthCard
        title={isPending ? "Verifying your email" : error ? "Verification failed" : "Email verified"}
        subtitle={isPending
          ? "Please wait while we verify your email address."
          : error
            ? "This verification link is invalid or has already been used. If you already verified your email, you can log in."
            : "You can now sign in with the email and temporary password from your welcome email."}
      >
        {!isPending && (
          <Link to="/login" className="block text-center font-semibold text-cyan-300 hover:text-cyan-200">
            Go to login
          </Link>
        )}
      </AuthCard>
    </AuthLayout>
  );
}

import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import { api } from "@/lib/api";

import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  getUser,
  saveAuth,
} from "@/features/auth/utils/auth-storage";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const [loading, setLoading] =
    useState(true);

  const [
    authenticated,
    setAuthenticated,
  ] = useState(false);

  useEffect(() => {
    async function validate() {
      const token =
        getAccessToken();

      if (!token) {
        clearAuth();
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response =
          await api.get("/auth/me");

        const user =
          response.data.data;

        saveAuth({
          accessToken: token,
          refreshToken:
            getRefreshToken() ?? "",
          user: {
            ...getUser(),
            ...user,
          },
        });

        setAuthenticated(true);
      } catch (error) {
        console.error(error);

        clearAuth();

        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    validate();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}
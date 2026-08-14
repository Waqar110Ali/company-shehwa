import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@/lib/api";

import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  getUser,
  saveAuth,
} from "@/features/auth/utils/auth-storage";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(getUser());

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {
    try {
      const token =
        getAccessToken();

      if (!token) {
        clearAuth();
        setUser(null);
        return;
      }

      const response =
        await api.get("/auth/me");

      const serverUser =
        response.data.data;

      saveAuth({
        accessToken: token,
        refreshToken:
          getRefreshToken() ?? "",
        user: serverUser,
      });

      setUser(serverUser);
    } catch {
      clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAuth();
    setUser(null);
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
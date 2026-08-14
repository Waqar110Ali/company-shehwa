import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { api } from "@/lib/api";
import PremiumButton from "@/components/premium/PremiumButton";

import AuthCard from "./AuthCard";
import AuthDivider from "./AuthDivider";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert(
        "Please enter email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          },
        );

      const {
        accessToken,
        refreshToken,
        user,
      } = response.data.data;

      localStorage.setItem(
        "token",
        accessToken,
      );

      localStorage.setItem(
        "refreshToken",
        refreshToken,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user),
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ??
          "Login Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your workspace, projects, tasks, and company dashboard."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value,
              )
            }
            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-slate-400 backdrop-blur-xl outline-none transition-all duration-300 focus:border-cyan-400/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <PasswordInput
            value={password}
            onChange={
              setPassword
            }
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              className="rounded border-white/20 bg-transparent"
            />

            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-cyan-300 hover:text-cyan-200"
          >
            Forgot Password?
          </Link>
        </div>

        <PremiumButton
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </PremiumButton>

        <AuthDivider />

        <SocialLogin />

        {/* <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Register
          </Link>
        </p> */}
        <p className="text-center text-sm text-slate-400">
  Contact your administrator to receive your login credentials.
</p>
      </form>
    </AuthCard>
  );
}
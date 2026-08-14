import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import PremiumButton from "@/components/premium/PremiumButton";
import RoleSelector from "./RoleSelector";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent,
) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const names = form.fullName
    .trim()
    .split(" ");

  const firstName = names.shift() ?? "";

  const lastName = names.join(" ");

  try {
    const response = await api.post(
      "/auth/register",
      {
        firstName,
        lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      },
    );

    console.log(response.data);

    alert("Registration Successful!");

  } catch (error: any) {
    console.error(error);

    console.log(error.response?.data);

    alert(
      error.response?.data?.message ??
        "Registration Failed",
    );
  }
};

  return (
    <AuthCard
      title="Join Our Company"
      subtitle="Submit your application to become a member of our growing team."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            updateField("fullName", e.target.value)
          }
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-slate-400"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            updateField("email", e.target.value)
          }
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-slate-400"
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            updateField("phone", e.target.value)
          }
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-slate-400"
        />

        <RoleSelector
          value={form.role}
          onChange={(value) =>
            updateField("role", value)
          }
        />

        <PasswordInput
          value={form.password}
          onChange={(value) =>
            updateField("password", value)
          }
          placeholder="Password"
        />

        <PasswordInput
          value={form.confirmPassword}
          onChange={(value) =>
            updateField("confirmPassword", value)
          }
          placeholder="Confirm Password"
        />

        <PremiumButton
          type="submit"
          className="w-full"
        >
          Submit Application
        </PremiumButton>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
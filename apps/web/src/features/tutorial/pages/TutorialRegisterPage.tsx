import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Phone, User } from "lucide-react";

import { registerTutorialStudent } from "../api/tutorial.api";

export default function TutorialRegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in your first name, last name and email.");
      return;
    }

    try {
      setLoading(true);
      await registerTutorialStudent({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });
      setDone(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15">
            <Mail className="text-cyan-300" size={26} />
          </div>
          <h1 className="mt-5 text-xl font-semibold">Check your email</h1>
          <p className="mt-3 text-sm text-slate-400">
            We&apos;ve emailed <span className="text-cyan-300">{email}</span>{" "}
            a temporary password. Log in with it, then browse and enroll in
            courses.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15">
            <GraduationCap className="text-cyan-300" size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Shehwa Tutorials
            </p>
            <h1 className="text-lg font-semibold">Create your account</h1>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Register to browse courses, submit payment proof, and start
          learning once approved.
        </p>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                First name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/50"
                placeholder="Ayesha"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Last name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/50"
                placeholder="Khan"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">
              Phone (optional)
            </label>
            <div className="relative">
              <Phone
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/50"
                placeholder="03xx-xxxxxxx"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            <User size={16} />
            {loading ? "Creating your account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

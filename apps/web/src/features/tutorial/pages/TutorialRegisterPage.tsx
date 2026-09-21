import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { registerTutorialUser } from "../api/tutorial.api";

export default function TutorialRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await registerTutorialUser(form);
      const userId = result?.data?._id ?? result?._id;
      setMessage(result?.message ?? "Registration successful.");

      if (userId) {
        navigate(`/tutorial/courses?userId=${userId}`);
      }
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Tutorial registration</p>
            <h1 className="mt-2 text-3xl font-bold">Create your account</h1>
          </div>
          <Link to="/tutorial" className="text-sm text-cyan-300 hover:text-cyan-200">Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Full name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500"
              placeholder="Ali Khan"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="0300 1234567"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">City</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="Lahore"
              />
            </div>
          </div>

          {message ? <p className="text-sm text-cyan-300">{message}</p> : null}

          <Button type="submit" disabled={loading} className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            {loading ? "Registering..." : "Register now"}
          </Button>
        </form>
      </div>
    </main>
  );
}

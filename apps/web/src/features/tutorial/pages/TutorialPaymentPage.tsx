import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTutorialCourses, submitPayment } from "../api/tutorial.api";

export default function TutorialPaymentPage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") ?? "";
  const courseId = searchParams.get("courseId") ?? "";
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    amount: 0,
    paymentMethod: "Easypaisa",
    screenshotUrl: "",
  });
  const [screenshotName, setScreenshotName] = useState("");

  useEffect(() => {
    async function load() {
      if (!courseId) return;
      const result = await getTutorialCourses();
      const match = (result?.data ?? []).find((item: any) => item._id === courseId);
      setCourse(match ?? null);
      if (match) setForm((prev) => ({ ...prev, amount: Number(match.price ?? 0) }));
    }

    load();
  }, [courseId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId || !courseId) {
      setMessage("User and course are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await submitPayment({
        userId,
        courseId,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        screenshotUrl: form.screenshotUrl,
      });
      setMessage(result?.message ?? "Payment proof submitted for review.");
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Payment could not be submitted.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Payment</p>
            <h1 className="mt-2 text-3xl font-bold">Complete your enrollment</h1>
          </div>
          <Link to="/tutorial/courses" className="text-sm text-cyan-300 hover:text-cyan-200">Back to courses</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="mb-4 text-xl font-semibold">Easypaisa payment QR</h2>
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-cyan-500/40 bg-slate-950">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent("EasyPaisa: 03001234567 | Shehwa Tutorials | Course ID: " + (courseId || "pending"))}`}
                alt="EasyPaisa QR"
                className="h-52 w-52 rounded-xl bg-white p-3"
              />
            </div>
            <div className="mt-4 rounded-xl bg-cyan-500/10 p-4 text-sm text-cyan-100">
              <p className="font-semibold">Account: 0300-1234567</p>
              <p className="mt-1">Reference: {course?.title ?? "Tutorial course"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Course</label>
              <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-200">
                {course?.title ?? "Selected course"}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Amount</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Payment method</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
              >
                <option>Easypaisa</option>
                <option>JazzCash</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Payment screenshot</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (file.size > 5 * 1024 * 1024) {
                    setMessage("Please choose an image smaller than 5 MB.");
                    e.target.value = "";
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = () => {
                    setForm((prev) => ({ ...prev, screenshotUrl: String(reader.result ?? "") }));
                    setScreenshotName(file.name);
                    setMessage("");
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full rounded-xl border border-dashed border-cyan-500/40 bg-slate-950 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:font-semibold file:text-slate-950"
                required
              />
              <p className="mt-2 text-xs text-slate-400">PNG, JPG, or WEBP. Maximum 5 MB.</p>
              {screenshotName ? <p className="mt-2 text-sm text-cyan-300">Selected: {screenshotName}</p> : null}
              {form.screenshotUrl ? (
                <img
                  src={form.screenshotUrl}
                  alt="Payment proof preview"
                  className="mt-3 max-h-48 rounded-xl border border-white/10 object-contain"
                />
              ) : null}
            </div>

            {message ? <p className="text-sm text-cyan-300">{message}</p> : null}

            <Button type="submit" disabled={loading} className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              {loading ? "Submitting..." : "Submit payment proof"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

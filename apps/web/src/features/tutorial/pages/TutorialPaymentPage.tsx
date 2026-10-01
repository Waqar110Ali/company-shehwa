import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, UploadCloud } from "lucide-react";

import {
  getTutorialCourseDetail,
  getTutorialPaymentSettings,
  submitEnrollment,
  type TutorialCourseDetail,
  type TutorialPaymentSettings,
} from "../api/tutorial.api";

export default function TutorialPaymentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [course, setCourse] = useState<TutorialCourseDetail | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [paymentSettings, setPaymentSettings] =
    useState<TutorialPaymentSettings | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    getTutorialCourseDetail(courseId)
      .then(setCourse)
      .catch((err) =>
        setError(
          err?.response?.data?.message ?? "Unable to load this course.",
        ),
      )
      .finally(() => setLoadingCourse(false));

    getTutorialPaymentSettings()
      .then((res) => setPaymentSettings(res.data))
      .catch(() => setPaymentSettings(null));
  }, [courseId]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!courseId) return;

    if (!file) {
      setError("Please attach a screenshot or PDF of your payment.");
      return;
    }

    try {
      setSubmitting(true);
      await submitEnrollment(courseId, file, note.trim() || undefined);
      setDone(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Could not submit your request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="mx-auto max-w-xl space-y-6 text-center text-white">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15">
          <CheckCircle2 className="text-emerald-300" size={30} />
        </div>
        <h1 className="text-2xl font-semibold">Request submitted</h1>
        <p className="text-sm text-slate-400">
          Your enrollment request for{" "}
          <span className="text-cyan-300">{course?.title}</span> is pending
          review. You&apos;ll get access as soon as an admin approves your
          payment proof.
        </p>
        <button
          onClick={() => navigate("/tutorial/dashboard/my-courses")}
          className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Go to My Courses
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Enrollment
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Submit payment proof
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Pay for the course through your usual method, then upload a
          screenshot or PDF receipt below. An admin will verify it and grant
          you access.
        </p>
      </header>

      {loadingCourse ? (
        <p className="text-sm text-slate-400">Loading course...</p>
      ) : course ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-lg font-semibold">{course.title}</p>
          <p className="mt-1 text-sm text-slate-400">
            {course.description || "No description provided."}
          </p>
          <p className="mt-3 text-sm font-semibold text-cyan-300">
            {course.priceLabel || "Contact for price"}
          </p>
          {course.enrollmentStatus === "PENDING" ? (
            <p className="mt-3 rounded-lg bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
              You already have a pending request for this course.
            </p>
          ) : course.enrollmentStatus === "ACTIVE" ? (
            <p className="mt-3 rounded-lg bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">
              You already have access to this course.
            </p>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {paymentSettings?.qrCodeUrl ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:flex-row sm:items-start">
          <img
            src={paymentSettings.qrCodeUrl}
            alt="Payment QR code"
            className="h-40 w-40 shrink-0 rounded-xl bg-white object-contain p-2"
          />
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-cyan-300">Scan to pay</p>
            {paymentSettings.bankName ? (
              <p className="mt-2">
                <span className="text-slate-500">Bank/Wallet:</span>{" "}
                {paymentSettings.bankName}
              </p>
            ) : null}
            {paymentSettings.accountTitle ? (
              <p>
                <span className="text-slate-500">Account title:</span>{" "}
                {paymentSettings.accountTitle}
              </p>
            ) : null}
            {paymentSettings.accountNumber ? (
              <p>
                <span className="text-slate-500">Account number:</span>{" "}
                {paymentSettings.accountNumber}
              </p>
            ) : null}
            {paymentSettings.instructions ? (
              <p className="mt-3 text-slate-400">
                {paymentSettings.instructions}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Payment proof (screenshot or PDF)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center transition hover:border-cyan-400/40"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Payment proof preview"
                className="max-h-48 rounded-lg object-contain"
              />
            ) : (
              <>
                <UploadCloud className="text-cyan-300" size={28} />
                <span className="text-sm text-slate-300">
                  {file ? file.name : "Click to choose a file"}
                </span>
                <span className="text-xs text-slate-500">
                  PNG, JPG or PDF up to 10MB
                </span>
              </>
            )}
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Note for admin (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="e.g. Paid via Easypaisa, transaction ID 123456"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/50"
          />
        </div>

        <button
          type="submit"
          disabled={
            submitting || course?.enrollmentStatus === "ACTIVE"
          }
          className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit for review"}
        </button>
      </form>
    </section>
  );
}

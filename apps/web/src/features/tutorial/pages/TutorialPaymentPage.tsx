// import { FormEvent, useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { getTutorialCourses, submitPayment } from "../api/tutorial.api";

// export default function TutorialPaymentPage() {
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get("userId") ?? "";
//   const courseId = searchParams.get("courseId") ?? "";
//   const [course, setCourse] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [form, setForm] = useState({
//     amount: 0,
//     paymentMethod: "Easypaisa",
//     screenshotUrl: "",
//   });
//   const [screenshotName, setScreenshotName] = useState("");

//   useEffect(() => {
//     async function load() {
//       if (!courseId) return;
//       const result = await getTutorialCourses();
//       const match = (result?.data ?? []).find((item: any) => item._id === courseId);
//       setCourse(match ?? null);
//       if (match) setForm((prev) => ({ ...prev, amount: Number(match.price ?? 0) }));
//     }

//     load();
//   }, [courseId]);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     if (!userId || !courseId) {
//       setMessage("User and course are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await submitPayment({
//         userId,
//         courseId,
//         amount: Number(form.amount),
//         paymentMethod: form.paymentMethod,
//         screenshotUrl: form.screenshotUrl,
//       });
//       setMessage(result?.message ?? "Payment proof submitted for review.");
//     } catch (error: any) {
//       setMessage(error?.response?.data?.message ?? "Payment could not be submitted.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
//       <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-cyan-500/10">
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Payment</p>
//             <h1 className="mt-2 text-3xl font-bold">Complete your enrollment</h1>
//           </div>
//           <Link to="/tutorial/dashboard/courses" className="text-sm text-cyan-300 hover:text-cyan-200">Back to courses</Link>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
//           <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
//             <h2 className="mb-4 text-xl font-semibold">Easypaisa payment QR</h2>
//             <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-cyan-500/40 bg-slate-950">
//               <img
//                 src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent("EasyPaisa: 03001234567 | Shehwa Tutorials | Course ID: " + (courseId || "pending"))}`}
//                 alt="EasyPaisa QR"
//                 className="h-52 w-52 rounded-xl bg-white p-3"
//               />
//             </div>
//             <div className="mt-4 rounded-xl bg-cyan-500/10 p-4 text-sm text-cyan-100">
//               <p className="font-semibold">Account: 0300-1234567</p>
//               <p className="mt-1">Reference: {course?.title ?? "Tutorial course"}</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5">
//             <div>
//               <label className="mb-2 block text-sm text-slate-300">Course</label>
//               <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-200">
//                 {course?.title ?? "Selected course"}
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-slate-300">Amount</label>
//               <input
//                 type="number"
//                 value={form.amount}
//                 onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
//                 className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-slate-300">Payment method</label>
//               <select
//                 value={form.paymentMethod}
//                 onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
//                 className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
//               >
//                 <option>Easypaisa</option>
//                 <option>JazzCash</option>
//                 <option>Bank Transfer</option>
//               </select>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm text-slate-300">Payment screenshot</label>
//               <input
//                 type="file"
//                 accept="image/png,image/jpeg,image/webp"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;

//                   if (file.size > 5 * 1024 * 1024) {
//                     setMessage("Please choose an image smaller than 5 MB.");
//                     e.target.value = "";
//                     return;
//                   }

//                   const reader = new FileReader();
//                   reader.onload = () => {
//                     setForm((prev) => ({ ...prev, screenshotUrl: String(reader.result ?? "") }));
//                     setScreenshotName(file.name);
//                     setMessage("");
//                   };
//                   reader.readAsDataURL(file);
//                 }}
//                 className="w-full rounded-xl border border-dashed border-cyan-500/40 bg-slate-950 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:font-semibold file:text-slate-950"
//                 required
//               />
//               <p className="mt-2 text-xs text-slate-400">PNG, JPG, or WEBP. Maximum 5 MB.</p>
//               {screenshotName ? <p className="mt-2 text-sm text-cyan-300">Selected: {screenshotName}</p> : null}
//               {form.screenshotUrl ? (
//                 <img
//                   src={form.screenshotUrl}
//                   alt="Payment proof preview"
//                   className="mt-3 max-h-48 rounded-xl border border-white/10 object-contain"
//                 />
//               ) : null}
//             </div>

//             {message ? <p className="text-sm text-cyan-300">{message}</p> : null}

//             <Button type="submit" disabled={loading} className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400">
//               {loading ? "Submitting..." : "Submit payment proof"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, UploadCloud } from "lucide-react";

import {
  getTutorialCourseDetail,
  submitEnrollment,
  type TutorialCourseDetail,
} from "../api/tutorial.api";

export default function TutorialPaymentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [course, setCourse] = useState<TutorialCourseDetail | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
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
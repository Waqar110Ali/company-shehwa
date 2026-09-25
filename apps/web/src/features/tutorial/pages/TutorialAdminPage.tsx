import { useEffect, useMemo, useState } from "react";
import { Check, Clock3, GraduationCap, Image as ImageIcon, X } from "lucide-react";
import { getTutorialAdminOverview, reviewPayment } from "../api/tutorial.api";

type StatusFilter = "all" | "pending" | "approved" | "rejected";

export default function TutorialAdminPage() {
  const [overview, setOverview] = useState<any>({ users: [], courses: [], payments: [] });
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function loadOverview() {
    setLoading(true);
    try {
      const result = await getTutorialAdminOverview();
      setOverview(result?.data ?? { users: [], courses: [], payments: [] });
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Unable to load tutorial management data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
  }, []);

  const usersById = useMemo(
    () => new Map(overview.users.map((user: any) => [String(user._id), user])),
    [overview.users],
  );
  const coursesById = useMemo(
    () => new Map(overview.courses.map((course: any) => [String(course._id), course])),
    [overview.courses],
  );
  const filteredPayments = overview.payments.filter(
    (payment: any) => filter === "all" || payment.status === filter,
  );
  const enrollmentRows = overview.users.flatMap((user: any) =>
    (user.enrollments ?? []).map((enrollment: any) => ({
      user,
      enrollment,
      course: coursesById.get(String(enrollment.courseId)),
    })),
  );

  async function handleReview(paymentId: string, status: "approved" | "rejected") {
    try {
      await reviewPayment(paymentId, status, status === "rejected" ? "Payment request rejected by admin." : "");
      setMessage(`Payment request ${status}.`);
      await loadOverview();
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Review failed.");
    }
  }

  const counts = {
    all: overview.payments.length,
    pending: overview.payments.filter((item: any) => item.status === "pending").length,
    approved: overview.payments.filter((item: any) => item.status === "approved").length,
    rejected: overview.payments.filter((item: any) => item.status === "rejected").length,
  };

  return (
    <section className="space-y-8 text-white">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Tutorial operations</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Tutorial management</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Review payments, verify students, and see every course enrollment from one place.</p>
        </div>
        <button onClick={loadOverview} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5">Refresh data</button>
      </header>

      {message ? <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">{message}</div> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Registered learners", overview.users.length, GraduationCap],
          ["Pending review", counts.pending, Clock3],
          ["Approved requests", counts.approved, Check],
          ["Enrolled learners", enrollmentRows.length, GraduationCap],
        ].map(([label, value, Icon]: any) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Icon className="mb-5 text-cyan-300" size={20} />
            <p className="text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
            <div>
              <h2 className="font-semibold">Payment requests</h2>
              <p className="mt-1 text-xs text-slate-400">Open the proof image to inspect it at full size.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["pending", "approved", "rejected", "all"] as StatusFilter[]).map((status) => (
                <button key={status} onClick={() => setFilter(status)} className={`rounded-lg px-3 py-1.5 text-xs capitalize ${filter === status ? "bg-cyan-400 text-slate-950" : "bg-white/5 text-slate-400 hover:text-white"}`}>
                  {status} ({counts[status]})
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {loading ? <p className="p-5 text-sm text-slate-400">Loading requests...</p> : filteredPayments.length === 0 ? <p className="p-5 text-sm text-slate-400">No {filter} requests.</p> : filteredPayments.map((payment: any) => {
              const user = usersById.get(String(payment.userId));
              const course = coursesById.get(String(payment.courseId));
              return (
                <article key={payment._id} className="space-y-4 p-5">
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <p className="font-medium">{user?.fullName ?? "Unknown learner"}</p>
                      <p className="text-sm text-slate-400">{user?.email ?? payment.userId}</p>
                      <p className="mt-2 text-sm text-slate-300">{course?.title ?? "Unknown course"} · PKR {payment.amount}</p>
                      <p className="text-xs capitalize text-slate-500">{payment.paymentMethod} · {payment.status}</p>
                      {payment.rejectionReason ? <p className="mt-2 text-xs text-red-300">Reason: {payment.rejectionReason}</p> : null}
                    </div>
                    <div className="flex items-start gap-2">
                      {payment.screenshotUrl ? <button onClick={() => setPreview(payment.screenshotUrl)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10"><ImageIcon size={15} /> View proof</button> : null}
                      {payment.status === "pending" ? <><button onClick={() => handleReview(payment._id, "approved")} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950">Approve</button><button onClick={() => handleReview(payment._id, "rejected")} className="rounded-lg bg-red-400/15 px-3 py-2 text-xs font-semibold text-red-200">Reject</button></> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-5"><h2 className="font-semibold">Course enrollments</h2><p className="mt-1 text-xs text-slate-400">Learner to course access mapping.</p></div>
          <div className="max-h-[560px] divide-y divide-white/10 overflow-y-auto">
            {enrollmentRows.length === 0 ? <p className="p-5 text-sm text-slate-400">No enrollments yet.</p> : enrollmentRows.map(({ user, enrollment, course }: any) => (
              <div key={`${user._id}-${enrollment.courseId}`} className="p-5">
                <div className="flex items-center justify-between gap-3"><p className="font-medium">{user.fullName}</p><span className={`rounded-full px-2 py-1 text-[10px] uppercase ${user.hasAccess ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>{user.hasAccess ? "access granted" : user.status}</span></div>
                <p className="mt-1 text-sm text-cyan-200">{course?.title ?? enrollment.courseId}</p>
                <p className="mt-1 text-xs text-slate-500">{user.email} · {user.coins ?? 0} coins</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {preview ? <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => setPreview(null)}><button aria-label="Close preview" onClick={() => setPreview(null)} className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X size={20} /></button><img src={preview} alt="Payment proof enlarged" className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain" onClick={(event) => event.stopPropagation()} /></div> : null}
    </section>
  );
}

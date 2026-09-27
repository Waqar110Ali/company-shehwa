import { useEffect, useState } from "react";
import {
  Check,
  Coins,
  GraduationCap,
  Image as ImageIcon,
  X,
} from "lucide-react";

import {
  adminApproveRequest,
  adminListRequests,
  adminRejectRequest,
  type TutorialPaymentRequest,
} from "../api/tutorial.api";

type StatusFilter = "PENDING" | "APPROVED" | "REJECTED" | "ALL";
type TypeFilter = "ALL" | "ENROLLMENT" | "TOPUP";

export default function TutorialAdminRequests() {
  const [requests, setRequests] = useState<TutorialPaymentRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("PENDING");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const result = await adminListRequests({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        type: typeFilter === "ALL" ? undefined : typeFilter,
      });
      setRequests(result ?? []);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ?? "Unable to load requests.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter]);

  async function handleApprove(request: TutorialPaymentRequest) {
    try {
      setBusyId(request._id);
      await adminApproveRequest(request._id);
      setMessage("Request approved.");
      await load();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Approval failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleReject(request: TutorialPaymentRequest) {
    if (!rejectReason.trim()) {
      setMessage("Please provide a rejection reason.");
      return;
    }

    try {
      setBusyId(request._id);
      await adminRejectRequest(request._id, rejectReason.trim());
      setMessage("Request rejected.");
      setRejectingId(null);
      setRejectReason("");
      await load();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Rejection failed.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      {message ? (
        <div className="flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
          {message}
          <button onClick={() => setMessage("")} className="text-cyan-300">
            <X size={14} />
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["PENDING", "APPROVED", "REJECTED", "ALL"] as StatusFilter[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-xs capitalize ${
                  statusFilter === status
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {status.toLowerCase()}
              </button>
            ),
          )}
        </div>
        <div className="flex gap-2">
          {(["ALL", "ENROLLMENT", "TOPUP"] as TypeFilter[]).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-lg px-3 py-1.5 text-xs capitalize ${
                typeFilter === type
                  ? "bg-white/15 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {type === "ALL"
                ? "All types"
                : type === "ENROLLMENT"
                  ? "Enrollments"
                  : "Top-ups"}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
        {loading ? (
          <p className="p-5 text-sm text-slate-400">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="p-5 text-sm text-slate-400">No requests found.</p>
        ) : (
          requests.map((request) => {
            const user: any = request.user;
            const course: any = request.course;

            return (
              <article key={request._id} className="space-y-4 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-300">
                        {request.type === "ENROLLMENT" ? (
                          <GraduationCap size={11} />
                        ) : (
                          <Coins size={11} />
                        )}
                        {request.type === "ENROLLMENT" ? "Enrollment" : "Top-up"}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          request.status === "PENDING"
                            ? "bg-amber-400/15 text-amber-300"
                            : request.status === "APPROVED"
                              ? "bg-emerald-400/15 text-emerald-300"
                              : "bg-red-400/15 text-red-300"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <p className="mt-2 font-medium">
                      {user?.firstName
                        ? `${user.firstName} ${user.lastName ?? ""}`
                        : "Unknown learner"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {user?.email ?? ""}
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      {request.type === "ENROLLMENT"
                        ? course?.title ?? "Unknown course"
                        : `${request.coinsRequested ?? 0} coins requested`}
                    </p>

                    {request.note ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Note: {request.note}
                      </p>
                    ) : null}

                    {request.status === "REJECTED" &&
                    request.rejectionReason ? (
                      <p className="mt-2 text-xs text-red-300">
                        Reason: {request.rejectionReason}
                      </p>
                    ) : null}

                    {request.status === "APPROVED" &&
                    request.coinsGranted != null ? (
                      <p className="mt-2 text-xs text-emerald-300">
                        Granted {request.coinsGranted} coins
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => setPreview(request.proofUrl)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10"
                    >
                      <ImageIcon size={15} /> View proof
                    </button>

                    {request.status === "PENDING" ? (
                      <>
                        <button
                          onClick={() => handleApprove(request)}
                          disabled={busyId === request._id}
                          className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
                        >
                          <Check size={14} className="inline -mt-0.5 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            setRejectingId(
                              rejectingId === request._id
                                ? null
                                : request._id,
                            )
                          }
                          className="rounded-lg bg-red-400/15 px-3 py-2 text-xs font-semibold text-red-200"
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                {rejectingId === request._id ? (
                  <div className="flex flex-col gap-2 rounded-xl border border-red-400/20 bg-red-400/5 p-3 sm:flex-row">
                    <input
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Reason for rejection..."
                      className="h-10 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-red-400/50"
                    />
                    <button
                      onClick={() => handleReject(request)}
                      disabled={busyId === request._id}
                      className="rounded-lg bg-red-400 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
                    >
                      Confirm reject
                    </button>
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>

      {preview ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setPreview(null)}
        >
          <button
            aria-label="Close preview"
            onClick={() => setPreview(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>
          {preview.toLowerCase().endsWith(".pdf") ? (
            <iframe
              src={preview}
              title="Payment proof"
              className="h-[85vh] w-[85vw] rounded-xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={preview}
              alt="Payment proof enlarged"
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
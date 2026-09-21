import { useEffect, useState } from "react";
import { getPayments, reviewPayment } from "../api/tutorial.api";

export default function TutorialAdminPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await getPayments();
        setPayments(result?.data ?? []);
      } catch (error) {
        setMessage("Unable to load payment requests.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleReview(paymentId: string, status: "approved" | "rejected") {
    try {
      const result = await reviewPayment(paymentId, status, status === "rejected" ? "Not eligible for this course." : "");
      setMessage(result?.message ?? "Review completed.");
      setPayments((prev) => prev.map((item) => item._id === paymentId ? { ...item, status } : item));
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Review failed.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin approval</p>
          <h1 className="mt-2 text-4xl font-bold">Review student payments</h1>
        </div>

        {message ? <p className="mb-6 text-sm text-cyan-300">{message}</p> : null}

        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-300">Loading payments…</p>
          ) : payments.length === 0 ? (
            <p className="text-slate-300">No payment requests yet.</p>
          ) : (
            payments.map((payment) => (
              <div key={payment._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold">User: {payment.userId}</p>
                    <p className="text-sm text-slate-300">Course: {payment.courseId}</p>
                    <p className="text-sm text-slate-300">Amount: PKR {payment.amount}</p>
                    <p className="text-sm text-slate-300">Method: {payment.paymentMethod}</p>
                    <p className="text-sm text-slate-300">Transaction: {payment.transactionId || "N/A"}</p>
                    <p className="text-sm text-slate-300">Status: {payment.status}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReview(payment._id, "approved")}
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(payment._id, "rejected")}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {payment.screenshotUrl ? (
                  <div className="mt-4">
                    <img src={payment.screenshotUrl} alt="Payment proof" className="h-40 rounded-xl border border-white/10 object-cover" />
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

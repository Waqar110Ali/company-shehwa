import { useEffect, useRef, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Coins,
  UploadCloud,
} from "lucide-react";

import {
  getMyEnrollmentRequests,
  getTutorialWallet,
  submitTopup,
  type TutorialPaymentRequest,
  type TutorialWallet,
} from "../api/tutorial.api";

export default function TutorialWalletPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [wallet, setWallet] = useState<TutorialWallet | null>(null);
  const [topupRequests, setTopupRequests] = useState<TutorialPaymentRequest[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [walletResult, requests] = await Promise.all([
        getTutorialWallet(),
        getMyEnrollmentRequests(),
      ]);
      setWallet(walletResult.data);
      setTopupRequests(requests.filter((r) => r.type === "TOPUP"));
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to load wallet.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const coins = Number(amount);

    if (!coins || coins < 1) {
      setError("Enter how many coins you'd like to top up.");
      return;
    }

    if (!file) {
      setError("Please attach your payment proof.");
      return;
    }

    try {
      setSubmitting(true);
      await submitTopup(coins, file, note.trim() || undefined);
      setSuccess(
        "Top-up request submitted. Coins will appear once an admin approves it.",
      );
      setAmount("");
      setNote("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await load();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Could not submit your request.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const pendingTopups = topupRequests.filter((r) => r.status === "PENDING");

  return (
    <section className="space-y-8 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Wallet
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Coins & top-ups
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Coins are spent to unlock lectures. Top up any time by submitting
          payment proof for admin review.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <Coins size={20} />
              <span className="text-sm font-semibold">Current balance</span>
            </div>
            <p className="mt-3 text-4xl font-bold">
              {loading ? "..." : wallet?.balance ?? 0}
            </p>
            <p className="mt-1 text-xs text-amber-200/70">coins</p>
          </div>

          {pendingTopups.length > 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-slate-300">
                Pending top-ups
              </p>
              <div className="mt-3 space-y-2">
                {pendingTopups.map((r) => (
                  <div
                    key={r._id}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
                  >
                    <span>{r.coinsRequested} coins</span>
                    <span className="text-xs text-amber-300">
                      Pending review
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
          >
            <p className="text-sm font-semibold">Request a top-up</p>

            {error ? (
              <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            ) : null}
            {success ? (
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                {success}
              </div>
            ) : null}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Coins requested
              </label>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="e.g. 500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Payment proof
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-4 py-4 text-xs text-slate-300 hover:border-cyan-400/40"
              >
                <UploadCloud size={16} />
                {file ? file.name : "Attach screenshot or PDF"}
              </button>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit top-up request"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-5">
            <p className="text-sm font-semibold">Transaction history</p>
          </div>
          <div className="max-h-[560px] divide-y divide-white/10 overflow-y-auto">
            {loading ? (
              <p className="p-5 text-sm text-slate-400">Loading...</p>
            ) : !wallet || wallet.transactions.length === 0 ? (
              <p className="p-5 text-sm text-slate-400">
                No transactions yet.
              </p>
            ) : (
              wallet.transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === "CREDIT" ? (
                      <ArrowUpCircle size={18} className="text-emerald-300" />
                    ) : (
                      <ArrowDownCircle size={18} className="text-red-300" />
                    )}
                    <div>
                      <p className="text-sm">{tx.reason}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(tx.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      tx.type === "CREDIT" ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {tx.type === "CREDIT" ? "+" : "-"}
                    {tx.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
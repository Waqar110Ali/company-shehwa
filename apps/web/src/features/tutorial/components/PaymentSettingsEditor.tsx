import { useEffect, useRef, useState } from "react";
import { QrCode, UploadCloud } from "lucide-react";

import {
  adminGetPaymentSettings,
  adminUpdatePaymentSettings,
  adminUploadQrCode,
  type TutorialPaymentSettings,
} from "../api/tutorial.api";

const empty: TutorialPaymentSettings = {
  qrCodeUrl: "",
  accountTitle: "",
  accountNumber: "",
  bankName: "",
  instructions: "",
};

export default function PaymentSettingsEditor({
  onClose,
}: {
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<TutorialPaymentSettings>(empty);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminGetPaymentSettings()
      .then((res) =>
        setForm({
          qrCodeUrl: res.data.qrCodeUrl ?? "",
          accountTitle: res.data.accountTitle ?? "",
          accountNumber: res.data.accountNumber ?? "",
          bankName: res.data.bankName ?? "",
          instructions: res.data.instructions ?? "",
        }),
      )
      .catch(() =>
        setMessage("Unable to load current payment settings."),
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleQrUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await adminUploadQrCode(file);
      setForm((prev) => ({ ...prev, qrCodeUrl: result.data.url }));
    } catch {
      setMessage("QR code upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      await adminUpdatePaymentSettings({
        qrCodeUrl: form.qrCodeUrl,
        accountTitle: form.accountTitle,
        accountNumber: form.accountNumber,
        bankName: form.bankName,
        instructions: form.instructions,
      });
      setMessage("Payment settings saved.");
    } catch {
      setMessage("Unable to save payment settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15">
            <QrCode className="text-cyan-300" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Payment Settings
            </h2>
            <p className="text-sm text-slate-400">
              Shown to students on the enrollment and wallet top-up pages.
            </p>
          </div>
        </div>

        {message ? (
          <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
            {message}
          </div>
        ) : null}

        {loading ? (
          <p className="mt-8 text-sm text-slate-400">Loading...</p>
        ) : (
          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Payment QR code
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleQrUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-8 text-center hover:border-cyan-400/40"
              >
                {form.qrCodeUrl ? (
                  <img
                    src={form.qrCodeUrl}
                    alt="Payment QR code"
                    className="h-40 w-40 rounded-lg bg-white object-contain p-2"
                  />
                ) : (
                  <>
                    <UploadCloud className="text-cyan-300" size={26} />
                    <span className="text-sm text-slate-300">
                      {uploading ? "Uploading..." : "Upload QR code image"}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">
                  Account title
                </label>
                <input
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                  value={form.accountTitle}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, accountTitle: e.target.value }))
                  }
                  placeholder="e.g. Shehwa Solutions"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">
                  Account number
                </label>
                <input
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                  value={form.accountNumber}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, accountNumber: e.target.value }))
                  }
                  placeholder="03xx-xxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Bank / wallet name
              </label>
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                value={form.bankName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bankName: e.target.value }))
                }
                placeholder="JazzCash / Easypaisa / Bank name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Instructions shown to students
              </label>
              <textarea
                className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                value={form.instructions}
                onChange={(e) =>
                  setForm((p) => ({ ...p, instructions: e.target.value }))
                }
                placeholder="Scan the QR code or transfer to the account above, then upload your receipt below."
              />
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save payment settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

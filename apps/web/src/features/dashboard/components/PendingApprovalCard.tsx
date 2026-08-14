import {
  Check,
  X,
  Clock,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  DashboardPendingApproval,
} from "../types/dashboard";

interface Props {
  approvals: DashboardPendingApproval[];
}

export default function PendingApprovals({
  approvals,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-3xl">
      <div className="mb-6 flex items-center gap-3">
        <Clock className="text-cyan-400" />

        <div>
          <h2 className="text-xl font-bold text-white">
            Pending Approvals
          </h2>

          <p className="text-sm text-slate-400">
            New employee registrations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {approvals.length === 0 ? (
          <p className="text-slate-400">
            No pending approvals.
          </p>
        ) : (
          approvals.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {user.role}
                  </p>
                </div>

                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-300">
                  {user.status}
                </span>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
                  <Check size={16} />

                  Approve
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                  <X size={16} />

                  Reject
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
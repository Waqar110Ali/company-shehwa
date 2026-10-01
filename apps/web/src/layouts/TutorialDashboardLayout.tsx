import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, Coins, GraduationCap, LogOut, Wallet } from "lucide-react";
import AuroraBackground from "@/components/effects/AuroraBackground";
import { clearAuth, getUser } from "@/features/auth/utils/auth-storage";
import { getTutorialWallet } from "@/features/tutorial/api/tutorial.api";

const links = [
  { label: "Courses", icon: BookOpen, path: "/tutorial/dashboard/courses" },
  { label: "My Courses", icon: GraduationCap, path: "/tutorial/dashboard/my-courses" },
  { label: "Wallet", icon: Wallet, path: "/tutorial/dashboard/wallet" },
];

export default function TutorialDashboardLayout() {
  const navigate = useNavigate();
  const user = getUser();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    getTutorialWallet()
      .then((result) => setBalance(result.data.balance))
      .catch(() => setBalance(null));
  }, []);

  function logout() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <AuroraBackground>
      <div className="flex min-h-screen bg-slate-950/40 text-white">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/70 p-6 lg:flex lg:flex-col">
          <div className="border-b border-white/10 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Shehwa Tutorials</p>
            <h1 className="mt-3 text-xl font-semibold">Learning portal</h1>
            <p className="mt-2 truncate text-sm text-slate-400">{user?.email ?? "Student account"}</p>
            {balance !== null ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-300">
                <Coins size={16} />
                {balance} coins
              </div>
            ) : null}
          </div>
          <nav className="mt-8 space-y-2">
            {links.map(({ label, icon: Icon, path }) => (
              <NavLink key={path} to={path} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
          <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-red-400/10 hover:text-red-300">
            <LogOut size={18} />
            Log out
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/40 px-6 py-4 lg:hidden">
            <span className="font-semibold">Shehwa Tutorials</span>
            <div className="flex items-center gap-3">
              {balance !== null ? (
                <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  <Coins size={13} />
                  {balance}
                </span>
              ) : null}
              <button onClick={logout} aria-label="Log out" className="text-slate-400"><LogOut size={18} /></button>
            </div>
          </div>
          <div className="mx-auto max-w-7xl p-6 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </AuroraBackground>
  );
}

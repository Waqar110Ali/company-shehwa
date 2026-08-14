import { motion } from "framer-motion";
import {
  Bot,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import NotificationBell from "@/features/notifications/components/NotificationBell";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <motion.header
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
sticky
top-0
z-40
border-b
border-white/10
bg-slate-950/40
backdrop-blur-3xl
"
    >
      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div className="flex items-center gap-5">

          <button className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 lg:hidden">
            <Menu size={20} className="text-white" />
          </button>

          <div>

            <h1 className="text-2xl font-black text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Welcome back, Waqar 👋
            </p>

          </div>

        </div>

        {/* Center */}

        <div className="hidden w-full max-w-xl lg:block">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              placeholder="Search projects, employees, files..."
              className="
h-12
w-full
rounded-2xl
border
border-white/10
bg-white/5
pl-14
pr-5
text-white
placeholder:text-slate-500
outline-none
transition-all
focus:border-cyan-400/40
focus:bg-white/10
"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <Link
            to="/dashboard/assistant"
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
          >

            <Bot
              size={20}
              className="text-cyan-300"
            />

          </Link>

          <NotificationBell />

          <Link
            to="/dashboard/settings"
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
          >

            <Settings
              size={20}
              className="text-white"
            />

          </Link>
          {/* User */}

          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-400/30">

            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="User"
              className="h-11 w-11 rounded-full border border-cyan-400/30"
            />

            <div className="hidden text-left xl:block">

              <p className="font-semibold text-white">
                Waqar Ali
              </p>

              <span className="text-sm text-slate-400">
                CEO
              </span>

            </div>

          </button>

        </div>

      </div>
    </motion.header>
  );
}
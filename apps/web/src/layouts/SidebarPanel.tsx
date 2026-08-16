import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

import Logo from "@/components/ui/Logo";
import { getUser, clearAuth } from "@/features/auth/utils/auth-storage";
import { logout as logoutApi } from "@/features/auth/api/auth.api";
import { appToast } from "@/lib/toast";

import { menu } from "./sidebarMenu";

interface Props {
  // Fired after a nav link or logout is clicked — used to close the
  // mobile Sheet drawer. No-op on the desktop sidebar.
  onNavigate?: () => void;
}

export default function SidebarPanel({ onNavigate }: Props) {
  const navigate = useNavigate();
  const user = getUser();

  const visibleMenu = menu
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.roles || (user && item.roles.includes(user.role)),
      ),
    }))
    .filter((section) => section.items.length > 0);

  async function handleLogout() {
    try {
      await logoutApi();
    } catch {
      // Even if the server call fails (e.g. token already expired),
      // still clear local auth and send the user to login.
    } finally {
      clearAuth();
      appToast.success("Logged out successfully.");
      onNavigate?.();
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-8">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-8">
        <div className="space-y-8">
          {visibleMenu.map((section) => (
            <div key={section.section}>
              <h4 className="mb-3 px-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {section.section}
              </h4>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink key={item.path} to={item.path} onClick={onNavigate}>
                      {({ isActive }) => (
                        <motion.div
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                            isActive
                              ? "border border-cyan-400/20 bg-cyan-500/10"
                              : "hover:bg-white/5"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute bottom-3 left-0 top-3 w-1 rounded-full bg-cyan-400"
                            />
                          )}

                          <Icon
                            size={20}
                            className={
                              isActive
                                ? "text-cyan-300"
                                : "text-slate-400 transition group-hover:text-white"
                            }
                          />

                          <span
                            className={
                              isActive
                                ? "font-medium text-white"
                                : "font-medium text-slate-400 transition group-hover:text-white"
                            }
                          >
                            {item.label}
                          </span>
                        </motion.div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
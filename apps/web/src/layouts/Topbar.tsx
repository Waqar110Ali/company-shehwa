// apps/web/src/layouts/Topbar.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Bot,
  ChevronDown,
  Loader2,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import NotificationBell from "@/features/notifications/components/NotificationBell";

import { api } from "@/lib/api";
import { appToast } from "@/lib/toast";
import {
  clearAuth,
  getUser,
} from "@/features/auth/utils/auth-storage";
import { logout as logoutApi } from "@/features/auth/api/auth.api";
import type { AuthUser } from "@/features/auth/types/auth";

import { employeesApi } from "@/features/employees/api/employees.api";
import { mapEmployee } from "@/features/employees/mapper/employee.mapper";
import type { Employee } from "@/features/employees/types/employee";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(getUser());
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // Global search
  // =====================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce so we don't fire a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const {
    data: searchResults = [],
    isFetching: searchLoading,
  } = useQuery({
    queryKey: ["global-search", "employees", debouncedQuery],

    queryFn: async () => {
      const response = await employeesApi.getAll({
        search: debouncedQuery,
        limit: 5,
      });

      const list =
        response.data?.items ??
        response.data?.data?.items ??
        [];

      return list.map(mapEmployee) as Employee[];
    },

    enabled: debouncedQuery.length > 1,
  });

  function goToEmployeeSearch(term: string) {
    const trimmed = term.trim();

    if (!trimmed) {
      return;
    }

    navigate(
      `/dashboard/employees?search=${encodeURIComponent(trimmed)}`,
    );

    setSearchOpen(false);
    searchInputRef.current?.blur();
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToEmployeeSearch(searchQuery);
  }

  function handleResultClick(employee: Employee) {
    // Search by email since it's unique — reliably surfaces just this
    // person on the employees list.
    goToEmployeeSearch(employee.email);
  }

  function clearSearch() {
    setSearchQuery("");
    setDebouncedQuery("");
    searchInputRef.current?.focus();
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setSearchOpen(false);
      searchInputRef.current?.blur();
    }
  }

  // Refresh from the server once so avatar/name/role are always
  // current, even if they changed since the last login.
  useEffect(() => {
    async function refreshUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.data);
      } catch {
        // Keep showing the cached user on failure.
      }
    }

    refreshUser();
  }, []);

  // Close the profile dropdown and/or search dropdown when clicking
  // anywhere outside them.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await logoutApi();
    } catch {
      // Even if the server call fails, still clear local auth.
    } finally {
      clearAuth();
      appToast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    }
  }

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Loading...";

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

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

          <button
            onClick={onMenuClick}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 lg:hidden"
          >
            <Menu size={20} className="text-white" />
          </button>

          <div>

            <h1 className="text-2xl font-black text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Welcome back, {user?.firstName ?? "..."} 👋
            </p>

          </div>

        </div>

        {/* Center — Search */}

        <div
          className="relative hidden w-full max-w-xl lg:block"
          ref={searchRef}
        >

          <form onSubmit={handleSearchSubmit}>

            <div className="relative">

              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 1) {
                    setSearchOpen(true);
                  }
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search projects, employees, files..."
                className="
h-12
w-full
rounded-2xl
border
border-white/10
bg-white/5
pl-14
pr-12
text-white
placeholder:text-slate-500
outline-none
transition-all
focus:border-cyan-400/40
focus:bg-white/10
"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              )}

            </div>

          </form>

          {searchOpen && debouncedQuery.length > 1 && (

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-[0_20px_60px_rgba(0,0,0,.5)]"
            >

              {searchLoading ? (

                <div className="flex items-center justify-center gap-2 py-6 text-sm text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  Searching...
                </div>

              ) : searchResults.length > 0 ? (

                <>
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Employees
                  </p>

                  {searchResults.map((employee) => (
                    <button
                      key={employee.id}
                      type="button"
                      onClick={() => handleResultClick(employee)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/5"
                    >
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {employee.name}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {employee.designation}
                        </p>
                      </div>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => goToEmployeeSearch(searchQuery)}
                    className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    View all results for "{searchQuery.trim()}"
                  </button>
                </>

              ) : (

                <p className="px-3 py-6 text-center text-sm text-slate-400">
                  No employees found for "{debouncedQuery}"
                </p>

              )}

            </motion.div>

          )}

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

          <div className="relative" ref={menuRef}>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-400/30"
            >

              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-11 w-11 rounded-full border border-cyan-400/30 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 font-semibold text-cyan-300">
                  {initials}
                </div>
              )}

              <div className="hidden text-left xl:block">

                <p className="font-semibold text-white">
                  {displayName}
                </p>

                <span className="text-sm text-slate-400">
                  {user?.role ?? ""}
                </span>

              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform xl:block ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />

            </button>

            {menuOpen && user && (

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,.5)]"
              >

                <div className="flex items-center gap-4">

                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="h-16 w-16 rounded-2xl border border-cyan-400/30 object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-xl font-semibold text-cyan-300">
                      {initials}
                    </div>
                  )}

                  <div>

                    <p className="text-lg font-bold text-white">
                      {displayName}
                    </p>

                    <p className="text-sm text-slate-400">
                      {user.email}
                    </p>

                  </div>

                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Role</span>
                    <span className="flex items-center gap-1 font-medium text-cyan-300">
                      <ShieldCheck size={14} />
                      {user.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Email Verified</span>
                    <span
                      className={
                        user.isVerified
                          ? "font-medium text-emerald-400"
                          : "font-medium text-yellow-400"
                      }
                    >
                      {user.isVerified ? "Verified" : "Pending"}
                    </span>
                  </div>

                  {user.employeeId && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Employee ID</span>
                      <span className="font-mono text-xs text-slate-300">
                        {user.employeeId}
                      </span>
                    </div>
                  )}

                </div>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-5">

                  <Link
                    to="/dashboard/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <Settings size={18} />
                    View Full Profile / Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>

              </motion.div>

            )}

          </div>

        </div>

      </div>
    </motion.header>
  );
}
import { useState } from "react";
import { BookOpen, ClipboardCheck } from "lucide-react";

import TutorialAdminCourses from "../pages/TutorialCoursesPage";
import TutorialAdminRequests from "../pages/TutorialAdminrequest";

type Tab = "requests" | "courses";

export default function TutorialAdminPage() {
  const [tab, setTab] = useState<Tab>("requests");

  return (
    <section className="space-y-8 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Tutorial operations
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Tutorial management
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Review payment requests and manage courses & lectures. This screen
          is separate from the rest of the student-facing app — students
          never see it.
        </p>
      </header>

      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab("requests")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
            tab === "requests"
              ? "border-cyan-400 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <ClipboardCheck size={16} />
          Payment requests
        </button>
        <button
          onClick={() => setTab("courses")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
            tab === "courses"
              ? "border-cyan-400 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen size={16} />
          Courses & lectures
        </button>
      </div>

      {tab === "requests" ? <TutorialAdminRequests /> : <TutorialAdminCourses />}
    </section>
  );
}
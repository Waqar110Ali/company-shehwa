import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coins, PlayCircle, Sparkles } from "lucide-react";

import { getUser } from "@/features/auth/utils/auth-storage";

import { listTutorialCourses, type TutorialCourseSummary } from "../api/tutorial.api";

export default function TutorialCoursesPage() {
  const navigate = useNavigate();
  const user = getUser();

  const [courses, setCourses] = useState<TutorialCourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);
    setError("");
    try {
      const result = await listTutorialCourses();
      setCourses(result.data ?? []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Unable to load courses right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEnroll(courseId: string) {
    if (!user) {
      navigate(
        `/login?redirect=${encodeURIComponent(
          `/tutorial/dashboard/payment/${courseId}`,
        )}`,
      );
      return;
    }

    navigate(`/tutorial/dashboard/payment/${courseId}`);
  }

  return (
    <section className="space-y-8 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Course catalog
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Browse courses
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Pick a course, submit your payment proof, and get access once an
          admin approves it. Lectures unlock one at a time using coins.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-400">Loading courses...</p>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-slate-400">
          No courses are published yet. Check back soon.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-slate-900/40">
                {course.thumbnailUrl ? (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PlayCircle className="text-cyan-300/70" size={40} />
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-400">
                  {course.description || "No description provided."}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    {course.videosCount} lectures
                  </span>
                  {course.freePreviewCount > 0 ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
                      <Sparkles size={12} />
                      {course.freePreviewCount} free preview
                    </span>
                  ) : null}
                  {course.coinsIncluded > 0 ? (
                    <span className="flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">
                      <Coins size={12} />
                      +{course.coinsIncluded} coins on approval
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-semibold text-cyan-300">
                    {course.priceLabel || "Contact for price"}
                  </span>
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Enroll now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!user ? (
        <p className="text-center text-xs text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/tutorial/register"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Register here
          </Link>
        </p>
      ) : null}
    </section>
  );
}

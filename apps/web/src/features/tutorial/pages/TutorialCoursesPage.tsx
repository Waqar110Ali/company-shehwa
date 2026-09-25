import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTutorialCourses, getTutorialMe } from "../api/tutorial.api";
import { getAccessToken } from "@/features/auth/utils/auth-storage";

export default function TutorialCoursesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get("userId") ?? "";
  const [userId, setUserId] = useState(queryUserId);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (getAccessToken()) {
          const profile = await getTutorialMe();
          setUserId(profile?.data?._id ?? "");
        }
        const result = await getTutorialCourses();
        setCourses(result?.data ?? []);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "Could not load courses.");
      }
    }

    load();
  }, []);

  const activeUserId = useMemo(() => userId.trim(), [userId]);

  async function handleEnroll(courseId: string) {
    if (!activeUserId) {
      navigate(`/login?redirect=${encodeURIComponent(`/tutorial/dashboard/courses?courseId=${courseId}`)}`);
      return;
    }

    setActionLoading(courseId);
    try {
      navigate(`/tutorial/dashboard/payment?userId=${activeUserId}&courseId=${courseId}`);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Enrollment failed.");
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Tutorial courses</p>
            <h1 className="mt-2 text-4xl font-bold">Choose your learning path</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/tutorial/register">
              <Button variant="secondary" className="rounded-full">New student</Button>
            </Link>
            <Link to={`/tutorial/dashboard/my-courses?userId=${activeUserId}`}>
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/5">
                My learning
              </Button>
            </Link>
          </div>
        </div>

        {error ? <p className="mb-6 text-sm text-red-400">{error}</p> : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div key={course._id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">Course</span>
                <span className="text-sm text-slate-300">{course.rewardCoins ?? 0} coins bonus</span>
              </div>

              <h2 className="mb-3 text-2xl font-semibold">{course.title}</h2>
              <p className="mb-5 text-sm text-slate-300">{course.description}</p>

              <div className="mb-5 space-y-2 text-sm text-slate-200">
                <div className="flex justify-between"><span>Price</span><strong>PKR {course.price}</strong></div>
                <div className="flex justify-between"><span>Lectures</span><strong>{course.lectures?.length ?? 0}</strong></div>
              </div>

              <div className="mb-5 rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-slate-300">
                {course.lectures?.slice(0, 2).map((lecture: any) => (
                  <div key={lecture._id} className="flex items-center justify-between py-1">
                    <span>{lecture.title}</span>
                    <span>{lecture.coinCost ?? 0} coins</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleEnroll(course._id)}
                disabled={actionLoading === course._id}
                className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                {actionLoading === course._id ? "Processing..." : activeUserId ? "Enroll now" : "Login to enroll"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

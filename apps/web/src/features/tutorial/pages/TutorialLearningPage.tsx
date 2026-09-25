import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTutorialProfile, getTutorialCourses, getTutorialMe, watchLecture } from "../api/tutorial.api";
import { getAccessToken } from "@/features/auth/utils/auth-storage";

export default function TutorialLearningPage() {
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get("userId") ?? "";
  const [userId, setUserId] = useState(queryUserId);
  const [profile, setProfile] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const resolvedUserId = userId || (getAccessToken() ? (await getTutorialMe())?.data?._id : "");
        if (!resolvedUserId) return;
        setUserId(resolvedUserId);
        const [profileResult, coursesResult] = await Promise.all([
          getTutorialProfile(resolvedUserId),
          getTutorialCourses(),
        ]);

        const user = profileResult?.data ?? null;
        setProfile(user);
        setCourses(coursesResult?.data ?? []);
        if ((coursesResult?.data ?? []).length) {
          setSelectedCourse((coursesResult.data[0]._id));
        }
      } catch (error: any) {
        setMessage(error?.response?.data?.message ?? "Could not load tutorial profile.");
      }
    }

    load();
  }, [userId]);

  const course = courses.find((item) => item._id === selectedCourse) ?? courses[0] ?? null;

  async function handleWatch(lectureId: string) {
    if (!userId || !course) return;

    try {
      const result = await watchLecture(userId, course._id, lectureId);
      setMessage(result?.message ?? "Lecture unlocked.");

      setCourses((prev) =>
        prev.map((item) =>
          item._id === course._id
            ? {
                ...item,
                lectures: item.lectures.map((lecture: any) =>
                  lecture._id === lectureId ? { ...lecture, watched: true } : lecture,
                ),
              }
            : item,
        ),
      );

      const updatedProfile = await getTutorialProfile(userId);
      setProfile(updatedProfile?.data ?? null);
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? "Lecture could not be unlocked.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Student portal</p>
            <h1 className="mt-2 text-4xl font-bold">Your learning dashboard</h1>
          </div>
          <Link to="/tutorial/courses" className="text-sm text-cyan-300 hover:text-cyan-200">Browse courses</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 text-2xl font-semibold">{profile?.status ?? "pending"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Coins</p>
            <p className="mt-2 text-2xl font-semibold">{profile?.coins ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Access</p>
            <p className="mt-2 text-2xl font-semibold">{profile?.hasAccess ? "Active" : "Locked"}</p>
          </div>
        </div>

        {message ? <p className="text-sm text-cyan-300">{message}</p> : null}

        {course ? (
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              {courses.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedCourse(item._id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${selectedCourse === item._id ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-white/10 bg-slate-900 text-slate-300"}`}
                >
                  {item.title}
                </button>
              ))}
            </aside>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="mb-4 text-2xl font-semibold">{course.title}</h2>
              <p className="mb-5 text-slate-300">{course.description}</p>

              <div className="space-y-3">
                {(course.lectures ?? []).map((lecture: any) => (
                  <div key={lecture._id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium">{lecture.title}</p>
                      <p className="text-sm text-slate-400">{lecture.duration} min • {lecture.coinCost ?? 0} coins</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-slate-800 px-2 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                        {lecture.watched ? "watched" : lecture.isUnlocked ? "ready" : "locked"}
                      </span>
                      <Button
                        onClick={() => handleWatch(lecture._id)}
                        disabled={lecture.watched || !lecture.isUnlocked}
                        className="rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                      >
                        {lecture.watched ? "Completed" : "Watch"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-300">No courses available yet.</p>
        )}
      </div>
    </main>
  );
}

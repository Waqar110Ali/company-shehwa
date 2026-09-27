// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { getTutorialCourses, getTutorialMe } from "../api/tutorial.api";
// import { getAccessToken } from "@/features/auth/utils/auth-storage";

// export default function TutorialCoursesPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const queryUserId = searchParams.get("userId") ?? "";
//   const [userId, setUserId] = useState(queryUserId);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState<string | null>(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         if (getAccessToken()) {
//           const profile = await getTutorialMe();
//           setUserId(profile?.data?._id ?? "");
//         }
//         const result = await getTutorialCourses();
//         setCourses(result?.data ?? []);
//       } catch (err: any) {
//         setError(err?.response?.data?.message ?? "Could not load courses.");
//       }
//     }

//     load();
//   }, []);

//   const activeUserId = useMemo(() => userId.trim(), [userId]);

//   async function handleEnroll(courseId: string) {
//     if (!activeUserId) {
//       navigate(`/login?redirect=${encodeURIComponent(`/tutorial/dashboard/courses?courseId=${courseId}`)}`);
//       return;
//     }

//     setActionLoading(courseId);
//     try {
//             navigate(`/tutorial/payment?userId=${activeUserId}&courseId=${courseId}`);
//     } catch (err: any) {
//       setError(err?.response?.data?.message ?? "Enrollment failed.");
//     } finally {
//       setActionLoading(null);
//     }
//   }

//   return (
//     <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Tutorial courses</p>
//             <h1 className="mt-2 text-4xl font-bold">Choose your learning path</h1>
//           </div>
//           <div className="flex gap-3">
//             <Link to="/tutorial/register">
//               <Button variant="secondary" className="rounded-full">New student</Button>
//             </Link>
//                         <Link to={`/tutorial/learning?userId=${activeUserId}`}>
//               <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/5">
//                 My learning
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {error ? <p className="mb-6 text-sm text-red-400">{error}</p> : null}

//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {courses.map((course) => (
//             <div key={course._id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10">
//               <div className="mb-4 flex items-center justify-between gap-3">
//                 <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">Course</span>
//                 <span className="text-sm text-slate-300">{course.rewardCoins ?? 0} coins bonus</span>
//               </div>

//               <h2 className="mb-3 text-2xl font-semibold">{course.title}</h2>
//               <p className="mb-5 text-sm text-slate-300">{course.description}</p>

//               <div className="mb-5 space-y-2 text-sm text-slate-200">
//                 <div className="flex justify-between"><span>Price</span><strong>PKR {course.price}</strong></div>
//                 <div className="flex justify-between"><span>Lectures</span><strong>{course.lectures?.length ?? 0}</strong></div>
//               </div>

//               <div className="mb-5 rounded-xl border border-white/10 bg-slate-900 p-3 text-sm text-slate-300">
//                 {course.lectures?.slice(0, 2).map((lecture: any) => (
//                   <div key={lecture._id} className="flex items-center justify-between py-1">
//                     <span>{lecture.title}</span>
//                     <span>{lecture.coinCost ?? 0} coins</span>
//                   </div>
//                 ))}
//               </div>

//               <Button
//                 onClick={() => handleEnroll(course._id)}
//                 disabled={actionLoading === course._id}
//                 className="w-full rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"
//               >
//                 {actionLoading === course._id ? "Processing..." : activeUserId ? "Enroll now" : "Login to enroll"}
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock3, GraduationCap, PlayCircle, XCircle } from "lucide-react";

import {
  getMyEnrollmentRequests,
  getMyTutorialCourses,
  type TutorialMyCourse,
  type TutorialPaymentRequest,
} from "../api/tutorial.api";

export default function TutorialLearningPage() {
  const [courses, setCourses] = useState<TutorialMyCourse[]>([]);
  const [requests, setRequests] = useState<TutorialPaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [myCourses, myRequests] = await Promise.all([
        getMyTutorialCourses(),
        getMyEnrollmentRequests(),
      ]);
      setCourses(myCourses ?? []);
      setRequests(
        (myRequests ?? []).filter((r) => r.type === "ENROLLMENT"),
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Unable to load your courses.",
      );
    } finally {
      setLoading(false);
    }
  }

  const pendingOrRejected = requests.filter((r) => r.status !== "APPROVED");

  return (
    <section className="space-y-8 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Your learning
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          My courses
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Courses you have full access to. Enroll in more from the catalog.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <>
          {courses.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-slate-400">
              You don&apos;t have access to any course yet.{" "}
              <Link
                to="/tutorial/dashboard/courses"
                className="font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Browse the catalog
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map(({ enrollmentId, course }) => (
                <Link
                  key={enrollmentId}
                  to={`/tutorial/dashboard/my-courses/${course.id}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-cyan-400/40"
                >
                  <div className="flex h-32 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-slate-900/40">
                    {course.thumbnailUrl ? (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="text-cyan-300/70" size={32} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-semibold">{course.title}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {course.videosCount} lectures
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
                      <PlayCircle size={14} />
                      Continue learning
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pendingOrRejected.length > 0 ? (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-slate-300">
                Pending / past requests
              </h2>
              <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
                {pendingOrRejected.map((request) => {
                  const courseTitle =
                    typeof request.course === "object" && request.course
                      ? request.course.title
                      : "Course";

                  return (
                    <div
                      key={request._id}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{courseTitle}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                        {request.status === "REJECTED" &&
                        request.rejectionReason ? (
                          <p className="mt-1 text-xs text-red-300">
                            {request.rejectionReason}
                          </p>
                        ) : null}
                      </div>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          request.status === "PENDING"
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {request.status === "PENDING" ? (
                          <Clock3 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {request.status === "PENDING"
                          ? "Pending review"
                          : "Rejected"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Coins,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import {
  getTutorialCourseDetail,
  getTutorialWallet,
  watchTutorialVideo,
  type TutorialCourseDetail,
  type TutorialCourseVideo,
} from "../api/tutorial.api";

export default function TutorialCourseLearnPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<TutorialCourseDetail | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<TutorialCourseVideo | null>(
    null,
  );
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!courseId) return;
    load();
  }, [courseId]);

  async function load() {
    if (!courseId) return;
    setLoading(true);
    setError("");
    try {
      const [detail, wallet] = await Promise.all([
        getTutorialCourseDetail(courseId),
        getTutorialWallet(),
      ]);
      setCourse(detail);
      setBalance(wallet.data.balance);

      const firstUnlocked = detail.videos.find((v) => v.unlocked);
      if (firstUnlocked) {
        setActiveVideo(firstUnlocked);
        setActiveUrl(firstUnlocked.videoUrl);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Unable to load this course.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleVideoClick(video: TutorialCourseVideo) {
    if (!courseId) return;
    setError("");

    if (video.unlocked) {
      setActiveVideo(video);
      setActiveUrl(video.videoUrl);
      return;
    }

    if (balance !== null && video.coinCost > balance) {
      setError(
        `You need ${video.coinCost} coins to unlock this lecture (you have ${balance}). Top up your wallet to continue.`,
      );
      return;
    }

    try {
      setUnlocking(video.id);
      const result = await watchTutorialVideo(courseId, video.id);
      setActiveVideo({ ...video, unlocked: true, videoUrl: result.data.videoUrl });
      setActiveUrl(result.data.videoUrl);
      setBalance((prev) =>
        prev === null ? prev : prev - video.coinCost,
      );
      setCourse((prev) =>
        prev
          ? {
              ...prev,
              videos: prev.videos.map((v) =>
                v.id === video.id
                  ? { ...v, unlocked: true, videoUrl: result.data.videoUrl }
                  : v,
              ),
            }
          : prev,
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Could not unlock this lecture.",
      );
    } finally {
      setUnlocking(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading course...</p>;
  }

  if (!course) {
    return (
      <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
        {error || "Course not found."}
      </div>
    );
  }

  if (course.enrollmentStatus !== "ACTIVE") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <p className="text-sm text-slate-400">
          You don&apos;t have access to this course yet.
        </p>
        <Link
          to={`/tutorial/dashboard/payment/${course.id}`}
          className="mt-4 inline-block rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950"
        >
          Enroll now
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6 text-white">
      <Link
        to="/tutorial/dashboard/my-courses"
        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white"
      >
        <ArrowLeft size={14} />
        Back to my courses
      </Link>

      <header className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {course.title}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {course.description}
          </p>
        </div>
        {balance !== null ? (
          <span className="flex items-center gap-2 self-start rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
            <Coins size={16} />
            {balance} coins
          </span>
        ) : null}
      </header>

      {error ? (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          {activeUrl ? (
            <video
              key={activeUrl}
              src={activeUrl}
              controls
              className="aspect-video w-full bg-black"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center text-sm text-slate-500">
              Select a lecture to start watching.
            </div>
          )}
          {activeVideo ? (
            <div className="border-t border-white/10 p-4">
              <p className="font-semibold">{activeVideo.title}</p>
              {activeVideo.description ? (
                <p className="mt-1 text-sm text-slate-400">
                  {activeVideo.description}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-4">
            <p className="text-sm font-semibold">Lectures</p>
          </div>
          <div className="max-h-[520px] divide-y divide-white/10 overflow-y-auto">
            {course.videos.map((video) => {
              const isActive = activeVideo?.id === video.id;
              const isFree = video.coinCost === 0;

              return (
                <button
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  disabled={unlocking === video.id}
                  className={`flex w-full items-center justify-between gap-3 p-4 text-left transition ${
                    isActive ? "bg-cyan-400/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {video.unlocked ? (
                      <PlayCircle
                        size={18}
                        className={
                          isActive ? "text-cyan-300" : "text-slate-400"
                        }
                      />
                    ) : (
                      <Lock size={16} className="text-slate-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{video.title}</p>
                      <p className="text-xs text-slate-500">
                        {video.durationMinutes} min
                      </p>
                    </div>
                  </div>

                  {isFree ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      <Sparkles size={10} />
                      Free
                    </span>
                  ) : video.unlocked ? (
                    <span className="text-[10px] font-semibold text-slate-500">
                      Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                      <Coins size={10} />
                      {unlocking === video.id
                        ? "Unlocking..."
                        : `${video.coinCost} coins`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

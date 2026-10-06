import { useEffect, useRef, useState } from "react";
import {
  Coins,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
  UploadCloud,
  Video,
  X,
} from "lucide-react";

import {
  adminAddVideo,
  adminCreateCourse,
  adminDeleteCourse,
  adminListCourses,
  adminRemoveVideo,
  adminUpdateCourse,
  adminUpdateVideo,
  adminUploadThumbnail,
  adminUploadVideo,
} from "../api/tutorial.api";

const emptyCourseForm = {
  title: "",
  description: "",
  priceLabel: "",
  coinsIncluded: 0,
  thumbnailUrl: "",
  isPublished: false,
};

const emptyVideoForm = {
  title: "",
  description: "",
  videoUrl: "",
  cloudinaryPublicId: "",
  durationMinutes: 0,
  coinCost: 0,
};

export default function TutorialAdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [courseForm, setCourseForm] = useState(emptyCourseForm);
  const [savingCourse, setSavingCourse] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [videoManagerCourse, setVideoManagerCourse] = useState<any | null>(
    null,
  );

  async function load() {
    setLoading(true);
    try {
      const result = await adminListCourses();
      setCourses(result.data ?? []);
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Unable to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingCourse(null);
    setCourseForm(emptyCourseForm);
    setCourseModalOpen(true);
  }

  function openEdit(course: any) {
    setEditingCourse(course);
    setCourseForm({
      title: course.title ?? "",
      description: course.description ?? "",
      priceLabel: course.priceLabel ?? "",
      coinsIncluded: course.coinsIncluded ?? 0,
      thumbnailUrl: course.thumbnailUrl ?? "",
      isPublished: !!course.isPublished,
    });
    setCourseModalOpen(true);
  }

  async function handleThumbnailUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingThumbnail(true);
      const result = await adminUploadThumbnail(file);
      setCourseForm((prev) => ({ ...prev, thumbnailUrl: result.data.url }));
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ?? "Thumbnail upload failed.",
      );
    } finally {
      setUploadingThumbnail(false);
    }
  }

  async function handleSaveCourse(e: React.FormEvent) {
    e.preventDefault();

    if (!courseForm.title.trim()) {
      setMessage("Course title is required.");
      return;
    }

    try {
      setSavingCourse(true);
      if (editingCourse) {
        await adminUpdateCourse(editingCourse._id, courseForm);
        setMessage("Course updated.");
      } else {
        await adminCreateCourse(courseForm);
        setMessage("Course created.");
      }
      setCourseModalOpen(false);
      await load();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Could not save course.");
    } finally {
      setSavingCourse(false);
    }
  }

  async function handleDeleteCourse(course: any) {
    if (!confirm(`Delete "${course.title}"? This cannot be undone.`)) return;

    try {
      await adminDeleteCourse(course._id);
      setMessage("Course deleted.");
      await load();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Could not delete course.");
    }
  }

  async function handleTogglePublish(course: any) {
    try {
      await adminUpdateCourse(course._id, {
        isPublished: !course.isPublished,
      });
      await load();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Could not update course.");
    }
  }

  return (
    <div className="space-y-6">
      {message ? (
        <div className="flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
          {message}
          <button onClick={() => setMessage("")} className="text-cyan-300">
            <X size={14} />
          </button>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {courses.length} course{courses.length === 1 ? "" : "s"}
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-300"
        >
          <Plus size={14} />
          New course
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading courses...</p>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-slate-400">
          No courses yet. Create your first one.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-cyan-500/20 to-slate-900/40">
                {course.thumbnailUrl ? (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-cyan-300/60" size={26} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold">{course.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      course.isPublished
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-slate-400/15 text-slate-400"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {course.videos?.length ?? 0} lectures ·{" "}
                  {course.priceLabel || "no price set"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setVideoManagerCourse(course)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
                  >
                    <Video size={13} />
                    Lectures
                  </button>
                  <button
                    onClick={() => openEdit(course)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleTogglePublish(course)}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
                  >
                    {course.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="flex items-center gap-1.5 rounded-lg border border-red-400/20 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Course create/edit modal ================= */}
      {courseModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setCourseModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {editingCourse ? "Edit course" : "New course"}
              </h3>
              <button
                onClick={() => setCourseModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Title
                </label>
                <input
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Price label
                  </label>
                  <input
                    value={courseForm.priceLabel}
                    onChange={(e) =>
                      setCourseForm((p) => ({
                        ...p,
                        priceLabel: e.target.value,
                      }))
                    }
                    placeholder="PKR 2,500"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Coins on approval
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={courseForm.coinsIncluded}
                    onChange={(e) =>
                      setCourseForm((p) => ({
                        ...p,
                        coinsIncluded: Number(e.target.value),
                      }))
                    }
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Thumbnail
                </label>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-4 py-4 text-xs text-slate-300 hover:border-cyan-400/40"
                >
                  {courseForm.thumbnailUrl ? (
                    <img
                      src={courseForm.thumbnailUrl}
                      alt="Thumbnail"
                      className="h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      {uploadingThumbnail
                        ? "Uploading..."
                        : "Upload thumbnail image"}
                    </>
                  )}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={courseForm.isPublished}
                  onChange={(e) =>
                    setCourseForm((p) => ({
                      ...p,
                      isPublished: e.target.checked,
                    }))
                  }
                  className="rounded border-white/20 bg-transparent"
                />
                Published (visible to students)
              </label>

              <button
                type="submit"
                disabled={savingCourse}
                className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
              >
                {savingCourse ? "Saving..." : "Save course"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* ================= Video manager modal ================= */}
      {videoManagerCourse ? (
        <VideoManagerModal
          course={videoManagerCourse}
          onClose={() => setVideoManagerCourse(null)}
          onChanged={load}
        />
      ) : null}
    </div>
  );
}

// ============================================================
// Video (lecture) manager — add / edit / delete videos on a course
// ============================================================

function VideoManagerModal({
  course,
  onClose,
  onChanged,
}: {
  course: any;
  onClose: () => void;
  onChanged: () => Promise<void> | void;
}) {
  const [videos, setVideos] = useState<any[]>(course.videos ?? []);
  const [form, setForm] = useState(emptyVideoForm);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const videoInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setForm(emptyVideoForm);
    setEditingVideoId(null);
  }

  function editVideo(video: any) {
    setEditingVideoId(video._id);
    setForm({
      title: video.title ?? "",
      description: video.description ?? "",
      videoUrl: video.videoUrl ?? "",
      cloudinaryPublicId: video.cloudinaryPublicId ?? "",
      durationMinutes: video.durationMinutes ?? 0,
      coinCost: video.coinCost ?? 0,
    });
  }

  async function handleVideoFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingVideo(true);
      const result = await adminUploadVideo(file);
      setForm((p) => ({
        ...p,
        videoUrl: result.data.url,
        cloudinaryPublicId: result.data.publicId,
        durationMinutes:
          result.data.durationMinutes ?? p.durationMinutes,
      }));
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? err?.message ?? "Video upload failed.");
    } finally {
      setUploadingVideo(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (uploadingVideo) return;

    if (!form.title.trim() || !form.videoUrl.trim()) {
      setMessage("Title and video URL are required.");
      return;
    }

    try {
      setSaving(true);
      let updatedCourse;
      if (editingVideoId) {
        const result = await adminUpdateVideo(
          course._id,
          editingVideoId,
          form,
        );
        updatedCourse = result.data;
        setMessage("Lecture updated.");
      } else {
        const result = await adminAddVideo(course._id, form);
        updatedCourse = result.data;
        setMessage("Lecture added.");
      }
      setVideos(updatedCourse.videos ?? []);
      resetForm();
      await onChanged();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Could not save lecture.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(video: any) {
    if (!confirm(`Delete lecture "${video.title}"?`)) return;

    try {
      const result = await adminRemoveVideo(course._id, video._id);
      setVideos(result.data.videos ?? []);
      await onChanged();
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Could not delete lecture.");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="grid max-h-[85vh] w-full max-w-3xl grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Lectures — {course.title}
            </h3>
            <p className="text-xs text-slate-400">
              Set a coin cost of 0 for a free preview lecture.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="grid overflow-hidden lg:grid-cols-[1fr_1.1fr]">
          <div className="overflow-y-auto border-r border-white/10 p-5">
            {message ? (
              <div className="mb-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                {message}
              </div>
            ) : null}

            {videos.length === 0 ? (
              <p className="text-sm text-slate-400">No lectures yet.</p>
            ) : (
              <div className="space-y-2">
                {[...videos]
                  .sort((a, b) => a.order - b.order)
                  .map((video) => (
                    <div
                      key={video._id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {video.title}
                        </p>
                        <p className="flex items-center gap-2 text-xs text-slate-500">
                          {video.durationMinutes}min ·{" "}
                          {video.coinCost === 0 ? (
                            <span className="text-emerald-300">Free</span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-300">
                              <Coins size={11} />
                              {video.coinCost}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => editVideo(video)}
                          className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(video)}
                          className="rounded-lg border border-red-400/20 p-2 text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 overflow-y-auto p-5"
          >
            <p className="text-sm font-semibold text-slate-300">
              {editingVideoId ? "Edit lecture" : "Add a lecture"}
            </p>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Video
              </label>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                disabled={uploadingVideo || saving}
                onChange={handleVideoFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={uploadingVideo || saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-xs text-slate-300 hover:border-cyan-400/40"
              >
                <UploadCloud size={14} />
                {uploadingVideo
                  ? "Uploading..."
                  : form.videoUrl
                    ? "Replace uploaded video"
                    : "Upload a video file"}
              </button>
              <p className="mt-2 text-[11px] text-slate-500">
                or paste an external video URL below (e.g. hosted elsewhere)
              </p>
              <input
                value={form.videoUrl}
                disabled={uploadingVideo || saving}
                onChange={(e) =>
                  setForm((p) => ({ ...p, videoUrl: e.target.value, cloudinaryPublicId: "" }))
                }
                placeholder="https://..."
                className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.durationMinutes}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      durationMinutes: Number(e.target.value),
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Coin cost (0 = free)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.coinCost}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      coinCost: Number(e.target.value),
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-cyan-400/50"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving || uploadingVideo}
                className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingVideoId
                    ? "Update lecture"
                    : "Add lecture"}
              </button>
              {editingVideoId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

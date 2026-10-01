import { api } from "@/lib/api";

// ========================================================
// Types
// ========================================================

export interface TutorialCourseSummary {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  priceLabel: string;
  coinsIncluded: number;
  videosCount: number;
  freePreviewCount: number;
}

export interface TutorialCourseVideo {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  coinCost: number;
  order: number;
  videoUrl: string | null;
  unlocked: boolean;
}

export interface TutorialCourseDetail {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  priceLabel: string;
  coinsIncluded: number;
  enrollmentStatus: "NONE" | "PENDING" | "ACTIVE" | "REJECTED";
  videos: TutorialCourseVideo[];
}

export interface TutorialPaymentRequest {
  _id: string;
  user: string;
  type: "ENROLLMENT" | "TOPUP";
  course?: { _id: string; title: string; thumbnailUrl?: string } | string | null;
  coinsRequested?: number | null;
  coinsGranted?: number | null;
  note: string;
  proofUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewNote?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface TutorialMyCourse {
  enrollmentId: string;
  approvedAt: string | null;
  course: {
    id: string;
    title: string;
    thumbnailUrl: string;
    videosCount: number;
  };
}

export interface TutorialCoinTransaction {
  _id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  reason: string;
  createdAt: string;
}

export interface TutorialWallet {
  balance: number;
  transactions: TutorialCoinTransaction[];
}

export interface TutorialPaymentSettings {
  qrCodeUrl: string;
  accountTitle: string;
  accountNumber: string;
  bankName: string;
  instructions: string;
}

// ========================================================
// Public
// ========================================================

export async function registerTutorialStudent(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | undefined;
}) {
  const response = await api.post("/tutorials/register", data);
  return response.data as {
    success: boolean;
    message: string;
    data: { email: string };
  };
}

export async function listTutorialCourses() {
  const response = await api.get("/tutorials/courses");
  return response.data as {
    success: boolean;
    data: TutorialCourseSummary[];
  };
}

export async function getTutorialPaymentSettings() {
  const response = await api.get("/tutorials/payment-settings");
  return response.data as {
    success: boolean;
    data: TutorialPaymentSettings;
  };
}

// ========================================================
// Authenticated student
// ========================================================

export async function getTutorialCourseDetail(courseId: string) {
  const response = await api.get(`/tutorials/courses/${courseId}`);
  return response.data as TutorialCourseDetail;
}

export async function submitEnrollment(
  courseId: string,
  proof: File,
  note?: string,
) {
  const form = new FormData();
  form.append("courseId", courseId);
  if (note) form.append("note", note);
  form.append("proof", proof);

  const response = await api.post("/tutorials/enrollments", form);
  return response.data as {
    success: boolean;
    message: string;
    data: TutorialPaymentRequest;
  };
}

export async function getMyEnrollmentRequests() {
  const response = await api.get("/tutorials/enrollments/me");
  return response.data as TutorialPaymentRequest[];
}

export async function getMyTutorialCourses() {
  const response = await api.get("/tutorials/my-courses");
  return response.data as TutorialMyCourse[];
}

export async function getTutorialWallet() {
  const response = await api.get("/tutorials/wallet");
  return response.data as { success: boolean; data: TutorialWallet };
}

export async function submitTopup(
  coinsRequested: number,
  proof: File,
  note?: string,
) {
  const form = new FormData();
  form.append("coinsRequested", String(coinsRequested));
  if (note) form.append("note", note);
  form.append("proof", proof);

  const response = await api.post("/tutorials/wallet/topup", form);
  return response.data as {
    success: boolean;
    message: string;
    data: TutorialPaymentRequest;
  };
}

export async function watchTutorialVideo(courseId: string, videoId: string) {
  const response = await api.post(
    `/tutorials/courses/${courseId}/videos/${videoId}/watch`,
  );
  return response.data as {
    success: boolean;
    data: { videoUrl: string; unlocked: boolean };
  };
}

// ========================================================
// Admin
// ========================================================

export async function adminListCourses() {
  const response = await api.get("/tutorials/admin/courses");
  return response.data as { success: boolean; data: any[] };
}

export async function adminGetCourse(id: string) {
  const response = await api.get(`/tutorials/admin/courses/${id}`);
  return response.data as any;
}

export async function adminCreateCourse(data: {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  priceLabel?: string;
  coinsIncluded?: number;
  isPublished?: boolean;
}) {
  const response = await api.post("/tutorials/admin/courses", data);
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminUpdateCourse(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    thumbnailUrl: string;
    priceLabel: string;
    coinsIncluded: number;
    isPublished: boolean;
  }>,
) {
  const response = await api.patch(`/tutorials/admin/courses/${id}`, data);
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminDeleteCourse(id: string) {
  const response = await api.delete(`/tutorials/admin/courses/${id}`);
  return response.data as { success: boolean; message: string };
}

export async function adminUploadThumbnail(file: File) {
  const form = new FormData();
  form.append("file", file);
  const response = await api.post("/tutorials/admin/upload-thumbnail", form);
  return response.data as { success: boolean; data: { url: string } };
}

export async function adminUploadVideo(file: File) {
  const form = new FormData();
  form.append("file", file);
  const response = await api.post("/tutorials/admin/upload-video", form);
  return response.data as {
    success: boolean;
    data: { url: string; durationMinutes?: number };
  };
}

export async function adminAddVideo(
  courseId: string,
  data: {
    title: string;
    description?: string;
    videoUrl: string;
    durationMinutes: number;
    coinCost: number;
    order?: number;
  },
) {
  const response = await api.post(
    `/tutorials/admin/courses/${courseId}/videos`,
    data,
  );
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminUpdateVideo(
  courseId: string,
  videoId: string,
  data: Partial<{
    title: string;
    description: string;
    videoUrl: string;
    durationMinutes: number;
    coinCost: number;
    order: number;
  }>,
) {
  const response = await api.patch(
    `/tutorials/admin/courses/${courseId}/videos/${videoId}`,
    data,
  );
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminRemoveVideo(courseId: string, videoId: string) {
  const response = await api.delete(
    `/tutorials/admin/courses/${courseId}/videos/${videoId}`,
  );
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminListRequests(filter?: {
  status?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
  type?: "ENROLLMENT" | "TOPUP" | undefined;
}) {
  const response = await api.get("/tutorials/admin/requests", {
    params: filter,
  });
  return response.data as TutorialPaymentRequest[];
}

export async function adminApproveRequest(
  id: string,
  data?: { coinsGranted?: number; note?: string },
) {
  const response = await api.patch(
    `/tutorials/admin/requests/${id}/approve`,
    data ?? {},
  );
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminRejectRequest(id: string, reason: string) {
  const response = await api.patch(
    `/tutorials/admin/requests/${id}/reject`,
    { reason },
  );
  return response.data as { success: boolean; message: string; data: any };
}

export async function adminGetPaymentSettings() {
  const response = await api.get("/tutorials/admin/payment-settings");
  return response.data as {
    success: boolean;
    data: TutorialPaymentSettings;
  };
}

export async function adminUpdatePaymentSettings(
  data: Partial<TutorialPaymentSettings>,
) {
  const response = await api.patch(
    "/tutorials/admin/payment-settings",
    data,
  );
  return response.data as {
    success: boolean;
    message: string;
    data: TutorialPaymentSettings;
  };
}

export async function adminUploadQrCode(file: File) {
  const form = new FormData();
  form.append("file", file);
  const response = await api.post("/tutorials/admin/upload-qr-code", form);
  return response.data as { success: boolean; data: { url: string } };
}

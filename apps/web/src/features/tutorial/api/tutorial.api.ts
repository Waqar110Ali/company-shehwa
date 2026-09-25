import { api } from "@/lib/api";

export async function registerTutorialUser(payload: {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
}) {
  const response = await api.post("/tutorial/register", payload);
  return response.data;
}

export async function getTutorialCourses() {
  const response = await api.get("/tutorial/courses");
  return response.data;
}

export async function getTutorialMe() {
  const response = await api.get("/tutorial/me");
  return response.data;
}

export async function enrollCourse(userId: string, courseId: string) {
  const response = await api.post("/tutorial/enroll", {
    userId,
    courseId,
  });
  return response.data;
}

export async function submitPayment(payload: {
  userId: string;
  courseId: string;
  amount: number;
  paymentMethod: string;
  screenshotUrl?: string;
}) {
  const response = await api.post("/tutorial/payment/submit", payload);
  return response.data;
}

export async function getPayments(userId?: string) {
  const response = await api.get("/tutorial/payments", {
    params: userId ? { userId } : {},
  });
  return response.data;
}

export async function getTutorialAdminOverview() {
  const response = await api.get("/tutorial/admin-overview");
  return response.data;
}

export async function reviewPayment(
  paymentId: string,
  status: "approved" | "rejected",
  rejectionReason?: string,
  reviewedBy = "admin",
) {
  const response = await api.post(`/tutorial/payments/${paymentId}/review`, {
    status,
    rejectionReason,
    reviewedBy,
  });
  return response.data;
}

export async function getTutorialProfile(userId: string) {
  const response = await api.get("/tutorial/profile", {
    params: { userId },
  });
  return response.data;
}

export async function watchLecture(userId: string, courseId: string, lectureId: string) {
  const response = await api.post("/tutorial/lecture/watch", {
    userId,
    courseId,
    lectureId,
  });
  return response.data;
}

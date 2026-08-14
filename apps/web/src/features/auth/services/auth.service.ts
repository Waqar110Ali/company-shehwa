import { api } from "@/lib/api";

export async function login(data: {
  email: string;
  password: string;
}) {
  return api.post("/auth/login", data);
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api.post("/auth/register", data);
}

export async function me() {
  return api.get("/auth/me");
}
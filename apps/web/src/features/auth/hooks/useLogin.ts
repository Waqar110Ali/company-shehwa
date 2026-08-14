import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { appToast } from "@/lib/toast";

import { login } from "../api/auth.api";

import { saveAuth } from "../utils/auth-storage";

import type {
  LoginDto,
  LoginResponse,
} from "../types/auth";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation<
    LoginResponse,
    any,
    LoginDto
  >({
    mutationFn: login,

    onSuccess: (response) => {
      saveAuth({
        accessToken:
          response.data.accessToken,

        refreshToken:
          response.data.refreshToken,

        user: response.data.user,
      });

      appToast.success(
        `Welcome back, ${response.data.user.firstName}!`,
      );

      // Force user to change password
      if (
        response.data.user
          .mustChangePassword
      ) {
        navigate(
          "/change-password",
          {
            replace: true,
          },
        );

        return;
      }

      // Email not verified
      if (
        !response.data.user
          .isVerified
      ) {
        navigate(
          "/verify-email",
          {
            replace: true,
          },
        );

        return;
      }

      navigate("/dashboard", {
        replace: true,
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data
          ?.message ??
        "Invalid email or password.";

      appToast.error(message);
    },
  });
}
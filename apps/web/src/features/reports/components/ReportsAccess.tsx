import {
  Navigate,
} from "react-router-dom";

import type {
  ReactNode,
} from "react";

interface Props {
  children: ReactNode;
}

function getUserRole() {
  try {
    const token =
      localStorage.getItem(
        "token",
      );

    if (!token) {
      return null;
    }

    const payload =
      token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decoded =
      JSON.parse(
        atob(
          payload
            .replace(
              /-/g,
              "+",
            )
            .replace(
              /_/g,
              "/",
            ),
        ),
      );

    return String(
      decoded.role ??
        decoded.roles?.[0] ??
        "",
    )
      .trim()
      .toUpperCase();
  } catch {
    return null;
  }
}

export default function ReportsAccess({
  children,
}: Props) {
  const role =
    getUserRole();

  const allowed =
    role === "ADMIN" ||
    role === "HR" ||
    role ===
      "HUMAN_RESOURCES";

  if (!allowed) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}
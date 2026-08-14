import { useEffect, useState } from "react";

import type {
  Employee,
  EmployeeStatus,
} from "../types/employee";

import { Role } from "@/features/auth/types/role";

interface Props {
  initialData?: Employee;

  onSubmit: (employee: unknown) => void;
}

export default function EmployeeForm({
  initialData,
  onSubmit,
}: Props) {
  const isEditing = !!initialData;

  const currentUser = JSON.parse(
    localStorage.getItem("user") ?? "{}",
  );

 const isAdmin =
  currentUser.role === Role.ADMIN;

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [
    designation,
    setDesignation,
  ] = useState("");

  const [
    department,
    setDepartment,
  ] = useState("");

  const [status, setStatus] =
    useState<EmployeeStatus>(
      "ACTIVE",
    );

  const [role, setRole] =
    useState<Role>(
      Role.EMPLOYEE,
    );

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  // =====================================================
  // Profile picture
  // =====================================================

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] =
    useState<string>(
      initialData?.avatar ?? "",
    );

  useEffect(() => {
    if (!avatarFile) {
      return;
    }

    const objectUrl =
      URL.createObjectURL(avatarFile);

    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [avatarFile]);

  function handleAvatarChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarFile(file);
  }

  useEffect(() => {
    if (!initialData) return;

    setFirstName(
      initialData.firstName,
    );

    setLastName(
      initialData.lastName,
    );

    setEmail(
      initialData.email,
    );

    setPhone(
      initialData.phone,
    );

    setDesignation(
      initialData.designation,
    );

    setDepartment(
      initialData.department,
    );

    setStatus(
      initialData.status,
    );

    if (initialData.role) {
      setRole(
        initialData.role,
      );
    }

    setAvatarFile(null);
    setAvatarPreview(
      initialData.avatar ?? "",
    );
  }, [initialData]);

  function generatePassword() {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";

    let value = "";

    for (
      let i = 0;
      i < 12;
      i++
    ) {
      value +=
        chars[
          Math.floor(
            Math.random() *
              chars.length,
          )
        ];
    }

    setPassword(value);

    setConfirmPassword(value);
  }

 function handleSubmit(
  e: React.FormEvent,
) {
  e.preventDefault();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !designation ||
    !department
  ) {
    alert(
      "Please fill all required fields.",
    );

    return;
  }

  if (!isEditing && !avatarFile) {
    alert(
      "Please upload a profile picture.",
    );

    return;
  }

  if (!isEditing) {
    if (!password) {
      alert("Password is required.");
      return;
    }

    if (password.length < 8) {
      alert(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        "Passwords do not match.",
      );
      return;
    }
  }

  const payload: any = {
    id: initialData?.id,

    firstName,

    lastName,

    email,

    phone,

    designation,

    department,

    status,

    role,
  };

  // ONLY while creating
  if (!isEditing) {
    payload.password = password;
  }

  // Only attach a new file when the admin actually picked one —
  // on edit, omitting this keeps the employee's existing photo.
  if (avatarFile) {
    payload.avatarFile = avatarFile;
  }

  onSubmit(payload);
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* ===================================== */}
      {/* PERSONAL INFORMATION */}
      {/* ===================================== */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="mb-6 text-lg font-semibold text-white">
          Personal Information
        </h2>

        {/* ===================================== */}
        {/* PROFILE PICTURE */}
        {/* ===================================== */}

        <div className="mb-6 flex items-center gap-6">

          <img
            src={
              avatarPreview ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                `${firstName || "New"} ${lastName || "Employee"}`,
              )}`
            }
            alt="Profile preview"
            className="h-20 w-20 shrink-0 rounded-full border border-white/10 object-cover"
          />

          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500 hover:text-white">
              {avatarFile
                ? "Change Photo"
                : "Upload Photo"}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={
                  handleAvatarChange
                }
                className="hidden"
              />
            </label>

            <p className="mt-2 text-xs text-slate-500">
              JPG, PNG or WEBP. Max 5MB.
              {!isEditing && (
                <span className="text-red-400">
                  {" "}
                  Required.
                </span>
              )}
            </p>
          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              First Name
            </label>

            <input
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value,
                )
              }
              placeholder="Waqar"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Last Name
            </label>

            <input
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value,
                )
              }
              placeholder="Ali"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              placeholder="waqar@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value,
                )
              }
              placeholder="+92xxxxxxxxxx"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* EMPLOYMENT */}
      {/* ===================================== */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

        <h2 className="mb-6 text-lg font-semibold text-white">
          Employment Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Designation
            </label>

            <input
              value={designation}
              onChange={(e) =>
                setDesignation(
                  e.target.value,
                )
              }
              placeholder="Frontend Developer"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Department
            </label>

            <input
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value,
                )
              }
              placeholder="Engineering"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />
          </div>
                    <div>
            <label className="mb-2 block text-sm text-slate-400">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target
                    .value as EmployeeStatus,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white outline-none focus:border-cyan-400"
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="ON_LEAVE">
                On Leave
              </option>

              <option value="RESIGNED">
                Resigned
              </option>

              <option value="TERMINATED">
                Terminated
              </option>
            </select>
          </div>

        </div>

      </div>

    {/* ===================================== */}
{/* LOGIN ACCOUNT */}
{/* ===================================== */}

{isAdmin && (

  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

    <h2 className="mb-6 text-lg font-semibold text-white">

      Login Account

    </h2>

    <div className="grid gap-5 md:grid-cols-2">

      {/* ===================================== */}
      {/* ROLE */}
      {/* ===================================== */}

      <div>

        <label className="mb-2 block text-sm text-slate-400">

          User Role

        </label>

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as Role,
            )
          }
          className="w-full rounded-xl border border-white/10 bg-slate-900 p-4 text-white outline-none focus:border-cyan-400"
        >

          {Object.values(Role).map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ),
          )}

        </select>

      </div>

      {/* ===================================== */}
      {/* CREATE ONLY */}
      {/* ===================================== */}

      {!isEditing && (
        <>
          <div className="flex items-end">

            <button
              type="button"
              onClick={
                generatePassword
              }
              className="w-full rounded-xl border border-cyan-500 bg-cyan-500/20 px-5 py-4 font-medium text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
            >

              Generate Strong Password

            </button>

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Confirm Password

            </label>

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value,
                )
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-cyan-400"
            />

          </div>
        </>
      )}

    </div>

  </div>

)}

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-semibold text-white transition hover:bg-cyan-600"
      >
        {isEditing
          ? "Update Employee"
          : "Create Employee Account"}
      </button>

    </form>
  );
}
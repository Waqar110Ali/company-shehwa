import { Role } from "../types/role";

export const VIEW_ROLES = [
  Role.ADMIN,
  Role.HR,
  Role.MANAGER,
  Role.EMPLOYEE,
  Role.INTERN,
  Role.CLIENT,
  Role.CEO,
  Role.AI,
];

export const MANAGE_ROLES = [
  Role.ADMIN,
  Role.HR,
];

export const ADMIN_ONLY = [
  Role.ADMIN,
];
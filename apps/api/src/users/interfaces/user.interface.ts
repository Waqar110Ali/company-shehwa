import { Role } from "../enums/role.enum";

export interface IUser {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  avatar: string;

  role: Role;

  isActive: boolean;

  isVerified: boolean;

  createdAt: Date;

  updatedAt: Date;
}
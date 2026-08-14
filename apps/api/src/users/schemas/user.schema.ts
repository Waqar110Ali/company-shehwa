import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

import { Role } from "../enums/role.enum";

export type UserDocument =
  HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  // =====================================================
  // Basic Information
  // =====================================================

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password!: string;

  @Prop({
    type: String,
    default: "",
  })
  phone!: string;

  @Prop({
    type: String,
    default: "",
  })
  avatar!: string;

  // =====================================================
  // Authorization
  // =====================================================

  @Prop({
    type: String,
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role!: Role;

  // =====================================================
  // Account Status
  // =====================================================

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isVerified!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  mustChangePassword!: boolean;

  // =====================================================
  // Authentication
  // =====================================================

  @Prop({
    type: String,
    default: null,
    select: false,
  })
  refreshToken?: string | null;

  @Prop({
    type: String,
    default: null,
    select: false,
  })
  emailVerificationToken?: string | null;

  @Prop({
    type: String,
    default: null,
    select: false,
  })
  passwordResetToken?: string | null;

  @Prop({
    type: Date,
    default: null,
  })
  passwordResetExpires?: Date | null;

  @Prop({
    type: Date,
    default: null,
  })
  emailVerifiedAt?: Date | null;

  // =====================================================
  // Security
  // =====================================================

  @Prop({
    type: Date,
    default: null,
  })
  lastLogin?: Date | null;

  @Prop({
    type: Number,
    default: 0,
  })
  loginAttempts!: number;

  @Prop({
    type: Date,
    default: null,
  })
  lockUntil?: Date | null;

  @Prop({
    type: Date,
    default: null,
  })
  lastPasswordChangedAt?: Date | null;

  // =====================================================
  // Timestamps
  // =====================================================

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User);
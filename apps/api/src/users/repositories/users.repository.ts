import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import {
  User,
  UserDocument,
} from "../schemas/user.schema";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // =====================================================
  // Create
  // =====================================================

  async createUser(
    data: Partial<User>,
  ): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  // =====================================================
  // Find
  // =====================================================

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(
    id: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findById(id)
      .exec();
  }

  async findByEmail(
    email: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        email,
      })
      .select(
        "+password +refreshToken +emailVerificationToken +passwordResetToken",
      )
      .exec();
  }

  async findByVerificationToken(
    token: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        emailVerificationToken: token,
      })
      .select(
        "+emailVerificationToken",
      )
      .exec();
  }

  async findByPasswordResetToken(
    token: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOne({
        passwordResetToken: token,
      })
      .select(
        "+passwordResetToken",
      )
      .exec();
  }

  async existsByEmail(
    email: string,
  ): Promise<boolean> {
    const exists =
      await this.userModel.exists({
        email,
      });

    return !!exists;
  }

  // =====================================================
  // Update
  // =====================================================

  async update(
    id: string,
    data: Partial<User>,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        },
      )
      .exec();
  }

  async delete(
    id: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndDelete(id)
      .exec();
  }

  // =====================================================
  // Password
  // =====================================================

  async updatePassword(
    userId: string,
    password: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          password,
          mustChangePassword: false,
          passwordResetToken: null,
          passwordResetExpires: null,
          lastPasswordChangedAt:
            new Date(),
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async savePasswordResetToken(
    userId: string,
    token: string,
    expires: Date,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          passwordResetToken: token,
          passwordResetExpires:
            expires,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  // =====================================================
  // Email Verification
  // =====================================================

  async saveVerificationToken(
    userId: string,
    token: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          emailVerificationToken:
            token,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async updateVerificationToken(
    userId: string,
    token: string,
    expires: Date,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          emailVerificationToken:
            token,

          passwordResetExpires:
            expires,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async verifyEmail(
    userId: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          isVerified: true,

          emailVerificationToken:
            null,

          emailVerifiedAt:
            new Date(),
        },
        {
          new: true,
        },
      )
      .exec();
  }

  // =====================================================
  // Refresh Token
  // =====================================================

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          refreshToken,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  async clearRefreshToken(
    userId: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          refreshToken: null,
        },
        {
          new: true,
        },
      )
      .exec();
  }

  // =====================================================
  // Login Tracking
  // =====================================================

  async updateLastLogin(
    userId: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        lastLogin: new Date(),
      },
    );
  }

  async incrementLoginAttempts(
    userId: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $inc: {
          loginAttempts: 1,
        },
      },
    );
  }

  async resetLoginAttempts(
    userId: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        loginAttempts: 0,
        lockUntil: null,
      },
    );
  }

  async lockAccount(
    userId: string,
    until: Date,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        lockUntil: until,
      },
    );
  }
}
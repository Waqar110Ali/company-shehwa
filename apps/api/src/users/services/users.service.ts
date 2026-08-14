import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { UpdateUserDto } from "../dto/update-user.dto";

import {
  User,
  UserDocument,
} from "../schemas/user.schema";

import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
  ) {}

  // =====================================================
  // Create
  // =====================================================

  async createUser(
    dto: Partial<User>,
  ): Promise<UserDocument> {
    return this.repository.createUser(dto);
  }

  // =====================================================
  // Read
  // =====================================================

  async findAll(): Promise<UserDocument[]> {
    return this.repository.findAll();
  }

  async findById(
    id: string,
  ): Promise<UserDocument | null> {
    return this.repository.findById(id);
  }

  async findOne(
    id: string,
  ): Promise<UserDocument | null> {
    return this.repository.findById(id);
  }

  async findByEmail(
    email: string,
  ): Promise<UserDocument | null> {
    return this.repository.findByEmail(email);
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    return this.repository.findByEmailWithPassword(
      email,
    );
  }

  async findByVerificationToken(
    token: string,
  ): Promise<UserDocument | null> {
    return this.repository.findByVerificationToken(
      token,
    );
  }

  async findByPasswordResetToken(
    token: string,
  ): Promise<UserDocument | null> {
    return this.repository.findByPasswordResetToken(
      token,
    );
  }

  async existsByEmail(
    email: string,
  ): Promise<boolean> {
    return this.repository.existsByEmail(
      email,
    );
  }

  // =====================================================
  // Update
  // =====================================================

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.repository.update(
      id,
      dto,
    );
  }

  async delete(
    id: string,
  ): Promise<UserDocument | null> {
    return this.repository.delete(id);
  }

  // =====================================================
  // Password
  // =====================================================

  async updatePassword(
    userId: string,
    password: string,
  ): Promise<UserDocument | null> {
    return this.repository.updatePassword(
      userId,
      password,
    );
  }

  async savePasswordResetToken(
    userId: string,
    token: string,
    expires: Date,
  ): Promise<UserDocument | null> {
    return this.repository.savePasswordResetToken(
      userId,
      token,
      expires,
    );
  }

  // =====================================================
  // Email Verification
  // =====================================================

  async saveVerificationToken(
    userId: string,
    token: string,
  ): Promise<UserDocument | null> {
    return this.repository.saveVerificationToken(
      userId,
      token,
    );
  }

  async updateVerificationToken(
    userId: string,
    token: string,
    expires: Date,
  ): Promise<UserDocument | null> {
    return this.repository.updateVerificationToken(
      userId,
      token,
      expires,
    );
  }

  async verifyEmail(
    userId: string,
  ): Promise<UserDocument | null> {
    return this.repository.verifyEmail(
      userId,
    );
  }

  // =====================================================
  // Refresh Token
  // =====================================================

  async updateRefreshToken(
    userId: string,
    token: string | null,
  ): Promise<UserDocument | null> {
    return this.repository.updateRefreshToken(
      userId,
      token,
    );
  }

  async clearRefreshToken(
    userId: string,
  ): Promise<UserDocument | null> {
    return this.repository.clearRefreshToken(
      userId,
    );
  }

  // =====================================================
  // Login Tracking
  // =====================================================

  async updateLastLogin(
    userId: string,
  ): Promise<void> {
    await this.repository.updateLastLogin(
      userId,
    );
  }

  async incrementLoginAttempts(
    userId: string,
  ): Promise<void> {
    await this.repository.incrementLoginAttempts(
      userId,
    );
  }

  async resetLoginAttempts(
    userId: string,
  ): Promise<void> {
    await this.repository.resetLoginAttempts(
      userId,
    );
  }

  async lockAccount(
    userId: string,
    until: Date,
  ): Promise<void> {
    await this.repository.lockAccount(
      userId,
      until,
    );
  }

  // =====================================================
  // Helpers
  // =====================================================

  async requireUser(
    id: string,
  ): Promise<UserDocument> {
    const user =
      await this.findById(id);

    if (!user) {
      throw new NotFoundException(
        "User not found.",
      );
    }

    return user;
  }

  async requireUserByEmail(
    email: string,
  ): Promise<UserDocument> {
    const user =
      await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        "User not found.",
      );
    }

    return user;
  }
}
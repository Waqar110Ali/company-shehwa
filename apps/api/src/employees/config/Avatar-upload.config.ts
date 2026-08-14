import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { randomUUID } from "crypto";
import { mkdirSync } from "fs";

// =====================================================
// Storage location
// =====================================================

export const AVATAR_UPLOAD_DIR = join(process.cwd(), "uploads", "avatars");

// Ensure the folder exists before multer ever tries to write into it.
mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });

// Set this in your .env for production (e.g. https://api.yourcompany.com).
// Falls back to localhost for local dev.
const APP_URL = process.env.APP_URL ?? "http://localhost:5000";

// =====================================================
// Validation
// =====================================================

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// =====================================================
// Multer options — used by FileInterceptor("avatar", avatarUploadOptions)
// =====================================================

export const avatarUploadOptions = {
    storage: diskStorage({
        destination: AVATAR_UPLOAD_DIR,
        filename: (_req, file, callback) => {
            const ext = extname(file.originalname).toLowerCase();
            callback(null, `${randomUUID()}${ext}`);
        },
    }),

    limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
    },

    fileFilter: (
        _req: unknown,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            callback(
                new BadRequestException(
                    "Only JPG, PNG, or WEBP images are allowed for the profile picture.",
                ),
                false,
            );
            return;
        }

        callback(null, true);
    },
};

// =====================================================
// Helpers
// =====================================================

/**
 * Absolute, ready-to-render URL for an uploaded avatar file. Returning
 * a full URL (not a relative path) means every place that already
 * renders `employee.avatar` / `user.avatar` — the employee table, the
 * profile drawer, chat headers, etc. — keeps working unmodified,
 * exactly as it does today for the pravatar/ui-avatars links.
 */
export function avatarPublicPath(filename: string): string {
    return `${APP_URL}/uploads/avatars/${filename}`;
}

/** True if this avatar value was produced by our own upload pipeline. */
export function isLocalAvatarPath(avatar?: string): avatar is string {
    return !!avatar && avatar.startsWith(`${APP_URL}/uploads/avatars/`);
}
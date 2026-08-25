import { BadRequestException } from "@nestjs/common";
import { memoryStorage } from "multer";

// =====================================================
// Storage
//
// Local disk storage doesn't work on Vercel's serverless functions
// (read-only filesystem, no persistence between requests), so
// avatars are uploaded to Cloudinary instead — see
// EmployeesService, which uses the shared CloudinaryService to
// actually upload/delete the file. This file only defines the
// Multer options used by the FileInterceptor decorator.
// =====================================================

export const AVATAR_CLOUDINARY_FOLDER = "avatars";

// =====================================================
// Validation
// =====================================================

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// =====================================================
// Multer options — used by FileInterceptor("avatar", avatarUploadOptions)
//
// Files are kept in memory (never written to local disk); the
// buffer is then uploaded to Cloudinary by EmployeesService.
// =====================================================

export const avatarUploadOptions = {
    storage: memoryStorage(),

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

/** True if this avatar value was produced by our own Cloudinary upload pipeline. */
export function isCloudinaryAvatarUrl(
    avatar?: string,
): avatar is string {
    return (
        !!avatar &&
        avatar.includes("res.cloudinary.com") &&
        avatar.includes(`/${AVATAR_CLOUDINARY_FOLDER}/`)
    );
}
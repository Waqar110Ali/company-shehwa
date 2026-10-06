import { v2 as cloudinary } from "cloudinary";
import { describe, it, expect, jest } from "@jest/globals";
import { CloudinaryService } from "./cloudinary.service";

describe("signed video uploads", () => {
  it("signs fixed upload parameters without exposing the secret", () => {
    const api = {
      config: () => ({ cloud_name: "cloud", api_key: "key", api_secret: "secret" }),
      utils: { api_sign_request: jest.fn(() => "signature") },
    };
    const service = new CloudinaryService(api as unknown as typeof cloudinary);
    const result = service.createVideoUploadSignature();
    expect(result).toMatchObject({ cloudName: "cloud", apiKey: "key", signature: "signature", overwrite: false });
    expect(result).not.toHaveProperty("api_secret");
    expect(api.utils.api_sign_request).toHaveBeenCalledWith({
      timestamp: result.timestamp, folder: "company-management/tutorials/videos",
      public_id: result.public_id, overwrite: false,
    }, "secret");
    expect(service.createVideoUploadSignature().public_id).not.toBe(result.public_id);
  });

  it("fails clearly when storage credentials are missing", () => {
    const api = { config: () => ({}) };
    const service = new CloudinaryService(api as unknown as typeof cloudinary);
    expect(() => service.createVideoUploadSignature()).toThrow("Video storage is not configured.");
  });

  it("returns a configuration error on the legacy upload route too", async () => {
    const api = { config: () => ({}) };
    const service = new CloudinaryService(api as unknown as typeof cloudinary);
    await expect(service.uploadFile({} as Express.Multer.File, "videos"))
      .rejects.toThrow("Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET");
  });
});

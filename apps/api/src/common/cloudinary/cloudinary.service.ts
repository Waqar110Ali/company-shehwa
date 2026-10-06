import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";

import { v2 as Cloudinary } from "cloudinary";
import { randomUUID } from "node:crypto";

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject("CLOUDINARY")
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  private getUploadConfig() {
    const { cloud_name, api_key, api_secret } = this.cloudinary.config();
    if (!cloud_name || !api_key || !api_secret) {
      throw new ServiceUnavailableException(
        "Video storage is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET on the API server.",
      );
    }
    return { cloud_name, api_key, api_secret };
  }

  createVideoUploadSignature() {
    const { cloud_name, api_key, api_secret } = this.getUploadConfig();
    const params = {
      timestamp: Math.floor(Date.now() / 1000),
      folder: "company-management/tutorials/videos",
      public_id: randomUUID(),
      overwrite: false,
    };
    return {
      cloudName: cloud_name,
      apiKey: api_key,
      ...params,
      signature: this.cloudinary.utils.api_sign_request(params, api_secret),
    };
  }

 async uploadFile(
  file: Express.Multer.File,
  folder: string,
) {
  this.getUploadConfig();
  return new Promise((resolve, reject) => {
    const stream =
      this.cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result: any) => {
          if (error) {
            return reject(error);
          }

          console.log("=========== CLOUDINARY ===========");
          console.log(result);
          console.log("resource_type =", result.resource_type);
          console.log("format =", result.format);
          console.log("secure_url =", result.secure_url);
          console.log("==================================");

          resolve(result);
        },
      );

    stream.end(file.buffer);
  });
}

async deleteFile(publicId: string): Promise<void> {
  await this.cloudinary.uploader.destroy(publicId);
}
}

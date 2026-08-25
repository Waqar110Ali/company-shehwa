import {
  Inject,
  Injectable,
} from "@nestjs/common";

import { v2 as Cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject("CLOUDINARY")
    private readonly cloudinary: typeof Cloudinary,
  ) {}

 async uploadFile(
  file: Express.Multer.File,
  folder: string,
) {
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
export interface VideoUploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  public_id: string;
  overwrite: boolean;
  signature: string;
}

export async function uploadVideoToCloudinary(
  file: File,
  signed: VideoUploadSignature,
) {
  const chunkSize = 10 * 1024 * 1024;
  const uploadId = crypto.randomUUID();
  for (let start = 0; start < file.size; start += chunkSize) {
    const end = Math.min(start + chunkSize, file.size);
    const form = new FormData();
    form.append("file", file.slice(start, end), file.name);
    form.append("api_key", signed.apiKey);
    form.append("timestamp", String(signed.timestamp));
    form.append("folder", signed.folder);
    form.append("public_id", signed.public_id);
    form.append("overwrite", String(signed.overwrite));
    form.append("signature", signed.signature);

    // Use fetch rather than the API client: app credentials must not go to Cloudinary.
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/video/upload`,
      {
        method: "POST",
        headers: {
          "X-Unique-Upload-Id": uploadId,
          "Content-Range": `bytes ${start}-${end - 1}/${file.size}`,
        },
        body: form,
      },
    );
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.error) {
      throw new Error(result?.error?.message ?? "Cloudinary video upload failed. Please retry.");
    }
    if (end === file.size) {
      if (!result?.secure_url || !result?.public_id || result?.done === false) {
        throw new Error("Cloudinary did not finish uploading the video. Please retry.");
      }
      return {
        url: result.secure_url as string,
        publicId: result.public_id as string,
        durationMinutes: typeof result.duration === "number"
          ? Math.ceil(result.duration / 60)
          : undefined,
      };
    }
  }
  throw new Error("The selected video is empty.");
}

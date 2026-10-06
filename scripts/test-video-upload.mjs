import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { webcrypto } from "node:crypto";

const require = createRequire(new URL("../apps/api/package.json", import.meta.url));
const ts = require("typescript");
const source = readFileSync(new URL("../apps/web/src/features/tutorial/api/cloudinary-upload.ts", import.meta.url), "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const signed = {
  cloudName: "test-cloud", apiKey: "public-key", timestamp: 123,
  folder: "company-management/tutorials/videos", public_id: "unique-id",
  overwrite: false, signature: "server-signature",
};

function uploader(fetch) {
  const exports = {};
  runInNewContext(code, { exports, fetch, FormData, crypto: webcrypto });
  return exports.uploadVideoToCloudinary;
}

test("uploads chunks directly, keeps signatures and upload IDs, and returns final metadata", async () => {
  const calls = [];
  const upload = uploader(async (url, options) => {
    calls.push({ url, ...options });
    return { ok: true, json: async () => calls.length < 3 ? { done: false } : {
      done: true, secure_url: "https://res.cloudinary.com/test/video.mp4",
      public_id: "folder/id", duration: 61,
    } };
  });
  const file = new File([new Uint8Array(21 * 1024 * 1024)], "lecture.mp4", { type: "video/mp4" });
  const result = await upload(file, signed);
  assert.equal(calls.length, 3);
  assert.equal(calls[0].url, "https://api.cloudinary.com/v1_1/test-cloud/video/upload");
  assert.deepEqual(calls.map(c => c.headers["Content-Range"]), [
    "bytes 0-10485759/22020096", "bytes 10485760-20971519/22020096", "bytes 20971520-22020095/22020096",
  ]);
  assert.equal(new Set(calls.map(c => c.headers["X-Unique-Upload-Id"])).size, 1);
  for (const call of calls) {
    assert.equal(call.body.get("signature"), signed.signature);
    assert.equal(call.body.get("public_id"), signed.public_id);
    assert.equal(call.body.get("overwrite"), "false");
    assert.equal(call.headers.Authorization, undefined);
  }
  assert.equal(result.publicId, "folder/id");
  assert.equal(result.url, "https://res.cloudinary.com/test/video.mp4");
  assert.equal(result.durationMinutes, 2);
});

test("stops on Cloudinary errors and shows the reason", async () => {
  let calls = 0;
  const upload = uploader(async () => {
    calls++;
    return { ok: false, json: async () => ({ error: { message: "Account upload limit exceeded" } }) };
  });
  await assert.rejects(upload(new File([new Uint8Array(12 * 1024 * 1024)], "video.mp4"), signed), /Account upload limit exceeded/);
  assert.equal(calls, 1);
});

test("does not accept an incomplete final response", async () => {
  const upload = uploader(async () => ({ ok: true, json: async () => ({ done: false }) }));
  await assert.rejects(upload(new File(["video"], "video.mp4"), signed), /did not finish/);
});

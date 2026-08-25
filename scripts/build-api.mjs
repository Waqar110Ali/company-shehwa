import { build } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { cpSync } from "fs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, "..");

await build({
  entryPoints: [
    resolve(rootDir, "apps/api/api/index.ts"),
  ],

  bundle: true,
  platform: "node",
  target: "node22",
  format: "cjs",

  outfile: resolve(rootDir, "api/index.js"),

  packages: "external",

  sourcemap: false,

  tsconfig: resolve(
    rootDir,
    "apps/api/tsconfig.json",
  ),
});

// Copy mail templates alongside the bundled function, since esbuild
// only bundles code and does not copy non-JS assets like .hbs files.
cpSync(
  resolve(rootDir, "apps/api/src/mail/templates"),
  resolve(rootDir, "api/src/mail/templates"),
  { recursive: true },
);

console.log("API bundle created successfully.");
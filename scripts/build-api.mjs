import { build } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { cpSync, readFileSync } from "fs";
import { createRequire } from "module";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, "..");
const apiRequire = createRequire(resolve(rootDir, "apps/api/package.json"));
const ts = apiRequire("typescript");
const tsconfigPath = resolve(rootDir, "apps/api/tsconfig.json");
const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, "\n"));
const { options } = ts.parseJsonConfigFileContent(config, ts.sys, dirname(tsconfigPath));

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

  // Nest uses emitted metadata for dependency injection and DTO validation.
  // esbuild alone does not emit it, so compile TypeScript before bundling.
  plugins: [{
    name: "nest-decorator-metadata",
    setup(builder) {
      builder.onLoad({ filter: /\.ts$/ }, async ({ path }) => ({
        contents: ts.transpileModule(readFileSync(path, "utf8"), {
          fileName: path,
          compilerOptions: {
            ...options,
            module: ts.ModuleKind.ESNext,
            sourceMap: false,
            declaration: false,
          },
        }).outputText,
        loader: "js",
        resolveDir: dirname(path),
      }));
    },
  }],

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

// scripts/add-inject-decorators.mjs
import { Project, SyntaxKind } from "ts-morph";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, "..");

const project = new Project({
  tsConfigFilePath: resolve(rootDir, "apps/api/tsconfig.json"),
});

const sourceFiles = project.getSourceFiles("apps/api/src/**/*.ts");

let changedFiles = 0;
let changedParams = 0;

for (const sourceFile of sourceFiles) {
  let fileChanged = false;

  for (const cls of sourceFile.getClasses()) {
    const ctor = cls.getConstructors()[0];
    if (!ctor) continue;

    for (const param of ctor.getParameters()) {
      const hasInject = param
        .getDecorators()
        .some((d) => d.getName() === "Inject");
      if (hasInject) continue;

      const typeNode = param.getTypeNode();
      if (!typeNode) continue;

      // Only simple class-like type references (skip primitives,
      // unions, generics like Promise<T>, arrays, function types, etc.)
      if (typeNode.getKind() !== SyntaxKind.TypeReference) continue;

      const typeText = typeNode.getText();
      const skip = ["Promise", "Array", "Record", "Partial", "Omit", "Pick"];
      if (skip.some((s) => typeText.startsWith(s))) continue;

      param.addDecorator({
        name: "Inject",
        arguments: [typeText],
      });

      const importDecl = sourceFile.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === "@nestjs/common",
      );

      if (importDecl) {
        const named = importDecl.getNamedImports().map((n) => n.getName());
        if (!named.includes("Inject")) {
          importDecl.addNamedImport("Inject");
        }
      } else {
        sourceFile.addImportDeclaration({
          moduleSpecifier: "@nestjs/common",
          namedImports: ["Inject"],
        });
      }

      fileChanged = true;
      changedParams++;
    }
  }

  if (fileChanged) changedFiles++;
}

await project.save();

console.log(
  `Added @Inject() to ${changedParams} constructor parameter(s) across ${changedFiles} file(s).`,
);
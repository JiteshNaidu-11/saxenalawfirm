import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const sourcePath = resolve("public", ".htaccess");
const distPath = resolve("dist");
const targetPath = resolve("dist", ".htaccess");

if (!existsSync(distPath)) {
  console.warn("[postbuild] dist folder not found. Skipping .htaccess copy.");
  process.exit(0);
}

if (!existsSync(sourcePath)) {
  console.warn("[postbuild] public/.htaccess not found. Skipping copy.");
  process.exit(0);
}

copyFileSync(sourcePath, targetPath);
console.log("[postbuild] Copied public/.htaccess to dist/.htaccess");


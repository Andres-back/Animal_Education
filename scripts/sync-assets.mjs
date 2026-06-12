import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const sourceDir = join(process.cwd(), "glb");
const targetDir = join(process.cwd(), "public", "glb");

if (!existsSync(sourceDir)) {
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });

for (const entry of readdirSync(sourceDir)) {
  const sourcePath = join(sourceDir, entry);
  if (!statSync(sourcePath).isFile() || !entry.toLowerCase().endsWith(".glb")) {
    continue;
  }

  copyFileSync(sourcePath, join(targetDir, entry));
}

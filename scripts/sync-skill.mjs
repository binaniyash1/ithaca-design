#!/usr/bin/env node

import { cp, mkdir, readdir, readFile, rm } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "skills/ithaca-design");
const destination = resolve(
  root,
  "plugins/ithaca-design/skills/ithaca-design",
);
const checkOnly = process.argv.includes("--check");

async function filesUnder(directory) {
  const files = [];

  async function walk(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) files.push(relative(directory, path));
    }
  }

  await walk(directory);
  return files.sort();
}

async function assertInSync() {
  const sourceFiles = await filesUnder(source);
  let destinationFiles;
  try {
    destinationFiles = await filesUnder(destination);
  } catch {
    throw new Error("Generated plugin skill is missing. Run npm run sync:skill.");
  }

  if (sourceFiles.join("\n") !== destinationFiles.join("\n")) {
    throw new Error("Portable and plugin skill file lists differ. Run npm run sync:skill.");
  }

  for (const path of sourceFiles) {
    const [authored, generated] = await Promise.all([
      readFile(resolve(source, path)),
      readFile(resolve(destination, path)),
    ]);
    if (!authored.equals(generated)) {
      throw new Error(`Generated plugin skill drifted at ${path}. Run npm run sync:skill.`);
    }
  }

  console.log(`Ithaca portable skill is synchronized (${sourceFiles.length} files).`);
}

if (checkOnly) {
  await assertInSync();
} else {
  await rm(destination, { recursive: true, force: true });
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
  await assertInSync();
}

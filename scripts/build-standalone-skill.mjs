#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = resolve(root, "skills/ithaca-design");
const sourcePath = resolve(skillRoot, "SKILL.md");
const outputPath = resolve(root, "Ithaca-Design-Skill.md");
const checkOnly = process.argv.includes("--check");

const references = [
  ["generate-from-prd.md", "Generate product UI from a PRD"],
  ["foundations.md", "Ithaca foundations"],
  ["interaction-controls.md", "Interaction and controls"],
  ["quality-gate.md", "Quality gate"],
  ["operational-workspace.md", "Operational workspace"],
  ["charts.md", "Charts and progress visualisation"],
];

function anchor(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

let entrypoint = await readFile(sourcePath, "utf8");
for (const [file, title] of references) {
  entrypoint = entrypoint.replaceAll(
    `[references/${file}](references/${file})`,
    `[${title}](#${anchor(title)})`,
  );
}

const embedded = [];
for (const [file] of references) {
  embedded.push((await readFile(resolve(skillRoot, "references", file), "utf8")).trim());
}

const output = `${entrypoint.trim()}\n\n<!--\nThis is the self-contained forwarding build of Ithaca Design. It is generated\nfrom the canonical skill; all referenced guidance is embedded below.\n-->\n\n---\n\n# Embedded Ithaca guidance\n\n${embedded.join("\n\n---\n\n")}\n`;

if (checkOnly) {
  let existing;
  try {
    existing = await readFile(outputPath, "utf8");
  } catch {
    throw new Error("Standalone skill is missing. Run npm run build:standalone.");
  }
  if (existing !== output) {
    throw new Error("Standalone skill is stale. Run npm run build:standalone.");
  }
  console.log("Standalone Ithaca Markdown skill is current.");
} else {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
  console.log(`Built ${outputPath}`);
}

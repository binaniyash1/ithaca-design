import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = resolve(root, "plugins/ithaca-design");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const claude = await readJson(
  resolve(pluginRoot, ".claude-plugin/plugin.json"),
);
const codex = await readJson(resolve(pluginRoot, ".codex-plugin/plugin.json"));
const marketplace = await readJson(
  resolve(root, ".agents/plugins/marketplace.json"),
);

assert(claude.name === "ithaca-design", "Claude plugin name is incorrect");
assert(codex.name === claude.name, "Host plugin names do not match");
assert(codex.version === claude.version, "Host plugin versions do not match");
assert(/^\d+\.\d+\.\d+$/.test(codex.version), "Version must be strict semver");
assert(codex.skills === "./skills/", "Codex skills path must be ./skills/");

for (const field of [
  "displayName",
  "shortDescription",
  "longDescription",
  "developerName",
  "category",
]) {
  assert(codex.interface?.[field], `Missing Codex interface.${field}`);
}

const entry = marketplace.plugins?.find(
  (plugin) => plugin.name === "ithaca-design",
);
assert(entry, "Codex marketplace entry is missing");
assert(
  entry.source?.path === "./plugins/ithaca-design",
  "Codex marketplace source path is incorrect",
);

const skillPath = resolve(pluginRoot, "skills/agent/SKILL.md");
const skill = await readFile(skillPath, "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
assert(frontmatter, "SKILL.md frontmatter is missing or malformed");
assert(/^name:\s*agent\s*$/m.test(frontmatter[1]), "Skill name must be agent");
assert(/^description:\s*\S+/m.test(frontmatter[1]), "Skill description is missing");
assert(!skill.includes("[TODO:"), "Skill contains an unfinished TODO");
assert(
  skill.includes(`Using Ithaca Design v${claude.version}.`),
  "Skill version announcement does not match plugin manifest",
);

const referenceLinks = [
  ...skill.matchAll(/\]\((references\/[^)]+\.md)\)/g),
].map((match) => match[1]);
assert(referenceLinks.length > 0, "Skill does not route to any references");

for (const relativePath of new Set(referenceLinks)) {
  await access(resolve(dirname(skillPath), relativePath));
}

await access(resolve(root, "tests/sample-prds/crm-today.md"));
await access(
  resolve(root, "tests/feedback-regressions/crm-today-round-1.md"),
);

console.log(
  `Ithaca ${codex.version} is valid for Claude Code and Codex (${referenceLinks.length} routed references).`,
);

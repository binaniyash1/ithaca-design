import { readFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
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

execFileSync(process.execPath, [resolve(root, "scripts/sync-skill.mjs"), "--check"], {
  cwd: root,
  stdio: "inherit",
});

const skillPath = resolve(root, "skills/ithaca-design/SKILL.md");
const skill = await readFile(skillPath, "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
assert(frontmatter, "SKILL.md frontmatter is missing or malformed");
assert(
  /^name:\s*ithaca-design\s*$/m.test(frontmatter[1]),
  "Portable skill name must be ithaca-design",
);
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

const generatedSkill = await readFile(
  resolve(pluginRoot, "skills/ithaca-design/SKILL.md"),
  "utf8",
);
assert(generatedSkill === skill, "Generated plugin skill differs from portable source");

const alias = await readFile(resolve(pluginRoot, "skills/agent/SKILL.md"), "utf8");
assert(/^name:\s*agent\s*$/m.test(alias), "Compatibility alias name must be agent");
assert(
  alias.includes("../ithaca-design/SKILL.md"),
  "Compatibility alias must route to the canonical plugin skill",
);

await access(resolve(root, "tests/sample-prds/crm-today.md"));
await access(
  resolve(root, "tests/feedback-regressions/crm-today-round-1.md"),
);
await access(
  resolve(root, "tests/feedback-regressions/field-service-round-1.md"),
);
await access(resolve(root, "tests/feedback-regressions/discovery-v1.md"));

console.log(
  `Ithaca ${codex.version} is valid as a portable skill and for Claude Code and Codex (${referenceLinks.length} routed references).`,
);

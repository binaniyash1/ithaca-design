#!/usr/bin/env node
// Generates docs/index.html from site/index.html.
//
// Nothing about the version is authored in the template. Version comes from the
// plugin manifest; the verification line is lifted verbatim out of SKILL.md.
// If those two disagree, this build FAILS — which is the whole point. A page
// that quietly advertises a version the skill does not announce is precisely
// the silent failure the announcement ritual exists to prevent.

import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(root, 'plugins/ithaca-design/.claude-plugin/plugin.json');
const SKILL = join(root, 'plugins/ithaca-design/skills/agent/SKILL.md');
const TEMPLATE = join(root, 'site/index.html');
const OUT = join(root, 'docs/index.html');

const fail = (msg) => { console.error(`\n  BUILD FAILED\n  ${msg}\n`); process.exit(1); };

// ---- 1. version, from the manifest and nowhere else ----
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const version = manifest.version;
if (!version) fail(`No "version" in ${MANIFEST}. Version must be set there and only there.`);

// ---- 2. the announcement line, lifted verbatim from SKILL.md ----
const skill = readFileSync(SKILL, 'utf8');
const announce = skill.match(/^Using the Ithaca .+$/m)?.[0];
if (!announce) fail(`Could not find the announcement line in ${SKILL}.`);

// ---- 3. the guard: page and skill must agree ----
const announced = announce.match(/v(\d+\.\d+\.\d+)/)?.[1];
if (announced !== version) {
  fail(
    `Version mismatch — refusing to publish.\n` +
    `    plugin.json announces : ${version}\n` +
    `    SKILL.md announces    : ${announced ?? '(none found)'}\n\n` +
    `  Bump the SKILL.md announcement line to match the manifest.`
  );
}

// ---- 4. last-updated: when the manifest last actually changed ----
let updatedISO;
try {
  const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', MANIFEST],
    { cwd: root, encoding: 'utf8' }).trim();
  if (out) updatedISO = out;
} catch { /* shallow clone or no git — fall through */ }
if (!updatedISO) updatedISO = statSync(MANIFEST).mtime.toISOString();

const d = new Date(updatedISO);
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const updated = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

// ---- 5. changelog ----
// Deliberately empty for v0.1.0. Add entries as { version, date, notes: [] }.
const CHANGELOG = [];

const escape = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const changelogHTML = CHANGELOG.length === 0
  ? `<div class="empty">
        <p class="empty-title">No releases yet</p>
        <p>Version <strong>${escape(version)}</strong> is the first cut — a canary that
        announces itself and nothing more. Entries appear here from the first
        release that changes behaviour.</p>
      </div>`
  : CHANGELOG.map((r) => `<div class="release">
        <h3>${escape(r.version)} <span class="date">${escape(r.date)}</span></h3>
        <ul>${r.notes.map((n) => `<li>${escape(n)}</li>`).join('')}</ul>
      </div>`).join('\n');

// ---- 6. render ----
const template = readFileSync(TEMPLATE, 'utf8');
const values = {
  VERSION: escape(version),
  UPDATED: escape(updated),
  ANNOUNCE: escape(announce),
  CHANGELOG: changelogHTML,
};

let html = template;
for (const [key, val] of Object.entries(values)) {
  html = html.replaceAll(`{{${key}}}`, val);
}

const leftover = html.match(/\{\{[A-Z_]+\}\}/g);
if (leftover) fail(`Unsubstituted placeholders in template: ${[...new Set(leftover)].join(', ')}`);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);

console.log(`  ✔ docs/index.html`);
console.log(`    version  ${version}  (from plugin.json)`);
console.log(`    updated  ${updated}`);
console.log(`    announce "${announce}"`);
console.log(`    changelog ${CHANGELOG.length} release(s)`);

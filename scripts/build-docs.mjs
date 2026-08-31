#!/usr/bin/env node
// Generates docs/index.html from site/index.html.
//
// Nothing about the version is authored in the template. Both host manifests
// must agree or the build fails.

import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(root, 'plugins/ithaca-design/.claude-plugin/plugin.json');
const CODEX_MANIFEST = join(root, 'plugins/ithaca-design/.codex-plugin/plugin.json');
const TEMPLATE = join(root, 'site/index.html');
const OUT = join(root, 'docs/index.html');

const fail = (msg) => { console.error(`\n  BUILD FAILED\n  ${msg}\n`); process.exit(1); };

// ---- 1. version, equal across host manifests ----
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const codexManifest = JSON.parse(readFileSync(CODEX_MANIFEST, 'utf8'));
const version = manifest.version;
if (!version) fail(`No "version" in ${MANIFEST}.`);
if (codexManifest.version !== version) {
  fail(
    `Host version mismatch — refusing to publish.\n` +
    `    Claude Code : ${version}\n` +
    `    Codex       : ${codexManifest.version ?? '(none found)'}`
  );
}

// ---- 2. last-updated: when the manifest last actually changed ----
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

// ---- 3. changelog ----
const CHANGELOG = [
  {
    version: '0.5.0',
    date: updated,
    notes: [
      'Packages Ithaca as a portable Agent Skill with one canonical source.',
      'Generates identical Claude Code and Codex plugin skill copies automatically.',
      'Keeps the existing /ithaca-design:agent command as a compatibility alias.',
      'Blocks validation and deployment when a generated host copy drifts.',
    ],
  },
  {
    version: '0.4.0',
    date: '31 Aug 2026',
    notes: [
      'Adds verified conditional rules from the field-service comparison.',
      'Separates work groups structurally while keeping repeated rows compact.',
      'Makes dense row schemas explicit only when their variable count requires it.',
      'Makes selection-dependent context panes closed by default and causally opened.',
      'Defines metric-card craft without prescribing a fixed metric count.',
    ],
  },
  {
    version: '0.3.0',
    date: '28 Aug 2026',
    notes: [
      'Adds stable queue-column, truncation, and full-row interaction rules.',
      'Adds neutral hover, softer menu, complete pointer, and zero-jitter feedback contracts.',
      'Adds a Hyper-inspired segmented pipeline chart recipe.',
      'Adds the first screenshot-feedback regression checklist.',
    ],
  },
  {
    version: '0.2.0',
    date: '28 Aug 2026',
    notes: [
      'Accepts a PRD without requiring a separate design brief.',
      'Implements product UI, runs a preview, and visually audits the result.',
      'Adds high-density operational workspace rules and a CRM Today benchmark.',
      'Ships from one shared skill to Claude Code and Codex.',
    ],
  },
];

const escape = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const changelogHTML = CHANGELOG.map((r) => `<div class="release">
        <h3>${escape(r.version)} <span class="date">${escape(r.date)}</span></h3>
        <ul>${r.notes.map((n) => `<li>${escape(n)}</li>`).join('')}</ul>
      </div>`).join('\n');

// ---- 4. render ----
const template = readFileSync(TEMPLATE, 'utf8');
const values = {
  VERSION: escape(version),
  UPDATED: escape(updated),
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
console.log(`    changelog ${CHANGELOG.length} release(s)`);

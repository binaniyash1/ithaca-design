#!/usr/bin/env node
// Generates docs/index.html and docs/version.json from site/index.html.
// Host manifests must agree or the build fails.

import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(root, 'plugins/ithaca-design/.claude-plugin/plugin.json');
const CODEX_MANIFEST = join(root, 'plugins/ithaca-design/.codex-plugin/plugin.json');
const SKILL = join(root, 'skills/ithaca-design/SKILL.md');
const TEMPLATE = join(root, 'site/index.html');
const OUT = join(root, 'docs/index.html');
const VERSION_OUT = join(root, 'docs/version.json');

const fail = (msg) => { console.error(`\n  BUILD FAILED\n  ${msg}\n`); process.exit(1); };

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

const skill = readFileSync(SKILL, 'utf8');
const announceMatch = skill.match(/Using Ithaca Design v\d+\.\d+\.\d+\./);
if (!announceMatch) fail(`Could not find "Using Ithaca Design vX.Y.Z." in ${SKILL}.`);
const announce = announceMatch[0].replace(/\.$/, '');
const announced = announce.match(/v(\d+\.\d+\.\d+)/)?.[1];
if (announced !== version) {
  fail(
    `Version mismatch — refusing to publish.\n` +
    `    plugin.json announces : ${version}\n` +
    `    SKILL.md announces    : ${announced ?? '(none found)'}`
  );
}

let updatedISO;
try {
  const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', MANIFEST],
    { cwd: root, encoding: 'utf8' }).trim();
  if (out) updatedISO = out;
} catch { /* ignore */ }
if (!updatedISO) updatedISO = new Date().toISOString();

const d = new Date(updatedISO);
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const updated = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

const CHANGELOG = [
  {
    version: '0.7.0',
    date: '3 Sep 2026',
    notes: [
      'Gushwork-style one-line install.sh with auto-update enabled.',
      'Portable install-skills.sh for Cursor, Codex, and other Agent Skills hosts.',
      'SessionStart freshness check against hosted version.json.',
      'Install page covers verify, stay-current, and other-agent paths.',
    ],
  },
  {
    version: '0.6.0',
    date: '3 Sep 2026',
    notes: [
      'Adds context-aware product discovery before implementation.',
      'Asks zero questions when the prompt, attachments, and repository are sufficient.',
      'Prefers 3–7 high-impact questions with a hard maximum of 10 per request.',
      'Lets users skip enhancement questions while preserving true blocker checks.',
      'Keeps visual implementation decisions inside Ithaca rather than asking the user.',
    ],
  },
  {
    version: '0.5.0',
    date: '31 Aug 2026',
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

const template = readFileSync(TEMPLATE, 'utf8');
const values = {
  VERSION: escape(version),
  UPDATED: escape(updated),
  ANNOUNCE: escape(announce),
  CHANGELOG: changelogHTML,
  REPO: 'binaniyash1/ithaca-design',
};

let html = template;
for (const [key, val] of Object.entries(values)) {
  html = html.replaceAll(`{{${key}}}`, val);
}

const leftover = html.match(/\{\{[A-Z_]+\}\}/g);
if (leftover) fail(`Unsubstituted placeholders in template: ${[...new Set(leftover)].join(', ')}`);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
writeFileSync(VERSION_OUT, JSON.stringify({
  version,
  updated: updatedISO,
  announce,
  plugin: 'ithaca-design@ithaca',
}, null, 2) + '\n');

console.log(`  ✔ docs/index.html`);
console.log(`  ✔ docs/version.json`);
console.log(`    version  ${version}`);
console.log(`    updated  ${updated}`);
console.log(`    announce "${announce}"`);
console.log(`    changelog ${CHANGELOG.length} release(s)`);

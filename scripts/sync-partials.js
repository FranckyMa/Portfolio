#!/usr/bin/env node
/**
 * Syncs shared HTML fragments (header, footer, critical CSS, ...) from
 * partials/ into every page listed below, between matching
 * `<!-- sync:start NAME -->` / `<!-- sync:end NAME -->` markers.
 *
 * This is a manual, dependency-free dev convenience — not a build step.
 * The site keeps working as plain static HTML whether or not this script
 * is ever run; run it after editing a file in partials/ to propagate the
 * change everywhere:
 *
 *   node scripts/sync-partials.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PARTIALS_DIR = path.join(ROOT, 'partials');

// prefix: relative path from the page back to the project root
const PAGES = [
  { file: 'index.html', prefix: '' },
  { file: 'blog.html', prefix: '' },
  { file: 'blog/construire-un-portfolio-avec-claude-code.html', prefix: '../' },
  { file: 'blog/de-product-manager-a-product-builder.html', prefix: '../' },
];

const PARTIAL_NAMES = ['skip-link', 'stylesheet-link', 'critical-css', 'favicon', 'header', 'footer', 'script-tag'];

function loadPartial(name, prefix) {
  const raw = fs.readFileSync(path.join(PARTIALS_DIR, `${name}.html`), 'utf8');
  return raw.replace(/__PREFIX__/g, prefix).replace(/\n$/, '');
}

function syncFile(relativePath, prefix) {
  const filePath = path.join(ROOT, relativePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const name of PARTIAL_NAMES) {
    const startMarker = `<!-- sync:start ${name} -->`;
    const endMarker = `<!-- sync:end ${name} -->`;
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.warn(`  warning: marker "${name}" missing in ${relativePath} — this fragment was NOT synced`);
      continue;
    }

    const before = content.slice(0, startIndex + startMarker.length);
    const after = content.slice(endIndex);
    const partial = loadPartial(name, prefix);
    const rebuilt = `${before}\n${partial}\n  ${after}`;

    if (rebuilt !== content) {
      changed = true;
    }
    content = rebuilt;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${changed ? 'updated' : 'unchanged'}  ${relativePath}`);
}

for (const { file, prefix } of PAGES) {
  syncFile(file, prefix);
}

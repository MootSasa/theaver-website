import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(websiteRoot, '..');

const errors = [];
function fail(msg) {
  errors.push(msg);
}

// 1. Validate openapi.json structure & backend route domain coverage
const openApiPath = path.join(websiteRoot, 'public', 'openapi.json');
let openApi;
try {
  openApi = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));
  if (!openApi.openapi || !openApi.openapi.startsWith('3.')) {
    fail(`openapi.json has invalid version: ${openApi.openapi}`);
  }
  const paths = Object.keys(openApi.paths || {});
  const requiredPaths = [
    '/api/auth/providers',
    '/api/auth/challenge',
    '/api/auth/login',
    '/api/auth/qr/create',
    '/api/developers/apps',
    '/api/updates',
    '/api/chats',
    '/api/chats/{id}/messages',
    '/api/files/upload/chunked/init',
    '/api/calls/ice-servers',
    '/api/communities',
    '/api/public/releases',
  ];
  for (const reqPath of requiredPaths) {
    if (!paths.includes(reqPath)) {
      fail(`openapi.json missing required path: ${reqPath}`);
    }
  }
  const schemes = openApi.components?.securitySchemes || {};
  for (const s of ['BearerAuth', 'DeveloperPortalAuth', 'ApiIdHeader', 'ApiHashHeader']) {
    if (!schemes[s]) fail(`openapi.json missing securityScheme: ${s}`);
  }
} catch (err) {
  fail(`Failed reading/parsing openapi.json: ${err.message}`);
}

// Verify documented core endpoints appear in Go router
const httpServerPath = path.join(repoRoot, 'backend', 'api', 'http_server.go');
if (fs.existsSync(httpServerPath)) {
  const goSrc = fs.readFileSync(httpServerPath, 'utf8');
  for (const needle of [
    '"/updates"',
    '"/upload/chunked/init"',
    '"/developers"',
    '"/communities"',
    '"/calls"',
    '"/qr/create"',
    '"/public"',
  ]) {
    if (!goSrc.includes(needle)) {
      fail(`backend/api/http_server.go missing expected route marker: ${needle}`);
    }
  }
}

// 2. Verify EN/RU docs parity (21 EN + 21 RU)
const docsDir = path.join(websiteRoot, 'src', 'content', 'docs');
function listRelFiles(base) {
  const out = [];
  function walk(dir, prefix = '') {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) walk(path.join(dir, ent.name), rel);
      else if (ent.name.endsWith('.mdx') || ent.name.endsWith('.md')) out.push(rel);
    }
  }
  walk(base);
  return out.sort();
}

const enFiles = listRelFiles(path.join(docsDir, 'en'));
const ruFiles = listRelFiles(path.join(docsDir, 'ru'));

if (enFiles.length !== 21) {
  fail(`Expected 21 EN docs files, found ${enFiles.length}: ${enFiles.join(', ')}`);
}
if (JSON.stringify(enFiles) !== JSON.stringify(ruFiles)) {
  fail(`EN/RU docs mismatch.\nEN only: ${enFiles.filter((f) => !ruFiles.includes(f))}\nRU only: ${ruFiles.filter((f) => !enFiles.includes(f))}`);
}

// Check unique order values per track per locale
for (const locale of ['en', 'ru']) {
  const byTrack = new Map();
  for (const rel of locale === 'en' ? enFiles : ruFiles) {
    const raw = fs.readFileSync(path.join(docsDir, locale, rel), 'utf8');
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) {
      fail(`Missing frontmatter in ${locale}/${rel}`);
      continue;
    }
    const trackMatch = fmMatch[1].match(/^track:\s*(\w+)/m);
    const orderMatch = fmMatch[1].match(/^order:\s*(\d+)/m);
    if (!trackMatch || !orderMatch) {
      fail(`Missing track/order in ${locale}/${rel}`);
      continue;
    }
    const key = trackMatch[1];
    const order = Number(orderMatch[1]);
    if (!byTrack.has(key)) byTrack.set(key, new Set());
    if (byTrack.get(key).has(order)) {
      fail(`Duplicate order=${order} in ${locale} track=${key} (${rel})`);
    }
    byTrack.get(key).add(order);
  }
}

// 3. Scan website/src for forbidden telegram references, broken /docs/ links, gradients & weights
const validDocTargets = new Set(['/docs', '/ru/docs']);
for (const rel of enFiles) {
  const clean = rel.replace(/\.(md|mdx)$/, '');
  validDocTargets.add(`/docs/${clean}`);
}
for (const rel of ruFiles) {
  const clean = rel.replace(/\.(md|mdx)$/, '');
  validDocTargets.add(`/ru/docs/${clean}`);
}

const allowedTelegramFiles = new Set([
  path.join(docsDir, 'en', 'bots', 'migrating-from-telegram.mdx'),
  path.join(docsDir, 'ru', 'bots', 'migrating-from-telegram.mdx'),
]);

function walkSrc(dir) {
  const list = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) list.push(...walkSrc(full));
    else if (/\.(astro|mdx|md|ts|tsx|css|js|mjs)$/.test(ent.name)) list.push(full);
  }
  return list;
}

const srcFiles = walkSrc(path.join(websiteRoot, 'src'));
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(websiteRoot, file);

  const proseWithoutMigrationHref = content.replace(/\/bots\/migrating-from-telegram/g, '');
  if (!allowedTelegramFiles.has(file) && /telegram/i.test(proseWithoutMigrationHref)) {
    fail(`Disallowed "telegram" reference found in ${relPath}`);
  }

  // Check static internal /docs/ links inside markdown/href/HTML
  const linkRe = /(?:href=|\]\()(\/(?:ru\/)?docs(?:\/[a-z0-9\-/]+)?)/g;
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    const target = m[1].replace(/\/$/, '') || '/docs';
    if (!validDocTargets.has(target)) {
      fail(`Broken internal doc link "${target}" in ${relPath}`);
    }
  }

  // Design-code guards on styling/markup (skip code blocks inside MDX for CSS/weight heuristics)
  if (file.endsWith('.css') || file.endsWith('.astro')) {
    if (/\b(?:linear|radial|conic)-gradient\s*\(/i.test(content)) {
      fail(`Forbidden CSS gradient in ${relPath}`);
    }
    if (/\bfont-weight:\s*500\b/.test(content) || /\bfont-medium\b/.test(content) || /font-weight="500"/.test(content)) {
      fail(`Forbidden font-weight 500 / font-medium in ${relPath}`);
    }
    if (/:invalid(?![a-zA-Z-])/.test(content) && !content.includes(':user-invalid')) {
      fail(`Use :user-invalid instead of raw :invalid in ${relPath}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`verify-api-docs FAILED (${errors.length} issues):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`verify-api-docs PASSED: openapi.json OK, ${enFiles.length} EN + ${ruFiles.length} RU docs, zero broken doc links, zero disallowed Telegram/gradient/weight-500 violations.`);

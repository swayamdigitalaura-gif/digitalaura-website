/**
 * Keeps scripts/sitemap-lastmod.json (the dates behind <lastmod> in sitemap.xml) honest.
 *
 *   npm run prerender && npm run sitemap:lastmod        record what changed since the last run
 *   npm run sitemap:lastmod -- --touch /some/route      mark a page that is NOT prerendered here as changed today
 *
 * - A prerendered page whose visible content (see contentHash) differs from the recorded fingerprint gets today's date.
 * - A page seen for the first time gets the date git says its content was last changed (blog entry, page component or
 *   data object), not today's date.
 * - Pages served by the other apps (landing-pages, google-ads-page) cannot be fingerprinted from here, so their date is
 *   set from git once and moved only with --touch.
 * Commit sitemap-lastmod.json together with the content change it describes.
 */
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { HASHES_PATH, MANIFEST_PATH, readManifest } from './sitemap-lastmod-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const REPO = resolve(ROOT, '..');
const SITE_URL = 'https://thedigitalaura.com';

/** Pages served by separate apps: path(s) in the repo that hold their content. */
const PROXIED = {
  '/seo-services-ahmedabad': ['landing-pages/src/routes/seo-services-ahmedabad.tsx'],
  '/digital-marketing-company-ahmedabad': ['landing-pages/src/routes/digital-marketing-company-ahmedabad.tsx'],
  '/google-ads-agency-ahmedabad': ['google-ads-page/src'],
};

/** Shared chrome that appears on every page and says nothing about one page's own content. */
const SITE_CHROME = new Set(['Navbar', 'Footer', 'PageLoader', 'PageSEO', 'PageLayout', 'FloatingElements', 'FloatingWhatsApp', 'ScrollToTop']);

/** Prerendered pages whose text depends on a live API fetch that sometimes lands after the snapshot, so their hash is not
 *  reliable. Their date is set from git once and moved with --touch (job pages under /careers/ are fingerprinted normally). */
const NOISY = new Set(['/careers']);

/** Pages whose sections live outside the page file. */
const PAGE_EXTRA_DIRS = {
  '/website-development-services-ahmedabad': ['digital-aura-project/src/components/website-dev'],
};

const git = (...args) => execFileSync('git', args, { cwd: REPO, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }).trim();
const istDate = (epochSeconds) => new Date((Number(epochSeconds) + 19800) * 1000).toISOString().slice(0, 10);
const today = () => istDate(Date.now() / 1000);

function lastCommitDate(paths) {
  const t = git('log', '-1', '--format=%ct', '--', ...paths);
  return t ? istDate(t) : null;
}

/** Latest commit time over lines [from, to] of a file. */
function blameRange(file, from, to) {
  const out = git('blame', '--line-porcelain', '-L', `${from},${to}`, '--', file);
  let max = 0;
  for (const m of out.matchAll(/^committer-time (\d+)$/gm)) max = Math.max(max, Number(m[1]));
  return max ? istDate(max) : null;
}

const read = (rel) => readFileSync(join(ROOT, rel), 'utf-8').replace(/\r\n/g, '\n');

// ---- seed helpers -----------------------------------------------------------------------------------------------

const BLOG_FILE = 'src/data/seoBlogPosts.ts';
function seedStaticBlog(slug) {
  const lines = read(BLOG_FILE).split('\n');
  const starts = [];
  lines.forEach((l, i) => { if (/^ {4}slug: "/.test(l)) starts.push(i + 1); });
  const idx = starts.findIndex((n) => lines[n - 1].includes(`"${slug}"`));
  if (idx < 0) return null;
  const from = starts[idx] - 1; // the line holding the opening brace
  const to = idx + 1 < starts.length ? starts[idx + 1] - 2 : lines.length;
  return blameRange(`digital-aura-project/${BLOG_FILE}`, from, to);
}

const dataFiles = readdirSync(join(ROOT, 'src', 'data')).filter((f) => f.endsWith('.ts'));
function seedConfigKey(key) {
  for (const f of dataFiles) {
    const lines = read(`src/data/${f}`).split('\n');
    let i = lines.findIndex((l) => new RegExp(`^ {2}${key}: \\{`).test(l));
    let next = /^ {2}\w+: \{/;
    if (i < 0) {
      // Pages defined as top-level exports (export const metaDentists: IndustrySpec = {...}).
      i = lines.findIndex((l) => new RegExp(`^export const ${key}\\b`).test(l));
      next = /^export const /;
    }
    if (i < 0) continue;
    let end = lines.length;
    for (let j = i + 1; j < lines.length; j++) if (next.test(lines[j])) { end = j; break; }
    return blameRange(`digital-aura-project/src/data/${f}`, i + 1, end);
  }
  return null;
}

const appSrc = read('src/App.tsx');
function seedFromApp(route) {
  const line = appSrc.split('\n').find((l) => l.includes(`path="${route}"`));
  if (!line) return null;
  const comp = (line.match(/element=\{<(\w+)/) || [])[1];
  const cfg = (line.match(/config=\{\w+\.(\w+)\}/) || [])[1];
  if (cfg) {
    const d = seedConfigKey(cfg);
    if (d) return d;
  }
  if (comp) {
    const imp = appSrc.match(new RegExp(`import ${comp} from "\\.?/?([^"]+)"`));
    if (imp) {
      const rel = imp[1].replace(/^@\//, '').replace(/^\.\//, '').replace(/^src\//, '');
      const withExt = /\.(tsx|ts)$/.test(rel) ? rel : `${rel}.tsx`;
      const paths = [`digital-aura-project/src/${withExt}`, ...(PAGE_EXTRA_DIRS[route] || [])];
      if (existsSync(join(ROOT, 'src', withExt))) {
        // Sections the page imports from components/ are part of its content; shared site chrome is not.
        for (const m of read(`src/${withExt}`).matchAll(/from "@\/components\/(\w+)"/g)) {
          if (SITE_CHROME.has(m[1])) continue;
          const f = `src/components/${m[1]}.tsx`;
          if (existsSync(join(ROOT, f))) paths.push(`digital-aura-project/${f}`);
        }
        return lastCommitDate(paths);
      }
    }
  }
  return null;
}

let careerDates = null;
async function seedCareer(slug) {
  if (!careerDates) {
    careerDates = {};
    try {
      const res = await fetch(`${SITE_URL}/api/careers`);
      for (const j of (await res.json()).data || []) careerDates[j.slug || j.id] = String(j.updatedAt || '').slice(0, 10);
    } catch { /* leave empty */ }
  }
  return careerDates[slug] || null;
}

async function seedDate(route) {
  if (PROXIED[route]) return lastCommitDate(PROXIED[route]);
  if (route.startsWith('/blog/')) return seedStaticBlog(route.slice('/blog/'.length));
  if (route.startsWith('/careers/')) return seedCareer(route.slice('/careers/'.length));
  return seedFromApp(route);
}

// ---- main -------------------------------------------------------------------------------------------------------

const touch = process.argv.includes('--touch') ? process.argv[process.argv.indexOf('--touch') + 1] : null;
if (!existsSync(HASHES_PATH)) {
  console.error('No .prerender-hashes.json. Run "npm run prerender" first.');
  process.exit(1);
}
const hashes = JSON.parse(readFileSync(HASHES_PATH, 'utf-8'));
const manifest = readManifest();
const stats = { seeded: 0, bumped: 0, unchanged: 0, noDate: [] };

const routes = new Set([...Object.keys(hashes), ...Object.keys(PROXIED)]);
for (const route of [...routes].sort()) {
  const proxied = !!PROXIED[route] || NOISY.has(route);
  const hash = proxied ? null : hashes[route];
  const rec = manifest[route];
  if (!rec) {
    const d = await seedDate(route);
    if (!d) { stats.noDate.push(route); continue; }
    manifest[route] = { d, h: hash };
    stats.seeded++;
  } else if (!proxied && hash && rec.h !== hash) {
    // First fingerprint for a seeded entry only stores the hash; later differences are real changes.
    if (rec.h == null) manifest[route] = { d: rec.d, h: hash };
    else { manifest[route] = { d: today(), h: hash }; stats.bumped++; continue; }
    stats.seeded++;
  } else stats.unchanged++;
}
if (touch) {
  if (!manifest[touch]) { console.error(`${touch} has no record yet. Run the command without --touch first.`); process.exit(1); }
  manifest[touch] = { ...manifest[touch], d: today() };
  console.log(`Marked ${touch} as changed on ${today()}`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 1) + '\n', 'utf-8');
console.log(`sitemap-lastmod.json: ${stats.seeded} seeded from git, ${stats.bumped} changed (set to ${today()}), ${stats.unchanged} unchanged.`);
if (stats.noDate.length) console.log(`No date found (no <lastmod> will be written): ${stats.noDate.join(', ')}`);

import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const MANIFEST_PATH = join(__dirname, 'sitemap-lastmod.json');
/** Written by prerender.mjs on every run (git-ignored); read by update-sitemap-lastmod.mjs. */
export const HASHES_PATH = join(__dirname, '..', '.prerender-hashes.json');

/**
 * Stable fingerprint of what a visitor or crawler can read on a prerendered page: title, description, canonical and
 * the text of its headings, paragraphs, list items, table cells and quotes. Short fragments (animated counters, labels)
 * and the random "Verification: What is 3 + 4?" captcha are skipped, and scripts, styles, markup, ids and hashed asset
 * names are ignored, so a rebuild with no content change gives the same hash.
 */
export function contentHash(html) {
  const pick = (re) => (html.match(re) || [])[1] || '';
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/);
  const desc = pick(/<meta name="description" content="([^"]*)"/);
  const canon = pick(/<link rel="canonical" href="([^"]*)"/);
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>|<svg[\s\S]*?<\/svg>/g, ' ');
  const blocks = [];
  for (const m of body.matchAll(/<(h[1-6]|p|li|td|th|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const t = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (t.length >= 20 && !/^Verification:/i.test(t)) blocks.push(t);
  }
  return createHash('sha1').update([title, desc, canon, ...blocks].join('\n')).digest('hex').slice(0, 16);
}

/** { "/route": { d: "YYYY-MM-DD", h: "<hash or null>" } } */
export function readManifest() {
  if (!existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
}

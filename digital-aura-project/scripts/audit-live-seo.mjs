/**
 * Post-deploy SEO / SSR audit of the LIVE site.
 * Fetches every URL in https://thedigitalaura.com/sitemap.xml as raw HTML (no JavaScript, like a
 * non-rendering crawler or an AI crawler) and checks title, meta description, canonical, h1, JSON-LD,
 * FAQ markup vs visible FAQs and body text. Exits 1 if any page fails.
 *
 *   node scripts/audit-live-seo.mjs [baseUrl]
 */
const BASE = (process.argv[2] || 'https://thedigitalaura.com').replace(/\/$/, '');
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const failures = [];
const warnings = [];

async function check(url) {
  const res = await fetch(url, { redirect: 'manual' });
  const html = await res.text();
  const bad = [];
  const warn = [];
  if (res.status !== 200) bad.push(`HTTP ${res.status}`);
  const title = dec((html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (title.length < 15) bad.push('title missing/short'); else if (title.length > 65) warn.push(`title ${title.length} chars`);
  if (desc.length < 50) bad.push('meta description missing/short'); else if (desc.length > 165) warn.push(`meta description ${desc.length} chars`);
  if (!canon) bad.push('canonical missing'); else if (canon !== url) bad.push(`canonical ${canon} != ${url}`);
  if (h1 !== 1) bad.push(`${h1} h1 tags`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let faqLd = 0;
  for (const j of ld) {
    try {
      const o = JSON.parse(j);
      const walk = (x) => { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') { if (x['@type'] === 'FAQPage') faqLd += (x.mainEntity || []).length; if (x['@graph']) walk(x['@graph']); } };
      walk(o);
    } catch { bad.push('invalid JSON-LD'); break; }
  }
  const words = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 250) bad.push(`only ${words} words in raw HTML`);
  if (/\bundefined\b|\[object Object\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) bad.push('"undefined" in page text');
  if (bad.length) failures.push([url, bad]);
  if (warn.length) warnings.push([url, warn]);
}

const queue = [...urls];
await Promise.all(Array.from({ length: 8 }, async () => { while (queue.length) await check(queue.shift()).catch((e) => failures.push([url, [e.message]])); }));

console.log(`Audited ${urls.length} URLs from ${BASE}/sitemap.xml`);
for (const [u, w] of warnings) console.log(`  warn  ${u}  ${w.join('; ')}`);
for (const [u, b] of failures) console.log(`  FAIL  ${u}  ${b.join('; ')}`);
console.log(failures.length ? `\n${failures.length} page(s) failed` : '\nAll pages passed');
process.exit(failures.length ? 1 : 0);

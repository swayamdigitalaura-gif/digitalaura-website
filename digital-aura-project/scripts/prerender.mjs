import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dirname, '..');
const DIST    = join(ROOT, 'dist');
const PORT    = 5050;
const BASE    = `http://localhost:${PORT}`;

// All static routes — skip dynamic ones like /careers/:id
const HARDCODED_ROUTES = [
  '/',
  '/about',
  '/careers',
  '/engagement-models',
  '/case-studies',
  '/case-studies/riant-bikes',
  '/case-studies/prism-calibration',
  '/case-studies/ivf-clinic',
  '/case-studies/dp-electrical-repairs',
  '/case-studies/oblprint',
  '/case-studies/grand-palace',
  '/blog',
  '/contact',
  '/services',
  '/ai-solutions',
  '/testimonials',
  '/awards',
  '/website-development-services-ahmedabad',
  '/seo/free-audit',
  '/google-ads-audit-ahmedabad',
  '/website-redesign-services-ahmedabad',
  '/website-maintenance-amc-ahmedabad',
  '/seo/pricing',
  '/seo/doctors-hospitals-ahmedabad',
  '/seo/manufacturers-b2b-gujarat',
  '/google-ads-pricing-ahmedabad',
  '/google-ads-for-doctors-ahmedabad',
  '/meta-ads-agency-ahmedabad/pricing',
  '/meta-ads-agency-ahmedabad/clinics-doctors',
  '/website-development-cost-ahmedabad',
  '/website-design-cost-ahmedabad',
  '/website-packages-ahmedabad',
  '/website-design-for-doctors-ahmedabad',
  '/website-design-for-manufacturers-ahmedabad',
  '/mobile-apps',
  '/service-areas',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cancellation-refund-policy',
  '/services/ai-automation',
  '/services/ai-chatbot-assistant',
  '/services/ai-powered-web-apps',
  '/services/custom-ai-web-solutions',
  '/services/web-app-development',
  '/services/digital-marketing',
  '/services/design-branding',
  '/services/shopify-development',
  '/services/woocommerce-development',
  '/services/bigcommerce-development',
  '/services/full-stack-development',
  '/services/wordpress-development',
  '/services/seo-content-marketing',
  '/services/google-ads',
  '/services/meta-ads',
  '/services/social-media-marketing',
  '/services/email-whatsapp-marketing',
  '/services/linkedin-youtube-ads',
  '/services/cro',
  '/services/mobile-app-development',
  '/services/android-development',
  '/services/flutter-apps',
  '/services/react-native-apps',
  '/services/ai/llm-powered-apps',
  '/services/ai/chatbots-assistants',
  '/services/ai/workflow-automation',
  '/services/ai/predictive-analytics',
  '/services/ai/api-integration',
  '/services/ai/custom-ml-models',
  '/services/ai-filmmaking',
  '/services/seo-content-marketing/ecommerce-seo',
  '/services/seo-content-marketing/local-seo',
  '/services/seo-content-marketing/off-page-seo',
  '/services/seo-content-marketing/on-page-seo',
  '/services/seo-content-marketing/seo-audit-strategy',
  '/services/seo-content-marketing/technical-seo',
  '/website-design-development-ahmedabad',
  '/website-design-development-gujarat',
  '/shopify-website-design-ahmedabad',
  '/shopify-development-international',
  '/full-stack-development-ahmedabad',
  '/full-stack-development-gujarat',
  '/ai-automation-ahmedabad',
  '/ai-automation-gujarat',
  '/seo-agency-ahmedabad',
  '/seo-company-gujarat',
  '/seo-agency-international',
  '/ai-filmmaking-ahmedabad',
  '/ai-filmmaking-gujarat',
  '/woocommerce-website-design-ahmedabad',
  '/woocommerce-development-gujarat',
  '/mobile-app-development-ahmedabad',
  '/mobile-app-development-gujarat',
  '/google-ads-agency-ahmedabad',
  '/meta-ads-agency-ahmedabad',
  '/digital-marketing-agency-ahmedabad',
  '/digital-marketing-agency-gujarat',
];

// Every static <Route path="..."> in src/App.tsx is prerendered, so adding a page to the router is
// enough: it gets its own server-rendered HTML, canonical, schema and a sitemap entry automatically.
// (Dynamic routes such as /blog/:slug and /careers/:id are expanded separately below.)
function routesFromApp() {
  const app = readFileSync(join(ROOT, 'src', 'App.tsx'), 'utf-8');
  return [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p.startsWith('/') && !p.includes(':') && !p.includes('*'));
}
const ROUTES = [...new Set([...HARDCODED_ROUTES, ...routesFromApp()])];
const AUTO_ADDED = ROUTES.filter((r) => !HARDCODED_ROUTES.includes(r));

const SITE_URL = 'https://thedigitalaura.com';
const API_BASE = SITE_URL;

// The 11 SEO/AEO/GEO posts are static content (src/data/seoBlogPosts.ts),
// not database-driven, so they never show up in the /api/blogs fetch below.
// Without this, crawlers that don't execute JS get the generic homepage
// shell for every one of these URLs instead of the post's own title, meta,
// FAQ, and citations — read as plain text since this is a .mjs script with
// no TypeScript loader, matching the pattern used elsewhere in this repo's
// own tooling (see sync-pages.mjs).
function getStaticSeoBlogRoutes() {
  try {
    const filePath = join(ROOT, 'src', 'data', 'seoBlogPosts.ts');
    const src = readFileSync(filePath, 'utf-8');
    const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    return slugs.map((slug) => `/blog/${slug}`);
  } catch (err) {
    console.log(`  ⚠  Could not read static SEO blog slugs for prerendering: ${err.message}`);
    return [];
  }
}

// Fetch every published blog slug so each post gets its own prerendered
// page — otherwise crawlers/social previews only ever see the empty
// client-rendered shell for dynamic /blog/:slug routes.
async function fetchBlogRoutes() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs?status=published`);
    const data = await res.json();
    const slugs = (data?.data || []).map((b) => b.slug).filter(Boolean);
    return slugs.map((slug) => `/blog/${slug}`);
  } catch (err) {
    console.log(`  ⚠  Could not fetch blog slugs for prerendering: ${err.message}`);
    return [];
  }
}

// Same idea as fetchBlogRoutes(), for /careers/:id — this route type was
// never prerendered at all (only the /careers index was), so job pages had
// no server-rendered title/description/canonical for non-JS clients. The
// careers API has no `?status=` server-side filter (unlike /api/blogs), so
// filter to 'open' postings here — a closed listing shouldn't stay indexed.
async function fetchCareerRoutes() {
  try {
    const res = await fetch(`${API_BASE}/api/careers`);
    const data = await res.json();
    const slugs = (data?.data || [])
      .filter((j) => j.status === 'open')
      .map((j) => j.slug || j.id)
      .filter(Boolean);
    return slugs.map((slug) => `/careers/${slug}`);
  } catch (err) {
    console.log(`  ⚠  Could not fetch career slugs for prerendering: ${err.message}`);
    return [];
  }
}

function startServer() {
  return new Promise((resolve) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      cwd: ROOT,
      stdio: 'pipe',
      shell: true,
    });
    // give it 4 seconds to start
    setTimeout(() => resolve(proc), 4000);
  });
}

// The generic fallback shell that ships in index.html before any route's
// real data loads. If a blog post's prerendered HTML still contains this,
// its data fetch silently failed (API hiccup, slow backend, etc) during the
// prerender run — page.goto() succeeds either way, so that alone can't
// catch it. Without this check a blog post can ship to production with the
// HOMEPAGE's title/description/canonical baked into its raw HTML, which is
// exactly the SSR bug this script exists to prevent (it happened for real,
// silently, on 2026-07-28).
// Routes whose canonical deliberately points elsewhere (see CANONICAL_OVERRIDE in src/components/PageSEO.tsx).
const CANONICALISED_ROUTES = new Set(['/seo-agency-ahmedabad', '/website-design-development-ahmedabad']);

/**
 * SSR quality gate. Throws if the prerendered HTML is missing what a crawler (or an AI crawler that
 * does not run JavaScript) needs: exactly one h1, a unique title, a meta description, a self-referencing
 * canonical, parseable JSON-LD and real body text. A page that fails is NOT written, so the last good
 * version keeps serving, and the build fails loudly instead of shipping a thin shell.
 */
function assertSsrQuality(route, html) {
  const problems = [];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} h1 tags (need exactly 1)`);
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
  if (title.trim().length < 15) problems.push('missing or very short <title>');
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (desc.length < 50) problems.push('missing or very short meta description');
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  if (!canon) problems.push('missing canonical');
  else if (!CANONICALISED_ROUTES.has(route)) {
    const expected = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`;
    if (canon !== expected) problems.push(`canonical ${canon} does not match ${expected}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { problems.push('invalid JSON-LD'); break; }
  }
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (text < 150) problems.push(`only ${text} words of body text`);
  if (problems.length) throw new Error('SSR quality gate: ' + problems.join('; '));
}

const DEFAULT_TITLE = 'Digital Aura — Data-Driven Digital Marketing Agency';

function looksUnrendered(route, html) {
  const isBlogPost = route.startsWith('/blog/');
  const isJobPost  = route.startsWith('/careers/');
  if (!isBlogPost && !isJobPost) return false;
  if (html.includes(`<title>${DEFAULT_TITLE}</title>`)) return true;
  if (isBlogPost && html.includes('Blog post not found')) return true;
  if (isJobPost && html.includes('Job not found')) return true;
  return false;
}

// These are real live URLs on this domain, but nginx proxies each one to a
// separate app (landing-pages/, google-ads-page/) that this script never
// visits — they're added by hand here so the one sitemap this domain serves
// stays complete even though it can't prerender-verify them itself.
// Keep in sync with the `location` blocks in nginx-updated.conf.
const EXTRA_LIVE_ROUTES = [
  '/seo-services-ahmedabad',
  '/digital-marketing-company-ahmedabad',
];

// Only routes that actually prerendered successfully go in the sitemap —
// listing a route that failed (and so has no fresh dist/ file) would submit
// a URL to Google that's either 404ing or still serving a stale previous
// build, both worse than just leaving it out until the next successful run.
function writeSitemap(succeededRoutes) {
  // Those proxied apps 307-redirect "/path/" to "/path", so the no-slash URL
  // is the one that returns 200 and matches their canonical tags. Listing the
  // slash form here recreates a canonical/redirect loop.
  const noSlash = new Set([...EXTRA_LIVE_ROUTES, '/google-ads-agency-ahmedabad']);
  // Routes whose canonical points at another URL (see CANONICAL_OVERRIDE in
  // src/components/PageSEO.tsx) don't belong in the sitemap.
  const urls = [...new Set([...succeededRoutes, ...EXTRA_LIVE_ROUTES])].filter((route) => !CANONICALISED_ROUTES.has(route)).map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : noSlash.has(route) ? `${SITE_URL}${route}` : `${SITE_URL}${route}/`;
    const priority = route === '/' ? '1.0' : (route.startsWith('/blog/') || route.startsWith('/careers/')) ? '0.6' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  📝  Wrote sitemap.xml with ${succeededRoutes.length} URLs`);
}

async function main() {
  const staticSeoBlogRoutes = getStaticSeoBlogRoutes();
  const blogRoutes = await fetchBlogRoutes();
  const careerRoutes = await fetchCareerRoutes();
  const allRoutes = [...ROUTES, ...staticSeoBlogRoutes, ...blogRoutes, ...careerRoutes];
  if (AUTO_ADDED.length) console.log(`  ➕  ${AUTO_ADDED.length} route(s) taken from App.tsx: ${AUTO_ADDED.join(', ')}`);
  console.log(`\n🚀  Prerendering ${allRoutes.length} routes (${ROUTES.length} static + ${staticSeoBlogRoutes.length} static SEO posts + ${blogRoutes.length} DB blog posts + ${careerRoutes.length} open job posts) (API → https://thedigitalaura.com/api/)...\n`);

  // Keep the untouched SPA shell as 404.html BEFORE the "/" route overwrites dist/index.html. Nothing uses it until nginx
  // is told "error_page 404 /404.html" (see the 404 notes in the PR); at that point unknown URLs get a real HTTP 404 and
  // this shell loads, and the router then renders the NotFound page for the original URL.
  const shell = join(DIST, 'index.html');
  if (existsSync(shell)) copyFileSync(shell, join(DIST, '404.html'));

  const server = await startServer();

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    });

    let ok = 0, fail = 0;
    const succeededRoutes = [];
    const MAX_ATTEMPTS = 4;

    for (const route of allRoutes) {
      let lastErr;
      let succeeded = false;

      for (let attempt = 1; attempt <= MAX_ATTEMPTS && !succeeded; attempt++) {
        const page = await ctx.newPage();
        try {
          // suppress console noise from the page
          page.on('console', () => {});
          page.on('pageerror', () => {});

          // 'networkidle' was too fragile: pages with client-logo images
          // hotlinked to dozens of external client sites never go idle if
          // any single one of those third-party domains is slow to respond,
          // so the whole page timed out waiting on someone else's server.
          // 'domcontentloaded' only waits for our own HTML/JS, not external
          // image/XHR traffic — React has already mounted by then, and the
          // explicit wait below covers its own data fetches finishing.
          await page.goto(`${BASE}${route}`, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
          });

          // extra wait so React fully settles; blog posts and job pages get
          // longer since their SEO tags land in a *second* effect that only
          // fires after the fetch resolves, not on first paint.
          const isDynamicDetail = route.startsWith('/blog/') || route.startsWith('/careers/');
          await page.waitForTimeout(isDynamicDetail ? 1500 : 1000);
          // Wait for the page's own h1: detail pages render it only after their API fetch resolves,
          // so a slow API would otherwise be captured as a page with no content.
          await page.waitForSelector('h1', { timeout: isDynamicDetail ? 15000 : 8000 }).catch(() => {});

          let html = await page.content();

          if (looksUnrendered(route, html)) {
            throw new Error('page loaded but blog data never rendered (still showing the default shell) — likely a slow/failed API fetch inside the page');
          }

          assertSsrQuality(route, html);

          // build the output file path
          const parts  = route === '/' ? [] : route.slice(1).split('/');
          const file   = join(DIST, ...parts, 'index.html');
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, html, 'utf-8');

          console.log(`  ✓  ${route}${attempt > 1 ? ` (attempt ${attempt})` : ''}`);
          ok++;
          succeeded = true;
          succeededRoutes.push(route);
        } catch (err) {
          lastErr = err;
        } finally {
          await page.close();
        }
      }

      if (!succeeded) {
        console.log(`  ✗  ${route}  —  ${lastErr.message.split('\n')[0]} (failed after ${MAX_ATTEMPTS} attempts)`);
        fail++;
      }
    }

    console.log(`\n✅  Prerender complete — ${ok} succeeded, ${fail} failed\n`);
    writeSitemap(succeededRoutes);
    // A blog post that fails validation on every attempt is never written to
    // disk, so any file already in dist/ for that slug from a *previous*
    // successful deploy is left untouched by this run — the rsync step in
    // deploy.yml has no --delete, so the last known-good page keeps serving
    // instead of being silently replaced by a broken one.
    process.exit(fail > 0 ? 1 : 0);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch(err => { console.error(err); process.exit(1); });

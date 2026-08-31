import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dirname, '..');
const DIST    = join(ROOT, 'dist');
const PORT    = 5050;
const BASE    = `http://localhost:${PORT}`;

// All static routes — skip dynamic ones like /careers/:id
const ROUTES = [
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
  '/blog',
  '/contact',
  '/services',
  '/ai-solutions',
  '/testimonials',
  '/awards',
  '/website-development-services-ahmedabad',
  '/mobile-apps',
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

const SITE_URL = 'https://thedigitalaura.com';
const API_BASE = SITE_URL;

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
const DEFAULT_TITLE = 'Digital Aura — Data-Driven Digital Marketing Agency';

function looksUnrendered(route, html) {
  const isBlogPost = route.startsWith('/blog/');
  if (!isBlogPost) return false;
  return html.includes(`<title>${DEFAULT_TITLE}</title>`) || html.includes('Blog post not found');
}

// These are real live URLs on this domain, but nginx proxies each one to a
// separate app (landing-pages/, google-ads-page/) that this script never
// visits — they're added by hand here so the one sitemap this domain serves
// stays complete even though it can't prerender-verify them itself.
// Keep in sync with the `location` blocks in nginx-updated.conf.
const EXTRA_LIVE_ROUTES = [
  '/seo-services-ahmedabad',
  '/google-ads-agency-ahmedabad',
  '/digital-marketing-company-ahmedabad',
];

// Only routes that actually prerendered successfully go in the sitemap —
// listing a route that failed (and so has no fresh dist/ file) would submit
// a URL to Google that's either 404ing or still serving a stale previous
// build, both worse than just leaving it out until the next successful run.
function writeSitemap(succeededRoutes) {
  const urls = [...succeededRoutes, ...EXTRA_LIVE_ROUTES].map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`;
    const priority = route === '/' ? '1.0' : route.startsWith('/blog/') ? '0.6' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  📝  Wrote sitemap.xml with ${succeededRoutes.length} URLs`);
}

async function main() {
  const blogRoutes = await fetchBlogRoutes();
  const allRoutes = [...ROUTES, ...blogRoutes];
  console.log(`\n🚀  Prerendering ${allRoutes.length} routes (${ROUTES.length} static + ${blogRoutes.length} blog posts) (API → https://thedigitalaura.com/api/)...\n`);

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

          // extra wait so React fully settles; blog posts get longer since
          // their SEO tags land in a *second* effect that only fires after
          // the fetch resolves, not on first paint.
          await page.waitForTimeout(route.startsWith('/blog/') ? 1500 : 1000);

          let html = await page.content();

          if (looksUnrendered(route, html)) {
            throw new Error('page loaded but blog data never rendered (still showing the default shell) — likely a slow/failed API fetch inside the page');
          }

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

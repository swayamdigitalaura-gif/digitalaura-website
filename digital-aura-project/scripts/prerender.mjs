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
  '/blog',
  '/contact',
  '/services',
  '/ai-solutions',
  '/testimonials',
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
];

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

async function main() {
  console.log(`\n🚀  Prerendering ${ROUTES.length} routes (API → https://thedigitalaura.com/api/)...\n`);

  const server = await startServer();

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    });

    let ok = 0, fail = 0;

    for (const route of ROUTES) {
      try {
        const page = await ctx.newPage();

        // suppress console noise from the page
        page.on('console', () => {});
        page.on('pageerror', () => {});

        await page.goto(`${BASE}${route}`, {
          waitUntil: 'networkidle',
          timeout: 20000,
        });

        // extra wait so React fully settles
        await page.waitForTimeout(600);

        const html = await page.content();

        // build the output file path
        const parts  = route === '/' ? [] : route.slice(1).split('/');
        const file   = join(DIST, ...parts, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html, 'utf-8');

        console.log(`  ✓  ${route}`);
        ok++;
        await page.close();
      } catch (err) {
        console.log(`  ✗  ${route}  —  ${err.message.split('\n')[0]}`);
        fail++;
      }
    }

    console.log(`\n✅  Prerender complete — ${ok} succeeded, ${fail} failed\n`);
    process.exit(fail > 0 ? 1 : 0);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch(err => { console.error(err); process.exit(1); });

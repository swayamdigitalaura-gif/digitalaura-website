const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Page, Blog, Setting } = require('../models');

const WEB_ROOT = '/home/digitalaura.temp/public_html';
const SITE_URL = 'https://thedigitalaura.com';

const STATIC_ROUTES = [
  { path: '/',                                    priority: '1.0', changefreq: 'weekly'  },
  { path: '/about/',                              priority: '0.9', changefreq: 'monthly' },
  { path: '/services/',                           priority: '0.9', changefreq: 'monthly' },
  { path: '/ai-solutions/',                       priority: '0.9', changefreq: 'monthly' },
  { path: '/contact/',                            priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/',                               priority: '0.8', changefreq: 'daily'   },
  { path: '/case-studies/',                       priority: '0.8', changefreq: 'weekly'  },
  { path: '/testimonials/',                       priority: '0.8', changefreq: 'weekly'  },
  { path: '/careers/',                            priority: '0.7', changefreq: 'weekly'  },
  { path: '/engagement-models/',                  priority: '0.7', changefreq: 'monthly' },
  { path: '/mobile-apps/',                        priority: '0.8', changefreq: 'monthly' },
  // Core services
  { path: '/services/seo-content-marketing/',     priority: '0.9', changefreq: 'monthly' },
  { path: '/services/google-ads/',                priority: '0.9', changefreq: 'monthly' },
  { path: '/services/meta-ads/',                  priority: '0.9', changefreq: 'monthly' },
  { path: '/services/full-stack-development/',    priority: '0.9', changefreq: 'monthly' },
  { path: '/services/wordpress-development/',     priority: '0.9', changefreq: 'monthly' },
  { path: '/services/shopify-development/',       priority: '0.8', changefreq: 'monthly' },
  { path: '/services/woocommerce-development/',   priority: '0.8', changefreq: 'monthly' },
  { path: '/services/web-app-development/',       priority: '0.8', changefreq: 'monthly' },
  { path: '/services/mobile-app-development/',    priority: '0.9', changefreq: 'monthly' },
  { path: '/services/android-development/',       priority: '0.8', changefreq: 'monthly' },
  { path: '/services/flutter-apps/',              priority: '0.8', changefreq: 'monthly' },
  { path: '/services/react-native-apps/',         priority: '0.8', changefreq: 'monthly' },
  { path: '/services/digital-marketing/',         priority: '0.8', changefreq: 'monthly' },
  { path: '/services/design-branding/',           priority: '0.7', changefreq: 'monthly' },
  { path: '/services/email-whatsapp-marketing/',  priority: '0.7', changefreq: 'monthly' },
  { path: '/services/linkedin-youtube-ads/',      priority: '0.7', changefreq: 'monthly' },
  { path: '/services/cro/',                       priority: '0.7', changefreq: 'monthly' },
  // AI services
  { path: '/services/ai-automation/',             priority: '0.9', changefreq: 'monthly' },
  { path: '/services/ai-chatbot-assistant/',      priority: '0.9', changefreq: 'monthly' },
  { path: '/services/ai-powered-web-apps/',       priority: '0.8', changefreq: 'monthly' },
  { path: '/services/custom-ai-web-solutions/',   priority: '0.8', changefreq: 'monthly' },
  { path: '/services/ai/llm-powered-apps/',       priority: '0.9', changefreq: 'monthly' },
  { path: '/services/ai/chatbots-assistants/',    priority: '0.9', changefreq: 'monthly' },
  { path: '/services/ai/workflow-automation/',    priority: '0.8', changefreq: 'monthly' },
  { path: '/services/ai/predictive-analytics/',   priority: '0.8', changefreq: 'monthly' },
  { path: '/services/ai/api-integration/',        priority: '0.8', changefreq: 'monthly' },
  { path: '/services/ai/custom-ml-models/',       priority: '0.8', changefreq: 'monthly' },
  // Legal
  { path: '/privacy-policy/',                     priority: '0.3', changefreq: 'yearly'  },
  { path: '/terms-and-conditions/',               priority: '0.3', changefreq: 'yearly'  },
  { path: '/cancellation-refund-policy/',         priority: '0.3', changefreq: 'yearly'  },
];

const escape = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

exports.getSitemap = async (req, res) => {
  try {
    const [pages, blogs] = await Promise.all([
      Page.findAll({ where: { status: 'published' }, attributes: ['slug', 'updatedAt'] }),
      Blog.findAll({ where: { status: 'published' }, attributes: ['slug', 'updatedAt'] }),
    ]);

    const urls = [];

    STATIC_ROUTES.forEach(r => {
      urls.push(`  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`);
    });

    blogs.forEach(b => {
      urls.push(`  <url>\n    <loc>${SITE_URL}/blog/${escape(b.slug)}</loc>\n    <lastmod>${new Date(b.updatedAt).toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    try { fs.writeFileSync(path.join(WEB_ROOT, 'sitemap.xml'), xml, 'utf8'); } catch {}

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.generateSitemap = async (req, res) => {
  try {
    const [pages, blogs] = await Promise.all([
      Page.findAll({ where: { status: 'published' }, attributes: ['slug', 'updatedAt'] }),
      Blog.findAll({ where: { status: 'published' }, attributes: ['slug', 'updatedAt'] }),
    ]);

    const urls = [];
    STATIC_ROUTES.forEach(r => {
      urls.push(`  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`);
    });
    blogs.forEach(b => {
      urls.push(`  <url>\n    <loc>${SITE_URL}/blog/${escape(b.slug)}</loc>\n    <lastmod>${new Date(b.updatedAt).toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
    fs.writeFileSync(path.join(WEB_ROOT, 'sitemap.xml'), xml, 'utf8');
    res.json({ success: true, message: 'sitemap.xml generated', url: `${SITE_URL}/sitemap.xml`, xml });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getRobots = async (req, res) => {
  try {
    const setting = await Setting.findOne({ where: { key: 'robots_txt' } });
    if (setting) {
      res.set('Content-Type', 'text/plain');
      return res.send(setting.value);
    }
    const defaultRobots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`;
    res.set('Content-Type', 'text/plain');
    res.send(defaultRobots);
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getRobotsForAdmin = async (req, res) => {
  try {
    const setting = await Setting.findOne({ where: { key: 'robots_txt' } });
    const defaultRobots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`;
    res.json({ success: true, content: setting ? setting.value : defaultRobots });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateRobots = async (req, res) => {
  try {
    const { content } = req.body;
    const [setting] = await Setting.findOrCreate({
      where: { key: 'robots_txt' },
      defaults: { value: content, type: 'text', group: 'seo', label: 'robots.txt Content' },
    });
    if (setting.value !== content) await setting.update({ value: content });
    try { fs.writeFileSync(path.join(WEB_ROOT, 'robots.txt'), content, 'utf8'); } catch {}
    res.json({ success: true, message: 'robots.txt updated' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// Inject head/body code into every prerendered HTML file on disk
function injectGlobalCode(headCode, bodyCode) {
  try {
    const out = execSync(
      `find ${WEB_ROOT} -name "index.html" -not -path "*/admin-panel/*"`,
      { encoding: 'utf8' }
    ).trim();
    const files = out.split('\n').filter(Boolean);

    for (const file of files) {
      let html = fs.readFileSync(file, 'utf8');

      // Remove previous injections
      html = html.replace(/<!-- DA:HEAD:START -->[\s\S]*?<!-- DA:HEAD:END -->/g, '');
      html = html.replace(/<!-- DA:BODY:START -->[\s\S]*?<!-- DA:BODY:END -->/g, '');

      // Inject new head code
      if (headCode && headCode.trim()) {
        html = html.replace('</head>', `<!-- DA:HEAD:START -->\n${headCode.trim()}\n<!-- DA:HEAD:END -->\n</head>`);
      }
      // Inject new body code
      if (bodyCode && bodyCode.trim()) {
        html = html.replace('</body>', `<!-- DA:BODY:START -->\n${bodyCode.trim()}\n<!-- DA:BODY:END -->\n</body>`);
      }

      fs.writeFileSync(file, html, 'utf8');
    }
    console.log(`[header-footer] Injected into ${files.length} HTML files`);
  } catch (err) {
    console.error('[header-footer] inject failed:', err.message);
  }
}

exports.getHeaderFooter = async (req, res) => {
  try {
    const [head, body] = await Promise.all([
      Setting.findOne({ where: { key: 'global_head_code' } }),
      Setting.findOne({ where: { key: 'global_body_code' } }),
    ]);
    res.json({ success: true, head_code: head?.value || '', body_code: body?.value || '' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.updateHeaderFooter = async (req, res) => {
  try {
    const { head_code = '', body_code = '' } = req.body;

    const upsert = async (key, value, label) => {
      const [s] = await Setting.findOrCreate({
        where: { key },
        defaults: { value, type: 'text', group: 'seo', label },
      });
      if (s.value !== value) await s.update({ value });
    };

    await Promise.all([
      upsert('global_head_code', head_code, 'Global Head Code'),
      upsert('global_body_code', body_code, 'Global Body Code'),
    ]);

    injectGlobalCode(head_code, body_code);

    res.json({ success: true, message: 'Header & Footer code saved and injected into all pages' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

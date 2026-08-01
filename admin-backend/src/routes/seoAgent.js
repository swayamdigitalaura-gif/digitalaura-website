/**
 * SEO Autopilot connector — tailored for the Digital Aura admin-backend
 * (Express 5 + Sequelize + MySQL). Drop-in Express router.
 *
 * It lets the central automation (GitHub Actions + Supabase, run by the agency)
 * apply ALREADY-HUMAN-APPROVED changes to this site. No AI / scheduling / decisions
 * happen here. This file only:
 *   1. Checks a shared-secret header so random internet traffic can't call it.
 *   2. Reads/writes your existing Blog / Page Sequelize models.
 */

const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Blog = require('../models/Blog');
const Page = require('../models/Page');
const { ContactInquiry } = require('../models');

// ---- Auth middleware — do not remove ----
function requireSharedSecret(req, res, next) {
  const provided = req.header('X-Seo-Agent-Secret');
  if (!provided || provided !== process.env.SEO_AGENT_SHARED_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

router.use(express.json({ limit: '2mb' }));
router.use(requireSharedSecret);

// Drop keys whose value is undefined so we never overwrite an existing column with null.
function pruneUndefined(obj) {
  Object.keys(obj).forEach((k) => obj[k] === undefined && delete obj[k]);
  return obj;
}

// ---- Health ----
router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ---- PUBLISH — upsert a blog post by slug ----
// Called ONLY after a human approved the draft in Supabase. Defaults to writing
// the post as a DRAFT in your CMS (one final visual check in your admin panel);
// pass cmsStatus: 'published' to push it fully live automatically.
router.post('/publish', async (req, res) => {
  if (req.body.approvedByHuman !== true) {
    return res.status(403).json({ error: 'missing approvedByHuman flag — refusing to publish' });
  }
  try {
    const {
      slug, title, content, excerpt, metaTitle, metaDescription,
      keywords, category, tags, cmsStatus,
    } = req.body;
    if (!slug || !title) return res.status(400).json({ error: 'slug and title are required' });

    const fields = pruneUndefined({
      title,
      content,
      excerpt,
      meta_title: metaTitle,
      meta_desc: metaDescription,
      keywords,
      category,
      tags: Array.isArray(tags) ? JSON.stringify(tags) : undefined,
      status: cmsStatus === 'published' ? 'published' : 'draft',
    });

    const existing = await Blog.findOne({ where: { slug } });
    const blog = existing ? await existing.update(fields) : await Blog.create({ slug, ...fields });
    res.json({ status: 'ok', action: existing ? 'updated' : 'created', id: blog.id, cmsStatus: fields.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- PAGE SEO — update a static page's SEO metadata by slug ----
// Called ONLY after a human approved the change in the SEO Autopilot panel.
// Metadata only: a page's visible body content lives in the React source, not
// here, so this route can never alter what a visitor reads on the page.
router.post('/page/seo', async (req, res) => {
  if (req.body.approvedByHuman !== true) {
    return res.status(403).json({ error: 'missing approvedByHuman flag — refusing to update' });
  }
  try {
    const { slug, metaTitle, metaDescription, keywords, canonical, ogImage } = req.body;
    if (!slug) return res.status(400).json({ error: 'slug is required' });

    const page = await Page.findOne({ where: { slug } });
    if (!page) return res.status(404).json({ error: `no page with slug "${slug}"` });

    const fields = pruneUndefined({
      meta_title: metaTitle,
      meta_desc: metaDescription,
      keywords,
      canonical,
      og_image: ogImage,
    });
    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'no updatable fields supplied' });
    }

    await page.update(fields);
    res.json({ status: 'ok', id: page.id, updated: Object.keys(fields) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- ANALYTICS SUMMARY — read-only counts for the SEO Autopilot panel's
// Analytics tab. Never writes anything; just counts existing rows so the
// panel can show real content/lead numbers without needing DB access. ----
router.post('/analytics/summary', async (req, res) => {
  try {
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sincePrev30 = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const [
      totalBlogsPublished, totalPagesPublished,
      leadsLast30Days, leadsPrev30Days, leadsAllTime,
    ] = await Promise.all([
      Blog.count({ where: { status: 'published' } }),
      Page.count({ where: { status: 'published' } }),
      ContactInquiry.count({ where: { createdAt: { [Op.gte]: since30 } } }),
      ContactInquiry.count({ where: { createdAt: { [Op.gte]: sincePrev30, [Op.lt]: since30 } } }),
      ContactInquiry.count(),
    ]);

    res.json({
      status: 'ok',
      totalBlogsPublished,
      totalPagesPublished,
      leadsLast30Days,
      leadsPrev30Days,
      leadsAllTime,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- SCHEMA UPDATE — set JSON-LD (schema_code) on a page or blog by slug ----
router.post('/schema/update', async (req, res) => {
  try {
    const { slug, jsonLd } = req.body;
    if (!slug || !jsonLd) return res.status(400).json({ error: 'slug and jsonLd are required' });
    const code = typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd);

    let target = await Page.findOne({ where: { slug } });
    let type = 'page';
    if (!target) { target = await Blog.findOne({ where: { slug } }); type = 'blog'; }
    if (!target) return res.status(404).json({ error: `no page/blog with slug "${slug}"` });

    await target.update({ schema_code: code });
    res.json({ status: 'ok', type, id: target.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- INTERNAL LINKS — insert links into a blog post's HTML content ----
// Blogs only: they store clean HTML in `content`. (Pages use GrapesJS JSON, which
// isn't safe to string-edit, so they are intentionally skipped here.)
router.post('/internal-links/apply', async (req, res) => {
  try {
    const { slug, links } = req.body; // links: [{ anchorText, targetUrl }]
    if (!slug || !Array.isArray(links)) return res.status(400).json({ error: 'slug and links[] are required' });

    const blog = await Blog.findOne({ where: { slug } });
    if (!blog) return res.status(404).json({ error: `no blog with slug "${slug}"` });

    let html = blog.content || '';
    let added = 0;
    for (const { anchorText, targetUrl } of links) {
      if (!anchorText || !targetUrl) continue;
      if (html.includes(`href="${targetUrl}"`)) continue; // already linked
      const escaped = anchorText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b(${escaped})\\b`);
      if (re.test(html)) {
        html = html.replace(re, `<a href="${targetUrl}">$1</a>`);
        added++;
      }
    }
    await blog.update({ content: html });
    res.json({ status: 'ok', id: blog.id, linksAdded: added });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- SITEMAP — regenerate from published pages + blogs ----
router.post('/sitemap/regenerate', async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const baseUrl = (process.env.SITE_BASE_URL || 'https://thedigitalaura.com').replace(/\/+$/, '');

    const [pages, blogs] = await Promise.all([
      Page.findAll({ where: { status: 'published' } }),
      Blog.findAll({ where: { status: 'published' } }),
    ]);
    const urls = [
      ...pages.map((p) => `${baseUrl}/${p.slug}`),
      ...blogs.map((b) => `${baseUrl}/blog/${b.slug}`),
    ];
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
      `\n</urlset>\n`;

    const outPath = process.env.SITEMAP_PATH || path.join(__dirname, '../../../public/sitemap.xml');
    fs.writeFileSync(outPath, xml, 'utf8');
    res.json({ status: 'ok', urlCount: urls.length, wrote: outPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

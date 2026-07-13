const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Page, Section } = require('../models');

const WEB_ROOT = '/home/digitalaura.temp/public_html';

// Inject or replace schema_code inside a prerendered HTML file on disk
function injectSchemaIntoPrerendered(slug, schemaCode) {
  try {
    // Find the prerendered index.html for this slug (search up to 3 levels deep)
    const result = execSync(
      `find ${WEB_ROOT} -maxdepth 4 -type f -name "index.html" -path "*/${slug}/index.html" 2>/dev/null | head -1`,
      { encoding: 'utf8' }
    ).trim();
    if (!result) return;

    let html = fs.readFileSync(result, 'utf8');

    // Remove all existing ld+json script tags
    html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

    // Unescape literal \n stored by MySQL, parse and re-stringify as clean compact JSON
    let cleanSchema = schemaCode;
    try {
      const unescaped = schemaCode.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '');
      cleanSchema = JSON.stringify(JSON.parse(unescaped));
    } catch { /* use as-is if parse fails */ }

    // Inject new schema before </head>
    const tag = `<script type="application/ld+json">${cleanSchema}</script>`;
    html = html.replace('</head>', `${tag}\n</head>`);

    fs.writeFileSync(result, html, 'utf8');
    console.log(`[schema] Injected into ${result}`);
  } catch (err) {
    console.error('[schema] inject failed:', err.message);
  }
}

exports.getAll = async (req, res) => {
  try {
    const pages = await Page.findAll({ order: [['createdAt', 'ASC']] });
    res.json({ success: true, data: pages });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Section, as: 'sections', order: [['order_index', 'ASC']] }],
    });
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.json({ success: true, data: page });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    await page.update(req.body);

    // If schema_code was updated, inject it into the prerendered HTML immediately
    if (req.body.schema_code !== undefined) {
      const schemaCode = req.body.schema_code?.trim();
      if (schemaCode) {
        injectSchemaIntoPrerendered(page.slug, schemaCode);
      }
    }

    res.json({ success: true, data: page });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.saveBuilder = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    const gd = req.body.grapes_data;
    await page.update({ grapes_data: typeof gd === 'string' ? gd : JSON.stringify(gd), status: req.body.status || page.status });
    res.json({ success: true, message: 'Builder data saved', data: page });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.publish = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    await page.update({ status: 'published' });
    res.json({ success: true, message: 'Page published' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    await page.destroy();
    res.json({ success: true, message: 'Page deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

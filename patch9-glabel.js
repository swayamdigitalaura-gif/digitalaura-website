const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';

// Files with {g.label} in p tags (group label)
const gLabelFiles = {
  'BigCommercePage': 'bigcommerce', 'CROPage': 'cro', 'EmailWhatsAppPage': 'emailwa',
  'GoogleAdsPage': 'gads', 'LinkedInYouTubePage': 'linkedin', 'MetaAdsPage': 'metaads',
  'SEOPage': 'seo', 'ShopifyPage': 'shopify', 'WooCommercePage': 'woo',
};

// Files with {t.label} in span (not in p) - WorkflowAutomationPage line 298
const tLabelSpanFiles = { 'WorkflowAutomationPage': 'workflow' };

// Files with {t.label} inside span in p (SEO, MetaAds, GoogleAds lines with just {t.label})
const tLabelInlineFiles = { 'SEOPage': 'seo', 'MetaAdsPage': 'metaads', 'GoogleAdsPage': 'gads' };

Object.entries(gLabelFiles).forEach(([name, prefix]) => {
  const fpath = path.join(dir, `${name}.tsx`);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g)||[]).length;

  // <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: g.color }}>{g.label}</p>
  src = src.replace(
    /(<p className="text-\[11px\] font-bold uppercase tracking-wider mb-3"[^>]*>)\{g\.label\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_g_\${i}_label\`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span>${close}`
  );

  const after = (src.match(/data-cms-key=/g)||[]).length;
  if (after > before) { fs.writeFileSync(fpath, src.replace(/\n/g,'\r\n')); console.log(`PATCHED ${name}: +${after-before}`); }
  else console.log(`no change: ${name}`);
});

// WorkflowAutomationPage: {t.label} in span
{
  const fpath = path.join(dir, 'WorkflowAutomationPage.tsx');
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g)||[]).length;
  src = src.replace(
    /(<span className="text-\[14\.5px\] text-\[#374151\]">)\{t\.label\}(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`workflow_tl_\${i}_label\`} data-cms-label="Tool Label" data-cms-attr="text">{t.label}</span>${close}`
  );
  const after = (src.match(/data-cms-key=/g)||[]).length;
  if (after > before) { fs.writeFileSync(fpath, src.replace(/\n/g,'\r\n')); console.log(`PATCHED WorkflowAutomationPage (span): +${after-before}`); }
}

// SEO/Meta/Google: {t.label} as direct text child (not in p, just in div/span context)
['SEOPage','MetaAdsPage','GoogleAdsPage'].forEach((name) => {
  const prefixMap = { 'SEOPage': 'seo', 'MetaAdsPage': 'metaads', 'GoogleAdsPage': 'gads' };
  const prefix = prefixMap[name];
  const fpath = path.join(dir, `${name}.tsx`);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g)||[]).length;
  // These have {t.label} as a bare JSX text node inside a div/span
  // Context from grep: line like "              {t.label}"
  // Wrap by finding the line and replacing - look at surrounding span context
  src = src.replace(
    /^(\s+)\{t\.label\}$/mg,
    (m, indent) => `${indent}<span data-cms-key={\`${prefix}_tl_\${i}_label\`} data-cms-label="Tab Label" data-cms-attr="text">{t.label}</span>`
  );
  const after = (src.match(/data-cms-key=/g)||[]).length;
  if (after > before) { fs.writeFileSync(fpath, src.replace(/\n/g,'\r\n')); console.log(`PATCHED ${name} (t.label): +${after-before}`); }
  else console.log(`no change ${name}`);
});

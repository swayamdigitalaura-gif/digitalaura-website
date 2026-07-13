const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';

const prefixMap = {
  'AIAutomationPage': 'aiauto', 'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp', 'CustomAIWebSolutionsPage': 'customai',
  'FullStackDevelopmentPage': 'fullstack', 'BigCommercePage': 'bigcommerce',
  'CROPage': 'cro', 'DesignBrandingPage': 'design', 'DigitalMarketingPage': 'digmkt',
  'EmailWhatsAppPage': 'emailwa', 'GoogleAdsPage': 'gads',
  'LinkedInYouTubePage': 'linkedin', 'MetaAdsPage': 'metaads',
  'SEOPage': 'seo', 'ShopifyPage': 'shopify', 'WebAppDevPage': 'webapp',
  'WooCommercePage': 'woo',
};

fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = prefixMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  // 1. Small uppercase label h2: <h2 className="text-[13px] font-black uppercase...">TEXT flex items...</h2>
  // These have child spans (icon dividers), so text is mixed. Tag just the text content after spans
  // Pattern: ...>TEXT</h2> where TEXT is pure static after flex items
  src = src.replace(
    /(<h2 className="text-\[13px\] font-black uppercase[^"]*"[^>]*>)([^<{\n]+)(<\/h2>)/g,
    (m, open, text, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 2) return m;
      return `${open}<span data-cms-key="${prefix}_h2lbl_${n++}" data-cms-label="Section Label" data-cms-attr="text">${t}</span>${close}`;
    }
  );

  // 2. h2 with text + <br/> spanning two lines
  // Use multiline approach: find h2 opening, then grab everything until </h2>
  src = src.replace(
    /(<h2 className="text-3xl[^"]*"[^>]*>)\s*\n\s*([A-Za-z][^<{\n]{2,}?)(<br[^>]*\/>)\s*([^<{\n]{2,}?)\s*\n\s*(<\/h2>)/g,
    (m, open, t1, br, t2, close) => {
      if (m.includes('data-cms-key')) return m;
      const key1 = `${prefix}_h2_${n++}`;
      const key2 = `${prefix}_h2_${n++}`;
      return `${open}\n            <span data-cms-key="${key1}" data-cms-label="Heading Line 1" data-cms-attr="text">${t1.trim()}</span>${br} <span data-cms-key="${key2}" data-cms-label="Heading Line 2" data-cms-attr="text">${t2.trim()}</span>\n          ${close}`;
    }
  );

  // 3. h2 with just text + <br/> on same line
  src = src.replace(
    /(<h2[^>]*>)\s*([A-Za-z][^<{\n]{2,}?)(<br[^>]*\/>)\s*([^<{\n]{2,}?)\s*(<\/h2>)/g,
    (m, open, t1, br, t2, close) => {
      if (m.includes('data-cms-key')) return m;
      const key1 = `${prefix}_h2_${n++}`;
      const key2 = `${prefix}_h2_${n++}`;
      return `${open}<span data-cms-key="${key1}" data-cms-label="Heading Line 1" data-cms-attr="text">${t1.trim()}</span>${br} <span data-cms-key="${key2}" data-cms-label="Heading Line 2" data-cms-attr="text">${t2.trim()}</span>${close}`;
    }
  );

  // 4. h2 with text-[42px] style (big headings with child span gradient)
  // Text before the first child tag
  src = src.replace(
    /(<h2 className="text-3xl[^"]*"[^>]*>)\s*([A-Za-z][^<{\n]{3,}?)\s*(<span)/g,
    (m, open, text, spanStart) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 3) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${t}</span> ${spanStart}`;
    }
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${name}: +${after - before} keys`);
  } else {
    console.log(`no change: ${name}`);
  }
});

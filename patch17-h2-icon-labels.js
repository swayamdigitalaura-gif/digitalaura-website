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
  'WooCommercePage': 'woo', 'MobileAppDevPage': 'mobileapp',
  'AIApiIntegrationPage': 'aiapi', 'CustomMLModelsPage': 'mlmodels',
  'ChatbotsAssistantsPage': 'chatbots', 'LLMPoweredAppsPage': 'llmapps',
  'WorkflowAutomationPage': 'workflow', 'PredictiveAnalyticsPage': 'predictive',
};

fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = prefixMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  // Pattern 1: text-[13px] uppercase h2 with icon span child
  // <h2 className="text-[13px] font-black uppercase...">
  //   <span className="w-4 h-0.5..."/> TEXT
  // </h2>
  src = src.replace(
    /(<h2 className="text-\[13px\] font-black uppercase[^"]*"[^>]*>)\s*\n?\s*(<span className="w-4[^"]*"[^\/]*\/>)\s*([A-Za-z][^\n<{]+?)\s*\n?\s*(<\/h2>)/g,
    (m, open, iconSpan, text, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 2) return m;
      return `${open}\n            ${iconSpan} <span data-cms-key="${prefix}_h2lbl_${n++}" data-cms-label="Section Label" data-cms-attr="text">${t}</span>\n          ${close}`;
    }
  );

  // Pattern 2: text-3xl md:text-[42px] h2 with text before gradient span
  // <h2 ...> TEXT <span style={gradient}>WORD</span> </h2>  (single line)
  src = src.replace(
    /(<h2 className="text-3xl[^"]*"[^>]*>)\s*([A-Za-z][^<\n{]{2,}?)\s*(<span style)/g,
    (m, open, text, spanStart) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 2) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${t}</span> ${spanStart}`;
    }
  );

  // Pattern 3: multiline h2 text + br - second attempt with different format
  // <h2 ...>\n  TEXT\n  <br className=.../>\n  MORE TEXT\n</h2>
  src = src.replace(
    /(<h2 className="text-3xl[^"]*"[^>]*>)\s*\n\s*([A-Za-z][^<{\n]{2,}?)\s*\n\s*(<br[^>]*\/>)\s*\n?\s*([^<{\n]{2,}?)\s*\n\s*(<\/h2>)/g,
    (m, open, t1, br, t2, close) => {
      if (m.includes('data-cms-key')) return m;
      const key1 = `${prefix}_h2_${n++}`;
      const key2 = `${prefix}_h2_${n++}`;
      return `${open}\n            <span data-cms-key="${key1}" data-cms-label="Heading Line 1" data-cms-attr="text">${t1.trim()}</span>\n            ${br} <span data-cms-key="${key2}" data-cms-label="Heading Line 2" data-cms-attr="text">${t2.trim()}</span>\n          ${close}`;
    }
  );

  // Pattern 4: h2 with ONLY static text (no spans, no br) - simple case
  // <h2 ...>\n  Static Text\n</h2>
  src = src.replace(
    /(<h2 className="[^"]*"[^>]*>)\s*\n\s*([A-Za-z][^<{\n]{3,}?)\s*\n\s*(<\/h2>)/g,
    (m, open, text, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 3) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${t}</span>${close}`;
    }
  );

  // Pattern 5: inline h2 with only static text (no newline between tags)
  src = src.replace(
    /(<h2 className="[^"]*"[^>]*>)([A-Za-z][^<{\n]{3,}?)(<\/h2>)/g,
    (m, open, text, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 3) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${t}</span>${close}`;
    }
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${name}: +${after - before} keys (total: ${after})`);
  } else {
    console.log(`no change: ${name}`);
  }
});

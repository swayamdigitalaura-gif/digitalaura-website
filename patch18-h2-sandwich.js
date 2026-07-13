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

  // Pattern: h2 with icon spans on both sides (sandwich pattern)
  // <h2 ...>\n  <span icon/> TEXT\n  <span icon/>\n</h2>
  src = src.replace(
    /(<h2 className="text-\[13px\][^"]*"[^>]*>)\s*\n\s*(<span[^/]*\/>)\s+([A-Za-z][^\n<{]+?)\s*\n\s*(<span[^/]*\/>)\s*\n\s*(<\/h2>)/g,
    (m, open, icon1, text, icon2, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 2) return m;
      return `${open}\n            ${icon1} <span data-cms-key="${prefix}_h2lbl_${n++}" data-cms-label="Section Label" data-cms-attr="text">${t}</span>\n            ${icon2}\n          ${close}`;
    }
  );

  // Pattern: h2 with icon (bg-[] style) + text on same line content (multiline h2 body)
  // The text might use inline style on icon: <span ... style={{ background: accentColor }} /> TEXT
  src = src.replace(
    /(<h2 className="text-\[13px\][^"]*"[^>]*>)\s*\n\s*(<span[^>]*style=\{[^}]+\}[^\/]*\/>)\s+([A-Za-z][^\n<{]+?)\s*\n\s*(<span[^>]*style=\{[^}]+\}[^\/]*\/>)\s*\n\s*(<\/h2>)/g,
    (m, open, icon1, text, icon2, close) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 2) return m;
      return `${open}\n            ${icon1} <span data-cms-key="${prefix}_h2lbl_${n++}" data-cms-label="Section Label" data-cms-attr="text">${t}</span>\n            ${icon2}\n          ${close}`;
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

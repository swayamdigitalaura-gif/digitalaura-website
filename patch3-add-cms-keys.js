const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/pages/services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const slugMap = {
  'WooCommercePage': 'woo', 'ShopifyPage': 'shopify', 'BigCommercePage': 'bigcommerce',
  'WebAppDevPage': 'webapp', 'FullStackDevelopmentPage': 'fullstack', 'WordPressPage': 'wordpress',
  'MobileAppDevPage': 'mobileapp', 'AIAutomationPage': 'aiauto', 'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp', 'CustomAIWebSolutionsPage': 'customai', 'AIApiIntegrationPage': 'aiapi',
  'ChatbotsAssistantsPage': 'chatbots', 'CustomMLModelsPage': 'mlmodels', 'LLMPoweredAppsPage': 'llmapps',
  'WorkflowAutomationPage': 'workflow', 'PredictiveAnalyticsPage': 'predictive', 'SEOPage': 'seo',
  'GoogleAdsPage': 'gads', 'MetaAdsPage': 'metaads', 'LinkedInYouTubePage': 'linkedin',
  'EmailWhatsAppPage': 'emailwa', 'CROPage': 'cro', 'DigitalMarketingPage': 'digmkt',
  'DesignBrandingPage': 'design',
};

let patched = 0;

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = slugMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  let changed = false;

  // --- Tag hero subtext <p> (first text-lg paragraph in the file) ---
  if (!src.includes(`data-cms-key="${prefix}_hero_sub"`)) {
    // Match first <p className="text-lg..."> ... </p>  (content may span lines)
    const heroParaRe = /(<p className="text-lg[^"]*"[^>]*>)([\s\S]*?)(<\/p>)/;
    const m = heroParaRe.exec(src);
    if (m) {
      const inner = m[2].trim();
      const replacement = `${m[1]}\n            <span data-cms-key="${prefix}_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">${inner}</span>\n          ${m[3]}`;
      src = src.slice(0, m.index) + replacement + src.slice(m.index + m[0].length);
      changed = true;
    } else {
      console.log('  ! hero_sub no match:', name);
    }
  }

  // --- Tag CTA button text (first Link to="/contact" text node) ---
  if (!src.includes(`data-cms-key="${prefix}_cta_btn"`)) {
    // Match text immediately after closing > of the Link tag, before any JSX child
    // Pattern: ...to="/contact"[attrs]>WHITESPACE TEXT WHITESPACE<
    const ctaRe = /(to="\/contact"[^>]*>)\s*([A-Z][^<\n{]{3,}?)\s*(<[A-Z]|\{)/;
    const m2 = ctaRe.exec(src);
    if (m2) {
      const text = m2[2].trim();
      const replacement = `${m2[1]}\n              <span data-cms-key="${prefix}_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">${text}</span> ${m2[3]}`;
      src = src.slice(0, m2.index) + replacement + src.slice(m2.index + m2[0].length);
      changed = true;
    } else {
      console.log('  ! cta_btn no match:', name);
    }
  }

  if (changed) {
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    patched++;
    console.log('PATCHED:', name);
  }
});

console.log(`\nDone. Patched ${patched}/${files.length} files.`);

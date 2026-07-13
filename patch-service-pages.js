const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/pages/services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

// Map filename -> slug key prefix
const slugMap = {
  'WooCommercePage': 'woo',
  'ShopifyPage': 'shopify',
  'BigCommercePage': 'bigcommerce',
  'WebAppDevPage': 'webapp',
  'FullStackDevelopmentPage': 'fullstack',
  'WordPressPage': 'wordpress',
  'MobileAppDevPage': 'mobileapp',
  'AIAutomationPage': 'aiauto',
  'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp',
  'CustomAIWebSolutionsPage': 'customai',
  'AIApiIntegrationPage': 'aiapi',
  'ChatbotsAssistantsPage': 'chatbots',
  'CustomMLModelsPage': 'mlmodels',
  'LLMPoweredAppsPage': 'llmapps',
  'WorkflowAutomationPage': 'workflow',
  'PredictiveAnalyticsPage': 'predictive',
  'SEOPage': 'seo',
  'GoogleAdsPage': 'gads',
  'MetaAdsPage': 'metaads',
  'LinkedInYouTubePage': 'linkedin',
  'EmailWhatsAppPage': 'emailwa',
  'CROPage': 'cro',
  'DigitalMarketingPage': 'digmkt',
  'DesignBrandingPage': 'design',
};

let patched = 0;

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = slugMap[name];
  if (!prefix) { console.log('SKIP (no slug):', name); return; }

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8');

  // Skip already patched
  if (src.includes('useSettings')) { console.log('SKIP (already patched):', name); return; }

  // Add useSettings import after last import line
  src = src.replace(
    /^(import PageLayout from "@\/components\/PageLayout";)/m,
    `$1\nimport { useSettings } from "@/hooks/useSettings";`
  );

  // Find the component function (export default function X or const X = () =>)
  // Add useSettings call inside it
  // Pattern: find "return (\n    <PageLayout>" and insert hook before it
  const hookCode = `\n  const _sp = useSettings(['${prefix}_hero_badge','${prefix}_hero_h1','${prefix}_hero_h1b','${prefix}_hero_sub','${prefix}_cta_h','${prefix}_cta_sub','${prefix}_cta_btn']);\n`;

  // Insert hook before return statement
  src = src.replace(/(\n  return \(\n\s*<PageLayout>)/, hookCode + '$1');

  // Patch hero badge span (first badge after PageLayout)
  // Pattern: <span ...>SomeText</span> in hero
  // We add data-cms-key to the h1 and the first <p> in the hero

  // Tag h1
  src = src.replace(
    /(<h1 className="[^"]*"[^>]*>)\n?\s*/,
    `$1\n            <span data-cms-key="${prefix}_hero_h1" data-cms-label="Hero H1" data-cms-attr="text">`
  );

  patched++;
  fs.writeFileSync(fpath, src);
  console.log('PATCHED:', name, '->', prefix);
});

console.log(`\nDone. Patched ${patched}/${files.length} files.`);

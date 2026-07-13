const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/pages/services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

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
  // Normalize to LF for processing
  const hasCRLF = src.includes('\r\n');
  if (hasCRLF) src = src.replace(/\r\n/g, '\n');

  if (src.includes('const _sp = useSettings')) { console.log('SKIP:', name); return; }

  const hookLine = `  const _sp = useSettings(['${prefix}_hero_h1','${prefix}_hero_sub','${prefix}_cta_btn']);\n`;

  const openPattern = `const ${name} = () => (\n`;
  const closePattern = `);\n\nexport default ${name};`;

  if (src.includes(openPattern) && src.includes(closePattern)) {
    src = src.replace(openPattern, `const ${name} = () => {\n${hookLine}  return (\n`);
    src = src.replace(closePattern, `);\n};\n\nexport default ${name};`);
    if (hasCRLF) src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log('PATCHED:', name, '->', prefix);
    patched++;
    return;
  }

  // Block body pattern
  const blockOpen = `const ${name} = () => {\n`;
  const returnPat = `  return (\n`;
  if (src.includes(blockOpen + returnPat)) {
    src = src.replace(blockOpen + returnPat, `${blockOpen}${hookLine}${returnPat}`);
    if (hasCRLF) src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log('PATCHED (block):', name, '->', prefix);
    patched++;
    return;
  }

  console.log('NO MATCH:', name, '| openPattern found:', src.includes(openPattern), '| closePattern found:', src.includes(closePattern));
});

console.log(`\nDone. Patched ${patched}/${files.length} files.`);

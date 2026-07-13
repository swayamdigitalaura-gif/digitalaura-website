const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';

const prefixMap = {
  'AIAutomationPage': 'aiauto', 'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp', 'CustomAIWebSolutionsPage': 'customai',
  'FullStackDevelopmentPage': 'fullstack', 'AIApiIntegrationPage': 'aiapi',
  'CustomMLModelsPage': 'mlmodels', 'ChatbotsAssistantsPage': 'chatbots',
  'LLMPoweredAppsPage': 'llmapps', 'WorkflowAutomationPage': 'workflow',
  'PredictiveAnalyticsPage': 'predictive', 'SEOPage': 'seo',
  'GoogleAdsPage': 'gads', 'MetaAdsPage': 'metaads', 'LinkedInYouTubePage': 'linkedin',
  'EmailWhatsAppPage': 'emailwa', 'CROPage': 'cro', 'WooCommercePage': 'woo',
  'ShopifyPage': 'shopify', 'BigCommercePage': 'bigcommerce',
  'MobileAppDevPage': 'mobileapp', 'WebAppDevPage': 'webapp',
  'DesignBrandingPage': 'design', 'DigitalMarketingPage': 'digmkt',
};

fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = prefixMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;

  // 1. Tag cs.tags pill spans: {t} inside cs.tags.map
  src = src.replace(
    /(\{cs\.tags\.map\(\(t: string\) => \(\s*<span[^>]*>)\{t\}(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_tag_\${t}\`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span>${close}`
  );

  // Simpler: just replace >{t}</span> inside cs.tags context
  src = src.replace(
    /style=\{\{ color: cs\.badgeColor, background: `\$\{cs\.badgeColor\}12` \}\}>\{t\}(<\/span>)/g,
    (m, close) => m.includes('data-cms-key') ? m :
      `style={{ color: cs.badgeColor, background: \`\${cs.badgeColor}12\` }}><span data-cms-key={\`${prefix}_cs_\${i}_tag_\${t}\`} data-cms-label="CS Tech Tag" data-cms-attr="text">{t}</span>${close}`
  );

  // 2. Tag h2 with static text + <br /> inside (multiline won't match, so handle inline)
  // Pattern: <h2 ...>\n  TEXT<br .../> MORE TEXT\n</h2>
  src = src.replace(
    /(<h2[^>]*>)\s*\n\s*([A-Za-z][^<\n{]{3,}?)(<br[^/]*\/>)\s*([^<\n{]{3,}?)\s*\n\s*(<\/h2>)/g,
    (m, open, text1, br, text2, close) => {
      if (m.includes('data-cms-key')) return m;
      const fullText = (text1 + ' ' + text2).trim();
      return `${open}\n            <span data-cms-key="${prefix}_h2_main" data-cms-label="Section Heading" data-cms-attr="text">${text1}</span>${br} <span data-cms-key="${prefix}_h2_main2" data-cms-label="Section Heading 2" data-cms-attr="text">${text2.trim()}</span>\n          ${close}`;
    }
  );

  // 3. Also tag results map {r} strings if not tagged
  src = src.replace(
    /(<li[^>]*>\s*<Check[^\/]*\/>\s*)\{r\}(<\/li>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_result_\${ri}\`} data-cms-label="CS Result" data-cms-attr="text">{r}</span>${close}`
  );

  // 4. cs.results items {r} in map
  src = src.replace(
    /\.map\(\(r: string\) => \(/g, '.map((r: string, ri: number) => ('
  );
  src = src.replace(
    /\.map\(\(r: string, i\) => \(/g, '.map((r: string, ri: number) => ('
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${name}: +${after - before} keys`);
  } else {
    console.log(`no change: ${name}`);
  }
});

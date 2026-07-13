const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';

const prefixMap = {
  'WooCommercePage': 'woo', 'ShopifyPage': 'shopify', 'BigCommercePage': 'bigcommerce',
  'WebAppDevPage': 'webapp', 'FullStackDevelopmentPage': 'fullstack',
  'MobileAppDevPage': 'mobileapp', 'AIAutomationPage': 'aiauto',
  'AIChatbotAssistantPage': 'aichatbot', 'AIWebAppsPage': 'aiwebapp',
  'CustomAIWebSolutionsPage': 'customai', 'AIApiIntegrationPage': 'aiapi',
  'ChatbotsAssistantsPage': 'chatbots', 'CustomMLModelsPage': 'mlmodels',
  'LLMPoweredAppsPage': 'llmapps', 'WorkflowAutomationPage': 'workflow',
  'PredictiveAnalyticsPage': 'predictive', 'SEOPage': 'seo',
  'GoogleAdsPage': 'gads', 'MetaAdsPage': 'metaads', 'LinkedInYouTubePage': 'linkedin',
  'EmailWhatsAppPage': 'emailwa', 'CROPage': 'cro', 'DigitalMarketingPage': 'digmkt',
  'DesignBrandingPage': 'design',
};

fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = prefixMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;

  // Fix FAQItem: wrap {q} in the button span
  src = src.replace(
    /(<span className="font-semibold text-\[#0A1628\] text-\[15px\]">)\{q\}(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_faq_\${idx}_q\`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span>${close}`
  );

  // Fix FAQItem: wrap {a} in the p tag
  src = src.replace(
    /(<p className="pb-4 text-\[#6B7280\] text-sm leading-relaxed">)\{a\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_faq_\${idx}_a\`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span>${close}`
  );

  // Fix case study card h3: {cs.title} inside CaseStudyCard (i is the prop)
  src = src.replace(
    /(<h3 className="text-lg font-bold text-\[#0A1628\] mb-4">)\{cs\.title\}(<\/h3>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_title\`} data-cms-label="Case Study Title" data-cms-attr="text">{cs.title}</span>${close}`
  );

  // Fix case study statDesc
  src = src.replace(
    /(<p className="text-\[15px\] leading-relaxed text-\[#4B5563\] mb-5 flex-1">)\{cs\.statDesc\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_statdesc\`} data-cms-label="Case Study Stat Desc" data-cms-attr="text">{cs.statDesc}</span>${close}`
  );

  // Also fix FAQItem called with idx prop not present — add idx to the map call
  src = src.replace(
    /faqs\.map\(\(f,\s*i\)\s*=>\s*<FAQItem\s+key=\{i\}\s+q=\{f\.q\}\s+a=\{f\.a\}\s*\/>/g,
    `faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} idx={i} />`
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${name}: +${after - before} keys`);
  } else {
    console.log(`no change: ${name}`);
  }
});

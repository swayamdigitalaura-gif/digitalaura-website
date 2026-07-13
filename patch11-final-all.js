const fs = require('fs');
const path = require('path');

const base = './digital-aura-project/src';
const dirs = ['pages/services', 'pages', 'components'];

// prefix map for all files
const prefixMap = {
  // service pages
  'AIAutomationPage': 'aiauto', 'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp', 'CustomAIWebSolutionsPage': 'customai',
  'FullStackDevelopmentPage': 'fullstack', 'AIApiIntegrationPage': 'aiapi',
  'CustomMLModelsPage': 'mlmodels', 'ChatbotsAssistantsPage': 'chatbots',
  'LLMPoweredAppsPage': 'llmapps', 'WorkflowAutomationPage': 'workflow',
  'PredictiveAnalyticsPage': 'predictive', 'MobileAppDevPage': 'mobileapp',
  'WooCommercePage': 'woo', 'ShopifyPage': 'shopify', 'BigCommercePage': 'bigcommerce',
  'WebAppDevPage': 'webapp', 'DesignBrandingPage': 'design',
  'DigitalMarketingPage': 'digmkt', 'SEOPage': 'seo', 'GoogleAdsPage': 'gads',
  'MetaAdsPage': 'metaads', 'LinkedInYouTubePage': 'linkedin',
  'EmailWhatsAppPage': 'emailwa', 'CROPage': 'cro', 'WordPressPage': 'wordpress',
  // pages
  'About': 'about', 'Careers': 'careers_pg', 'AISolutionsPage': 'aisol',
  'ContactPage': 'con_pg', 'EngagementModelsPage': 'engage',
  'ServicesPage': 'svc_pg', 'Blog': 'blog_pg', 'CaseStudies': 'cs_pg',
  // components
  'BlogInsights': 'blog_ins', 'CaseStudies': 'casestud', 'SolutionsSection': 'solutions',
  'TechStack': 'techstack', 'Hero': 'hero', 'FloatingElements': 'float',
  'LeadCaptureForm': 'lead', 'CROModal': 'cromodal', 'EmailWhatsAppModal': 'emailmodal',
  'GoogleAdsModal': 'gadsmodal', 'LinkedInYouTubeModal': 'limodal',
  'MetaAdsModal': 'metamodal', 'SEOModal': 'seomodal',
};

let totalPatched = 0;

dirs.forEach(dir => {
  const fullDir = path.join(base, dir);
  if (!fs.existsSync(fullDir)) return;

  fs.readdirSync(fullDir).filter(f => f.endsWith('.tsx')).forEach(file => {
    const name = file.replace('.tsx', '');
    const prefix = prefixMap[name];
    if (!prefix) return;

    const fpath = path.join(fullDir, file);
    let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
    const before = (src.match(/data-cms-key=/g) || []).length;
    let n = before + 1;

    // 1. Tag section-badge spans with static text
    src = src.replace(
      /(<span className="section-badge">)([^<{]+?)(<\/span>)/g,
      (m, open, text, close) => {
        if (m.includes('data-cms-key')) return m;
        const trimmed = text.trim();
        if (!trimmed) return m;
        return `<span className="section-badge" data-cms-key="${prefix}_badge_${n++}" data-cms-label="Section Badge" data-cms-attr="text">${trimmed}</span>`;
      }
    );

    // 2. Tag h2 with static text (no JSX expressions) - multiline safe
    src = src.replace(
      /(<h2[^>]*>)\s*([A-Za-z][^<{}\n]{3,}?)\s*(<\/h2>)/g,
      (m, open, text, close) => {
        if (m.includes('data-cms-key')) return m;
        const trimmed = text.trim();
        if (!trimmed || trimmed.length < 4) return m;
        return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${trimmed}</span>${close}`;
      }
    );

    // 3. Tag h3 with static text (no JSX expressions)
    src = src.replace(
      /(<h3[^>]*>)\s*([A-Za-z][^<{}\n]{3,}?)\s*(<\/h3>)/g,
      (m, open, text, close) => {
        if (m.includes('data-cms-key')) return m;
        const trimmed = text.trim();
        if (!trimmed || trimmed.length < 4) return m;
        return `${open}<span data-cms-key="${prefix}_h3_${n++}" data-cms-label="Card Heading" data-cms-attr="text">${trimmed}</span>${close}`;
      }
    );

    // 4. Tag h1 with static text
    src = src.replace(
      /(<h1[^>]*>)\s*([A-Za-z][^<{}\n]{3,}?)\s*(<\/h1>)/g,
      (m, open, text, close) => {
        if (m.includes('data-cms-key')) return m;
        const trimmed = text.trim();
        if (!trimmed || trimmed.length < 4) return m;
        return `${open}<span data-cms-key="${prefix}_h1_${n++}" data-cms-label="Heading" data-cms-attr="text">${trimmed}</span>${close}`;
      }
    );

    // 5. Tag p with static text and common text color classes
    src = src.replace(
      /(<p className="[^"]*(?:text-\[#|text-gray|text-white|text-slate|text-\[#E2E8F0|leading-relaxed)[^"]*"[^>]*>)\s*([A-Za-z][^<{}\n]{5,}?)\s*(<\/p>)/g,
      (m, open, text, close) => {
        if (m.includes('data-cms-key')) return m;
        const trimmed = text.trim();
        if (!trimmed || trimmed.length < 5) return m;
        return `${open}<span data-cms-key="${prefix}_p_${n++}" data-cms-label="Body Text" data-cms-attr="text">${trimmed}</span>${close}`;
      }
    );

    const after = (src.match(/data-cms-key=/g) || []).length;
    if (after > before) {
      fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
      totalPatched += (after - before);
      console.log(`PATCHED ${name}: +${after - before} keys`);
    }
  });
});

console.log(`\nTotal new keys added: ${totalPatched}`);

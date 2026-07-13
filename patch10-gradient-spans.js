/**
 * Add data-cms-key to all untagged gradient/colored highlight spans inside headings.
 * These are spans with className="text-orange-gradient" or "text-purple-gradient"
 * that have static text but no data-cms-key.
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  './digital-aura-project/src/pages',
  './digital-aura-project/src/pages/services',
  './digital-aura-project/src/components',
];

// Prefix map for known files
const prefixMap = {
  // pages
  'Index.tsx': 'home', 'About.tsx': 'about', 'Services.tsx': 'svc_pg',
  'Blog.tsx': 'blog_pg', 'CaseStudies.tsx': 'cs_pg', 'Contact.tsx': 'con_pg',
  'Careers.tsx': 'careers', 'EngagementModelsPage.tsx': 'engage',
  // services
  'WooCommercePage.tsx': 'woo', 'ShopifyPage.tsx': 'shopify', 'BigCommercePage.tsx': 'bigcommerce',
  'WebAppDevPage.tsx': 'webapp', 'FullStackDevelopmentPage.tsx': 'fullstack', 'WordPressPage.tsx': 'wordpress',
  'MobileAppDevPage.tsx': 'mobileapp', 'AIAutomationPage.tsx': 'aiauto', 'AIChatbotAssistantPage.tsx': 'aichatbot',
  'AIWebAppsPage.tsx': 'aiwebapp', 'CustomAIWebSolutionsPage.tsx': 'customai', 'AIApiIntegrationPage.tsx': 'aiapi',
  'ChatbotsAssistantsPage.tsx': 'chatbots', 'CustomMLModelsPage.tsx': 'mlmodels', 'LLMPoweredAppsPage.tsx': 'llmapps',
  'WorkflowAutomationPage.tsx': 'workflow', 'PredictiveAnalyticsPage.tsx': 'predictive', 'SEOPage.tsx': 'seo',
  'GoogleAdsPage.tsx': 'gads', 'MetaAdsPage.tsx': 'metaads', 'LinkedInYouTubePage.tsx': 'linkedin',
  'EmailWhatsAppPage.tsx': 'emailwa', 'CROPage.tsx': 'cro', 'DigitalMarketingPage.tsx': 'digmkt',
  'DesignBrandingPage.tsx': 'design',
  // components
  'AIShowcase.tsx': 'ai_show', 'BlogInsights.tsx': 'blog_ins', 'CaseStudies.tsx': 'casestud',
  'SolutionsSection.tsx': 'solutions', 'TechStack.tsx': 'techstack', 'TestimonialCarousel.tsx': 'tc',
  'ProcessSection.tsx': 'process', 'PageHero.tsx': 'pagehero', 'WhatWeDo.tsx': 'whatwedo',
  'Footer.tsx': 'footer',
};

let totalPatched = 0;

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

  files.forEach(file => {
    const prefix = prefixMap[file];
    if (!prefix) return;

    const fpath = path.join(dir, file);
    let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
    const before = (src.match(/data-cms-key=/g) || []).length;
    let n = before + 100; // start high to avoid conflicts

    // Match: <span className="text-orange-gradient">STATIC TEXT</span>
    // or text-purple-gradient, text-gradient, etc.
    // Only if no data-cms-key already
    const re = /<span className="(text-(?:orange|purple|blue|green|gradient)[^"]*)"[^>]*>([^<{][^<{]*?)<\/span>/g;

    src = src.replace(re, (match, cls, text) => {
      if (match.includes('data-cms-key')) return match;
      const trimmed = text.trim();
      if (!trimmed || trimmed.length < 2) return match;
      const key = `${prefix}_hl_${n++}`;
      return `<span data-cms-key="${key}" data-cms-label="Heading Highlight" data-cms-attr="text" className="${cls}">${trimmed}</span>`;
    });

    const after = (src.match(/data-cms-key=/g) || []).length;
    if (after > before) {
      src = src.replace(/\n/g, '\r\n');
      fs.writeFileSync(fpath, src);
      console.log(`PATCHED ${file}: +${after - before} highlight keys (${before} -> ${after})`);
      totalPatched += (after - before);
    }
  });
});

console.log(`\nTotal highlight spans tagged: ${totalPatched}`);

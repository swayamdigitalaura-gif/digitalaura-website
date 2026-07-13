/**
 * Tag ALL remaining untagged dynamic array text patterns in service pages.
 * Targets: {card.title}, {feature.title}, {step.title}, {p.title}, {reason.title}, etc.
 */
const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/pages/services';

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

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

// All common array variable names used in service pages
const varNames = [
  'card', 'feature', 'step', 'p', 'reason', 'benefit', 'service',
  'tool', 'tech', 'stat', 'phase', 'pillar', 'point', 'item',
  'result', 'plan', 'metric', 'use', 'platform', 'module', 'layer',
  'approach', 'method', 'principle', 'capability', 'deliverable',
  'outcome', 'process', 'workflow', 'solution', 'strategy',
];

// Properties used for title/heading
const titleProps = ['title', 'name', 'heading', 'label'];
// Properties used for description/body
const descProps = ['desc', 'description', 'text', 'body', 'subtitle', 'subtext', 'content', 'detail'];

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = slugMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;

  // For each varName, ensure map calls include index i
  varNames.forEach(v => {
    // .map((v) => or .map(v => -> add index
    src = src.replace(
      new RegExp(`\\.map\\(\\(${v}\\)\\s*=>`, 'g'),
      `.map((${v}, i) =>`
    );
    src = src.replace(
      new RegExp(`\\.map\\(${v}\\s*=>`, 'g'),
      `.map((${v}, i) =>`
    );
    // .map((v, idx) => or other index names -> normalize to i
    // Don't touch if already has (v, i)
  });

  // Tag {varName.titleProp} in h3 tags
  varNames.forEach(v => {
    titleProps.forEach(prop => {
      const pattern = new RegExp(
        `(<h3[^>]*>)\\{${v}\\.${prop}\\}(<\\/h3>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });

    // Tag {varName.descProp} in p tags
    descProps.forEach(prop => {
      const pattern = new RegExp(
        `(<p[^>]*>)\\{${v}\\.${prop}\\}(<\\/p>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });

    // Also tag titleProps in p tags (some pages put titles in p)
    titleProps.forEach(prop => {
      const pattern = new RegExp(
        `(<p[^>]*>)\\{${v}\\.${prop}\\}(<\\/p>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });

    // Tag descProps in h3 tags (rare but happens)
    descProps.forEach(prop => {
      const pattern = new RegExp(
        `(<h3[^>]*>)\\{${v}\\.${prop}\\}(<\\/h3>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });

    // Tag in span tags too
    titleProps.concat(descProps).forEach(prop => {
      const pattern = new RegExp(
        `(<span[^>]*>)\\{${v}\\.${prop}\\}(<\\/span>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });

    // Tag in h2 tags
    titleProps.forEach(prop => {
      const pattern = new RegExp(
        `(<h2[^>]*>)\\{${v}\\.${prop}\\}(<\\/h2>)`,
        'g'
      );
      src = src.replace(pattern, (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${v}_\${i}_${prop}\`} data-cms-label="${v} ${prop}" data-cms-attr="text">{${v}.${prop}}</span>${close}`;
      });
    });
  });

  // Also tag static text inside h3/p that were missed (no class filter)
  // These are elements with static strings directly inside
  // Tag h3 with static text (no JSX vars) - catch remaining ones
  const staticH3 = /(<h3[^>]*>)([A-Z][^<{}\n]{3,80})(<\/h3>)/g;
  src = src.replace(staticH3, (match, open, text, close) => {
    if (match.includes('data-cms-key')) return match;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 3) return match;
    return `${open}<span data-cms-key="${prefix}_h3_${Math.random().toString(36).slice(2,7)}" data-cms-label="Card Heading" data-cms-attr="text">${trimmed}</span>${close}`;
  });

  // Tag p with static text
  const staticP = /(<p className="[^"]*(?:text-gray|text-\[#|text-white|text-slate)[^"]*"[^>]*>)([A-Za-z][^<{}\n]{5,200})(<\/p>)/g;
  src = src.replace(staticP, (match, open, text, close) => {
    if (match.includes('data-cms-key')) return match;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 5) return match;
    return `${open}<span data-cms-key="${prefix}_p_${Math.random().toString(36).slice(2,7)}" data-cms-label="Body Text" data-cms-attr="text">${trimmed}</span>${close}`;
  });

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log(`PATCHED ${name}: ${before} -> ${after} keys (+${after - before})`);
  } else {
    console.log(`no change: ${name} (${before} keys)`);
  }
});

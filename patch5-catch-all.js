/**
 * Catch-all patch: tag every remaining untagged h2, h3, p, li>span text element
 * in all service pages that doesn't already have a data-cms-key.
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

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'WordPressPage.tsx');

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = slugMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  // Helper: wrap static text content (no JSX vars) in a cms span
  // Only wraps if the element has no data-cms-key already and content is static text (no {})
  const wrapStaticText = (tag, classMatch, labelPrefix) => {
    // Match: <tag className="...">TEXT</tag> where TEXT has no { or < (pure static)
    const re = new RegExp(`(<${tag} className="${classMatch}"[^>]*>)([^<{\\n][^<{]*?)(<\\/${tag}>)`, 'g');
    src = src.replace(re, (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_x${n++}`;
      return `${open}<span data-cms-key="${key}" data-cms-label="${labelPrefix}" data-cms-attr="text">${text.trim()}</span>${close}`;
    });
  };

  // h2 - all variants
  wrapStaticText('h2', '[^"]*', 'Section Heading');
  // h3 - all variants
  wrapStaticText('h3', '[^"]*', 'Card Heading');
  // p - gray subtext patterns
  wrapStaticText('p', 'text-\\[#6B7280\\][^"]*', 'Section Subtext');
  wrapStaticText('p', 'text-\\[#4B5563\\][^"]*', 'Body Text');
  wrapStaticText('p', 'text-\\[#374151\\][^"]*', 'Body Text');
  wrapStaticText('p', 'text-\\[#E2E8F0\\][^"]*', 'CTA Subtext');
  wrapStaticText('p', 'text-\\[#9CA3AF\\][^"]*', 'Fine Print');
  wrapStaticText('p', 'text-gray[^"]*', 'Body Text');
  wrapStaticText('p', 'text-white[^"]*', 'Body Text');
  // span with static text (section labels)
  wrapStaticText('span', 'text-\\[#94A3B8\\][^"]*', 'Label');
  wrapStaticText('span', 'text-\\[#FF6B2B\\][^"]*tracking[^"]*', 'Section Badge');

  // Also tag: {s.name} in h3 (DesignBranding style)
  src = src.replace(
    /(<h3 className="[^"]*"[^>]*>)\{s\.name\}(<\/h3>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      return `${open}<span data-cms-key={\`${prefix}_svc_\${si}_name\`} data-cms-label="Service Name" data-cms-attr="text">{s.name}</span>${close}`;
    }
  );
  // {s.desc}, {s.description} in p
  src = src.replace(
    /(<p className="[^"]*"[^>]*>)\{s\.(desc|description)\}(<\/p>)/g,
    (match, open, prop, close) => {
      if (match.includes('data-cms-key')) return match;
      return `${open}<span data-cms-key={\`${prefix}_svc_\${si}_desc\`} data-cms-label="Service Desc" data-cms-attr="text">{s.${prop}}</span>${close}`;
    }
  );
  // Fix map index variable for s
  src = src.replace(/\.map\(\(s,\s*i\)\s*=>/g, (m) => m.replace('(s, i)', '(s, si)'));
  // src = src.replace(/\.map\(\(s\)\s*=>/g, ...); // skip

  // {feature.title}, {feature.desc}, {card.title}, {card.desc}, {step.title}, {step.desc}
  const mapPatterns = [
    ['feature', 'feat'], ['card', 'card'], ['step', 'step'],
    ['benefit', 'ben'], ['reason', 'rsn'], ['service', 'svc2'],
    ['tool', 'tool'], ['tech', 'tech'], ['stat', 'st'],
  ];
  mapPatterns.forEach(([varName, short]) => {
    // title in h3
    src = src.replace(
      new RegExp(`(<h3 className="[^"]*"[^>]*>)\\{${varName}\\.title\\}(<\\/h3>)`, 'g'),
      (match, open, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${short}_\${i}_t\`} data-cms-label="${varName} title" data-cms-attr="text">{${varName}.title}</span>${close}`;
      }
    );
    // desc in p
    src = src.replace(
      new RegExp(`(<p className="[^"]*"[^>]*>)\\{${varName}\\.(desc|description|text)\}(<\\/p>)`, 'g'),
      (match, open, prop, close) => {
        if (match.includes('data-cms-key')) return match;
        return `${open}<span data-cms-key={\`${prefix}_${short}_\${i}_d\`} data-cms-label="${varName} desc" data-cms-attr="text">{${varName}.${prop}}</span>${close}`;
      }
    );
  });

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log(`PATCHED ${name}: ${before} -> ${after} cms-keys (+${after - before})`);
  } else {
    console.log(`no change: ${name} (${before} keys)`);
  }
});

/**
 * For each service page, convert static array content to useSettings-driven
 * by adding data-cms-key attributes with index-based keys.
 *
 * Strategy: Find the static data arrays, extract their content,
 * add data-cms-key to each rendered text element.
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

let totalKeys = 0;

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = slugMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');

  // Count existing keys
  const existingKeys = (src.match(/data-cms-key=/g) || []).length;
  if (existingKeys >= 10) { console.log('SKIP (already rich):', name, existingKeys, 'keys'); return; }

  let changed = false;
  let keyIdx = 10; // start at 10 to not conflict with h1/sub/btn (1-3)

  // ─── serviceGroups / similar group arrays ───
  // Pattern: groups have title + items with label + desc
  // Rendered as: {group.title}, {item.label}, {item.desc}
  // Add cms-key inline using data attribute on the span

  // Tag section h2 headings (static text inside h2)
  src = src.replace(
    /(<h2 className="text-2xl[^"]*"[^>]*>)([^<{][^<]*?)(<\/h2>)/g,
    (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_s${keyIdx++}_h2`;
      changed = true;
      return `${open}<span data-cms-key="${key}" data-cms-label="Section Heading" data-cms-attr="text">${text.trim()}</span>${close}`;
    }
  );

  // Tag section h2 with mixed content (has className but also child span)
  src = src.replace(
    /(<h2 className="text-3xl[^"]*"[^>]*>)([^<{][^<]*?)(<\/h2>)/g,
    (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_s${keyIdx++}_h2`;
      changed = true;
      return `${open}<span data-cms-key="${key}" data-cms-label="Section Heading" data-cms-attr="text">${text.trim()}</span>${close}`;
    }
  );

  // Tag section subheading <p> directly after h2 (text-[#6B7280] pattern)
  src = src.replace(
    /(<p className="text-\[#6B7280\][^"]*"[^>]*>)([^<{][^<\n]*?)(<\/p>)/g,
    (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_s${keyIdx++}_sub`;
      changed = true;
      return `${open}<span data-cms-key="${key}" data-cms-label="Section Subtext" data-cms-attr="text">${text.trim()}</span>${close}`;
    }
  );

  // Tag group titles: {group.title} -> rendered in h3
  src = src.replace(
    /(<h3 className="[^"]*"[^>]*>)\{group\.title\}(<\/h3>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      // Use index from group map position - will be dynamic, use gi
      return `${open}<span data-cms-key={\`${prefix}_grp_\${gi}_title\`} data-cms-label="Group Title" data-cms-attr="text">{group.title}</span>${close}`;
    }
  );

  // Tag item labels: {item.label}
  src = src.replace(
    /(<span className="text-\[13\.5px\][^"]*"[^>]*>)\{item\.label\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_grp_\${gi}_item_\${i}_label\`} data-cms-label="Item Label" data-cms-attr="text">{item.label}</span>${close}`;
    }
  );

  // Tag item desc: {item.desc}
  src = src.replace(
    /(<span className="text-\[12\.5px\][^"]*"[^>]*>): \{item\.desc\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_grp_\${gi}_item_\${i}_desc\`} data-cms-label="Item Desc" data-cms-attr="text">: {item.desc}</span>${close}`;
    }
  );

  // Tag whatWeBuild / similar item labels
  src = src.replace(
    /(<span className="text-\[14px\][^"]*"[^>]*>)\{item\.label\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_build_\${i}_label\`} data-cms-label="Build Item" data-cms-attr="text">{item.label}</span>${close}`;
    }
  );

  // Tag whyUs items: {w}
  src = src.replace(
    /(<span className="text-\[14\.5px\][^"]*"[^>]*>)\{w\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_why_\${i}\`} data-cms-label="Why Us Item" data-cms-attr="text">{w}</span>${close}`;
    }
  );

  // Tag results text: {r.text}
  src = src.replace(
    /(<span className="text-\[14\.5px\][^"]*"[^>]*>)\{r\.text\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_result_\${i}\`} data-cms-label="Result Item" data-cms-attr="text">{r.text}</span>${close}`;
    }
  );

  // Tag FAQ question: {q}
  src = src.replace(
    /(<span className="text-\[15px\][^"]*"[^>]*>)\{q\}(<\/span>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      // FAQ renders inside FAQItem component - key based on faq index
      return `${open}<span data-cms-key={\`${prefix}_faq_\${idx}_q\`} data-cms-label="FAQ Question" data-cms-attr="text">{q}</span>${close}`;
    }
  );

  // Tag FAQ answer: {a}
  src = src.replace(
    /(<p className="px-6[^"]*"[^>]*>)\{a\}(<\/p>)/g,
    (match, open, close) => {
      if (match.includes('data-cms-key')) return match;
      changed = true;
      return `${open}<span data-cms-key={\`${prefix}_faq_\${idx}_a\`} data-cms-label="FAQ Answer" data-cms-attr="text">{a}</span>${close}`;
    }
  );

  // Tag CTA section h2 (final dark section)
  src = src.replace(
    /(<h2 className="text-3xl[^"]*text-white[^"]*"[^>]*>)([\s\S]*?)(<\/h2>)/g,
    (match, open, inner, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_cta_h2`;
      changed = true;
      return `${open}<span data-cms-key="${key}" data-cms-label="CTA Heading" data-cms-attr="text">${inner.trim()}</span>${close}`;
    }
  );

  // Tag CTA subtext <p className="text-[#E2E8F0]">
  src = src.replace(
    /(<p className="text-\[#E2E8F0\][^"]*"[^>]*>)([^<{][^<]*)(<\/p>)/g,
    (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const key = `${prefix}_cta_sub`;
      changed = true;
      return `${open}<span data-cms-key="${key}" data-cms-label="CTA Subtext" data-cms-attr="text">${text.trim()}</span>${close}`;
    }
  );

  // Now update FAQItem to accept idx prop for keying
  // Replace: {faqs.map((faq, i) => (<motion.div key={faq.q}...><FAQItem q={faq.q} a={faq.a}
  src = src.replace(
    /\{faqs\.map\(\(faq, i\) => \(/g,
    `{faqs.map((faq, idx) => (`
  );
  src = src.replace(/<FAQItem q=\{faq\.q\} a=\{faq\.a\} \/>/g, `<FAQItem q={faq.q} a={faq.a} idx={idx} />`);

  // Update FAQItem component signature to accept idx
  src = src.replace(
    /const FAQItem = \(\{ q, a \}: \{ q: string; a: string \}\)/,
    `const FAQItem = ({ q, a, idx = 0 }: { q: string; a: string; idx?: number })`
  );

  // Update item loops to use both gi and i
  // serviceGroups.map((group, gi) => ... group.items.map(item => (  <- needs i
  src = src.replace(
    /\{group\.items\.map\(item => \(/g,
    `{group.items.map((item, i) => (`
  );

  if (changed) {
    const newKeys = (src.match(/data-cms-key=/g) || []).length;
    totalKeys += newKeys;
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log(`PATCHED ${name}: ${newKeys} total cms-keys`);
  } else {
    console.log('NO CHANGE:', name);
  }
});

console.log(`\nTotal cms-keys across all files: ${totalKeys}`);

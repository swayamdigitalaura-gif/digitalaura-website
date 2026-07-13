const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';

const prefixMap = {
  'AIAutomationPage': 'aiauto', 'AIChatbotAssistantPage': 'aichatbot',
  'AIWebAppsPage': 'aiwebapp', 'CustomAIWebSolutionsPage': 'customai',
  'FullStackDevelopmentPage': 'fullstack',
};

Object.entries(prefixMap).forEach(([name, prefix]) => {
  const fpath = path.join(dir, `${name}.tsx`);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;

  // {cs.tag} in first span
  src = src.replace(
    /(<span className="text-xs font-semibold px-3 py-1 rounded-full"[^>]*>)\s*\{cs\.tag\}\s*(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_tag\`} data-cms-label="CS Tag" data-cms-attr="text">{cs.tag}</span>${close}`
  );

  // {cs.badge} in second span (absolute positioned)
  src = src.replace(
    /(<span className="absolute top-4 right-4[^"]*"[^>]*>)\s*\{cs\.badge\}\s*(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_badge\`} data-cms-label="CS Badge" data-cms-attr="text">{cs.badge}</span>${close}`
  );

  // {cs.stat} - big number
  src = src.replace(
    /(<span className="text-\[42px\] font-black leading-none"[^>]*>)\{cs\.stat\}(<\/span>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_stat\`} data-cms-label="CS Stat" data-cms-attr="text">{cs.stat}</span>${close}`
  );

  // {cs.problem} in p
  src = src.replace(
    /(<span className="font-semibold text-\[#374151\]">The Challenge: <\/span>)\{cs\.problem\}/g,
    (m, open) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_problem\`} data-cms-label="CS Problem" data-cms-attr="text">{cs.problem}</span>`
  );

  // {cs.solution}
  src = src.replace(
    /(<span className="font-semibold text-\[#374151\]">What We Built: <\/span>)\{cs\.solution\}/g,
    (m, open) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_solution\`} data-cms-label="CS Solution" data-cms-attr="text">{cs.solution}</span>`
  );

  // {cs.quote} and {cs.quoteBy} in blockquote
  src = src.replace(
    /"(.*?)"\{cs\.quote\}/g,
    (m, before) => m.includes('data-cms-key') ? m :
      `"${before}<span data-cms-key={\`${prefix}_cs_\${i}_quote\`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>`
  );
  src = src.replace(
    /\{cs\.quote\}"<br \/>/g,
    (m) => m.includes('data-cms-key') ? m :
      `<span data-cms-key={\`${prefix}_cs_\${i}_quote\`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>"`
  );

  // Simpler: just wrap any remaining {cs.quote} and {cs.quoteBy}
  src = src.replace(/\{cs\.quote\}/g, (m) => {
    // Check if already in a cms span - can't easily check, so just wrap
    return `<span data-cms-key={\`${prefix}_cs_\${i}_quote\`} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>`;
  });
  src = src.replace(/\{cs\.quoteBy\}/g, (m) =>
    `<span data-cms-key={\`${prefix}_cs_\${i}_quoteBy\`} data-cms-label="CS Quote By" data-cms-attr="text">{cs.quoteBy}</span>`
  );

  // Remove double-wrapped spans (if we wrapped something already wrapped)
  src = src.replace(
    /<span data-cms-key=[^>]+><span data-cms-key=[^>]+>\{cs\.quote\}<\/span><\/span>/g,
    (m) => {
      const keyMatch = m.match(/data-cms-key=\{`[^`]+`\}/);
      const key = keyMatch ? keyMatch[0] : `data-cms-key={\`${prefix}_cs_\${i}_quote\`}`;
      return `<span ${key} data-cms-label="CS Quote" data-cms-attr="text">{cs.quote}</span>`;
    }
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${name}: +${after - before} keys`);
  } else {
    console.log(`no change: ${name}`);
  }
});

const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';
const files = { 'FullStackDevelopmentPage':'fullstack','AIAutomationPage':'aiauto','AIChatbotAssistantPage':'aichatbot','AIWebAppsPage':'aiwebapp','CustomAIWebSolutionsPage':'customai' };
Object.entries(files).forEach(([name, prefix]) => {
  const fpath = path.join(dir, `${name}.tsx`);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g)||[]).length;
  src = src.replace(
    /(<p className="text-\[11px\] text-\[#9CA3AF\] font-mono mb-4">)\{cs\.stack\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_cs_\${i}_stack\`} data-cms-label="Case Study Stack" data-cms-attr="text">{cs.stack}</span>${close}`
  );
  const after = (src.match(/data-cms-key=/g)||[]).length;
  if (after > before) { fs.writeFileSync(fpath, src.replace(/\n/g,'\r\n')); console.log(`PATCHED ${name}: +${after-before}`); }
  else console.log(`no change: ${name}`);
});

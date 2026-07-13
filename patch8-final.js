const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/pages/services';

const prefixMap = {
  'WorkflowAutomationPage': 'workflow', 'CustomMLModelsPage': 'mlmodels',
  'PredictiveAnalyticsPage': 'predictive', 'LLMPoweredAppsPage': 'llmapps',
  'ChatbotsAssistantsPage': 'chatbots', 'AIApiIntegrationPage': 'aiapi',
  'FullStackDevelopmentPage': 'fullstack', 'AIAutomationPage': 'aiauto',
  'AIChatbotAssistantPage': 'aichatbot', 'AIWebAppsPage': 'aiwebapp',
  'CustomAIWebSolutionsPage': 'customai', 'MobileAppDevPage': 'mobileapp',
};

// Simple wrap: replaces >EXPR</TAG> with ><span cms-key>EXPR</span></TAG>
function wrapExpr(src, tag, expr, key, label) {
  const old = `<${tag}[^>]*>\\s*\\{${expr.replace('.','\\.')}\\}\\s*<\\/${tag}>`;
  const re = new RegExp(old, 'g');
  return src.replace(re, m => {
    if (m.includes('data-cms-key')) return m;
    return m.replace(`{${expr}}`, `<span data-cms-key={\`${key}\`} data-cms-label="${label}" data-cms-attr="text">{${expr}}</span>`);
  });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const name = file.replace('.tsx', '');
  const prefix = prefixMap[name];
  if (!prefix) return;

  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g)||[]).length;

  // {f.title} / {f.desc}
  src = wrapExpr(src, 'h3', 'f.title', `${prefix}_f_\${i}_title`, 'Feature Title');
  src = wrapExpr(src, 'p',  'f.desc',  `${prefix}_f_\${i}_desc`,  'Feature Desc');

  // {cs.title}
  src = wrapExpr(src, 'h3', 'cs.title', `${prefix}_cs_\${i}_title`, 'Case Study Title');

  // {t.label} / {t.color already inline style}
  src = src.replace(
    /(<p className="text-\[11px\] font-black uppercase tracking-wider mb-2"[^>]*>)\{t\.label\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_t_\${i}_label\`} data-cms-label="Tech Label" data-cms-attr="text">{t.label}</span>${close}`
  );

  // {g.label}
  src = src.replace(
    /(<p className="text-\[11px\][^"]*uppercase[^"]*"[^>]*>)\{g\.label\}(<\/p>)/g,
    (m, open, close) => m.includes('data-cms-key') ? m :
      `${open}<span data-cms-key={\`${prefix}_g_\${gi}_label\`} data-cms-label="Group Label" data-cms-attr="text">{g.label}</span>${close}`
  );

  // MobileAppDevPage specific
  if (prefix === 'mobileapp') {
    src = wrapExpr(src, 'h3', 'r.phase',    `${prefix}_r_\${i}_phase`,   'Phase');
    src = wrapExpr(src, 'p',  'r.details',  `${prefix}_r_\${i}_details`, 'Phase Details');
    src = wrapExpr(src, 'h3', 'ind.label',  `${prefix}_ind_\${i}_label`, 'Industry Label');
    src = wrapExpr(src, 'p',  'ind.desc',   `${prefix}_ind_\${i}_desc`,  'Industry Desc');
    src = wrapExpr(src, 'h3', 'model.title',`${prefix}_model_\${i}_title`,'Model Title');
    src = wrapExpr(src, 'p',  'model.desc', `${prefix}_model_\${i}_desc`, 'Model Desc');
  }

  const after = (src.match(/data-cms-key=/g)||[]).length;
  if (after > before) {
    fs.writeFileSync(fpath, src.replace(/\n/g,'\r\n'));
    console.log(`PATCHED ${name}: +${after-before} keys`);
  } else {
    console.log(`no change: ${name}`);
  }
});

// Also tag {s.label} in CROPage p
const croPath = path.join(dir, 'CROPage.tsx');
let cro = fs.readFileSync(croPath,'utf8').replace(/\r\n/g,'\n');
const croBefore = (cro.match(/data-cms-key=/g)||[]).length;
cro = cro.replace(
  /(<p className="text-\[12\.5px\][^"]*"[^>]*>)\{s\.label\}(<\/p>)/g,
  (m,open,close) => m.includes('data-cms-key') ? m :
    `${open}<span data-cms-key={\`cro_s_\${i}_label\`} data-cms-label="Step Label" data-cms-attr="text">{s.label}</span>${close}`
);
const croAfter = (cro.match(/data-cms-key=/g)||[]).length;
if (croAfter > croBefore) { fs.writeFileSync(croPath, cro.replace(/\n/g,'\r\n')); console.log(`PATCHED CROPage: +${croAfter-croBefore}`); }

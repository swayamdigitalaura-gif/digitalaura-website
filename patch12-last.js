const fs = require('fs');

// Fix multiline section-badge spans and h2 with child spans
const targets = [
  { f: './digital-aura-project/src/pages/ServicesPage.tsx', prefix: 'svc_pg' },
  { f: './digital-aura-project/src/pages/services/DesignBrandingPage.tsx', prefix: 'design' },
  { f: './digital-aura-project/src/pages/services/WebAppDevPage.tsx', prefix: 'webapp' },
  { f: './digital-aura-project/src/components/CROModal.tsx', prefix: 'cromodal' },
  { f: './digital-aura-project/src/components/EmailWhatsAppModal.tsx', prefix: 'emailmodal' },
  { f: './digital-aura-project/src/components/GoogleAdsModal.tsx', prefix: 'gadsmodal' },
  { f: './digital-aura-project/src/components/LinkedInYouTubeModal.tsx', prefix: 'limodal' },
  { f: './digital-aura-project/src/components/MetaAdsModal.tsx', prefix: 'metamodal' },
  { f: './digital-aura-project/src/components/SEOModal.tsx', prefix: 'seomodal' },
];

targets.forEach(({ f, prefix }) => {
  if (!fs.existsSync(f)) return;
  let src = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  // Fix multiline section-badge: <span className="section-badge"\n  >TEXT</span>
  src = src.replace(
    /<span className="section-badge"\s*\n\s*>([^<{]+?)<\/span>/g,
    (m, text) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      return `<span className="section-badge" data-cms-key="${prefix}_badge_${n++}" data-cms-label="Section Badge" data-cms-attr="text">${t}</span>`;
    }
  );

  // Fix h2 that has a child <span> with gradient text - wrap the text before the span
  // Pattern: <h2 ...>TEXT <span ...>COLORED</span></h2>
  src = src.replace(
    /(<h2[^>]*>)([A-Za-z][^<{}\n]{2,}?)(\s*<span[^>]*style[^>]*>)/g,
    (m, open, text, spanStart) => {
      if (m.includes('data-cms-key')) return m;
      const t = text.trim();
      if (!t || t.length < 3) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Section Heading" data-cms-attr="text">${t}</span>${spanStart}`;
    }
  );

  // Modal h2 with text content spanning to </h2>
  src = src.replace(
    /(<h2 className="text-\[22px\][^"]*"[^>]*>)\s*([A-Za-z][^<{}\n]{3,}?)\s*(<\/h2>)/g,
    (m, open, text, close) => {
      if (m.includes('data-cms-key')) return m;
      return `${open}<span data-cms-key="${prefix}_h2_${n++}" data-cms-label="Modal Heading" data-cms-attr="text">${text.trim()}</span>${close}`;
    }
  );

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    fs.writeFileSync(f, src.replace(/\n/g, '\r\n'));
    console.log(`PATCHED ${f.split('/').pop()}: +${after - before}`);
  } else {
    console.log(`no change: ${f.split('/').pop()}`);
  }
});

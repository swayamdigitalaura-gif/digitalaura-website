/**
 * Add data-cms-key to all home-page components that have static text.
 * Uses a universal approach: tag all h2, h3, p, span with static text.
 */
const fs = require('fs');
const path = require('path');

const dir = './digital-aura-project/src/components';

// Component -> key prefix mapping
const compMap = {
  'AIShowcase.tsx': 'ai_show',
  'BlogInsights.tsx': 'blog_ins',
  'CaseStudies.tsx': 'casestud',
  'ClientLogos.tsx': 'logos',
  'SolutionsSection.tsx': 'solutions',
  'TechStack.tsx': 'techstack',
  'TestimonialCarousel.tsx': 'tc',
  'ProcessSection.tsx': 'process',
  'OfficeLocations.tsx': 'offices',
  'PageHero.tsx': 'pagehero',
  'WhatWeDo.tsx': 'whatwedo',
  'Footer.tsx': 'footer',
};

Object.entries(compMap).forEach(([file, prefix]) => {
  const fpath = path.join(dir, file);
  if (!fs.existsSync(fpath)) return;

  let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  const wrapStatic = (tag, classPattern) => {
    const re = new RegExp(`(<${tag}[^>]*className="[^"]*${classPattern}[^"]*"[^>]*>)([^<{\\n][^<{\\n]*?)(<\\/${tag}>)`, 'g');
    src = src.replace(re, (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const trimmed = text.trim();
      if (!trimmed || trimmed.length < 2) return match;
      const key = `${prefix}_${n++}`;
      return `${open}<span data-cms-key="${key}" data-cms-label="${tag.toUpperCase()} Text" data-cms-attr="text">${trimmed}</span>${close}`;
    });
  };

  // Tag h1, h2, h3 with any class
  ['h1','h2','h3'].forEach(t => wrapStatic(t, ''));
  // Tag p with common text color classes
  ['text-\\[#','text-gray','text-white','text-slate','text-[#'].forEach(c => wrapStatic('p', c));
  // Tag span with text content (badge/label spans)
  wrapStatic('span', 'tracking-widest');
  wrapStatic('span', 'font-bold.*uppercase');
  wrapStatic('span', 'text-xs.*font-bold');
  wrapStatic('span', 'text-sm.*font-semibold');

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(fpath, src);
    console.log(`PATCHED ${file}: ${before} -> ${after} keys (+${after-before})`);
  } else {
    console.log(`no change: ${file}`);
  }
});

// Also patch main pages (Blog, CaseStudies, Contact, ServicesPage)
const pages = [
  { file: './digital-aura-project/src/pages/Blog.tsx', prefix: 'blog_pg' },
  { file: './digital-aura-project/src/pages/CaseStudies.tsx', prefix: 'cs_pg' },
  { file: './digital-aura-project/src/pages/Contact.tsx', prefix: 'con_pg' },
  { file: './digital-aura-project/src/pages/Services.tsx', prefix: 'svc_pg' },
  { file: './digital-aura-project/src/pages/Careers.tsx', prefix: 'careers_pg' },
];

pages.forEach(({ file, prefix }) => {
  if (!fs.existsSync(file)) return;
  let src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const before = (src.match(/data-cms-key=/g) || []).length;
  let n = before + 1;

  const wrapStatic = (tag, classPattern) => {
    const re = new RegExp(`(<${tag}[^>]*className="[^"]*${classPattern}[^"]*"[^>]*>)([^<{\\n][^<{\\n]*?)(<\\/${tag}>)`, 'g');
    src = src.replace(re, (match, open, text, close) => {
      if (match.includes('data-cms-key')) return match;
      const trimmed = text.trim();
      if (!trimmed || trimmed.length < 2) return match;
      const key = `${prefix}_${n++}`;
      return `${open}<span data-cms-key="${key}" data-cms-label="${tag.toUpperCase()} Text" data-cms-attr="text">${trimmed}</span>${close}`;
    });
  };

  ['h1','h2','h3'].forEach(t => wrapStatic(t, ''));
  ['text-\\[#','text-gray','text-white','text-slate'].forEach(c => wrapStatic('p', c));

  const after = (src.match(/data-cms-key=/g) || []).length;
  if (after > before) {
    src = src.replace(/\n/g, '\r\n');
    fs.writeFileSync(file, src);
    console.log(`PATCHED ${path.basename(file)}: ${before} -> ${after} keys (+${after-before})`);
  } else {
    console.log(`no change: ${path.basename(file)}`);
  }
});

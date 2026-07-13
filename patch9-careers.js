/**
 * Add data-cms-key to remaining untagged text in Careers.tsx
 */
const fs = require('fs');
const fpath = './digital-aura-project/src/pages/Careers.tsx';
let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');

const before = (src.match(/data-cms-key=/g) || []).length;

// Hero badge
src = src.replace(
  /(<span[^>]*className="inline-flex items-center gap-1\.5[^"]*"[^>]*>)\s*(<Sparkles[^\/]*\/>)\s*We're Hiring · Ahmedabad\s*(<\/span>)/,
  "$1$2 <span data-cms-key=\"careers_hero_badge\" data-cms-label=\"Hero Badge\" data-cms-attr=\"text\">We're Hiring · Ahmedabad</span>$3"
);

// Hero h1 - wrap static text before the colored span
src = src.replace(
  /(<h1 className="text-4xl[^"]*"[^>]*>)\s*Do Your Best Work<br \/>\s*(<span[^>]*>at Digital Aura<\/span>)\s*(<\/h1>)/,
  '$1\n            <span data-cms-key="careers_hero_h1" data-cms-label="Hero Heading" data-cms-attr="text">Do Your Best Work</span><br />\n            $2\n          $3'
);

// Hero CTA buttons
src = src.replace(
  /(href="#openings"[^>]*>)\s*See Open Roles\s*(<ArrowRight)/,
  '$1<span data-cms-key="careers_hero_cta" data-cms-label="Primary CTA" data-cms-attr="text">See Open Roles</span> $2'
);

// Life at Digital Aura section h2
src = src.replace(
  /(<h2 className="text-3xl md:text-\[42px\] font-black text-\[#0A1628\] tracking-tight"[^>]*>)\s*Life at\s*(<span[^>]*>Digital Aura<\/span>)\s*(<\/h2>)/,
  '$1<span data-cms-key="careers_life_h2" data-cms-label="Life Section Heading" data-cms-attr="text">Life at</span> $2$3'
);

// Open Positions h2
src = src.replace(
  /(<h2 className="text-3xl md:text-\[42px\] font-black text-\[#0A1628\] tracking-tight"[^>]*>)\s*Open\s*(<span[^>]*>Positions<\/span>)\s*(<\/h2>)/,
  '$1<span data-cms-key="careers_jobs_h2" data-cms-label="Jobs Section Heading" data-cms-attr="text">Open</span> $2$3'
);

// Perks h3 - "We're a Remote-First Team" inside the side card
src = src.replace(
  /(<h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight"[^>]*>)([\s\S]*?)(<\/h2>)/,
  (match, open, inner, close) => {
    if (match.includes('data-cms-key')) return match;
    return `${open}<span data-cms-key="careers_side_h2" data-cms-label="Side Card Heading" data-cms-attr="text">${inner.trim()}</span>${close}`;
  }
);

// CTA section h2
src = src.replace(
  /(<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"[^>]*>)([\s\S]*?)(<\/h2>)/,
  (match, open, inner, close) => {
    if (match.includes('data-cms-key')) return match;
    const trimmed = inner.trim();
    if (!trimmed) return match;
    return `${open}<span data-cms-key="careers_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">${trimmed}</span>${close}`;
  }
);

// CTA button
src = src.replace(
  /(href="mailto:[^"]*"[^>]*className="inline-flex[^"]*bg-orange[^"]*"[^>]*>[\s\S]*?Send Your CV\s*)(<\/a>)/,
  (match) => {
    if (match.includes('data-cms-key')) return match;
    return match; // complex, leave
  }
);

const after = (src.match(/data-cms-key=/g) || []).length;
console.log(`Careers: ${before} -> ${after} cms-keys (+${after - before})`);

src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(fpath, src);
console.log('DONE: Careers.tsx patched');

/**
 * Add data-cms-key to all editable text in EngagementModelsPage.tsx
 */
const fs = require('fs');
const fpath = './digital-aura-project/src/pages/EngagementModelsPage.tsx';

let src = fs.readFileSync(fpath, 'utf8').replace(/\r\n/g, '\n');

// Hero badge span
src = src.replace(
  /(<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 tracking-widest uppercase"[^>]*>)\s*(<Layers[^\/]*\/>)\s*Engagement Models\s*(<\/span>)/,
  '$1$2 <span data-cms-key="engage_hero_badge" data-cms-label="Hero Badge" data-cms-attr="text">Engagement Models</span>$3'
);

// Hero h1 - wrap only the text before the span
src = src.replace(
  /(<h1 className="text-4xl[^"]*"[^>]*>)\s*Flexible Ways to (<span[^>]*>Work With Us<\/span>)\s*(<\/h1>)/,
  '$1<span data-cms-key="engage_hero_h1" data-cms-label="Hero Heading" data-cms-attr="text">Flexible Ways to</span> $2$3'
);

// Hero subtext p
src = src.replace(
  /(<p className="text-\[#4B5563\] text-lg[^"]*"[^>]*>)\s*4 engagement models built around how businesses actually work — pick what fits your project, budget, and timeline\.\s*(<\/p>)/,
  '$1<span data-cms-key="engage_hero_sub" data-cms-label="Hero Subtext" data-cms-attr="text">4 engagement models built around how businesses actually work — pick what fits your project, budget, and timeline.</span>$2'
);

// Hero CTA button
src = src.replace(
  /(to="\/contact" className="inline-flex items-center gap-2 px-7 py-3\.5[^"]*"[^>]*>)\s*Get a Free Recommendation\s*(<ArrowRight)/,
  '$1<span data-cms-key="engage_hero_cta" data-cms-label="Hero CTA Button" data-cms-attr="text">Get a Free Recommendation</span> $2'
);

// Explore Models button
src = src.replace(
  /(href="#models"[^>]*>)\s*Explore Models\s*(<\/a>)/,
  '$1<span data-cms-key="engage_hero_btn2" data-cms-label="Hero Secondary Button" data-cms-attr="text">Explore Models</span>$2'
);

// Stats strip - wrap each stat number and label dynamically
src = src.replace(
  /(<div className="text-3xl font-black"[^>]*>)\{s\.n\}(<\/div>)/g,
  '$1<span data-cms-key={`engage_stat_${i}_n`} data-cms-label="Stat Number" data-cms-attr="text">{s.n}</span>$2'
);
src = src.replace(
  /(<div className="text-xs text-\[#6B7280\][^"]*"[^>]*>)\{s\.l\}(<\/div>)/g,
  '$1<span data-cms-key={`engage_stat_${i}_l`} data-cms-label="Stat Label" data-cms-attr="text">{s.l}</span>$2'
);

// Models section h2 static text (before the span)
src = src.replace(
  /(<h2 className="text-3xl md:text-\[42px\] font-black text-\[#0A1628\] tracking-tight"[^>]*>)\s*Choose How We (<span[^>]*>Work Together<\/span>)\s*(<\/h2>)/,
  '$1<span data-cms-key="engage_models_h2" data-cms-label="Models Section Heading" data-cms-attr="text">Choose How We</span> $2$3'
);

// Model detail header h3: {current.title} Model
src = src.replace(
  /(<h3 className="text-2xl md:text-3xl font-black text-\[#0A1628\]"[^>]*>)\{current\.title\} Model(<\/h3>)/,
  '$1<span data-cms-key={`engage_model_${current.id}_title`} data-cms-label="Model Title" data-cms-attr="text">{current.title} Model</span>$2'
);

// Model tagline: {current.tagline}
src = src.replace(
  /(<p className="font-semibold mt-1 text-sm"[^>]*>)\{current\.tagline\}(<\/p>)/,
  '$1<span data-cms-key={`engage_model_${current.id}_tagline`} data-cms-label="Model Tagline" data-cms-attr="text">{current.tagline}</span>$2'
);

// Get Started button in model panel
src = src.replace(
  /(style=\{ background: `linear-gradient\(135deg, \$\{current\.color\}, \$\{current\.color\}cc\)`, boxShadow[^}]*\}[^>]*>)\s*Get Started\s*(<ArrowRight)/,
  '$1<span data-cms-key={`engage_model_${current.id}_btn`} data-cms-label="Model CTA Button" data-cms-attr="text">Get Started</span> $2'
);

// Model overview: {current.overview}
src = src.replace(
  /(<p className="text-\[#4B5563\] leading-relaxed mt-6 max-w-3xl relative z-10"[^>]*>)\{current\.overview\}(<\/p>)/,
  '$1<span data-cms-key={`engage_model_${current.id}_overview`} data-cms-label="Model Overview" data-cms-attr="text">{current.overview}</span>$2'
);

// How It Works heading
src = src.replace(
  /(<h4 className="text-\[13px\] font-black uppercase tracking-widest text-\[#0A1628\] mb-6[^"]*"[^>]*>)\s*(<span[^>]*><\/span>)\s*How It Works\s*(<\/h4>)/,
  '$1$2 <span data-cms-key="engage_howit_h4" data-cms-label="How It Works Heading" data-cms-attr="text">How It Works</span>$3'
);

// Steps: {s.t} and {s.d}
src = src.replace(
  /(<p className="font-bold text-\[#0A1628\] text-sm mb-1\.5"[^>]*>)\{s\.t\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_step_${current.id}_${i}_t`} data-cms-label="Step Title" data-cms-attr="text">{s.t}</span>$2'
);
src = src.replace(
  /(<p className="text-xs text-\[#6B7280\] leading-relaxed"[^>]*>)\{s\.d\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_step_${current.id}_${i}_d`} data-cms-label="Step Description" data-cms-attr="text">{s.d}</span>$2'
);

// Best For heading
src = src.replace(
  /(<h4 className="text-\[13px\] font-black uppercase tracking-widest text-\[#0A1628\] mb-5[^"]*"[^>]*>)\s*(<span[^>]*><\/span>)\s*Best For\s*(<\/h4>)/,
  '$1$2 <span data-cms-key="engage_bestfor_h4" data-cms-label="Best For Heading" data-cms-attr="text">Best For</span>$3'
);

// bestFor items: {b}
src = src.replace(
  /(<span className="text-sm text-\[#374151\] font-medium"[^>]*>)\{b\}(<\/span>)/g,
  '$1<span data-cms-key={`engage_bestfor_${current.id}_${i}`} data-cms-label="Best For Item" data-cms-attr="text">{b}</span>$2'
);

// Key Benefits heading
src = src.replace(
  /(<h4 className="text-\[13px\] font-black uppercase tracking-widest text-\[#0A1628\] mb-5[^"]*"[^>]*>)\s*(<span[^>]*><\/span>)\s*Key Benefits\s*(<\/h4>)/,
  '$1$2 <span data-cms-key="engage_benefits_h4" data-cms-label="Benefits Heading" data-cms-attr="text">Key Benefits</span>$3'
);

// benefits title: {b.t}
src = src.replace(
  /(<p className="font-bold text-\[#0A1628\] text-sm"[^>]*>)\{b\.t\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_benefit_${current.id}_${i}_t`} data-cms-label="Benefit Title" data-cms-attr="text">{b.t}</span>$2'
);

// benefits desc: {b.d}
src = src.replace(
  /(<p className="text-xs text-\[#6B7280\] mt-0\.5 leading-relaxed"[^>]*>)\{b\.d\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_benefit_${current.id}_${i}_d`} data-cms-label="Benefit Description" data-cms-attr="text">{b.d}</span>$2'
);

// Comparison section h2
src = src.replace(
  /(<h2 className="text-3xl md:text-\[42px\] font-black text-\[#0A1628\] tracking-tight"[^>]*>)\s*Side-by-Side (<span[^>]*>Comparison<\/span>)\s*(<\/h2>)/,
  '$1<span data-cms-key="engage_cmp_h2" data-cms-label="Comparison Heading" data-cms-attr="text">Side-by-Side</span> $2$3'
);

// Decision guide h2
src = src.replace(
  /(<h2 className="text-3xl md:text-\[42px\] font-black text-\[#0A1628\] tracking-tight"[^>]*>)\s*Not Sure Which to (<span[^>]*>Pick\?<\/span>)\s*(<\/h2>)/,
  '$1<span data-cms-key="engage_guide_h2" data-cms-label="Decision Guide Heading" data-cms-attr="text">Not Sure Which to</span> $2$3'
);

// Decision guide cards: {item.q} and {item.a}
src = src.replace(
  /(<p className="font-bold text-\[#0A1628\] text-sm mb-1"[^>]*>)\{item\.q\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_guide_${i}_q`} data-cms-label="Guide Question" data-cms-attr="text">{item.q}</span>$2'
);
src = src.replace(
  /(<p className="text-sm font-black"[^>]*>)→ \{item\.a\}(<\/p>)/g,
  '$1<span data-cms-key={`engage_guide_${i}_a`} data-cms-label="Guide Answer" data-cms-attr="text">→ {item.a}</span>$2'
);

// CTA section badge
src = src.replace(
  /(<span className="inline-block px-4 py-1\.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-\[#FF6B2B\]"[^>]*>)\s*Let&#39;s Build Together\s*(<\/span>)/,
  '$1<span data-cms-key="engage_cta_badge" data-cms-label="CTA Badge" data-cms-attr="text">Let\'s Build Together</span>$2'
);
// Also try without HTML entity
src = src.replace(
  /(<span className="inline-block px-4 py-1\.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-\[#FF6B2B\]"[^>]*>)\s*Let's Build Together\s*(<\/span>)/,
  "$1<span data-cms-key=\"engage_cta_badge\" data-cms-label=\"CTA Badge\" data-cms-attr=\"text\">Let's Build Together</span>$2"
);

// CTA h2
src = src.replace(
  /(<h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4"[^>]*>)\s*Ready to Find Your (<span[^>]*>Perfect Model<\/span>)\?\s*(<\/h2>)/,
  '$1<span data-cms-key="engage_cta_h2" data-cms-label="CTA Heading" data-cms-attr="text">Ready to Find Your</span> $2?$3'
);

// CTA button text
src = src.replace(
  /(style=\{ background: "linear-gradient\(135deg, #FF6B2B, #e85a1a\)", boxShadow: "0 4px 20px[^"]*"[^}]*\}[^>]*>)\s*Start a Conversation\s*(<ArrowRight)/,
  '$1<span data-cms-key="engage_cta_btn" data-cms-label="CTA Button" data-cms-attr="text">Start a Conversation</span> $2'
);

// How to Choose CTA button
src = src.replace(
  /(style=\{ background: "linear-gradient\(135deg, #FF6B2B, #e85a1a\)", boxShadow: "0 8px 24px[^"]*"[^}]*\}[^>]*>)\s*Get a Free Consultation\s*(<ArrowRight)/,
  '$1<span data-cms-key="engage_guide_cta" data-cms-label="Guide CTA Button" data-cms-attr="text">Get a Free Consultation</span> $2'
);

const after = (src.match(/data-cms-key=/g) || []).length;
console.log(`Total data-cms-key attributes: ${after}`);

src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(fpath, src);
console.log('DONE: EngagementModelsPage.tsx patched');

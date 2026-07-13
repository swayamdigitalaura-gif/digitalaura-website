import re, os

base = 'd:/claudeproject/digitalaura/digital-aura-project/src/pages/services/'

files = {
    'AIChatbotAssistantPage': { 'tm_heading': 'From the Teams Using These Assistants Every Day', 'tag_prefix': 'AI Chatbot' },
    'AIWebAppsPage':           { 'tm_heading': 'From the Teams Using These Products',             'tag_prefix': 'AI Web Apps' },
    'CustomAIWebSolutionsPage':{ 'tm_heading': 'From the Teams Running These Platforms',          'tag_prefix': 'Custom AI' },
    'FullStackDevelopmentPage':{ 'tm_heading': 'From the Teams Who Shipped With Us',              'tag_prefix': 'Full Stack' },
}

cs_colors = ['#7C3AED','#FF6B2B','#22C55E','#1A6FE8','#EC4899','#F59E0B']
tm_colors = ['#7C3AED','#1A6FE8','#FF6B2B','#22C55E']

NEW_CARD = '''const CaseStudyCard = ({ cs, i }: { cs: typeof caseStudies[0]; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
      className="card-hover group rounded-2xl overflow-hidden border bg-white flex flex-col"
      style={{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="h-24 relative px-5 flex items-end pb-4" style={{ background: cs.topBg }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15` }}>{cs.tag}</span>
        <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}15`, border: `1px solid ${cs.badgeColor}30` }}>{cs.badge}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4">{cs.title} — {cs.subtitle}</h3>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} style={{ color: cs.badgeColor }} />
          <span className="text-[38px] font-black leading-none" style={{ color: cs.badgeColor }}>{cs.stat}</span>
        </div>
        <p className="text-[14px] leading-relaxed text-[#4B5563] mb-4 flex-1">{cs.statDesc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {cs.tags.map((t: string) => <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: cs.badgeColor, background: `${cs.badgeColor}12` }}>{t}</span>)}
        </div>
        <button onClick={() => setOpen(!open)} className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: cs.badgeColor }}>
          {open ? "Show less" : "Read Full Case Study"} <ArrowRight size={14} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mt-4">
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">The Challenge: </span>{cs.problem}</p>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3"><span className="font-semibold text-[#374151]">What We Built: </span>{cs.solution}</p>
              <p className="text-[11px] text-[#9CA3AF] font-mono mb-4">{cs.stack}</p>
              <ul className="space-y-1.5 mb-4">{cs.results.map((r: string) => <li key={r} className="flex items-start gap-2 text-[13px] text-[#374151]"><Check size={13} className="mt-0.5 shrink-0" style={{ color: cs.badgeColor }} />{r}</li>)}</ul>
              <blockquote className="border-l-2 pl-3 italic text-[13px] text-[#6B7280]" style={{ borderColor: cs.badgeColor }}>
                "{cs.quote}"<br /><span className="not-italic font-semibold text-[#374151] text-[12px]">{cs.quoteBy}</span>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
'''

for fname, cfg in files.items():
    fp = base + fname + '.tsx'
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add tag/badge/stat fields to each case study entry
    def patch_cs_entry(m, idx=[0]):
        entry = m.group(0)
        color = cs_colors[idx[0] % len(cs_colors)]
        idx[0] += 1
        loc_m = re.search(r'location: "([^"]+)"', entry)
        loc = loc_m.group(1) if loc_m else ''
        results_m = re.search(r'results: \[([^\]]+)\]', entry, re.DOTALL)
        first_result = ''
        if results_m:
            items = re.findall(r'"([^"]+)"', results_m.group(1))
            first_result = items[0] if items else ''
        badge = first_result.split('→')[1].strip()[:28] if '→' in first_result else first_result[:28]
        stat = badge[:12]
        tag = cfg['tag_prefix'] + ' · ' + loc
        topBg = f'linear-gradient(135deg,{color}14 0%,{color}05 100%)'
        stack_m = re.search(r'stack: "([^"]+)"', entry)
        stk = stack_m.group(1) if stack_m else ''
        tags = [s.strip().split(' ')[0] for s in stk.split('·')][:3]
        tags_str = '[' + ', '.join(f'"{t}"' for t in tags) + ']'
        entry = entry.rstrip().rstrip(',')
        entry += f',\n    tag: "{tag}", badge: "{badge}", badgeColor: "{color}", topBg: "{topBg}",\n    subtitle: "{loc}", stat: "{stat}", statDesc: "{first_result}",\n    tags: {tags_str},'
        return entry

    # Only patch entries that don't already have tag field
    if 'tag:' not in content:
        content = re.sub(r'\{[^{}]+title:[^{}]+quoteBy:[^{}]+\}', patch_cs_entry, content)

    # 2. Replace CaseStudyCard
    content = re.sub(r'const CaseStudyCard = \(\{.*?\};\n', NEW_CARD, content, flags=re.DOTALL)

    # 3. Patch testimonials data
    def patch_tm(m):
        tm_raw = m.group(1)
        entries = re.findall(r'\{[^{}]+\}', tm_raw)
        new_entries = []
        for idx, entry in enumerate(entries):
            color = tm_colors[idx % len(tm_colors)]
            by_m = re.search(r'by: "([^"]+)"', entry)
            text_m = re.search(r'text: "([^"]+)"', entry)
            by = by_m.group(1) if by_m else ''
            text = text_m.group(1) if text_m else ''
            words = by.split(',')[0].split()
            initials = ''.join(w[0].upper() for w in words[:2]) if words else 'CL'
            name = by.split(',')[0].strip()
            company = ', '.join(by.split(',')[1:]).strip() if ',' in by else by
            new_entries.append(f'  {{ quote: "{text}", name: "{name}", company: "{company}", initials: "{initials}", color: "{color}" }}')
        return 'const testimonials = [\n' + ',\n'.join(new_entries) + '\n]'

    content = re.sub(r'const testimonials = \[(.*?)\]', patch_tm, content, flags=re.DOTALL)

    # 4. Replace testimonials section
    tm_heading = cfg['tm_heading']
    new_tm_section = f'''{{/* Testimonials */}}
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{{{ opacity: 0, y: 20 }}}} whileInView={{{{ opacity: 1, y: 0 }}}} viewport={{{{ once: true }}}} className="text-center mb-14">
          <span className="section-badge">Client Love</span>
          <h2 className="text-3xl md:text-[42px] font-bold text-[#0A1628] tracking-tight">{tm_heading}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {{testimonials.map((t, i) => (
            <motion.div key={{i}} initial={{{{ opacity: 0, y: 16 }}}} whileInView={{{{ opacity: 1, y: 0 }}}} viewport={{{{ once: true }}}} transition={{{{ delay: i * 0.08, duration: 0.35 }}}}
              className="card-hover rounded-2xl p-7 border bg-white relative overflow-hidden flex flex-col"
              style={{{{ borderColor: "#E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}}}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{{{ background: t.color }}}} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{{{ background: `${{t.color}}15` }}}}>
                <Star size={{18}} style={{{{ color: t.color }}}} />
              </div>
              <div className="flex gap-0.5 mb-4">{{Array.from({{ length: 5 }}).map((_, j) => <Star key={{j}} size={{15}} fill="#FF6B2B" color="#FF6B2B" />)}}</div>
              <p className="text-[#374151] leading-relaxed text-[15px] flex-1 mb-6 italic">QUOTELINE</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{{{ background: t.color }}}}>{{t.initials}}</div>
                <div>
                  <p className="font-bold text-[#0A1628] text-[15px]">{{t.name}}</p>
                  <p className="text-sm text-[#6B7280]">{{t.company}}</p>
                </div>
              </div>
            </motion.div>
          ))}}
        </div>
      </div>
    </section>'''

    new_tm_section = new_tm_section.replace('QUOTELINE', '"{t.quote}"')
    content = re.sub(r'\{/\* Testimonials \*/\}.*?</section>', new_tm_section, content, flags=re.DOTALL)

    # 5. Ensure TrendingUp imported
    if 'TrendingUp' not in content:
        content = content.replace(
            'ArrowRight, ChevronDown, Check, Zap, Star,',
            'ArrowRight, ChevronDown, Check, Zap, Star, TrendingUp,'
        )

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Done: {fname}')

print('ALL DONE')

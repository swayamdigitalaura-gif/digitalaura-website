import os, glob, re

pages_dir = r"d:\claudeproject\digitalaura\digital-aura-project\src\pages\services"

# Old center glow (small)
OLD_GLOW = 'style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }}'
# New center glow (large, like homepage)
NEW_GLOW = 'style={{ width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)" }}'

# Old small blobs
OLD_BLOBS = '''      <div className="absolute top-8 left-8 w-32 h-32 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />'''
# New larger blobs like homepage
NEW_BLOBS = '''      <div className="absolute top-8 left-8 w-48 h-48 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />'''

# Old motion.div inner (no badge, no contact links)
OLD_INNER = '      <div className="max-w-3xl mx-auto relative z-10">\n        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>'
NEW_INNER = '''      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase text-[#FF6B2B]"
            style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.3)" }}>
            Let's Build Together
          </span>'''

updated = 0
for fpath in glob.glob(os.path.join(pages_dir, "*.tsx")):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content
    new_content = new_content.replace(OLD_GLOW, NEW_GLOW)
    new_content = new_content.replace(OLD_BLOBS, NEW_BLOBS)
    new_content = new_content.replace(OLD_INNER, NEW_INNER)

    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {os.path.basename(fpath)}")
        updated += 1
    else:
        print(f"No match: {os.path.basename(fpath)}")

print(f"\nTotal updated: {updated}")

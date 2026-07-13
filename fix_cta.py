import os, glob

pages_dir = r"d:\claudeproject\digitalaura\digital-aura-project\src\pages\services"

OLD_GLOW = 'background: "radial-gradient(circle, rgba(255,107,43,0.1) 0%, rgba(26,111,232,0.07) 50%, transparent 70%)"'
NEW_GLOW = 'background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(255,107,43,0.08) 40%, transparent 70%)"'

OLD_TOPBAR = '<div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #1A6FE8)" }} />'
NEW_TOPBAR = '''<div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #FF6B2B, #7C3AED, #1A6FE8)" }} />
      <div className="absolute top-8 left-8 w-32 h-32 rounded-full animate-drift opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
      <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full animate-drift-2 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />'''

updated = 0
for fpath in glob.glob(os.path.join(pages_dir, "*.tsx")):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content.replace(OLD_GLOW, NEW_GLOW).replace(OLD_TOPBAR, NEW_TOPBAR)

    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {os.path.basename(fpath)}")
        updated += 1

print(f"\nTotal updated: {updated}")

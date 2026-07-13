import os, glob

pages_dir = r"d:\claudeproject\digitalaura\digital-aura-project\src\pages\services"

# Old closing - disclaimer text then close motion.div and container
OLD_FOOTER = '''          <p className="text-[#9CA3AF] text-xs mt-4">'''

# We need to find the pattern: disclaimer <p>, then close </motion.div></div></section>
# and insert the phone/email links before closing </motion.div>

import re

PHONE_EMAIL_BLOCK = '''          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#E2E8F0] mt-6">
            <a href="tel:+918141200284" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={15} className="text-[#FF6B2B]" /> +91 81412 00284
            </a>
            <a href="mailto:info@thedigitalaura.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={15} className="text-[#FF6B2B]" /> info@thedigitalaura.com
            </a>
          </div>'''

updated = 0
skipped = 0

for fpath in glob.glob(os.path.join(pages_dir, "*.tsx")):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already has phone link
    if 'tel:+918141200284' in content:
        print(f"Already done: {os.path.basename(fpath)}")
        skipped += 1
        continue

    # Skip WordPressPage
    if 'WordPressPage' in os.path.basename(fpath):
        print(f"Skipped (WordPress): {os.path.basename(fpath)}")
        skipped += 1
        continue

    # Find the CTA section disclaimer text and insert phone/email after it
    # Pattern: disclaimer <p> tag ... </p>\n        </motion.div>
    pattern = r'(<p className="text-\[#9CA3AF\] text-xs mt-4">.*?</p>\s*)(        </motion\.div>)'
    replacement = r'\1' + '\n' + PHONE_EMAIL_BLOCK + '\n' + r'\2'

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    if new_content != content:
        # Now add Phone and Mail imports if missing
        if 'Phone' not in new_content or 'Mail' not in new_content:
            # Find lucide-react import line and add Phone, Mail
            new_content = re.sub(
                r'(import \{[^}]*)(ArrowRight)([^}]*\} from "lucide-react")',
                r'\1ArrowRight, Phone, Mail\3',
                new_content
            )
            # If ArrowRight not there, try to add to existing lucide import
            if 'Phone' not in new_content:
                new_content = re.sub(
                    r'(import \{)([^}]+)(\} from "lucide-react")',
                    r'\1\2, Phone, Mail\3',
                    new_content
                )

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated: {os.path.basename(fpath)}")
        updated += 1
    else:
        print(f"No CTA match: {os.path.basename(fpath)}")

print(f"\nTotal updated: {updated}, skipped: {skipped}")

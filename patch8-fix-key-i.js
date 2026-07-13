/**
 * Fix key={i} undefined crash in service pages where map was renamed to (s, si)
 * but inner JSX still uses key={i}
 */
const fs = require('fs');
const path = require('path');
const dir = './digital-aura-project/src/pages/services';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let fixed = 0;
files.forEach(file => {
  const fpath = path.join(dir, file);
  let src = fs.readFileSync(fpath, 'utf8');
  const before = src;

  // If the file has map((s, si) AND key={i}, fix it
  if (src.includes('map((s, si)') && src.includes('key={i}')) {
    // Replace key={i} with key={si} only in contexts near map((s, si)
    // We'll replace all key={i} -> key={si} since si is the correct index var
    src = src.replace(/key=\{i\}/g, 'key={si}');
    // Also fix any `data-cms-key` that uses _${i}_ near services map
    // These are fine as dynamic keys so leave them
    if (src !== before) {
      fs.writeFileSync(fpath, src);
      console.log('FIXED key={i} in:', file);
      fixed++;
    }
  }
});
console.log(`\nFixed ${fixed} files`);

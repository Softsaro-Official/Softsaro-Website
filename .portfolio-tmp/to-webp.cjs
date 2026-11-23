const fs = require('fs'), path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules', 'sharp'));
(async () => {
  const items = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  for (const it of items) {
    try {
      const m = await sharp(it.in).metadata();
      if (!m.width || !m.height) throw new Error('no dimensions');
      await sharp(it.in).rotate().resize({ width: 1100, height: 1100, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(it.out);
      console.log('OK|' + it.slug + '|' + m.width + 'x' + m.height + '|' + fs.statSync(it.out).size);
    } catch (e) { console.log('FAIL|' + it.slug + '|' + e.message); }
  }
})();
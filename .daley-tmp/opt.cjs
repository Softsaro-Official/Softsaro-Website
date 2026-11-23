const fs = require('fs'), path = require('path'), sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public', 'images', 'daley-bhai');
fs.mkdirSync(out, { recursive: true });
const files = JSON.parse(fs.readFileSync(path.join(__dirname, 'files.json'), 'utf8').replace(/^\uFEFF/, ''));
(async () => {
  const data = {};
  for (const [k, f] of Object.entries(files)) {
    const max = k === 'hero' ? 1800 : 1400;
    const buf = await sharp(path.join(__dirname, f)).rotate().resize({ width: max, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(path.join(out, k + '.webp'), buf.data);
    const bl = await sharp(buf.data).resize(24).webp({ quality: 30 }).toBuffer();
    data[k] = { src: '/images/daley-bhai/' + k + '.webp', w: buf.info.width, h: buf.info.height, blur: 'data:image/webp;base64,' + bl.toString('base64') };
  }
  const ts = 'export type DaleyImg = { src: string; w: number; h: number; blur: string };\n\nexport const daley = ' + JSON.stringify(data, null, 2) + ' satisfies Record<string, DaleyImg>;\n';
  fs.writeFileSync(path.join(root, 'lib', 'daley-data.ts'), ts);
  console.log('optimized ' + Object.keys(data).length);
})().catch((e) => { console.error(e); process.exit(1); });
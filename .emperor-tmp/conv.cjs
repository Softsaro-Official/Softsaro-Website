const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const tmp = process.argv[2], out = process.argv[3], dataFile = process.argv[4];
const list = [
  ["hero","hero.png",1800],["overview","overview.png",1000],["challenge","challenge.png",1000],["solution","solution.png",1000],["results","results.png",1000],
  ["g1","g1.png",900],["g2","g2.png",900],["g3","g3.png",900],["g4","g4.png",900],["g5","g5.png",900],["g6","g6.png",900],["g7","g7.png",900],["g8","g8.png",900],
  ["rel1","rel1.jpg",800],["rel2","rel2.jpg",800],["rel3","rel3.png",800]
];
(async () => {
  const data = {};
  for (const [key, file, width] of list) {
    const r = await sharp(path.join(tmp, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(path.join(out, key + ".webp"), r.data);
    const b = await sharp(r.data).resize(24).webp({ quality: 30 }).toBuffer();
    data[key] = { src: "/images/emperor/" + key + ".webp", w: r.info.width, h: r.info.height, blur: "data:image/webp;base64," + b.toString("base64") };
  }
  const ts = 'export type EmperorImg = { src: string; w: number; h: number; blur: string };\n\nexport const emperor = ' + JSON.stringify(data, null, 2) + ' satisfies Record<string, EmperorImg>;\n';
  fs.writeFileSync(dataFile, ts);
  console.log("converted " + list.length);
})().catch((e) => { console.error(e); process.exit(1); });
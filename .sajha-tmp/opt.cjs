const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const out = path.join(process.cwd(), "public", "images", "sajha-courier");
const list = [["hero","sajha1.png",1800],["overview","sajha2.png",1400],["challenge","sajha3.png",1400],["solution","sajha4.png",1400],["results","sajha5.png",1400],
  ["g1","sajha6.jpg",1400],["g2","sajha7.png",1400],["g3","sajha8.png",1400],["g4","sajha9.png",1400],["g5","sajha10.png",1400],["g6","sajha11.png",1400],["g7","sajha12.png",1400],["g8","sajha13.png",1400]];
(async () => {
  const data = {};
  for (const [key, file, max] of list) {
    const src = path.join(__dirname, file);
    const meta = await sharp(src).metadata();
    const info = await sharp(src).resize({ width: Math.min(max, meta.width) }).webp({ quality: 82 }).toFile(path.join(out, key + ".webp"));
    const blur = (await sharp(src).resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer()).toString("base64");
    data[key] = { src: "/images/sajha-courier/" + key + ".webp", w: info.width, h: info.height, blur: "data:image/webp;base64," + blur };
    console.log(key, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
  }
  const ts = "export type SajhaImg = { src: string; w: number; h: number; blur: string };\n\nexport const sajha = " + JSON.stringify(data, null, 2) + " satisfies Record<string, SajhaImg>;\n";
  fs.writeFileSync(path.join(process.cwd(), "lib", "sajha-data.ts"), ts);
})().catch((e) => { console.error(e); process.exit(1); });
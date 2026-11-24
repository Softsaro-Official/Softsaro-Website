const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
(async () => {
  const items = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const data = {};
  for (const it of items) {
    const meta = await sharp(it.in).metadata();
    const info = await sharp(it.in).rotate().resize({ width: Math.min(it.max, meta.width), withoutEnlargement: true }).webp({ quality: 82 }).toFile(it.out);
    const blur = (await sharp(it.in).rotate().resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer()).toString("base64");
    data[it.key] = { src: "/images/about/" + path.basename(it.out), w: info.width, h: info.height, blur: "data:image/webp;base64," + blur };
    console.log(it.key, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
  }
  const ts = "export type AboutImg = { src: string; w: number; h: number; blur: string };\n\nexport const aboutImg = " + JSON.stringify(data, null, 2) + " satisfies Record<string, AboutImg>;\n";
  fs.writeFileSync(path.join(process.cwd(), "lib", "about-images.ts"), ts);
})().catch((e) => { console.error(e); process.exit(1); });
// Convert OG SVGs (and logo SVG) to PNGs using sharp.
// One-shot script — safe to re-run.

import sharp from "sharp";
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");

const ogSvgSrcDir = path.join(repoRoot, "docs", "brand-assets", "og");
const ogPngOutDir = path.join(projectRoot, "public", "og");
const brandSvg = path.join(projectRoot, "public", "brand", "og-default-1200x630.svg");
const logoMarkSvg = path.join(projectRoot, "public", "brand", "logo-mark.svg");
const publicLogoSvg = path.join(projectRoot, "public", "logo.svg");
const publicLogoPng = path.join(projectRoot, "public", "logo.png");

await mkdir(ogPngOutDir, { recursive: true });

// Map: source svg -> output png filename in /public/og
// docs/brand-assets/og/og-default.svg     -> default.png
// docs/brand-assets/og/og-bangalore.svg   -> bangalore.png
// ... etc
// public/brand/og-default-1200x630.svg    -> home.png  (modern brand variant)
const targets = [
  { src: path.join(ogSvgSrcDir, "og-default.svg"), out: "default.png" },
  { src: path.join(ogSvgSrcDir, "og-bangalore.svg"), out: "bangalore.png" },
  { src: path.join(ogSvgSrcDir, "og-dubai.svg"), out: "dubai.png" },
  { src: path.join(ogSvgSrcDir, "og-insights.svg"), out: "insights.png" },
  { src: path.join(ogSvgSrcDir, "og-services.svg"), out: "services.png" },
  { src: path.join(ogSvgSrcDir, "og-work.svg"), out: "work.png" },
  { src: brandSvg, out: "home.png" },
];

for (const { src, out } of targets) {
  if (!existsSync(src)) {
    console.warn(`[og] missing source: ${src}`);
    continue;
  }
  const svg = await readFile(src);
  const dest = path.join(ogPngOutDir, out);
  await sharp(svg, { density: 300 })
    .resize(1200, 630, { fit: "cover" })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(dest);
  console.log(`[og] wrote ${dest}`);
}

// Copy logo-mark.svg -> public/logo.svg, and also raster a 512x512 logo.png.
if (existsSync(logoMarkSvg)) {
  await copyFile(logoMarkSvg, publicLogoSvg);
  console.log(`[logo] copied ${publicLogoSvg}`);
  const buf = await readFile(logoMarkSvg);
  await sharp(buf, { density: 300 })
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(publicLogoPng);
  console.log(`[logo] wrote ${publicLogoPng}`);
}

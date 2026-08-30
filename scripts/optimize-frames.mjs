// One-off: re-encode scroll frame sequences to downscaled WebP.
// Writes .webp next to each source frame; originals are left untouched so
// the change is fully reversible. Run: node scripts/optimize-frames.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");
const MAX_WIDTH = 1600; // matches the canvas backing-store cap in scrub-video-frames.tsx
const QUALITY = 78;

const FOLDERS = ["Landing", "About", "approach", "Projects"];

async function folderJpgBytes(dir) {
  const files = await readdir(dir);
  let bytes = 0;
  for (const f of files) {
    if (/\.(jpe?g|png)$/i.test(f)) bytes += (await stat(path.join(dir, f))).size;
  }
  return bytes;
}

async function processFolder(name) {
  const dir = path.join(PUBLIC, name);
  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  const before = await folderJpgBytes(dir);
  let after = 0;
  let done = 0;
  for (const f of files) {
    const src = path.join(dir, f);
    const out = path.join(dir, f.replace(/\.(jpe?g|png)$/i, ".webp"));
    const info = await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    after += info.size;
    done++;
  }
  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(
    `${name}: ${done} frames  ${mb(before)}MB JPEG -> ${mb(after)}MB WebP  (${Math.round((1 - after / before) * 100)}% smaller)`
  );
  return { before, after };
}

let tb = 0, ta = 0;
for (const name of FOLDERS) {
  const { before, after } = await processFolder(name);
  tb += before; ta += after;
}
const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`\nTOTAL: ${mb(tb)}MB -> ${mb(ta)}MB  (${Math.round((1 - ta / tb) * 100)}% smaller)`);

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'public/images/banners';
const OUTPUT_DIRS = ['src/assets/banners', 'public/images/banners'];
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;

const files = (await readdir(SOURCE_DIR)).filter((file) => /\.jpe?g$/i.test(file));

for (const file of files) {
  const input = path.join(SOURCE_DIR, file);

  const { data, info } = await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  for (const outputDir of OUTPUT_DIRS) {
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, file), data);
    const kb = Math.round(data.length / 1024);
    console.log(`${file} → ${outputDir}: ${info.width}x${info.height}, ${kb} KB`);
  }
}

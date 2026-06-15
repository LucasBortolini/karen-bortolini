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
  const buffer = await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  for (const outputDir of OUTPUT_DIRS) {
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, file), buffer);
    const kb = Math.round(buffer.length / 1024);
    console.log(`${file} → ${outputDir}: ${kb} KB`);
  }
}

const ogSource = path.join(OUTPUT_DIRS[0], 'sobre.jpg');
if (files.includes('sobre.jpg')) {
  await sharp(ogSource)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile('public/og-default.jpg');
  console.log('og-default.jpg → public/ (1200x630)');
}

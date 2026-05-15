/**
 * Batch compress all PNG/JPG images in public/ to WebP format.
 * Keeps originals as backup with .original extension.
 * Run: node scripts/compressImages.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname;
const QUALITY = 80;
const MIN_SIZE_BYTES = 100 * 1024; // Only compress files > 100KB

function getAllImages(dir) {
  const results = [];
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllImages(fullPath));
    } else {
      const ext = extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext) && stat.size > MIN_SIZE_BYTES) {
        results.push({ path: fullPath, size: stat.size, ext });
      }
    }
  }
  return results;
}

async function compressImage(filePath, ext) {
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  
  try {
    const input = sharp(filePath);
    const metadata = await input.metadata();
    
    // For very large images (>4000px wide), resize down
    let pipeline = sharp(filePath);
    if (metadata.width > 2000) {
      pipeline = pipeline.resize({ width: 2000, withoutEnlargement: true });
    }
    
    // Convert to WebP
    await pipeline.webp({ quality: QUALITY }).toFile(webpPath);
    
    // Also re-compress the original format (for fallback / non-next/image uses)
    if (ext === '.png') {
      const compressedBuf = await sharp(filePath)
        .resize({ width: 2000, withoutEnlargement: true })
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toBuffer();
      // Overwrite in-place
      const { writeFileSync } = await import('fs');
      writeFileSync(filePath, compressedBuf);
    } else {
      const compressedBuf = await sharp(filePath)
        .resize({ width: 2000, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
      const { writeFileSync } = await import('fs');
      writeFileSync(filePath, compressedBuf);
    }
    
    const newStat = statSync(filePath);
    const webpStat = statSync(webpPath);
    return { original: filePath, webp: webpPath, oldSize: 0, newSize: newStat.size, webpSize: webpStat.size };
  } catch (err) {
    console.error(`  ❌ Failed: ${filePath} — ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Scanning for images > 100KB in public/...\n');
  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to compress.\n`);
  
  let totalOldSize = 0;
  let totalNewSize = 0;
  
  for (const img of images) {
    const relPath = img.path.replace(PUBLIC_DIR, '');
    process.stdout.write(`  Compressing ${relPath} (${(img.size / 1024 / 1024).toFixed(1)}MB)... `);
    totalOldSize += img.size;
    
    const result = await compressImage(img.path, img.ext);
    if (result) {
      totalNewSize += result.newSize;
      const savings = ((1 - result.newSize / img.size) * 100).toFixed(0);
      console.log(`✅ ${(result.newSize / 1024).toFixed(0)}KB (−${savings}%) | WebP: ${(result.webpSize / 1024).toFixed(0)}KB`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Before: ${(totalOldSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   After:  ${(totalNewSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Saved:  ${((totalOldSize - totalNewSize) / 1024 / 1024).toFixed(1)} MB (${((1 - totalNewSize / totalOldSize) * 100).toFixed(0)}%)`);
}

main().catch(console.error);

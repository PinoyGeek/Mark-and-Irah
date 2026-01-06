import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve(process.cwd(), "public", "images");

const VALID_INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function convertImageToWebp(inputPath: string, quality: number = 80): Promise<void> {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${inputPath} - WebP already exists`);
    return; // skip if already converted
  }

  try {
    const image = sharp(inputPath, { failOn: "none" });
    await image.webp({ quality }).toFile(outputPath);
    console.log(`✓ Converted: ${inputPath} -> ${outputPath}`);
  } catch (err) {
    throw new Error(`Failed to convert ${inputPath}: ${err}`);
  }
}

function getAllImageFiles(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (VALID_INPUT_EXTENSIONS.has(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

async function main(): Promise<void> {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const targets = getAllImageFiles(IMAGES_DIR);

  if (targets.length === 0) {
    console.log("No JPG/PNG images found to convert.");
    return;
  }

  console.log(`Found ${targets.length} images in ${IMAGES_DIR} and subdirectories`);
  console.log(`Converting to WebP format...\n`);

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of targets) {
    try {
      const outputPath = path.join(
        path.dirname(file),
        `${path.basename(file, path.extname(file))}.webp`
      );
      
      if (fs.existsSync(outputPath)) {
        skipped++;
        continue;
      }
      
      await convertImageToWebp(file, 82);
      converted += 1;
    } catch (err) {
      console.error(`✗ ${err}`);
      failed += 1;
    }
  }

  console.log(`\nDone!`);
  console.log(`  Converted: ${converted}`);
  console.log(`  Skipped (already exists): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total: ${targets.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve(process.cwd(), "public", "Couple_img");

const VALID_INPUT_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function convertImageToWebp(inputPath: string, quality: number = 80): Promise<void> {
  const ext = path.extname(inputPath);
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(path.dirname(inputPath), `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    return; // skip if already converted
  }

  const image = sharp(inputPath, { failOn: "none" });
  await image.webp({ quality }).toFile(outputPath);
}

async function main(): Promise<void> {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(IMAGES_DIR);

  const targets = entries
    .filter((name) => VALID_INPUT_EXTENSIONS.has(path.extname(name)))
    .map((name) => path.join(IMAGES_DIR, name));

  if (targets.length === 0) {
    console.log("No JPG/PNG images found to convert.");
    return;
  }

  console.log(`Converting ${targets.length} images in ${IMAGES_DIR} to WebP...`);

  let converted = 0;
  for (const file of targets) {
    try {
      await convertImageToWebp(file, 82);
      converted += 1;
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err);
    }
  }

  console.log(`Done. Converted ${converted}/${targets.length} images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



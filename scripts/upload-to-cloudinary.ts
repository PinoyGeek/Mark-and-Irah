/**
 * Uploads all images from the /public folder to Cloudinary.
 * Preserves the folder structure as Cloudinary public IDs.
 *
 * Usage:
 *   pnpm upload:cloudinary
 *
 * Requires in .env.local:
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
 */

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const PUBLIC_DIR = path.resolve(process.cwd(), "public")

// Image file extensions to upload
const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".JPG", ".JPEG", ".PNG", ".WEBP"
])

// Folders to skip (small icons, favicons, audio, etc.)
const SKIP_FOLDERS = new Set(["favicon_io", "background_music"])

function getAllImageFiles(dir: string, base = PUBLIC_DIR): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relPath = path.relative(base, fullPath)
    const topFolder = relPath.split(path.sep)[0]

    if (entry.isDirectory()) {
      if (!SKIP_FOLDERS.has(entry.name)) {
        files.push(...getAllImageFiles(fullPath, base))
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      if (IMAGE_EXTENSIONS.has(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * Converts a local file path to a Cloudinary public_id.
 * e.g. /public/mobile-background/couple (1).webp  →  mobile-background/couple (1)
 */
function toPublicId(filePath: string): string {
  const rel = path.relative(PUBLIC_DIR, filePath)
  // Strip file extension
  const withoutExt = rel.replace(/\.[^/.]+$/, "")
  // Normalise path separators to forward slash
  return withoutExt.split(path.sep).join("/")
}

async function uploadFile(filePath: string): Promise<void> {
  const publicId = toPublicId(filePath)

  try {
    // Check if already uploaded to avoid re-uploading
    await cloudinary.api.resource(publicId)
    console.log(`  ✓ already exists — ${publicId}`)
    return
  } catch {
    // Resource doesn't exist yet — upload it
  }

  try {
    await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: false,
      use_filename: false,
      unique_filename: false,
    })
    console.log(`  ↑ uploaded — ${publicId}`)
  } catch (err: any) {
    console.error(`  ✗ failed  — ${publicId}: ${err.message ?? err}`)
  }
}

async function main() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error(
      "❌  Missing Cloudinary credentials.\n" +
      "    Make sure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and\n" +
      "    CLOUDINARY_API_SECRET are set in .env.local"
    )
    process.exit(1)
  }

  const files = getAllImageFiles(PUBLIC_DIR)

  console.log(`\n☁️  Uploading ${files.length} images to Cloudinary (${cloudName})\n`)

  // Upload in batches of 5 to avoid rate limiting
  const BATCH = 5
  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH)
    await Promise.all(batch.map(uploadFile))
  }

  console.log("\n✅  Done!\n")
}

main()

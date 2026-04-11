/**
 * Full two-way sync between local public/ and Cloudinary.
 *
 * - Uploads local images missing from Cloudinary.
 * - Deletes Cloudinary assets that no longer exist locally.
 * - Skips files that already exist in both places (no re-upload).
 *
 * Usage:
 *   pnpm sync:cloudinary
 *   pnpm sync:cloudinary --dry-run          (preview without making changes)
 *   pnpm sync:cloudinary --no-delete        (upload only, never delete)
 *   pnpm sync:cloudinary --no-upload        (delete orphans only)
 *   pnpm sync:cloudinary --project "Vince and Era"
 *
 * Environment variables required in .env.local:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT_NAMESPACE = "wedding-projects"
const DEFAULT_PROJECT = "Mark and Irah"

const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg",
  ".JPG", ".JPEG", ".PNG", ".WEBP",
])

const VIDEO_EXTENSIONS = new Set([
  ".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v",
  ".MP4", ".MOV", ".WEBM", ".AVI", ".MKV", ".M4V",
])

/** Local folders that should never be synced to Cloudinary */
const SKIP_FOLDERS = new Set(["favicon_io", "background_music"])

/** Cloudinary API returns max 500 per page */
const CLOUDINARY_PAGE_SIZE = 500

/** Concurrent upload batch size — keep low to respect rate limits */
const BATCH_SIZE = 5

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CliOptions {
  project: string
  sourceDir: string
  dryRun: boolean
  noDelete: boolean
  noUpload: boolean
}

interface SyncSummary {
  uploaded: number
  skipped: number
  deleted: number
  uploadFailed: number
  deleteFailed: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function isVideo(filePath: string): boolean {
  return VIDEO_EXTENSIONS.has(path.extname(filePath))
}

function collectLocalAssets(dir: string): string[] {
  const results: string[] = []

  function walk(current: string): void {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        if (!SKIP_FOLDERS.has(entry.name)) walk(fullPath)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name)
        if (IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext)) {
          results.push(fullPath)
        }
      }
    }
  }

  walk(dir)
  return results
}

function buildPublicId(filePath: string, sourceDir: string, projectSlug: string): string {
  const rel = path.relative(sourceDir, filePath)
  const withoutExt = rel.replace(/\.[^/.]+$/, "")
  const forwardSlash = withoutExt.split(path.sep).join("/")
  return `${ROOT_NAMESPACE}/${projectSlug}/${forwardSlash}`
}

// ---------------------------------------------------------------------------
// Cloudinary API helpers
// ---------------------------------------------------------------------------

/**
 * Fetches all public IDs currently stored under the project's folder on Cloudinary.
 * Queries both image and video resource types and handles pagination automatically.
 */
async function fetchCloudinaryAssets(projectSlug: string): Promise<Set<string>> {
  const prefix = `${ROOT_NAMESPACE}/${projectSlug}`
  const publicIds = new Set<string>()

  process.stdout.write("  Fetching Cloudinary assets")

  for (const resourceType of ["image", "video"] as const) {
    let nextCursor: string | undefined
    do {
      const response = await cloudinary.api.resources({
        resource_type: resourceType,
        type: "upload",
        prefix,
        max_results: CLOUDINARY_PAGE_SIZE,
        ...(nextCursor ? { next_cursor: nextCursor } : {}),
      })

      for (const resource of response.resources) {
        publicIds.add(resource.public_id)
      }

      nextCursor = response.next_cursor
      process.stdout.write(".")
    } while (nextCursor)
  }

  console.log(` ${publicIds.size} found\n`)
  return publicIds
}

async function uploadFile(
  filePath: string,
  publicId: string,
  dryRun: boolean
): Promise<"uploaded" | "failed"> {
  const resourceType = isVideo(filePath) ? "video" : "image"

  if (dryRun) {
    console.log(`  ↑ dry-run  [${resourceType}] — ${publicId}`)
    return "uploaded"
  }

  // Use upload_large for videos to support files over 100 MB via chunked upload
  const uploadFn = resourceType === "video"
    ? cloudinary.uploader.upload_large.bind(cloudinary.uploader)
    : cloudinary.uploader.upload.bind(cloudinary.uploader)

  try {
    await uploadFn(filePath, {
      resource_type: resourceType,
      public_id: publicId,
      overwrite: false,
      use_filename: false,
      unique_filename: false,
      // 50 MB chunks — stays well within Cloudinary per-chunk limits
      chunk_size: 50 * 1024 * 1024,
    })
    console.log(`  ↑ uploaded [${resourceType}] — ${publicId}`)
    return "uploaded"
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null
          ? JSON.stringify(err)
          : String(err)
    console.error(`  ✗ upload failed [${resourceType}] — ${publicId}: ${message}`)
    return "failed"
  }
}

async function deleteAsset(
  publicId: string,
  filePath: string | undefined,
  dryRun: boolean
): Promise<"deleted" | "failed"> {
  // Determine resource type from the file path if known, otherwise try image first
  const resourceType = filePath && isVideo(filePath) ? "video" : "image"

  if (dryRun) {
    console.log(`  🗑 dry-run  [${resourceType}] — ${publicId}`)
    return "deleted"
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    if (result.result === "ok" || result.result === "not found") {
      // "not found" means it's already gone — desired state achieved
      console.log(`  🗑 deleted  [${resourceType}] — ${publicId}`)
      return "deleted"
    } else {
      console.error(`  ✗ delete failed [${resourceType}] — ${publicId}: ${result.result}`)
      return "failed"
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ delete error  [${resourceType}] — ${publicId}: ${message}`)
    return "failed"
  }
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2)
  let project = DEFAULT_PROJECT
  let sourceDir = path.resolve(process.cwd(), "public")
  let dryRun = false
  let noDelete = false
  let noUpload = false

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--project":
        project = args[++i] ?? project
        break
      case "--source":
        sourceDir = path.resolve(process.cwd(), args[++i] ?? "public")
        break
      case "--dry-run":
        dryRun = true
        break
      case "--no-delete":
        noDelete = true
        break
      case "--no-upload":
        noUpload = true
        break
    }
  }

  return { project, sourceDir, dryRun, noDelete, noUpload }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env

  if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error(
      "❌  Missing Cloudinary credentials.\n" +
        "    Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and\n" +
        "    CLOUDINARY_API_SECRET are set in .env.local"
    )
    process.exit(1)
  }

  const opts = parseArgs(process.argv)
  const projectSlug = slugify(opts.project)

  console.log(`\n☁️  Cloudinary sync`)
  console.log(`   Project  : "${opts.project}" → ${ROOT_NAMESPACE}/${projectSlug}`)
  console.log(`   Source   : ${opts.sourceDir}`)
  console.log(`   Dry-run  : ${opts.dryRun}`)
  console.log(`   Upload   : ${!opts.noUpload}`)
  console.log(`   Delete   : ${!opts.noDelete}\n`)

  // --- Step 1: Build local asset → publicId map (images + videos) ---
  const localFiles = collectLocalAssets(opts.sourceDir)
  const localPublicIds = new Map<string, string>() // publicId → filePath

  for (const filePath of localFiles) {
    const publicId = buildPublicId(filePath, opts.sourceDir, projectSlug)
    localPublicIds.set(publicId, filePath)
  }

  const localImages = localFiles.filter((f) => IMAGE_EXTENSIONS.has(path.extname(f)))
  const localVideos = localFiles.filter((f) => VIDEO_EXTENSIONS.has(path.extname(f)))
  console.log(`  Local images : ${localImages.length}`)
  console.log(`  Local videos : ${localVideos.length}`)

  // --- Step 2: Fetch what's currently on Cloudinary ---
  const cloudinaryIds = await fetchCloudinaryAssets(projectSlug)

  // --- Step 3: Diff ---
  const toUpload: Array<{ filePath: string; publicId: string }> = []
  const toDelete: string[] = []

  for (const [publicId, filePath] of localPublicIds) {
    if (!cloudinaryIds.has(publicId)) {
      toUpload.push({ filePath, publicId })
    }
  }

  for (const publicId of cloudinaryIds) {
    if (!localPublicIds.has(publicId)) {
      toDelete.push(publicId)
    }
  }

  const skipped = localFiles.length - toUpload.length

  console.log(`  To upload    : ${toUpload.length}`)
  console.log(`  Already sync : ${skipped}`)
  console.log(`  To delete    : ${toDelete.length}\n`)

  if (toUpload.length === 0 && toDelete.length === 0) {
    console.log("✅  Already in sync — nothing to do.\n")
    return
  }

  const summary: SyncSummary = {
    uploaded: 0,
    skipped,
    deleted: 0,
    uploadFailed: 0,
    deleteFailed: 0,
  }

  // --- Step 4: Upload missing files ---
  if (!opts.noUpload && toUpload.length > 0) {
    console.log("↑  Uploading missing files...")

    for (let i = 0; i < toUpload.length; i += BATCH_SIZE) {
      const batch = toUpload.slice(i, i + BATCH_SIZE)
      const results = await Promise.all(
        batch.map(({ filePath, publicId }) => uploadFile(filePath, publicId, opts.dryRun))
      )
      for (const status of results) {
        if (status === "uploaded") summary.uploaded++
        else summary.uploadFailed++
      }
    }

    console.log()
  }

  // --- Step 5: Delete orphaned Cloudinary assets ---
  if (!opts.noDelete && toDelete.length > 0) {
    console.log("🗑  Deleting orphaned Cloudinary assets...")

    for (const publicId of toDelete) {
      // Pass the local filePath if we know it (for resource_type detection); orphans won't have one
      const filePath = localPublicIds.get(publicId)
      const status = await deleteAsset(publicId, filePath, opts.dryRun)
      if (status === "deleted") summary.deleted++
      else summary.deleteFailed++
    }

    console.log()
  }

  // --- Summary ---
  console.log("─────────────────────────────────────────")
  console.log(`  Project        : ${projectSlug}`)
  console.log(`  Uploaded       : ${summary.uploaded}`)
  console.log(`  Already synced : ${summary.skipped}`)
  console.log(`  Deleted        : ${summary.deleted}`)
  if (summary.uploadFailed > 0) console.log(`  Upload failed  : ${summary.uploadFailed}`)
  if (summary.deleteFailed > 0) console.log(`  Delete failed  : ${summary.deleteFailed}`)
  console.log("─────────────────────────────────────────\n")

  if (summary.uploadFailed > 0 || summary.deleteFailed > 0) process.exit(1)
}

main()

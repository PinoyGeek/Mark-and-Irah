const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const PROJECT_PREFIX = "wedding-projects/mark-and-irah"

/**
 * Converts a local public path to a Cloudinary public ID, scoped to this
 * project's folder so it never collides with other wedding projects.
 * "/mobile-background/couple (1).webp"
 *   → "wedding-projects/Mark-and-Irah/mobile-background/couple (1)"
 */
function toPublicId(src: string): string {
  // Already a full Cloudinary public ID (e.g. passed directly from upload output)
  if (src.startsWith(PROJECT_PREFIX)) return src

  const relative = src
    .replace(/^\//, "")       // strip leading slash
    .replace(/\.[^/.]+$/, "") // strip file extension

  return `${PROJECT_PREFIX}/${relative}`
}

/**
 * Custom Next.js Image loader for Cloudinary.
 * Used as `loader={cloudinaryLoader}` on <Image> components.
 * Automatically applies f_auto + q_auto + responsive width.
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  const publicId = toPublicId(src)
  const q = quality ?? "auto"
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_${q},w_${width}/${publicId}`
}

interface CloudinaryUrlOptions {
  width?: number
  height?: number
  quality?: string | number
  crop?: "fill" | "fit" | "scale" | "crop" | "pad"
  gravity?: string
}

/**
 * Generates a Cloudinary optimized URL.
 * Accepts local paths (e.g. "/mobile-background/couple (1).webp") or Cloudinary public IDs.
 * Falls back to the original src if NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set.
 *
 * Usage in plain <img> tags or CSS background-image:
 *   src={getCloudinaryUrl("/mobile-background/couple (1).webp", { width: 800 })}
 */
export function getCloudinaryUrl(
  src: string,
  options: CloudinaryUrlOptions = {}
): string {
  if (!CLOUD_NAME) return src
  if (src.startsWith("https://") || src.startsWith("http://")) return src

  const publicId = toPublicId(src)
  const { width, height, quality = "auto", crop, gravity } = options

  const transforms: string[] = ["f_auto", `q_${quality}`]
  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if ((width || height) && crop) transforms.push(`c_${crop}`)
  if (gravity) transforms.push(`g_${gravity}`)

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`
}

interface CloudinaryVideoUrlOptions {
  quality?: string | number
  width?: number
  /** Cloudinary video codec — defaults to "auto" for adaptive format selection */
  codec?: string
}

/**
 * Generates a Cloudinary optimized video URL using /video/upload/.
 * Accepts local public paths (e.g. "/assets/askingParents/video.mp4") or
 * full Cloudinary public IDs. Falls back to the original src when
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set (local dev without credentials).
 *
 * Usage in <video> / <source> tags:
 *   <source src={getCloudinaryVideoUrl("/assets/askingParents/asking courtship permission.mp4")} type="video/mp4" />
 */
export function getCloudinaryVideoUrl(
  src: string,
  options: CloudinaryVideoUrlOptions = {}
): string {
  if (!CLOUD_NAME) return src
  if (src.startsWith("https://") || src.startsWith("http://")) return src

  const publicId = toPublicId(src)
  const { quality = "auto", width, codec = "auto" } = options

  const transforms: string[] = [`q_${quality}`, `vc_${codec}`]
  if (width) transforms.push(`w_${width}`)

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms.join(",")}/${publicId}`
}

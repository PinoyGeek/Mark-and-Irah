import fs from "fs/promises"
import path from "path"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956]">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FFE5E4]">
            Gallery
          </h1>
          <p className="mt-3 text-[#FFE5E4]/90">A collection from our favorite moments</p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#FFE5E4]/80">
            <p>No images found. Add files to <code className="px-1 py-0.5 bg-white/10 rounded">public/desktop-background</code> or <code className="px-1 py-0.5 bg-white/10 rounded">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}
      </section>
    </main>
  )
}



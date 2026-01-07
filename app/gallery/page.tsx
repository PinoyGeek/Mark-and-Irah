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
      .sort((a, b) => {
        // Extract numeric part from filename for proper numerical sorting
        const numA = parseInt(a.match(/\/(\d+)\./)?.[1] || "0", 10)
        const numB = parseInt(b.match(/\/(\d+)\./)?.[1] || "0", 10)
        return numA - numB
      })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const galleryImages = await getImagesFrom("images/Gallery")
  const images = galleryImages.map((src) => ({ src, category: "gallery" as const }))

  return (
    <main className="min-h-screen bg-[#51080F] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/Details/newBackground.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Overlay with #751A23 */}
        <div className="absolute inset-0 bg-[#751A23]/40" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#751A23]/60" />
            <div className="w-1.5 h-1.5 bg-[#A58169]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E1C49C]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#751A23]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#751A23]/60" />
          </div>
          
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#E1C49C] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
          >
            Our Love Story Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#E1C49C]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            Every photograph tells a story of Daniel & Florence's journey to forever
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#A58169]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E1C49C]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#751A23]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#E1C49C]/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#751A23]/80 rounded border border-[#751A23]/30 text-[#E1C49C]">
                public/images/Gallery
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}


      </section>
    </main>
  )
}



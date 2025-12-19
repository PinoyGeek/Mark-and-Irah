import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"

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
  const { groomNickname, brideNickname } = siteConfig.couple
  const galleryHashtag = `#${groomNickname.replace(/\s+/g, "")}And${brideNickname.replace(/\s+/g, "")}Wedding`

  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-[#D2A4A4] relative overflow-hidden">
      {/* Enhanced background elements with warm blush spring motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with blush + champagne palette */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#D3B9A2]/90 via-[#D2A4A4]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#D3B9A2]/95 via-[#D2A4A4]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.3),transparent_55%)] opacity-90" />
        
        {/* Floating decorative circles with motif colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#E0B4B1]/26 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute top-20 right-16 w-24 h-24 bg-[#F7E6CA]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-16 left-20 w-28 h-28 bg-[#F0F0EE]/22 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-24 right-12 w-20 h-20 bg-[#E9D5C3]/26 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D2A4A4]/24 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E9D5C3]/40 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#F7E6CA]/60" />
            <div className="w-1.5 h-1.5 bg-[#E9D5C3]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F0F0EE]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E0B4B1]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#F7E6CA]/60" />
          </div>
          
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg"
            style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
          >
            Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            Treasured memories from our journey together
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#E9D5C3]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F0F0EE]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E0B4B1]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-white/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#660033]/80 rounded border border-[#FDECEF]/30 text-white">
                public/desktop-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-[#660033]/80 rounded border border-[#FDECEF]/30 text-white">
                public/mobile-background
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



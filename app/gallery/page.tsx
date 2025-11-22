import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"
import { GalleryQRSection } from "@/components/gallery-qr-section"

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
    <main className="min-h-screen bg-[#DDD3CC] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#EDD6AC]/20 via-[#EDD6AC]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#B28383]/20 via-[#B28383]/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#C2D3C3]/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#A78256]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#B28383]/10 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-10">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/30" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383] rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C2D3C3] rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383] rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/30" />
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#A78256] mb-2 sm:mb-3 drop-shadow-md">
            Gallery
          </h1>
          <p className="mt-2 sm:mt-3 text-[#B28383] font-lora font-light text-xs sm:text-sm md:text-base lg:text-lg px-2">A collection from our favorite moments</p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383] rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C2D3C3] rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383] rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#B28383]">
            <p>No images found. Add files to <code className="px-2 py-1 bg-[#EDD6AC]/40 rounded border border-[#A78256]/30 text-[#A78256]">public/desktop-background</code> or <code className="px-2 py-1 bg-[#EDD6AC]/40 rounded border border-[#A78256]/30 text-[#A78256]">public/mobile-background</code>.</p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* Google Drive QR Section */}
        <GalleryQRSection />

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="bg-[#EDD6AC]/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#A78256]/30 max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Corner accents - hidden on mobile */}
            <div className="relative">
              <div className="hidden sm:block absolute -top-7 -left-7 w-4 h-4 border-t-2 border-l-2 border-[#A78256] rounded-tl-lg" />
              <div className="hidden sm:block absolute -top-7 -right-7 w-4 h-4 border-t-2 border-r-2 border-[#A78256] rounded-tr-lg" />
              <div className="hidden sm:block absolute -bottom-7 -left-7 w-4 h-4 border-b-2 border-l-2 border-[#A78256] rounded-bl-lg" />
              <div className="hidden sm:block absolute -bottom-7 -right-7 w-4 h-4 border-b-2 border-r-2 border-[#A78256] rounded-br-lg" />
              
              <h2 className="font-playfair text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#A78256] mb-2 sm:mb-4">
                Share Your Moments
              </h2>
              <p className="text-[#B28383] font-lora font-light text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Use our wedding hashtags to share your photos and be featured in our gallery!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#C2D3C3]/30 border-2 border-[#C2D3C3]/40 rounded-full text-[#A78256] font-lora font-semibold text-xs sm:text-sm md:text-base shadow-md">
                  #TheBigBANGWedding
                </span>
              </div>
              <Link
                href="/#snap-share"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#C2D3C3] to-[#B28383] text-white font-semibold text-xs sm:text-sm md:text-base rounded-full hover:from-[#C2D3C3]/90 hover:to-[#B28383]/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-lora"
              >
                Learn More About Sharing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}



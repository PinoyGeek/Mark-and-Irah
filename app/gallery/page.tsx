import fs from "fs/promises"
import path from "path"
import Image from "next/image"
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
  const mobileImages = await getImagesFrom("mobile-background")
  const desktopImages = await getImagesFrom("desktop-background")
  const allImages = [...mobileImages, ...desktopImages]
  const images = allImages.map((src) => {
    const category = src.includes("mobile-background") ? "mobile" as const : "desktop" as const
    return { src, category }
  })

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, #F3D1C8, #FAB1AA)",
        }}
      />
      
      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] opacity-80 scale-y-[-1]"
          priority={false}
        />
      </div>
      
      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] opacity-80 scale-x-[-1] scale-y-[-1]"
          priority={false}
        />
      </div>
      
      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] opacity-80"
          priority={false}
        />
      </div>
      
      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] opacity-80 scale-x-[-1]"
          priority={false}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8B3036]/60" />
            <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#8B3036]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8B3036]/60" />
          </div>
          
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#8B3036] mb-2 sm:mb-3 md:mb-4"
          >
            Our Love Story Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#8B3036]/95 font-light max-w-xl mx-auto leading-relaxed px-2">
            Every photograph tells a story of Daniel & Florence's journey to forever
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#8B3036]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#8B3036]/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#8B3036]/80 rounded border border-[#8B3036]/30 text-[#8B3036]">
                public/mobile-background or public/desktop-background
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



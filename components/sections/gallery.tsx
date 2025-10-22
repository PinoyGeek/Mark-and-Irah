"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Section } from "@/components/section"
import CircularGallery from "@/components/circular-gallery"

const galleryItems = [
  { image: "/Couple_img/couple_1.png", text: "First Dance" },   
  { image: "/Couple_img/couple_2.png", text: "Ceremony Moment" },
  { image: "/Couple_img/couple_3.png", text: "Bride & Groom" },
  { image: "/Couple_img/couple_4.png", text: "Reception Joy" },
  { image: "/Couple_img/couple_5.png", text: "Celebration" },
  { image: "/Couple_img/couple_6.png", text: "Forever Starts" },
  { image: "/Couple_img/couple_7.png", text: "Forever Starts" },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  return (
    <Section id="gallery" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#9CAF88] via-[#9CAF88] to-[#8a9a73]">
      {/* Custom larger title */}
      <div className="relative z-10 text-center mb-16 md:mb-20">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
          Our Moments
        </h2>
        <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
          Capturing the beauty of our journey together
        </p>
      </div>

      {/* Gallery content */}
      <div className="relative z-10 w-full space-y-8">
        <div className="w-full bg-gradient-to-br from-[#593163]/95 via-[#6a4c7a]/95 to-[#4a2450]/95 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#9CAF88]/30 backdrop-blur-sm">
          <div className="h-80 sm:h-96 md:h-[500px] lg:h-[600px] w-full relative">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              font="bold 48px Figtree"
            />
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="inline-block bg-[#9CAF88] backdrop-blur-md px-6 py-3 rounded-full border border-[#9CAF88]/40">
            <p className="text-sm sm:text-base font-medium text-white tracking-wide">
              Scroll or drag to explore our beautiful moments 
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.text}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import CircularGallery from "@/components/circular-gallery"

const galleryItems = [
  { image: "/Couple_img/couple (1).JPG", text: "First Dance" },   
  { image: "/Couple_img/couple (2).JPG", text: "Ceremony Moment" },
  { image: "/Couple_img/couple (3).JPG", text: "Bride & Groom" },
  { image: "/Couple_img/couple (4).JPG", text: "Reception Joy" },
  { image: "/Couple_img/couple (5).JPG", text: "Celebration" },
  { image: "/Couple_img/couple (6).JPG", text: "Forever Starts" },
  { image: "/Couple_img/couple (7).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (8).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (9).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (10).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (11).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (12).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (13).JPG", text: "Love Blooms" },
  { image: "/Couple_img/couple (14).JPG", text: "Love Blooms" },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  return (
    <Section
      id="gallery"
      className="relative bg-gradient-to-b from-[#525E2C] via-[#909E8D] to-[#525E2C] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Floating geometric shapes with color palette - hidden on small screens */}
        <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-[#D1AB6D]/10 rounded-full blur-xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-16 h-16 bg-[#E0CFB5]/15 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="hidden sm:block absolute bottom-20 left-20 w-24 h-24 bg-[#D1AB6D]/8 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="hidden sm:block absolute bottom-10 right-10 w-12 h-12 bg-[#E0CFB5]/12 rounded-full blur-lg animate-pulse delay-500" />
        
        {/* Smaller mobile decorative elements */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#D1AB6D]/8 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#E0CFB5]/10 rounded-full blur-md animate-pulse delay-1000" />
        
        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E0CFB5]/25 to-transparent" />
        
        {/* Corner decorative elements with color palette - reduced on mobile */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-tl-3xl" />
      </div>

      {/* Custom larger title */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/60 to-[#D1AB6D]/30" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#D1AB6D] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#E0CFB5] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#D1AB6D] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D]/60 to-[#D1AB6D]/30" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-[#E0CFB5] mb-4 sm:mb-6 text-balance drop-shadow-lg relative px-2">
          <span className="relative z-10">Our Moments</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#D1AB6D]/20 blur-2xl -z-10">Our Moments</span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-[#F0F0F0] font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Every moment, a treasured memory made eternal
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#E0CFB5]/40 to-[#E0CFB5]/20" />
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#E0CFB5] rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#E0CFB5]/40 to-[#E0CFB5]/20" />
        </div>
      </div>

      {/* Gallery content */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="flex justify-center px-2 sm:px-4">
          <div className="max-w-6xl w-full">
            {/* Enhanced gallery container */}
            <div className="relative">
              {/* Multiple layered glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D1AB6D]/20 via-[#E0CFB5]/15 to-[#D1AB6D]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-[#D1AB6D]/30 via-[#E0CFB5]/20 to-[#D1AB6D]/30 rounded-3xl blur-md opacity-50 animate-pulse" />

              {/* Enhanced decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#D1AB6D] via-[#E0CFB5] to-[#D1AB6D] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#D1AB6D] via-[#E0CFB5] to-[#D1AB6D] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#D1AB6D] via-[#E0CFB5] to-[#D1AB6D] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#D1AB6D] via-[#E0CFB5] to-[#D1AB6D] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main gallery card with enhanced multi-layer styling */}
              <div className="relative bg-gradient-to-br from-[#525E2C]/95 via-[#525E2C]/95 to-[#3d461d]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-7 lg:p-9 border-2 border-[#D1AB6D]/60 shadow-[0_8px_32px_rgba(82,94,44,0.3),0_0_0_1px_rgba(209,171,109,0.2)]">
                
                {/* Inner decorative border with gradient */}
                <div className="absolute inset-1 sm:inset-2 border border-[#D1AB6D]/40 rounded-xl sm:rounded-2xl" />
                
                {/* Additional inner glow */}
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#D1AB6D]/10 to-transparent rounded-xl sm:rounded-2xl" />
                
                {/* Gallery content */}
                <div className="relative z-10 h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-[#D1AB6D]/30 border-t-[#D1AB6D] rounded-full animate-spin" />
                    </div>
                  ) : (
                    <CircularGallery
                      items={galleryItems}
                      bend={3}
                      textColor="#E0CFB5"
                      borderRadius={0.05}
                      scrollEase={0.02}
                      font="bold 48px Figtree"
                    />
                  )}
                </div>
                
                {/* Enhanced decorative sparkle effects */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#D1AB6D] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#909E8D] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#E0CFB5] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Image counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 z-20 bg-[#D1AB6D]/20 backdrop-blur-md rounded-full px-4 py-2 border border-[#D1AB6D]/40">
              <span className="text-sm sm:text-base font-semibold text-[#E0CFB5]">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Close lightbox"
            >
              <X size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8 text-white" />
            </button>

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center mt-12 sm:mt-16 mb-16 sm:mb-20">
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.text}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image description */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 bg-[#D1AB6D]/20 backdrop-blur-md rounded-full px-4 py-2 border border-[#D1AB6D]/40">
              <p className="text-sm sm:text-base font-medium text-[#E0CFB5] text-center">
                {selectedImage.text}
              </p>
            </div>

            {/* Mobile swipe hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden text-white/50 text-xs">
              Swipe to navigate
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

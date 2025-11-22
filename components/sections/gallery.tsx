"use client"

import { useState, useEffect, useCallback } from "react"
import NextImage from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
// Removed circular gallery in favor of a responsive masonry layout

const galleryItems = [
  { image: "/mobile-background/couple (1).JPEG", text: " " },   
  { image: "/mobile-background/couple (1).JPG", text: " " },
  { image: "/mobile-background/couple (2).JPEG", text: " " },
  { image: "/mobile-background/couple (2).JPG", text: " " },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

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

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      if (typeof window !== "undefined") {
        const nextImg = new window.Image()
        nextImg.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
        const prevImg = new window.Image()
        prevImg.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
      }
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <Section
      id="gallery"
      className="relative bg-[#DDD3CC] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EDD6AC]/25 via-[#DDD3CC]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B28383]/25 via-[#DDD3CC]/10 to-transparent" />

        {/* Floating decorative circles */}
        <div className="absolute top-6 left-8 w-32 h-32 bg-[#C2D3C3]/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-16 right-12 w-24 h-24 bg-[#A78256]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-16 w-28 h-28 bg-[#B28383]/18 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#EDD6AC]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 z-0">
          <NextImage
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-32 sm:w-44 md:w-56 lg:w-72 xl:w-80 h-auto opacity-70 scale-x-[-1]"
            priority={false}
          />
        </div>
        <div className="absolute top-0 right-0 z-0">
          <NextImage
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-32 sm:w-44 md:w-56 lg:w-72 xl:w-80 h-auto opacity-70"
            priority={false}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-0">
          <NextImage
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-32 sm:w-44 md:w-56 lg:w-72 xl:w-80 h-auto opacity-70 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0">
          <NextImage
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-32 sm:w-44 md:w-56 lg:w-72 xl:w-80 h-auto opacity-70 scale-y-[-1]"
            priority={false}
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#A78256] mb-3 sm:mb-4 drop-shadow-md">
          Our Moments
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#B28383] font-light max-w-xl mx-auto leading-relaxed">
          Every moment, a treasured memory made eternal
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#A78256]/50 to-[#B28383]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#A78256]/60" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#A78256]/50 to-[#B28383]/30" />
        </div>
      </div>

      {/* Gallery content */}
      <div className="relative z-10 w-full">
        <div className="flex justify-center px-4 sm:px-5 md:px-6">
          <div className="max-w-5xl w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 sm:h-60 md:h-72">
                <div className="w-10 h-10 border-[3px] border-[#EDD6AC]/40 border-t-[#A78256] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4.5">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#EDD6AC]/40 backdrop-blur-sm border border-[#C2D3C3]/40 shadow-lg hover:shadow-xl hover:border-[#A78256]/60 transition-all duration-300"
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                  >
                    {/* Subtle glow on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A78256]/25 to-[#B28383]/15 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    
                    <div className="relative aspect-[3/4] md:aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#A78256]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Image counter badge */}
                    <div className="absolute top-2 right-2 bg-[#B28383]/80 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
                      <span className="text-xs font-medium text-white tracking-wide">
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
              {/* Image counter */}
              <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-[#F1EDE2]/40">
                <span className="text-sm sm:text-base font-medium text-[#F1EDE2]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-200 border border-white/20 hover:border-white/40"
                aria-label="Close lightbox"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{ 
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`, 
                    transition: pinchStartDist ? 'none' : 'transform 200ms ease-out' 
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl will-change-transform"
                />
                
                {/* Zoom reset button */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* View more button */}
      <div className="relative z-10 mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
        <a
          href="/gallery"
          className="group inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
          style={{
            backgroundColor: "#A78256",
            borderColor: "rgba(237, 214, 172, 0.8)",
            color: "#FFF8F2",
            boxShadow: "0 4px 20px rgba(167, 130, 86, 0.35), 0 2px 6px rgba(0,0,0,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(167, 130, 86, 0.95)";
            e.currentTarget.style.borderColor = "rgba(237, 214, 172, 1)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(167, 130, 86, 0.5), 0 4px 12px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#A78256";
            e.currentTarget.style.borderColor = "rgba(237, 214, 172, 0.8)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(167, 130, 86, 0.35), 0 2px 6px rgba(0,0,0,0.25)";
          }}
        >
          <span className="relative z-10">View Full Gallery</span>
          <ChevronRight size={16} className="sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EDD6AC]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
          />
        </a>
      </div>
    </Section>
  )
}

"use client"

import { useEffect, useState, useMemo } from "react"
import { Heart, Sparkles, Download } from "lucide-react"

const desktopImages = [
    "/desktop-background/couple (1).JPEG",
    "/desktop-background/couple (1).JPG",
    "/desktop-background/couple (2).JPEG",
    "/desktop-background/couple (2).JPG",
    "/desktop-background/couple (3).JPEG",
    "/desktop-background/couple (3).JPG",
    "/desktop-background/couple (4).JPEG",
    "/desktop-background/couple (4).JPG",
    "/desktop-background/couple (5).JPEG",
    "/desktop-background/couple (5).JPG",
    "/desktop-background/couple (6).JPEG",
    "/desktop-background/couple (6).JPG",
    "/desktop-background/couple (7).JPEG",
    "/desktop-background/couple (7).JPG",
    "/desktop-background/couple (8).JPEG",
    "/desktop-background/couple (8).JPG",
    "/desktop-background/couple (9).JPEG",
    "/desktop-background/couple (9).JPG",
    "/desktop-background/couple (10).JPG",
    "/desktop-background/couple (11).JPG",
    "/desktop-background/couple (12).JPG",


]

const mobileImages = [
    "/mobile-background/couple (1).JPEG",
    "/mobile-background/couple (1).JPG",
    "/mobile-background/couple (2).JPG",
    "/mobile-background/couple (2).JPEG",
    "/mobile-background/couple (3).JPEG",
    "/mobile-background/couple (3).JPG",
    "/mobile-background/couple (4).JPEG",
    "/mobile-background/couple (4).JPG",
    "/mobile-background/couple (5).JPEG",
    "/mobile-background/couple (5).JPG",
    "/mobile-background/couple (6).JPEG",
    "/mobile-background/couple (6).JPG",
    "/mobile-background/couple (7).JPEG",
    "/mobile-background/couple (7).JPG",
    "/mobile-background/couple (8).JPEG",
    "/mobile-background/couple (8).JPG",
    "/mobile-background/couple (9).JPEG",
    "/mobile-background/couple (9).JPG",
    "/mobile-background/couple (10).JPEG",
    "/mobile-background/couple (10).JPG",
    "/mobile-background/couple (11).JPEG",
    "/mobile-background/couple (11).JPG",
    "/mobile-background/couple (12).JPG",
    "/mobile-background/couple (13).JPG",
    "/mobile-background/couple (14).JPG",
    "/mobile-background/couple (15).JPG",
    "/mobile-background/couple (16).JPG",
    "/mobile-background/couple (17).JPG",
    "/mobile-background/couple (18).JPG",
    "/mobile-background/couple (19).JPG",
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    // Check on mount
    checkScreenSize()
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get the appropriate image array based on screen size
  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  // Preload images progressively - show first image immediately
  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    
    // Load first image with priority to show it immediately
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true) // Show first image immediately
    }
    
    // Then preload a small lookahead set in background (avoid preloading all)
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'lazy' as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#AFC8E6]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Enhanced gradient overlay with better depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#B28383]/65 via-[#DDD3CC]/35 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a2f24]/55 via-[#35211a]/35 to-transparent z-0" />
      </div>

      <div className="relative z-10 flex w-full items-end justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 pt-24 pb-10 sm:pt-32 sm:pb-16 md:pb-20 lg:pb-24 min-h-screen">
        <div
          className={`relative w-full max-w-[420px] sm:max-w-3xl lg:max-w-5xl px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Intro copy */}
            <div className="space-y-0.5 md:space-y-1 text-[#F4E8DD]" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.18em] uppercase">
                BY THE GRACE OF GOD
              </p>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.18em] uppercase">
                AND THE BLESSING OF THEIR PARENTS
              </p>
            </div>

            {/* Divider with icons */}
            <div className="flex items-center justify-center gap-2 md:gap-3 text-[#F7EFDF]" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.45)" }}>
              <span className="h-px w-10 md:w-14 lg:w-16 bg-gradient-to-r from-transparent via-[#EDD6AC] to-[#EDD6AC]/60" />
              <Heart size={12} className="text-[#EDD6AC] fill-[#EDD6AC]/30 md:w-4 md:h-4" />
              <Sparkles size={11} className="text-[#EDD6AC] md:w-3.5 md:h-3.5" />
              <Heart size={12} className="text-[#EDD6AC] fill-[#EDD6AC]/30 md:w-4 md:h-4" />
              <span className="h-px w-10 md:w-14 lg:w-16 bg-gradient-to-l from-transparent via-[#EDD6AC] to-[#EDD6AC]/60" />
            </div>

            {/* Names */}
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
              <h1
                className="font-serif text-[2.75rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem] text-[#F7EDE0] leading-tight"
                style={{
                  textShadow:
                    "0 12px 26px rgba(0,0,0,0.45)",
                }}
              >
                Joshua Jose
              </h1>
              <span className="text-[11px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.22em] md:tracking-[0.28em] lg:tracking-[0.35em] text-[#EDD6AC]" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
                and
              </span>
              <h2
                className="font-serif text-[2.75rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem] text-[#F7EDE0] leading-tight"
                style={{
                  textShadow:
                    "0 12px 26px rgba(0,0,0,0.45)",
                }}
              >
                Edlin Mae
              </h2>
            </div>

            {/* Invitation message */}
            <p className="text-[10px] sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] text-[#F5EDE3] max-w-3xl" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
              WARMLY INVITE YOU TO CELEBRATE THEIR LOVE
            </p>
            <p className="text-[9px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.12em] md:tracking-[0.18em] lg:tracking-[0.22em] text-[#F5EDE3]" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
              EXCHANGE VOWS OF MARRIAGE
            </p>

            {/* Date & venue summary */}
            <div className="space-y-1 md:space-y-1.5 lg:space-y-2 text-[#F4EDE3] mt-2 md:mt-3 lg:mt-4" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
              <p className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.18em] uppercase">
                Monday • December 22, 2025
              </p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg tracking-[0.12em] md:tracking-[0.16em] lg:tracking-[0.2em] uppercase text-[#F4EDE3]">
                Ceremony at 3:00 PM · St. Gregory the Great Cathedral
              </p>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base tracking-[0.1em] md:tracking-[0.14em] lg:tracking-[0.18em] uppercase text-[#F4EDE3]">
                Old Albay District · Legazpi City
              </p>
            </div>

            {/* Reception */}
            <div className="space-y-1 md:space-y-1.5 text-[#F4EDE3]" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
              <p className="text-xs sm:text-base md:text-lg lg:text-xl font-serif italic">
                Reception to follow at Pepperland Hotel
              </p>
              <p className="text-[9px] sm:text-xs md:text-sm lg:text-base tracking-[0.12em] md:tracking-[0.16em] lg:tracking-[0.2em] uppercase text-[#F4EDE3]">
                Airport Road, Washington Drive Ext. · Brgy 40 Cruzada, Legazpi City
              </p>
            </div>

            {/* CTA Buttons & download */}
            <div className="mt-4 md:mt-6 lg:mt-8 flex w-full flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <a
                href="#narrative"
                className="group flex-1 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] rounded-full border border-[#F5EDE3]/40 bg-[#B28383]/30 px-4 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.12em] md:tracking-[0.16em] lg:tracking-[0.2em] text-[#FDF6EE] backdrop-blur-sm transition-all duration-300 hover:bg-[#B28383]/40"
              >
                <span className="flex items-center justify-center">
                  Our Story
                </span>
              </a>
              <a
                href="#guest-list"
                className="group flex-1 min-w-[140px] md:min-w-[160px] lg:min-w-[180px] rounded-full border border-[#F5EDE3]/40 bg-[#A78256]/30 px-4 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.12em] md:tracking-[0.16em] lg:tracking-[0.2em] text-[#FDF6EE] backdrop-blur-sm transition-all duration-300 hover:bg-[#A78256]/40"
              >
                <span className="flex items-center justify-center">
                  RSVP
                </span>
              </a>
              <a
                href="/Details/Wedding-Invitation%20(8).pdf"
                download="Wedding-Invitation.pdf"
                className="group flex-none rounded-full border border-[#F5EDE3]/40 bg-[#C2D3C3]/25 px-3.5 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 text-[11px] md:text-xs lg:text-sm uppercase tracking-[0.15em] md:tracking-[0.18em] lg:tracking-[0.22em] text-[#FDF6EE] backdrop-blur-sm transition-all duration-300 hover:bg-[#C2D3C3]/35"
              >
                <span className="flex items-center justify-center gap-1.5 md:gap-2">
                  <Download size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  <span className="sr-only sm:hidden">Download Invitation</span>
                  <span className="hidden sm:inline">Download Invitation</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

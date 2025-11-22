"use client"

import { useEffect, useState, useMemo } from "react"

const desktopImages = [
    "/desktop-background/couple (1).jpeg",
    "/desktop-background/couple (2).jpeg",
    "/desktop-background/couple (3).jpeg",
    "/desktop-background/couple (4).jpeg",
    "/desktop-background/couple (5).jpeg",
    "/desktop-background/couple (6).jpeg",
    "/desktop-background/couple (7).jpeg",
    "/desktop-background/couple (8).jpeg",
    "/desktop-background/couple (9).jpeg",
    "/desktop-background/couple (10).jpeg",
    "/desktop-background/couple (11).jpeg",
    "/desktop-background/couple (12).jpeg",
    "/desktop-background/couple (13).jpeg",
    "/desktop-background/couple (14).jpeg",
]

const mobileImages = [
    "/mobile-background/couple (1).jpeg",
    "/mobile-background/couple (2).jpeg",
    "/mobile-background/couple (3).jpeg",
    "/mobile-background/couple (4).jpeg",
    "/mobile-background/couple (5).jpeg",
    "/mobile-background/couple (6).jpeg",
    "/mobile-background/couple (7).jpeg",
    "/mobile-background/couple (8).jpeg",
    "/mobile-background/couple (9).jpeg",
    "/mobile-background/couple (10).jpeg",
    "/mobile-background/couple (11).jpeg",
    "/mobile-background/couple (12).jpeg",
    "/mobile-background/couple (13).jpeg",
    "/mobile-background/couple (14).jpeg",
    "/mobile-background/couple (15).jpeg",
    "/mobile-background/couple (16).jpeg",
    "/mobile-background/couple (17).jpeg",
    "/mobile-background/couple (18).jpeg",
    "/mobile-background/couple (19).jpeg",
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFAEF]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff1e0] via-[#fff1e0]/40 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center justify-end min-h-screen pb-16 sm:pb-24 md:pb-32 lg:pb-48">
        <div className="max-w-2xl text-center space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold tracking-wide drop-shadow-2xl whitespace-nowrap"
              style={{
                color: '#FFFAEF',
                textShadow: "0 0 20px rgba(255, 250, 239, 0.8), 0 0 40px rgba(252, 184, 181, 0.3), 0 8px 24px rgba(0,0,0,0.8)",
                letterSpacing: "0.05em",
              }}
            >
              Julaine
            </h1>
            <div className="h-1 w-16 sm:w-20 md:w-24 mx-auto bg-gradient-to-r from-transparent via-[#FFFAEF] to-transparent" />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold tracking-wide drop-shadow-2xl whitespace-nowrap"
              style={{
                color: '#FFFAEF',
                textShadow: "0 0 20px rgba(255, 250, 239, 0.8), 0 0 40px rgba(252, 184, 181, 0.3), 0 8px 24px rgba(0,0,0,0.8)",
                letterSpacing: "0.05em",
              }}
            >
              Cristopher
            </h1>
          </div>
          <p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lavishly-yours-regular"
            style={{
              color: '#FFFAEF',
              textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            are getting married!
          </p>
          <div className="space-y-1 sm:space-y-2">
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light"
              style={{
                color: '#FFFAEF',
                textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              December 28, 2025 - 3:00 PM
            </p>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide"
              style={{
                color: '#FFFAEF',
                textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              MOUNT COSTA
            </p>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg font-light"
              style={{
                color: '#FFFAEF',
                textShadow: "0 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Lamtang Road, Pugis, La Trinidad, Benguet
            </p>
          </div>
          <div className="pt-4 sm:pt-6 flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#guest-list"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-[#FFFAEF]/60"
              style={{
                backgroundColor: "rgba(164, 187, 140, 0.95)",
                color: '#FFFAEF',
                boxShadow: "0 8px 24px rgba(164, 187, 140, 0.4), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#A4BB8C";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(164, 187, 140, 0.6), 0 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(164, 187, 140, 0.95)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(164, 187, 140, 0.4), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">RSVP</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
            <a
              href="#narrative"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-[#FFFAEF]/60"
              style={{
                backgroundColor: "rgba(252, 184, 181, 0.85)",
                color: '#FFFAEF',
                boxShadow: "0 8px 24px rgba(252, 184, 181, 0.4), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FCB8B5";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(252, 184, 181, 0.6), 0 6px 12px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(252, 184, 181, 0.85)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(252, 184, 181, 0.4), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">Our Story</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

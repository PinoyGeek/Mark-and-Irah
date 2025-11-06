"use client"

import { useEffect, useState, useMemo } from "react"
import { siteConfig } from "@/content/site"

const desktopImages = [
    "/desktop-background/DSCF2444-min.jpg",
    "/desktop-background/DSCF2481-min.jpg",
    "/desktop-background/DSCF2499-min.jpg",
    "/desktop-background/DSCF2578-min.jpg",
    "/desktop-background/DSCF2837-min.jpg",
    "/desktop-background/DSCF3037-min.jpg",
    "/desktop-background/DSCF3072-min.jpg",
    "/desktop-background/DSCF3115-min.jpg",
    "/desktop-background/DSCF3176-min.jpg",
    "/desktop-background/DSCF3232-min.jpg",
    "/desktop-background/DSCF3250-min.jpg",
    "/desktop-background/NLK_3003-min.jpg",
    "/desktop-background/NLK_3147-min.jpg",
    "/desktop-background/NLK_3205-min.jpg",
    "/desktop-background/NLK_3215-min.jpg",
    "/desktop-background/NLK_3217-min.jpg",
    "/desktop-background/NLK_3248-min.jpg",
    "/desktop-background/NLK_3275-min.jpg",
    "/desktop-background/NLK_3302-min.jpg",
    "/desktop-background/NLK_3394-min.jpg",
    "/desktop-background/NLK_3409-min.jpg",
    "/desktop-background/NLK_3429-min.jpg",
    "/desktop-background/NLK_3625-min.jpg",
    "/desktop-background/NLK_3656-min.jpg",
    "/desktop-background/NLK_3677-min.jpg",
    "/desktop-background/NLK_3748-min.jpg",
    "/desktop-background/NLK_3764-min.jpg",
    "/desktop-background/NLK_3833-min.jpg",
    "/desktop-background/NLK_3841-min.jpg",
    "/desktop-background/NLK_3848-min.jpg",
    "/desktop-background/NLK_3880-min.jpg",
    "/desktop-background/NLK_3944-min.jpg",
    "/desktop-background/NLK_4026-min.jpg",
    "/desktop-background/NLK_4041-min.jpg",
    "/desktop-background/NLK_4048-min.jpg",
    "/desktop-background/NLK_4066-min.jpg",
    "/desktop-background/NLK_4093-min.jpg",
    "/desktop-background/NLK_4099-min.jpg",
    "/desktop-background/NLK_4146-min.jpg",
    "/desktop-background/NLK_4183-min.jpg",
    "/desktop-background/NLK_4288-min.jpg",
    "/desktop-background/NLK_4321-min.jpg",
    "/desktop-background/NLK_4349-min.jpg",
    "/desktop-background/NLK_4377-min.jpg",
    "/desktop-background/NLK_4465-min.jpg",
    "/desktop-background/NLK_4627-min.jpg",
]

const mobileImages = [
    "/mobile-background/DSCF2614-min.jpg",
    "/mobile-background/DSCF2678-min.jpg",
    "/mobile-background/DSCF2692-min.jpg",
    "/mobile-background/DSCF2706-min.jpg",
    "/mobile-background/DSCF2919-min.jpg",
    "/mobile-background/DSCF3090-min.jpg",
    "/mobile-background/NLK_3020-min.jpg",
    "/mobile-background/NLK_3066-min.jpg",
    "/mobile-background/NLK_3073-min.jpg",
    "/mobile-background/NLK_3087-min.jpg",
    "/mobile-background/NLK_3113-min.jpg",
    "/mobile-background/NLK_3146-min.jpg",
    "/mobile-background/NLK_3182-min.jpg",
    "/mobile-background/NLK_3328-min.jpg",
    "/mobile-background/NLK_3531-min.jpg",
    "/mobile-background/NLK_3970-min.jpg",
    "/mobile-background/NLK_3974-min.jpg",
    "/mobile-background/NLK_3989-min.jpg",
    "/mobile-background/NLK_4073-min.jpg",
    "/mobile-background/NLK_4081-min.jpg",
    "/mobile-background/NLK_4400-min.jpg",
    "/mobile-background/NLK_4430-min.jpg",
    "/mobile-background/NLK_4484-min.jpg",
    "/mobile-background/NLK_4492-min.jpg",
    "/mobile-background/NLK_4519-min.jpg",
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#666956]">
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
        {/* Corner decorations - bottom corners */
        }
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none z-10"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-75 rotate-180 select-none z-10"
          style={{ transform: 'scaleX(-1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#666956] via-[#666956]/40 to-transparent z-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center justify-end min-h-screen pb-16 sm:pb-24 md:pb-32 lg:pb-48">
        <div className="max-w-2xl text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide drop-shadow-2xl whitespace-nowrap"
              style={{
                color: '#FFE5E4',
                textShadow: "0 0 20px rgba(255, 229, 228, 0.7), 0 0 36px rgba(239, 191, 187, 0.35), 0 8px 24px rgba(102, 105, 86, 0.8)",
                letterSpacing: "0.05em",
                fontFamily: "var(--font-serif)",
              }}
            >
              {siteConfig.couple.brideNickname} & {siteConfig.couple.groomNickname}
            </h1>
            <div className="h-1 w-16 sm:w-20 md:w-24 mx-auto bg-gradient-to-r from-transparent via-[#EFBFBB] to-transparent" />
          </div>

          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-light drop-shadow-2xl italic"
            style={{
              color: '#FFE5E4',
              textShadow: "0 4px 12px rgba(102, 105, 86, 0.7), 0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            {siteConfig.wedding.tagline}
          </p>

          <div className="space-y-2 sm:space-y-3">
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light drop-shadow-2xl"
              style={{
                color: '#FFE5E4',
                textShadow: "0 4px 12px rgba(102, 105, 86, 0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {siteConfig.ceremony.day}, {siteConfig.ceremony.date} - {siteConfig.ceremony.time}
            </p>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl font-light drop-shadow-2xl tracking-wide"
              style={{
                color: '#EFBFBB',
                textShadow: "0 4px 12px rgba(102, 105, 86, 0.7), 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {siteConfig.wedding.venue.toUpperCase()}
            </p>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#narrative"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-[#EFBFBB]/60"
              style={{
                backgroundColor: "rgba(102, 105, 86, 0.95)",
                color: "#FFE5E4",
                boxShadow: "0 8px 24px rgba(102, 105, 86, 0.35), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#8D8E7C";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(141, 142, 124, 0.5), 0 6px 12px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(102, 105, 86, 0.95)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 105, 86, 0.35), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">Our Love Story</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
            <a
              href="#guest-list"
              className="group inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-wider text-sm sm:text-base whitespace-nowrap relative overflow-hidden border-2 border-transparent hover:border-[#FFE5E4]/60"
              style={{
                backgroundColor: "rgba(176, 137, 129, 0.9)",
                color: "#FFE5E4",
                boxShadow: "0 8px 24px rgba(176, 137, 129, 0.35), 0 4px 8px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#B08981";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(176, 137, 129, 0.5), 0 6px 12px rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(176, 137, 129, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(176, 137, 129, 0.35), 0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              <span className="relative z-10">RSVP</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE5E4]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:translate-x-full"
                style={{ width: "50%", left: "-100%" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

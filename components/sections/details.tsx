"use client"

import { Section } from "@/components/section"
import { Shirt, Copy, Check, Navigation, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { siteConfig } from "@/content/site"
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})  

// Champagne Gold + Beige + Soft Brown
// creates a luxury, elegant, and warm aesthetic
const palette = {
  deep: "#4E3B31",            // deep brown
  softBrown: "#8B6F5A",       // soft brown
  background: "#E8DCCB",      // beige background
  champagneGold: "#D6BFA3",   // champagne
  champagneLight: "#F2E4D3",  // light champagne / paper
} as const

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)

  const receptionImages = [
    "/Details/La Vida Resort and Events Center.png",
    "/Details/La Vida Resort and Events Center 2.png"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  const DECO_FILTER = "brightness(0) saturate(100%) invert(18%) sepia(35%) saturate(1200%) hue-rotate(15deg) brightness(92%) contrast(88%)"

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section
      id="details"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-[#E8DCCB]"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background: `linear-gradient(165deg, ${palette.champagneLight} 0%, ${palette.champagneGold}22 35%, ${palette.softBrown}10 70%, ${palette.deep}08 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 15%, ${palette.champagneGold} 0%, transparent 55%)` }}
        />
      </div>

      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-y-[-1]"
          style={{ filter: DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-x-[-1] scale-y-[-1]"
          style={{ filter: DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65"
          style={{ filter: DECO_FILTER }}
        />
      </div>

      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-x-[-1]"
          style={{ filter: DECO_FILTER }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
          <div className="h-px w-16 sm:w-24 bg-[#D6BFA3]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D6BFA3] shadow-[0_0_18px_rgba(214,191,163,0.8)]" />
          <div className="h-px w-16 sm:w-24 bg-[#D6BFA3]/60" />
        </div>
        <h2
          className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4E3B31] mb-3 sm:mb-4 uppercase`}
          style={{
            letterSpacing: "0.16em",
            textShadow: "0 2px 10px rgba(78,59,49,0.25)",
            fontWeight: 600,
          }}
        >
          Event Details
        </h2>
        <p
          className={`${cinzel.className} text-sm sm:text-base md:text-lg text-[#8B6F5A] font-normal max-w-xl mx-auto leading-relaxed tracking-[0.14em] px-4`}
        >
          Everything you need to know about our special day.
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          {/* Subtle champagne glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#D6BFA3]/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative bg-[#F2E4D3] rounded-xl sm:rounded-2xl overflow-hidden border border-[#4E3B31] shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.24)] hover:border-[#4E3B31]/80 transition-all duration-300">
            {/* Venue Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              <Image
                src="/Details/fountain.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay with warm gold accent */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                {/* <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#FFF7F6] mb-1 sm:mb-2 drop-shadow-lg">
                  Ceremony
                </p> */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  {siteConfig.ceremony.location}
                </h3>
                <p className="text-xs sm:text-sm md:text-base ${cinzel.className} text-white/95 drop-shadow-md tracking-wide">
                  {siteConfig.ceremony.venue}
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className="text-[10px] sm:text-xs md:text-sm ${cinzel.className} font-semibold text-[#8B6F5A] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                  {siteConfig.ceremony.day}
                </p>
                
                {/* Month - Script style with warm gold */}
                <div className="mb-2 sm:mb-4">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl ${cinzel.className} text-[#8B6F5A] leading-none">
                    May
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${cinzel.className} font-normal text-[#4E3B31] leading-none elegant-text-shadow">
                    2
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#8B6F5A] via-[#4E3B31] to-[#8B6F5A]" />
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl ${cinzel.className} font-light text-[#4E3B31] leading-none">
                    2026
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-r from-transparent via-[#8B6F5A] to-[#8B6F5A]" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8B6F5A] rounded-full" />
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-l from-transparent via-[#8B6F5A] to-[#8B6F5A]" />
                </div>

                {/* Time */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl ${cinzel.className} font-semibold text-[#4E3B31] tracking-wide">
                  {siteConfig.ceremony.time}
                </p>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-[#F2E4D3]/40 to-[#F5EFE6] rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border-4 border-[#4E3B31]/15">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4E3B31] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#4E3B31] mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#4E3B31] leading-relaxed">
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#8B1E1E]/70 leading-relaxed mt-1">
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#4E3B31]/70 leading-relaxed">
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-[#F2E4D3] p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#4E3B31]/20 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#4E3B31"
                        bgColor="#F2E4D3"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#4E3B31]/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#4E3B31] hover:bg-[#3b2c24] text-[#F5EFE6] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#F5EFE6] border-2 border-[#4E3B31]/30 hover:border-[#4E3B31]/50 hover:bg-[#D6BFA3]/20 text-[#4E3B31] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#4E3B31]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reception Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#D6BFA3]/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative elegant-card bg-[#F2E4D3] rounded-xl sm:rounded-2xl overflow-hidden border-4 border-[#4E3B31]/25 premium-shadow hover:border-[#4E3B31]/45 transition-all duration-300">
       
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              {receptionImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentReceptionImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src="/Details/courtyard.png"
                    alt={siteConfig.reception.venue}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              
          
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#FFF7F6] mb-1 sm:mb-2 drop-shadow-lg">
                  Reception
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  {siteConfig.reception.location}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide">
                  {siteConfig.reception.venue}
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
         
              <div className="text-center mb-5 sm:mb-8">
                {siteConfig.reception.time === "To follow after the ceremony" ? (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#4E3B31] tracking-wide">
                    To follow after the ceremony
                  </p>
                ) : (
                  <>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#8B6F5A] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                      {siteConfig.reception.time === "After ceremony" ? "Starts" : "Starts at"}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#4E3B31] tracking-wide">
                      {siteConfig.reception.time}
                    </p>
                  </>
                )}
              </div>

        
              <div className="bg-gradient-to-br from-[#F2E4D3]/40 to-[#F5EFE6] rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border-4 border-[#4E3B31]/15">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#4E3B31] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#4E3B31] mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#4E3B31] leading-relaxed">
                      {receptionVenueName}
                    </p>
                    {receptionVenueDetail && (
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#4E3B31]/70 leading-relaxed mt-1">
                        {receptionVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#4E3B31]/70 leading-relaxed">
                      {receptionAddress}
                    </p>
                  </div>
              
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="bg-[#F2E4D3] p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#4E3B31]/20 shadow-sm">
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#4E3B31"
                        bgColor="#F2E4D3"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#4E3B31]/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

     
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#4E3B31] hover:bg-[#3b2c24] text-[#F5EFE6] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#F5EFE6] border-2 border-[#4E3B31]/30 hover:border-[#4E3B31]/50 hover:bg-[#D6BFA3]/20 text-[#4E3B31] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#4E3B31]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('reception') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attire Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-10 sm:w-14 md:w-20 bg-[#D6BFA3]/60" />
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#D6BFA3]" />
            <div className="h-px w-10 sm:w-14 md:w-20 bg-[#D6BFA3]/60" />
          </div>
          <h3
            className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-semibold text-[#4E3B31] mb-3 sm:mb-4 uppercase`}
            style={{ letterSpacing: "0.16em", textShadow: "0 2px 10px rgba(78,59,49,0.25)" }}
          >
            Attire Guidelines
          </h3>
          <p
            className={`${cinzel.className} text-sm sm:text-base md:text-lg text-[#8B6F5A] font-normal`}
          >
            Please dress according to the guidelines below.
          </p>
        </div>

        {/* Attire Cards */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {/* Principal Sponsor Attire */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#D6BFA3]/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            
            <div className="relative bg-[#F2E4D3] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 lg:p-9 border border-[#D6BFA3] shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.24)] hover:border-[#4E3B31]/70 transition-all duration-300">
              <h4
                className={`${cinzel.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#4E3B31] mb-4 sm:mb-5 md:mb-6 uppercase tracking-[0.16em] text-center px-2`}
              >
                Guest Attire
              </h4>

              {/* Copy: follow color palette */}
              <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg ${cinzel.className} text-[#4E3B31]/90 font-light leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-xl mx-auto px-3">
                Please follow the color palette below for your outfit.
              </p>

              {/* Principal sponsor attire image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden border border-[#C44569]/30 mb-4 sm:mb-6 md:mb-8">
                <Image
                  src="/Details/628182019_1717633126313475_8834141512576372627_n-removebg-preview.png"
                  alt="Principal sponsor attire — follow the color palette"
                  fill
                  className="object-contain bg-[#FFF7F6]/50 p-2 sm:p-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 672px"
                />
              </div>

              {/* Color palette for principal sponsors */}
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap mb-5 sm:mb-6 md:mb-7 px-2">
                {["#4E3B31", "#8B6F5A", "#D6BFA3", "#E8DCCB", "#F2E4D3"].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full shadow-md border border-white ring-2 ring-[#D6BFA3]/40 hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
              {/* Sponsors Dress Code Text */}
              <div className="text-center pt-3 sm:pt-4 border-t border-[#D6BFA3]/70 px-3 sm:px-4">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#4E3B31] leading-relaxed mb-2">
                  <span className="font-semibold">Dress code:</span> Semi‑formal.
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#8B6F5A] leading-relaxed mb-2">
                  <span className="font-semibold">Palette inspiration:</span> champagne gold, beige, and soft brown tones for a warm, elegant look.
                </p>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-[#8B6F5A] leading-relaxed italic">
                  Kindly avoid jeans. The colors are a guide, so please feel free to choose what feels comfortable and elegant for you.
                </p>
              </div>
            </div>
          </div>

          {/* Guest Attire */}
          {/* <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#F3C66C]/18 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            
            <div className="relative bg-[#FDF6EA] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 lg:p-9 border border-[#E0C5A2] shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.6)] hover:border-[#F3C66C]/80 transition-all duration-300">
              <h4
                className={`${montserrat.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#8B1E1E] mb-4 sm:mb-5 md:mb-6 uppercase tracking-[0.16em] text-center px-2`}
              >
                Guest Attire
              </h4>

              <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#C44569]/90 font-light leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-xl mx-auto px-3">
                Please follow the color palette below for your outfit.
              </p>

        
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden border border-[#C44569]/30 mb-4 sm:mb-6 md:mb-8">
                <Image
                  src="/Details/guest (3).png"
                  alt="Guest attire inspiration — follow the color palette"
                  fill
                  className="object-contain bg-[#FFF7F6]/50 p-2 sm:p-3"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 672px"
                />
              </div>

        
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap mb-5 sm:mb-6 md:mb-7 px-2">
                {["#CBA990", "#EBD3B9", "#F5E1C0"].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full shadow-md border-2 border-white ring-2 ring-[#C44569]/30 hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              
 
              <div className="text-center pt-3 sm:pt-4 border-t border-[#C44569]/20 px-3 sm:px-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] text-[#C44569] leading-relaxed mb-3 sm:mb-4">
                  <span className="font-semibold">Semi-Formal</span>
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Important Reminders Section */}
     
      </div>
    </Section>
  )
}
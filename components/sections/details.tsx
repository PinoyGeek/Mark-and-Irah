"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import {
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  
  // Convert address to title case for display
  const formatAddress = (address: string) => {
    return address
      .split(',')
      .map(part => part.trim().charAt(0).toUpperCase() + part.trim().slice(1).toLowerCase())
      .join(', ')
  }
  
  const ceremonyLocation = siteConfig.ceremony.location
  const receptionLocation = siteConfig.reception.location
  const ceremonyLocationFormatted = formatAddress(ceremonyLocation)
  const receptionLocationFormatted = formatAddress(receptionLocation)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showImageModal) {
        setShowImageModal(null)
      }
    }

    if (showImageModal) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  const openInMaps = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Section
      id="details"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#51080F]"
    >
      {/* Background image - same as gallery */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/Details/newBackground.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Overlay with #751A23 */}
        <div className="absolute inset-0 bg-[#751A23]/40" />
      </div>

      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Ceremony & Reception Details
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
        >
          Details
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          All the important details to help you join us in celebrating our special day
        </p>

        {/* Decorative element below subtitle - matching gallery style */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#751A23]/60" />
          <div className="w-1.5 h-1.5 bg-[#A58169]/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E1C49C]/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#751A23]/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#751A23]/60" />
        </div>
      </div>

      {/* Ceremony & Reception Locations (combined container) */}
      <div className="relative z-10 mb-4 sm:mb-8 max-w-6xl mx-auto px-3 sm:px-5">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#751A23]/40 bg-gradient-to-b shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group hover:scale-[1.01]">
          {/* Combined image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/Details/CasaAntonia.png"
              alt={ceremonyLocationFormatted}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#751A23]/95 via-[#751A23]/65 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-3 sm:px-6 pb-3 sm:pb-6 text-white">
              <p className="style-script-regular text-xl sm:text-2xl md:text-3xl font-normal leading-none drop-shadow-md mb-2">
                Ceremony & Reception
              </p>
            </div>
          </div>

          {/* Details panel - Combined */}
          <div className="bg-[#E1C49C]/95 text-[#51080F] px-3 sm:px-6 py-4 sm:py-6 space-y-4 backdrop-blur-sm">
            {/* Address */}
            <div className="text-left pb-3 border-b border-[#751A23]/30">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase mb-1">
                Location
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#51080F]">
                {ceremonyLocationFormatted}
              </p>
            </div>

            {/* Ceremony Details */}
            <div className="space-y-2.5">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase">
                Ceremony
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-left">
                <div className="rounded-md border border-[#751A23] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase mb-0.5">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#51080F]">{siteConfig.ceremony.date}</p>
                </div>
                <div className="rounded-md border border-[#751A23] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase mb-0.5">
                    Time
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#51080F]">{siteConfig.ceremony.time}</p>
                </div>
              </div>
            </div>

            {/* Reception Details */}
            <div className="space-y-2.5 pt-2 border-t border-[#751A23]/30">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase">
                Reception
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-left">
                <div className="rounded-md border border-[#751A23] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase mb-0.5">
                    Date
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#51080F]">{siteConfig.reception.date}</p>
                </div>
                <div className="rounded-md border border-[#751A23] bg-white/80 px-2.5 py-2 shadow-sm">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#751A23] uppercase mb-0.5">
                    Time
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#51080F]">{siteConfig.reception.time}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-2">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#751A23] text-white py-2.5 sm:py-3 shadow-lg hover:translate-y-[-2px] hover:bg-[#751A23]/90 transition-all text-xs sm:text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(ceremonyLocation, "ceremony-reception")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#751A23]/35 text-[#51080F] py-2.5 sm:py-3 hover:bg-[#751A23]/5 transition-all text-xs sm:text-sm font-semibold"
              >
                {copiedItems.has("ceremony-reception") ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(229, 196, 156, 0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#751A23", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#751A23", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "#751A23", backgroundColor: "#E1C49C" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #751A23, #751A23, #E1C49C)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#E1C49C", borderColor: "#751A23", color: "#51080F" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#51080F] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#E1C49C", borderColor: "#751A23" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#751A23" style={{ color: "#51080F" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#51080F" }}>
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: "#751A23" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#51080F" }}>
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#E1C49C" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src="/Details/CasaAntonia.png"
                alt={ceremonyLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 relative"
              style={{ borderColor: "#751A23", backgroundColor: "#E1C49C" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#751A23]/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3"
                      style={{ color: "#51080F" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6" fill="#751A23" style={{ color: "#51080F" }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: "#751A23" }} />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: "#51080F" }}>
                      <MapPin className="w-4 h-4" style={{ color: "#51080F" }} />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#51080F",
                          backgroundColor: "#E1C49C",
                          opacity: 0.9,
                          borderColor: "#751A23",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#51080F" }} />
                        <span>
                          {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#51080F",
                          backgroundColor: "#E1C49C",
                          opacity: 0.9,
                          borderColor: "#751A23",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#51080F" }} />
                        <span>
                          {siteConfig.reception.date} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#E1C49C]/25 whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: "#751A23", color: "#51080F" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-white"
                      style={{
                        background:
                          showImageModal === "ceremony"
                            ? "linear-gradient(to right, #751A23, #751A23)"
                            : "linear-gradient(to right, #751A23, #E1C49C)",
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-65" style={{ color: "#51080F" }}>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}



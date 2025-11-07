"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin, Phone, MessageCircle, MessageSquareText } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(null)
      }
    }
    
    if (showImageModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

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

  // Combined info per latest instructions
  const combinedVenue = "Tarlac Recreational Park, San Jose, Tarlac"
  const combinedLocation = combinedVenue
  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(combinedLocation)}`
  const receptionMapsLink = ceremonyMapsLink

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  // Helpers for contact actions
  const getDigits = (value: string): string => value.replace(/\D/g, "")
  const openWhatsApp = (phone: string) => {
    const num = getDigits(phone)
    window.open(`https://wa.me/${num}`, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-14 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Floating geometric shapes with color palette - hidden on small screens */}
        <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-[#B08981]/12 rounded-full blur-xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-16 h-16 bg-[#EFBFBB]/18 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="hidden sm:block absolute bottom-20 left-20 w-24 h-24 bg-[#B08981]/10 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="hidden sm:block absolute bottom-10 right-10 w-12 h-12 bg-[#EFBFBB]/16 rounded-full blur-lg animate-pulse delay-500" />
        {/* Smaller mobile decorative elements */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#B08981]/10 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#EFBFBB]/12 rounded-full blur-md animate-pulse delay-1000" />
        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08981]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent" />
        {/* Corner decorative elements with color palette - reduced on mobile */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none"
        />
      </div>

      <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#EFBFBB] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#EFBFBB] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FFE5E4] mb-4 sm:mb-6 text-balance drop-shadow-lg relative leading-tight">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4]">Event Details</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#EFBFBB]/25 blur-2xl -z-10">Event Details</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#FFE5E4]/95 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed mb-3">
          Everything you need to know about our special day
        </p>
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-1 h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="relative z-10 mb-10 sm:mb-14 lg:mb-20 max-w-6xl mx-auto px-2 sm:px-4">
        {/* Enhanced wrapper with layered glows to match Principal Sponsors */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
          <div className="absolute -inset-3 bg-gradient-to-r from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 rounded-3xl blur-md opacity-50 animate-pulse" />
          {/* Enhanced decorative corner accents */}
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
        
          {/* Ceremony */}
          <div 
            className="relative bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/25 to-[#FFE5E4] backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(102,105,86,0.25)] border-2 border-[#B08981]/50 hover:border-[#B08981] hover:shadow-[0_12px_48px_rgba(102,105,86,0.35)] transition-all duration-700 hover:scale-[1.01] group overflow-hidden"
            onMouseEnter={() => setHoveredCard('ceremony')}
            onMouseLeave={() => setHoveredCard(null)}
          >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-[#B08981]/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          {/* Inner decorative border with gradient */}
          <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
          {/* Additional inner glow */}
          <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />
          
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'ceremony' ? 'scale-110 rotate-[3deg]' : ''}`}>
                <Heart className="text-[#666956] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#666956] leading-tight">Ceremony & Reception</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-2 sm:p-2.5 text-[#666956]/75 hover:text-[#666956] hover:bg-gradient-to-br hover:from-[#666956]/10 hover:to-[#666956]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                title="Open in Google Maps"
                aria-label="Open combined venue in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(combinedLocation, 'ceremony')}
                className="p-2 sm:p-2.5 text-[#666956]/75 hover:text-[#666956] hover:bg-gradient-to-br hover:from-[#666956]/10 hover:to-[#666956]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                title="Copy venue details"
                aria-label="Copy combined venue address"
              >
                {copiedItems.has('ceremony') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2.5 mb-3 sm:mb-4 md:mb-6 relative z-10">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#666956]">{combinedVenue}</p>
            <p className="text-xs sm:text-sm text-[#666956]/90 leading-relaxed">{combinedLocation}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-[#666956]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#B08981] flex-shrink-0" />
              <span>
                {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
              </span>
              </div>
            </div>
            
          {/* Ceremony Image */}
          <div className="mb-3 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-40 xs:h-44 sm:h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-[#666956]/15 group-hover:border-[#666956]/30"
              onClick={() => setShowImageModal('ceremony')}
              aria-label="Open venue image"
            >
              <Image
                src="/Details/church.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <Camera className="text-[#666956] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
            <button
              onClick={() => setShowImageModal('ceremony')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="View venue image"
            >
              <Camera className="w-4 h-4" />
              <span>View Venue</span>
            </button>
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 border-[#B08981] text-[#666956] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#EFBFBB]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Get directions to venue"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
          </div>
        </div>
      </div>
      {/* Reception removed per combined venue info */}

      {/* Additional Information */}
      <div className="relative z-10 mb-8 sm:mb-12 lg:mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-[#EFBFBB]/50" />
            <div className="bg-[#EFBFBB]/25 p-3 rounded-full shadow-lg">
              <Users className="text-[#666956] w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="hidden sm:block h-px w-8 bg-gradient-to-l from-transparent to-[#EFBFBB]/50" />
          </div>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#FFE5E4]">Important Information</h3>
          <p className="text-sm sm:text-base text-[#FFE5E4]/85">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Dress Code */}
          <div className="bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/20 to-[#FFE5E4] backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-7 border-2 border-[#B08981]/50 hover:border-[#B08981] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
            <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08981]/15 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4">
              <div className="bg-[#EFBFBB]/30 p-2 rounded-full shadow-md">
                <Shirt className="text-[#666956] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="font-bold text-sm sm:text-lg text-[#666956]">Dress Code</h4>
            </div>
            
            {/* Theme Badge */}
            <div className="mb-4">
              <span className="text-[11px] sm:text-sm font-semibold text-[#666956] bg-[#B08981]/30 px-2.5 py-1.5 rounded-full">{typeof siteConfig.dressCode === 'object' ? siteConfig.dressCode.theme : siteConfig.dressCode}</span>
            </div>

            {/* Color Palette */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.colors && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#666956] mb-2">Color Palette</p>
                <div className="flex gap-2 flex-wrap">
                  {siteConfig.dressCode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/25"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Principal Sponsors */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.sponsors && (
              <div className="mb-4 bg-white/60 rounded-lg p-3 border border-[#B08981]/30">
                <p className="text-xs font-semibold text-[#666956] mb-2">Principal Sponsors</p>
                <p className="text-xs text-[#666956] opacity-80 mb-1">Dress Code: Any shade matching the palette</p>

              </div>
            )}

            {/* Guests */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.guests && (
              <div className="mb-4 bg-white/60 rounded-lg p-3 border border-[#B08981]/30">
                <p className="text-xs font-semibold text-[#666956] mb-2">Guests</p>
                <p className="text-xs text-[#666956] opacity-80 mb-1">Dress Code: Semi-formal (avoid casual attire)</p>
                <p className="text-xs font-medium text-[#666956] opacity-90 bg-[#EFBFBB]/25 px-2 py-1 rounded">⚠️ {siteConfig.dressCode.note}</p>
              </div>
            )}
          </div>

          {/* Travel & Comfort - Combined */}
          <div className="bg-gradient-to-br from-[#FFE5E4] via-[#B08981]/20 to-[#FFE5E4] backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-7 border-2 border-[#B08981]/60 hover:border-[#B08981] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
            <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08981]/15 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="bg-[#B08981]/30 p-2 rounded-full shadow-md">
                <Car className="text-[#666956] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-[#666956]">Parking & Travel</h4>
            </div>
            
            <div className="space-y-3">
              {/* Parking Information */}
              <div className="bg-gradient-to-br from-white to-[#EFBFBB]/20 rounded-xl p-3 sm:p-4 border-2 border-[#B08981]/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-[#EFBFBB]/25 p-1.5 rounded-full mt-0.5">
                    <Car className="w-3 h-3 text-[#666956]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-[#666956] mb-1">Parking Available</p>
                    <p className="text-xs sm:text-sm text-[#666956] opacity-80 leading-relaxed">
                      Ample parking is available at both venues. We recommend arriving 15-20 minutes early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-gradient-to-br from-white to-[#EFBFBB]/20 rounded-xl p-3 sm:p-4 border-2 border-[#B08981]/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-[#EFBFBB]/25 p-1.5 rounded-full mt-0.5">
                    <Navigation className="w-3 h-3 text-[#666956]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-[#666956] mb-1">Transportation</p>
                    <p className="text-xs sm:text-sm text-[#666956] opacity-80 leading-relaxed mb-2">
                      💡 Book transportation in advance for a stress-free day
                    </p>
                    <p className="text-xs sm:text-sm text-[#666956] opacity-80 leading-relaxed">
                      Taxis, Grab, and private vehicles are welcome. Both venues are easily accessible.
                    </p>
                  </div>
                </div>
              </div>

              
              </div>
            </div>
          </div> 

          
          <div className="h-4"></div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 border-2 border-[#B08981]/50 hover:border-[#B08981] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl pointer-events-none" />
            <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFBFBB]/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 relative z-10">
              <div className="bg-[#EFBFBB]/30 p-2.5 sm:p-3 rounded-full shadow-md">
                <Phone className="text-[#666956] w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg md:text-xl text-[#666956] leading-tight">For more information</h4>
                <p className="text-xs sm:text-sm text-[#666956]/80 mt-0.5">Contact us here</p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 relative z-10">
              {/* Talitha */}
              <div className="bg-white/80 hover:bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-[#B08981]/30 hover:border-[#B08981]/50 transition-all duration-300 hover:shadow-lg group/contact">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-4">
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-[#666956] mb-1">Talitha</h5>
                    <a 
                      href="tel:09271600950" 
                      className="text-xs sm:text-sm text-[#666956]/70 hover:text-[#666956] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      09271600950
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard('09271600950', 'copy-talitha')}
                    className="self-start sm:self-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B08981]/40 text-[#666956] bg-white hover:bg-[#EFBFBB]/25 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium shadow-sm"
                    aria-label="Copy Talitha number"
                    title="Copy number"
                  >
                    {copiedItems.has('copy-talitha') ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Action Buttons - Stack on mobile, grid on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2">
                  <a
                    href="tel:09271600950"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="Call Talitha"
                  >
                    <Phone className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span>Call</span>
                  </a>
                  <a
                    href="sms:09271600950"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="SMS Talitha"
                  >
                    <MessageSquareText className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span>SMS</span>
                  </a>
                  <button
                    onClick={() => openWhatsApp('09271600950')}
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="WhatsApp Talitha"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span className="hidden sm:inline">WhatsApp</span>
                    <span className="sm:hidden">WA</span>
                  </button>
                </div>
              </div>

              {/* Karol */}
              <div className="bg-white/80 hover:bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-[#B08981]/30 hover:border-[#B08981]/50 transition-all duration-300 hover:shadow-lg group/contact">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-4">
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-[#666956] mb-1">Karol</h5>
                    <a 
                      href="tel:09855540332" 
                      className="text-xs sm:text-sm text-[#666956]/70 hover:text-[#666956] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      09855540332
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard('09855540332', 'copy-karol')}
                    className="self-start sm:self-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B08981]/40 text-[#666956] bg-white hover:bg-[#EFBFBB]/25 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium shadow-sm"
                    aria-label="Copy Karol number"
                    title="Copy number"
                  >
                    {copiedItems.has('copy-karol') ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Action Buttons - Stack on mobile, grid on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2">
                  <a
                    href="tel:09855540332"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="Call Karol"
                  >
                    <Phone className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span>Call</span>
                  </a>
                  <a
                    href="sms:09855540332"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="SMS Karol"
                  >
                    <MessageSquareText className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span>SMS</span>
                  </a>
                  <button
                    onClick={() => openWhatsApp('09855540332')}
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border-2 border-[#B08981]/50 text-[#666956] bg-gradient-to-br from-white to-[#EFBFBB]/20 hover:from-[#EFBFBB]/30 hover:to-[#EFBFBB]/40 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold shadow-sm hover:shadow-md"
                    aria-label="WhatsApp Karol"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 text-[#B08981]" />
                    <span className="hidden sm:inline">WhatsApp</span>
                    <span className="sm:hidden">WA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#666956]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B08981]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative w-full max-w-[96vw] sm:max-w-3xl md:max-w-4xl lg:max-w-6xl max-h-[94vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white to-[#FFE5E4]/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B08981]/35 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#666956] via-[#B08981] to-[#666956]" />
            
            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 bg-white/95 hover:bg-white backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 border-[#B08981]/40 group/close focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              title="Close (ESC)"
              style={{ color: '#666956' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2 border-[#B08981]/40">
                {showImageModal === 'ceremony' ? (
                  <>
                    <Heart className="w-4 h-4 text-[#666956]" fill="currentColor" />
                    <span className="text-xs sm:text-sm font-bold text-[#666956]">Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-[#666956]" />
                    <span className="text-xs sm:text-sm font-bold text-[#666956]">Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div className="relative w-full h-[56vh] xs:h-[52vh] sm:h-[58vh] md:h-[66vh] lg:h-[70vh] bg-gradient-to-br from-[#666956]/5 via-white/80 to-[#EFBFBB]/15 overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              
              <Image
                src={showImageModal === 'ceremony' ? "/Details/church.png" : "/Details/D-L-Garden.png"}
                alt={showImageModal === 'ceremony' ? siteConfig.ceremony.location : siteConfig.reception.location}
                fill
                className="object-contain p-4 sm:p-6 md:p-8 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div className="p-3 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 border-[#B08981]/30 relative">
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#B08981]/40 to-transparent" />
              
              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-[#666956] leading-tight">
                      {showImageModal === 'ceremony' ? (
                        <Heart className="w-6 h-6 text-[#B08981]" fill="currentColor" />
                      ) : (
                        <Utensils className="w-6 h-6 text-[#B08981]" />
                      )}
                      {showImageModal === 'ceremony' ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#666956] opacity-80">
                      <MapPin className="w-4 h-4 text-[#B08981]" />
                      <span>{showImageModal === 'ceremony' ? siteConfig.ceremony.location : siteConfig.reception.location}</span>
          </div>

                    {/* Date & Time info */}
                    {showImageModal === 'ceremony' && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium text-[#666956] bg-[#EFBFBB]/25 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-[#B08981]/25">
                        <Clock className="w-4 h-4 text-[#B08981]" />
                        <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === 'reception' && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-medium text-[#666956] bg-[#EFBFBB]/25 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-[#B08981]/25">
                        <Clock className="w-4 h-4 text-[#B08981]" />
                        <span>{siteConfig.reception.date} - {siteConfig.reception.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => copyToClipboard(
                        showImageModal === 'ceremony' 
                          ? siteConfig.ceremony.location
                          : siteConfig.reception.location,
                        `modal-${showImageModal}`
                      )}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-5 sm:py-3 bg-white border-2 border-[#B08981] text-[#666956] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#EFBFBB]/15 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      title="Copy address"
                      aria-label="Copy address"
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
                      onClick={() => openInMaps(showImageModal === 'ceremony' ? ceremonyMapsLink : receptionMapsLink)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08981] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#666956] opacity-60">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    Press ESC to close
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}


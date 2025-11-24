"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const sponsorPalette = [
  { label: "#CDB592", color: "#CDB592" },
  { label: "#C79C6F", color: "#C79C6F" },
  { label: "#F5E5CD", color: "#F5E5CD" },
]

const guestPalette = [
  { label: "Dusty Rose", color: "#FCB8B3" },
  { label: "Light Green", color: "#CDE4C5" },
  { label: "Light Orange", color: "#FFD9B5" },
]

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

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative bg-gradient-to-b from-[#FFFAEF] via-[#F7E7CE]/90 to-[#FFFAEF] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Enhanced background elements with motif colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with motif colors */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#F7E7CE]/25 via-[#FFFAEF]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B76E79]/15 via-[#FCB8B5]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#A4BB8C]/6 via-transparent to-[#A4BB8C]/6" />
        
        {/* Floating decorative circles with motif colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#B76E79]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#FFBD87]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#A4BB8C]/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#FCB8B5]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#FFBD87]/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Corner decorations with available flower images */}
        <div className="absolute top-0 left-0 z-0 opacity-40">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#B76E79]/20 to-transparent rounded-br-full blur-xl"></div>
        </div>
        <div className="absolute top-0 right-0 z-0 opacity-40">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-bl from-[#FCB8B5]/20 to-transparent rounded-bl-full blur-xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt=""
            width={400}
            height={400}
            className="w-32 sm:w-40 md:w-56 lg:w-72 xl:w-80 h-auto opacity-50"
            priority={false}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/bottom-corner-left-flower-removebg-preview.png"
            alt=""
            width={400}
            height={400}
            className="w-32 sm:w-40 md:w-56 lg:w-72 xl:w-80 h-auto opacity-50 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#B76E79]/15" />
      </div>

      {/* Header with motif colors */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#B76E79]/40" />
          <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A4BB8C]/70 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#B76E79]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#B76E79] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Event Details
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#B76E79]/85 font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know about our special day
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A4BB8C]/70 rounded-full" />
        </div>
      </div>

      {/* Combined Ceremony & Reception */}
      <div className="relative z-10 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          className="bg-[#F7E7CE]/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-[0_8px_32px_rgba(183,110,121,0.12)] border-2 border-[#B76E79]/40 hover:border-[#B76E79]/60 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('venue')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FCB8B5]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FCB8B5]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FCB8B5]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FCB8B5]/40 rounded-br-lg" />
          
          {/* Header with Icons */}
          <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
            <div className={`bg-gradient-to-br from-[#B76E79]/30 via-[#FCB8B5]/20 to-[#B76E79]/30 p-1.5 rounded-lg transition-all duration-300 shadow-md ${hoveredCard === 'venue' ? 'scale-110' : ''}`}>
              <Heart className="w-3.5 h-3.5 text-[#B76E79]" fill="#FCB8B5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#B76E79]">Ceremony & Reception</h3>
            <div className={`bg-gradient-to-br from-[#A4BB8C]/30 via-[#FFBD87]/20 to-[#A4BB8C]/30 p-1.5 rounded-lg transition-all duration-300 shadow-md ${hoveredCard === 'venue' ? 'scale-110' : ''}`}>
              <Utensils className="w-3.5 h-3.5 text-[#A4BB8C]" />
            </div>
          </div>

          {/* Venue Info */}
          <div className="space-y-1.5 mb-3 relative z-10 text-center">
            <p className="text-sm sm:text-base font-semibold text-[#B76E79]">{siteConfig.ceremony.venue}</p>
            <p className="text-xs text-[#B76E79]/80">{siteConfig.ceremony.location.split(',')[1]?.trim() || siteConfig.ceremony.location.split(',')[0]?.trim()}, {siteConfig.ceremony.location.split(',')[2]?.trim() || ''}</p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#B76E79]">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{siteConfig.ceremony.date} at 3:00 PM, PH Time</span>
            </div>
          </div>
          
          {/* Venue Image */}
          <div className="mb-3">
            <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden shadow-lg border-2 border-[#B76E79]/30">
              <Image
                src="/Details/MountCosta.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 relative z-10">
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md text-white"
              style={{ backgroundColor: "#B76E79" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(183, 110, 121, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#B76E79";
              }}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Direction</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.ceremony.location, 'venue')}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F7E7CE] border-2 border-[#B76E79]/40 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#F7E7CE]/90 text-[#B76E79]"
            >
              {copiedItems.has('venue') ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information - Compact for mobile */}
      <div className="relative z-10 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-[#B76E79]">Important Information</h3>
          <p className="text-xs text-[#B76E79]/80">Everything you need to know</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire - Compact Design */}
          <div className="bg-[#F7E7CE]/95 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-[#B76E79]/40 hover:border-[#B76E79]/60 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#FCB8B5', opacity: 0.15 }} />
            
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md" style={{ backgroundColor: '#B76E79', opacity: 0.3 }}>
                <Shirt className="w-3.5 h-3.5 text-[#B76E79]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[#B76E79]">Attire</h4>
            </div>
            
            {/* Theme Badge */}
            <div className="mb-3 text-center relative z-10">
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full text-white shadow-md inline-block" style={{ backgroundColor: '#B76E79' }}>
                Spring Theme - Garden Wedding
              </span>
            </div>

            {/* Color Palette - Small Circles */}
            <div className="mb-3 relative z-10">
              <p className="text-[10px] sm:text-xs text-center mb-2 text-[#B76E79]/90">We encourage our guests to wear this color palette</p>
              <div className="flex gap-3 justify-center items-center">
              </div>
            </div>

            {/* Principal Sponsors Palette */}
            <div className="relative z-10 mb-3 rounded-xl border border-[#CDB592]/40 bg-white/85 p-3 shadow-sm">
              <p className="text-[10px] sm:text-xs font-semibold text-[#7A5A3C] mb-1 uppercase tracking-wide">Palette for Principal Sponsors</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {sponsorPalette.map((swatch) => (
                  <div key={swatch.label} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: swatch.color }} />
                    <span className="text-[9px] sm:text-[10px] text-[#7A5A3C]/80 font-medium">{swatch.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Palette */}
            <div className="relative z-10 mb-3 rounded-xl border border-[#FCB8B3]/40 bg-white/85 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                <p className="text-[10px] sm:text-xs font-semibold text-[#B76E79] uppercase tracking-wide">Palette for Guests</p>
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#FCB8B3]/30 text-[#B76E79] font-medium">Theme: Spring</span>
              </div>
              <p className="text-[10px] text-[#B76E79]/80 mb-2">Dusty rose, light green, light orange tones.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {guestPalette.map((swatch) => (
                  <div key={swatch.label} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: swatch.color }} />
                    <span className="text-[9px] sm:text-[10px] text-[#B76E79]/80 font-medium">{swatch.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attire Details - Compact */}
            <div className="space-y-2 relative z-10">
              {/* Gentlemen */}
              <div className="rounded-lg p-2 border border-[#FFBD87]/50 bg-white/80">
                <p className="text-[10px] sm:text-xs font-semibold mb-1 text-[#B76E79]">Gentlemen</p>
                <p className="text-[10px] text-[#B76E79]/80">Long Sleeves or Suits & Slacks</p>
                <p className="text-[9px] text-[#B76E79]/70 italic">Ties not required</p>
              </div>

              {/* Ladies */}
              <div className="rounded-lg p-2 border border-[#FCB8B5]/50 bg-white/80">
                <p className="text-[10px] sm:text-xs font-semibold mb-1 text-[#B76E79]">Ladies</p>
                <p className="text-[10px] text-[#B76E79]/80">Long Cocktail Dress (Satin, Floral, Textures)</p>
                <p className="text-[10px] text-[#B76E79]/80">Heels suitable for outdoor terrain</p>
                <p className="text-[9px] font-medium px-1.5 py-0.5 rounded text-white shadow-sm mt-1 inline-block" style={{ backgroundColor: '#B76E79' }}>⚠️ No white dress</p>
              </div>

              {/* Adults Only */}
              <div className="rounded-lg p-2 border border-[#A4BB8C]/50 bg-white/90 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Users className="w-3 h-3 text-[#A4BB8C]" />
                  <p className="text-[10px] sm:text-xs font-semibold text-[#B76E79]">Adults Only Gathering</p>
                </div>
                <p className="text-[9px] text-[#B76E79]/70">To celebrate with us</p>
              </div>
            </div>

            {/* Other Details */}
            <div className="mt-2.5 text-center relative z-10">
              <p className="text-[9px] sm:text-[10px] italic text-[#B76E79]/60">Other details to follow</p>
            </div>
          </div>

          {/* Travel & Parking - Compact */}
          <div className="bg-[#F7E7CE]/95 backdrop-blur-md rounded-xl p-3 sm:p-4 border-2 border-[#FFBD87]/40 hover:border-[#FFBD87]/60 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#FFBD87', opacity: 0.1 }} />
            
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md" style={{ backgroundColor: '#FFBD87', opacity: 0.3 }}>
                <Car className="w-3.5 h-3.5 text-[#FFBD87]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[#B76E79]">Parking & Travel</h4>
            </div>
            
            <div className="space-y-2 relative z-10">
              {/* Parking */}
              <div className="bg-white/80 rounded-lg p-2 border border-[#FFBD87]/50 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="p-1 rounded-full mt-0.5" style={{ backgroundColor: '#FFBD87', opacity: 0.2 }}>
                    <Car className="w-2.5 h-2.5 text-[#FFBD87]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs font-semibold mb-0.5 text-[#B76E79]">Parking Available</p>
                    <p className="text-[10px] leading-relaxed text-[#B76E79]/80">
                      Ample parking at venue. Arrive 15-20 min early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white/80 rounded-lg p-2 border border-[#FFBD87]/50 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="p-1 rounded-full mt-0.5" style={{ backgroundColor: '#FFBD87', opacity: 0.2 }}>
                    <Navigation className="w-2.5 h-2.5 text-[#FFBD87]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] sm:text-xs font-semibold mb-0.5 text-[#B76E79]">Transportation</p>
                    <p className="text-[10px] leading-relaxed text-[#B76E79]/80">
                      Taxis, Grab, and private vehicles welcome.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/90 rounded-lg p-2 border border-[#FFBD87]/50">
                <p className="text-[10px] sm:text-xs font-semibold mb-1 flex items-center gap-1 text-[#B76E79]">
                  <span>📍</span> Quick Tips
                </p>
                <ul className="text-[9px] sm:text-[10px] space-y-0.5 text-[#B76E79]/80">
                  <li className="flex items-start gap-1">
                    <span className="mt-0.5">•</span>
                    <span>Plan route ahead to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="mt-0.5">•</span>
                    <span>Wear outdoor-suitable shoes</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="mt-0.5">•</span>
                    <span>Coordinate carpooling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: 'rgba(241, 237, 226, 0.95)' }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#AFC8E6', opacity: 0.15 }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#D8B0B0', opacity: 0.15, animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group relative"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: 'linear-gradient(to right, #AFC8E6, #D8B0B0, #AFC8E6)' }} />
            
            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: '#F1EDE2', borderColor: '#AFC8E6', color: '#1a1a1a' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2" style={{ backgroundColor: '#F1EDE2', borderColor: '#AFC8E6' }}>
                {showImageModal === 'ceremony' ? (
                  <>
                    <Heart className="w-4 h-4" fill="#D8B0B0" style={{ color: '#AFC8E6' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#1a1a1a' }}>Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: '#D8B0B0' }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: '#1a1a1a' }}>Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden" style={{ backgroundColor: '#F1EDE2' }}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              
              {showImageModal === 'ceremony' ? (
                <Image
                  src="/Details/Church.png"
                  alt={siteConfig.ceremony.location}
                  fill
                  className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                  sizes="95vw"
                  priority
                />
              ) : (
                <Image
                  src="/Details/recepcion.png"
                  alt={siteConfig.reception.location}
                  fill
                  className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                  sizes="95vw"
                  priority
                />
              )}
            </div>

            {/* Enhanced content section */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 relative" style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}>
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#AFC8E6]/40 to-transparent" />
              
              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3" style={{ color: '#1a1a1a' }}>
                      {showImageModal === 'ceremony' ? (
                        <Heart className="w-6 h-6" fill="#D8B0B0" style={{ color: '#AFC8E6' }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: '#D8B0B0' }} />
                      )}
                      {showImageModal === 'ceremony' ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: '#1a1a1a' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#AFC8E6' }} />
                      <span>{showImageModal === 'ceremony' ? siteConfig.ceremony.location : siteConfig.reception.location}</span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === 'ceremony' && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border" style={{ color: '#1a1a1a', backgroundColor: '#D8B0B0', opacity: 0.25, borderColor: '#AFC8E6' }}>
                        <Clock className="w-4 h-4" style={{ color: '#AFC8E6' }} />
                        <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === 'reception' && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border" style={{ color: '#1a1a1a', backgroundColor: '#AFC8E6', opacity: 0.25, borderColor: '#D8B0B0' }}>
                        <Clock className="w-4 h-4" style={{ color: '#D8B0B0' }} />
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#D8B0B0]/15 whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: '#AFC8E6', color: '#1a1a1a' }}
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
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-white"
                      style={{ background: showImageModal === 'ceremony' ? 'linear-gradient(to right, #AFC8E6, #AFC8E6)' : 'linear-gradient(to right, #D8B0B0, #D8B0B0)' }}
                      onMouseEnter={(e) => {
                        if (showImageModal === 'ceremony') {
                          e.currentTarget.style.background = 'linear-gradient(to right, #9BB5D8, #AFC8E6)'
                        } else {
                          e.currentTarget.style.background = 'linear-gradient(to right, #C89A9A, #D8B0B0)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (showImageModal === 'ceremony') {
                          e.currentTarget.style.background = 'linear-gradient(to right, #AFC8E6, #AFC8E6)'
                        } else {
                          e.currentTarget.style.background = 'linear-gradient(to right, #D8B0B0, #D8B0B0)'
                        }
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-60" style={{ color: '#1a1a1a' }}>
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

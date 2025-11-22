"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, Users, Camera, X, MapPin } from "lucide-react"
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

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="details" className="relative bg-[#DDD3CC] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EDD6AC]/20 via-[#EDD6AC]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B28383]/20 via-[#B28383]/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C2D3C3]/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#A78256]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#B28383]/18 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#EDD6AC]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations - all four corners */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#A78256]/20" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#A78256] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Event Details
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#B28383] font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know about our special day
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Ceremony */}
        <div 
          className="bg-[#EDD6AC]/98 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_8px_32px_rgba(167,130,86,0.12)] border-2 border-[#A78256]/40 hover:border-[#A78256]/60 hover:shadow-[0_12px_40px_rgba(167,130,86,0.18)] transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br from-[#A78256]/30 via-[#B28383]/20 to-[#A78256]/30 p-2 sm:p-2.5 rounded-xl transition-all duration-300 shadow-md ${hoveredCard === 'ceremony' ? 'scale-110' : ''}`}>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78256]" fill="#B28383" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#A78256]">Ceremony</h3>
            </div>
          </div>

          <div className="space-y-2 mb-4 relative z-10">
            <p className="text-sm sm:text-base font-semibold text-[#A78256]">{siteConfig.ceremony.venue}</p>
            <p className="text-xs sm:text-sm text-[#B28383]">{siteConfig.ceremony.location.split(',')[1]?.trim() || siteConfig.ceremony.location.split(',')[0]?.trim()}, {siteConfig.ceremony.location.split(',')[2]?.trim() || ''}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A78256]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>
                {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
              </span>
            </div>
          </div>
          
          {/* Ceremony Image */}
          <div className="mb-4">
            <div className="relative w-full h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-[#A78256]/30">
              <Image
                src="/Details/Church.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative z-10">
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md text-white"
              style={{ backgroundColor: "#A78256" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(167, 130, 86, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#A78256";
              }}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Direction</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.ceremony.location, 'ceremony')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EDD6AC] border-2 border-[#A78256]/40 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#EDD6AC]/90 text-[#A78256]"
            >
              {copiedItems.has('ceremony') ? (
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
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-[#EDD6AC]/98 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_8px_32px_rgba(167,130,86,0.12)] border-2 border-[#A78256]/40 hover:border-[#A78256]/60 hover:shadow-[0_12px_40px_rgba(167,130,86,0.18)] transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br from-[#B28383]/30 via-[#A78256]/20 to-[#B28383]/30 p-2 sm:p-2.5 rounded-xl transition-all duration-300 shadow-md ${hoveredCard === 'reception' ? 'scale-110' : ''}`}>
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#B28383]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#A78256]">Reception</h3>
            </div>
          </div>

          <div className="space-y-2 mb-4 relative z-10">
            <p className="text-sm sm:text-base font-semibold text-[#A78256]">{siteConfig.reception.venue}</p>
            <p className="text-xs sm:text-sm text-[#B28383]">{siteConfig.reception.location.split(',')[1]?.trim() || siteConfig.reception.location.split(',')[0]?.trim()}, {siteConfig.reception.location.split(',')[2]?.trim() || ''}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A78256]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>
                {siteConfig.reception.date} - {siteConfig.reception.time}
              </span>
            </div>
          </div>

          {/* Reception Image */}
          <div className="mb-4">
            <div className="relative w-full h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-[#A78256]/30">
              <Image
                src="/Details/recepcion.png"
                alt={siteConfig.reception.location}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative z-10">
            <button
              onClick={() => openInMaps(receptionMapsLink)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md text-white"
              style={{ backgroundColor: "#A78256" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(167, 130, 86, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#A78256";
              }}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Direction</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.reception.location, 'reception')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EDD6AC] border-2 border-[#A78256]/40 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#EDD6AC]/90 text-[#A78256]"
            >
              {copiedItems.has('reception') ? (
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
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="relative z-10 mb-6 sm:mb-8 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[#A78256]">Important Information</h3>
          <p className="text-xs sm:text-sm text-[#B28383]">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Dress Code */}
          <div className="bg-[#EDD6AC]/98 backdrop-blur-md rounded-xl p-4 sm:p-5 border-2 border-[#A78256]/40 hover:border-[#A78256]/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#D8B0B0', opacity: 0.15 }} />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="p-2 rounded-full shadow-md" style={{ backgroundColor: '#D8B0B0', opacity: 0.3 }}>
                <Shirt className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1a1a1a' }} />
              </div>
              <h4 className="font-bold text-base sm:text-lg" style={{ color: '#1a1a1a' }}>Dress Code</h4>
            </div>
            
            {/* Theme Badge */}
            <div className="mb-4 relative z-10">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full text-white shadow-md" style={{ backgroundColor: '#D8B0B0' }}>
                {siteConfig.dressCode.theme}
              </span>
            </div>

            {/* Color Palette */}
            {siteConfig.dressCode.colors && (
              <div className="mb-4 relative z-10">
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Color Palette</p>
                <div className="flex gap-2 flex-wrap">
                  {siteConfig.dressCode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#AFC8E6]/25"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Principal Sponsors */}
            {siteConfig.dressCode.sponsors && (
              <div className="mb-4 rounded-lg p-3 border-2 relative z-10 bg-white/80" style={{ borderColor: '#AFC8E6' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Principal Sponsors</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Ladies: {siteConfig.dressCode.sponsors.ladies}</p>
                <p className="text-xs" style={{ color: '#1a1a1a', opacity: 0.8 }}>Gentlemen: {siteConfig.dressCode.sponsors.gentlemen}</p>
              </div>
            )}

            {/* Guests */}
            {siteConfig.dressCode.guests && (
              <div className="mb-4 rounded-lg p-3 border-2 relative z-10 bg-white/80" style={{ borderColor: '#AFC8E6' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#1a1a1a' }}>Guests</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Ladies: {siteConfig.dressCode.guests.ladies}</p>
                <p className="text-xs mb-1" style={{ color: '#1a1a1a', opacity: 0.8 }}>Gentlemen: {siteConfig.dressCode.guests.gentlemen}</p>
                <p className="text-xs font-medium px-2 py-1 rounded text-white shadow-sm mt-2" style={{ backgroundColor: '#D8B0B0' }}>⚠️ {siteConfig.dressCode.note}</p>
              </div>
            )}
          </div>

          {/* Travel & Comfort - Combined */}
          <div className="bg-[#EDD6AC]/98 backdrop-blur-md rounded-xl p-4 sm:p-5 border-2 border-[#A78256]/40 hover:border-[#A78256]/60 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: '#AFC8E6', opacity: 0.1 }} />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="p-2 rounded-full shadow-md" style={{ backgroundColor: '#AFC8E6', opacity: 0.3 }}>
                <Car className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#1a1a1a' }} />
              </div>
              <h4 className="font-bold text-base sm:text-lg" style={{ color: '#1a1a1a' }}>Parking & Travel</h4>
            </div>
            
            <div className="space-y-3 relative z-10">
              {/* Parking Information */}
              <div className="bg-white/80 rounded-xl p-3 sm:p-4 border-2 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: '#AFC8E6' }}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-full mt-0.5" style={{ backgroundColor: '#AFC8E6', opacity: 0.2 }}>
                    <Car className="w-3 h-3" style={{ color: '#AFC8E6' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-1" style={{ color: '#1a1a1a' }}>Parking Available</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      Ample parking is available at both venues. We recommend arriving 15-20 minutes early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white/80 rounded-xl p-3 sm:p-4 border-2 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderColor: '#AFC8E6' }}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="p-1.5 rounded-full mt-0.5" style={{ backgroundColor: '#AFC8E6', opacity: 0.2 }}>
                    <Navigation className="w-3 h-3" style={{ color: '#AFC8E6' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold mb-1" style={{ color: '#1a1a1a' }}>Transportation</p>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      💡 Book transportation in advance for a stress-free day
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.8 }}>
                      Taxis, Grab, and private vehicles are welcome. Both venues are easily accessible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Tips */}
              <div className="bg-white/90 rounded-xl p-3 sm:p-4 border-2 shadow-sm" style={{ borderColor: '#AFC8E6', backgroundColor: '#F1EDE2' }}>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#1a1a1a' }}>
                  <span className="text-sm">📍</span>
                  Quick Tips
                </p>
                <ul className="text-xs space-y-1.5" style={{ color: '#1a1a1a' }}>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Plan your route ahead of time to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Wear comfortable shoes for easy movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5" style={{ color: '#1a1a1a' }}>•</span>
                    <span>Coordinate with friends for carpooling</span>
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

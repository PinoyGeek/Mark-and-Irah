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
    <Section id="details" className="relative bg-gradient-to-b from-[#525E2C] via-[#909E8D] to-[#525E2C] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes with color palette */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#D1AB6D]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#E0CFB5]/15 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#D1AB6D]/8 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#E0CFB5]/12 rounded-full blur-lg animate-pulse delay-500" />
        
        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E0CFB5]/25 to-transparent" />
        
        {/* Corner decorative elements with color palette */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#D1AB6D]/15 via-[#E0CFB5]/10 to-transparent rounded-tl-3xl" />
        </div>

      <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/60 to-[#D1AB6D]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#D1AB6D] rounded-full" />
            <div className="w-1 h-1 bg-[#E0CFB5] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#D1AB6D] rounded-full" />
        </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#D1AB6D]/60 to-[#D1AB6D]/30" />
        </div>
        
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#E0CFB5] mb-6 text-balance drop-shadow-lg relative">
          <span className="relative z-10">Event Details</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#D1AB6D]/20 blur-2xl -z-10">Event Details</span>
          </h2>
  
        <p className="text-lg md:text-xl text-[#F0F0F0] font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed mb-8">
          Everything you need to know about our special day
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#E0CFB5]/40 to-[#E0CFB5]/20" />
          <div className="w-1 h-1 bg-[#E0CFB5] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#E0CFB5]/40 to-[#E0CFB5]/20" />
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
        {/* Ceremony */}
        <div 
          className="bg-gradient-to-br from-[#F0F0F0] via-[#E0CFB5]/50 to-[#F0F0F0] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(82,94,44,0.3),0_0_0_1px_rgba(209,171,109,0.2)] border-2 border-[#D1AB6D]/60 hover:border-[#D1AB6D] hover:shadow-[0_12px_48px_rgba(82,94,44,0.4),0_0_40px_rgba(209,171,109,0.5)] transition-all duration-700 hover:scale-[1.02] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D1AB6D]/20 via-[#E0CFB5]/15 to-[#D1AB6D]/20 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-[#D1AB6D]/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          {/* Inner decorative border with gradient */}
          <div className="absolute inset-2 border border-[#D1AB6D]/40 rounded-2xl" />
          
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-[#D1AB6D]/30 via-[#E0CFB5]/20 to-[#D1AB6D]/30 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'ceremony' ? 'scale-110 rotate-[3deg]' : ''}`}>
                <Heart className="text-[#525E2C] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#525E2C]">Ceremony</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-2 sm:p-2.5 text-[#525E2C]/70 hover:text-[#525E2C] hover:bg-gradient-to-br hover:from-[#525E2C]/10 hover:to-[#525E2C]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.ceremony.location, 'ceremony')}
                className="p-2 sm:p-2.5 text-[#525E2C]/70 hover:text-[#525E2C] hover:bg-gradient-to-br hover:from-[#525E2C]/10 hover:to-[#525E2C]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy ceremony details"
              >
                {copiedItems.has('ceremony') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 relative z-10">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#525E2C]">{siteConfig.ceremony.venue}</p>
            <p className="text-xs sm:text-sm text-[#525E2C] opacity-70">Mabolo, Cebu City</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#525E2C]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#D1AB6D] flex-shrink-0" />
              <span>
                {siteConfig.ceremony.date} at {siteConfig.ceremony.time}
              </span>
              </div>
            </div>
            
          {/* Ceremony Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-[#525E2C]/10 group-hover:border-[#525E2C]/20"
              onClick={() => setShowImageModal('ceremony')}
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
                    <Camera className="text-[#525E2C] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
            <button
              onClick={() => setShowImageModal('ceremony')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#525E2C] to-[#525E2C]/90 hover:from-[#525E2C]/90 hover:to-[#525E2C] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-[#D1AB6D] text-[#525E2C] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#E0CFB5]/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps</span>
            </button>
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-gradient-to-br from-[#F0F0F0] via-[#E0CFB5]/50 to-[#F0F0F0] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(82,94,44,0.3),0_0_0_1px_rgba(209,171,109,0.2)] border-2 border-[#D1AB6D]/60 hover:border-[#D1AB6D] hover:shadow-[0_12px_48px_rgba(82,94,44,0.4),0_0_40px_rgba(209,171,109,0.5)] transition-all duration-700 hover:scale-[1.02] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Enhanced Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D1AB6D]/20 via-[#E0CFB5]/15 to-[#D1AB6D]/20 rounded-full blur-2xl opacity-40 animate-pulse" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-[#D1AB6D]/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
          
          {/* Inner decorative border with gradient */}
          <div className="absolute inset-2 border border-[#D1AB6D]/40 rounded-2xl" />
          
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-3xl" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4 relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`bg-gradient-to-br from-[#D1AB6D]/30 via-[#E0CFB5]/20 to-[#D1AB6D]/30 p-2.5 sm:p-3 md:p-4 rounded-2xl transition-all duration-300 shadow-md group-hover:shadow-lg ${hoveredCard === 'reception' ? 'scale-110 rotate-[3deg]' : ''}`}>
                <Utensils className="text-[#525E2C] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#525E2C]">Reception</h3>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="p-2 sm:p-2.5 text-[#525E2C]/70 hover:text-[#525E2C] hover:bg-gradient-to-br hover:from-[#525E2C]/10 hover:to-[#525E2C]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Open in Google Maps"
              >
                <Navigation className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.reception.location, 'reception')}
                className="p-2 sm:p-2.5 text-[#525E2C]/70 hover:text-[#525E2C] hover:bg-gradient-to-br hover:from-[#525E2C]/10 hover:to-[#525E2C]/5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95"
                title="Copy reception details"
              >
                {copiedItems.has('reception') ? <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
              </button>
                </div>
              </div>

          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6 relative z-10">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#525E2C]">{siteConfig.reception.venue}</p>
            <p className="text-xs sm:text-sm text-[#525E2C] opacity-70">Escario Cebu</p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#525E2C]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#D1AB6D] flex-shrink-0" />
              <span>
                {siteConfig.reception.date} - {siteConfig.reception.time}
              </span>
            </div>
          </div>

          {/* Reception Image */}
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div 
              className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden shadow-lg cursor-pointer group/image transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.98] border-2 border-[#525E2C]/10 group-hover:border-[#525E2C]/20"
              onClick={() => setShowImageModal('reception')}
            >
              <Image
                src="/Details/golden-peak-hotel.png"
                alt={siteConfig.reception.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <Camera className="text-[#525E2C] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative z-10">
            <button
              onClick={() => setShowImageModal('reception')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#525E2C] to-[#525E2C]/90 hover:from-[#525E2C]/90 hover:to-[#525E2C] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button
              onClick={() => openInMaps(receptionMapsLink)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-[#D1AB6D] text-[#525E2C] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#E0CFB5]/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Google Maps</span>
            </button>
          </div>
                </div>
              </div>

      {/* Additional Information */}
      <div className="relative z-10 mb-8 sm:mb-12 lg:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="hidden sm:block h-px w-8 bg-gradient-to-r from-transparent to-[#D1AB6D]/50" />
            <div className="bg-[#D1AB6D]/20 p-3 rounded-full shadow-lg">
              <Users className="text-[#E0CFB5] w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="hidden sm:block h-px w-8 bg-gradient-to-l from-transparent to-[#D1AB6D]/50" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#E0CFB5]">Important Information</h3>
          <p className="text-sm sm:text-base text-[#F0F0F0] opacity-80">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Dress Code */}
          <div className="bg-gradient-to-br from-[#F0F0F0] via-[#E0CFB5]/50 to-[#F0F0F0] backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-7 border-2 border-[#D1AB6D]/60 hover:border-[#D1AB6D] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1AB6D]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4">
              <div className="bg-[#D1AB6D]/30 p-2 rounded-full shadow-md">
                <Shirt className="text-[#525E2C] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-[#525E2C]">Dress Code</h4>
            </div>
            
            {/* Theme Badge */}
            <div className="mb-4">
              <span className="text-xs sm:text-sm font-semibold text-[#525E2C] bg-[#E0CFB5]/40 px-3 py-1.5 rounded-full">{typeof siteConfig.dressCode === 'object' ? siteConfig.dressCode.theme : siteConfig.dressCode}</span>
            </div>

            {/* Color Palette */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.colors && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#525E2C] mb-2">Color Palette</p>
                <div className="flex gap-2 flex-wrap">
                  {siteConfig.dressCode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#D1AB6D]/20"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Principal Sponsors */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.sponsors && (
              <div className="mb-4 bg-white/50 rounded-lg p-3 border border-[#D1AB6D]/20">
                <p className="text-xs font-semibold text-[#525E2C] mb-2">Principal Sponsors</p>
                <p className="text-xs text-[#525E2C] opacity-80 mb-1">Ladies: {siteConfig.dressCode.sponsors.ladies}</p>
                <p className="text-xs text-[#525E2C] opacity-80">Gentlemen: {siteConfig.dressCode.sponsors.gentlemen}</p>
              </div>
            )}

            {/* Guests */}
            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.guests && (
              <div className="mb-4 bg-white/50 rounded-lg p-3 border border-[#D1AB6D]/20">
                <p className="text-xs font-semibold text-[#525E2C] mb-2">Guests</p>
                <p className="text-xs text-[#525E2C] opacity-80 mb-1">Ladies: {siteConfig.dressCode.guests.ladies}</p>
                <p className="text-xs text-[#525E2C] opacity-80 mb-2">Gentlemen: {siteConfig.dressCode.guests.gentlemen}</p>
                <p className="text-xs font-medium text-[#525E2C] opacity-90 bg-[#D1AB6D]/10 px-2 py-1 rounded">⚠️ {siteConfig.dressCode.note}</p>
              </div>
            )}
          </div>

          {/* Travel & Comfort - Combined */}
          <div className="bg-gradient-to-br from-[#F0F0F0] via-[#E0CFB5]/50 to-[#F0F0F0] backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-7 border-2 border-[#D1AB6D]/60 hover:border-[#D1AB6D] hover:shadow-xl transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.99] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1AB6D]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 relative z-10">
              <div className="bg-[#D1AB6D]/30 p-2 rounded-full shadow-md">
                <Car className="text-[#525E2C] w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-lg text-[#525E2C]">Parking & Travel</h4>
            </div>
            
            <div className="space-y-3">
              {/* Parking Information */}
              <div className="bg-gradient-to-br from-white to-[#E0CFB5]/30 rounded-xl p-3 sm:p-4 border-2 border-[#D1AB6D]/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-[#D1AB6D]/20 p-1.5 rounded-full mt-0.5">
                    <Car className="w-3 h-3 text-[#525E2C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#525E2C] mb-1">Parking Available</p>
                    <p className="text-xs text-[#525E2C] opacity-70 leading-relaxed">
                      Ample parking is available at both venues. We recommend arriving 15-20 minutes early.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-gradient-to-br from-white to-[#E0CFB5]/30 rounded-xl p-3 sm:p-4 border-2 border-[#D1AB6D]/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-[#D1AB6D]/20 p-1.5 rounded-full mt-0.5">
                    <Navigation className="w-3 h-3 text-[#525E2C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#525E2C] mb-1">Transportation</p>
                    <p className="text-xs text-[#525E2C] opacity-70 leading-relaxed mb-2">
                      💡 Book transportation in advance for a stress-free day
                    </p>
                    <p className="text-xs text-[#525E2C] opacity-70 leading-relaxed">
                      Taxis, Grab, and private vehicles are welcome. Both venues are easily accessible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Tips */}
              <div className="bg-gradient-to-br from-[#D1AB6D]/10 to-[#E0CFB5]/20 rounded-xl p-3 sm:p-4 border-2 border-[#D1AB6D]/40 shadow-sm">
                <p className="text-xs font-semibold text-[#525E2C] mb-2 flex items-center gap-1.5">
                  <span className="text-sm">📍</span>
                  Quick Tips
                </p>
                <ul className="text-xs text-[#525E2C] opacity-70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D1AB6D] mt-0.5">•</span>
                    <span>Plan your route ahead of time to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D1AB6D] mt-0.5">•</span>
                    <span>Wear comfortable shoes for easy movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D1AB6D] mt-0.5">•</span>
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
          className="fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#525E2C]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D1AB6D]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white to-[#E0CFB5]/10 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D1AB6D]/30 animate-in zoom-in-95 duration-500 group relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#525E2C] via-[#D1AB6D] to-[#525E2C]" />
            
            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 bg-white/95 hover:bg-white backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 border-[#D1AB6D]/40 group/close"
              title="Close (ESC)"
              style={{ color: '#525E2C' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-red-500 transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2 border-[#D1AB6D]/40">
                {showImageModal === 'ceremony' ? (
                  <>
                    <Heart className="w-4 h-4 text-[#525E2C]" fill="currentColor" />
                    <span className="text-xs sm:text-sm font-bold text-[#525E2C]">Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-[#525E2C]" />
                    <span className="text-xs sm:text-sm font-bold text-[#525E2C]">Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-[#909E8D]/5 via-white/80 to-[#E0CFB5]/10 overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <Image
                src={showImageModal === 'ceremony' ? "/Details/church.png" : "/Details/golden-peak-hotel.png"}
                alt={showImageModal === 'ceremony' ? siteConfig.ceremony.location : siteConfig.reception.location}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 border-[#D1AB6D]/30 relative">
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/40 to-transparent" />
              
              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3 text-[#525E2C]">
                      {showImageModal === 'ceremony' ? (
                        <Heart className="w-6 h-6 text-[#D1AB6D]" fill="currentColor" />
                      ) : (
                        <Utensils className="w-6 h-6 text-[#D1AB6D]" />
                      )}
                      {showImageModal === 'ceremony' ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#525E2C] opacity-70">
                      <MapPin className="w-4 h-4 text-[#D1AB6D]" />
                      <span>{showImageModal === 'ceremony' ? 'Mabolo, Cebu City' : 'Escario Cebu'}</span>
          </div>

                    {/* Date & Time info */}
                    {showImageModal === 'ceremony' && (
                      <div className="flex items-center gap-2 text-sm font-medium text-[#525E2C] bg-[#E0CFB5]/30 px-3 py-2 rounded-lg border border-[#D1AB6D]/20">
                        <Clock className="w-4 h-4 text-[#D1AB6D]" />
                        <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === 'reception' && (
                      <div className="flex items-center gap-2 text-sm font-medium text-[#525E2C] bg-[#E0CFB5]/30 px-3 py-2 rounded-lg border border-[#D1AB6D]/20">
                        <Clock className="w-4 h-4 text-[#D1AB6D]" />
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border-2 border-[#D1AB6D] text-[#525E2C] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#E0CFB5]/20 whitespace-nowrap"
                      title="Copy address"
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
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#525E2C] to-[#525E2C]/90 hover:from-[#525E2C]/90 hover:to-[#525E2C] text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Open in Maps</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs text-[#525E2C] opacity-50">
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


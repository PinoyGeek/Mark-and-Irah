"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

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

  // Updated venue information
  const venue = "Alta Guia, Taguig, Metro Manila"
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(venue)}`
  const receptionMapsLink = ceremonyMapsLink

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative bg-gradient-to-b from-[#0A3428] via-[#106552]/90 to-[#0A3428] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#C3A161]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#C3A161]/5 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 md:mb-6 drop-shadow-md">
          Event Details
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#FFFFFF]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Ceremony and Reception - Combined Card */}
      <div className="relative z-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <div 
          className="relative bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-[#C3A161]/30 shadow-lg hover:shadow-xl hover:border-[#C3A161]/50 transition-all duration-300 group"
        >
          {/* Subtle glow on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C3A161]/20 to-[#751A2C]/10 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Venue Image */}
          <div className="relative w-full h-44 sm:h-52 md:h-60 lg:h-64 xl:h-72 overflow-hidden">
            <Image
              src="/Details/Alta Guia.png"
              alt="Alta Guia, Taguig, Metro Manila"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Venue name overlay */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg leading-tight">
                Alta Guia
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-md">
                Taguig, Metro Manila
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8 relative z-10">
            {/* Date */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#0A3428] mb-3 sm:mb-4 md:mb-6">
                December 28, 2025
              </p>
              
              {/* Ceremony and Reception Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Ceremony */}
                <div className="bg-[#C3A161]/10 rounded-lg p-3 sm:p-4 md:p-5 border border-[#C3A161]/30">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#751A2C] flex-shrink-0" fill="currentColor" />
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#0A3428]">Ceremony</h4>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#751A2C] flex-shrink-0" />
                    <p className="text-base sm:text-lg md:text-xl font-bold text-[#0A3428]">11:00 AM</p>
                  </div>
                </div>

                {/* Reception */}
                <div className="bg-[#C3A161]/10 rounded-lg p-3 sm:p-4 md:p-5 border border-[#C3A161]/30">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                    <Utensils className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#751A2C] flex-shrink-0" />
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[#0A3428]">Reception</h4>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#751A2C] flex-shrink-0" />
                    <p className="text-base sm:text-lg md:text-xl font-bold text-[#0A3428]">12:00 NN</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="flex items-start gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-8 p-3 sm:p-4 bg-[#0A3428]/5 rounded-lg border border-[#C3A161]/20">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#751A2C] mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1">Location</p>
                <p className="text-xs sm:text-sm md:text-base text-[#0A3428]/80 break-words">{venue}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3 md:py-3.5 bg-[#0A3428] hover:bg-[#106552] text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg touch-manipulation"
                aria-label="Get directions to venue"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Get Directions</span>
              </button>
              <button
                onClick={() => copyToClipboard(venue, 'venue')}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-3 md:py-3.5 bg-white border-2 border-[#C3A161] hover:bg-[#C3A161]/10 text-[#0A3428] rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                aria-label="Copy venue address"
              >
                {copiedItems.has('venue') ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                )}
                <span>{copiedItems.has('venue') ? 'Copied!' : 'Copy Address'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="relative z-10 mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-5 sm:mb-6 md:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-[#FFFFFF]">Important Information</h3>
          <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/85">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Dress Code */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[#C3A161]/30 shadow-lg hover:shadow-xl hover:border-[#C3A161]/50 transition-all duration-300 group overflow-hidden">
            {/* Subtle glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C3A161]/20 to-[#751A2C]/10 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="bg-[#751A2C]/10 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Shirt className="text-[#751A2C] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A3428]">Dress Code</h4>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-[#C3A161]/10 rounded-lg p-3 sm:p-4 border border-[#C3A161]/30">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0A3428] mb-1.5 sm:mb-2">Formal Attire</p>
                  <p className="text-xs sm:text-sm text-[#0A3428]/80 leading-relaxed">
                    We kindly request our guests to dress in formal attire to celebrate our special day.
                  </p>
                </div>

                {/* Color Palette */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0A3428] mb-2 sm:mb-3">Wedding Colors</p>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {['#0A3428', '#106552', '#751A2C', '#C3A161'].map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-md border-2 border-white"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parking & Travel */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[#C3A161]/30 shadow-lg hover:shadow-xl hover:border-[#C3A161]/50 transition-all duration-300 group overflow-hidden">
            {/* Subtle glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#C3A161]/20 to-[#751A2C]/10 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="bg-[#751A2C]/10 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Car className="text-[#751A2C] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A3428]">Parking & Travel</h4>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-[#C3A161]/10 rounded-lg p-3 sm:p-4 border border-[#C3A161]/30">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2">Parking Available</p>
                  <p className="text-xs sm:text-sm text-[#0A3428]/80 leading-relaxed">
                    Ample parking is available at the venue. We recommend arriving 15-20 minutes early.
                  </p>
                </div>

                <div className="bg-[#C3A161]/10 rounded-lg p-3 sm:p-4 border border-[#C3A161]/30">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0A3428] mb-1.5 sm:mb-2">Transportation</p>
                  <p className="text-xs sm:text-sm text-[#0A3428]/80 leading-relaxed">
                    Taxis, Grab, and private vehicles are welcome. The venue is easily accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


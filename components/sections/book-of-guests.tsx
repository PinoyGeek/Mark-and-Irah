"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import Image from "next/image"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-10 bg-[#DDD3CC] py-6 sm:py-12 md:py-16 lg:py-20 overflow-hidden isolate"
    >
      {/* Enhanced background elements - matching countdown section */}
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
            className="w-24 sm:w-40 md:w-52 lg:w-64 xl:w-80 h-auto opacity-60 sm:opacity-75 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-24 sm:w-40 md:w-52 lg:w-64 xl:w-80 h-auto opacity-60 sm:opacity-75"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-24 sm:w-40 md:w-52 lg:w-64 xl:w-80 h-auto opacity-60 sm:opacity-75 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-24 sm:w-40 md:w-52 lg:w-64 xl:w-80 h-auto opacity-60 sm:opacity-75 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#A78256]/20" />
      </div>

      {/* Section Header */}
      <div className="relative text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <div className="w-6 sm:w-8 md:w-12 h-px bg-[#A78256]/40" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#A78256] mb-1 sm:mb-2 drop-shadow-lg">
          Book of Guests
        </h2>
        
        <p className="text-[10px] sm:text-xs md:text-sm text-[#B28383] font-light max-w-xl mx-auto leading-snug px-2">
          See who's celebrating with us on our special day
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md border-2 border-[#A78256]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-[0_8px_32px_rgba(167,130,86,0.12)] overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-[#A78256] p-1.5 sm:p-2 rounded-full shadow-lg">
                    <Heart className="text-white h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-bold text-[#A78256]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#B28383]/80 font-sans mt-0.5">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-[#B28383] font-sans leading-snug">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md border-2 border-[#A78256]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_8px_32px_rgba(167,130,86,0.12)] overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-[#A78256]" />
                  <span className="text-[#B28383] font-sans text-sm sm:text-base">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 mx-auto mb-3" />
                  <p className="text-red-500 font-sans text-sm sm:text-base mb-2">{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center">
                  <div className="bg-[#A78256] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-sans font-bold text-[#A78256] mb-2">
                    No guests have RSVP'd yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B28383] font-sans max-w-md mx-auto leading-snug">
                    Be the first to RSVP and kick off the celebration!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 relative">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg p-2.5 sm:p-3 md:p-4 border-2 border-[#C2D3C3]/30 hover:border-[#A78256]/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(167,130,86,0.15)]"
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {/* Avatar */}
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-[#A78256] text-white flex items-center justify-center font-semibold shadow-md ring-2 ring-[#EDD6AC]/50 text-[10px] sm:text-xs md:text-sm">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans text-sm sm:text-base md:text-lg font-semibold text-[#A78256] mb-0.5 group-hover:text-[#B28383] transition-colors duration-200 truncate">
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-[10px] sm:text-xs text-[#B28383]/80">
                                <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-[#A78256] flex-shrink-0" />
                                <span className="font-sans break-all truncate">{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge */}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#A78256] flex-shrink-0" />
                            <span className="inline-flex items-center justify-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#A78256]/10 text-[#A78256] rounded-full text-[10px] sm:text-xs font-semibold border border-[#A78256]/30 whitespace-nowrap">
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message */}
                        {guest.Message && (
                          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#C2D3C3]/30">
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#A78256] flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] sm:text-xs md:text-sm text-[#B28383] font-sans leading-snug italic flex-1">
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

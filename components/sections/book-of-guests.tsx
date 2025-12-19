"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface Guest {
  id: string | number
  name: string
  role: string
  email?: string
  contact?: string
  message?: string
  allowedGuests: number
  companions: { name: string; relationship: string }[]
  tableNumber: string
  isVip: boolean
  status: 'pending' | 'confirmed' | 'declined' | 'request'
  addedBy?: string
  createdAt?: string
  updatedAt?: string
}

export function BookOfGuests() {
  const [totalGuests, setTotalGuests] = useState(0)
  const [rsvpCount, setRsvpCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [previousTotal, setPreviousTotal] = useState(0)
  const [showIncrease, setShowIncrease] = useState(false)

  const fetchGuests = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true)
    
    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only confirmed/attending guests
      const attendingGuests = data.filter((guest) => guest.status === "confirmed")
      
      // Calculate total guests by summing allowedGuests for each confirmed guest
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        return sum + (guest.allowedGuests || 1)
      }, 0)
      
      // Show increase animation if count went up
      if (totalGuestCount > totalGuests && totalGuests > 0) {
        setPreviousTotal(totalGuests)
        setShowIncrease(true)
        setTimeout(() => setShowIncrease(false), 2000)
      }
      
      setTotalGuests(totalGuestCount)
      setRsvpCount(attendingGuests.length)
      setLastUpdate(new Date())
    } catch (error: any) {
      console.error("Failed to load guests:", error)
    } finally {
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500)
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up automatic polling every 30 seconds for real-time updates
    const pollInterval = setInterval(() => {
      fetchGuests()
    }, 30000) // 30 seconds

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests(true)
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      clearInterval(pollInterval)
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [totalGuests])

  return (
    <div
      id="guests"
      className="relative z-10 bg-[#D2A4A4] py-6 sm:py-12 md:py-16 lg:py-20 overflow-hidden isolate"
    >
      {/* Background elements with elegant sage green motif (aligned with narrative section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical sage gradients to frame the guest book */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#D3B9A2]/92 via-[#D2A4A4]/78 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#D3B9A2]/95 via-[#D2A4A4]/72 to-transparent" />
        {/* Soft radial light in warm neutrals */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.28),transparent_55%)] opacity-90" />
        {/* Subtle diagonal wash of muted sage */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6E7A61]/24 via-transparent to-[#F7E6CA]/12 mix-blend-soft-light" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
        >
          Our Cherished Guests
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.9)" }}
        >
          Book of Guests
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/95 font-light max-w-xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-5`}>
          See who&apos;s celebrating with us on our special day.
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-[#E9D5C3] to-transparent" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#F7E6CA]/90 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/85 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#F7E6CA]/90 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-l from-transparent via-[#E9D5C3] to-transparent" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-[#F7F5F1]/95 backdrop-blur-md border border-[#F7E6CA]/80 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              
              {/* Refresh button */}
              <button
                onClick={() => fetchGuests(true)}
                disabled={isRefreshing}
                className="absolute top-3 right-3 p-2 rounded-full bg-[#D2A4A4]/20 hover:bg-[#D2A4A4]/40 transition-all duration-300 disabled:opacity-50 group"
                title="Refresh counts"
              >
                <RefreshCw className={`h-4 w-4 text-[#6B5335] transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} duration-500`} />
              </button>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <div className="bg-gradient-to-br from-[#D2A4A4] to-[#B88A8A] p-2 sm:p-2.5 rounded-full shadow-lg border-2 border-[#F7E6CA]/80">
                    <Heart className="text-white h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-white" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    {/* Total Guests Count - Large and prominent */}
                    <div className="flex items-center gap-2">
                      <h3 className={`${cormorant.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#243127] transition-all duration-500 ${showIncrease ? 'scale-110 text-green-600' : ''}`}>
                        {totalGuests}
                      </h3>
                      {showIncrease && (
                        <div className="flex items-center gap-1 text-green-600 animate-bounce">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-sm sm:text-base font-bold">+{totalGuests - previousTotal}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={`${cormorant.className} text-sm sm:text-base md:text-lg font-medium text-[#556457] mt-1`}>
                      {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </p>
                    
                    {/* RSVP Entries Count */}
                    <div className="mt-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#D2A4A4]/20 rounded-full">
                      <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#6B5335] font-semibold`}>
                        {rsvpCount} {rsvpCount === 1 ? "RSVP Entry" : "RSVP Entries"}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-3 sm:my-4">
                  <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D2A4A4] to-transparent" />
                  <Heart className="h-2 w-2 sm:h-3 sm:w-3 text-[#D2A4A4] fill-[#D2A4A4]" />
                  <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#D2A4A4] to-transparent" />
                </div>
                
                {/* Message */}
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#37413A] leading-relaxed max-w-lg mx-auto`}>
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
                
                {/* Last updated timestamp */}
                <p className={`${cormorant.className} text-[10px] sm:text-xs text-[#6B7280] mt-3 flex items-center justify-center gap-1.5`}>
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live • Updated {new Date(lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

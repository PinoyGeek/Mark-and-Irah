"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/section"
import { Loader2, Mail, Calendar, MessageSquare, Heart, Sparkles, Star } from "lucide-react"

type GuestEntry = {
  timestamp: string
  name: string
  email: string
  guests: string
  message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<GuestEntry[]>([])
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
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw_peHqEVKLefWB-z6GtLunk-zoQhJCYLx-eshuZhHaYsL0HeBCy9PKXyiy72IT9qPx/exec",
        { cache: "no-store" }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data = await response.json()

      if (!data || !data.GoogleSheetData) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const rows: string[][] = data.GoogleSheetData
      if (!Array.isArray(rows) || rows.length <= 1) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const header = rows[0]
      const entries = rows.slice(1)

      const guestEntries: GuestEntry[] = entries.map((row) => {
        const rowObj: Record<string, string> = {}
        header.forEach((col, i) => {
          rowObj[col] = row[i] || ""
        })
        return {
          timestamp: rowObj["Timestamp"] || new Date().toISOString(),
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || "",
          guests: rowObj["Number Of Guests"] || "1",
          message: rowObj["Message"] || "",
        }
      })

      setGuests(guestEntries)
      setTotalGuests(guestEntries.reduce((sum, entry) => sum + parseInt(entry.guests), 0))
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <Section id="guests" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#9CAF88] via-[#9CAF88] to-[#8a9a73]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Enhanced title section */}
      <div className="relative z-10 text-center mb-8 md:mb-20">
        <div className="inline-flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
          <Sparkles className="text-white/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" />
          <span className="text-white/80 font-lora text-xs md:text-sm uppercase tracking-wider">Guest Registry</span>
          <Sparkles className="text-white/80 h-3 w-3 md:h-6 md:w-6 animate-pulse delay-500" />
        </div>
        <h2 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-3 md:mb-6 text-balance drop-shadow-2xl">
          Book of Guests
        </h2>
        <p className="text-sm md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Enhanced guests content */}
      <div className="relative z-10">
        {/* Premium stats card */}
        <div className="text-center mb-4 sm:mb-12 px-4 sm:px-0">
          <div className="relative bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-8 md:p-10 border border-white/30 shadow-2xl max-w-3xl mx-auto">

            
            <div className="flex items-center justify-center gap-1 md:gap-3 mb-2 md:mb-4">
              <div className="bg-gradient-to-r from-[#593163] to-[#593163]/80 p-1 md:p-3 rounded-full shadow-lg">
                <Heart className="text-white h-3 w-3 md:h-6 md:w-6" />
              </div>
              <h3 className="text-sm sm:text-2xl md:text-3xl font-playfair font-bold text-[#593163]">
                {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
              </h3>
            </div>
            <p className="text-xs sm:text-base md:text-lg text-gray-600 font-lora leading-relaxed">
              Thank you to everyone who has RSVP'd! We can't wait to celebrate with you.
            </p>
          </div>
        </div>

        {/* Enhanced guest list container */}
        <div className="max-w-5xl mx-auto px-2 sm:px-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-8 md:p-10 shadow-2xl border border-white/30">
            {isLoading ? (
              <div className="flex items-center justify-center h-24 sm:h-48">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="relative">
                    <Loader2 className="h-6 w-6 md:h-10 md:w-10 animate-spin text-[#593163]" />
                    <div className="absolute inset-0 h-6 w-6 md:h-10 md:w-10 animate-ping rounded-full bg-[#593163]/20"></div>
                  </div>
                  <span className="text-[#593163] font-lora text-xs md:text-lg font-medium">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-24 sm:h-48 text-red-500">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                  <div className="bg-red-100 p-2 md:p-4 rounded-full">
                    <MessageSquare className="h-5 w-5 md:h-8 md:w-8 text-red-500" />
                  </div>
                  <span className="font-lora text-xs md:text-lg">{error}</span>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-10 sm:py-16">
                <div className="relative text-center bg-gradient-to-br from-[#593163] to-[#593163]/90 rounded-2xl px-6 sm:px-10 py-8 sm:py-12 shadow-2xl border border-white/20 max-w-xl w-full">
                  {/* Decorative glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-xl opacity-30 pointer-events-none" />
                  <div className="relative">
                    <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-60" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 flex items-center justify-center shadow-lg">
                        <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-playfair font-bold text-white mb-2 sm:mb-3">
                      No guests have RSVP'd yet
                    </h3>
                    <p className="text-xs sm:text-base text-white/90 font-lora max-w-md mx-auto leading-relaxed">
                      Be the first to RSVP and kick off the celebration!
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center">
                      <div className="inline-flex items-center gap-2 bg-white text-[#593163] rounded-full px-3 sm:px-5 py-1.5 sm:py-2 shadow-md">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs sm:text-sm font-lora">Use the RSVP form above</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-6">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className={`group relative p-2 sm:p-6 rounded-md sm:rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5 ring-1 ring-[#593163]/10 ${
                      index % 2 === 0 
                        ? "bg-gradient-to-r from-[#593163]/5 to-white border border-[#593163]/20" 
                        : "bg-gradient-to-r from-white to-[#593163]/5 border border-[#593163]/20"
                    } hover:border-[#593163]/40 group-hover:ring-2 group-hover:ring-[#593163]/30`}
                  >
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#593163] to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex flex-col gap-2 sm:gap-4">
                      {/* Header section */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-1 sm:gap-3">
                            <div className="relative">
                              <div className="h-6 w-6 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-[#593163] to-[#8b5da8] text-white flex items-center justify-center font-semibold shadow-lg ring-2 ring-white text-xs sm:text-base">
                                {getInitials(guest.name)}
                              </div>
                              <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#593163]/40 to-transparent blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-lora text-gray-800 text-sm sm:text-xl font-semibold leading-tight">
                                {guest.name}
                              </h4>
                              <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                                <Mail className="h-2 w-2 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[#593163] flex-shrink-0" />
                                <span className="font-lora break-all truncate text-xs sm:text-sm">{guest.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-[#593163] to-[#593163]/90 text-white font-lora px-2 sm:px-4 py-0.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg self-start sm:self-auto">
                          {guest.guests} {parseInt(guest.guests) === 1 ? "Guest" : "Guests"}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-[#593163]/20 to-transparent" />

                      {/* Premium message section */}
                      {guest.message && (
                        <div className="relative">
                          <div className="bg-gradient-to-r from-[#593163]/10 to-[#593163]/5 rounded-md sm:rounded-xl p-2 sm:p-4 border-l-2 sm:border-l-4 border-[#593163]">
                            <div className="flex items-start gap-1 sm:gap-3">
                              <div className="bg-[#593163] p-0.5 sm:p-2 rounded-full flex-shrink-0">
                                <MessageSquare className="h-2 w-2 sm:h-4 sm:w-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs sm:text-base text-gray-700 font-lora leading-relaxed italic">
                                  "{guest.message}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer with timestamp */}
                      <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500 flex items-center gap-0.5 sm:gap-2">
                          <Calendar className="h-2 w-2 sm:h-3 sm:w-3 text-[#593163]" />
                          <span className="font-lora text-xs">RSVP'd on {formatDate(guest.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500 font-lora">Guest #{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

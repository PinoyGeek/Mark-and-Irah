"use client"

import React from "react"
import { useEffect, useMemo, useState, useRef } from "react"
import { Section } from "@/components/section"
import { Loader2, Users } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`relative ${cormorant.className} text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold uppercase text-[#F5E5D9]/90 mb-1.5 sm:mb-2 md:mb-3 tracking-[0.1em] sm:tracking-[0.15em] ${textAlign} ${className} transition-all duration-300`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`relative flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2.5 w-full group/item transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03]`}>
        {/* Hover highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDECEF]/0 via-[#FDECEF]/10 to-[#FDECEF]/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-md" />
        
        <p className={`relative text-white text-[11px] sm:text-[13px] md:text-sm lg:text-base font-semibold leading-snug break-words ${textAlign} group-hover/item:text-[#FDECEF] transition-all duration-300`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <div ref={sectionRef}>
      <Section
        id="sponsors"
        className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#660033]"
      >
      {/* Background elements with burgundy motif (same as details section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#1A0010]/80 via-[#660033]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1A0010]/85 via-[#660033]/55 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(253,236,239,0.16),transparent_55%)] opacity-80" />
      </div>

      {/* Section Header */}
      <div className={`relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#FDECEF]/85 mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Our Beloved Godparents
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Principal Sponsors
        </h2>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* Sponsors content */}
      <div className={`relative z-30 max-w-4xl mx-auto px-3 sm:px-5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Card with burgundy theme - matching details section */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-[#FDECEF]/25 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 group">
          {/* Card content */}
          <div className="relative p-3 sm:p-6 md:p-8 z-10">
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-white/70" />
                    <span className="text-white/80 font-serif text-base sm:text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                  <div className="text-center">
                    <p className="text-red-300 font-serif text-base sm:text-lg mb-3">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-white/90 hover:text-white font-serif underline transition-colors duration-200"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-24 sm:py-28 md:py-32">
                  <Users className="h-14 w-14 sm:h-16 sm:w-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60 font-serif text-base sm:text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-1.5 sm:mb-2 md:mb-3">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </Section>
    </div>
  )
}
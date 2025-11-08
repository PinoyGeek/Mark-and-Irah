"use client"

import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[18px] sm:text-base md:text-lg lg:text-xl font-serif font-semibold text-[#0A3428] mb-2 sm:mb-2.5 md:mb-3 text-center tracking-wide">
      {children}
    </h3>
  )

  // Helper component for name items
  const NameItem = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center py-1 sm:py-1.5 md:py-2 px-1 sm:px-1.5 w-full min-h-[2.5rem] sm:min-h-[3rem]">
      <p className="text-[#0A3428] text-xs sm:text-sm md:text-base font-light text-center leading-tight break-words">{name}</p>
    </div>
  )

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

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#0A3428] via-[#106552]/90 to-[#0A3428] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#C3A161]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#C3A161]/5 to-transparent" />
        
        {/* Bottom-left flower decoration */}
        <img
          src="/decoration/left-bottom-left-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none"
        />
        
        {/* Bottom-right flower decoration */}
        <img
          src="/decoration/left-bottom-left-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none scale-x-[-1]"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#FFFFFF] mb-3 sm:mb-4 text-balance">
          Principal Sponsors
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#C3A161] mb-3 sm:mb-4">
          Our Beloved Godparents
        </h3>
      </div>

      {/* Sponsors content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* White card with elegant border */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#C3A161]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 border border-[#C3A161] rounded-lg sm:rounded-xl pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#C3A161]/30 border-t-[#C3A161] rounded-full animate-spin" />
                    <span className="text-[#0A3428] font-serif text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#0A3428] hover:text-[#106552] font-serif underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-[#0A3428] font-serif text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-5 sm:mb-6 md:mb-8">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 mb-3 sm:mb-4 md:mb-6">
                    <SectionTitle>Male Principal Sponsors</SectionTitle>
                    <SectionTitle>Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 items-stretch">
                    {sponsorPairs.flatMap((pair, idx) => [
                      <div 
                        key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`}
                        className="bg-[#C3A161]/10 hover:bg-[#C3A161]/20 rounded-lg transition-all duration-300 border border-[#C3A161]/30 hover:border-[#C3A161]/50 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center w-full"
                      >
                        {pair.MalePrincipalSponsor ? (
                          <NameItem name={pair.MalePrincipalSponsor} />
                        ) : (
                          <div className="py-1 sm:py-1.5 md:py-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center w-full">
                            <p className="text-[#0A3428]/30 text-[10px] sm:text-xs">—</p>
                          </div>
                        )}
                      </div>,
                      <div 
                        key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`}
                        className="bg-[#C3A161]/10 hover:bg-[#C3A161]/20 rounded-lg transition-all duration-300 border border-[#C3A161]/30 hover:border-[#C3A161]/50 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center w-full"
                      >
                        {pair.FemalePrincipalSponsor ? (
                          <NameItem name={pair.FemalePrincipalSponsor} />
                        ) : (
                          <div className="py-1 sm:py-1.5 md:py-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center w-full">
                            <p className="text-[#0A3428]/30 text-[10px] sm:text-xs">—</p>
                          </div>
                        )}
                      </div>
                    ])}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

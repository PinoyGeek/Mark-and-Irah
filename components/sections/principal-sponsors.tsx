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
    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-[#666956] mb-3 sm:mb-4 text-center tracking-wide">
      {children}
    </h3>
  )

  // Helper component for name items
  const NameItem = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center py-2.5 sm:py-3 px-2">
      <p className="text-[#666956] text-sm sm:text-base font-light text-center leading-relaxed">{name}</p>
    </div>
  )

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 mb-4 sm:mb-5">
          {leftTitle && (
            <SectionTitle>{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle>{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
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

  // Split columns
  const maleSponsors = useMemo(() => sponsors.map((s) => s.MalePrincipalSponsor).filter(Boolean), [sponsors])
  const femaleSponsors = useMemo(() => sponsors.map((s) => s.FemalePrincipalSponsor).filter(Boolean), [sponsors])

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
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

      {/* Custom larger title */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
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
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-[#FFE5E4] mb-4 sm:mb-6 text-balance drop-shadow-lg relative px-2">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4]">Principal Sponsors</span>
          {/* Text glow effect */}
          <span className="absolute inset-0 text-[#EFBFBB]/25 blur-2xl -z-10">Principal Sponsors</span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-[#FFE5E4]/95 font-sans font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
          Our Beloved Godparents
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* Sponsors content */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div className="flex justify-center px-2 sm:px-4">
          <div className="max-w-6xl w-full">
            {/* Enhanced sponsors container */}
            <div className="relative">
              {/* Multiple layered glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 rounded-3xl blur-md opacity-50 animate-pulse" />

              {/* Enhanced decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main sponsors card with enhanced multi-layer styling */}
              <div className="relative bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/25 to-[#FFE5E4] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/50 shadow-[0_8px_32px_rgba(102,105,86,0.25),0_0_0_1px_rgba(176,137,129,0.15)]">
                
                {/* Inner decorative border with gradient */}
                <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
                
                {/* Additional inner glow */}
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />
                
                {/* Sponsors content */}
                <div className="relative z-10 w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12 sm:py-16">
                      <div className="w-12 h-12 border-4 border-[#B08981]/30 border-t-[#B08981] rounded-full animate-spin" />
                      <p className="ml-4 text-[#666956] font-serif text-base sm:text-lg">Loading sponsors...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 sm:py-16">
                      <p className="text-red-400 font-serif mb-4">{error}</p>
                      <button 
                        onClick={fetchSponsors} 
                        className="px-6 py-2.5 bg-gradient-to-r from-[#666956] to-[#8D8E7C] hover:from-[#8D8E7C] hover:to-[#666956] text-[#FFE5E4] rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    <TwoColumnLayout leftTitle="Male Principal Sponsors" rightTitle="Female Principal Sponsors">
                      <div className="space-y-2">
                        {maleSponsors.length === 0 ? (
                          <div className="py-3 sm:py-4">
                            <p className="text-[#666956]/70 text-sm text-center">No entries</p>
                          </div>
                        ) : (
                          maleSponsors.map((name, idx) => (
                            <div key={idx} className="bg-white/40 hover:bg-white/60 rounded-lg transition-all duration-300 border border-[#B08981]/30 hover:border-[#B08981]/50">
                              <NameItem name={name} />
                            </div>
                          ))
                        )}
                      </div>
                      <div className="space-y-2">
                        {femaleSponsors.length === 0 ? (
                          <div className="py-3 sm:py-4">
                            <p className="text-[#666956]/70 text-sm text-center">No entries</p>
                          </div>
                        ) : (
                          femaleSponsors.map((name, idx) => (
                            <div key={idx} className="bg-white/40 hover:bg-white/60 rounded-lg transition-all duration-300 border border-[#B08981]/30 hover:border-[#B08981]/50">
                              <NameItem name={name} />
                            </div>
                          ))
                        )}
                      </div>
                    </TwoColumnLayout>
                  )}
                </div>
                
                {/* Enhanced decorative sparkle effects */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

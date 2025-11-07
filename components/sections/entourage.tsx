"use client"

import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid/Matron of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Bridesmaids",
  "Groomsmen",
  "Flower Girls",
  "Ring/Coin Bearers",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#8B4A6B] mb-3 sm:mb-4 md:mb-6 text-center tracking-wide">
      {children}
    </h3>
  )

  // Helper component for name items with role title
  const NameItem = ({ member }: { member: EntourageMember }) => (
    <div className="flex flex-col items-center justify-center py-1 sm:py-1.5 md:py-2">
      <p className="text-[#2D1B1E] text-xs sm:text-sm md:text-base font-medium text-center">{member.Name}</p>
      {member.RoleTitle && (
        <p className="text-[#5D4A4E] text-[9px] sm:text-[10px] md:text-xs font-light text-center mt-0.5">{member.RoleTitle}</p>
      )}
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
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 mb-3 sm:mb-4 md:mb-6">
          {leftTitle && (
            <SectionTitle>{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle>{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden bg-gradient-to-b from-[#FFE5E4]/90 via-[#FFD6D4]/85 to-[#FFE5E4]/90"
    >
      {/* Floral watercolor background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft floral watercolor effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFB6C1]/20 via-[#FFC0CB]/15 to-[#FFB6C1]/20" />
        
        {/* Floral clusters positioned like the invitation */}
        {/* Top right cluster */}
        <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[28rem] h-64 sm:h-80 md:h-96 lg:h-[28rem] opacity-60">
          <div className="absolute top-8 right-8 w-32 h-32 bg-[#FFB6C1]/30 rounded-full blur-2xl" />
          <div className="absolute top-16 right-16 w-24 h-24 bg-[#FFC0CB]/25 rounded-full blur-xl" />
          <div className="absolute top-24 right-24 w-20 h-20 bg-[#FF69B4]/20 rounded-full blur-lg" />
        </div>
        
        {/* Bottom left cluster */}
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 lg:w-[28rem] h-64 sm:h-80 md:h-96 lg:h-[28rem] opacity-60">
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-[#FFB6C1]/30 rounded-full blur-2xl" />
          <div className="absolute bottom-16 left-16 w-24 h-24 bg-[#FFC0CB]/25 rounded-full blur-xl" />
          <div className="absolute bottom-24 left-24 w-20 h-20 bg-[#FF69B4]/20 rounded-full blur-lg" />
        </div>
        
        {/* Scattered smaller flowers */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#FFC0CB]/20 rounded-full blur-lg" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-[#FFB6C1]/25 rounded-full blur-md" />
        <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-[#FF69B4]/15 rounded-full blur-md" />
        <div className="absolute bottom-1/4 right-1/4 w-18 h-18 bg-[#FFC0CB]/20 rounded-full blur-lg" />
        
        {/* Decorative corner images with floral styling */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70 select-none transform scale-x-[-1]"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70 rotate-180 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70 rotate-180 transform scale-x-[-1] select-none"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#8B4A6B] mb-4 text-balance drop-shadow-lg">
          Wedding Entourage
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#A66B7A] mb-3 sm:mb-4">
          Organizational Chart
        </h3>
      </div>

      {/* Central Card Container - like the invitation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* White card with pink border */}
        <div className="relative bg-white border-2 border-[#FF69B4] rounded-lg shadow-2xl overflow-hidden">
          {/* Card content */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-[#8B4A6B]" />
                  <span className="text-[#8B4A6B] font-serif text-lg">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <p className="text-red-500 font-serif text-lg mb-2">{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className="text-[#8B4A6B] hover:text-[#A66B7A] font-serif underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-24">
                <Users className="h-16 w-16 text-[#8B4A6B]/50 mx-auto mb-4" />
                <p className="text-[#8B4A6B] font-serif text-lg">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                          <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#FFB6C1]/60 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-[#A66B7A] text-[9px] sm:text-[10px] md:text-xs mb-0.5 font-light text-center">Groom</p>
                          {groom && (
                            <p className="text-[#2D1B1E] text-xs sm:text-sm md:text-base font-medium text-center">{groom.Name}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-[#A66B7A] text-[9px] sm:text-[10px] md:text-xs mb-0.5 font-light text-center">Bride</p>
                          {bride && (
                            <p className="text-[#2D1B1E] text-xs sm:text-sm md:text-base font-medium text-center">{bride.Name}</p>
                          )}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Groom" rightTitle="Parents of the Bride">
                          <div className="space-y-2 sm:space-y-3">
                            {sortParents(parentsGroom).map((member, idx) => (
                              <NameItem key={`groom-parent-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {sortParents(parentsBride).map((member, idx) => (
                              <NameItem key={`bride-parent-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Best Man")
                  if (category === "Best Man") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid/Matron of Honor">
                          <div className="space-y-2 sm:space-y-3">
                            {bestMan.map((member, idx) => (
                              <NameItem key={`bestman-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {maidOfHonor.map((member, idx) => (
                              <NameItem key={`maid-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Bridesmaids" rightTitle="Groomsmen">
                          <div className="space-y-2 sm:space-y-3">
                            {bridesmaids.map((member, idx) => (
                              <NameItem key={`bridesmaid-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {groomsmen.map((member, idx) => (
                              <NameItem key={`groomsman-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          <div className="space-y-2 sm:space-y-3">
                            {candleSponsors.map((member, idx) => (
                              <NameItem key={`candle-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {veilSponsors.map((member, idx) => (
                              <NameItem key={`veil-${idx}-${member.Name}`} member={member} />
                            ))}
                          </div>
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                        <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={`${category}-${idx}-${member.Name}`}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-3 sm:py-4 mb-5 sm:mb-6 md:mb-8">
                      <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-[#FFB6C1]/60 to-transparent"></div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {members.map((member, idx) => (
                        <div key={`${category}-${idx}-${member.Name}`}>
                          <NameItem member={member} />
                        </div>
                      ))}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

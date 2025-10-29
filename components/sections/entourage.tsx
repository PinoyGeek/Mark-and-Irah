"use client"

import { entourage } from "@/content/site"
import { Heart, Users, Flower2, Crown, Sparkles } from "lucide-react"


interface EntourageRole {
  title: string
  subtitle: string
  layout: "single" | "two-column" | "centered"
  roles: string[]
  icon?: React.ReactNode
}

export function Entourage() {
  const roleCategories: EntourageRole[] = [
    {
      title: "KATE'S PARENTS",
      subtitle: "",
      layout: "centered",
      roles: ["Father", "Mother"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "CHRISTIAN'S PARENTS",
      subtitle: "",
      layout: "centered",
      roles: ["Mother", "Brother", "Sister"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO ASSIST US IN OUR NEEDS",
      subtitle: "Best Man, Maid of Honor, Matron of Honor",
      layout: "two-column",
      roles: ["Best Man", "Maid of Honor", "Matron of Honor"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO CLOTH US AS ONE",
      subtitle: "Clothing sponsors",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO BIND US TOGETHER",
      subtitle: "Binding sponsors",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO LIGHT OUR PATH",
      subtitle: "Path sponsors",
      layout: "centered",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "TO LIGHT OUR UNITY",
      subtitle: "Candle sponsors",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "TO VEIL US AS ONE",
      subtitle: "Veil sponsors",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO GUIDE US IN OUR WAY",
      subtitle: "Groomsmen and Bridesmaids",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO UNITE US WITH LOVE",
      subtitle: "Cord sponsors",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF LOVE",
      subtitle: "Ring Bearer",
      layout: "centered",
      roles: ["Ring Bearer"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF FAITH",
      subtitle: "Bible Bearer",
      layout: "centered",
      roles: ["Bible Bearer"],
      icon: <Crown className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF TREASURES",
      subtitle: "Coin Bearer",
      layout: "centered",
      roles: ["Coin Bearer"],
      icon: <Crown className="w-5 h-5" />,
    },
    {
      title: "TO SHOWER OUR AISLE WITH FLOWERS",
      subtitle: "Flower Girls",
      layout: "centered",
      roles: ["Flower Girl"],
      icon: <Flower2 className="w-5 h-5" />,
    },
    {
      title: "Little Groom & Little Bride",
      subtitle: "Our little ones",
      layout: "two-column",
      roles: ["Little Groom", "Little Bride"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "Little Wedding Party",
      subtitle: "Our little wedding party",
      layout: "two-column",
      roles: ["Little Groomsman", "Little Bridesmaid"],
      icon: <Sparkles className="w-5 h-5" />,
    },
  ]

  const categoryGroupMap: Record<string, string | undefined> = {
    "KATE'S PARENTS": "kate-family",
    "CHRISTIAN'S PARENTS": "christian-family",
    "TO CLOTH US AS ONE": "clothing",
    "TO BIND US TOGETHER": "binding",
    "TO LIGHT OUR PATH": "path",
    "TO LIGHT OUR UNITY": "candle",
    "TO VEIL US AS ONE": "veil",
    "TO GUIDE US IN OUR WAY": "", // Empty string means no group filter
    "TO UNITE US WITH LOVE": "cord",
  }

  const getMembersByRole = (roleNames: string[], categoryTitle?: string) => {
    const group = categoryGroupMap[categoryTitle ?? ""]
    return entourage.filter((member) => {
      const roleMatch = roleNames.includes(member.role)
      if (group === "") return roleMatch && !member.group
      if (!group) return roleMatch && !member.group
      return roleMatch && member.group === group
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Best Man":
      case "Maid of Honor":
      case "Matron of Honor":
        return <Heart className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Groomsman":
      case "Bridesmaid":
        return <Users className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Usher":
      case "Usherette":
        return <Users className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Ring Bearer":
        return <Heart className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Bible Bearer":
      case "Coin Bearer":
        return <Crown className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Flower Girl":
        return <Flower2 className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Little Groom":
      case "Little Bride":
        return <Heart className="w-4 h-4" style={{ color: '#525E2C' }} />
      case "Little Groomsman":
      case "Little Bridesmaid":
        return <Sparkles className="w-4 h-4" style={{ color: '#525E2C' }} />
      default:
        return <Users className="w-4 h-4" style={{ color: '#525E2C' }} />
    }
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
            Our Entourage
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
            The special people standing by our side
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 md:space-y-20 max-w-7xl mx-auto">
        {roleCategories
          .filter((c) => ![
            "TO CLOTH US AS ONE",
            "TO BIND US TOGETHER",
            "TO LIGHT OUR PATH",
          ].includes(c.title))
          .map((category, idx) => {
          const members = getMembersByRole(category.roles, category.title)
          if (members.length === 0) return null

          return (
            <div key={idx} className="group">
              {/* Category Header */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-primary/20 mb-3 sm:mb-4 group-hover:border-primary/40 transition-all duration-300">
                  {category.icon && (
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  )}
                  <h3 className="font-cursive text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>
                {category.subtitle && (
                  <p className="text-xs sm:text-sm text-white italic">
                    {category.subtitle}
                  </p>
                )}
              </div>

              {/* Members Container */}
              <div className="relative">
                {category.layout === "centered" && (
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                    {members.map((member, i) => (
                      <div
                        key={i}
                        className="group/member relative bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-primary/30 shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] min-w-[180px] sm:min-w-[200px]"
                      >
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <div className="group-hover/member:scale-110 transition-transform duration-300">
                            {getRoleIcon(member.role)}
                          </div>
                          <div className="text-center">
                            <p className="font-inter font-semibold text-foreground text-sm sm:text-base group-hover/member:text-primary transition-colors duration-300">
                              {member.name}
                            </p>
                            <p className="font-inter text-xs text-muted-foreground mt-1">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {category.layout === "two-column" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Check if we should split by role (Groomsman/Bridesmaid) */}
                    {category.roles.includes("Groomsman") && category.roles.includes("Bridesmaid") ? (
                      <>
                        {/* Left column - Groomsmen */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="mb-2 sm:mb-3 text-center md:text-left">
                            <h4 className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider">
                              GROOMSMEN
                            </h4>
                          </div>
                          {members.filter(m => m.role === "Groomsman").map((member, i) => (
                            <div
                              key={i}
                              className="group/member bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-primary/30 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="group-hover/member:scale-110 transition-transform duration-300">
                                  {getRoleIcon(member.role)}
                                </div>
                                <div>
                                  <p className="font-inter font-semibold text-foreground text-sm sm:text-base group-hover/member:text-primary transition-colors duration-300">
                                    {member.name}
                                  </p>
                                  <p className="font-inter text-xs text-muted-foreground mt-1">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Right column - Bridesmaids */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="mb-2 sm:mb-3 text-center md:text-left">
                            <h4 className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider">
                              BRIDESMAIDS
                            </h4>
                          </div>
                          {members.filter(m => m.role === "Bridesmaid").map((member, i) => (
                            <div
                              key={i}
                              className="group/member bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-secondary/30 shadow-md hover:shadow-xl hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="group-hover/member:scale-110 transition-transform duration-300">
                                  {getRoleIcon(member.role)}
                                </div>
                                <div>
                                  <p className="font-inter font-semibold text-foreground text-sm sm:text-base group-hover/member:text-secondary transition-colors duration-300">
                                    {member.name}
                                  </p>
                                  <p className="font-inter text-xs text-muted-foreground mt-1">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left column - Generic split */}
                        <div className="space-y-2 sm:space-y-3">
                          {members.slice(0, Math.ceil(members.length / 2)).map((member, i) => (
                            <div
                              key={i}
                              className="group/member bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-primary/30 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="group-hover/member:scale-110 transition-transform duration-300">
                                  {getRoleIcon(member.role)}
                                </div>
                                <div>
                                  <p className="font-inter font-semibold text-foreground text-sm sm:text-base group-hover/member:text-primary transition-colors duration-300">
                                    {member.name}
                                  </p>
                                  <p className="font-inter text-xs text-muted-foreground mt-1">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Right column */}
                        {members.length > 1 && (
                          <div className="space-y-2 sm:space-y-3">
                            {members.slice(Math.ceil(members.length / 2)).map((member, i) => (
                              <div
                                key={i}
                                className="group/member bg-white/90 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-secondary/30 shadow-md hover:shadow-xl hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="group-hover/member:scale-110 transition-transform duration-300">
                                    {getRoleIcon(member.role)}
                                  </div>
                                  <div>
                                    <p className="font-inter font-semibold text-foreground text-sm sm:text-base group-hover/member:text-secondary transition-colors duration-300">
                                      {member.name}
                                    </p>
                                    <p className="font-inter text-xs text-muted-foreground mt-1">
                                      {member.role}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative divider */}
              {idx < roleCategories.length - 1 && (
                <div className="flex justify-center pt-6 sm:pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}

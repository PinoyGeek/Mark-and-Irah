"use client"

import { entourage } from "@/content/site"
import { Heart, Users, Flower2, Crown, Sparkles } from "lucide-react"
import dynamic from "next/dynamic"


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
      title: "TO ASSIST US IN OUR NEEDS",
      subtitle: "Our closest friends and confidants",
      layout: "two-column",
      roles: ["Best Man", "Maid of Honor"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO CLOTH US AS ONE",
      subtitle: "Our wedding party",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO BIND US TOGETHER",
      subtitle: "Our wedding party",
      layout: "two-column",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO LIGHT OUR PATH",
      subtitle: "Our wedding party",
      layout: "centered",
      roles: ["Groomsman", "Bridesmaid"],
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "TO GUIDE US IN OUR WAY",
      subtitle: "Our ushers and usherettes",
      layout: "two-column",
      roles: ["Usher", "Usherette"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF LOVE",
      subtitle: "Our ring bearer",
      layout: "centered",
      roles: ["Ring Bearer"],
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF FAITH",
      subtitle: "Our bible bearer",
      layout: "centered",
      roles: ["Bible Bearer"],
      icon: <Crown className="w-5 h-5" />,
    },
    {
      title: "TO CARRY OUR SYMBOL OF TREASURES",
      subtitle: "Our coin bearer",
      layout: "centered",
      roles: ["Coin Bearer"],
      icon: <Crown className="w-5 h-5" />,
    },
    {
      title: "TO SHOWER OUR AISLE WITH FLOWERS",
      subtitle: "Our flower girls",
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

  const getMembersByRole = (roleNames: string[]) => {
    return entourage.filter((member) => roleNames.includes(member.role))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Best Man":
      case "Maid of Honor":
        return <Heart className="w-4 h-4" style={{ color: '#593163' }} />
      case "Groomsman":
      case "Bridesmaid":
        return <Users className="w-4 h-4" style={{ color: '#593163' }} />
      case "Usher":
      case "Usherette":
        return <Users className="w-4 h-4" style={{ color: '#593163' }} />
      case "Ring Bearer":
        return <Heart className="w-4 h-4" style={{ color: '#593163' }} />
      case "Bible Bearer":
      case "Coin Bearer":
        return <Crown className="w-4 h-4" style={{ color: '#593163' }} />
      case "Flower Girl":
        return <Flower2 className="w-4 h-4" style={{ color: '#593163' }} />
      case "Little Groom":
      case "Little Bride":
        return <Heart className="w-4 h-4" style={{ color: '#593163' }} />
      case "Little Groomsman":
      case "Little Bridesmaid":
        return <Sparkles className="w-4 h-4" style={{ color: '#593163' }} />
      default:
        return <Users className="w-4 h-4" style={{ color: '#593163' }} />
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
        {roleCategories.map((category, idx) => {
          const members = getMembersByRole(category.roles)
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
                        className="group/member relative bg-white/80 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 min-w-[180px] sm:min-w-[200px]"
                      >
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          {getRoleIcon(member.role)}
                          <div className="text-center">
                            <p className="font-inter font-semibold text-foreground text-sm sm:text-base">
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
                    {/* Left column */}
                    <div className="space-y-2 sm:space-y-3">
                      {members.slice(0, Math.ceil(members.length / 2)).map((member, i) => (
                        <div
                          key={i}
                          className="group/member bg-white/80 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-primary/20 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            {getRoleIcon(member.role)}
                            <div>
                              <p className="font-inter font-semibold text-foreground text-sm sm:text-base">
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
                            className="group/member bg-white/80 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-secondary/20 shadow-md hover:shadow-lg hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              {getRoleIcon(member.role)}
                              <div>
                                <p className="font-inter font-semibold text-foreground text-sm sm:text-base">
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

"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { Heart, Sparkles } from "lucide-react"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-[#751A2C] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(117,26,44,0.4)] border-b border-[#C3A161]/30' 
        : 'bg-[#751A2C]/95 backdrop-blur-lg border-b border-[#C3A161]/20'
    }`}>
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#C3A161]/10 via-[#106552]/5 to-[#C3A161]/10 pointer-events-none" />
      )}
      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A3428]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-12 sm:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 sm:gap-2.5 relative">
                {/* Decorative dots with gold accent */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#C3A161] to-[#FFFFFF] group-hover:shadow-[0_0_8px_rgba(195,161,97,0.8)]" />
                </div>
                
                <div className="relative">
                  <Heart
                    size={20}
                    className="sm:size-6 group-hover:fill-[#C3A161] group-hover:text-[#FFFFFF] group-active:scale-110 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] text-[#FFFFFF] group-hover:drop-shadow-[0_2px_12px_rgba(195,161,97,0.9)]"
                  />
                  {/* Enhanced sparkle effect with gold */}
                  <Sparkles 
                    size={10} 
                    className="absolute -top-1 -right-1 text-[#C3A161] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 drop-shadow-md group-hover:drop-shadow-[0_0_6px_rgba(195,161,97,0.8)]" 
                  />
                </div>
                
                <div className="text-base sm:text-2xl md:text-3xl font-serif font-bold group-hover:text-[#C3A161] group-active:text-[#C3A161] transition-all duration-500 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] text-[#FFFFFF] group-hover:drop-shadow-[0_2px_15px_rgba(195,161,97,0.6)]">
                  {siteConfig.couple.brideNickname} & {siteConfig.couple.groomNickname}
                </div>
                
                {/* Decorative dots with gold accent */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#C3A161] to-[#FFFFFF] group-hover:shadow-[0_0_8px_rgba(195,161,97,0.8)]" />
                </div>
              </div>
              <div className="text-[9px] sm:text-xs font-sans tracking-[0.15em] ml-6 sm:ml-8 group-hover:text-[#C3A161] group-hover:tracking-[0.2em] group-active:tracking-[0.2em] transition-all duration-500 font-light text-[#FFFFFF]/95 drop-shadow-md group-hover:drop-shadow-[0_2px_8px_rgba(195,161,97,0.5)]">
                {siteConfig.ceremony.date}
              </div>
            </div>
            
            {/* Enhanced decorative underline with gold gradient */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C3A161] via-[#FFFFFF] to-[#C3A161] group-hover:w-full transition-all duration-700 rounded-full group-hover:shadow-[0_0_8px_rgba(195,161,97,0.7)]" />
            
            {/* Subtle background glow on hover with green accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#106552]/0 via-[#C3A161]/10 to-[#106552]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
              className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-500 relative group drop-shadow-md ${
                    isActive 
                      ? 'text-[#FFFFFF] bg-gradient-to-br from-[#C3A161]/30 via-[#106552]/20 to-[#C3A161]/25 backdrop-blur-md shadow-[0_4px_15px_rgba(195,161,97,0.4)] border border-[#C3A161]/50' 
                      : 'hover:text-[#FFFFFF] hover:bg-gradient-to-br hover:from-[#C3A161]/20 hover:via-[#106552]/15 hover:to-[#C3A161]/20 hover:backdrop-blur-md hover:border hover:border-[#C3A161]/40 hover:shadow-lg text-[#FFFFFF]/95 hover:scale-105 active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C3A161] via-[#FFFFFF] to-[#C3A161] transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_8px_rgba(195,161,97,0.7)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(195,161,97,0.5)]'
                  }`} />
                  {/* Active indicator dot with gold */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#C3A161] animate-pulse shadow-[0_0_6px_rgba(195,161,97,0.9)]" />
                  )}
                  {/* Subtle green accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#106552]/0 via-[#0A3428]/5 to-[#106552]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden absolute right-2 top-0 z-20">
            {/* Decorative halo with gold accent to improve tap target and visual affordance */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#C3A161]/20 via-[#106552]/15 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-full ring-1 ring-[#C3A161]/30 pointer-events-none" />
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#FFFFFF"
              openMenuButtonColor="#C3A161"
              changeMenuColorOnOpen={true}
              colors={["#751A2C", "#0A3428", "#106552", "#C3A161", "#FFFFFF"]}
              accentColor="#C3A161"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>

      </div>
    </nav>
  )
}

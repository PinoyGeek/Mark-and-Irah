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
        ? 'bg-gradient-to-b from-[#666956]/95 via-[#666956]/85 to-[#666956]/65 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] border-b border-[#8D8E7C]/40' 
        : 'bg-gradient-to-b from-[#666956]/60 via-[#666956]/45 to-transparent backdrop-blur-lg border-b border-[#8D8E7C]/20'
    }`}>
      {/* Subtle glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFBFBB]/20 via-transparent to-[#FFE5E4]/20 pointer-events-none" />
      )}
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-12 sm:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 sm:gap-2.5 relative">
                {/* Decorative dots with enhanced animation */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#B08981] to-[#EFBFBB] group-hover:shadow-[0_0_8px_rgba(176,137,129,0.6)]" />
                </div>
                
                <div className="relative">
                  <Heart
                    size={20}
                    className="sm:size-6 group-hover:fill-[#B08981] group-hover:text-[#EFBFBB] group-active:scale-110 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-white group-hover:drop-shadow-[0_2px_12px_rgba(239,191,187,0.8)]"
                  />
                  {/* Enhanced sparkle effect */}
                  <Sparkles 
                    size={10} 
                    className="absolute -top-1 -right-1 text-[#EFBFBB] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 drop-shadow-md group-hover:drop-shadow-[0_0_6px_rgba(239,191,187,0.8)]" 
                  />
                </div>
                
                <div className="text-base sm:text-2xl md:text-3xl font-serif font-bold group-hover:text-[#EFBFBB] group-active:text-[#B08981] transition-all duration-500 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] text-white group-hover:drop-shadow-[0_2px_15px_rgba(239,191,187,0.5)]">
                  {siteConfig.couple.brideNickname} & {siteConfig.couple.groomNickname}
                </div>
                
                {/* Decorative dots with enhanced animation */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#B08981] to-[#EFBFBB] group-hover:shadow-[0_0_8px_rgba(176,137,129,0.6)]" />
                </div>
              </div>
              <div className="text-[9px] sm:text-xs font-sans tracking-[0.15em] ml-6 sm:ml-8 group-hover:text-[#B08981] group-hover:tracking-[0.2em] group-active:tracking-[0.2em] transition-all duration-500 font-light text-white/90 drop-shadow-md group-hover:drop-shadow-[0_2px_8px_rgba(176,137,129,0.4)]">
                {siteConfig.ceremony.date}
              </div>
            </div>
            
            {/* Enhanced decorative underline with glow */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B08981] via-[#EFBFBB] to-[#B08981] group-hover:w-full transition-all duration-700 rounded-full group-hover:shadow-[0_0_8px_rgba(239,191,187,0.6)]" />
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B08981]/0 via-[#B08981]/10 to-[#B08981]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
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
                      ? 'text-white bg-gradient-to-br from-[#8D8E7C]/30 via-[#8D8E7C]/20 to-[#8D8E7C]/10 backdrop-blur-md shadow-[0_4px_15px_rgba(102,105,86,0.35)] border border-[#8D8E7C]/40' 
                      : 'hover:text-white hover:bg-gradient-to-br hover:from-[#8D8E7C]/20 hover:via-[#8D8E7C]/15 hover:to-[#8D8E7C]/10 hover:backdrop-blur-md hover:border hover:border-[#8D8E7C]/30 hover:shadow-lg text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B08981] via-[#EFBFBB] to-[#B08981] transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_8px_rgba(239,191,187,0.6)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(239,191,187,0.4)]'
                  }`} />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#EFBFBB] animate-pulse shadow-[0_0_6px_rgba(239,191,187,0.8)]" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="md:hidden absolute right-2 top-0 z-20">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#B08981]/20 via-[#EFBFBB]/15 to-transparent blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-full ring-1 ring-[#B08981]/30 pointer-events-none" />
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#FFE5E4"
              openMenuButtonColor="#FFE5E4"
              changeMenuColorOnOpen={true}
              colors={["#666956", "#8D8E7C", "#B08981", "#FFE5E4"]}
              accentColor="#EFBFBB"
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Heart } from "lucide-react"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#principal-sponsors", label: "Sponsors" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#593163] shadow-xl border-b-4 border-[#9CAF88]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="#home" className="flex-shrink-0 group">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart
                  size={18}
                  className="sm:size-5 text-[#9CAF88] group-hover:fill-[#9CAF88] group-active:scale-110 transition-all duration-300"
                />
                <div className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-[#9CAF88] group-active:text-[#9CAF88] transition-colors duration-300">
                  Jam & Jan
                </div>
              </div>
              <div className="text-xs text-[#9CAF88] font-sans tracking-widest ml-6 sm:ml-7 group-hover:tracking-wider group-active:tracking-wider transition-all duration-300">
                DECEMBER 3, 2025
              </div>
            </div>
          </Link>

          <div className="hidden md:flex gap-0.5 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-white hover:text-[#9CAF88] hover:bg-white/15 rounded-lg transition-all duration-300 relative group active:bg-white/25"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9CAF88] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/15 active:bg-white/25 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-3 sm:pb-4 space-y-1 border-t border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 sm:py-4 rounded-lg text-sm font-medium text-white hover:text-[#9CAF88] hover:bg-white/15 active:bg-white/25 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

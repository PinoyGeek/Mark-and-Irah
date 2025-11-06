"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956]">
      {/* Simple top bar with only Back link */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#666956]/70 border-b border-[#8D8E7C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#FFE5E4] font-semibold px-3 py-1.5 rounded-full border border-[#B08981]/40 hover:bg-[#B08981]/20 transition"
          >
            ← Back to main page
          </Link>
          <div className="text-xs text-[#FFE5E4]/60">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}






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
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-motif-cream)" }}>
      {/* Sticky top bar — motif palette */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 95%, transparent)",
          borderColor: "color-mix(in srgb, var(--color-motif-deep) 25%, transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-1.5 sm:gap-2 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-200 font-sans text-sm sm:text-base"
            style={{
              backgroundColor: "var(--color-motif-deep)",
              borderColor: "var(--color-motif-deep)",
              color: "var(--color-motif-cream)",
            }}
            onClick={() => {
              // Tell the home page to skip loading/landing and jump straight to DETAILS,
              // then scroll to the #gallery section.
              sessionStorage.setItem("returnFromGallery", "true")
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-motif-accent)"
              e.currentTarget.style.borderColor = "var(--color-motif-accent)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-motif-deep)"
              e.currentTarget.style.borderColor = "var(--color-motif-deep)"
            }}
          >
            <span className="text-base sm:text-lg">←</span>
            <span className="hidden xs:inline">Back to main page</span>
            <span className="xs:hidden">Back</span>
          </Link>

          <div
            className="text-xs sm:text-sm font-sans font-medium tracking-widest uppercase"
            style={{ color: "var(--color-motif-deep)" }}
          >
            Gallery
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

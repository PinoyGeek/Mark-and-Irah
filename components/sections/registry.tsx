"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

export function Registry() {
  const [showGCash, setShowGCash] = useState(false)
  const [showBPI, setShowBPI] = useState(false)
  return (
    <Section id="registry" className="relative py-20 md:py-32 overflow-hidden">
      {/* Title */}
      <div className="relative z-10 text-center mb-10 md:mb-16">
        <h2 className="text-5xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-3 sm:mb-4 text-balance">
          Monetary Gifts
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans max-w-2xl mx-auto px-4">
          Your love and presence are more than enough. If you wish to bless us with a monetary gift,
          please feel free to use any of the options below. Thank you for being part of our story.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Appreciation Note */}
          <div className="rounded-xl p-5 sm:p-6 md:p-8 border bg-card/50 backdrop-blur">
            <div className="text-center">
              <div className="space-y-3 max-w-3xl mx-auto px-2">
                <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                  WITH ALL THAT WE HAVE, WE ARE TRULY BLESSED, YOUR PRESENCE, AND PRAYER ARE THAT WE REQUEST. BUT IF YOU DESIRE TO GIVE NONETHELESS MONETARY GIFT IS THE ONE WE SUGGEST.
                </p>
              </div>
            </div>
          </div>

          {/* QR Options */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:gap-5">
            {/* GCash */}
            <div className="rounded-xl border bg-card p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">GCash</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Scan or download the QR to send</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGCash(v => !v)}
                  aria-expanded={showGCash}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {showGCash ? "Hide QR" : "Show QR"}
                </button>
              </div>
              <div className={`transition-all duration-300 overflow-hidden ${showGCash ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <a
                  href="/QR/Gcash.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size GCash QR in a new tab"
                  className="block group"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg border bg-white p-3 sm:p-4 ring-0 group-hover:ring-2 ring-primary/30 transition">
                    <Image
                      src="/QR/Gcash.png"
                      alt="GCash QR Code"
                      width={800}
                      height={800}
                      priority
                      className="h-full w-full object-contain drop-shadow-sm"
                    />
                  </div>
                </a>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">Scan with your GCash app to send.</p>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <a
                    href="/QR/Gcash.png"
                    download
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    Download QR
                  </a>
                  <a
                    href="/QR/Gcash.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    Open Full Size
                  </a>
                </div>
              </div>
            </div>

            {/* BPI */}
            <div className="rounded-xl border bg-card p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">BPI</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Scan or download the QR to send</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBPI(v => !v)}
                  aria-expanded={showBPI}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {showBPI ? "Hide QR" : "Show QR"}
                </button>
              </div>
              <div className={`transition-all duration-300 overflow-hidden ${showBPI ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <a
                  href="/QR/BPI.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size BPI QR in a new tab"
                  className="block group"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg border bg-white p-3 sm:p-4 ring-0 group-hover:ring-2 ring-primary/30 transition">
                    <Image
                      src="/QR/BPI.png"
                      alt="BPI QR Code"
                      width={800}
                      height={800} 
                      className="h-full w-full object-contain drop-shadow-sm"
                    />
                  </div>
                </a>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">Scan with your BPI app to send.</p>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <a
                    href="/QR/BPI.png"
                    download
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    Download QR
                  </a>
                  <a
                    href="/QR/BPI.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    Open Full Size
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  )
}

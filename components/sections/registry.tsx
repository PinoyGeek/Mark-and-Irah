"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

const GCASH_NUMBER = "+63 969 296 9854"

// Warm brown palette to match hero/details
const REGISTRY_ACCENT = "#9B6A41"
const REGISTRY_DARK = "#624630"
const REGISTRY_DARKER = "#3E2914"
const REGISTRY_CREAM = "#F8F4EE"

type RegistryMethod = "gcash" | "zelle"

export function Registry() {
  const [activeMethod, setActiveMethod] = useState<RegistryMethod>("gcash")

  const isGCash = activeMethod === "gcash"
  const qrSrc = isGCash ? "/QR/GcashQR.png" : "/QR/Zelle.png"
  const label = isGCash ? "GCash" : "Zelle"

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
        
        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4">
          Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          With all that we have we are truly blessed. Your Presence and prayer are that we request, but if you are thinking of giving a gift, to help us on our way a monetary or if you prefer to purchase a gift, feel free to surprise as on your on way.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="relative backdrop-blur-md border rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden"
          style={{ backgroundColor: `${REGISTRY_CREAM}ee`, borderColor: `${REGISTRY_ACCENT}40`, boxShadow: `0 20px 60px ${REGISTRY_DARKER}15` }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: `linear-gradient(to bottom right, ${REGISTRY_ACCENT}20, transparent, ${REGISTRY_ACCENT}08)` }} />

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center justify-center rounded-full border px-1 py-1 bg-white/70 shadow-sm text-xs sm:text-sm"
                 style={{ borderColor: `${REGISTRY_ACCENT}40` }}>
              <button
                type="button"
                onClick={() => setActiveMethod("gcash")}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-medium transition-colors ${
                  isGCash
                    ? "bg-[#9B6A41] text-white shadow-sm"
                    : "text-[#624630] hover:bg-white"
                }`}
              >
                GCash
              </button>
              <button
                type="button"
                onClick={() => setActiveMethod("zelle")}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-medium transition-colors ${
                  !isGCash
                    ? "bg-[#9B6A41] text-white shadow-sm"
                    : "text-[#624630] hover:bg-white"
                }`}
              >
                Zelle
              </button>
            </div>

            <div
              className="relative bg-white/95 rounded-xl sm:rounded-2xl border-2 border-dashed p-5 sm:p-6 md:p-8 text-center max-w-md w-full"
              style={{ borderColor: `${REGISTRY_ACCENT}40`, boxShadow: `0 6px 24px ${REGISTRY_DARKER}12` }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full shadow-sm border-2 text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ backgroundColor: REGISTRY_CREAM, borderColor: `${REGISTRY_ACCENT}60`, color: REGISTRY_DARKER }}
              >
                {label}
              </div>
              <div className="flex flex-col items-center gap-4 w-full mt-4">
                <div
                  className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed rounded-xl sm:rounded-2xl flex items-center justify-center bg-white p-3 sm:p-4 overflow-hidden"
                  style={{ borderColor: `${REGISTRY_ACCENT}40` }}
                >
                  <Image
                    src={qrSrc}
                    alt={`${label} payment QR`}
                    width={256}
                    height={256}
                    className="w-full h-full object-contain"
                    priority={false}
                  />
                </div>
                {isGCash && (
                  <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide" style={{ color: REGISTRY_DARKER }}>
                    {GCASH_NUMBER}
                  </p>
                )}
                <p className="text-xs sm:text-sm" style={{ color: REGISTRY_DARK }}>
                  Scan the QR code with your {label} app to send your gift.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}

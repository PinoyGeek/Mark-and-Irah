"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const ALL_QR = Object.values(siteConfig?.giftRegistry ?? {})
const BPI_QR = ALL_QR.filter((q) => q.label === "BPI")
const GCASH_QR = ALL_QR.filter((q) => q.label === "Gcash")

const GROUPS = [
  { key: "BPI", label: "BPI", items: BPI_QR },
  { key: "Gcash", label: "GCash", items: GCASH_QR },
]

export function Registry() {
  const [activeGroup, setActiveGroup] = useState<"BPI" | "Gcash">("BPI")
  const [activeId, setActiveId] = useState(BPI_QR[0]?.id ?? "")

  const currentItems = GROUPS.find((g) => g.key === activeGroup)?.items ?? []
  const activeItem = currentItems.find((i) => i.id === activeId) ?? currentItems[0]

  function handleGroupChange(key: "BPI" | "Gcash") {
    setActiveGroup(key)
    const firstItem = GROUPS.find((g) => g.key === key)?.items[0]
    if (firstItem) setActiveId(firstItem.id)
  }

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-motif-cream/60" />
        </div>

        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-motif-cream mb-2 sm:mb-3 md:mb-4">
          Gift Guide
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-motif-cream/80 font-light max-w-xl mx-auto leading-relaxed px-2">
          With hearts full of gratitude, we ask only for your presence and prayers.
          Should you wish to bless us further, a gift toward our future would be a
          treasure we will always cherish.
        </p>

        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-motif-cream/80 rounded-full" />
        </div>
      </div>

      {/* Toggle + QR display */}
      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8">

        {/* Step 1 — Payment method tabs */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border border-motif-cream/25 bg-motif-cream/5 backdrop-blur-sm shadow-inner">
          {GROUPS.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => handleGroupChange(group.key as "BPI" | "Gcash")}
              className={`relative px-7 sm:px-10 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                activeGroup === group.key
                  ? "bg-motif-cream/20 text-motif-cream shadow-sm"
                  : "text-motif-cream/55 hover:text-motif-cream/80 hover:bg-motif-cream/8"
              }`}
            >
              {group.label}
              {activeGroup === group.key && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-motif-cream/60" />
              )}
            </button>
          ))}
        </div>

        {/* Step 2 — Account selector within the group */}
        <div className="flex items-center gap-2">
          {currentItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full border text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                activeId === item.id
                  ? "border-motif-cream/60 bg-motif-cream/15 text-motif-cream"
                  : "border-motif-cream/20 text-motif-cream/50 hover:border-motif-cream/40 hover:text-motif-cream/75"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  activeId === item.id ? "bg-motif-cream" : "bg-motif-cream/30"
                }`}
              />
              Account {idx + 1}
            </button>
          ))}
        </div>

        {/* QR Card — centered */}
        {activeItem && (
          <div className="flex flex-col items-center gap-5 w-full">
            {/* Outer decorative frame */}
            <div className="relative p-1 rounded-3xl bg-gradient-to-br from-motif-cream/20 via-motif-cream/10 to-motif-cream/5 shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-white shadow-inner">
                <CloudinaryImage
                  src={activeItem.src}
                  alt={`QR code – ${activeItem.id}`}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                />
              </div>
            </div>

            {/* Account info badge */}
            <div className="text-center space-y-1 px-4 py-3 rounded-2xl border border-motif-cream/20 bg-motif-cream/5 w-full max-w-xs">
              <p className="text-[10px] tracking-[0.22em] uppercase text-motif-cream/55">
                Account Name
              </p>
              <p className={`${cinzel.className} text-sm sm:text-base text-motif-cream leading-snug`}>
                {activeItem.accountNumber}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-10 sm:mt-12 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 sm:w-12 h-px bg-motif-cream/30" />
          <div className="w-1 h-1 bg-motif-cream/50 rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-motif-cream/30" />
        </div>
        <p className="text-xs sm:text-sm text-motif-cream/75 italic">
          Thank you from the bottom of our hearts.
        </p>
        <p className={`${cinzel.className} mt-1 text-xs sm:text-sm text-motif-cream/60 tracking-wider`}>
          With love, {siteConfig.couple.brideNickname} &amp; {siteConfig.couple.groomNickname}
        </p>
      </div>
    </Section>
  )
}

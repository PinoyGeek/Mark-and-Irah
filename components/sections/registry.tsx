"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Smartphone } from "lucide-react"

const paymentMethods = [
  {
    id: "gcash",
    label: "GCash",
    description: "Instant transfer via GCash",
    accent: "from-[#BCCFC0] to-[#8EA58B]",
    Icon: Smartphone,
  },
] as const

type PaymentId = typeof paymentMethods[number]["id"]

const gcashOptions = [
  { id: "gcash1", label: "GCash 1", src: "/QR/Gcash1.png" },
  { id: "gcash2", label: "GCash 2", src: "/QR/Gcash2.png" },
] as const

export function Registry() {
  const [activeMethod, setActiveMethod] = useState<PaymentId>("gcash")
  const [activeGcash, setActiveGcash] = useState<(typeof gcashOptions)[number]["id"]>("gcash1")

  const activeDetails = paymentMethods.find((method) => method.id === activeMethod)
  const activeQrSrc =
    activeMethod === "gcash"
      ? gcashOptions.find((o) => o.id === activeGcash)?.src ?? gcashOptions[0].src
      : ""

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
          Your presence is the greatest gift. Should you wish to give, a monetary gift to help us begin our new life together would mean so much to us.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#F7F5F1]/95 backdrop-blur-md border border-[#F7E6CA]/80 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-[#F7E6CA]/18 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-5 sm:mb-6">
              {paymentMethods.map(({ id, label, description, accent, Icon }) => {
                const isActive = id === activeMethod
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveMethod(id)}
                    className={`relative rounded-xl border-2 px-4 py-3 flex items-center gap-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive
                        ? "border-[#324D3E] text-[#324D3E] shadow-lg bg-white"
                        : "border-[#324D3E]/30 bg-white/80 hover:border-[#324D3E]/50 hover:shadow-md text-[#324D3E]/80"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>
                      <p className="text-[11px] text-[#324D3E]/70">{description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {activeDetails && (
              <div className="relative bg-white/95 rounded-xl sm:rounded-2xl border-2 border-dashed border-[#324D3E]/30 p-5 sm:p-6 md:p-8 text-center shadow-[0_6px_24px_rgba(0,0,0,0.15)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F7F5F1] px-3 py-1 rounded-full shadow-sm border-2 border-[#324D3E]/30 text-xs font-semibold tracking-[0.2em] text-[#324D3E] uppercase">
                  {activeDetails.label}
                </div>
                <div className="flex flex-col items-center gap-4 w-full">
                  {activeMethod === "gcash" && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {gcashOptions.map((option) => {
                        const isActive = option.id === activeGcash
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setActiveGcash(option.id)}
                            className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 ${
                              isActive
                                ? "bg-[#324D3E] text-white border-[#324D3E]"
                                : "bg-white text-[#324D3E] border-[#324D3E]/40 hover:border-[#324D3E]/80"
                            }`}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-[#324D3E]/30 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white relative overflow-hidden">
                    <Image
                      src={activeQrSrc}
                      alt={`${activeDetails.label} QR code`}
                      fill
                      sizes="256px"
                      className="object-contain p-4"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[#324D3E] max-w-md">
                    Tap the toggles above to switch between GCash QR options.
                  </p>
                </div>
              </div>
            )}
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

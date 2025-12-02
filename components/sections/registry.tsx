"use client"

import Image from "next/image"
import { Section } from "@/components/section"
import { Smartphone } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const paymentMethod = {
  id: "gcash",
  label: "GCash",
  description: "Scan QR code to send via GCash",
  Icon: Smartphone,
  qrImage: "/QR/Gcash QR code.png",
}

export function Registry() {
  const IconComponent = paymentMethod.Icon

  return (
    <Section id="registry" className="relative overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#FDECEF]/85 mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Ways to Bless Us
        </p>
        
        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Gift Guide
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-5`}>
          Your presence is the greatest gift, but if you wish to bless us further, a monetary contribution would be deeply appreciated.
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/80 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FDECEF]/80 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-[#FDECEF]/25 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-4 sm:p-6 md:p-8">
          {/* Payment method info */}
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6 md:mb-8">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg sm:rounded-xl border-2 border-[#FDECEF] bg-[#FDECEF]/20 text-white shadow-lg">
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <p className={`${cormorant.className} text-sm font-semibold tracking-wide`}>{paymentMethod.label}</p>
                <p className={`${cormorant.className} text-[11px] text-white/70`}>{paymentMethod.description}</p>
              </div>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-[#FDECEF]/30 p-5 sm:p-6 md:p-8 text-center">
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-[#660033] px-3 py-1 rounded-full shadow-lg border border-[#FDECEF]/40 ${cormorant.className} text-xs font-semibold tracking-[0.2em] text-white uppercase`}>
              {paymentMethod.label}
            </div>
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-[#FDECEF]/50 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/10 relative overflow-hidden">
                <Image
                  src={paymentMethod.qrImage}
                  alt={`${paymentMethod.label} QR code`}
                  fill
                  sizes="256px"
                  className="object-contain p-4"
                />
              </div>
              <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/80 max-w-md leading-relaxed`}>
                Scan the QR code above using your GCash app to send your gift.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/90 italic`}>
            Your thoughtful generosity means so much to us—thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}

"use client"

import { Section } from "@/components/section"
import { Gift, Heart } from "lucide-react"

export function Registry() {
  return (
    <Section id="registry" className="relative py-10 sm:py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Monetary Gifts
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-light max-w-xl mx-auto leading-relaxed px-2">
          Your love and presence are more than enough. If you wish to bless us with a monetary gift,
          please see the note below.
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Note on Gifts */}
        <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md border-2 border-[#A78256]/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg mb-4 sm:mb-6 overflow-visible">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          <div className="relative p-4 sm:p-5 md:p-6 text-center">
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#A78256] mr-2" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#A78256]">Note on Gifts</h3>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#A78256] ml-2" />
            </div>
            <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
              <p className="leading-relaxed text-sm sm:text-base font-normal text-[#B28383]">
                Your love, laughter and presence on our wedding day are the most precious gifts we could ask for.
              </p>
              <p className="leading-relaxed text-sm sm:text-base font-normal text-[#B28383]">
                Should you wish to bless us further, a monetary gift would be delightful as we begin building our journey as husband and wife.
              </p>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white italic">
            Thank you for your generosity ❤️
          </p>
        </div>
      </div>
    </Section>
  )
}

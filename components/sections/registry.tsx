"use client"

import { Section } from "@/components/section"
import { Gift, Heart } from "lucide-react"

export function Registry() {
  
  return (
    <Section id="registry" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">

      {/* Title Section */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#B08981]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#B08981] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#B08981] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#B08981]/60 to-[#EFBFBB]/30" />
        </div>
        
        <div className="inline-flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Gift className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] drop-shadow-lg" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white text-balance drop-shadow-lg relative px-2">
            Gift Registry
          </h2>
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] drop-shadow-lg" />
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-[#FFE5E4] font-sans font-light max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
          Your presence is the greatest gift we could ask for
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8" style={{ zIndex: 10 }}>
        {/* Monetary Gift Message Card with Glass Effect */}
        <div className="relative">
          {/* Main card with glass effect */}
          <div className="relative bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14 border-2 border-[#B08981]/35 shadow-[0_8px_24px_rgba(102,105,86,0.22)] hover:shadow-[0_12px_32px_rgba(102,105,86,0.3)] transition-all duration-300">
            {/* Decorative corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
            
            {/* Inner decorative border */}
            <div className="absolute inset-2 border border-[#B08981]/30 rounded-xl" />
            
            {/* Content */}
            <div className="text-center space-y-5 sm:space-y-6 md:space-y-8 relative z-10">
              {/* Header with hearts */}
              <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] animate-pulse" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#666956]">
                  Your Presence Is the Gift
                </h3>
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] animate-pulse" />
              </div>
              
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3">
                <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#B08981]/40 to-[#EFBFBB]/30"></div>
                <div className="w-1.5 h-1.5 bg-[#B08981] rounded-full"></div>
                <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#B08981]/40 to-[#EFBFBB]/30"></div>
              </div>
              
              {/* Message content */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl font-sans leading-relaxed text-[#666956]">
                <p className="font-medium text-lg sm:text-xl md:text-2xl">
                  Thank you for being part of our love story.
                </p>
                <p className="leading-relaxed">
                  If you feel inclined to give a monetary gift, we would appreciate receiving it in person so we may share our heartfelt thanks face-to-face.
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#B08981] pt-2 sm:pt-4">
                  We look forward to celebrating with you soon. ✨
                </p>
              </div>
              
              {/* Decorative bottom element */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                <div className="w-1.5 h-1.5 bg-[#EFBFBB] rounded-full"></div>
                <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-[#EFBFBB]/30 via-[#B08981]/40 to-[#EFBFBB]/30"></div>
                <div className="w-1.5 h-1.5 bg-[#EFBFBB] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

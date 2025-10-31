"use client"

import { Section } from "@/components/section"
import { principalSponsors } from "@/content/site"
import { Heart, Users } from "lucide-react"

export function PrincipalSponsors() {
  return (
    <section 
      id="sponsors" 
      className="relative bg-gradient-to-b from-[#402921] via-[#583016] to-[#402921] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#BB8A3D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#CDAC77]/15 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#BB8A3D]/8 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-[#CDAC77]/12 rounded-full blur-xl animate-pulse delay-500" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDAC77]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#BB8A3D]/15 via-[#CDAC77]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-36 sm:w-44 md:w-56 lg:w-64 opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-28 sm:w-36 md:w-48 lg:w-56 opacity-70 rotate-180 select-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Decorative ornaments */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
              <div className="w-1 h-1 bg-[#FFF6E7] rounded-full self-center" />
              <div className="w-2 h-2 bg-[#BB8A3D] rounded-full" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#BB8A3D]/60 to-[#CDAC77]/30" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFF6E7] mb-6 text-balance drop-shadow-lg relative">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#BB8A3D] via-[#CDAC77] to-[#FFF6E7]">Principal Sponsors</span>
            {/* Text glow effect */}
            <span className="absolute inset-0 text-[#BB8A3D]/20 blur-2xl -z-10">Principal Sponsors</span>
          </h2>
 
          <p className="text-lg md:text-xl text-[#FFF6E7] font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
            Our Beloved Godparents
          </p>

          {/* Bottom decorative ornaments */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
            <div className="w-1 h-1 bg-[#CDAC77] rounded-full" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#CDAC77]/40 to-[#FFF6E7]/20" />
          </div>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {principalSponsors.map((sponsor, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D1AB6D]/20 via-[#E0CFB5]/10 to-[#D1AB6D]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-white via-[#F0F0F0] to-white backdrop-blur-md rounded-2xl p-5 sm:p-6 border-2 border-[#D1AB6D]/30 shadow-lg hover:shadow-2xl hover:border-[#D1AB6D]/60 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
                
                {/* Inner decorative border */}
                <div className="absolute inset-2 border border-[#D1AB6D]/20 rounded-xl group-hover:border-[#D1AB6D]/40 transition-all duration-500" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-3">
                  {/* Heart icon */}
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-gradient-to-br from-[#D1AB6D]/20 to-[#E0CFB5]/20 rounded-full group-hover:scale-110 transition-transform duration-500">
                      <Heart className="w-5 h-5 text-[#525E2C]" />
                    </div>
                  </div>
                  
                  {/* Names */}
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-semibold text-[#525E2C] leading-relaxed group-hover:text-[#D1AB6D] transition-colors duration-300">
                      {sponsor.name}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#D1AB6D]/40 to-transparent" />
                      <span className="text-xs text-[#909E8D]">&</span>
                      <div className="w-8 h-px bg-gradient-to-l from-transparent via-[#D1AB6D]/40 to-transparent" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-[#525E2C] leading-relaxed group-hover:text-[#D1AB6D] transition-colors duration-300">
                      {sponsor.spouse}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

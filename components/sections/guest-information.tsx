"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Car, Navigation, MapPin } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import Image from "next/image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

export function GuestInformation() {

  return (
    <Section
      id="guest-information"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
        >
          Important Guidelines
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
        >
          Guest Information
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Everything you need to know to make your experience smooth and enjoyable
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-4 sm:mb-7 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Important Information Header */}
        <div className="text-center mb-3 sm:mb-5">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white">
            Important Information
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-white max-w-xl mx-auto leading-relaxed">
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines */}
          <div className="relative rounded-2xl border border-[#738A6E]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="mb-2.5 sm:mb-3 relative z-10 text-center">
              <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#738A6E]">
                Attire &amp; Motif
              </h4>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-[#738A6E]/40 shadow-xl bg-white p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#738A6E]">
                  {siteConfig.dressCode.note}
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#738A6E]/40 bg-white/90 mb-3">
                <Image
                  src="/Details/newguestattire.png"
                  alt="Attire guideline"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                  priority={false}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <p className="text-[#738A6E]">
                        <span className="font-semibold">Ninong &amp; Guest:</span>
                      </p>
                      <p className="text-[#738A6E] pl-4">
                        Barong Tagalog | Puting Panloob | Itim na Pantalon | Itim na sapatos
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#738A6E]">
                        <span className="font-semibold">Ninang &amp; Guest:</span>
                      </p>
                      <p className="text-[#738A6E] pl-4">
                        Filipiniana or Traje de Mestiza
                      </p>
                    </div>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] sm:text-xs font-semibold text-[#738A6E] uppercase tracking-wide text-left">
                    Sage green &amp; Beige
                  </p>
                  <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-2.5">
                    {/* Sage Green Colors */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#BCCFC0' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#8EA58B' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#738A6E' }} />
                    {/* Beige Colors */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#F5F5DC' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#E6D5B8' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#738A6E]/20 shadow-sm" style={{ backgroundColor: '#D2B48C' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-2xl border border-[#738A6E]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="space-y-4 sm:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#738A6E]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#738A6E] mb-3">
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#738A6E] leading-relaxed">
                      Kindly arrive by <span className="font-semibold text-[#738A6E]">2:30 PM</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#738A6E]">3:00 PM</span>.
                    </p>
                    <p className="text-xs sm:text-sm text-[#738A6E] leading-relaxed">
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#738A6E]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#738A6E] mb-3">
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#738A6E] leading-relaxed">
                      The seating will be formal, RSVP-style. That&apos;s why we&apos;re asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact */}
          <div className="relative rounded-2xl border border-[#738A6E]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white/95 border border-[#738A6E]/40">
                <Car className="w-3.5 h-3.5 text-[#738A6E]" />
              </div>
              <h4 className="font-semibold text-xs sm:text-base text-[#738A6E]">Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#738A6E]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#738A6E] text-white">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#738A6E]">Parking Available</p>
                    <p className="text-[10px] sm:text-xs text-[#738A6E]/85">
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#738A6E]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#738A6E] text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#738A6E]">Transportation</p>
                    <p className="text-[10px] sm:text-xs text-[#738A6E]/85">
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#738A6E]/40 bg-white">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 flex items-center gap-2 text-[#738A6E]">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#738A6E]/10 text-[#738A6E]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className="text-[10px] sm:text-xs space-y-1 text-[#738A6E]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#738A6E] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#738A6E] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#738A6E] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends or family when possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


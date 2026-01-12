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
  // Palettes (used only for color chips in attire card) - Beige variants
  const sponsorPalette = ["#D1B48C", "#D1B79E", "#DFCFAD", "#F5DEB4", "#F0E2BB"]
  // Pink and Beige shades for guests
  const guestPalette = ["#BC677C", "#E2AAAD", "#EBC1CB", "#FAEAEA", "#CBB9A3", "#F5F5F5", "#F4F1EA", "#FAF9F5"]

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
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8B3036]/60" />
          <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#8B3036]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#8B3036]/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8B3036]/60" />
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
          <div className="relative rounded-2xl border border-[#8B3036]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="mb-2.5 sm:mb-3 relative z-10 text-center">
              <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#8B3036]">
                Attire &amp; Motif
              </h4>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-[#8B3036]/40 shadow-xl bg-white p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#8B3036]">
                  {siteConfig.dressCode.note}
                </p>
                <p className="text-xs sm:text-sm text-[#8B3036]/90">
                  Please dress within our wedding colors to help create a soft, elegant romantic celebration.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-t border-[#8B3036]/40 pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-[#8B3036] mb-2">Principal Sponsors Attire</h5>
                  <p className="text-[10px] sm:text-xs text-[#8B3036]/80 mb-2">Kindly align attire below.</p>
                  <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#8B3036]/40 bg-white/90 mb-3">
                    <Image
                      src="/Details/sponsors.png"
                      alt="Principal sponsors attire guideline"
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-[#8B3036]">
                      <span className="font-semibold">Male Sponsor:</span> Barong, Black Pants and Leather Shoes
                    </p>
                    <p className="text-[#8B3036]">
                      <span className="font-semibold">Female Sponsor:</span> variants of beige
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#8B3036] mb-1">
                        Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sponsorPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#8B3036]/40 pt-4">
                  <h5 className="font-semibold text-xs sm:text-sm text-[#8B3036] mb-2">Wedding Guests</h5>
                  <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#8B3036]/40 bg-white/90 mb-3">
                    <Image
                      src="/Details/guestattire.png"
                      alt="Guest attire guideline"
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <p className="text-[#8B3036] font-semibold">
                      Formal or Semi Formal
                    </p>
                    <p className="text-[#8B3036]">
                      We encourage you to dress in shades of pink and beige to match our wedding color palette:
                    </p>
                    <div className="pt-1">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#8B3036] mb-1">
                        Palette
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {guestPalette.map((color) => (
                          <span
                            key={color}
                            className="w-7 h-7 rounded-full border border-white/70 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-2xl border border-[#8B3036]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="space-y-4 sm:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#8B3036]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#8B3036] mb-3">
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#8B3036] leading-relaxed">
                      Kindly arrive by <span className="font-semibold text-[#8B3036]">{siteConfig.ceremony.guestsTime}</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#8B3036]">{siteConfig.ceremony.time}</span>.
                    </p>
                    <p className="text-xs sm:text-sm text-[#8B3036] leading-relaxed">
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#8B3036]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#8B3036] mb-3">
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#8B3036] leading-relaxed">
                      The seating will be formal, RSVP-style. That&apos;s why we&apos;re asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact */}
          <div className="relative rounded-2xl border border-[#8B3036]/40 bg-white/95 backdrop-blur-lg shadow-[0_18px_40px_rgba(0,0,0,0.15)] p-3.5 sm:p-5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white/95 border border-[#8B3036]/40">
                <Car className="w-3.5 h-3.5 text-[#8B3036]" />
              </div>
              <h4 className="font-semibold text-xs sm:text-base text-[#8B3036]">Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#8B3036]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#8B3036] text-white">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#8B3036]">Parking Available</p>
                    <p className="text-[10px] sm:text-xs text-[#8B3036]/85">
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#8B3036]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#8B3036] text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#8B3036]">Transportation</p>
                    <p className="text-[10px] sm:text-xs text-[#8B3036]/85">
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#8B3036]/40 bg-white">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 flex items-center gap-2 text-[#8B3036]">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8B3036]/10 text-[#8B3036]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className="text-[10px] sm:text-xs space-y-1 text-[#8B3036]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B3036] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B3036] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B3036] mt-0.5">•</span>
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


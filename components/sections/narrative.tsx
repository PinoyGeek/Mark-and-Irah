"use client"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"


export function Narrative() {
  return (
    <Section id="narrative" className="relative py-20 md:py-32 overflow-hidden">

      <div className="absolute inset-0 bg-white/75 backdrop-blur-md z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-4 md:mb-6 text-balance drop-shadow-lg">
          Our Love in Full Bloom
          </h2>

        </div>

        {/* Main Content - Centered Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center lg:items-start">
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10 rounded-full blur-3xl -z-10 w-full h-full max-w-sm"></div>

              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 320 }}
                cardsData={[
                  { id: 1, img: "/Couple_img/couple_1.png" },
                  { id: 2, img: "/Couple_img/couple_2.png" },
                  { id: 3, img: "/Couple_img/couple_3.png" },
                  { id: 4, img: "/Couple_img/couple_4.png" },
                  { id: 5, img: "/Couple_img/couple_5.png" }
                ]}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />

              <p className="text-center text-sm md:text-base text-primary/60 mt-8 font-sans font-medium">
                ✨ Drag to explore our moments ✨
              </p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Story Text - Full Width Below */}
        <div className="mt-16 md:mt-28 max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-10">
            {siteConfig.narrative.split("\n\n").map((paragraph, index) => (
              <div key={index} className="relative">
                
                {/* First paragraph with drop cap */}
                {index === 0 ? (
                  <p className="text-sm md:text-lg leading-relaxed text-foreground/85 text-pretty font-sans font-light pl-3 md:pl-6">
                    <span className="float-left text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-primary leading-none mr-2 mt-1 drop-shadow-sm">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </p>
                ) : (
                  <p className="text-sm md:text-lg leading-relaxed text-foreground/85 text-pretty font-sans font-light pl-3 md:pl-6">
                    {paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Divider and CTA */}
          <div className="mt-16 md:mt-24 lg:mt-28 space-y-8 md:space-y-12">
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-6">
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center">
              <a
                href="#rsvp"
                className="group relative w-full sm:w-auto px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-white font-sans font-semibold text-sm sm:text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-500 transform active:scale-95 border-2 border-primary/20 hover:border-primary/40 text-center"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide uppercase text-center">
                  Join Our Celebration
                </span>
                
                {/* Decorative corner accents */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile hint - only visible on small screens */}
        <div className="lg:hidden mt-12 p-4 bg-primary/10 rounded-xl border-2 border-primary/20 text-center backdrop-blur-sm">
          <p className="text-sm text-primary font-sans font-medium">
            ✨ Tap and drag the cards to discover our love story
          </p>
        </div>
      </div>
    </Section>
  )
}

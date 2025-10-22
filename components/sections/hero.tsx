"use client"

import { Button } from "@/components/button"
import { siteConfig } from "@/content/site"
import dynamic from "next/dynamic"
import BounceCards from "@/components/bounce-cards"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

export function Hero() {
  const weddingImages = [
    "/Couple_img/couple_5.png",
    "/Couple_img/couple_2.png",
    "/Couple_img/couple_3.png",
    "/Couple_img/couple_4.png",
    "/Couple_img/couple_1.png"
  ]

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-0"
    >
      <div className="absolute inset-0 w-full h-full">
        <Silk speed={5} scale={1} color="#593163" noiseIntensity={1.5} rotation={0} />
      </div>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm md:bg-black/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-1 sm:mb-2 text-balance leading-tight drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
              {siteConfig.couple.bride} & {siteConfig.couple.groom}
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#9CAF88] mb-4 sm:mb-6 text-balance drop-shadow-md hover:drop-shadow-lg transition-all duration-300">
              "{siteConfig.couple.brideNickname}" & "{siteConfig.couple.groomNickname}"
            </p>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 italic text-pretty leading-relaxed drop-shadow-md font-light">
              {siteConfig.wedding.tagline}
            </p>

            <div className="space-y-2 mb-8 sm:mb-10 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-[#9CAF88]/40 shadow-lg hover:bg-white/15 hover:border-[#9CAF88]/60 transition-all duration-300 active:bg-white/20 md:active:bg-white/15">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold drop-shadow-md">
                {siteConfig.ceremony.day}, {siteConfig.ceremony.date}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#9CAF88] font-medium drop-shadow-md">
                {siteConfig.ceremony.time}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed drop-shadow-md">
                {siteConfig.wedding.venue}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                href="#details"
                variant="primary"
                className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 hover:scale-105 active:scale-95 transition-transform duration-200 w-full sm:w-auto text-center"
              >
                Join Our Celebration
              </Button>
              <Button
                href="#rsvp"
                variant="outline"
                className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 hover:scale-105 active:scale-95 transition-transform duration-200 bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                RSVP Now
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 lg:mt-0 w-full">
            <BounceCards
              className="custom-bounceCards"
              images={weddingImages}
              containerWidth={300}
              containerHeight={240}
              animationDelay={0.5}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

// White background (same as LoadingScreen)
const HERO_BG = "#FFFFFF"
const HERO_TEXT = "#9B6A41"
// Corner florals tint #9B6A41 (same as LoadingScreen)
const DECO_FILTER = "brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  const ceremonyDay = siteConfig.ceremony.day ?? "Thursday"
  const ceremonyTime = siteConfig.ceremony.time
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyVenue = siteConfig.ceremony.venue
  const groomName = siteConfig.couple.groomNickname ?? siteConfig.couple.groom
  const brideName = siteConfig.couple.brideNickname ?? siteConfig.couple.bride

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: HERO_BG }}>
      {/* Subtle depth overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#9B6A41]/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#9B6A41]/5 to-transparent" />
      </div>

      {/* Date background watermark (same style as LoadingScreen) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(6rem,20vw,14rem)] font-extralight tracking-[0.2em] opacity-[0.06]"
          style={{ fontFamily: '"Cinzel", serif', color: HERO_TEXT }}
        >
          03 26 26
        </span>
      </div>

      {/* Corner floral decoration - same as LoadingScreen.tsx */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1)", filter: DECO_FILTER }}
          priority={false}
        />
      </div>

      <div className="relative z-10 w-full container mx-auto px-5 sm:px-8 md:px-10 flex flex-col items-center justify-center min-h-screen pt-16 sm:pt-20 pb-16 sm:pb-20">
        <div
          className={`w-full max-w-lg text-center transition-all duration-700 ease-out -mt-8 sm:-mt-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Invitation line */}
          <p
            className={`${cinzel.className} text-[0.6rem] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.26em] font-light`}
            style={{ color: HERO_TEXT }}
          >
            You are invited to celebrate the union of
          </p>

          {/* Spacing between invitation line and couple names */}
          <div className="h-8 sm:h-10 md:h-12" aria-hidden />

          {/* Couple names - hero focal point */}
          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium leading-tight`}
            style={{ color: HERO_TEXT }}
          >
            <span className="block">{groomName}</span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-light tracking-widest my-1" style={{ color: HERO_TEXT }}>&</span>
            <span className="block">{brideName}</span>
          </h1>

          {/* Venue block */}
          <div className="mt-6 sm:mt-8 space-y-1.5 sm:space-y-2" style={{ color: HERO_TEXT }}>
            <p className={`${cinzel.className} text-[0.6rem] sm:text-xs uppercase tracking-[0.16em] leading-relaxed max-w-sm mx-auto`}>
              {ceremonyVenue}
            </p>
            <p className={`${cinzel.className} text-[0.6rem] sm:text-xs uppercase tracking-[0.16em]`}>
              Angeles, Pampanga
            </p>
            <p className={`${cinzel.className} text-[0.6rem] sm:text-xs uppercase tracking-[0.2em] pt-0.5`}>
              to celebrate our wedding
            </p>
          </div>

          {/* Date & time block */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#9B6A41]/20" style={{ color: HERO_TEXT }}>
            <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.2em]`}>
              {ceremonyDay} at {ceremonyTime}
            </p>
            <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] mt-1`}>
              {ceremonyDate}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12">
            <a
              href="#guest-list"
              className={`${cinzel.className} inline-block px-10 sm:px-12 py-3.5 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] border border-[#9B6A41] rounded-sm transition-all duration-300 hover:bg-[#9B6A41] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B6A41]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
              style={{ color: HERO_TEXT }}
            >
              Confirm Attendance
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

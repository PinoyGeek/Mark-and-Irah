"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import Image from "next/image"
import { motion } from "motion/react"
import { siteConfig } from "@/content/site"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const [ceremonyMonth = "January", ceremonyDayRaw = "23", ceremonyYear = "2026"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "23"
  
  const parsedTargetDate = new Date(`${ceremonyDate} ${ceremonyTimeDisplay} GMT+0800`)
  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? Date.UTC(2026, 0, 23, 8, 0, 0)
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = targetTimestamp
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
      {/* Counter card */}
      <div className="relative group">
        {/* Elegant glow on hover */}
        <div className="absolute -inset-1 bg-[#A78256]/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card - elegant and clean */}
        <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-6 lg:py-5 border-2 border-[#A78256]/40 shadow-[0_8px_32px_rgba(167,130,86,0.12)] hover:shadow-[0_12px_40px_rgba(167,130,86,0.18)] transition-all duration-300 hover:scale-[1.03] min-w-[52px] sm:min-w-[64px] md:min-w-[76px] lg:min-w-[88px]">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={3}
              gap={2}
              textColor="#A78256"
              fontWeight={900}
              horizontalPadding={2}
              borderRadius={6}
              gradientHeight={6}
              gradientFrom="rgba(167,130,86,0.08)"
              gradientTo="transparent"
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              counterStyle={{
                fontSize: "clamp(26px, 5.5vw, 48px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label - elegant with better contrast */}
      <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-semibold text-[#A78256] uppercase tracking-[0.15em] drop-shadow-sm">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-[#DDD3CC] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EDD6AC]/20 via-[#EDD6AC]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B28383]/20 via-[#B28383]/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C2D3C3]/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#A78256]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#B28383]/18 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#EDD6AC]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations - all four corners */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#A78256]/20" />
      </div>

      {/* Monogram - centered at top */}
      <div className="relative flex justify-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/Couple_img/monogram.png"
            alt="Jay & Cha Monogram"
            width={350}
            height={350}
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90"
            style={{
              filter: 'invert(54%) sepia(18%) saturate(945%) hue-rotate(357deg) brightness(92%) contrast(87%)'
            }}
            priority={false}
          />
          {/* Glow effect behind monogram */}
          <div className="absolute inset-0 blur-3xl bg-[#A78256]/25 -z-10 scale-125" />
        </motion.div>
      </div>

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
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#A78256] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#B28383] font-light max-w-xl mx-auto leading-relaxed px-2">
          Every moment brings us closer to forever
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* Countdown Timer - Elegant */}
      <div className="relative z-10 mb-7 sm:mb-9 md:mb-11 px-3 sm:px-4">
        <div className="flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3.5 lg:gap-5 flex-wrap max-w-4xl mx-auto">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>

      {/* Save The Date Card */}
      <div className="relative z-10">
        <div className="flex justify-center px-3 sm:px-4">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#A78256]/90 rounded-full" />
                  <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
                </div>
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-sans font-semibold text-[#A78256] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4 drop-shadow-md">
                Save The Date
              </p>
              
              {/* Bottom decorative divider */}
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#A78256]/90 rounded-full" />
                <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout with decorative card */}
            <div className="relative sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
              <div className="text-center">
                {/* Month - Elegant script style */}
                <div className="mb-5 sm:mb-6 md:mb-8">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#B28383] leading-none drop-shadow-lg" style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 300
                  }}>
                    {ceremonyMonth}
                  </p>
                </div>
                
                {/* Day and Year - Horizontal layout with divider */}
                <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-7 mb-5 sm:mb-6 md:mb-8">
                   {/* Day - Large and bold focal point */}
                   <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-serif font-bold text-[#A78256] leading-none" style={{
                     textShadow: "0 6px 24px rgba(167, 130, 86, 0.4), 0 2px 8px rgba(178, 131, 131, 0.3)"
                   }}>
                     {ceremonyDayNumber.padStart(2, "0")}
                   </p>
                  
                   {/* Elegant vertical divider */}
                   <div className="relative h-14 sm:h-16 md:h-20 lg:h-24 flex flex-col items-center justify-center gap-2">
                     <div className="w-1.5 h-1.5 bg-[#B28383]/70 rounded-full" />
                     <div className="flex-1 w-px bg-gradient-to-b from-[#B28383]/60 via-[#A78256]/90 to-[#B28383]/60" />
                     <div className="w-1.5 h-1.5 bg-[#B28383]/70 rounded-full" />
                   </div>
                  
                  {/* Year - Elegant and refined */}
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#B28383] leading-none drop-shadow-md">
                    {ceremonyYear}
                  </p>
                </div>
                
                {/* Time Section with decorative frame */}
                <div className="relative pt-4 sm:pt-5 border-t border-[#A78256]/30">
                   {/* Decorative element above time */}
                   <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                     <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
                     <div className="w-1.5 h-1.5 bg-[#A78256]/90 rounded-full" />
                     <div className="w-1 h-1 bg-[#B28383]/70 rounded-full" />
                   </div>
                   
                   {/* Time */}
                   <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-semibold text-[#A78256] tracking-wider drop-shadow-md">
                     {ceremonyTimeDisplay}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

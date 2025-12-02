"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import Image from "next/image"
import { motion } from "motion/react"
import { Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export function Countdown() {
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const [ceremonyMonth = "December", ceremonyDayRaw = "21", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "21"
  
  // Parse the date: December 21, 2025 at 3:00 PM PH Time (GMT+0800)
  // Extract time from "3:00 PM, PH Time" -> "3:00 PM"
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim() // "3:00 PM"
  
  // Create date string in ISO-like format for better parsing
  // December 21, 2025 -> 2025-12-21
  const monthMap: { [key: string]: string } = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12"
  }
  const monthNum = monthMap[ceremonyMonth] || "12"
  const dayNum = ceremonyDayNumber.padStart(2, "0")
  
  // Parse time: "3:00 PM" -> 15:00
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15 // default 3 PM
  let minutes = 0
  
  if (timeMatch) {
    hour = parseInt(timeMatch[1])
    minutes = parseInt(timeMatch[2])
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }
  
  // Create date in GMT+8 (PH Time)
  // Using Date.UTC and adjusting for GMT+8 offset (subtract 8 hours to convert GMT+8 to UTC)
  const parsedTargetDate = new Date(Date.UTC(
    parseInt(ceremonyYear),
    parseInt(monthNum) - 1,
    parseInt(dayNum),
    hour - 8, // Convert GMT+8 to UTC
    minutes,
    0
  ))
  
  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2025, 11, 21, 7, 0, 0)).getTime() // Fallback: December 21, 2025, 3:00 PM GMT+8 = 7 AM UTC
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
        <div className="absolute -inset-1 bg-[#F5E5D9]/40 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card - elegant and clean */}
        <div className="relative bg-[rgba(255,250,239,0.98)] backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-6 lg:py-5 border border-white/60 shadow-[0_8px_28px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.26)] transition-all duration-300 hover:scale-[1.03] min-w-[52px] sm:min-w-[64px] md:min-w-[76px] lg:min-w-[88px]">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/70 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/70 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/70 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/70 rounded-br-lg" />
          
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={3}
              gap={2}
              textColor="#660033"
              fontWeight={900}
              horizontalPadding={2}
              borderRadius={6}
              gradientHeight={6}
              gradientFrom="rgba(102,0,51,0.10)"
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
      <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-semibold text-white uppercase tracking-[0.15em] drop-shadow-sm">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-transparent py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Clean background with solid burgundy tone (no extra overlays) */}

      {/* Monogram - centered at top */}
      <div className="relative flex justify-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/monogram/monogram.png"
            alt="Jonarelh & Hazel Monogram"
            width={350}
            height={350}
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(100%) drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
            }}
            priority={false}
          />
          {/* Glow effect behind monogram */}
          <div className="absolute inset-0 blur-3xl bg-[#9B7C6A]/25 -z-10 scale-125" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
        Counting down the days ‘til the big “I do”!
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-light max-w-xl mx-auto leading-relaxed px-2">
          Every passing second brings us closer to the moment we say “always and forever.”
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
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
         

            {/* Date Section - Layout matched with hero date block */}
            <div className="relative sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
              <div className="w-full max-w-2xl mx-auto">
                <div
                  className={`${cormorant.className} flex flex-col items-center gap-1.5 sm:gap-2.5 md:gap-3 text-white`}
                  style={{ textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}
                >
                  {/* Month */}
                  <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] font-light">
                    {ceremonyMonth}
                  </span>

                  {/* Day and time row */}
                  <div className="flex w-full items-center gap-2 sm:gap-4 md:gap-5">
                    {/* Day of week & divider */}
                    <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] flex-1 bg-white/45" />
                      <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                        Sun
                      </span>
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10 bg-white/45" />
                    </div>

                    {/* Day number with glow */}
                    <div className="relative flex items-center justify-center px-3 sm:px-4 md:px-5">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 mx-auto h-[70%] max-h-[180px] w-[100px] sm:w-[140px] md:w-[170px] rounded-full bg-gradient-to-b from-white/25 via-white/10 to-transparent blur-[28px] opacity-80"
                      />
                      <span
                        className="relative text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-light leading-none tracking-wider text-white"
                        style={{
                          textShadow:
                            "0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7), 0 0 60px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.6)",
                          filter:
                            "drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 0 50px rgba(0,0,0,0.5))",
                        }}
                      >
                        {ceremonyDayNumber.padStart(2, "0")}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex flex-1 items-center gap-1.5 sm:gap-2.5">
                      <span className="h-[0.5px] w-6 sm:w-8 md:w-10 bg-white/45" />
                      <span className="text-[0.6rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-light">
                        {ceremonyTimeDisplay.split(",")[0]}
                      </span>
                      <span className="h-[0.5px] flex-1 bg-white/45" />
                    </div>
                  </div>

                  {/* Year */}
                  <span className="text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] font-light">
                    {ceremonyYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

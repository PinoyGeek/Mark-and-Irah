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
  const [ceremonyMonth = "December", ceremonyDayRaw = "28", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "28"
  
  // Parse the date: December 28, 2025 at 3:00 PM PH Time (GMT+0800)
  // Extract time from "3:00 PM, PH Time" -> "3:00 PM"
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim() // "3:00 PM"
  
  // Create date string in ISO-like format for better parsing
  // December 28, 2025 -> 2025-12-28
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
    ? new Date(Date.UTC(2025, 11, 28, 7, 0, 0)).getTime() // Fallback: December 28, 2025, 3:00 PM GMT+8 = 7 AM UTC
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
        <div className="absolute -inset-1 bg-[#9B7C6A]/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card - elegant and clean */}
        <div className="relative bg-[#FFFAEF]/98 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-6 lg:py-5 border-2 border-[#FFBD87]/50 shadow-[0_8px_32px_rgba(255,189,135,0.15)] hover:shadow-[0_12px_40px_rgba(255,189,135,0.25)] transition-all duration-300 hover:scale-[1.03] min-w-[52px] sm:min-w-[64px] md:min-w-[76px] lg:min-w-[88px]">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FFBD87]/50 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FFBD87]/50 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FFBD87]/50 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FFBD87]/50 rounded-br-lg" />
          
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={3}
              gap={2}
              textColor="#9B7C6A"
              fontWeight={900}
              horizontalPadding={2}
              borderRadius={6}
              gradientHeight={6}
              gradientFrom="rgba(155,124,106,0.08)"
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
      <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-semibold text-[#9B7C6A] uppercase tracking-[0.15em] drop-shadow-sm">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-[#FFFAEF] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with new color palette */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FFBD87]/25 via-[#FFBD87]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFBD87]/25 via-[#FFBD87]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFAEF]/40 via-transparent to-[#FFFAEF]/40" />
        
        {/* Floating decorative circles with new colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFBD87]/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#FFBD87]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#FFBD87]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#FFBD87]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FFFAEF]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFBD87]/30 to-transparent" />
        
        {/* Bottom left corner decoration */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt="Bottom left corner decoration"
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-80"
            priority={false}
          />
        </div>
        
        {/* Bottom right corner decoration */}
        <div className="absolute bottom-0 right-0 z-0 scale-x-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt="Bottom right corner decoration"
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-80"
            priority={false}
          />
        </div>
        
        {/* Top left corner decoration */}
        <div className="absolute top-0 left-0 z-0 scale-y-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt="Top left corner decoration"
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-80"
            priority={false}
          />
        </div>
        
        {/* Top right corner decoration */}
        <div className="absolute top-0 right-0 z-0 scale-x-[-1] scale-y-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt="Top right corner decoration"
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-80"
            priority={false}
          />
        </div>
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
            src="/monogram/monogram.png"
            alt="Jay & Cha Monogram"
            width={350}
            height={350}
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-90"
            style={{
              filter: 'invert(40%) sepia(8%) saturate(1200%) hue-rotate(340deg) brightness(95%) contrast(85%)'
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
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#9B7C6A]/50" />
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#9B7C6A]/50" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#9B7C6A] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#9B7C6A]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Every moment brings us closer to forever
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
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
                  <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#9B7C6A]/90 rounded-full" />
                  <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
                </div>
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-sans font-semibold text-[#9B7C6A] uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4 drop-shadow-md">
                Save The Date
              </p>
              
              {/* Bottom decorative divider */}
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#9B7C6A]/90 rounded-full" />
                <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout with decorative card */}
            <div className="relative sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
              <div className="text-center">
                {/* Month - Elegant script style */}
                <div className="mb-5 sm:mb-6 md:mb-8">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#9B7C6A]/90 leading-none drop-shadow-lg" style={{
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
                   <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-serif font-bold text-[#9B7C6A] leading-none" style={{
                     textShadow: "0 6px 24px rgba(155, 124, 106, 0.4), 0 2px 8px rgba(255, 189, 135, 0.3)"
                   }}>
                     {ceremonyDayNumber.padStart(2, "0")}
                   </p>
                  
                   {/* Elegant vertical divider */}
                   <div className="relative h-14 sm:h-16 md:h-20 lg:h-24 flex flex-col items-center justify-center gap-2">
                     <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
                     <div className="flex-1 w-px bg-gradient-to-b from-[#FFBD87]/60 via-[#9B7C6A]/90 to-[#FFBD87]/60" />
                     <div className="w-1.5 h-1.5 bg-[#FFBD87]/70 rounded-full" />
                   </div>
                  
                  {/* Year - Elegant and refined */}
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#9B7C6A]/90 leading-none drop-shadow-md">
                    {ceremonyYear}
                  </p>
                </div>
                
                {/* Time Section with decorative frame */}
                <div className="relative pt-4 sm:pt-5 border-t border-[#9B7C6A]/30">
                   {/* Decorative element above time */}
                   <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                     <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
                     <div className="w-1.5 h-1.5 bg-[#9B7C6A]/90 rounded-full" />
                     <div className="w-1 h-1 bg-[#FCB8B5]/70 rounded-full" />
                   </div>
                   
                   {/* Time */}
                   <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-semibold text-[#9B7C6A] tracking-wider drop-shadow-md">
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

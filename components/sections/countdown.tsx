"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: December 28, 2025 at 11:00 AM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 11:00 AM GMT+8 == 03:00 AM UTC
      const targetDate = Date.UTC(2025, 11, 28, 3, 0, 0) // December is month 11 (0-indexed)
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
        // Wedding has passed or is happening now
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
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      {/* Simple, elegant card */}
      <div className="relative group">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#C3A161]/20 to-[#751A2C]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 border border-[#C3A161]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#C3A161]/50 min-w-[65px] sm:min-w-[75px] md:min-w-[90px] lg:min-w-[100px]">
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={6}
              gap={3}
              textColor="#0A3428"
              fontWeight={600}
              borderRadius={8}
              horizontalPadding={4}
              gradientHeight={10}
              gradientFrom="rgba(10,52,40,0.08)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Simple label */}
      <span className="text-xs sm:text-sm font-medium text-[#FFFFFF]/90 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-gradient-to-b from-[#0A3428] via-[#106552]/90 to-[#0A3428] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#C3A161]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#C3A161]/5 to-transparent" />
        
        {/* Bottom-left flower decoration */}
        <img
          src="/decoration/rigth-bottom-corner-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none scale-x-[-1]"
        />
        
        {/* Bottom-right flower decoration */}
        <img
          src="/decoration/rigth-bottom-corner-flower.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] opacity-90 select-none pointer-events-none"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FFFFFF] mb-4 sm:mb-6 drop-shadow-md">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-[#FFFFFF]/90 font-light max-w-xl mx-auto leading-relaxed">
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-8 sm:mb-10 md:mb-12 flex-wrap px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Wedding date presentation - Save The Date Card Style */}
        <div className="flex justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base font-sans font-medium text-[#C3A161] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                Save The Date
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#FFFFFF] leading-none" style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300
                }}>
                  December
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-serif font-bold text-[#C3A161] leading-none drop-shadow-lg" style={{
                  textShadow: "0 4px 20px rgba(195, 161, 97, 0.3)"
                }}>
                  28
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-[#C3A161]/50" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#FFFFFF] leading-none">
                  2025
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
              </div>
              
              {/* Time */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-medium text-[#C3A161] tracking-wide mb-3 sm:mb-4">
                11:00 AM
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#C3A161]/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

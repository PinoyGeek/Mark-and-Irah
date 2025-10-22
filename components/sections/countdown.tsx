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
      // Create target date explicitly for December 3, 2025 at 4:00 PM
      const targetDate = new Date("2025-12-03T16:00:00-08:00").getTime() // PST timezone
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
    <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
      <div className="relative group">
        {/* Outer decorative ring */}
        <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full blur-sm opacity-60 animate-pulse" />
        
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110" />

        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />

        {/* Main card with enhanced styling */}
        <div className="relative bg-gradient-to-br from-[#9CAF88] via-[#9CAF88] to-[#8a9a73] backdrop-blur-sm rounded-3xl p-5 sm:p-7 md:p-9 border-2 border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500 min-w-24 sm:min-w-28 md:min-w-36 lg:min-w-44 hover:scale-105 hover:border-white/60">
          {/* Inner decorative border */}
          <div className="absolute inset-2 border border-white/20 rounded-2xl" />
          
          {/* Counter with enhanced styling */}
          <div className="relative z-10">
            <Counter
              value={value}
              places={[10, 1]}
              fontSize={52}
              padding={8}
              gap={4}
              textColor="white"
              fontWeight="900"
              borderRadius={16}
              horizontalPadding={4}
              gradientFrom="rgba(255,255,255,0.3)"
              gradientTo="transparent"
              containerStyle={{}}
              counterStyle={{}}
              digitStyle={{}}
              topGradientStyle={{}}
              bottomGradientStyle={{}}
            />
          </div>
          
          {/* Decorative sparkle effect */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full animate-ping" />
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Label with enhanced styling */}
      <div className="relative">
        <span className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-widest drop-shadow-lg relative z-10">
          {label}
        </span>
        {/* Label background glow */}
        <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm -z-10" />
      </div>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-gradient-to-b from-[#9CAF88] via-[#9CAF88] to-[#8a9a73] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/8 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/6 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/7 rounded-full blur-lg animate-pulse delay-500" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl" />
      </div>

      {/* Custom larger title */}
      <div className="relative z-10 text-center mb-16 md:mb-20">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 text-balance drop-shadow-lg">
          Count Down With Us
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
        </div>
        <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
          Every moment brings us closer to our forever. Join us as we count down to the most magical day of our lives.
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16 lg:mb-20 flex-wrap px-2 sm:px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Enhanced wedding date card */}
        <div className="flex justify-center px-2 sm:px-4">
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Main card */}
            <div className="relative inline-block bg-[#593163] backdrop-blur-lg rounded-3xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 border-2 border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-[#593163]/90 hover:scale-105">
              {/* Inner decorative border */}
              <div className="absolute inset-3 border border-white/30 rounded-2xl" />
              
              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 rounded-full" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/60 rounded-full" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/60 rounded-full" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-semibold uppercase tracking-widest mb-3 drop-shadow-md">
                  Wedding Date & Time
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-sans font-bold text-white drop-shadow-lg">
                  December 3, 2025 • 4:00 PM PST
                </p>
                
                {/* Decorative divider */}
                <div className="flex items-center justify-center mt-4">
                  <div className="w-8 h-px bg-white/40" />
                  <div className="mx-3 w-2 h-2 bg-white/60 rounded-full" />
                  <div className="w-8 h-px bg-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"

export function Footer() {
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.venue
  const receptionVenue = siteConfig.reception.venue

  const [ceremonyMonth = "December", ceremonyDayRaw = "22", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "22"

  const quotes = [
    "In every love story, there's a moment when two hearts become one, and ours is just beginning.",
    "Two souls, one heart—forever entwined in the journey of love and faith together.",
    "Love is not about finding the perfect person, but learning to see an imperfect person perfectly."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#narrative" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-16 text-white overflow-hidden bg-[#DDD3CC]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EDD6AC]/20 via-[#EDD6AC]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B28383]/20 via-[#B28383]/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-[#C2D3C3]/15 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-16 w-24 h-24 bg-[#A78256]/12 rounded-full blur-xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.08, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 left-20 w-28 h-28 bg-[#B28383]/18 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 right-12 w-20 h-20 bg-[#EDD6AC]/15 rounded-full blur-xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Corner decorations */}
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
        
        {/* Decorative horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#A78256]/20" />
      </div>
      
      {/* Monogram - centered at top */}
      <div className="relative flex justify-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/Couple_img/monogram.png"
            alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} Monogram`}
            width={350}
            height={350}
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
            priority={false}
            style={{ filter: "drop-shadow(0 4px 20px rgba(167, 130, 86, 0.4))" }}
          />
          {/* Glow effect behind monogram */}
          <div className="absolute inset-0 blur-3xl bg-[#A78256]/25 -z-10 scale-125" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pb-8 sm:pb-10 md:pb-12">
        {/* Wedding date presentation */}
        <motion.div className="flex justify-center px-2 sm:px-4 mb-8 sm:mb-10 md:mb-12" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
                <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-[10px] sm:text-xs md:text-sm font-sans font-medium text-[#A78256] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3 drop-shadow-md">
                Save The Date
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              {/* Month - Elegant script style */}
              <div className="mb-3 sm:mb-4">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#B28383] leading-none drop-shadow-lg" style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300
                }}>
                  {ceremonyMonth}
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-3 sm:mb-4">
                {/* Day - Large and bold focal point */}
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-[#A78256] leading-none drop-shadow-2xl" style={{
                  textShadow: "0 4px 30px rgba(167, 130, 86, 0.4), 0 2px 8px rgba(178, 131, 131, 0.3)"
                }}>
                  {ceremonyDayNumber.padStart(2, "0")}
                </p>
                
                {/* Vertical divider */}
                <div className="h-12 sm:h-16 md:h-20 lg:h-24 w-px bg-gradient-to-b from-[#B28383]/60 via-[#A78256]/90 to-[#B28383]/60" />
                
                {/* Year - Elegant and refined */}
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#B28383] leading-none drop-shadow-md">
                  {ceremonyYear}
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
              </div>
              
              {/* Time */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium text-[#A78256] tracking-wide mb-2 sm:mb-3 drop-shadow-md">
                {ceremonyTime}
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#EDD6AC]/40 rounded-full flex items-center justify-center border border-[#A78256]/40 flex-shrink-0">
                  <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-[#A78256]" fill="#B28383" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#A78256] drop-shadow-lg" style={{ fontFamily: "var(--font-serif)" }}>{siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}</h3>
              </div>
              <div className="space-y-3 sm:space-y-3.5 md:space-y-4">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 font-lora text-[#B28383]">
                  <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#A78256] flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium">{ceremonyDate}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 font-lora text-[#B28383]">
                  <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#A78256] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">{ceremonyVenue}</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-[#EDD6AC]/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#A78256]/30" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className="font-lora text-[#B28383] italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[#A78256] ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#A78256]/80 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B28383]/60 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#A78256]/80 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={fadeInUp}>
            <motion.div className="bg-[#EDD6AC]/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#A78256]/30 hover:bg-[#EDD6AC]/50 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-3.5 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#A78256]/20 rounded-full flex items-center justify-center border border-[#A78256]/40 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#A78256]" />
                </div>
                <h4 className="font-playfair font-bold text-base sm:text-lg md:text-xl text-[#A78256]">Ceremony</h4>
              </div>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 font-lora text-[#B28383] text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78256] flex-shrink-0" />
                  <span>{ceremonyVenue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78256] flex-shrink-0" />
                  <span>{ceremonyTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-[#EDD6AC]/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#A78256]/30 hover:bg-[#EDD6AC]/50 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 sm:mb-3.5 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#A78256]/20 rounded-full flex items-center justify-center border border-[#A78256]/40 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#A78256]" fill="#B28383" />
                </div>
                <h4 className="font-playfair font-bold text-base sm:text-lg md:text-xl text-[#A78256]">Reception</h4>
              </div>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 font-lora text-[#B28383] text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78256] flex-shrink-0" />
                  <span>{receptionVenue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78256] flex-shrink-0" />
                  <span>{receptionTime}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-6 sm:space-y-7 md:space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-playfair font-bold text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-2.5 md:gap-3 text-[#A78256]">
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 bg-[#A78256]/60 rounded-full" /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EDD6AC]/40 ring-1 ring-[#A78256]/30 hover:bg-[#EDD6AC]/60 hover:ring-[#A78256]/50 transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78256]" />
                </a>
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EDD6AC]/40 ring-1 ring-[#A78256]/30 hover:bg-[#EDD6AC]/60 hover:ring-[#A78256]/50 transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78256]" />
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EDD6AC]/40 ring-1 ring-[#A78256]/30 hover:bg-[#EDD6AC]/60 hover:ring-[#A78256]/50 transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78256]" />
                </a>
                <a 
                  href="https://x.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EDD6AC]/40 ring-1 ring-[#A78256]/30 hover:bg-[#EDD6AC]/60 hover:ring-[#A78256]/50 transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#A78256]" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-playfair font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-[#A78256]">Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="block text-[#B28383] hover:text-[#A78256] transition-colors duration-200 font-lora text-xs sm:text-sm">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-[#A78256]/30 pt-6 sm:pt-7 md:pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6">
            <div className="text-center md:text-left">
              <p className="text-[#B28383] font-lora text-xs sm:text-sm">© {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}. All rights reserved.</p>
              <p className="text-[#A78256] font-lora text-xs sm:text-sm mt-0.5 sm:mt-1">
                Made with 💕 for our special day
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-0.5 sm:space-y-1">
              <p className="text-[#B28383] font-lora text-[10px] sm:text-xs">
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#A78256] hover:text-[#B28383] transition-colors duration-200 underline decoration-[#A78256]/60 hover:decoration-[#B28383]/80"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-[#B28383] font-lora text-[10px] sm:text-xs">
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#A78256] hover:text-[#B28383] transition-colors duration-200 underline decoration-[#A78256]/60 hover:decoration-[#B28383]/80"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}

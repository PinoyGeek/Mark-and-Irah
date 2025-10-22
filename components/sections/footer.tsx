"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, MapPin, Calendar, Clock, Heart, MessageCircle } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    { label: "Our Story", href: "#story" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#rsvp" },
  ] as const

  return (
    <footer className="relative z-20 mt-16 bg-[#9caf88] text-cream overflow-hidden">
      {/* Decorative parallax blobs */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-16 left-8 w-64 h-64 bg-cream/30 rounded-full mix-blend-multiply blur-3xl"
          style={{ y: scrollY * 0.25 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-8 w-64 h-64 bg-cream/20 rounded-full mix-blend-multiply blur-3xl"
          style={{ y: -scrollY * 0.2 }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.12, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">Jam & Jan</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-lora text-white/95">
                  <Calendar className="w-5 h-5 text-white/80" />
                  <span className="text-lg">December 3, 2025</span>
                </div>
                <div className="flex items-center gap-3 font-lora text-white/90">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span>Garden Venue</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className="font-lora text-white/95 italic text-lg leading-relaxed">
                "In every love story, there's a moment when two hearts become one, and ours is just beginning."
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-white/70 rounded-full" />
                <div className="w-2 h-2 bg-white/50 rounded-full" />
                <div className="w-2 h-2 bg-white/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-white">Ceremony</h4>
              </div>
              <div className="space-y-3 font-lora text-white/90 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>Garden Venue</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>3:00 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-playfair font-bold text-xl text-white">Reception</h4>
              </div>
              <div className="space-y-3 font-lora text-white/90 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span>Reception Hall</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-playfair font-bold text-xl mb-6 flex items-center gap-3 text-white">
                <div className="w-2 h-8 bg-white/50 rounded-full" /> Get in Touch
              </h4>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/cattorneyyy" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.facebook.com/share/1BH779VKpX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.tiktok.com/@cattorneyyy?_t=ZS-90kTa4UFZXW&_r=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-playfair font-bold text-lg mb-4 text-white">Quick Links</h5>
              <div className="space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="block text-white/80 hover:text-white transition-colors duration-200 font-lora text-sm">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-white/20 pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/85 font-lora text-sm">© {year} Jam & Jan. All rights reserved.</p>
              <p className="text-white/90 font-lora text-sm mt-1">
                Made with 💕 for our special day
              </p>
              <div className="space-y-1">
                <p className="text-white/80 font-lora text-xs">
                  Developed by{" "}
                  <a 
                    href="https://lance28-beep.github.io/portfolio-website/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                  >
                    Lance Valle
                  </a>
                </p>
                <p className="text-white/80 font-lora text-xs">
                  Want a website like this? Visit{" "}
                  <a 
                    href="https://www.facebook.com/WeddingInvitationNaga" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                  >
                    Wedding Invitation Naga
                  </a>
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Floating Messenger Button */}
        <a
          href="https://m.me/amelyn.mote"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on Messenger"
          className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#0084FF] hover:bg-[#006AFF] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          style={{ boxShadow: '0 0 24px 4px #0084FF55, 0 4px 24px 0 #0002' }}
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}



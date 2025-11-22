"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { siteConfig } from "@/content/site"

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const hashtags = ["#TheBigBANGWedding"]
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section id="snap-share" className="relative bg-transparent py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 z-10">
        <motion.div
          className="text-center mb-6 sm:mb-7 md:mb-9"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#EDD6AC]/40" />
            <div className="w-1.5 h-1.5 bg-[#EDD6AC]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#EDD6AC]/60 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#EDD6AC]/40" />
          </div>
          
          <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#EDD6AC] mb-2 sm:mb-3 drop-shadow-lg leading-tight">
            Snap & Share
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-[#EDD6AC]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            Help us document our special day by sharing moments using our official hashtags.
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
            <div className="w-1.5 h-1.5 bg-[#EDD6AC]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#EDD6AC]/60 rounded-full" />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="bg-[#EDD6AC]/95 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/40 hover:shadow-[0_10px_50px_rgba(167,130,86,0.3)] transition-all duration-300"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
          >
            <div className="relative p-3 sm:p-4 md:p-5">
              {/* Corner accents */}
              <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#A78256]/50 rounded-tl-lg" />
              <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#A78256]/50 rounded-tr-lg" />
              <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#A78256]/50 rounded-bl-lg" />
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#A78256]/50 rounded-br-lg" />
              <div className="text-center">
                <div className="space-y-2 mb-3">
                  {hashtags.map((hashtag) => (
                    <div key={hashtag} className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#C2D3C3]/20 to-[#B28383]/15 px-3 py-2 sm:py-2.5 rounded-lg shadow-md border-2 border-[#C2D3C3]/30 w-full sm:w-auto mx-auto">
                      <span className="font-lora text-sm sm:text-base md:text-lg font-bold text-[#A78256] break-all sm:break-normal tracking-wide">{hashtag}</span>
                      <button
                        onClick={() => copyToClipboard(hashtag)}
                        className="p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm flex-shrink-0 ring-1 ring-[#A78256]/40"
                        title="Copy hashtag"
                      >
                        {copiedHashtag ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C2D3C3]" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A78256]/60" />}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="font-lora text-[#B28383] text-[10px] sm:text-xs md:text-sm mb-2.5">Use these hashtags on your posts to be featured in our gallery.</p>
              </div>

              <div className="mt-4 sm:mt-5">
                <h4 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#A78256] mb-2.5 sm:mb-3 text-center">Our Favorite Moments</h4>
                {/* Two squares on top, one landscape below */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-2 ring-[#A78256]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (1).JPEG" alt="Favorite moment 1" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-2 ring-[#A78256]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (2).JPEG" alt="Favorite moment 2" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative col-span-2 aspect-[3/2] rounded-lg overflow-hidden shadow-md ring-2 ring-[#A78256]/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (4).JPEG" alt="Favorite moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className="font-lora text-[#B28383] text-[9px] sm:text-[10px] md:text-xs text-center mt-2 sm:mt-2.5 px-2">Share your photos using our hashtag to be featured here!</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
            <div className="bg-[#EDD6AC]/95 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/40 hover:shadow-[0_10px_50px_rgba(167,130,86,0.3)] transition-all duration-300">
              <div className="relative p-3 sm:p-4 md:p-5 text-center">
                {/* Corner accents */}
                <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#A78256]/50 rounded-tl-lg" />
                <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#A78256]/50 rounded-tr-lg" />
                <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#A78256]/50 rounded-bl-lg" />
                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#A78256]/50 rounded-br-lg" />
                
                <h4 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#A78256] mb-3">Share Our Website</h4>
                <div className="mx-auto inline-flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl shadow-md border-2 border-[#A78256]/20 mb-3">
                  <div className="mb-2 sm:mb-2.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-[#C2D3C3]/40 via-[#FFFFFF]/40 to-white ring-1 ring-[#A78256]/40">
                    <div className="bg-white p-1.5 sm:p-2 rounded-md shadow-sm">
                      <QRCodeCanvas id="snapshare-qr" value={websiteUrl} size={isMobile ? 100 : 140} includeMargin className="bg-white" />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-3 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-[10px] sm:text-xs md:text-sm bg-gradient-to-r from-[#C2D3C3] to-[#B28383] text-white"
                  >
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="font-lora">Download QR</span>
                  </button>
                </div>
                <p className="font-lora text-[#B28383] text-[9px] sm:text-[10px] md:text-xs">Scan with any camera app</p>
              </div>
            </div>

            {/* Capture the Love Image */}
            <div className="bg-[#EDD6AC]/95 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/40 hover:shadow-[0_10px_50px_rgba(167,130,86,0.3)] transition-all duration-300 overflow-hidden">
              <div className="relative p-3 sm:p-4 md:p-5">
                {/* Corner accents */}
                <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#A78256]/50 rounded-tl-lg" />
                <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#A78256]/50 rounded-tr-lg" />
                <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#A78256]/50 rounded-bl-lg" />
                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#A78256]/50 rounded-br-lg" />
                
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/Couple_img/Capture the Love.png"
                    alt="Capture the Love"
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#EDD6AC]/95 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/40 hover:shadow-[0_10px_50px_rgba(167,130,86,0.3)] transition-all duration-300">
              <div className="relative p-3 sm:p-4 md:p-5">
                {/* Corner accents */}
                <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#A78256]/50 rounded-tl-lg" />
                <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#A78256]/50 rounded-tr-lg" />
                <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#A78256]/50 rounded-bl-lg" />
                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#A78256]/50 rounded-br-lg" />
                
                <h5 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#A78256] mb-2.5 sm:mb-3 text-center">Share on Social Media</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Instagram</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/10"
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">TikTok</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-lora font-medium text-[10px] sm:text-xs md:text-sm">Twitter</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-6 md:mt-7" variants={fadeInUp}>
          <div className="bg-[#EDD6AC]/95 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#A78256]/40 hover:shadow-[0_10px_50px_rgba(167,130,86,0.3)] transition-all duration-300 max-w-3xl mx-auto">
            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Corner accents */}
              <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#A78256]/50 rounded-tl-lg" />
              <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#A78256]/50 rounded-tr-lg" />
              <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#A78256]/50 rounded-bl-lg" />
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#A78256]/50 rounded-br-lg" />
              
              <p className="font-lora text-[#B28383] text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                We are delighted to share this wonderful and blessed moment with you!
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <span className="block font-playfair text-[#A78256] font-bold text-base sm:text-lg md:text-xl">– Edlin Mae & Joshua Jose –</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

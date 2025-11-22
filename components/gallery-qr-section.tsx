"use client"

import { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, Copy, Check, Share2 } from "lucide-react"
import { siteConfig } from "@/content/site"

export function GalleryQRSection() {
  const [copiedDriveQR, setCopiedDriveQR] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const googleDriveUrl = siteConfig.snapShare?.googleDriveLink || ""

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("gallery-drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-google-drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyDriveLink = async () => {
    if (googleDriveUrl) {
      try {
        await navigator.clipboard.writeText(googleDriveUrl)
        setCopiedDriveQR(true)
        setTimeout(() => setCopiedDriveQR(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  if (!googleDriveUrl) return null

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 text-center max-w-2xl mx-auto">
      <div className="bg-[#EDD6AC]/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#A78256]/30 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          {/* Corner accents - hidden on mobile */}
          <div className="hidden sm:block absolute -top-7 -left-7 w-4 h-4 border-t-2 border-l-2 border-[#A78256] rounded-tl-lg" />
          <div className="hidden sm:block absolute -top-7 -right-7 w-4 h-4 border-t-2 border-r-2 border-[#A78256] rounded-tr-lg" />
          <div className="hidden sm:block absolute -bottom-7 -left-7 w-4 h-4 border-b-2 border-l-2 border-[#A78256] rounded-bl-lg" />
          <div className="hidden sm:block absolute -bottom-7 -right-7 w-4 h-4 border-b-2 border-r-2 border-[#A78256] rounded-br-lg" />

          {/* Header */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#C2D3C3] to-[#B28383] flex items-center justify-center shadow-md flex-shrink-0">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h2 className="font-playfair text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#A78256]">
              Upload Your Photos & Videos
            </h2>
          </div>

          {/* Instructions */}
          <p className="font-lora text-[#B28383] text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed px-2">
            {siteConfig.snapShare?.instructions || 
              "Scan the QR code below, create a folder with your name, and upload your photos/videos from our special day!"}
          </p>

          {/* QR Code Container */}
          <div className="mx-auto max-w-xs mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-[#C2D3C3]/10 via-white to-[#B28383]/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#A78256]/20">
              <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-inner">
                <div className="relative mx-auto w-fit">
                  <QRCodeCanvas 
                    id="gallery-drive-qr" 
                    value={googleDriveUrl} 
                    size={isMobile ? 140 : 200} 
                    includeMargin={true}
                    level="H"
                    className="bg-white rounded-lg"
                  />
                  {/* Decorative corners on QR - hidden on very small screens */}
                  <div className="hidden xs:block absolute -top-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#C2D3C3] rounded-tl" />
                  <div className="hidden xs:block absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#C2D3C3] rounded-tr" />
                  <div className="hidden xs:block absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#C2D3C3] rounded-bl" />
                  <div className="hidden xs:block absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#C2D3C3] rounded-br" />
                </div>
              </div>
              
              {/* Scan instruction */}
              <p className="text-center mt-2 sm:mt-3 text-[10px] sm:text-xs text-[#B28383]/70 font-lora">
                📱 Scan with your camera app
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                onClick={downloadDriveQRCode}
                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm bg-gradient-to-r from-[#C2D3C3] to-[#B28383] text-white hover:from-[#C2D3C3]/90 hover:to-[#B28383]/90 font-medium font-lora"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <span className="hidden xs:inline">Download</span>
                <span className="xs:hidden">DL</span>
              </button>
              
              <button
                onClick={copyDriveLink}
                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm border-2 border-[#A78256]/40 hover:border-[#A78256]/60 bg-white hover:bg-[#A78256]/5 font-medium font-lora"
                title="Copy link"
              >
                {copiedDriveQR ? (
                  <>
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C2D3C3]" />
                    <span className="text-[#C2D3C3]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#A78256]" />
                    <span className="text-[#A78256]">Copy</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Divider */}
            <div className="flex items-center gap-1.5 sm:gap-2 py-0.5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A78256]/30 to-transparent" />
              <span className="text-[10px] sm:text-xs text-[#B28383]/60 font-lora italic">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A78256]/30 to-transparent" />
            </div>
            
            {/* Direct link button */}
            <a
              href={googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 w-full py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-[#A78256]/10 to-[#C2D3C3]/10 border-2 border-[#A78256]/30 hover:border-[#A78256]/50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C2D3C3] group-hover:scale-110 transition-transform" />
              <span className="font-lora text-[10px] sm:text-xs md:text-sm text-[#A78256] group-hover:text-[#B28383] font-medium transition-colors">
                Open Google Drive
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


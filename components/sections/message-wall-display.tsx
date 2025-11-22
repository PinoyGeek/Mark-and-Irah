"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-2 border-[#A78256]/20 shadow-lg bg-[#FFF8F2]/90 backdrop-blur-md rounded-2xl">
            <CardContent className="p-4 sm:p-5">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#B28383]/20 to-[#A78256]/20" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 sm:w-32 bg-[#AFC8E6]/20" />
                    <Skeleton className="h-3 w-20 sm:w-24 bg-[#D8B0B0]/20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-4 h-4 rounded bg-[#AFC8E6]/20" />
                  <Skeleton className="w-3 h-3 rounded bg-[#D8B0B0]/20" />
                </div>
              </div>
              <Skeleton className="h-14 sm:h-16 w-full bg-gradient-to-r from-[#B28383]/10 via-[#A78256]/10 to-[#EDD6AC]/10 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 px-4">
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#A78256]/35 to-[#B28383]/25 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-[#A78256] via-[#B28383] to-[#C2D3C3] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          {/* Outer decorative rings */}
          <div className="absolute -inset-3 rounded-full border-2 border-[#AFC8E6]/20 animate-ping"></div>
          <div className="absolute -inset-2 rounded-full border border-[#D8B0B0]/30"></div>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-[#A78256] mb-3 sm:mb-4 drop-shadow-lg">
          No Messages Yet
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-[#B28383] font-lora max-w-md mx-auto leading-relaxed mb-6">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="h-4 w-4 text-[#AFC8E6] animate-pulse" />
            <span className="text-xs sm:text-sm font-lora text-white/90">Your message will appear here</span>
            <Sparkles className="h-4 w-4 text-[#D8B0B0] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border-2 border-[#A78256]/30 shadow-lg bg-[#FFF8F2]/95 backdrop-blur-md hover:shadow-2xl hover:border-[#A78256]/50 transition-all duration-500 group overflow-hidden transform rounded-2xl hover:scale-[1.01] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards',
            boxShadow: '0 4px 18px rgba(167, 130, 86, 0.14), 0 2px 8px rgba(178, 131, 131, 0.12)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 26px rgba(167, 130, 86, 0.22), 0 4px 12px rgba(178, 131, 131, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(167, 130, 86, 0.14), 0 2px 8px rgba(178, 131, 131, 0.12)';
          }}
        >
          {/* Enhanced card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#EDD6AC]/15 via-transparent to-[#C2D3C3]/15 opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A78256]/35 via-[#B28383]/45 to-[#C2D3C3]/35 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 0 1px rgba(167, 130, 86, 0.18)' }} />
          
          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Decorative inner border */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl pointer-events-none">
            {/* Main decorative border */}
            <div className="absolute inset-0 rounded-xl border border-[#C2D3C3]/25 group-hover:border-[#A78256]/40 transition-colors duration-300"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#A78256]/30 rounded-tl-xl group-hover:border-[#A78256]/50 transition-colors duration-300"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#B28383]/30 rounded-tr-xl group-hover:border-[#B28383]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#B28383]/30 rounded-bl-xl group-hover:border-[#B28383]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#EDD6AC]/30 rounded-br-xl group-hover:border-[#EDD6AC]/50 transition-colors duration-300"></div>
            
            {/* Gradient overlay on border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#A78256]/10 via-transparent to-[#C2D3C3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Decorative dots at corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#A78256]/40 rounded-full group-hover:bg-[#A78256]/60 transition-colors duration-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#B28383]/40 rounded-full group-hover:bg-[#B28383]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#B28383]/40 rounded-full group-hover:bg-[#B28383]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#EDD6AC]/40 rounded-full group-hover:bg-[#EDD6AC]/60 transition-colors duration-300"></div>
          </div>
          
          <CardContent className="relative p-4 sm:p-5">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-[#A78256] via-[#B28383] to-[#EDD6AC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/60">
                    <span className="text-white font-lora text-sm sm:text-base font-semibold drop-shadow-sm">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Enhanced avatar glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#A78256]/35 via-[#B28383]/25 to-[#EDD6AC]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#A78256]/15 to-[#B28383]/15 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-20 animate-pulse"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-foreground text-base sm:text-lg font-semibold truncate group-hover:text-[#A78256] transition-colors duration-300">{msg.name}</h4>
                  <span className="text-xs sm:text-sm text-foreground/60 font-lora group-hover:text-foreground/70 transition-colors duration-300">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#A78256]/70 fill-[#A78256]/20 group-hover:fill-[#A78256]/45 group-hover:text-[#A78256] transition-all duration-300 group-hover:scale-110" />
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#B28383]/70 group-hover:text-[#B28383] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-[#A78256]/35 font-playfair group-hover:text-[#A78256]/55 transition-all duration-300 group-hover:scale-110">"</span>
              <p className="text-foreground/85 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 font-lora group-hover:text-foreground/95 transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-[#B28383]/35 font-playfair group-hover:text-[#B28383]/55 transition-all duration-300 group-hover:scale-110">"</span>
            </div>
            
            {/* Enhanced message bottom accent */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-foreground/50">
                <div className="w-1 h-1 rounded-full bg-[#A78256]/60"></div>
                <div className="w-1 h-1 rounded-full bg-[#B28383]/60"></div>
                <div className="w-1 h-1 rounded-full bg-[#C2D3C3]/60"></div>
              </div>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#A78256]/50 via-[#B28383]/60 to-transparent group-hover:via-[#A78256]/70 group-hover:via-[#B28383]/80 transition-all duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

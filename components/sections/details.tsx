import { MapPin, Clock, Utensils, QrCode, Heart, Sparkles, Star } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Image from "next/image"

export function Details() {
  return (
    <Section id="details" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#9CAF88] via-[#9CAF88] to-[#8a9a73]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        <div className="absolute top-10 left-10 animate-pulse">
          <Heart className="text-white/20" size={24} />
        </div>
        <div className="absolute top-32 right-20 animate-pulse delay-1000">
          <Heart className="text-white/15" size={20} />
        </div>
        <div className="absolute bottom-40 left-16 animate-pulse delay-2000">
          <Heart className="text-white/25" size={18} />
        </div>
        <div className="absolute bottom-20 right-32 animate-pulse delay-500">
          <Heart className="text-white/20" size={22} />
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-20 right-10 animate-bounce">
          <Sparkles className="text-white/30" size={16} />
        </div>
        <div className="absolute top-60 left-8 animate-bounce delay-1500">
          <Star className="text-white/25" size={14} />
        </div>
        <div className="absolute bottom-60 right-16 animate-bounce delay-3000">
          <Sparkles className="text-white/20" size={18} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/8 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/6 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      {/* Custom larger title */}
      <div className="relative z-10 text-center mb-12 md:mb-20">
        <div className="inline-block relative">
          <h2 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 text-balance drop-shadow-lg hover:drop-shadow-2xl transition-all duration-500">
            Wedding Details
          </h2>
  
        </div>
        <p className="text-base md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4 hover:text-white transition-colors duration-300">
          Everything you need to know
        </p>
      </div>

      {/* Details content */}
      <div className="relative z-10">
        {/* Venue Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-10 md:mb-12 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-white mb-3 md:mb-4 group-hover:text-white/95 transition-colors duration-300 tracking-wide uppercase">Venue Location</h3>
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
              <MapPin className="text-white group-hover:scale-110 transition-transform duration-300" size={24} />
              <p className="text-lg md:text-xl font-semibold text-white group-hover:text-white/95 transition-colors duration-300">{siteConfig.ceremony.location}</p>
            </div>
            <p className="text-white/80 text-base md:text-lg group-hover:text-white/90 transition-colors duration-300">Near Lucky D Resort</p>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="text-center group/qr">
              <QrCode className="text-white mx-auto mb-2 md:mb-3 group-hover/qr:scale-110 transition-transform duration-300" size={28} />
              <p className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base group-hover/qr:text-white/95 transition-colors duration-300">Scan for Directions</p>
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-105">
                <Image
                  src="/VenueQR.png"
                  alt="Venue QR Code"
                  width={120}
                  height={120}
                  className="rounded-lg md:w-[150px] md:h-[150px]"
                />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-3 md:space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/time">
                <Clock className="text-white group-hover/time:scale-110 transition-transform duration-300" size={20} />
                <div>
                  <p className="text-white font-semibold text-base md:text-lg group-hover/time:text-white/95 transition-colors duration-300">
                    {siteConfig.ceremony.day}, {siteConfig.ceremony.date}
                  </p>
                  <p className="text-white/80 text-sm md:text-base group-hover/time:text-white/90 transition-colors duration-300">
                    Entourage: {siteConfig.ceremony.entourageTime} | Guests: {siteConfig.ceremony.guestsTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/event">
                <Utensils className="text-white group-hover/event:scale-110 transition-transform duration-300" size={20} />
                <div>
                  <p className="text-white font-semibold text-base md:text-lg group-hover/event:text-white/95 transition-colors duration-300">Ceremony & Reception</p>
                  <p className="text-white/80 text-sm md:text-base group-hover/event:text-white/90 transition-colors duration-300">Same venue</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/theme">
                <Sparkles className="text-white group-hover/theme:scale-110 transition-transform duration-300" size={20} />
                <div>
                  <p className="text-white font-semibold text-base md:text-lg group-hover/theme:text-white/95 transition-colors duration-300">{siteConfig.wedding.theme} Theme</p>
                  <p className="text-white/80 text-sm md:text-base group-hover/theme:text-white/90 transition-colors duration-300">{siteConfig.wedding.motif}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ceremony & Reception Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Ceremony */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group hover:-translate-y-2">
            <h3 className="text-xl md:text-2xl font-sans font-black text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3 group-hover:text-white/95 transition-colors duration-300 tracking-wider uppercase">
              <Heart className="text-white group-hover:scale-110 group-hover:text-red-200 transition-all duration-300" size={24} />
              Ceremony
            </h3>

            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/location">
                <MapPin className="text-white flex-shrink-0 mt-1 group-hover/location:scale-110 group-hover/location:text-blue-200 transition-all duration-300" size={20} />
                <div>
                  <p className="font-semibold text-white text-base md:text-lg group-hover/location:text-white/95 transition-colors duration-300">{siteConfig.ceremony.location}</p>
                  <p className="text-xs md:text-sm text-white/70 group-hover/location:text-white/80 transition-colors duration-300">Sariaya, Quezon</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/time">
                <Clock className="text-white flex-shrink-0 mt-1 group-hover/time:scale-110 group-hover/time:text-yellow-200 transition-all duration-300" size={20} />
                <div>
                  <p className="font-semibold text-white text-base md:text-lg group-hover/time:text-white/95 transition-colors duration-300">
                    {siteConfig.ceremony.day}, {siteConfig.ceremony.date}
                  </p>
                  <p className="text-xs md:text-sm text-white/70 group-hover/time:text-white/80 transition-colors duration-300">
                    Entourage: {siteConfig.ceremony.entourageTime} | Guests: {siteConfig.ceremony.guestsTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group hover:-translate-y-2">
            <h3 className="text-xl md:text-2xl font-sans font-black text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3 group-hover:text-white/95 transition-colors duration-300 tracking-wider uppercase">
              <Utensils className="text-white group-hover:scale-110 group-hover:text-green-200 transition-all duration-300" size={24} />
              Reception
            </h3>

            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/location">
                <MapPin className="text-white flex-shrink-0 mt-1 group-hover/location:scale-110 group-hover/location:text-blue-200 transition-all duration-300" size={20} />
                <div>
                  <p className="font-semibold text-white text-base md:text-lg group-hover/location:text-white/95 transition-colors duration-300">{siteConfig.reception.location}</p>
                  <p className="text-xs md:text-sm text-white/70 group-hover/location:text-white/80 transition-colors duration-300">Same venue</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group/event">
                <Utensils className="text-white flex-shrink-0 mt-1 group-hover/event:scale-110 group-hover/event:text-green-200 transition-all duration-300" size={20} />
                <div>
                  <p className="font-semibold text-white text-base md:text-lg group-hover/event:text-white/95 transition-colors duration-300">Dinner & Celebration</p>
                  <p className="text-xs md:text-sm text-white/70 group-hover/event:text-white/80 transition-colors duration-300">Following the ceremony</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group hover:-translate-y-2">
            <h4 className="font-semibold text-white text-lg md:text-xl mb-3 md:mb-4 flex items-center gap-2 md:gap-3 group-hover:text-white/95 transition-colors duration-300">
              <Heart className="text-white group-hover:scale-110 group-hover:text-pink-200 transition-all duration-300" size={20} />
              Dress Code
            </h4>
            <p className="text-white/80 leading-relaxed text-sm md:text-base group-hover:text-white/90 transition-colors duration-300">{siteConfig.dressCode}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group hover:-translate-y-2">
            <h4 className="font-semibold text-white text-lg md:text-xl mb-3 md:mb-4 flex items-center gap-2 md:gap-3 group-hover:text-white/95 transition-colors duration-300">
              <Sparkles className="text-white group-hover:scale-110 group-hover:text-purple-200 transition-all duration-300" size={20} />
              Theme & Motif
            </h4>
            <p className="text-white/80 leading-relaxed text-sm md:text-base group-hover:text-white/90 transition-colors duration-300">
              <span className="font-semibold">{siteConfig.wedding.theme}</span> theme with <span className="font-semibold">{siteConfig.wedding.motif}</span> color palette. 
              Embrace the rustic charm with natural textures and earthy elegance.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 group hover:-translate-y-2">
            <h4 className="font-semibold text-white text-lg md:text-xl mb-3 md:mb-4 flex items-center gap-2 md:gap-3 group-hover:text-white/95 transition-colors duration-300">
              <MapPin className="text-white group-hover:scale-110 group-hover:text-blue-200 transition-all duration-300" size={20} />
              Travel & Parking
            </h4>
            <p className="text-white/80 leading-relaxed text-sm md:text-base group-hover:text-white/90 transition-colors duration-300">
              Ample parking is available at the venue. For those traveling from Manila, the drive is approximately 2-3
              hours. We recommend leaving early to avoid traffic and enjoy the scenic route.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}


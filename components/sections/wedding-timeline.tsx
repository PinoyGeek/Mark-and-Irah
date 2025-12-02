"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import {
  Clock,
  Heart,
  Users,
  Camera,
  Car,
  Utensils,
  Mic,
  Music,
  Sparkles,
  MapPin,
} from "lucide-react"
import { motion } from "motion/react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: typeof Clock
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "12:00 PM",
    title: "Entourage Arrival",
    description: "Wedding entourage arrives at the church for final preparations and photos",
    location: siteConfig.ceremony.venue,
    icon: Users,
  },
  {
    time: "12:30 PM",
    title: "Ceremony Begins",
    description: "Guests are seated. The wedding ceremony starts at exactly 12:30 PM",
    location: siteConfig.ceremony.venue,
    icon: Heart,
  },
  {
    time: "1:30 PM",
    title: "Post-Ceremony Photos",
    description: "Family and entourage photos with the newlyweds",
    location: siteConfig.ceremony.venue,
    icon: Camera,
  },
  {
    time: "2:00 PM",
    title: "Travel to Reception",
    description: "Guests proceed to the reception venue",
    location: "En route to " + siteConfig.reception.venue,
    icon: Car,
  },
  {
    time: "2:30 PM",
    title: "Reception Arrival",
    description: "Welcome drinks and light refreshments as guests arrive",
    location: siteConfig.reception.venue,
    icon: Sparkles,
  },
  {
    time: "3:00 PM",
    title: "Reception Program",
    description: "Wedding program begins with introductions and special presentations",
    location: siteConfig.reception.venue,
    icon: Mic,
  },
  {
    time: "4:00 PM",
    title: "Dinner Service",
    description: "Buffet dinner is served. Please enjoy the meal!",
    location: siteConfig.reception.venue,
    icon: Utensils,
  },
  {
    time: "5:00 PM",
    title: "Program Continues",
    description: "Special numbers, games, and celebrations continue",
    location: siteConfig.reception.venue,
    icon: Music,
  },
]

export function WeddingTimeline() {
  return (
    <Section
      id="wedding-timeline"
      className="relative py-8 sm:py-10 md:py-14 lg:py-18 overflow-hidden"
    >
      {/* Header - matching details section style */}
      <div className="relative z-10 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase text-[#F5E5D9]/80 mb-2`}>
          Day Schedule
        </p>

        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#FDECEF] mb-1.5 sm:mb-3 md:mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
          Wedding Timeline
        </h2>

        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-[#FCEFF7]/90 max-w-xl mx-auto leading-relaxed px-2">
          A glimpse of the moments we'll share throughout the day.
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#F5E5D9]/35" />
          <div className="w-1.5 h-1.5 bg-[#FDECEF] rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#F5E5D9]/35" />
        </div>
      </div>

      {/* Timeline - improved desktop layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Vertical timeline line - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#660033]/40 via-[#B76E79]/50 via-[#F5E5D9]/40 to-[#660033]/40 -translate-x-1/2 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FDECEF]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FDECEF]" />
        </div>

        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-6 sm:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#660033]/40 via-[#B76E79]/50 to-[#660033]/40 pointer-events-none" />

        <div className="space-y-4 sm:space-y-5 md:space-y-8 lg:space-y-10">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
    >
      {/* Desktop layout: alternating sides - improved */}
      <div className="hidden md:flex items-center">
        {/* Left side container (for even indices: 0, 2, 4...) */}
        <div className={`flex-1 flex ${isEven ? "justify-end pr-8 lg:pr-12" : ""}`}>
          {isEven && <TimelineCard event={event} Icon={Icon} />}
        </div>

        {/* Center icon - always in the middle */}
        <div className="relative z-10 flex-shrink-0 mx-2 lg:mx-4">
          <IconBadge Icon={Icon} />
        </div>

        {/* Right side container (for odd indices: 1, 3, 5...) */}
        <div className={`flex-1 flex ${!isEven ? "justify-start pl-8 lg:pl-12" : ""}`}>
          {!isEven && <TimelineCard event={event} Icon={Icon} />}
        </div>
      </div>

      {/* Mobile layout: compact stacked */}
      <div className="md:hidden flex items-start gap-3">
        <div className="relative z-10 flex-shrink-0 mt-0.5">
          <IconBadge Icon={Icon} mobile />
        </div>
        <div className="flex-1 min-w-0">
          <TimelineCard event={event} Icon={Icon} mobile />
        </div>
      </div>
    </motion.div>
  )
}

function TimelineCard({ event, Icon, mobile }: { event: TimelineEvent; Icon: typeof Clock; mobile?: boolean }) {
  return (
    <div className={`rounded-lg sm:rounded-xl border border-[#FDECEF]/25 bg-white/85 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ${mobile ? "p-3" : "p-4 sm:p-5 md:p-6 lg:p-7"} max-w-md`}>
      <div className={`${mobile ? "space-y-2" : "space-y-3 md:space-y-4"}`}>
        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock className={`${mobile ? "w-3.5 h-3.5" : "w-4 h-4 md:w-5 md:h-5"} text-[#660033] flex-shrink-0`} />
          <p className={`${mobile ? "text-[10px]" : "text-xs sm:text-sm md:text-base"} font-bold tracking-[0.15em] text-[#660033] uppercase`}>
            {event.time}
          </p>
        </div>

        {/* Title */}
        <h3 className={`${mobile ? "text-sm sm:text-base" : "text-base sm:text-lg md:text-xl lg:text-2xl"} font-semibold text-[#3B2222] leading-tight`}>
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p className={`${mobile ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm md:text-base"} text-[#4A2B2B]/75 leading-relaxed`}>
            {event.description}
          </p>
        )}

        {/* Location */}
        {event.location && (
          <div className={`flex items-start gap-1.5 ${mobile ? "pt-1.5" : "pt-2 md:pt-3"} border-t border-[#F5E5D9]/50`}>
            <MapPin className={`${mobile ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"} text-[#B76E79] mt-0.5 flex-shrink-0`} />
            <p className={`${mobile ? "text-[10px]" : "text-xs md:text-sm"} text-[#4A2B2B]/70 leading-relaxed`}>
              {event.location}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function IconBadge({ Icon, mobile }: { Icon: typeof Clock; mobile?: boolean }) {
  return (
    <div className={`${mobile ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"} rounded-full border-2 border-[#FDECEF]/40 bg-gradient-to-br from-white to-[#FDECEF] flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300`}>
      <Icon className={`${mobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"} text-[#660033]`} />
    </div>
  )
}


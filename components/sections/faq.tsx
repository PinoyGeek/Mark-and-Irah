"use client"

import React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

// Colors sourced from globals.css @theme inline — edit there to update everywhere
const palette = {
  deep:          "var(--color-motif-deep)",
  softBrown:     "var(--color-motif-medium)",
  background:    "var(--color-motif-cream)",
  champagneGold: "var(--color-motif-silver)",
  champagneLight:"var(--color-motif-cream)",
} as const

interface FAQItem {
  question: string
  answer: string
}

const onlineFaqItems: FAQItem[] = [
  {
    question: "Joining the Wedding",
    answer:
      "Click the Zoom Meeting ID and Passcode we've shared. It will open directly in your browser or the Zoom app.",
  },
  {
    question: "Do I need Zoom installed?",
    answer:
      "You don't have to, but the free Zoom app works best on your phone, tablet, or computer.",
  },
  {
    question: "When should I log in?",
    answer:
      "Please join 10–15 minutes before the ceremony begins to check your connection and get settled.",
  },
  {
    question: "Is a password required?",
    answer: "Yes, use the password we provided.",
  },
  {
    question: "Camera and microphone settings",
    answer:
      "Turning on your camera is optional—we'd love to see you! Keep your microphone muted unless asked to unmute.",
  },
  {
    question: "Can I send greetings?",
    answer:
      "Absolutely! Share your messages and well-wishes anytime in the Zoom chat.",
  },
  {
    question: "Dress code",
    answer:
      "Formal attire is encouraged so we can all celebrate in style.",
  },
  {
    question: "Screenshots or recording",
    answer:
      "The couple will record the event, so you don't need to. Feel free to take personal screenshots for memories.",
  },
  {
    question: "Technical issues",
    answer:
      "If you encounter problems, send a private message to the Zoom host for assistance.",
  },
  {
    question: "How may we give a gift to the couple?",
    answer:
      "Your presence at our wedding is the greatest gift we could ask for. If you would like to honor us with a present, we would deeply appreciate a cash gift as we begin our new journey together.",
  },
]

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer: `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day})`,
  },
  {
    question: "What time should I arrive for the ceremony?",
    answer:
      "Our ceremony will begin promptly at 2:00 PM. We kindly ask guests to arrive 30–45 minutes earlier to allow enough time for parking, walking to the ceremony area, and finding your seats so we can begin on time. The reception will follow at 4:00 PM.",
  },
  {
    question: "Where will the Wedding Ceremony and Reception Take Place?",
    answer:
      "The ceremony will be held at the Kingdom Hall of Jehovah's Witnesses at Lawa-an Roxas City, Capiz. The reception will follow at The Espacio Verde Resort and Resente Residence. You can find detailed directions, addresses, and maps in the Details section above.",
  },
  {
    question: "How can I know if I'm going to the Reception of Espacio Verde or Resente Residence?",
    answer:
      "We would love to accommodate everyone in one location to share our joy on this special day at one long table. However, since the resort's capacity is limited, please remember that true maturity and friendship are not defined by location. Whether you are at Espacio Verde or Resente Residence, we are grateful to have you with us today.\n\nIf you are assigned to Espacio Verde, you will receive a confirmation ticket with your full name. Please download the file and present it at the entrance gate. If you have not received this ticket, and your name is not included on the list, kindly proceed to Resente Residence.",
  },
  {
    question: "Is the seat transferable?",
    answer:
      "No. Reserved seats are non-transferable. Please inform us in advance so we can reassign your seat accordingly.",
  },
  {
    question: "Are children allowed at the event?",
    answer:
      "As much as we adore your little ones, we have decided to keep our celebration an adult-only event to maintain an intimate and relaxed atmosphere for everyone.\n\nWe truly appreciate your understanding and can't wait to celebrate this special day with you.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Wedding attire details are in the Guest Information section above. We kindly request our guests to dress in attire following our wedding palette.",
  },
  {
    question: "Can I sit anywhere at the reception?",
    answer:
      "Please don't. We kindly ask our guests to follow the seating arrangement prepared for the reception.\n\nA great deal of thought and care went into planning the seating so that everyone will feel comfortable and be seated with friends, family, or guests who share similar connections. Each seat was thoughtfully arranged with every guest in mind. Our reception team will gladly assist you in finding your assigned table.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at both venues. Please follow the parking signs and instructions from our venue coordinators.",
  },
  {
    question: "Will there be a wedding gift registry?",
    answer:
      "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
  },
  {
    question: "Unplugged Ceremony",
    answer:
      "EYES UP, PHONES DOWN, HEARTS OPEN.\n\nThe greatest gift you can give us during our ceremony is your presence. We respectfully request that guests refrain from taking photos or videos during the ceremony so our official photographers can capture every moment without distraction. We promise to share the beautiful photos with you afterward!\n\nOur professional photographers will be capturing every beautiful memory, and we promise to share the photos with everyone afterwards.",
  },
  {
    question: "Can I take photos or videos during the reception?",
    answer:
      "Yes! While our I DO's will be unplugged, our reception will not be. As a couple who loves photos and memories, we would love for you to capture the fun moments throughout the evening. We prepared this celebration wholeheartedly and we want everyone to enjoy it fully.",
  },
  {
    question: "When is the appropriate time to leave?",
    answer:
      "It took us some time to plan a heartfelt wedding that we hope everyone will enjoy. We humbly request that you celebrate with us until the program concludes. Please don't eat and run! Let's laugh together, take pictures, share meaningful conversations, and have fun!",
  },
  {
    question: "Can I participate in customs and traditions such as clinking glasses at weddings, pinning or clipping money, throwing money, or tossing rice and coins?",
    answer:
      "No. Our trained conscience guides us not to participate in such customs and traditions. We live to please Jehovah our God, the Originator of marriage, and to make this wedding day honorable in His sight. We cherish and value your support for us. Thank you so much!",
  },
  {
    question: "Where to stay in Roxas City?",
    answer:
      "Just go to Google, type 'Roxas City Hotels' in the search engine, and click on agoda.com. Booking hotels on Agoda is generally cheaper than walking in, often saving you significant money compared to the \"rack rate\" at the front desk.\n\nIf you're looking for something practical and budget-friendly, yet simple and classy, you may consider the ff:\n\n• Stay In Apartelle\n[LINK:https://www.facebook.com/profile.php?id=61578408670101]View on Facebook[/LINK]\n(Near Espacio Verde, Capiz Bay Resort, River Tours, Roxas City Plaza\n\n• Twin Hearts Residences\n[LINK:https://www.facebook.com/profile.php?id=100085629667307]View on Facebook[/LINK]\n(Near Kingdom Hall of JW Lawaan, Robinsons Mall, Pueblo De Panay, El Circulo, KFC, Bus/Ceres Terminal)\n\nPlease click the Facebook links above to view the room rates and amenities. Thank you!",
  },
  {
    question: "How can I help the couple have a great time during their wedding?",
    answer:
      "• Pray with us for favorable weather and the continuous blessings from Jehovah God as we enter this new chapter of our lives as husband and wife.\n\n• Dress appropriately and follow our wedding motif.\n\n• Secure your confirmation ticket.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Don't hesitate to leave us a warm message.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
  },
]

/** Renders answer text, turning [LINK:url]label[/LINK] markers into anchor tags. */
function renderAnswer(answer: string, className: string, style: React.CSSProperties) {
  if (!answer.includes("[LINK:")) {
    return <p className={className} style={style}>{answer}</p>
  }

  const linkPattern = /\[LINK:(.*?)\](.*?)\[\/LINK\]/g
  const segments: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkPattern.exec(answer)) !== null) {
    if (match.index > lastIndex) {
      segments.push(answer.slice(lastIndex, match.index))
    }
    segments.push(
      <a
        key={match.index}
        href={match[1]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-bold transition-colors hover:opacity-80"
        style={{ color: palette.softBrown }}
      >
        {match[2]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < answer.length) {
    segments.push(answer.slice(lastIndex))
  }

  return <p className={className} style={style}>{segments}</p>
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative w-full" style={{ backgroundColor: palette.background }}>
      {/* Full-bleed layered background — champagne + beige with gentle texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Soft diagonal wash */}
        <div
          className="absolute inset-0 opacity-[0.24]"
          style={{
            background: 'linear-gradient(150deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-silver) 14%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 3%, transparent) 100%)',
          }}
        />
        {/* Glow behind FAQ card */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background: 'radial-gradient(circle at 50% 10%, var(--color-motif-silver) 0%, transparent 55%)',
          }}
        />
        {/* Subtle vertical texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.0) 0, rgba(255,255,255,0.0) 32px, rgba(255,255,255,0.3) 33px, rgba(255,255,255,0.3) 34px)",
          }}
        />
      </div>

      <Section id="faq" className="relative z-10 py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Corner decorations — soft brown tint */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <CloudinaryImage src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20 scale-y-[-1]" priority={false} style={{ filter: "brightness(0) saturate(100%) invert(39%) sepia(18%) saturate(486%) hue-rotate(62deg) brightness(94%) contrast(88%)" }} />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <CloudinaryImage src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20 scale-x-[-1] scale-y-[-1]" priority={false} style={{ filter: "brightness(0) saturate(100%) invert(39%) sepia(18%) saturate(486%) hue-rotate(62deg) brightness(94%) contrast(88%)" }} />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <CloudinaryImage src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20" priority={false} style={{ filter: "brightness(0) saturate(100%) invert(39%) sepia(18%) saturate(486%) hue-rotate(62deg) brightness(94%) contrast(88%)" }} />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <CloudinaryImage src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20 scale-x-[-1]" priority={false} style={{ filter: "brightness(0) saturate(100%) invert(39%) sepia(18%) saturate(486%) hue-rotate(62deg) brightness(94%) contrast(88%)" }} />
      </div>

      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] mb-2`} style={{ color: palette.softBrown }}>
          Answers for our celebration day
        </p>
        <h2 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-1.5 sm:mb-3 md:mb-4`} style={{ color: palette.deep, textShadow: "0 2px 10px rgba(91,102,85,0.22)" }}>
          Frequently Asked Questions
        </h2>
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`} style={{ color: palette.softBrown }}>
          Helpful notes so you can simply arrive, celebrate, and enjoy this new chapter with us.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.champagneGold }} />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.champagneGold }} />
            <span className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: palette.champagneGold }} />
            <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.champagneGold }} />
          </div>
          <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.champagneGold }} />
        </div>
      </div>

      {/* FAQ content — cream container with motif accents */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        <div
          className="relative backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 94%, transparent)',
            boxShadow: '0 4px 28px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)',
          }}
        >
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                const answerClassName = `${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`
                const answerStyle = { color: palette.deep }
                return (
                  <div
                    key={index}
                    className="rounded-xl sm:rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 96%, white)',
                      boxShadow: '0 4px 28px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)',
                    }}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-motif-deep transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${cinzel.className} font-semibold pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200`}
                        style={{ color: isOpen ? palette.softBrown : palette.deep }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: palette.softBrown }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 border-t"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 90%, transparent)', borderColor: 'color-mix(in srgb, var(--color-motif-deep) 25%, transparent)' }}
                        >
                          {renderAnswer(item.answer, answerClassName, answerStyle)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ── Online Invitation FAQ ── */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5 mt-10 sm:mt-14 md:mt-16">

        {/* Online section header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] mb-2`} style={{ color: palette.softBrown }}>
            For guests joining remotely
          </p>
          <h2 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1.5 sm:mb-3`} style={{ color: palette.deep, textShadow: "0 2px 10px rgba(91,102,85,0.22)" }}>
            Online Invitation&apos;s FAQ
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.champagneGold }} />
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.champagneGold }} />
              <span className="w-1.5 h-1.5 rounded-full opacity-50" style={{ backgroundColor: palette.champagneGold }} />
              <span className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: palette.champagneGold }} />
            </div>
            <span className="h-px w-10 sm:w-14 rounded-full" style={{ backgroundColor: palette.champagneGold }} />
          </div>
        </div>

        {/* Zoom Details card */}
        <div
          className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md mb-4 sm:mb-5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 94%, transparent)',
            boxShadow: '0 4px 28px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)',
          }}
        >
          <div className="px-4 sm:px-6 py-4 sm:py-5 md:py-6 space-y-4">
            {/* Title row */}
            <div>
              <p className={`${cinzel.className} text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-0.5`} style={{ color: palette.softBrown }}>
                Mark &amp; Irah Nuptial
              </p>
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg font-medium`} style={{ color: palette.deep }}>
                Time: 2:00 – 7:00 PM
              </p>
            </div>

            <hr style={{ borderColor: 'color-mix(in srgb, var(--color-motif-deep) 18%, transparent)' }} />

            {/* Zoom credentials */}
            <div className="space-y-1.5">
              <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-semibold`} style={{ color: palette.softBrown }}>
                Zoom Details
              </p>
              <div className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed space-y-0.5`} style={{ color: palette.deep }}>
                <p><span className="font-semibold">Meeting ID:</span> 350 336 1534</p>
                <p><span className="font-semibold">Passcode:</span> 106324</p>
              </div>
              <a
                href="https://jworg.zoom.us/j/3503361534?pwd=yVbu9hCEvbXs5jX1AgowsJOSmUvggF.1&omn=83117635238"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cormorant.className} inline-block text-sm sm:text-base md:text-lg font-semibold underline underline-offset-2 transition-opacity hover:opacity-75 break-all`}
                style={{ color: palette.softBrown }}
              >
                Join Zoom Meeting
              </a>
            </div>

            <hr style={{ borderColor: 'color-mix(in srgb, var(--color-motif-deep) 18%, transparent)' }} />

            {/* Virtual background */}
            <div className="space-y-2">
              <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-semibold`} style={{ color: palette.softBrown }}>
                Virtual Background
              </p>
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg leading-relaxed`} style={{ color: palette.deep }}>
                We wish to have memorable photos with you. Kindly use our virtual background or join our photo ops after the ceremony, or send us a copy of your own screenshot. Thank you for your love, understanding, and support.{" "}
                <span className="font-semibold">SEE YOU ON ZOOM!</span>
              </p>
              <a
                href="https://drive.google.com/drive/folders/19z4DMP-7cSfMXYQbAyPiTm43mRptrNj2?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cormorant.className} inline-block text-sm sm:text-base md:text-lg font-semibold underline underline-offset-2 transition-opacity hover:opacity-75`}
                style={{ color: palette.softBrown }}
              >
                Download Virtual Background (Google Drive)
              </a>
            </div>
          </div>
        </div>

        {/* Online Q&A accordion */}
        <div
          className="relative backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 94%, transparent)',
            boxShadow: '0 4px 28px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)',
          }}
        >
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {onlineFaqItems.map((item, index) => {
                const globalIndex = faqItems.length + index
                const isOpen = openIndex === globalIndex
                const contentId = `online-faq-item-${index}`
                const answerClassName = `${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`
                const answerStyle = { color: palette.deep }
                return (
                  <div
                    key={globalIndex}
                    className="rounded-xl sm:rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 96%, white)',
                      boxShadow: '0 4px 28px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)',
                    }}
                  >
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-motif-deep transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${cinzel.className} font-semibold pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200`}
                        style={{ color: isOpen ? palette.softBrown : palette.deep }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: palette.softBrown }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 border-t"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--color-motif-cream) 90%, transparent)', borderColor: 'color-mix(in srgb, var(--color-motif-deep) 25%, transparent)' }}
                        >
                          {renderAnswer(item.answer, answerClassName, answerStyle)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      </Section>
    </div>
  )
}

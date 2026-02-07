"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

// FAQ palette — warm brown to match hero/details/guest-info
const FAQ_ACCENT = "#9B6A41"
const FAQ_DARK = "#624630"
const FAQ_DARKER = "#3E2914"
const FAQ_CREAM = "#F8F4EE"
const FAQ_CREAM_ALT = "#E8E0D5"
const DECO_FILTER_WHITE = "brightness(0) saturate(100%) invert(1)"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}). The ceremony will begin promptly at ${siteConfig.ceremony.time}, and we kindly ask guests to arrive by ${siteConfig.ceremony.guestsTime} to help us begin on time. The reception will follow at ${siteConfig.reception.time}.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location}. The reception will follow at ${siteConfig.reception.location}. You can find detailed directions, addresses, and maps in the Details section above.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `We kindly request guests to arrive by ${siteConfig.ceremony.guestsTime} to allow ample time to settle in before the ceremony, which will begin promptly at ${siteConfig.ceremony.time}. The reception will follow at ${siteConfig.reception.time}. The entourage is requested to arrive by ${siteConfig.ceremony.entourageTime}. Your punctuality means so much to us!`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please RSVP through the RSVP section on this invitation. Simply search for your name in the guest list, confirm your attendance, and let us know if you'll be bringing companions. We kindly ask for your response on or before ${siteConfig.details.rsvp.deadline} to help us prepare for the big day. For any questions, please contact ${siteConfig.details.rsvp.contact} at ${siteConfig.details.rsvp.phone}.`,
  },
  {
    question: "Can I bring a plus one or additional guests?",
    answer:
      "Each invitation includes a specific number of reserved seats. Please check your invitation details in the RSVP section. If you need to request additional seats, you can use the 'Request to Join' feature, and we'll do our best to accommodate based on availability.",
  },
  {
    question: "Can I bring my children?",
    answer:
      "While we love your little ones, we kindly request an adults-only celebration so everyone can relax and enjoy the evening.",
  },
  {
    question: "Is there a dress code?",
    answer:
      `Wedding attire details are in the Guest Information section above.\n\n• Principal Sponsors: Strictly formal (Gentlemen: Black Suit and Pants | Ladies: Champagne Long Gown)\n• Guests: Semi-formal / formal following our motif\n\nWe look forward to seeing you dressed for the occasion!`,
  },
  {
    question: "Will there be assigned seating?",
    answer:
      "Yes, there will be assigned seating at the reception. Your table number will be displayed in the Book of Guests section once your RSVP is confirmed. Our reception team will gladly guide you to your table so you can relax and enjoy the celebration.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at both venues. Please follow the parking signs and instructions from our venue coordinators.",
  },
  {
    question: "What should I give as a gift?",
    answer:
      "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
  },
  {
    question: "Can I take photos and videos during the ceremony?",
    answer:
      "We have a professional photographer and videographer capturing our special moments. We kindly ask that you keep your phones on silent and refrain from taking photos during the ceremony. However, we'd love to see your photos and videos from the reception! Please check the Snap & Share section for details on how to upload them.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
  },
  {
    question: "How can I help the couple have a great time during their wedding?",
    answer:
      "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our wedding motif.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Corner decorations — warm brown tint */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-60 scale-y-[-1]"
          priority={false}
          style={{ filter: DECO_FILTER_WHITE }}
        />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-60 scale-x-[-1] scale-y-[-1]"
          priority={false}
          style={{ filter: DECO_FILTER_WHITE }}
        />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-60"
          priority={false}
          style={{ filter: DECO_FILTER_WHITE }}
        />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-60 scale-x-[-1]"
          priority={false}
          style={{ filter: DECO_FILTER_WHITE }}
        />
      </div>

      {/* Section Header — white text */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] mb-2 text-white`}
        >
          Everything You Need to Know
        </p>
        <h2
          className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1.5 sm:mb-3 md:mb-4 text-white`}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3 text-white`}
        >
          Common questions answered to help you prepare for our special day
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
      </div>

      {/* FAQ content — cream container with warm brown accents */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        <div
          className="relative backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border shadow-lg"
          style={{
            backgroundColor: FAQ_CREAM,
            borderColor: `${FAQ_ACCENT}35`,
            boxShadow: `0 4px 24px rgba(62,41,20,0.08), 0 0 0 1px ${FAQ_ACCENT}15`,
          }}
        >
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-xl sm:rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: `${FAQ_ACCENT}30`,
                    }}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9B6A4150] transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${cinzel.className} font-semibold pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200`}
                        style={{ color: isOpen ? FAQ_ACCENT : FAQ_DARK }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: FAQ_ACCENT }}
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
                          style={{ backgroundColor: FAQ_CREAM_ALT + "99", borderColor: `${FAQ_ACCENT}25` }}
                        >
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`} style={{ color: FAQ_DARKER }}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="underline font-bold transition-colors hover:opacity-80"
                                style={{ color: FAQ_ACCENT }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : item.question === "Is there a dress code?" ? (
                            <div className="space-y-3 sm:space-y-4">
                              <p className={`${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg tracking-wide whitespace-pre-line`} style={{ color: FAQ_DARKER }}>
                                {item.answer}
                              </p>
                              {/* Warm brown color palette */}
                              <div className="flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3 mt-4 sm:mt-5">
                                {[
                                  { color: FAQ_ACCENT, label: "Accent" },
                                  { color: "#C1AC94", label: "Beige" },
                                  { color: FAQ_DARK, label: "Brown" },
                                  { color: FAQ_DARKER, label: "Dark" },
                                ].map(({ color }) => (
                                  <div key={color} className="flex-1 max-w-[40px] sm:max-w-[50px] md:max-w-[60px] lg:max-w-[70px] group">
                                    <div
                                      className="w-full h-16 sm:h-20 md:h-24 lg:h-28 transition-all duration-300 group-hover:scale-105 rounded-b"
                                      style={{
                                        backgroundColor: color,
                                        boxShadow: `0 2px 8px ${color}40`,
                                        border: `2px solid ${FAQ_ACCENT}25`,
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className={`${cormorant.className} font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`} style={{ color: FAQ_DARKER }}>
                              {item.answer}
                            </p>
                          )}
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
  )
}

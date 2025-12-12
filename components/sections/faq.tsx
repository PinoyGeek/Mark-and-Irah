"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Is there a dress code?",
    answer:
      `We kindly request our guests to dress in formal attire with a color of our motif. Please see the Attire section for details.\n\nMale Sponsor: ${siteConfig.dressCode.sponsors.male}\nFemale Sponsor: ${siteConfig.dressCode.sponsors.female}\nGents: ${siteConfig.dressCode.guests.gents}\nLadies: ${siteConfig.dressCode.guests.ladies}`,
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We'd love to include everyone, but due to limited space and resources, we kindly ask that only those we've personally invited join us for the celebration.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at the venue.",
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please RSVP on or before December 31, 2025 through the RSVP section on this invitation. We kindly ask for your response to help us prepare for the big day.`,
  },
  {
    question: "Will there be assigned seating?",
    answer:
      "Yes, there will be assigned seating, and our reception team will gladly guide you to your table so you can relax and enjoy the celebration.",
  },
  {
    question: "What should I give as a gift?",
    answer:
      "With all that we have, we are truly blessed, your presence and prayers are what we request. But if you desire to give nonetheless, monetary gift is the one we humbly suggest.",
  },
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time}. We kindly ask guests to arrive by ${siteConfig.ceremony.guestsTime} to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location}. The reception will be held at ${siteConfig.reception.location}. You can find directions and copy the addresses in the Details section above.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Kindly arrive by ${siteConfig.ceremony.guestsTime} so we can begin the ceremony promptly at exactly ${siteConfig.ceremony.time}. Your punctuality means so much to us!`,
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
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#D2A4A4]"
    >
      {/* Background elements with elegant sage green motif (aligned with narrative section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Vertical sage gradients to frame the FAQ */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#D3B9A2]/92 via-[#D2A4A4]/78 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#D3B9A2]/95 via-[#D2A4A4]/72 to-transparent" />
        {/* Soft radial light in warm neutrals */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,207,181,0.28),transparent_55%)] opacity-90" />
        {/* Subtle diagonal wash of muted sage */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6E7A61]/24 via-transparent to-[#F7E6CA]/12 mix-blend-soft-light" />
      </div>

      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Questions & Answers
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Frequently Asked Questions
        </h2>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-white/60 to-transparent" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-[#F7E6CA]/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#F7E6CA]/40 bg-white/5 backdrop-blur-sm hover:border-[#F7E6CA]/70 hover:bg-white/10 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FDECEF]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${cormorant.className} font-semibold text-white pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#FDECEF]`}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-white/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
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
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/5 border-t border-[#F7E6CA]/30">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} text-white/95 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-line`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-white underline font-semibold hover:text-[#F0F0EE] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className={`${cormorant.className} text-white/95 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-line`}>
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

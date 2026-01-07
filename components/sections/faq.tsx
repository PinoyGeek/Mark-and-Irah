"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the wedding?",
    answer:
      `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day}) at ${siteConfig.ceremony.time}. We kindly ask guests to arrive by ${siteConfig.ceremony.guestsTime} to help us begin promptly.`,
  },
  {
    question: "Where will the ceremony and reception take place?",
    answer:
      `The ceremony will be held at ${siteConfig.ceremony.location}. The reception will follow at ${siteConfig.reception.location}. You can find detailed directions, addresses, and maps in the Details section above.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Kindly arrive by ${siteConfig.ceremony.guestsTime} so we can begin the ceremony promptly at exactly ${siteConfig.ceremony.time}. The entourage will arrive at ${siteConfig.ceremony.entourageTime}. Your punctuality means so much to us!`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please RSVP through the RSVP section on this invitation. Simply search for your name in the guest list, confirm your attendance, and let us know if you'll be bringing companions. We kindly ask for your response to help us prepare for the big day.`,
  },
  {
    question: "Can I bring a plus one or additional guests?",
    answer:
      "Each invitation includes a specific number of reserved seats. Please check your invitation details in the RSVP section. If you need to request additional seats, you can use the 'Request to Join' feature, and we'll do our best to accommodate based on availability.",
  },
  {
    question: "Is there a dress code?",
    answer:
      `Yes! We kindly request our guests to dress in formal attire matching our wedding colors. Please see the Attire section in Details for specific guidelines:\n\nPrincipal Sponsors:\n• Male: Barong, Black Pants and Leather Shoes\n• Female: shades of BURGUNDY/MAROON\n\nWedding Guests:\n• Formal or Semi Formal attire\n• We encourage you to dress according to our wedding colors to help create a soft, elegant romantic celebration.`,
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
    question: "Will the wedding be indoors or outdoors?",
    answer:
      "Both the ceremony and reception will be held at covered venues, so we're prepared for any weather. However, we recommend checking the weather forecast and dressing accordingly.",
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
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#751A23]"
    >
      {/* Background image - matching gallery */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/Details/newBackground.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.75)" }}
        >
          Everything You Need to Know
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
          style={{ textShadow: "0 4px 18px rgba(0,0,0,0.85)" }}
        >
          Frequently Asked Questions
        </h2>
        
        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Common questions answered to help you prepare for our special day
        </p>

        {/* Simple divider */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#327B72]/80 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-[#327B72]/80 to-transparent" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-30 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Main card */}
        <div className="relative bg-[#F4F4F4]/95 backdrop-blur-md border border-[#327B72]/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(117,26,35,0.3)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#327B72]/10 via-transparent to-[#751A23]/5 pointer-events-none" />
          
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#327B72]/40 bg-white/50 hover:border-[#751A23]/60 hover:bg-white/70 transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#751A23]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className={`${cormorant.className} font-semibold text-[#751A23] pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#327B72]`}>
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#751A23]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#751A23]" : ""} w-4 h-4 sm:w-5 sm:h-5`}
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
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/30 border-t border-[#327B72]/40">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className={`${cormorant.className} text-[#37413A] font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#751A23] underline font-bold hover:text-[#327B72] transition-colors"
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
                            <p className={`${cormorant.className} text-[#37413A] font-medium leading-relaxed sm:leading-loose text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line tracking-wide`}>
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

"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When is the RSVP deadline?",
    answer:
      `Kindly respond on or before December 21, 2025. Your response helps us finalize our guest list. Thank you!\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please search for your name in the RSVP section above and follow the instructions to confirm your attendance. If you cannot find your name, fill up request to join in the guest list section.`,
    },
    {
    question: "Can I bring my child?",
    answer:
      "As much as we cherish having children around, our wedding will be adults-only so our guests may enjoy the celebration comfortably. Thank you for your kindness and understanding.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Ample parking is available at both the ceremony and reception venues. We recommend arriving 15-20 minutes early to secure a spot.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "This is an unplugged ceremony. We kindly ask guests to refrain from using phones or cameras during the ceremony so everyone can be fully present. Our professional photographers will capture every moment and we'll share the photos afterward.",
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
      className="relative bg-[#FFFAEF] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background elements matching countdown section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FFBD87]/25 via-[#FFBD87]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFBD87]/25 via-[#FFBD87]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFAEF]/35 via-transparent to-[#FFFAEF]/35" />

        {/* Floating decorative circles */}
        <div className="absolute top-10 left-8 w-32 h-32 bg-[#FFBD87]/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-12 w-24 h-24 bg-[#FFBD87]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-16 left-16 w-28 h-28 bg-[#FFBD87]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-24 right-10 w-20 h-20 bg-[#FFBD87]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FFFAEF]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

        {/* Decorative line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFBD87]/30 to-transparent" />

        {/* Corner florals */}
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt=""
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70"
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0 scale-x-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt=""
            width={600}
            height={600}
            className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] opacity-70"
          />
        </div>
        <div className="absolute top-0 left-0 z-0 scale-y-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt=""
            width={600}
            height={600}
            className="w-40 h-auto sm:w-56 md:w-72 lg:w-80 xl:w-[24rem] opacity-60"
          />
        </div>
        <div className="absolute top-0 right-0 z-0 scale-x-[-1] scale-y-[-1]">
          <Image
            src="/decoration/corner-bottom-left-flower-removebg-preview.png"
            alt=""
            width={600}
            height={600}
            className="w-40 h-auto sm:w-56 md:w-72 lg:w-80 xl:w-[24rem] opacity-60"
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/40" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/40" />
        </div>
        
        <h2 className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#9B7C6A] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
          Frequently Asked Questions
        </h2>
        
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#7C564A] font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative bg-white/85 backdrop-blur-md border-2 border-white/60 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_55px_rgba(0,0,0,0.2)] overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
          
          {/* FAQ items */}
          <div className="relative p-2.5 sm:p-4 md:p-5 lg:p-6">
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border-2 border-[#FFBD87]/30 bg-white/95 backdrop-blur-sm hover:border-[#9B7C6A]/50 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#9B7C6A]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#9B7C6A] pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#FFBD87]">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#9B7C6A]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
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
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-[#FFFAEF]/40 border-t border-[#FFBD87]/30">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#9B7C6A]/90 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#9B7C6A] underline font-semibold hover:text-[#FFBD87] transition-colors"
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
                            <p className="text-[#9B7C6A]/90 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
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

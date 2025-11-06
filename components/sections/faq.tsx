"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Section } from "@/components/section"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What are the theme and motif?",
    answer:
      "Theme: Garden Wedding. Motif: Sage Green & Blush Pink. [COLOR_PALETTE]",
  },
  {
    question: "What is the dress code?",
    answer:
      "Principal Sponsors are requested to wear formal attire in any shade matching the palette, while Guests are encouraged to come in semi-formal attire; please avoid jeans and other casual wear.",
  },
  {
    question: "When and where is the ceremony?",
    answer:
      "The ceremony is on February 14, 2026 at 4:00 PM at Tarlac Recreational Park, San Jose, Tarlac.",
  },
  {
    question: "Where is the reception?",
    answer:
      "The reception follows immediately at the same venue: Tarlac Recreational Park.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Kindly RSVP by February 1, 2026. Your response helps us finalize our guest list. Thank you! [RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the greatest gift. If you prefer to give, we would appreciate monetary gifts given in person so we can thank you personally.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Ample parking is available at both venues. We recommend arriving 15-20 minutes early to secure a spot.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "While our venue has limited space, we kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer, but you're welcome to take photos! We'll have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact the couple directly as soon as possible if your plans change. They will update or remove you from the RSVP list manually.",
  },
  {
    question: "Who can I contact for more information?",
    answer:
      "For more information, contact us here:\n\nTalitha — 09271600950\nKarol — 09855540332",
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
      className="relative bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Floating geometric shapes with color palette */}
        <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-[#B08981]/12 rounded-full blur-xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-16 h-16 bg-[#EFBFBB]/18 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-20 left-20 w-24 h-24 bg-[#B08981]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="hidden sm:block absolute bottom-10 right-10 w-12 h-12 bg-[#EFBFBB]/16 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Smaller mobile decorative elements */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#B08981]/10 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#EFBFBB]/12 rounded-full blur-md animate-pulse" />
        
        {/* Decorative lines with gradient */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08981]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent" />
        
        {/* Corner decorative gradient overlays */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tl-3xl" />
        
        {/* Decorative corner images */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none"
        />
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none"
        />
      </div>

      {/* Title Section */}
      <div className="relative text-center mb-12 sm:mb-16 md:mb-20 px-4" style={{ zIndex: 10 }}>
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#B08981]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#B08981] rounded-full" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#B08981] rounded-full" />
          </div>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#B08981]/60 to-[#EFBFBB]/30" />
        </div>
        
        <div className="inline-flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] drop-shadow-lg" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-balance drop-shadow-lg relative px-2">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4]">
              Frequently Asked Questions
            </span>
            {/* Text glow effect */}
            <span className="absolute inset-0 text-[#EFBFBB]/25 blur-2xl -z-10">Frequently Asked Questions</span>
          </h2>
          <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#B08981] drop-shadow-lg" />
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-[#FFE5E4] font-sans font-light max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
          Everything you need to know
        </p>
        
        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 px-2 sm:px-4">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            {/* Enhanced FAQ container */}
            <div className="relative">
              {/* Multiple layered glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B08981]/20 via-[#EFBFBB]/15 to-[#B08981]/20 rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-[#B08981]/30 via-[#EFBFBB]/20 to-[#B08981]/30 rounded-3xl blur-md opacity-50 animate-pulse" />

              {/* Enhanced decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-bl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-tr from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-tl from-[#B08981] via-[#EFBFBB] to-[#FFE5E4] rounded-full blur-sm opacity-70 shadow-lg" />

              {/* Main FAQ card with enhanced multi-layer styling */}
              <div className="relative bg-gradient-to-br from-[#FFE5E4] via-[#EFBFBB]/25 to-[#FFE5E4] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/50 shadow-[0_8px_32px_rgba(102,105,86,0.25),0_0_0_1px_rgba(176,137,129,0.15)]">
                
                {/* Inner decorative border with gradient */}
                <div className="absolute inset-1 sm:inset-2 border border-[#B08981]/40 rounded-xl sm:rounded-2xl" />
                
                {/* Additional inner glow */}
                <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-[#EFBFBB]/15 to-transparent rounded-xl sm:rounded-2xl" />

                {/* FAQ items */}
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  {faqItems.map((item, index) => {
                    const isOpen = openIndex === index
                    const contentId = `faq-item-${index}`
                    return (
                      <div
                        key={index}
                        className="rounded-lg sm:rounded-xl border-2 border-[#B08981]/30 bg-white/40 hover:bg-white/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#B08981]/50"
                      >
                        <button
                          onClick={() => toggleItem(index)}
                          className="group w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B08981]/50 focus-visible:ring-offset-2 rounded-t-lg sm:rounded-t-xl transition-colors hover:bg-[#B08981]/5"
                          aria-expanded={isOpen}
                          aria-controls={contentId}
                        >
                          <span className="font-semibold text-[#666956] pr-4 text-sm sm:text-base md:text-lg font-sans leading-relaxed">
                            {item.question}
                          </span>
                          <ChevronDown
                            size={20}
                            className={`text-[#B08981] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-6 sm:h-6`}
                            aria-hidden
                          />
                        </button>

                        <div
                          id={contentId}
                          role="region"
                          className={`grid transition-all duration-300 ease-out rounded-b-lg sm:rounded-b-xl ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-[#B08981]/10 to-[#EFBFBB]/10 border-t-2 border-[#B08981]/30">
                              {item.answer.includes("[COLOR_PALETTE]") ? (
                                <div className="space-y-3 sm:space-y-4">
                                  <p className="text-[#666956] leading-relaxed text-sm sm:text-base md:text-lg font-sans">
                                    Theme: Classic. Motif: Elegant Earth Tones.
                                  </p>
                                  <div>
                                    <p className="text-[#666956] font-semibold text-xs sm:text-sm mb-3 font-sans">Color Palette:</p>
                                    <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm">
                                        <div 
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20" 
                                          style={{ backgroundColor: '#666956' }}
                                          title="Sage Green"
                                        />
                                        <span className="text-xs sm:text-sm text-[#666956] font-medium font-sans">Sage Green</span>
                                      </div>
                                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm">
                                        <div 
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20" 
                                          style={{ backgroundColor: '#8D8E7C' }}
                                          title="Muted Olive"
                                        />
                                        <span className="text-xs sm:text-sm text-[#666956] font-medium font-sans">Muted Olive</span>
                                      </div>
                                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm">
                                        <div 
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20" 
                                          style={{ backgroundColor: '#B08981' }}
                                          title="Dusty Rose"
                                        />
                                        <span className="text-xs sm:text-sm text-[#666956] font-medium font-sans">Dusty Rose</span>
                                      </div>
                                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm">
                                        <div 
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20" 
                                          style={{ backgroundColor: '#EFBFBB' }}
                                          title="Blush Pink"
                                        />
                                        <span className="text-xs sm:text-sm text-[#666956] font-medium font-sans">Blush Pink</span>
                                      </div>
                                      <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg border border-[#B08981]/30 shadow-sm">
                                        <div 
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md border-2 border-white ring-2 ring-[#B08981]/20" 
                                          style={{ backgroundColor: '#FFE5E4' }}
                                          title="Soft Peach"
                                        />
                                        <span className="text-xs sm:text-sm text-[#666956] font-medium font-sans">Soft Peach</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[#666956] leading-relaxed text-sm sm:text-base md:text-lg font-sans whitespace-pre-line">
                                  {item.answer.includes("[RSVP_LINK]") ? (
                                    <>
                                      {item.answer.split("[RSVP_LINK]")[0]}
                                      <a 
                                        href="#guest-list" 
                                        className="text-[#B08981] underline font-semibold hover:text-[#EFBFBB] transition-colors"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                        }}
                                      >
                                        {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                                      </a>
                                      {item.answer.split("[/RSVP_LINK]")[1]}
                                    </>
                                  ) : (
                                    item.answer
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Enhanced decorative sparkle effects */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-[#EFBFBB] rounded-full animate-ping opacity-80 shadow-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B08981] rounded-full animate-pulse opacity-70 shadow-md" />
                <div className="absolute top-1/2 left-1 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FFE5E4] rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

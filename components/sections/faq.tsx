"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the ceremony?",
    answer:
      `The ceremony will be held on Monday, December 22, 2025 at 3:00 PM.\n\nVenue: St. Gregory the Great Cathedral\nLocation: Old Albay District, Legazpi City\n\nGuests are requested to arrive by 2:30 PM.`,
  },
  {
    question: "Where is the reception?",
    answer:
      `The reception follows immediately after the ceremony on December 22, 2025.\n\nVenue: Pepperland Hotel\nLocation: Airport Road, Washington Drive Ext., Brgy 40 Cruzada, Legazpi City`,
  },
  {
    question: "What is the dress code?",
    answer:
      `We kindly request our guests to dress in formal attire to celebrate our special day.\n\nTheme: Rosegold & Champagne\n\nPrincipal Sponsors:\n• Ladies: Elegant gowns in rosegold, champagne, or soft neutrals.\n• Gentlemen: Classic black or midnight suits with champagne accents.\n\nGuests:\n• Ladies: Long or cocktail dresses in rosegold, champagne, or muted metallics.\n• Gentlemen: Barong, long-sleeve polos, or suits in complementary neutrals.\n\nNote: Please avoid jeans and casual attire.`,
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      `Kindly respond on or before the 20th day of November, 2025. Your response helps us finalize our guest list. Thank you!\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "How do I RSVP?",
    answer:
      `Please search for your name in the RSVP section above and follow the instructions to confirm your attendance. If you cannot find your name, please contact Edlin Mae Cellona at 09399038910 or email: emaecellona@gmail.com`,
  },
  {
    question: "Do you have a gift registry?",
    answer:
      `Your love, laughter and presence on our wedding day are the most precious gifts we could ask for.\n\nShould you wish to bless us further, a monetary gift would be delightful as we begin building our journey as husband and wife.\n\nPlease see the Monetary Gifts section for more information.`,
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
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
      "We have a professional photographer, but you're welcome to take photos! We'll have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact Edlin Mae Cellona at 09399038910 or email: emaecellona@gmail.com as soon as possible if your plans change. You can also update your RSVP by searching for your name in the RSVP section.",
  },
  {
    question: "Who should I contact if I have questions?",
    answer:
      "For any questions or concerns, please contact:\n\nEdlin Mae Cellona\nPhone: 09399038910\nEmail: emaecellona@gmail.com",
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
      className="relative bg-[#DDD3CC] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#EDD6AC]/20 via-[#EDD6AC]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B28383]/20 via-[#B28383]/5 to-transparent" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C2D3C3]/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#A78256]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#B28383]/18 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#EDD6AC]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Corner decorations - all four corners */}
        <div className="absolute top-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-x-[-1] scale-y-[-1]"
            priority={false}
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <Image
            src="/decoration/corner_right-top.png"
            alt=""
            width={300}
            height={300}
            className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto opacity-75 scale-y-[-1]"
            priority={false}
          />
        </div>
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#A78256]/20" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#A78256]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#C2D3C3]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#B28383]/60 rounded-full" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main card */}
        <div className="relative bg-[#EDD6AC]/98 backdrop-blur-md border-2 border-[#A78256]/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C2D3C3]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C2D3C3]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C2D3C3]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C2D3C3]/40 rounded-br-lg" />
          
          {/* FAQ items */}
          <div className="relative p-4 sm:p-5 md:p-6">
            <div className="space-y-2 sm:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border-2 border-[#C2D3C3]/30 bg-white/95 backdrop-blur-sm hover:border-[#A78256]/50 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#A78256]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#A78256] pr-4 text-sm sm:text-base md:text-lg font-sans leading-relaxed transition-colors duration-200 group-hover:text-[#B28383]">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-[#A78256]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-5 sm:h-5`}
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
                        <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-[#EDD6AC]/20 border-t border-[#C2D3C3]/30">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#B28383] leading-relaxed text-sm sm:text-base font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#A78256] underline font-semibold hover:text-[#B28383] transition-colors"
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
                            <p className="text-[#B28383] leading-relaxed text-sm sm:text-base font-sans whitespace-pre-line">
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

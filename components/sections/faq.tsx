"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What are the theme and motif?",
    answer:
      "Theme: Rustic. Motif: Lilac and Sage Green.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Garden formal. Think flowy, breathable fabrics and shoes that work on grass. We recommend bringing a light layer for the evening breeze. Strictly no TSHIRT, DENIM PANTS, SLIPPERS.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "If you are a guest, please arrive by 5:00 PM. (The entourage follows an internal schedule.)",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, parking is available at the venue. Please allow extra time for parking and walking to the area.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "No plus-one, please. We appreciate your understanding.",
  },
  {
    question: "Are children allowed?",
    answer:
      "As much as possible, no children except members of the entourage.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "We've included meal preference options in the RSVP form. If you have specific allergies or restrictions not listed, please mention them in the message field.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We'd love for you to capture memories! However, please be mindful of our professional photographer. We'll have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact us as soon as possible if your plans change. You can reach us via email or phone with any updates to your RSVP.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section id="faq" className="relative py-20 md:py-32 overflow-hidden bg-[#9CAF88]">
      {/* Custom larger title */}
      <div className="relative z-10 text-center mb-12 md:mb-20">
        <h2 className="text-5xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 text-balance drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto px-4">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10">
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index
          const contentId = `faq-item-${index}`
          return (
            <div
              key={index}
              className="rounded-lg sm:rounded-xl border border-border/70 bg-white/60 backdrop-blur shadow-sm transition hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="group w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span className="font-semibold text-foreground/90 pr-2 sm:pr-4 text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  size={16}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-5 sm:h-5`}
                  aria-hidden
                />
              </button>

              <div
                id={contentId}
                role="region"
                className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-3 sm:px-6 py-3 sm:py-4 bg-primary/5 border-t border-border/70">
                    <p className="text-foreground leading-relaxed text-sm sm:text-base">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </Section>
  )
}

"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export function Welcome() {
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  return (
    <Section
      id="welcome"
      className="relative overflow-hidden bg-transparent py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-[#657551]/70 bg-[#657551]/95 backdrop-blur-2xl shadow-[0_16px_60px_rgba(101,117,81,0.35)] px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
          {/* Layered glass + light accents for readability */}
          <div className="pointer-events-none absolute inset-0">
            {/* Solid primary background with slight transparency */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundColor: "rgba(101, 117, 81, 0.95)",
              }}
            />
            {/* Subtle radial highlights */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(101,117,81,0.35),transparent_60%)] opacity-80" />
            <div className="absolute bottom-[-6rem] right-[-2rem] w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(101,117,81,0.25),transparent_60%)] opacity-85" />
            {/* Inner border glow */}
            <div className="absolute inset-[1px] rounded-[inherit] border border-[#657551]/30" />
          </div>

          <div className="relative text-center space-y-6 sm:space-y-7 md:space-y-8">
          {/* Main heading */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <p
              className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#F5D4CF]`}
              style={{ textShadow: "0 1px 8px rgba(245,212,207,0.4)" }}
            >
              {brideName} &amp; {groomName}
            </p>
            <h2
              className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] text-[#F5D4CF]"
              style={{ textShadow: "0 3px 14px rgba(245,212,207,0.5)" }}
            >
              Welcome to our wedding website
            </h2>


            {/* Verse */}
            <div className="space-y-1">
              <p
                className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#F5D4CF]/90 italic`}
                style={{ textShadow: "0 1px 8px rgba(245,212,207,0.3)" }}
              >
                &quot;And now these three remain: faith, hope and love. But the greatest of these is love.&quot;
              </p>
              <p
                className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm text-[#F5D4CF]/80 tracking-[0.2em] uppercase`}
                style={{ textShadow: "0 1px 6px rgba(245,212,207,0.3)" }}
              >
                1 Corinthians 13:13
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#F5D4CF]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D4CF] shadow-[0_0_14px_rgba(245,212,207,0.8)]" />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#F5D4CF]/40" />
            </div>
          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.85rem] sm:text-sm md:text-base leading-relaxed sm:leading-7 text-[#F5D4CF] space-y-3 sm:space-y-4`}
          >
            <p>
              We&apos;ve found a love that&apos;s a true blessing, and we give thanks to God for writing the
              beautiful story of our journey together. With hearts full of gratitude, we&apos;re excited to share
              this blessing with you! Thank you for your love, prayers, and support. We can&apos;t wait to celebrate
              this joyful day together!
            </p>
            <p>
              Feel free to browse through important information and other helpful reminders — everything you
              need to join us in this celebration!
            </p>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}



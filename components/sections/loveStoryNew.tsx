"use client"

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { getCloudinaryVideoUrl } from "@/lib/cloudinary"
import { Cinzel } from "next/font/google"
import { useAudio } from "@/contexts/audio-context"
import { siteConfig } from '@/content/site'

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "700"] })

/* ─── Micro helpers ─────────────────────────────────────────────────────── */

function Divider({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 h-px ${light ? "bg-motif-cream/20" : "bg-motif-silver/40"}`} />
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z"
          fill="#BE8400" opacity={light ? 0.45 : 0.7} />
      </svg>
      <div className={`flex-1 h-px ${light ? "bg-motif-cream/20" : "bg-motif-silver/40"}`} />
    </div>
  )
}

function ChapterTag({ number, light = false }: { number: string; light?: boolean }) {
  return (
    <p className={`${cinzel.className} text-[0.55rem] tracking-[0.45em] uppercase mb-1
      ${light ? "text-motif-cream/45" : "text-motif-accent/65"}`}>
      {number}
    </p>
  )
}

function ChapterHeader({
  number, title, subtitle, light = false,
}: {
  number?: string; title: string; subtitle?: string; light?: boolean
}) {
  return (
    <div className="text-center mb-6">
      {number && <ChapterTag number={number} light={light} />}
      <h2 className={`${cinzel.className} text-xl md:text-2xl tracking-wide mb-1
        ${light ? "text-motif-cream" : "text-motif-deep"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-xs italic ${light ? "text-motif-cream/60" : "text-motif-soft"}`}
          style={{ fontFamily: "'Crimson Text', serif" }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function DayLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-px bg-motif-silver/30" />
      <div className="flex items-center gap-1.5">
        <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.55" />
        </svg>
        <span className={`${cinzel.className} text-[0.5rem] tracking-[0.4em] uppercase text-motif-accent/65`}>
          {label}
        </span>
      </div>
      <div className="flex-1 h-px bg-motif-silver/30" />
    </div>
  )
}

/* ─── Mosaic gallery ─────────────────────────────────────────────────────── */

type MosaicItem = { src: string; alt?: string }

/**
 * Mosaic photo wall — alternates wide (col-span-2) and normal (col-span-1) cells.
 * Uses CSS grid-auto-flow:dense so no empty gaps remain even with span-2 items.
 * `hideOnMobile` is an array of item indices to hide on small screens (<sm)
 * keeping mobile clean while desktop gets more photos.
 */
function MosaicGallery({
  items, className = "", hideOnMobile = [],
}: {
  items: MosaicItem[]; className?: string; hideOnMobile?: number[]
}) {
  // Alternating pattern: wide-wide-normal / normal-wide-wide / normal-normal-normal (7-item cycle)
  const spans = [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1]
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 ${className}`}
      style={{ gridAutoFlow: "row dense" }}
    >
      {items.map((item, i) => {
        const wide = spans[i % spans.length] === 2
        const mobileHide = hideOnMobile.includes(i)
        return (
          <div
            key={i}
            className={`mosaic-item group relative overflow-hidden rounded-md shadow-sm
              ${wide ? "col-span-2 sm:col-span-2" : "col-span-1"}
              ${mobileHide ? "hidden sm:block" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "5/4" }}>
              <Image
                src={item.src} alt={item.alt ?? ""} fill
                className="object-cover transition-transform duration-700 ease-out will-change-transform
                  group-hover:scale-[1.07]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
              />
              <div className="absolute inset-0 bg-motif-deep/0 group-hover:bg-motif-deep/12
                transition-colors duration-500" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Image components ───────────────────────────────────────────────────── */

function ImageBox({
  src, alt = "", aspectRatio = "4/5", label = "Add Photo Here", className = "",
}: {
  src?: string; alt?: string; aspectRatio?: string; label?: string; className?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-md ${className}`} style={{ aspectRatio }}>
      {src ? (
        <Image
          src={src} alt={alt} fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2
          border border-dashed border-motif-silver/35 bg-gradient-to-br from-motif-cream/80 to-motif-cream/50 rounded-md">
          <svg className="w-5 h-5 text-motif-silver/40" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className={`${cinzel.className} text-[0.48rem] tracking-[0.2em] uppercase text-motif-silver/50 text-center px-3`}>
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

/** A portrait with a name caption underneath */
function PortraitCard({
  src, alt, name, label, rotate = "0deg", className = "",
}: {
  src?: string; alt?: string; name?: string; label?: string; rotate?: string; className?: string
}) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div style={{ transform: `rotate(${rotate})` }} className="w-full shadow-lg rounded-sm overflow-hidden">
        <ImageBox src={src} alt={alt} aspectRatio="3/4" label={label ?? "Portrait"} className="w-full" />
      </div>
      {name && (
        <span className={`${cinzel.className} text-[0.5rem] tracking-[0.28em] uppercase text-motif-medium/50`}>
          {name}
        </span>
      )}
    </div>
  )
}

/* ─── Prayer list ────────────────────────────────────────────────────────── */

function PrayerList({ title, items, accent }: {
  title: string; items: string[]; accent: "gold" | "rose"
}) {
  const isGold = accent === "gold"
  const bg = isGold ? "bg-motif-accent/[0.04]" : "bg-motif-soft/[0.05]"
  const border = isGold ? "border-motif-accent/15" : "border-motif-soft/15"
  const labelColor = isGold ? "text-motif-accent/65" : "text-motif-soft/65"
  const numBg = isGold
    ? "bg-motif-accent/10 text-motif-accent border border-motif-accent/20"
    : "bg-motif-soft/10 text-motif-soft border border-motif-soft/20"

  return (
    <div className={`${bg} border ${border} rounded-sm px-4 py-3.5`}>
      <p className={`${cinzel.className} text-[0.5rem] tracking-[0.42em] uppercase ${labelColor} mb-3`}>
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`${cinzel.className} ${numBg} text-[0.52rem] font-medium
              min-w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-[2px]
              flex-shrink-0 mt-[2px]`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-motif-medium/80 text-[0.82rem] md:text-sm leading-relaxed"
              style={{ fontFamily: "'Crimson Text', serif" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Text components ────────────────────────────────────────────────────── */

function PersonQuote({
  speaker, nickname, text, accent = "gold",
}: {
  speaker: string; nickname?: string; text: React.ReactNode; accent?: "gold" | "rose"
}) {
  const border = accent === "rose" ? "border-motif-soft" : "border-motif-accent"
  const bg = accent === "rose" ? "bg-motif-soft/[0.04]" : "bg-motif-accent/[0.03]"
  const nameColor = accent === "rose" ? "text-motif-soft" : "text-motif-accent"
  return (
    <div className={`border-l-2 ${border} ${bg} pl-4 pr-3 py-2 rounded-r-sm`}>
      <p className={`${cinzel.className} text-[0.55rem] tracking-[0.28em] uppercase ${nameColor} mb-1.5`}>
        {speaker}
        {nickname && (
          <span className="text-motif-medium/40 normal-case tracking-normal font-normal"> &quot;{nickname}&quot;</span>
        )}
      </p>
      <p className="text-motif-medium/80 text-[0.82rem] md:text-sm leading-loose italic"
        style={{ fontFamily: "'Crimson Text', serif" }}>
        &ldquo;{text}&rdquo;
      </p>
    </div>
  )
}

function Scripture({ text, reference }: { text: string; reference: string }) {
  return (
    <div className="text-center py-3 px-5 border-y border-motif-silver/20 my-1">
      <p className="text-motif-medium/70 text-[0.82rem] md:text-sm italic leading-relaxed"
        style={{ fontFamily: "'Crimson Text', serif" }}>
        &ldquo;{text}&rdquo;
      </p>
      <p className={`${cinzel.className} text-[0.52rem] tracking-[0.3em] uppercase text-motif-accent/60 mt-1.5`}>
        &mdash; {reference}
      </p>
    </div>
  )
}

function PrayerBox({ title, text, className = "" }: { title: string; text: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-motif-soft/[0.06] border border-motif-soft/20 rounded-sm px-4 py-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#D2A4A4" opacity="0.7" />
        </svg>
        <p className={`${cinzel.className} text-[0.55rem] tracking-[0.28em] uppercase text-motif-soft`}>
          {title}
        </p>
      </div>
      <p className="text-motif-medium/75 text-[0.82rem] md:text-sm italic leading-loose text-center"
        style={{ fontFamily: "'Crimson Text', serif" }}>
        {text}
      </p>
    </div>
  )
}

/** Thin section wrapper for consistent rhythm */
function Chapter({
  children, tinted = false, className = "",
}: {
  children: React.ReactNode; tinted?: boolean; className?: string
}) {
  return (
    <div className={`py-8 md:py-10 px-4 md:px-6 ${tinted ? "bg-motif-deep/[0.025]" : ""} ${className}`}>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function LoveStoryNew() {
  const { pauseMusic, resumeMusic } = useAudio()
  const courtshipVideoRef = useRef<HTMLVideoElement>(null)
  const heartVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videos = [courtshipVideoRef.current, heartVideoRef.current]

    const handlePlay = () => pauseMusic()
    const handlePauseOrEnd = () => resumeMusic()

    videos.forEach((video) => {
      if (!video) return
      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePauseOrEnd)
      video.addEventListener("ended", handlePauseOrEnd)
    })

    return () => {
      videos.forEach((video) => {
        if (!video) return
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePauseOrEnd)
        video.removeEventListener("ended", handlePauseOrEnd)
      })
    }
  }, [pauseMusic, resumeMusic])

  return (
    <section id="love-story" className="bg-motif-cream overflow-x-hidden">

      {/* ── HERO HEADER ───────────────────────────────────────────────── */}
      <div className="relative pt-10 pb-8 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-motif-deep/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* <Divider className="mb-6" /> */}

          {/* Title */}
          <h1 className="text-motif-deep leading-none mb-0.5"
            style={{ fontFamily: "var(--font-brittany), cursive", fontSize: "clamp(2.8rem, 12vw, 5.5rem)" }}>
            Mark <span className="text-motif-accent">&amp;</span> Irah
          </h1>
          <p className={`${cinzel.className} text-[0.58rem] tracking-[0.5em] uppercase text-motif-medium/55 mb-6`}>
            Love Story
          </p>

          {/* Portrait row */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
            <PortraitCard
              src="/assets/Mark.jpg" alt="Mark"
              name='Mark "Edoy"' label="Mark Portrait" rotate="-3deg"
              className="w-24 sm:w-32 md:w-40"
            />

            {/* Centre badge */}
            <div className="flex flex-col items-center gap-1 px-0.5 select-none">
              <svg width="7" height="7" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.45" />
              </svg>
              <span
                className="text-motif-accent leading-none"
                style={{ fontFamily: "var(--font-brittany), cursive", fontSize: "clamp(1.8rem, 8vw, 2.8rem)" }}
              >
                &amp;
              </span>
              <div className="w-px h-3 bg-motif-accent/20" />
              <p
                className="text-motif-deep/55 text-[0.54rem] italic text-center leading-snug max-w-[64px] tracking-wide"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                Their stability<br />is Jehovah.
              </p>
              <svg width="7" height="7" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.45" />
              </svg>
            </div>

            <PortraitCard
              src="/assets/Irah.jpg" alt="Irah"
              name='Irah "Yaya"' label="Irah Portrait" rotate="3deg"
              className="w-24 sm:w-32 md:w-40"
            />
          </div>

          <p className={`${cinzel.className} text-sm md:text-base text-motif-deep tracking-[0.1em] mb-1`}>
            The Shulammite &amp; The Shepherd
          </p>
          <blockquote className="text-motif-medium/65 text-xs italic max-w-xs mx-auto leading-relaxed"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            &ldquo;Their love story is beautiful, because their stability is Jehovah.&rdquo;
          </blockquote>

          {/* <Divider className="mt-6" /> */}
        </div>
      </div>

      {/* ── OPENING QUOTES ────────────────────────────────────────────── */}
      <div className="py-6 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              src: "/assets/MarkAvatar.jpg",
              name: "Mark", role: "The Shepherd",
              nameColor: "text-motif-accent", roleColor: "text-motif-accent/60",
              ring: "ring-motif-accent/25", borderColor: "border-motif-accent/15",
              quote: "And Yes, She is Everything! The woman that I Dream and I Desire.. The Woman Who is Beautiful inside and out.. My Long Lost Shulammite...",
            },
            {
              src: "/assets/IrahAvatar.jpg",
              name: "Irah", role: "The Shulammite",
              nameColor: "text-motif-soft", roleColor: "text-motif-soft/60",
              ring: "ring-motif-soft/25", borderColor: "border-motif-soft/15",
              quote: "Like the Shulammite Maiden, I finally found my shepherd out of 10,000.",
            },
          ].map(({ src, name, role, nameColor, roleColor, ring, borderColor, quote }) => (
            <div key={name}
              className={`relative bg-white/60 border ${borderColor} rounded-sm p-5 shadow-sm overflow-hidden flex flex-col gap-4`}>

              {/* Decorative large quote mark */}
              <span className="absolute top-1 right-3 text-[5rem] leading-none text-motif-deep/[0.04] select-none font-serif"
                aria-hidden>&ldquo;</span>

              {/* Avatar + name row */}
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 sm:w-12 sm:h-12 relative rounded-full overflow-hidden flex-shrink-0 ring-2 ${ring} shadow-md`}>
                  <Image src={src} alt={name} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <p className={`${cinzel.className} text-[0.62rem] tracking-[0.28em] uppercase ${nameColor} mb-0.5`}>
                    {name}
                  </p>
                  <p className={`${roleColor} text-[0.62rem] italic`}
                    style={{ fontFamily: "'Crimson Text', serif" }}>{role}</p>
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-motif-medium/85 text-[0.88rem] md:text-sm leading-loose italic relative z-10"
                style={{ fontFamily: "'Crimson Text', serif" }}>
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="mt-6 max-w-lg mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-motif-silver/35" />
            <p className={`${cinzel.className} text-[0.52rem] tracking-[0.42em] uppercase text-motif-accent/70`}>
              Shared Vision
            </p>
            <div className="flex-1 h-px bg-motif-silver/35" />
          </div>

          <p className="text-motif-medium/75 text-[0.85rem] md:text-sm italic leading-loose"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            Mark "Edoy" prayed for a partner active in LDC who was willing to sacrifice for the ministry. Irah "Yaya" focused on her pioneering and volunteering, praying for a skillful partner who put Jehovah first.
          </p>

          <div className="w-6 h-px bg-motif-accent/25" />

          <p className="text-motif-medium/75 text-[0.85rem] md:text-sm italic leading-loose"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            They met on <span className="not-italic font-semibold text-motif-deep/70">July 13, 2024</span> at
            a Regional Convention in Roxas City. A simple dinner at the Resente residence and a walk at
            People&apos;s Park revealed their common ground in LDC service.
          </p>

          <div className="w-6 h-px bg-motif-accent/25" />

          <p className="text-motif-medium/75 text-[0.85rem] md:text-sm italic leading-loose"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            After a positive response from Irah&apos;s parents about returning to visit, Mark felt his prayers
            were being answered. Irah, too, had prayed for clarity — giving the relationship a chance to unfold
            under Jehovah&apos;s guidance.
          </p>

          <svg width="8" height="8" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* ── CHAPTER I – Two Lives Serving Jehovah ─────────────────────── */}
      <Chapter tinted>
        <ChapterHeader number="Chapter I" title="Two Lives Serving Jehovah" subtitle="Shared Vision" />

        {/* Opening photo strip – 4 couple shots, last 2 hidden on mobile */}
        {/* <MosaicGallery className="mb-6" hideOnMobile={[2, 3]} items={[
          { src: "/desktop-background/couple (7).jpg",  alt: "In service" },
          { src: "/desktop-background/couple (8).jpg",  alt: "In service" },
          { src: "/desktop-background/couple (9).jpg",  alt: "Together" },
          { src: "/desktop-background/couple (10).jpg", alt: "Together" },
        ]} /> */}

        <div className="grid sm:grid-cols-2 gap-5 md:gap-8">

          {/* ── Mark ── */}
          <div className="flex flex-col gap-3">
            <ImageBox src="/desktop-background/couple (5).jpg" alt="Mark in service"
              aspectRatio="16/10" className="w-full shadow-md" label="Mark Service Photo" />

            {/* Name tag */}
            <div className="flex items-center gap-2">
              <span className={`${cinzel.className} text-[0.6rem] tracking-[0.28em] uppercase text-motif-accent`}>
                Mark &quot;Edoy&quot;
              </span>
              <div className="flex-1 h-px bg-motif-accent/20" />
              <span className="text-motif-accent/50 text-[0.58rem] italic" style={{ fontFamily: "'Crimson Text', serif" }}>
                The Shepherd
              </span>
            </div>

            {/* Narrative */}
            <p className="text-motif-medium/80 text-[0.85rem] md:text-sm leading-loose"
              style={{ fontFamily: "'Crimson Text', serif" }}>
              Masaya akong naglingkod kay Jehova sa iba&apos;t ibang avenue of service (Regular Pioneer, BCV,
              LDCV, RTO Full-time Commuter). Isang araw, na-feel ko na mas maganda kapag may kasama na sa
              paglilingkod. So, isa sa naging laman ng prayers ko ay may makaroon ng partner na willing mag
              serve as full-time at mag sacrifice kahit saang aspekto. Kaya dinaing at nanalangin po ako sa
              Diyos na Jehovah na sana dumating sa buhay ko at makita ko sa isang mapapangasawa ang mga
              palatandaang ito:
            </p>

            {/* Prayer checklist */}
            <PrayerList title="His Prayer" accent="gold" items={[
              "Nasa LDC",
              "Hindi lang basta tapat na lingkod, kundi active talaga sa paglilingkod",
              "May matatag na family spiritual background (pamilyang Saksi)",
              "Hiligayon at hindi ibang wika o lahi",
              "Plus 2 na ahead sa akin o Minus 2 na bata sa akin yung edad",
            ]} />

            {/* Closing quote */}
            <PersonQuote speaker="Mark" accent="gold"
              text="And Yes, She is Everything! The woman that I Dream and I Desire.. The Woman Who is Beautiful inside and out.. My Long Lost Shulammite..." />
          </div>

          {/* ── Irah ── */}
          <div className="flex flex-col gap-3">
            <ImageBox src="/desktop-background/couple (6).jpg" alt="Irah in service"
              aspectRatio="16/10" className="w-full shadow-md" label="Irah Service Photo" />

            {/* Name tag */}
            <div className="flex items-center gap-2">
              <span className={`${cinzel.className} text-[0.6rem] tracking-[0.28em] uppercase text-motif-soft`}>
                Irah &quot;Yaya&quot;
              </span>
              <div className="flex-1 h-px bg-motif-soft/20" />
              <span className="text-motif-soft/50 text-[0.58rem] italic" style={{ fontFamily: "'Crimson Text', serif" }}>
                The Shulammite
              </span>
            </div>

            {/* Narrative */}
            <p className="text-motif-medium/80 text-[0.85rem] md:text-sm leading-loose"
              style={{ fontFamily: "'Crimson Text', serif" }}>
              May mga brother na noon na nag-express ng feelings nila sa akin. Pero dahil bata pa ako, or hindi
              pa nararamdaman sa puso ang buong pagmamahal, isinantabi ko muna ang posibilidad ng relationship.
              Sa halip, nag-focus ako sa aking pioneering, mga bible studies, nag-apply for SKE, at
              nakapaglilingkod bilang Bethel Remote Volunteer. Masaya ako sa aking paglilingkod at sa prayers
              ko, nasasabi ko na kung iloob ni Jehova — basta doon po sana sa brother na:
            </p>

            {/* Prayer checklist */}
            <PrayerList title="Her Prayer" accent="rose" items={[
              "Ikaw ang Pangunahin sa Buhay niya",
              "Presence of 9 Fruitage of Holy Spirit",
              "Emotionally Safe po ako",
              "Mahal na mahal ako, at mahal ko rin po",
              "Best Friend and a Lover in One Person",
              "Someone who is Skillful",
              "Yung Kaya niya akong buhayin kahit Saan man kami mapunta. (City Life, Mountainous Life, Island Life, Abroad Life)",
            ]} />

            {/* Closing quote */}
            <PersonQuote speaker="Irah" accent="rose"
              text="Like the Shulammite Maiden, I finally found my shepherd out of 10,000." />
          </div>

        </div>
      </Chapter>

      {/* ── CHAPTER II – How They Met ──────────────────────────────────── */}
      <Chapter>
        <ChapterHeader number="Chapter II" title="How They Met" subtitle="It all started with..." />

        {/* Event badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-col items-center gap-0.5 bg-motif-deep text-motif-cream
            px-6 py-2.5 rounded-sm shadow-md text-center">
            <span className={`${cinzel.className} text-[0.48rem] tracking-[0.4em] uppercase opacity-60`}>
              Regional Convention · Roxas City, Capiz
            </span>
            <span className={`${cinzel.className} text-sm md:text-base tracking-wide`}>July 12–14, 2024</span>
          </div>
        </div>

        {/* ── Day 1 ── */}
        <div className="mb-7">
          <DayLabel label="Day 1 · Saturday, July 13" />

          {/* Mobile: quotes first → photos below. Desktop: 3-column */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_152px_1fr] gap-3 md:gap-5 md:items-start">
            <div className="order-1 md:order-none">
              <PersonQuote speaker="Mark" accent="gold"
                text="July 12-14, 2024 sumama kami sa isa naming ka-congregation sa Regional Convention sa Roxas City, Capiz dahil mag-serve siya as branch representative. Sa Saturday noon ko unang nakita si Sister Irah sa convention hall. Kinagabihan, nagkakilala kami dahil sila yung host sa dinner, but to be honest walang any special or romantic feelings that time, kaya sister talaga yung tawag ko sa kanya as a sign of respect." />
            </div>

            {/* Photo pair – 2-col row on mobile, stacked col on desktop */}
            <div className="order-3 md:order-none grid grid-cols-2 md:grid-cols-1 gap-2 w-full">
              <ImageBox src="/assets/firstMeet/28.png" alt="Regional Convention"
                aspectRatio="5/4" className="w-full shadow-lg rounded-md" />
              <ImageBox src="/assets/firstMeet/29.png" alt="Dinner at Resente"
                aspectRatio="5/4" className="w-full shadow-md rounded-md" />
            </div>

            <div className="order-2 md:order-none">
              <PersonQuote speaker="Irah" accent="rose"
                text="Yes, It's July 13, 2024, noong nasa bahay sila. Naging host kami for dinner dahil si Papa ay nasa Rooming Department. Noong naglapag ako ng Cake na binili ko at nilagay sa lamesa, may narining akong boses na kapansin-pansin. Sabi niya, 'Sister, Salamat sa paghahanda at hospitality.' Sabi ko naman, 'You're Welcome.' That's it! Short reply lang." />
            </div>
          </div>
        </div>

        {/* ── Day 2 ── */}
        <div className="mb-4">
          <DayLabel label="Day 2 · Sunday, July 14" />

          {/* Mobile: quotes first → photos below. Desktop: 3-column */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_152px_1fr] gap-3 md:gap-5 md:items-start">
            <div className="order-1 md:order-none">
              <PersonQuote speaker="Mark" accent="gold"
                text="The next day, dinala kami ng family niya to have dinner sa People's Park. After dinner, nag-walking kami, nag-picture-picture, at nagka-kwentuhan kaming dalawa." />
            </div>

            {/* Photo pair – 2-col row on mobile, stacked col on desktop */}
            <div className="order-3 md:order-none grid grid-cols-2 md:grid-cols-1 gap-2 w-full">
              <ImageBox src="/assets/firstMeet/30.png" alt="People's Park Walk"
                aspectRatio="5/4" className="w-full shadow-lg rounded-md" />
              <ImageBox src="/assets/firstMeet/31.png" alt="Dinner Together"
                aspectRatio="5/4" className="w-full shadow-md rounded-md" />
            </div>

            <div className="order-2 md:order-none">
              <PersonQuote speaker="Irah" accent="rose"
                text="Medyo saglit lang yung kwentuhan namin. Nakita namin na yung common ground namin ang LDC. Nag-ask siya ng permission na i-add niya ako sa FB at Messenger para makuha niya yung mga pictures namin. After a week ko pa nai-send sa kanya. At that time, hindi kami madalas mag-usap kasi pareho kaming busy." />
            </div>
          </div>
        </div>

      </Chapter>

      {/* ── CHAPTER III – First Impressions ───────────────────────────── */}
      <Chapter tinted>
        <ChapterHeader number="Chapter III" title="First Impressions" subtitle="What caught their eye" />

        {/* Top mosaic – roxas 32-37 (6 photos), last 2 hidden on mobile */}
        <MosaicGallery className="mb-5" hideOnMobile={[4, 5]} items={[
          { src: "/assets/roxas/32.png", alt: "Roxas City Convention" },
          { src: "/assets/roxas/33.png", alt: "Roxas City Convention" },
          { src: "/assets/roxas/34.png", alt: "Roxas City Convention" },
          { src: "/assets/roxas/35.png", alt: "Roxas City" },
          { src: "/assets/roxas/36.png", alt: "Roxas City" },
          { src: "/assets/roxas/37.png", alt: "Roxas City" },
        ]} />

        {/* Quotes – 2-col on sm+, stacked on mobile */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-start">
        <PersonQuote speaker="Mark" accent="gold"
            text="Kakaiba siya na sister at kapansin-pansin yung eagerness niya sa paglilingkod kay Jehova. Hindi ko napansin na natatandaan ko na kahit small details ng pag-uusap namin, kahit pa once a month lang kami na mag-usap for almost a year. From time to time, tinatanong ko yung mga elder namin kung paano ko malalaman na yung isang sister ay inilaan ni Jehova para sa akin. Sabi nila, may unusual things na mangyayari na never pa nangyari before, at minsan baka nandiyan lang siya sa circle of friends ko kahit wala pang spark before." />
          <PersonQuote speaker="Irah" accent="rose"
            text="Napansin ko na magaling siya sa conversation at may sense kausap, informative at hindi shallow. Sa totoo, hindi ko ma-gets bakit may impact si Mark, kasi hindi lang naman siya yung kausap ko na brother. Pero sa kanya ko na-feel yung kapayapaan at pagiging comfortable. Kaya na-realize ko na may innate spark na siya sa akin, bagay na hindi ko pa kailanman naramdaman at in-expect." />
        </div>

        {/* Bottom mosaic – roxas 38-43 (6 photos), last 2 hidden on mobile */}
        <MosaicGallery className="mt-4" hideOnMobile={[4, 5]} items={[
          { src: "/assets/roxas/38.png", alt: "Roxas City" },
          { src: "/assets/roxas/39.png", alt: "Roxas City" },
          { src: "/assets/roxas/40.png", alt: "Roxas City" },
          { src: "/assets/roxas/41.png", alt: "Roxas City" },
          { src: "/assets/roxas/42.png", alt: "Roxas City" },
          { src: "/assets/roxas/43.png", alt: "Roxas City" },
        ]} />
      </Chapter>

      {/* ── CHAPTER IV – Falling in Love ──────────────────────────────── */}
      <Chapter>
        <ChapterHeader number="Chapter IV" title="Falling in Love" subtitle="The moment it felt real" />

        {/* Opening mosaic – flowers 16, 17, 20, 21 (4 photos) */}
        <MosaicGallery className="mb-5" items={[
          { src: "/assets/flowers/16.png", alt: "Falling in love" },
          { src: "/assets/flowers/17.png", alt: "Falling in love" },
          { src: "/assets/flowers/20.png", alt: "Together" },
          { src: "/assets/flowers/21.png", alt: "Together" },
        ]} />


        {/* Main conversation – 2-col on sm+, stacked on mobile */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-start mb-5">
          {/* Mark's side */}
          <PersonQuote speaker="Mark" accent="gold"
            text="Unti-unti kaming naging close ni Irah, at doon ko nakikita kung gaano niya ka mahal si Jehova. Siya parati yung inuuna niya sa buhay niya. Mapa secular work or volunteering, at field ministry, palaging nandiyan ang Diyos na Jehova sa kanya. Doon unti-unti ko ring napansin ang pinapakita niyang sigasig sa paglilingkod. One time, hindi ko napapansin na umabot na pala yung topic namin sa mga goals in life at prayers. Di ko rin napigilan na mag-open up sa kanya na umabot na rin sa life ko ang paghahangad na sana may makasama sa paglilingkod kay Jehova. Kahit saanman yan, Field, LDC, or Office, Basta may kasama! Mga ganitong topic, alam ko, hindi ko ito dapat basta-basta na ino-open up sa kung sinuman. Pero sa kanya, diretso ko na sinasabi." />

          {/* Irah's side */}
          <div className="flex flex-col gap-3">
            <PersonQuote speaker="Irah" accent="rose"
              text="Kinabahan na ako doon. Sabi ko, Bakit nag-o-open ng ganito yung brother? Kaya kinuha ko yung opinion niya, kung agree ba siya na yung isang matured na brother kapag totoong interesado sa sister, kailangan na ipaalam niya muna ito sa mga magulang, sa congregation, at na maging klaro sa intention niya para hindi mixed signal at tuloy-tuloy ang blessings ni Jehova. Then, I found out myself na parang na di-distract na ako at bothered sa actions and lines of questioning niya, though sinabi ko na sa kanya na ayaw ko ng brother na hindi accountable sa action at naghahagis ng mixed signal. Kaya, nanalangin ako kay Jehova." />
            <PrayerBox title="Irah's Prayer to Jehovah" text={
              <>
                Dear Jehovah God,<br />
                Please if it&apos;s Mark Valencia, Let it be,<br />
                but if not, please let him out or be erased in my heart as distraction.<br />
                Please purify me, save me and use me!<br />
                I will give him a chance until December 2025 only.<br />
                <span className="opacity-70">(At least, I gave him a chance...)</span><br /><br />
                After all at hindi pa siya mag-confess, then I&apos;ll better vanish, dissolve and take my total
                distance from him, para makapag-concentrate ako to renew my SKE for year 2026.
              </>
            } />
          </div>
        </div>

        {/* Mid mosaic – 3 more flowers between content and milestone */}
        <MosaicGallery className="mb-5" items={[
          { src: "/assets/flowers/22.png", alt: "Together" },
          { src: "/assets/flowers/23.png", alt: "Together" },
          { src: "/assets/flowers/24.png", alt: "Together" },
        ]} />

        {/* ── Key Date Milestone ── */}
        <div className="relative bg-motif-deep rounded-md px-5 py-6 my-2 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-motif-accent/10 via-transparent to-motif-soft/5 pointer-events-none" />
          <p className={`${cinzel.className} text-[0.48rem] tracking-[0.48em] uppercase text-motif-cream/40 mb-1`}>
            A Confessed Heart
          </p>
          <p className={`${cinzel.className} text-xl md:text-2xl tracking-wide text-motif-cream mb-2`}
            style={{ fontFamily: "var(--font-brittany), cursive" }}>
            August 22, 2025
          </p>
          <Divider className="mb-3 opacity-20" light />
          <blockquote className="text-motif-cream/80 text-[0.88rem] md:text-sm italic leading-loose max-w-md mx-auto"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            &ldquo;It was the day that he finally confessed his feelings, intentions and thoughts about me!
            And it&apos;s a clear sign, an answered prayer, that it&apos;s him, it&apos;s him that I should
            keep our communication intact. With that, Jehovah God gave me reason to love him more deeply!&rdquo;
          </blockquote>
          <p className={`${cinzel.className} text-[0.5rem] tracking-[0.3em] uppercase text-motif-cream mt-2.5`}>
            — Irah
          </p>
        </div>

        {/* Mark's conclusion quote */}
        <div className="mt-5">
        <PersonQuote speaker="Mark" accent="gold"
          text="Unti-unti kong in-open up sa mga elder namin na mayroon akong bibisitahan na sister sa Roxas City. Doon ko natanggap ang iba't ibang magagandang advice at suggestion para maging successful yung first visit/observation ko sa kanila. Tinanong ko ng personal yung Papa ni Irah kung pwede pa ba akong makabalik ulit, which is ito yung hinihingi kong sign mula kay Jehovah, at positibo yung sagot ni Tito na 'pwedeng makabalik anytime,' kaya deep inside tuwang-tuwa ako dahil alam ko na ito na yung sagot ni Jehova. Kinabukasan tinanong ko rin yung Mama ni Irah kung pwede pa ba akong makabalik ulit. Medyo napa-pause si Tita ng ilang seconds. Then after that napa-yes din siya kaya tuwang-tuwa din ako dahil ito na yung sagot ni Jehova sa prayers ko. At binalikan ko talaga si Irah at ang kaniyang pamilya." />
        </div>

        {/* Bottom mosaic – flowers 25-27 + roxas 44-46, last 2 hidden on mobile */}
        <MosaicGallery className="mt-5" hideOnMobile={[4, 5]} items={[
          { src: "/assets/flowers/25.png", alt: "Together" },
          { src: "/assets/flowers/26.png", alt: "Together" },
          { src: "/assets/flowers/27.png", alt: "Together" },
          { src: "/assets/roxas/44.png",   alt: "Roxas" },
          { src: "/assets/roxas/45.png",   alt: "Roxas" },
          { src: "/assets/roxas/46.png",   alt: "Roxas" },
        ]} />
      </Chapter>

      {/* ── CHAPTER V – What They Love About Each Other ───────────────── */}
      <Chapter tinted>
        <ChapterHeader number="Chapter V" title="What They Love About Each Other"
          subtitle="The qualities they truly treasure from one another" />

        {/* ── Quote columns ── */}
        <div className="grid sm:grid-cols-2 gap-5 md:gap-8">

          {/* ── Irah about Mark ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-px bg-motif-soft/25" />
              <span className={`${cinzel.className} text-[0.55rem] tracking-[0.28em] uppercase text-motif-soft`}>
                Irah about Mark
              </span>
              <div className="flex-1 h-px bg-motif-soft/25" />
            </div>

            <PersonQuote speaker="Irah" accent="rose"
              text="Noong formal na nanliligaw si Mark, doon ko nakita yung reflection ng pagmamahal ng Diyos na Jehovah sa akin sa pamamagitan ng isang tao. When I lost my &lsquo;second mother,&rsquo; there&apos;s terrible sadness and pain. But then, I see Jehovah&apos;s hands, his timing, when Mark stand by me to be my 24/7 friend. We talked, even late nights and until 4am. For me, It&apos;s Jehovah&apos;s way to embrace me emotionally and to give me comfort in his best time." />
            <Scripture
              text="If one member suffers, all the other members suffer with it."
              reference="Genesis 24:67 · Proverbs 17:17" />

            <PersonQuote speaker="Irah" accent="rose"
              text="Nagustuhan ko yung respectful manner niya. Ipinagpaalam niya ako sa aking mga magulang at kapatid, diretso siyang nagsabi ng intention niya. Nagustuhan ko rin kung paano niya minamahal sina mama at papa. Transparent siya sa lahat sa status namin sa kaniyang congregation at close friends kaya sobrang na-appreciate ko yung warmness nila sa akin nang minsan na dumalaw ako kina Mark. Doon nakita ko kung anong klaseng tao siya at na convince ako na sasagutin ko siya sa susunod na mga araw dahil alam ko safe ako sa kanya! Nakita ko rin kung paano siya tumutulong sa Bible Studies niya, kung paano siya pahalagahan ng mga kaibigan niya na nasa RTO, LDC at mga ka-kongregasyon, and how he loves me to the full." />

            <ImageBox src="/desktop-background/couple (11).jpg" alt="Mark and Irah together"
              aspectRatio="5/4" className="w-full shadow-sm rounded-md hidden sm:block" />

            <PersonQuote speaker="Irah" accent="rose"
              text="Nakita ko na genuine and pure yung intention niya sa akin. Very consistent siya, Very Clear at Napakamapagmahal na tao! With him, I can definitely say and check na nakuha niya yung Major Checklist." />
            <Scripture
              text="Husbands, continue loving your wives, just as the Christ also loved the congregation."
              reference="Ephesians 5:25" />
          </div>

          {/* ── Mark about Irah ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-px bg-motif-accent/25" />
              <span className={`${cinzel.className} text-[0.55rem] tracking-[0.28em] uppercase text-motif-accent`}>
                Mark about Irah
              </span>
              <div className="flex-1 h-px bg-motif-accent/25" />
            </div>

            <PersonQuote speaker="Mark" accent="gold"
              text="Every time na may mga theocratic activities ay magkasama kami ni Irah, yun na din yung time na magkasama kami nagde-date, bonding with family and friends. Nakikita ko na si Irah ay isang masigasig, mabait, at napakabuting sister na kapit talaga sa isang maybahay na sister. Nakikita ko din na willing na willing si Irah na mag-sacrifice para sa paglilingkod kay Jehova. Nakita ko how she puts her heart in every detail of her bethel assignments, how she loves her Bible studies so much, how she stands to live as regular pioneer for almost 15 years, the way she deals with her family and congregation, how she remain balance in her spiritual career and in her secular job." />

            <ImageBox src="/desktop-background/couple (10).jpg" alt="Mark and Irah together"
              aspectRatio="5/4" className="w-full shadow-sm rounded-md hidden sm:block" />

            <PersonQuote speaker="Mark" accent="gold"
              text="Sa kanya ko nadama ang pagtibok ng puso ko na guided ni Jehova at 100 percent kumbinsido ako na siya ang gusto kong mapangasawa at sagot ni Jehova sa panalangin ko." />
          </div>

        </div>

        {/* ── Media row: 2 photos + video, equal size, below the quotes ── */}
        <div className="mt-6">
          <Divider className="mb-5 opacity-40" />
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.5" />
            </svg>
            <p className={`${cinzel.className} text-[0.52rem] tracking-[0.42em] uppercase text-motif-accent/60`}>
              Asking Permission for Courtship
            </p>
            <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#BE8400" opacity="0.5" />
            </svg>
          </div>

          {/* 3-column equal grid: pic1, pic2, video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {/* Photo 1 */}
            <div className="relative overflow-hidden rounded-md shadow-md group"
              style={{ aspectRatio: "5/4" }}>
              <Image
                src="/assets/askingParents/pic 1.webp" alt="Asking for courtship permission" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>

            {/* Photo 2 */}
            <div className="relative overflow-hidden rounded-md shadow-md group"
              style={{ aspectRatio: "5/4" }}>
              <Image
                src="/assets/askingParents/pic 2.webp" alt="Asking for courtship permission" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>

            {/* Video – same aspect ratio as the photos */}
            <div className="relative overflow-hidden rounded-md shadow-md bg-motif-deep"
              style={{ aspectRatio: "5/4" }}>
              <video
                ref={courtshipVideoRef}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                aria-label="Asking courtship permission video"
              >
                <source src="/assets/askingParents/asking courtship permission.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Closing mini-strip – visible on md+ only to fill desktop whitespace */}
        {/* <div className="mt-5 hidden md:block">
          <MosaicGallery items={[
            { src: "/desktop-background/couple (9).jpg",  alt: "Together" },
            { src: "/desktop-background/couple (8).jpg",  alt: "Together" },
            { src: "/desktop-background/couple (7).jpg",  alt: "Together" },
          ]} />
        </div> */}
      </Chapter>

      {/* ── CHAPTER VI – Expressions of Love ─────────────────────────── */}
      <Chapter>
        <ChapterHeader number="Chapter VI" title="Expressions of Love" subtitle="The &lsquo;Yes!&rsquo; Moment" />

        {/* Opening mosaic – all 4 expressionLove images, none hidden (they fit cleanly) */}
        <MosaicGallery className="mb-4" items={[
          { src: "/assets/expressionLove/6.webp", alt: "Expressions of Love" },
          { src: "/assets/expressionLove/7.webp", alt: "Expressions of Love" },
          { src: "/assets/expressionLove/8.webp", alt: "Expressions of Love" },
          { src: "/assets/expressionLove/9.webp", alt: "Expressions of Love" },
        ]} />

        {/* ── Two-column quotes – gap-2 keeps columns tightly packed ── */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 items-start">

          {/* ── Mark ── */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 py-2 border-b border-motif-accent/10 mb-1">
              <div className="w-11 h-11 md:w-13 md:h-13 relative rounded-full overflow-hidden flex-shrink-0
                shadow-md ring-2 ring-motif-accent/25">
                <Image src="/desktop-background/couple (12).webp" alt="Mark" fill
                  className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className={`${cinzel.className} text-[0.6rem] tracking-[0.3em] uppercase text-motif-accent`}>Mark</p>
                <p className="text-motif-accent/50 text-[0.6rem] italic" style={{ fontFamily: "'Crimson Text', serif" }}>The Shepherd</p>
              </div>
            </div>

            <PersonQuote speaker="Mark" accent="gold"
              text="Yes, She is Everything! My Missing Ribs... The One who will complete my Life... The One that I wanted to spend the Rest of My Life..." />
            <Scripture
              text="A capable wife, who can find? Her value is far more than that of corals."
              reference="Proverbs 31:29" />

            {/* Photo pair fills space between quotes – keeps column flush with Irah's */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="relative overflow-hidden rounded-md shadow-sm group" style={{ aspectRatio: "5/4" }}>
                <Image src="/desktop-background/couple (3).webp" alt="Together" fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width:640px) 50vw, 25vw" />
              </div>
              <div className="relative overflow-hidden rounded-md shadow-sm group" style={{ aspectRatio: "5/4" }}>
                <Image src="/desktop-background/couple (4).webp" alt="Together" fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width:640px) 50vw, 25vw" />
              </div>
            </div>

            <PersonQuote speaker="Mark" accent="gold"
              text="Sinabi ko sa Diyos na Jehova na kung siya man ang ibigay mo sa akin, gagawin ko ang lahat at sisikapin ko na mapangunahan siya sa espirituwal, mapaglaanan sa material, maibigay ang physical na pangangailangan at na maibuhos ang buong pagmamahal na deserve niya bilang isang babae! Alam ko siya na, at determinado ako sa desisyon ko sa kanya dahil kumbinsido ako na si Jehova ang gumawa ng pamamaraan upang makilala ko siya at isa na makakasama sa paglilingkod habang buhay." />

            {/* Wide photo – fills remaining column gap */}
            <div className="relative overflow-hidden rounded-md shadow-sm group" style={{ aspectRatio: "5/4" }}>
              <Image src="/desktop-background/couple (14).webp" alt="Together" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width:640px) 100vw, 50vw" />
            </div>
          </div>

          {/* ── Irah ── */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 py-2 border-b border-motif-soft/10 mb-1">
              <div className="w-11 h-11 md:w-13 md:h-13 relative rounded-full overflow-hidden flex-shrink-0
                shadow-md ring-2 ring-motif-soft/25">
                <Image src="/desktop-background/couple (13).webp" alt="Irah" fill
                  className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className={`${cinzel.className} text-[0.6rem] tracking-[0.3em] uppercase text-motif-soft`}>Irah</p>
                <p className="text-motif-soft/50 text-[0.6rem] italic" style={{ fontFamily: "'Crimson Text', serif" }}>The Shulammite</p>
              </div>
            </div>

            <PersonQuote speaker="Irah" accent="rose"
              text="I cannot refuse anymore to give my heart to someone WHOSE ONLY STABILITY IS JEHOVAH. A man who is willing enough to re-zero to adapt various lifestyle to stand in his assignment that Jehovah God stores for him." />
            <Scripture
              text="Man sees what appears to the eyes, but Jehovah sees into the heart."
              reference="1 Samuel 16:7" />
            <PersonQuote speaker="Irah" accent="rose"
              text="Like Jehovah's perspective, I fell in love with Mark's character deeply. Someone who wins my heart! A man who choose to love his partner over his ego and pride. A man who choose to serve Jehovah loyally and faithfully. Someone who is passionate and resilient to live his life like I did for Jehovah." />

            <div className="border-l-2 border-motif-soft/30 pl-4 bg-motif-soft/[0.04] py-2.5 pr-3 rounded-r-sm">
              <p className="text-motif-medium/80 text-[0.82rem] md:text-sm italic leading-loose"
                style={{ fontFamily: "'Crimson Text', serif" }}>
                &ldquo;So, before I say &lsquo;I Love You, Too,&rsquo; I prayed and talked to Jehovah first...
                That in my life, I thanked God Jehovah that I am fully satisfied with my youth serving him.
                That there are no what-ifs or excess baggage before committing to someone! Just like accepting
                a theocratic assignment, I should view this new door, new chapter of my life as special
                assignment from Jehovah too! For he is the center of any relationship. Without him, there is
                no success and happiness.&rdquo;
              </p>
            </div>
            <Scripture
              text="And a threefold cord cannot quickly be torn apart."
              reference="Ecclesiastes 4:12" />

            <PrayerBox title="Irah's Covenant to Jehovah"
              text={<>
                So, I myself made a covenant to Jehovah that in any situation, win-lose or lose-win, I shall
                stick and love Mark to the best way I could make it, since out of billion people, he is the
                only person created by Jehovah God given to me to give my heart fully.
              </>} />
            <Scripture
              text="I will take you as my wife in righteousness and in justice, in loyal love and in mercy."
              reference="Hosea 2:19, 20" />

            <div className="border-l-2 border-motif-soft/30 pl-4 bg-motif-soft/[0.04] py-2.5 pr-3 rounded-r-sm">
              <p className="text-motif-medium/80 text-[0.82rem] md:text-sm italic leading-loose"
                style={{ fontFamily: "'Crimson Text', serif" }}>
                &ldquo;I may not be perfect but I know I&apos;m real because I love Jehovah first before he
                comes to my life! All that I have is the confidence standing before Jehovah! In the person of
                Mark P. Valencia, Jehovah God gave me the love that every woman craves from a man. A man that
                I did not expect to come and arrived, yet exceed my expectations! I am 100% convinced that
                Jehovah God gave him to me not by own will but by his will and on his perfect time frame and
                not mine. And I got to thanked my God Jehovah over and over again for his undeserved kindness
                that finally one day, he allows Mark to captivate my heart and to love him from day 1 to after
                1,000 years.&rdquo;
              </p>
            </div>

            {/* Fills any remaining column gap */}
            <div className="relative overflow-hidden rounded-md shadow-sm group" style={{ aspectRatio: "5/4" }}>
              <Image src="/desktop-background/couple (15).webp" alt="Together" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width:640px) 100vw, 50vw" />
            </div>
          </div>
        </div>

        {/* ── Video section – flush below the columns, no extra top gap ── */}
        <div className="mt-4">
          <Divider className="mb-3 opacity-40" />
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#D2A4A4" opacity="0.7" />
            </svg>
            <p className={`${cinzel.className} text-[0.52rem] tracking-[0.42em] uppercase text-motif-soft/70`}>
              I Finally Gave My Heart
            </p>
            <svg width="6" height="6" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 0L8.4 5.6L14 7L8.4 8.4L7 14L5.6 8.4L0 7L5.6 5.6L7 0Z" fill="#D2A4A4" opacity="0.7" />
            </svg>
          </div>
          {/* 16/9 video + flanking images on md+, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-2">
            <div className="relative overflow-hidden rounded-md shadow-sm hidden md:block group"
              style={{ aspectRatio: "5/4" }}>
              <Image src="/assets/expressionLove/10.webp" alt="Expression of Love" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="25vw" />
            </div>
            {/* <div className="relative overflow-hidden rounded-md shadow-lg bg-motif-deep"
              style={{ aspectRatio: "16/9" }}>
              <video
                ref={heartVideoRef}
                className="absolute inset-0 w-full h-full object-contain"
                controls playsInline preload="metadata"
                aria-label="I Finally Gave My Heart"
              >
                <source src={getCloudinaryVideoUrl("/assets/expressionLove/I Finally Gave My Heart.mp4")} type="video/mp4" />
              </video>
            </div> */}
            <div className="relative overflow-hidden rounded-md shadow-sm hidden md:block group"
              style={{ aspectRatio: "5/4" }}>
              <Image src="/assets/expressionLove/11.webp" alt="Expression of Love" fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="25vw" />
            </div>
          </div>
        </div>

        {/* Bottom mosaic – flush, no gaps */}
        <MosaicGallery className="mt-2" items={[
          { src: "/assets/expressionLove/12.webp",       alt: "Expression of Love" },
          { src: "/desktop-background/couple (1).webp",  alt: "Together" },
          { src: "/desktop-background/couple (2).webp",  alt: "Together" },
        ]} />
      </Chapter>

      {/* ── CLOSING TOUCH ─────────────────────────────────────────────── */}
      <div className="py-10 px-4 text-center bg-motif-deep">
        <div className="max-w-lg mx-auto">
          {/* <Divider className="mb-8" light /> */}

          {/* Closing portrait — full-width on mobile, capped on md+ */}
          <div className="mb-6">
            <ImageBox src="/desktop-background/couple (16).webp" alt="Mark and Irah together"
              aspectRatio="4/3" className="w-full md:max-w-sm md:mx-auto shadow-2xl border border-motif-silver/20 rounded-md"
              label="Add Closing Couple Photo" />
          </div>

          <ChapterHeader title="Closing Touch" light />

          <blockquote className="text-motif-cream/75 text-[0.88rem] md:text-sm leading-loose italic mb-3 px-2"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            &ldquo;We knew in the first place that each of us was Jehovah&apos;s choice! We see Jehovah&apos;s
            intervention. No one introduced or forced us. A natural gift that we cherish and keep enjoying every
            second, minute, hour and endless time.&rdquo;
          </blockquote>
          <blockquote className="text-motif-cream/50 text-[0.82rem] italic mb-7 leading-loose px-2"
            style={{ fontFamily: "'Crimson Text', serif" }}>
            &ldquo;The best you can offer us is your prayers and wishes for the best. From the bottom of our
            hearts, thank you so much.&rdquo;
          </blockquote>

          <p className="text-motif-cream mb-1"
            style={{ fontFamily: "var(--font-brittany), cursive", fontSize: "clamp(2rem, 8vw, 3rem)" }}>
            Mr. &amp; Mrs. Valencia
          </p>
          <p className={`${cinzel.className} text-[0.5rem] tracking-[0.45em] uppercase text-motif-cream/35 mb-6`}>
          {siteConfig.wedding.date}
          </p>

          {/* Final image pair — full width side by side */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <ImageBox src="/desktop-background/couple (17).webp" alt="Together"
              aspectRatio="4/5" className="w-full shadow-lg border border-motif-silver/20 rounded-md" />
            <ImageBox src="/desktop-background/couple (4).webp" alt="Mark and Irah"
              aspectRatio="4/5" className="w-full shadow-lg border border-motif-silver/15 rounded-md" />
          </div>

          {/* <Divider className="mt-8" light /> */}
        </div>
      </div>

    </section>
  )
}

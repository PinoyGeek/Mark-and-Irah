"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type ImageItem = {
  src: string
  category: "desktop" | "mobile"
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const topRef = useRef<HTMLDivElement | null>(null)
  

  // Shuffle AFTER mount to avoid SSR/CSR hydration mismatches
  const [shuffledAfterMount, setShuffledAfterMount] = useState<ImageItem[] | null>(null)
  useEffect(() => {
    const copy = [...images]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setShuffledAfterMount(copy)
  }, [images])

  const filtered = useMemo(() => {
    return shuffledAfterMount ?? images
  }, [shuffledAfterMount, images])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx == null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowRight") setLightboxIdx((idx) => (idx == null ? null : (idx + 1) % filtered.length))
      if (e.key === "ArrowLeft") setLightboxIdx((idx) => (idx == null ? null : (idx - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [filtered.length, lightboxIdx])

  // Ensure already-cached images appear (loaded state from complete)
  const setImgRef = (el: HTMLImageElement | null, src: string) => {
    if (!el) return
    if (el.complete) {
      setLoaded((l) => (l[src] ? l : { ...l, [src]: true }))
    }
  }

  return (
    <div ref={topRef} className="relative">
      {/* Header (buttons removed per request) */}
      <div className="mb-6 flex justify-end">
        <div className="text-[#FFE5E4]/80 text-sm">
          {filtered.length} photos
        </div>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-[#FFE5E4]/80">No images to display.</div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {filtered.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            className="group mb-3 sm:mb-4 block break-inside-avoid w-full text-left"
            onClick={() => setLightboxIdx(idx)}
            aria-label="Open image"
          >
            <div className="relative w-full overflow-hidden rounded-xl border border-[#B08981]/40 bg-[#FFE5E4]/40">
              {!loaded[img.src] && (
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full animate-pulse bg-gradient-to-br from-[#8D8E7C]/30 via-[#666956]/25 to-[#8D8E7C]/30" />
              )}
              <img
                ref={(el) => setImgRef(el, img.src)}
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                onError={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                className={`w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.02] ${
                  loaded[img.src] ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx != null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-6xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[#FFE5E4] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full px-3 py-2"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i - 1 + filtered.length) % filtered.length))}
            >
              ‹
            </button>
            <img
              src={filtered[lightboxIdx].src}
              alt=""
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl border border-white/10"
            />
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[#FFE5E4] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full px-3 py-2"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i + 1) % filtered.length))}
            >
              ›
            </button>
            <button
              className="absolute top-3 right-3 text-[#FFE5E4] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full px-3 py-1"
              onClick={() => setLightboxIdx(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="px-5 py-2 rounded-full bg-[#B08981] text-[#FFE5E4] font-semibold border border-[#B08981] hover:opacity-95 transition"
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </div>
  )
}



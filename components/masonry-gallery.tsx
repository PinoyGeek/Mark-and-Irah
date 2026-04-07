"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

type ImageItem = {
  src: string
  category: "desktop" | "mobile" | "front" | "gallery"
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const topRef = useRef<HTMLDivElement | null>(null)

  const filtered = useMemo(() => images, [images])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx == null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowRight")
        setLightboxIdx((idx) => (idx == null ? null : (idx + 1) % filtered.length))
      if (e.key === "ArrowLeft")
        setLightboxIdx((idx) =>
          idx == null ? null : (idx - 1 + filtered.length) % filtered.length
        )
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [filtered.length, lightboxIdx])

  const setImgRef = (el: HTMLImageElement | null, src: string) => {
    if (!el) return
    if (el.complete) {
      setLoaded((l) => (l[src] ? l : { ...l, [src]: true }))
    }
  }

  const getCardAspect = (image: ImageItem) =>
    image.category === "desktop" ? "aspect-[4/3]" : "aspect-[3/4]"

  return (
    <div ref={topRef} className="relative">
      {/* Photo count */}
      <div className="mb-6 flex justify-end">
        <span
          className="text-sm font-sans"
          style={{ color: "var(--color-motif-medium)" }}
        >
          {filtered.length} photos
        </span>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <div
          className="text-center font-sans"
          style={{ color: "var(--color-motif-medium)" }}
        >
          No images to display.
        </div>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {filtered.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              className="group mb-3 sm:mb-4 block break-inside-avoid w-full text-left"
              onClick={() => setLightboxIdx(idx)}
              aria-label={`Open image ${idx + 1}`}
            >
              <div
                className="relative w-full overflow-hidden rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  border: "1px solid color-mix(in srgb, var(--color-motif-accent) 35%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 80%, transparent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--color-motif-accent) 60%, transparent)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--color-motif-accent) 35%, transparent)"
                }}
              >
                {/* Skeleton placeholder while loading */}
                {!loaded[img.src] && (
                  <div
                    className={`${getCardAspect(img)} w-full animate-pulse`}
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in srgb, var(--color-motif-silver) 60%, transparent) 0%, color-mix(in srgb, var(--color-motif-cream) 80%, transparent) 50%, color-mix(in srgb, var(--color-motif-silver) 60%, transparent) 100%)",
                    }}
                  />
                )}

                <div className={`relative w-full ${getCardAspect(img)}`}>
                  <CloudinaryImage
                    ref={(el) => setImgRef(el, img.src)}
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`rounded-xl transition-transform duration-300 group-hover:scale-[1.03] object-cover object-top ${
                      loaded[img.src] ? "opacity-100" : "opacity-0"
                    }`}
                    quality={90}
                    loading="lazy"
                    onLoad={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                    onError={() => setLoaded((l) => ({ ...l, [img.src]: true }))}
                  />
                </div>

                {/* Hover gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--color-motif-deep) 45%, transparent) 0%, transparent 60%)",
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx != null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-6xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110 border"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-motif-accent) 50%, transparent)",
                color: "var(--color-motif-cream)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-motif-deep)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)"
              }}
              onClick={() =>
                setLightboxIdx((i) =>
                  i == null ? null : (i - 1 + filtered.length) % filtered.length
                )
              }
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image */}
            <div className="relative max-h-[80vh] w-auto">
              <CloudinaryImage
                src={filtered[lightboxIdx].src}
                alt=""
                width={filtered[lightboxIdx].width}
                height={filtered[lightboxIdx].height}
                className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
                style={{
                  border: "1px solid color-mix(in srgb, var(--color-motif-accent) 35%, transparent)",
                }}
                quality={95}
                priority={true}
              />
            </div>

            {/* Next */}
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110 border"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-motif-accent) 50%, transparent)",
                color: "var(--color-motif-cream)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-motif-deep)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)"
              }}
              onClick={() =>
                setLightboxIdx((i) => (i == null ? null : (i + 1) % filtered.length))
              }
              aria-label="Next image"
            >
              ›
            </button>

            {/* Close */}
            <button
              className="absolute top-3 right-3 rounded-full px-4 py-2 transition-all duration-200 shadow-lg hover:scale-105 font-sans text-sm border"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-motif-accent) 50%, transparent)",
                color: "var(--color-motif-cream)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-motif-deep)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "color-mix(in srgb, var(--color-motif-deep) 75%, transparent)"
              }}
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
            >
              Close
            </button>

            {/* Counter */}
            <div
              className="absolute top-3 left-3 rounded-full px-3 py-1.5 text-xs font-sans border"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-motif-deep) 60%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-motif-accent) 40%, transparent)",
                color: "var(--color-motif-cream)",
              }}
            >
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="px-6 py-3 rounded-full font-semibold font-sans text-sm border-2 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
          style={{
            backgroundColor: "var(--color-motif-deep)",
            borderColor: "var(--color-motif-deep)",
            color: "var(--color-motif-cream)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-motif-accent)"
            e.currentTarget.style.borderColor = "var(--color-motif-accent)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-motif-deep)"
            e.currentTarget.style.borderColor = "var(--color-motif-deep)"
          }}
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </div>
  )
}

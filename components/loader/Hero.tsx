import React, { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/content/site';
import { CloudinaryImage } from '@/components/ui/cloudinary-image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}



const desktopImages: string[] = [
  '/desktop-background/couple (5).jpg',
  '/desktop-background/couple (6).jpg',
  '/desktop-background/couple (7).jpg',
  '/desktop-background/couple (8).jpg',
  '/desktop-background/couple (9).jpg',
];

const mobileImages: string[] = [
'/mobile-background/couple (5).jpg',
  '/mobile-background/couple (6).jpg',
  '/mobile-background/couple (7).jpg',
  '/mobile-background/couple (8).jpg',
    '/mobile-background/couple (9).jpg',
  ];

  export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
      <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: i === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
            }}
          >
            <CloudinaryImage
              src={src}
              alt="Couple"
              fill
              quality={90}
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Top veil — softens the sky/upper area so the monogram reads clearly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(80,17,46,0.55) 0%,
              rgba(80,17,46,0.20) 28%,
              transparent 52%
            )`,
          }}
        />

        {/* Bottom veil — darkens behind "You are / Invited! / button" text block */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(24,44,73,0.82) 0%,
              rgba(80,17,46,0.55) 32%,
              transparent 62%
            )`,
          }}
        />

        {/* Diagonal motif wash — adds warmth without blocking the photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(80,17,46,0.22) 0%,
              rgba(190,132,0,0.06) 50%,
              rgba(24,44,73,0.24) 100%
            )`,
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div 
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram Image with subtle animation */}
            <div 
              className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 transition-transform duration-700 ease-out hover:scale-105"
              style={{
                animation: contentVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none'
              }}
            >
              <CloudinaryImage
                src={siteConfig.couple.monogram}
                alt="Monogram"
                fill
                className="object-contain"
                priority
                style={{
                  filter: 'brightness(0) invert(1) drop-shadow(0 4px 16px rgba(255,255,255,0.35))',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          {/* "You are" — script */}
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: 'var(--color-motif-cream)',
              textShadow:
                '0 2px 14px rgba(0,0,0,0.6), 0 0 28px rgba(247,243,239,0.30)',
            }}
          >
            You are
          </h2>

          {/* "Invited!" — serif display */}
          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: 'var(--color-motif-cream)',
              textShadow:
                '0 2px 16px rgba(0,0,0,0.65), 0 0 32px rgba(190,132,0,0.35)',
              letterSpacing: '0.08em',
            }}
          >
            Invited!
          </h1>

          {/* Thin gold divider */}
          <div
            className={`w-20 h-px transition-all duration-1000 ease-out delay-400 ${
              contentVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{
              background: `linear-gradient(90deg, transparent, var(--color-motif-accent), transparent)`,
            }}
          />

          {/* CTA Button */}
          <button
            onClick={onOpen}
            className={`relative px-10 py-3.5 text-xs tracking-[0.25em] uppercase transition-all duration-500 ease-out delay-500 group ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 500,
              color: 'var(--color-motif-cream)',
              border: '1px solid rgba(190,132,0,0.6)',
              backgroundColor: 'rgba(80,17,46,0.45)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(190,132,0,0.20)',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(190,132,0,0.25)';
              e.currentTarget.style.borderColor = 'rgba(190,132,0,0.90)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.40), 0 0 16px rgba(190,132,0,0.20)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(80,17,46,0.45)';
              e.currentTarget.style.borderColor = 'rgba(190,132,0,0.6)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(190,132,0,0.20)';
            }}
          >
            Open Invitation
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};
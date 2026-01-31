import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 160);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#FFFFFF'
        }}
      />

      {/* Date background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(8rem,25vw,18rem)] font-extralight tracking-[0.2em] opacity-[0.06]"
          style={{ fontFamily: '"Cinzel", serif', color: '#9B6A41' }}
        >
          03 26 26
        </span>
      </div>

      {/* Corner floral decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left */}
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration top left"
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          style={{ transform: 'scaleY(-1)', filter: 'brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)' }}
          priority={false}
        />
        {/* Top right */}
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration top right"
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          style={{ transform: 'scaleX(-1) scaleY(-1)', filter: 'brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)' }}
          priority={false}
        />
        {/* Bottom left */}
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration bottom left"
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)' }}
          priority={false}
        />
        {/* Bottom right */}
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration bottom right"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          style={{ transform: 'scaleX(-1)', filter: 'brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)' }}
          priority={false}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/newmonogram.png"
              alt="Monogram"
              fill
              className="object-contain"
              priority
              style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(55%) saturate(900%) hue-rotate(355deg) brightness(95%) contrast(90%)' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center w-full max-w-sm sm:max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Couple names */}
          <div
            className="text-3xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, fontStyle: 'normal', color: '#9B6A41' }}
          >
            <div>{siteConfig.couple.groomNickname}</div>
            <div>&</div>
            <div>{siteConfig.couple.brideNickname}</div>
          </div>

          {/* Invitation text */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <p
              className="text-xs sm:text-sm tracking-[0.25em] uppercase"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, color: '#9B6A41', letterSpacing: '0.2em' }}
            >
              Together with their families
            </p>
            <p
              className="text-base sm:text-lg tracking-wide"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, color: '#9B6A41' }}
            >
              Preparing your invitation
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-0.5 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4" style={{ backgroundColor: 'rgba(155, 106, 65, 0.3)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#9B6A41' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[8px] sm:text-[9px] tracking-[0.2em]"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, color: '#9B6A41' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};
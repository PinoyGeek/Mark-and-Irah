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
          background:
            'radial-gradient(circle at 20% 20%, rgba(196, 209, 226, 0.12) 0%, rgba(196, 209, 226, 0) 35%), radial-gradient(circle at 80% 80%, rgba(169, 169, 169, 0.1) 0%, rgba(169, 169, 169, 0) 35%), var(--color-motif-deep)'
        }}
      />

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/mongoram.png"
              alt="Daniel & Florence Monogram"
              fill
              className="object-contain"
              priority
              style={{ filter: 'brightness(0) saturate(100%) invert(94%) sepia(17%) saturate(168%) hue-rotate(343deg) brightness(96%) contrast(93%)' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center max-w-sm sm:max-w-2xl px-4 sm:px-6">
          {/* Message */}
          <p
            className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide mb-4 sm:mb-6 italic"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: 'var(--color-motif-cream)' }}
          >
            Please wait while we prepare your invitation
          </p>

          {/* Loading text */}
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 600, color: 'var(--color-motif-cream)' }}
          >
            Loading Invitation
          </p>

          {/* Couple names */}
          <p
            className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, color: 'var(--color-motif-cream)' }}
          >
            {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
          </p>

          {/* Progress bar */}
          <div
            className="relative w-48 sm:w-64 h-0.5 mx-auto rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(236, 229, 219, 0.25)' }}
          >
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: 'var(--color-motif-soft)' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em] mt-2 sm:mt-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: 'rgba(236, 229, 219, 0.7)' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};
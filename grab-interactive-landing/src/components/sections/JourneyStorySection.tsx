'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  'Dari',
  'satu',
  'kota',
  'di',
  'Malaysia,',
  'hingga',
  'jutaan',
  'perjalanan',
  'tiap',
  'hari.',
];

export function JourneyStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Timeline animasi kata jatuh 1 per 1
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.falling-word',
        {
          y: -140, // Jatuh dari atas
          opacity: 0,
          scale: 1.18,
          rotate: (i) => (i % 2 === 0 ? -8 : 8),
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.09, // Efek berurutan satu per satu
          ease: 'back.out(2)', // Efek mendarat mantap berbobot
        }
      );
    }, section);

    // IntersectionObserver: memutar animasi saat section di-scroll masuk ke layar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl?.play();
          } else {
            tl?.reverse();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perjalanan-kami"
      className="relative z-30 flex h-screen w-full min-h-[600px] items-center justify-center overflow-clip -mt-10 md:-mt-16 rounded-t-[36px] md:rounded-t-[48px] bg-primary text-white shadow-[0_-16px_50px_rgba(0,0,0,0.18)] select-none"
    >
      {/* Main Content Container - Centered */}
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-6 md:px-12 text-center">
        <h2 className="story-main-title max-w-7xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] 2xl:text-[124px] font-black leading-[1.06] tracking-tighter text-white text-balance flex flex-wrap justify-center gap-x-[0.26em] gap-y-[0.04em]">
          {WORDS.map((word, idx) => (
            <span
              key={idx}
              className="falling-word inline-block will-change-transform"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

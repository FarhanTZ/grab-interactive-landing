'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isReadyForHover = false;
    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // 🌟 Timeline Masuk di 1 Bidang Layer 1 (Menggunakan IntersectionObserver yang Mengalir Natural)
      tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          isReadyForHover = true;
        },
      });

      // 1. Logo Grab Putih Reveal
      tl.fromTo(
        logoRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: -60,
          filter: 'blur(16px) drop-shadow(0 0 0px rgba(255,255,255,0))',
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: 'blur(0px) drop-shadow(0 10px 30px rgba(255,255,255,0.45))',
          duration: 0.7,
          ease: 'back.out(1.8)',
        }
      );

      // 2. Animasi Kata-Kata Jatuh & Muncul 1 per 1 Berurutan
      tl.fromTo(
        '.falling-word',
        {
          y: -60,
          opacity: 0,
          scale: 1.15,
          rotate: (i: number) => (i % 2 === 0 ? -10 : 10),
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          stagger: 0.04,
          duration: 0.55,
          ease: 'back.out(1.5)',
        },
        '-=0.3'
      );

      // 3. Ambient Glow Aura Expansion
      tl.fromTo(
        '.journey-logo-glow',
        { scale: 0.4, opacity: 0 },
        { scale: 1.4, opacity: 0.45, duration: 0.8, ease: 'sine.out' },
        0
      );
    }, section);

    // 🎯 IntersectionObserver: Menjalankan animasi secara natural begitu tiba di layar
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
      { threshold: 0.2 }
    );

    observer.observe(section);

    // 🌟 Efek Interaktif Kursor Proximity (Dissolve & Scatter saat Didekati)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isReadyForHover) return;

      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) return;

      wordsRef.current.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const rect = wordEl.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;

        const distX = e.clientX - wordCenterX;
        const distY = e.clientY - wordCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const radius = 140; // Radius kedekatan kursor

        if (distance < radius) {
          const force = 1 - distance / radius;
          const angle = Math.atan2(distY, distX);
          const pushX = -Math.cos(angle) * force * 40;
          const pushY = -Math.sin(angle) * force * 45;
          const rot = (idx % 2 === 0 ? -1 : 1) * force * 18;

          gsap.to(wordEl, {
            x: pushX,
            y: pushY,
            scale: 1 + force * 0.3,
            opacity: Math.max(0.1, 1 - force * 0.9),
            filter: `blur(${force * 8}px)`,
            rotation: rot,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(wordEl, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            rotation: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto',
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (!isReadyForHover) return;

      wordsRef.current.forEach((wordEl) => {
        if (!wordEl) return;
        gsap.to(wordEl, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          rotation: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perjalanan-kami"
      className="relative z-10 flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-[#00B14F] text-white select-none cursor-default py-12 px-6"
    >
      {/* Dynamic Background Aura Glow */}
      <div className="journey-logo-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[120px]" />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center px-6 md:px-12 text-center"
      >
        {/* 🌟 LOGO GRAB PUTIH (REVEAL SEIRING SCROLL) 🌟 */}
        <div
          ref={logoRef}
          className="relative mb-6 sm:mb-8 md:mb-10 flex items-center justify-center will-change-transform"
        >
          <Image
            src="/images/assets_grab/grab_logo_putih.png"
            alt="Grab Logo Putih"
            width={220}
            height={85}
            priority
            className="h-14 sm:h-18 md:h-22 lg:h-26 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* 🌟 TIPOGRAFI PERJALANAN KAMI 🌟 */}
        <h2 className="story-main-title max-w-6xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] 2xl:text-[104px] font-black leading-[1.08] tracking-tighter text-white text-balance flex flex-wrap justify-center gap-x-[0.24em] gap-y-[0.04em]">
          {WORDS.map((word, idx) => (
            <span
              key={idx}
              ref={(el) => {
                wordsRef.current[idx] = el;
              }}
              className="falling-word inline-block will-change-[transform,opacity,filter] transition-colors"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

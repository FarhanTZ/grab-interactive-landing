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
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Timeline animasi kata jatuh 1 per 1 saat scroll
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.falling-word',
        {
          y: -140,
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
          stagger: 0.09,
          ease: 'back.out(2)',
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

    // 🌟 Efek Interaktif Kursor: Ketika didekati, teks menghilang / memudar / melayang (Dissolve & Scatter)
    const handleMouseMove = (e: MouseEvent) => {
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

        const radius = 150; // Radius kedekatan kursor

        if (distance < radius) {
          // Makin dekat kursor, makin hilang / blur / mengambang menjauh
          const force = (1 - distance / radius); // 0 (jauh) s/d 1 (sangat dekat)
          const angle = Math.atan2(distY, distX);
          const pushX = -Math.cos(angle) * force * 40;
          const pushY = -Math.sin(angle) * force * 50;
          const rot = (idx % 2 === 0 ? -1 : 1) * force * 20;

          gsap.to(wordEl, {
            x: pushX,
            y: pushY,
            scale: 1 + force * 0.35,
            opacity: Math.max(0.08, 1 - force * 0.92), // Menghilang hampir transparan
            filter: `blur(${force * 10}px)`, // Efek blur pudar
            rotation: rot,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          // Ketika kursor menjauh, kembalikan ke posisi semula secara membal
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
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perjalanan-kami"
      className="relative z-30 flex h-screen w-full min-h-[600px] items-center justify-center overflow-clip -mt-10 md:-mt-16 rounded-t-[36px] md:rounded-t-[48px] bg-primary text-white shadow-[0_-16px_50px_rgba(0,0,0,0.18)] select-none cursor-default"
    >
      {/* Main Content Container - Centered */}
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-6 md:px-12 text-center">
        <h2 className="story-main-title max-w-7xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] 2xl:text-[124px] font-black leading-[1.06] tracking-tighter text-white text-balance flex flex-wrap justify-center gap-x-[0.26em] gap-y-[0.04em]">
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

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export function TimelineTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.transition-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
        0
      )
        .fromTo(
          '.transition-title',
          { y: 35, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
          0.15
        )
        .fromTo(
          '.transition-prompt',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          0.3
        );
    }, section);

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
      id="transisi-timeline"
      className="relative z-10 flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F8FAF9] dark:bg-[#07130C] py-16 px-6 md:px-12 select-none cursor-default"
    >
      {/* Studio Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      {/* Green Continuous Spine Line yang Menyambung ke Center Timeline */}
      <div className="pointer-events-none absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-black/5 z-10">
        <div
          className="transition-line absolute inset-0 origin-top bg-gradient-to-b from-[#00B14F] via-emerald-500 to-[#00B14F] shadow-[0_0_12px_rgba(0,177,79,0.5)]"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* Center Content Container: Murni Judul & Scroll Prompt Saja */}
      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center z-20">
        {/* Title */}
        <h2 className="transition-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0A1A12] dark:text-white tracking-tight leading-tight">
          Menelusuri Perjalanan <br />
          <span className="text-primary">2012 — Sekarang</span>
        </h2>

        {/* Scroll Indicator Prompt */}
        <div className="transition-prompt mt-12 flex flex-col items-center gap-3">
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-primary/90 animate-pulse">
            Scroll untuk Menjelajah
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-[#0F1D14] border-2 border-primary/30 shadow-lg text-primary animate-bounce">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

export function TimelineTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.transition-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.transition-line',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: 'power2.inOut' },
          0.1
        )
        .fromTo(
          '.transition-title',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          0.2
        )
        .fromTo(
          '.transition-desc',
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

      {/* Center Content Container */}
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col items-center justify-center text-center z-20">
        {/* Badge Mono Tag */}
        <div className="transition-badge inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-black tracking-widest text-primary shadow-sm mb-6">
          <Sparkles className="h-3.5 w-3.5" /> 03 — DOKUMENTASI HISTORI
        </div>

        {/* Title */}
        <h2 className="transition-title text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1A12] dark:text-white tracking-tight leading-tight">
          Menelusuri Perjalanan <span className="text-primary">2012 — Sekarang</span>
        </h2>

        {/* Subtitle */}
        <p className="transition-desc mt-4 text-sm sm:text-base text-black/60 dark:text-white/60 max-w-lg leading-relaxed font-medium">
          Dari garasi kecil di Malaysia hingga menjadi platform teknologi serba bisa terbesar di Asia Tenggara.
        </p>

        {/* Scroll Indicator Prompt */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary/80 animate-pulse">
            Scroll untuk Menjelajah
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#0F1D14] border border-primary/20 shadow-md text-primary animate-bounce">
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

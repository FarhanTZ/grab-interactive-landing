'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ExternalLink, Smartphone, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export function DirectGrabSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.direct-logo',
        { scale: 0.7, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.direct-title',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.direct-desc',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.direct-cta-buttons',
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
          '-=0.2'
        )
        .fromTo(
          '.direct-footer-note',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
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
      { threshold: 0.2 }
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
      id="direct-grab"
      className="relative z-10 flex h-screen min-h-screen w-full flex-col justify-between items-center overflow-hidden bg-[#F8FAF9] dark:bg-[#07160D] text-[#0A1A12] dark:text-white py-12 md:py-16 px-6 md:px-12 select-none transition-colors duration-300"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 dark:bg-primary/15 blur-[150px]" />
      <div className="pointer-events-none absolute right-12 bottom-12 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[110px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #00B14F 1px, transparent 1px), linear-gradient(to bottom, #00B14F 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="w-full" />

      {/* Main Center Content Container */}
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center z-20 my-auto">
        {/* Grab Official Logo */}
        <div className="direct-logo relative flex items-center justify-center mb-6 group cursor-pointer">
          <div className="pointer-events-none absolute inset-0 -m-8 rounded-full bg-primary/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
          <Image
            src="/images/assets_grab/grab_logo.png"
            alt="Grab Logo Official"
            width={340}
            height={130}
            priority
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,177,79,0.3)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Headline */}
        <h2 className="direct-title text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A1A12] dark:text-white leading-tight">
          Mulai Perjalanan Anda <br />
          Bersama <span className="text-primary bg-gradient-to-r from-[#00B14F] to-emerald-500 bg-clip-text text-transparent">Grab Indonesia</span>
        </h2>

        {/* Description */}
        <p className="direct-desc mt-4 max-w-xl text-sm sm:text-base text-[#5B6B62] dark:text-white/70 leading-relaxed font-medium">
          Dapatkan kemudahan layanan transportasi harian, pesan-antar makanan lezat, pengiriman instan, dan pembayaran digital terpercaya dalam satu aplikasi.
        </p>

        {/* 🌟 DIRECT CTA BUTTONS (Direct to https://www.grab.com/id/) 🌟 */}
        <div className="direct-cta-buttons mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* Primary Official Website Link Button */}
          <a
            href="https://www.grab.com/id/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-[0_10px_35px_rgba(0,177,79,0.35)] transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:shadow-[0_15px_45px_rgba(0,177,79,0.55)] active:scale-95 cursor-pointer"
          >
            <span>Kunjungi grab.com/id</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Secondary Download App Button */}
          <a
            href="https://www.grab.com/id/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/20 bg-white dark:bg-white/5 px-7 py-4 text-sm sm:text-base font-bold text-[#0A1A12] dark:text-white shadow-xs backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-95 cursor-pointer"
          >
            <Smartphone className="h-4 w-4" />
            <span>Unduh Aplikasi</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="direct-footer-note mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5B6B62] dark:text-white/50 font-semibold">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Platform Terverifikasi Resmi</span>
          </div>
          <div className="hidden sm:inline opacity-30">•</div>
          <div className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-primary" />
            <span>Melayani Jutaan Pengguna di 8 Negara</span>
          </div>
        </div>
      </div>

      {/* Minimalist Bottom Copyright */}
      <footer className="w-full text-center py-4 border-t border-black/5 dark:border-white/5 text-[11px] text-[#5B6B62]/80 dark:text-white/40 z-20">
        <p>© {new Date().getFullYear()} Grab Holdings Inc. Dilindungi oleh hak cipta.</p>
      </footer>
    </section>
  );
}

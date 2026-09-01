'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Car,
  UtensilsCrossed,
  Wallet2,
  Globe2,
  Building2,
  ArrowUpRight,
  Sparkles,
  Navigation,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function JourneyStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 0. Section Transition Animation (Sheet slide-in from About)
      gsap.fromTo(
        section,
        {
          y: '18vh',
          scale: 0.97,
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          boxShadow: '0 -24px 60px rgba(0,0,0,0.15)',
        },
        {
          y: '0vh',
          scale: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 100%',
            end: 'top 20%',
            scrub: 1.3,
          },
        }
      );

      // 1. Entrance header reveal
      gsap.fromTo(
        '.story-header-badge',
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.story-header-title',
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      // 2. Interactive Route Card & Map
      gsap.fromTo(
        '.story-map-card',
        { scale: 0.94, autoAlpha: 0, y: 40 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.story-content-grid', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.story-service-item',
        { x: 30, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.story-content-grid', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );

      // 3. Parallax ambient background
      gsap.to('.story-ambient-glow', {
        y: -50,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perjalanan-kami"
      className="relative w-full overflow-clip bg-gradient-to-b from-[#00A045] to-[#008A3B] text-white"
      style={{ willChange: 'transform' }}
    >
      {/* Decorative Grid & Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />
      <div className="story-ambient-glow pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-white/15 blur-[90px]" />
      <div className="story-ambient-glow pointer-events-none absolute -right-32 bottom-10 h-[520px] w-[520px] rounded-full bg-emerald-200/15 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
        {/* HEADER SECTION 03 */}
        <div>
          <div className="story-header-badge inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3.5 py-1.5 text-xs font-extrabold tracking-widest text-white backdrop-blur-md shadow-sm">
            <Building2 className="h-4 w-4" /> 03 — PERJALANAN KAMI
          </div>
          <h2 className="story-header-title mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-[44px]">
            Dari satu kota di Malaysia,<br />
            hingga jutaan perjalanan tiap hari.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Grab memulai langkah dari menyelesaikan masalah transportasi di Asia Tenggara. Kini kami berevolusi menjadi superapp terintegrasi untuk mobilitas, makanan, belanja, dan finansial.
          </p>
        </div>

        {/* STORY CONTENT GRID */}
        <div className="story-content-grid mt-12 grid gap-8 md:mt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
          {/* Interactive Map Visual Card */}
          <div className="story-map-card relative overflow-hidden rounded-[28px] border border-white/20 bg-white p-2 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#EEF2EF] p-4 md:aspect-[1.2/1]">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
              
              {/* Route SVG */}
              <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full p-4">
                <path d="M 40 260 C 120 220 180 260 200 160 C 220 60 300 80 360 40" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="16" strokeLinecap="round" />
                <path d="M 40 260 C 120 220 180 260 200 160 C 220 60 300 80 360 40" fill="none" stroke="#00B14F" strokeWidth="16" strokeLinecap="round" strokeDasharray="8 12" />
                <circle cx="40" cy="260" r="12" fill="#fff" stroke="#00B14F" strokeWidth="5" />
                <circle cx="360" cy="40" r="12" fill="#00B14F" stroke="#fff" strokeWidth="4" />
                <g transform="translate(195 155)">
                  <circle r="20" fill="#00B14F" />
                  <circle r="8" fill="#fff" />
                </g>
              </svg>

              {/* Floating badges on map */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <span className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-bold text-[#0A1A12] shadow-lg border border-black/5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"><Car className="h-4 w-4" /></span> GrabBike • 2.1km
                </span>
                <span className="flex items-center gap-2 rounded-2xl bg-primary px-3.5 py-2.5 text-xs font-bold text-white shadow-lg">
                  <Globe2 className="h-4 w-4" /> 8 Negara SEA
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white px-5 py-3.5">
              <span className="text-xs font-extrabold tracking-widest text-[#5B6B62]">KUALA LUMPUR → JAKARTA → SINGAPURA</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Lihat rute <ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </div>

          {/* Service Pillar Highlights */}
          <div className="flex flex-col gap-4">
            <div className="story-service-item rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-emerald-200">
                <Sparkles className="h-4 w-4" /> EKOSISTEM DIGITAL LENGKAP
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-white">Satu Aplikasi, Seluruh Kebutuhan</h3>
              <p className="mt-1.5 text-sm text-white/85 leading-relaxed">
                Mulai dari antar-jemput cepat, pemesanan makanan favorit, belanja harian di GrabMart, hingga kemudahan transaksi non-tunai di satu tempat.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Car, label: 'GrabRide', sub: 'Bike • Car • Premium' },
                { icon: UtensilsCrossed, label: 'GrabFood & Mart', sub: 'Food • Groceries' },
                { icon: Wallet2, label: 'GrabPay', sub: 'Wallet • PayLater' },
              ].map((it) => (
                <div key={it.label} className="story-service-item group rounded-2xl border border-white/20 bg-white p-3.5 text-center text-[#0A1A12] shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                  <it.icon className="mx-auto h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  <div className="mt-2 text-xs font-extrabold leading-tight">{it.label}</div>
                  <div className="text-[10px] font-medium text-[#5B6B62] mt-0.5">{it.sub}</div>
                </div>
              ))}
            </div>

            <div className="story-service-item flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-primary shadow-md">8 Negara SEA</span>
              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur">Superapp #1 Asia Tenggara</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

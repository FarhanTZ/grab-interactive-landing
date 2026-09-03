'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 38, suffix: 'jt+', label: 'Pengguna aktif bulanan', sub: 'di 8 negara SEA' },
  { value: 500, suffix: '+', label: 'Kota beroperasi', sub: 'dari 2012 - sekarang' },
  { value: 4.8, suffix: '/5', label: 'Rating kepuasan', sub: 'jutaan ulasan verified' },
  { value: 2012, suffix: '', label: 'Tahun berdiri', sub: 'MyTeksi → Grab' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Continuous marquee
      gsap.set('.about-marquee-track', { xPercent: -50 });
      gsap.to('.about-marquee-track', {
        xPercent: 0,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });

      // Siapkan timeline animasi masuk yang PAUSED (hanya jalan saat user tiba di section ini)
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.about-eyebrow',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.about-title',
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.about-image',
          { scale: 0.5, opacity: 0, rotate: -15 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.85, ease: 'back.out(1.6)' },
          '-=0.5'
        )
        .fromTo(
          '.about-desc',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.stat-card',
          { y: 60, opacity: 0, scale: 0.88 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'back.out(1.4)',
            onStart: () => {
              // Jalankan counter angka statistik saat kartu mulai muncul
              document.querySelectorAll<HTMLElement>('.stat-number').forEach((el) => {
                const target = parseFloat(el.dataset.target || '0');
                const isFloat = target % 1 !== 0;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: target,
                  duration: 1.5,
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent = isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString();
                  },
                });
              });
            },
          },
          '-=0.3'
        );
    }, section);

    // 🎯 IntersectionObserver: HANYA memutar animasi ketika section ini secara fisik masuk ke layar setelah Hero selesai!
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
      id="about"
      className="relative z-10 min-h-screen min-h-[100dvh] w-full overflow-hidden bg-primary text-white flex flex-col justify-center py-10 sm:py-14 md:py-16 select-none"
    >
      {/* Marquee text background - 100% Putih Solid Murni */}
      <div className="pointer-events-none absolute left-0 top-[15px] sm:top-[20px] w-full select-none overflow-hidden opacity-100">
        <div className="about-marquee-track flex w-max will-change-transform">
          <p className="shrink-0 whitespace-nowrap px-4 text-[54px] sm:text-[72px] font-black leading-none tracking-tighter text-white md:text-[120px]">
            GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY •
          </p>
          <p aria-hidden className="shrink-0 whitespace-nowrap px-4 text-[54px] sm:text-[72px] font-black leading-none tracking-tighter text-white md:text-[120px]">
            GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY •
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-10">
        {/* HEADER */}
        <div className="about-header relative">
          <div className="about-eyebrow inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-3.5 py-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-widest text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> 02 — TENTANG GRAB
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
            <h2 className="about-title max-w-2xl flex-1 text-2xl sm:text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl">
              Satu aplikasi untuk <span className="text-white/90">semua kebutuhan</span> sehari-hari.
            </h2>
            {/* Gambar Grab */}
            <div className="about-image shrink-0 overflow-hidden rounded-full border-4 border-white/90 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] h-[90px] w-[90px] sm:h-[130px] sm:w-[130px] md:h-[220px] md:w-[220px] lg:h-[260px] lg:w-[260px]">
              <img
                src="/images/assets_grab/grab.png"
                alt="Grab Superapp"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="about-desc mt-4 sm:mt-6 max-w-2xl leading-relaxed text-white/85 text-xs sm:text-sm md:text-base">
            Lahir sebagai <b className="text-white">MyTeksi</b> pada 2012 oleh Anthony Tan &amp; Tan Hooi Ling, Grab kini adalah superapp
            terbesar di Asia Tenggara — menghubungkan jutaan penumpang, mitra pengemudi &amp; UMKM dalam satu ekosistem.
            Dari antar-jemput hingga finansial, semua ada dalam genggaman.
          </p>
        </div>

        {/* STATS */}
        <div className="stats-grid mt-8 sm:mt-12 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4 md:gap-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-card group relative overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/20 bg-white p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-xl transition group-hover:bg-primary/[0.14]" />
              <div className="flex items-baseline gap-1">
                <span className="stat-number text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A1A12] md:text-4xl" data-target={s.value}>
                  {s.value}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-primary md:text-2xl">{s.suffix}</span>
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold leading-tight text-[#0A1A12]">{s.label}</div>
              <div className="mt-0.5 text-[10px] sm:text-xs font-medium text-[#5B6B62]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

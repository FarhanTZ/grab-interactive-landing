'use client';

import { useLayoutEffect, useRef } from 'react';
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Transisi mulus: About slide dari bawah menutup Hero
      gsap.fromTo(
        section,
        { y: '28vh', opacity: 0, scale: 0.98, borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: '0 -20px 60px rgba(0,0,0,0.15)' },
        {
          y: '0vh',
          opacity: 1,
          scale: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 100%',
            end: 'top 22%',
            scrub: 1.4,
          },
        }
      );

      // Hero fade lanjutan
      gsap.to('#journey-trigger', {
        opacity: 0.6,
        scale: 0.97,
        filter: 'blur(2px)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 40%',
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        '.about-eyebrow',
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.about-header', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.about-title .line',
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.about-header', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.about-desc',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.about-header', start: 'top 78%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

      document.querySelectorAll<HTMLElement>('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const isFloat = target % 1 !== 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          onUpdate: () => {
            el.textContent = isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString();
          },
        });
      });

      gsap.set('.about-marquee-track', { xPercent: -50 });
      gsap.to('.about-marquee-track', {
        xPercent: 0,
        duration: 18,
        ease: 'none',
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-clip bg-primary text-white"
      style={{ willChange: 'transform' }}
    >
      {/* Top progress bar */}
      <div className="pointer-events-none sticky top-0 z-20 h-[3px] w-full bg-white/20">
        <div
          className="about-progress h-full w-full origin-left bg-white"
          style={{ transform: 'scaleX(0)' }}
          ref={(el) => {
            if (!el) return;
            gsap.to(el, {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
            });
          }}
        />
      </div>

      {/* Marquee text */}
      <div className="pointer-events-none absolute left-0 top-[72px] w-full select-none overflow-hidden md:top-[30px]">
        <div className="about-marquee-track flex w-max will-change-transform">
          <p className="shrink-0 whitespace-nowrap px-4 text-[72px] font-extrabold leading-none tracking-tighter text-white md:text-[120px]">
            GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY •
          </p>
          <p aria-hidden className="shrink-0 whitespace-nowrap px-4 text-[72px] font-extrabold leading-none tracking-tighter text-white md:text-[120px]">
            GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY • GRAB • SUPERAPP • EVERYDAY •
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-20 pt-[132px] md:px-10 md:pb-28 md:pt-[176px]">
        {/* HEADER */}
        <div className="about-header relative">
          <div className="about-eyebrow inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-3 py-1.5 text-[11px] font-extrabold tracking-widest text-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> 02 — TENTANG GRAB
          </div>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <h2 className="about-title max-w-full flex-1 text-[32px] font-extrabold leading-[1.15] tracking-tight text-white md:text-[50px]">
              <span className="line block overflow-hidden"><span className="block py-1">Satu aplikasi untuk</span></span>
              <span className="line block overflow-hidden"><span className="block py-1 text-white">semua kebutuhan</span></span>
              <span className="line block overflow-hidden"><span className="block py-1 text-white/90">sehari-hari.</span></span>
            </h2>
            {/* Gambar Grab */}
            <div className="about-image shrink-0 overflow-hidden rounded-full border-white/90 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] h-[100px] w-[100px] md:h-[360px] md:w-[360px]">
              <img
                src="/images/grab.png"
                alt="Grab Superapp"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="about-desc mt-1 max-w-xl leading-relaxed text-white/85 md:text-base">
            Lahir sebagai <b className="text-white">MyTeksi</b> pada 2012 oleh Anthony Tan &amp; Tan Hooi Ling, Grab kini adalah superapp
            terbesar di Asia Tenggara — menghubungkan jutaan penumpang, mitra pengemudi &amp; UMKM dalam satu ekosistem.
            Dari antar-jemput hingga finansial, semua ada dalam genggaman.
          </p>
        </div>

        {/* STATS - Card putih kontras di background hijau */}
        <div className="stats-grid mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-card group relative overflow-hidden rounded-[20px] border border-white/20 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] md:p-6"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-xl transition group-hover:bg-primary/[0.14]" />
              <div className="flex items-baseline gap-1">
                <span className="stat-number text-[28px] font-extrabold tracking-tight text-[#0A1A12] md:text-[32px]" data-target={s.value}>
                  {s.value}
                </span>
                <span className="text-[18px] font-extrabold text-primary md:text-xl">{s.suffix}</span>
              </div>
              <div className="mt-1 text-sm font-bold leading-tight text-[#0A1A12]">{s.label}</div>
              <div className="text-xs font-medium text-[#5B6B62]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

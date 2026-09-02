'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPinned,
  Flag,
  Rocket,
  Layers,
  Leaf,
  Globe2,
  TrendingUp,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_STEPS = [
  {
    year: '2012',
    icon: Flag,
    title: 'MyTeksi Lahir di Malaysia',
    location: 'Kuala Lumpur, Malaysia',
    desc: 'Bermula dari ide sederhana Anthony Tan & Tan Hooi Ling saat di Harvard Business School untuk mengatasi rasa tidak aman dan ketidakpastian tarif taksi di Kuala Lumpur.',
    tag: 'Awal Perjalanan',
  },
  {
    year: '2016',
    icon: Rocket,
    title: 'Rebrand ke Grab & Ekspansi Regional',
    location: 'Indonesia, SG, PH, TH, VN',
    desc: 'Menyatukan seluruh armada di bawah bendera Grab. Meluncurkan GrabCar dan GrabBike serentak di berbagai kota metropolitan Asia Tenggara.',
    tag: 'Ekspansi Kilat',
  },
  {
    year: '2018',
    icon: Layers,
    title: 'Transformasi Menjadi Superapp Harian',
    location: 'Seluruh Asia Tenggara',
    desc: 'Mengintegrasikan layanan pengantaran makanan (GrabFood), kurir instan (GrabExpress), dan dompet digital (GrabPay) dalam satu aplikasi serbabisa.',
    tag: 'Ekosistem Terpadu',
  },
  {
    year: '2021',
    icon: TrendingUp,
    title: 'Melantai di Nasdaq & Skala Global',
    location: 'New York & Global',
    desc: 'Grab resmi menjadi perusahaan publik di bursa Nasdaq, memperkuat kapasitas pendanaan untuk riset AI dan teknologi pemetaan masa depan.',
    tag: 'Pencapaian Global',
  },
  {
    year: '2024',
    icon: Leaf,
    title: 'Armada EV & Keberlanjutan Hijau',
    location: '500+ Kota di 8 Negara',
    desc: 'Mengoperasikan puluhan ribu kendaraan listrik ramah lingkungan dan meluncurkan AI Eco-Routing untuk menekan emisi karbon perkotaan.',
    tag: 'Inovasi Ramah Lingkungan',
  },
  {
    year: 'Sekarang',
    icon: Globe2,
    title: '38Juta+ Pengguna & Ekosistem Terbesar',
    location: 'Asia Tenggara',
    desc: 'Menghubungkan jutaan mitra pengemudi, merchant UMKM, dan konsumen dalam ekosistem digital terpercaya yang membuka peluang tanpa batas.',
    tag: 'Masa Depan Bersama',
  },
];

export function CenterTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const tracker = trackerRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // 🚀 Animasi Gerak Ke Atas (Scrub Lift-Up) saat scroll masuk
      gsap.fromTo(
        section,
        { y: 120 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
          },
        }
      );

      // 1. Header Animation
      gsap.fromTo(
        '.timeline-sec-badge',
        { y: 25, autoAlpha: 0 },
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
        '.timeline-sec-heading',
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

      // 2. Garis Tengah Scroll Drawing (scrub animation)
      const tlLine = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline-track-wrap',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1.2,
          onUpdate: (self) => {
            if (tracker) {
              gsap.set(tracker, { y: self.progress * (line.parentElement?.offsetHeight || 600) });
            }
          },
        },
      });

      tlLine.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'top center', ease: 'none' }
      );

      // 3. Staggered card reveal dari Kiri dan Kanan
      document.querySelectorAll<HTMLElement>('.timeline-row-item').forEach((row, i) => {
        const isLeft = i % 2 === 0;
        const card = row.querySelector('.timeline-card-content');
        const node = row.querySelector('.timeline-center-node');

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              ease: 'back.out(1.6)',
              clearProps: 'all',
              scrollTrigger: { trigger: row, start: 'top 78%', toggleActions: 'play none none none' },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { x: isLeft ? -45 : 45, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power3.out',
              clearProps: 'all',
              scrollTrigger: { trigger: row, start: 'top 78%', toggleActions: 'play none none none' },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="histori-perjalanan"
      className="relative z-50 min-h-screen w-full overflow-clip bg-[#F8FAF9] py-20 text-[#0A1A12] flex flex-col justify-center md:py-24"
      style={{ willChange: 'transform' }}
    >
      {/* Background Decorative Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 md:px-10">
        {/* HEADER */}
        <div className="text-center">
          <div className="timeline-sec-badge inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary">
            <Calendar className="h-4 w-4" /> 05 — HISTORI PERJALANAN
          </div>
          <h2 className="timeline-sec-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1A12] md:text-[46px]">
            Jejak Langkah Grab<br />
            <span className="text-primary">Dari Masa ke Masa</span>
          </h2>
          <p className="timeline-sec-heading mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5B6B62] md:text-base">
            Perjalanan transformasi dari aplikasi pemesanan taksi lokal hingga menjadi superapp mobilitas & finansial nomor satu di Asia Tenggara.
          </p>
        </div>

        {/* CENTER TIMELINE CONTAINER */}
        <div className="timeline-track-wrap relative mt-16 md:mt-24">
          {/* Garis Track Abu-abu di Tengah */}
          <div className="absolute left-6 top-0 bottom-0 w-[4px] -translate-x-1/2 rounded-full bg-black/10 md:left-1/2">
            {/* Garis Hijau Aktif yang Digambar Saat Scroll */}
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top rounded-full bg-primary"
              style={{ transform: 'scaleY(0)' }}
            />
            {/* Glow Tracker Dot di ujung garis */}
            <div
              ref={trackerRef}
              className="pointer-events-none absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,177,79,1)]"
            />
          </div>

          {/* TIMELINE ITEMS LIST (ZIGZAG) */}
          <div className="space-y-12 md:space-y-16">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={step.year}
                  className={cn(
                    'timeline-row-item relative flex flex-col items-start md:flex-row md:items-center',
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  )}
                >
                  {/* Center Node / Dot Icon */}
                  <div className="timeline-center-node absolute left-6 top-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F8FAF9] bg-primary text-white shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Card Content (Kiri atau Kanan) */}
                  <div
                    className={cn(
                      'timeline-card-content w-full pl-14 md:pl-0 md:w-[44%]',
                      isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    )}
                  >
                    <div className="group relative overflow-hidden rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] md:p-7">
                      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition" />

                      {/* Header Card: Year & Tag */}
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        )}
                      >
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                          {step.year}
                        </span>
                        <span className="text-[11px] font-bold text-[#5B6B62]">
                          • {step.tag}
                        </span>
                      </div>

                      {/* Title & Location */}
                      <h3 className="mt-3 text-xl font-extrabold text-[#0A1A12] leading-tight">
                        {step.title}
                      </h3>
                      <div
                        className={cn(
                          'mt-1 flex items-center gap-1 text-xs font-semibold text-primary',
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        )}
                      >
                        <MapPinned className="h-3.5 w-3.5" />
                        <span>{step.location}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-relaxed text-[#5B6B62]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM MOTIVATIONAL NOTE */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold text-[#0A1A12] shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" /> Perjalanan terus berlanjut untuk jutaan masa depan cerah di Asia Tenggara
          </div>
        </div>
      </div>
    </section>
  );
}

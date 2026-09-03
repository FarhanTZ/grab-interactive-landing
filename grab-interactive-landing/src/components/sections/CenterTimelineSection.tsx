'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  Award,
  Building2,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TIMELINE_STEPS = [
  {
    index: '01',
    year: '2012',
    icon: Flag,
    tag: 'Awal Perjalanan',
    title: 'MyTeksi Lahir di Malaysia',
    location: 'Kuala Lumpur, Malaysia',
    desc: 'Bermula dari ide sederhana Anthony Tan & Tan Hooi Ling saat di Harvard Business School untuk mengatasi rasa tidak aman dan ketidakpastian tarif taksi di Kuala Lumpur. Lahir sebagai aplikasi pemesanan taksi terpercaya pertama di kawasan.',
    achievements: ['Fokus awal: Keselamatan penumpang taksi', 'Ekspansi kota pertama: Lembah Klang', 'Aplikasi pionir pemesanan ride berbasis GPS'],
    watermark: '2012',
  },
  {
    index: '02',
    year: '2016',
    icon: Rocket,
    tag: 'Ekspansi Kilat',
    title: 'Rebrand ke Grab & Ekspansi Regional',
    location: 'Indonesia, Singapura, Filipina, Thailand, Vietnam',
    desc: 'Menyatukan seluruh armada transportasi di bawah satu bendera Grab. Meluncurkan GrabCar dan GrabBike serentak di berbagai kota metropolitan Asia Tenggara untuk menjawab kebutuhan mobilitas harian yang cepat.',
    achievements: ['Rebranding resmi menjadi Grab', 'Peluncuran layanan GrabBike & GrabCar', 'Beroperasi di 6 negara Asia Tenggara'],
    watermark: '2016',
  },
  {
    year: '2018',
    index: '03',
    tag: 'Superapp & GrabFood',
    icon: Globe2,
    title: 'Akuisisi Uber & Lahirnya GrabFood',
    location: 'Ekspansi Regional',
    desc: 'Langkah historis mengakuisisi operasional Uber di Asia Tenggara, mempercepat peluncuran GrabFood dan GrabFinancial menjadi Everyday Superapp.',
    achievements: ['Akuisisi bisnis Uber di Asia Tenggara', 'Peluncuran GrabFood di ratusan kota', 'Integrasi dompet digital GrabPay & OVO'],
    watermark: '2018',
  },
  {
    year: '2021',
    index: '04',
    tag: 'IPO & Go Public',
    icon: Building2,
    title: 'Debut di Bursa Saham Nasdaq (GRAB)',
    location: 'New York & Global',
    desc: 'Pencatatan saham bersejarah di bursa Nasdaq New York. Menegaskan posisi Grab sebagai decacorn teknologi terdepan dari Asia Tenggara.',
    achievements: ['Listing resmi di bursa NASDAQ (Ticker: GRAB)', 'Penawaran IPO terbesar dari Asia Tenggara', 'Valuasi mencapai status Decacorn Global'],
    watermark: '2021',
  },
  {
    year: '2024',
    index: '05',
    tag: 'Inovasi AI & Hijau',
    icon: CreditCard,
    title: 'Bank Digital & Inovasi AI Ramah Lingkungan',
    location: 'Asia Tenggara',
    desc: 'Peluncuran bank digital (SuperBank & GXBank), adopsi armada kendaraan listrik (EV) terbesar, serta AI cerdas untuk navigasi dan efisiensi pesanan.',
    achievements: ['Peluncuran SuperBank & GXBank digital', 'Puluhan ribu armada motor & mobil listrik EV', 'Penerapan AI GenAI & GrabMaps Enterprise'],
    watermark: '2024',
  },
  {
    year: 'MASA DEPAN',
    index: '06',
    tag: 'Ekosistem Terbesar',
    icon: Sparkles,
    title: '38Juta+ Pengguna & Ekosistem Terbesar',
    location: 'Asia Tenggara',
    desc: 'Menghubungkan jutaan mitra pengemudi, merchant UMKM, dan konsumen dalam ekosistem digital terpercaya. Grab terus berinovasi untuk memberdayakan jutaan mata pencaharian dan memajukan perekonomian digital Asia Tenggara.',
    achievements: ['38Juta+ pengguna aktif bulanan di 8 negara', 'Jutaan mitra pengemudi & merchant UMKM berdaya', 'Inovasi superapp berkelanjutan tanpa henti'],
    watermark: 'NOW',
  },
];

export function CenterTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  });

  const smoothLineScale = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.5,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];
    const timelines: Map<HTMLElement, gsap.core.Timeline> = new Map();

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.timeline-fullscreen-step').forEach((sec, i) => {
        const isLeft = i % 2 === 0;
        const node = sec.querySelector<HTMLElement>('.timeline-step-node');
        const card = sec.querySelector<HTMLElement>('.timeline-step-card');
        const watermark = sec.querySelector<HTMLElement>('.timeline-step-watermark');
        const achievements = sec.querySelectorAll<HTMLElement>('.timeline-achieve-item');

        const tl = gsap.timeline({ paused: true });

        if (watermark) {
          tl.fromTo(
            watermark,
            { scale: 0.75, opacity: 0 },
            { scale: 1, opacity: 0.05, duration: 0.8, ease: 'power3.out' },
            0
          );
        }

        if (node) {
          tl.fromTo(
            node,
            { scale: 0, rotate: -180, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)' },
            0.1
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { x: isLeft ? -90 : 90, opacity: 0, scale: 0.88 },
            { x: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'back.out(1.4)' },
            0.15
          );
        }

        if (achievements.length > 0) {
          tl.fromTo(
            achievements,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
            0.3
          );
        }

        timelines.set(sec, tl);

        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              const sectionTl = timelines.get(target);
              if (entry.isIntersecting) {
                sectionTl?.play();
              } else {
                sectionTl?.reverse();
              }
            });
          },
          { threshold: 0.15 }
        );

        obs.observe(sec);
        observers.push(obs);
      });
    }, container);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} id="histori-perjalanan" className="relative w-full bg-[#F8FAF9]">
      {/* 🟢 1. SATU GARIS PUSAT UTUH MENYAMBUNG DARI AWAL SAMPAI AKHIR SELURUH TIMELINE (Z-20 SELALU TERLIHAT) 🟢 */}
      <div className="pointer-events-none absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-black/10 z-20">
        <motion.div
          style={{ scaleY: smoothLineScale }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-[#00B14F] via-emerald-500 to-[#00B14F] shadow-[0_0_14px_rgba(0,177,79,0.8)]"
        />
      </div>

      {TIMELINE_STEPS.map((step, idx) => {
        const isLeft = idx % 2 === 0;
        const Icon = step.icon;
        return (
          <section
            key={step.year}
            id={`histori-${step.year.toLowerCase()}`}
            className="timeline-fullscreen-step relative z-10 h-screen min-h-screen w-full overflow-hidden bg-transparent py-12 px-6 md:px-10 flex flex-col justify-center items-center select-none"
          >
            <div
              className={cn(
                'timeline-step-watermark pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[140px] sm:text-[220px] md:text-[300px] lg:text-[350px] font-black tracking-tighter text-[#0A1A12] opacity-[0.06] leading-none whitespace-nowrap',
                isLeft
                  ? 'left-1/2 -translate-x-1/2 md:left-auto md:right-8 lg:right-16 md:translate-x-0'
                  : 'left-1/2 -translate-x-1/2 md:left-8 lg:left-16 md:right-auto md:translate-x-0'
              )}
            >
              {step.watermark}
            </div>

            {/* BACKGROUND PATTERNS */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />

            <div className="relative mx-auto w-full max-w-[1240px] z-20">
              {/* STEP CONTAINER */}
              <div
                className={cn(
                  'relative flex flex-col items-start md:flex-row md:items-center',
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                )}
              >
                {/* Center Node / Dot Icon */}
                <div className="timeline-step-node absolute left-6 top-6 z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F8FAF9] bg-primary text-white shadow-xl shadow-primary/25 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Milestone Card Content (Kiri atau Kanan) */}
                <div
                  className={cn(
                    'timeline-step-card w-full pl-14 md:pl-0 md:w-[45%]',
                    isLeft ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                  )}
                >
                  <div className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.07)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_50px_rgba(0,177,79,0.14)] md:p-8">
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition" />

                    {/* Header Card: Step Index, Year & Tag */}
                    <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-black text-white shadow-sm shadow-primary/25">
                          {step.year}
                        </span>
                        <span className="text-xs font-extrabold tracking-wider text-[#5B6B62]">
                          • {step.tag.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-black tracking-widest text-primary/70">
                        {step.index} / 06
                      </span>
                    </div>

                    {/* Title & Location */}
                    <h3 className="mt-4 text-2xl font-extrabold text-[#0A1A12] leading-tight md:text-3xl">
                      {step.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-primary">
                      <MapPinned className="h-4 w-4 shrink-0" />
                      <span>{step.location}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-[#5B6B62]">
                      {step.desc}
                    </p>

                    {/* Key Achievements Checklist */}
                    <div className="mt-6 space-y-2.5 rounded-2xl border border-black/5 bg-[#F8FAF9] p-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-black tracking-wider text-primary">
                        <Award className="h-3.5 w-3.5" /> PENCAPAIAN KUNCI TAHUN {step.year}
                      </div>
                      {step.achievements.map((item, i) => (
                        <div key={i} className="timeline-achieve-item flex items-start gap-2 text-xs font-semibold text-[#0A1A12]">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

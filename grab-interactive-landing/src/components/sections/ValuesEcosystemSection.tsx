'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ShieldCheck,
  Leaf,
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';

const VALUES_DATA = [
  {
    id: 'safety',
    icon: ShieldCheck,
    tag: 'Safety First',
    title: 'Keamanan Tanpa Kompromi',
    desc: 'Standar keselamatan tertinggi di industri ride-hailing dengan verifikasi biometrik pengemudi, pelacakan GPS real-time, tombol darurat SOS 24/7, dan perlindungan asuransi otomatis.',
    accentColor: 'from-[#00B14F] to-[#008A3E]',
    badgeBg: 'bg-[#00B14F]',
    highlights: [
      'Verifikasi wajah mitra harian',
      'Tombol darurat SOS terhubung polisi',
      'Perlindungan asuransi kecelakaan gratis',
    ],
  },
  {
    id: 'sustainability',
    icon: Leaf,
    tag: 'Sustainability',
    title: 'Hijau untuk Masa Depan',
    desc: 'Komitmen menuju nol emisi karbon dengan armada kendaraan listrik (EV) roda dua & roda empat terbesar di Asia Tenggara, didukung algoritma AI rute hemat energi.',
    accentColor: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-emerald-600',
    highlights: [
      'Armada EV & stasiun swap baterai',
      'AI Eco-routing pangkas jejak karbon',
      'Program donasi tanam pohon (Offset)',
    ],
  },
  {
    id: 'empowerment',
    icon: HeartHandshake,
    tag: 'Empowerment',
    title: 'Pemberdayaan Jutaan Pelaku Usaha',
    desc: 'Membuka akses finansial dan ekonomi digital bagi jutaan mitra pengemudi, pedagang pasar, dan pelaku UMKM kuliner di seluruh pelosok kota.',
    accentColor: 'from-[#0A1A12] to-[#163322]',
    badgeBg: 'bg-[#0A1A12]',
    highlights: [
      'Onboarding UMKM gratis ke GrabFood',
      'Layanan keuangan mikro GrabFinancial',
      'Pelatihan & beasiswa anak mitra',
    ],
  },
];

export function ValuesEcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Timeline animasi masuk yang PAUSED (hanya jalan saat Section masuk layar)
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.values-badge',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.values-heading',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.values-desc',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.value-card-box',
          { y: 60, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.14, ease: 'back.out(1.4)' },
          '-=0.3'
        )
        .fromTo(
          '.values-bottom-banner',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          '-=0.2'
        );
    }, section);

    // 🎯 IntersectionObserver: HANYA memutar animasi saat Section terlihat di layar!
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
      { threshold: 0.15 }
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
      id="nilai-keamanan"
      className="relative z-40 h-screen min-h-screen w-full overflow-hidden bg-[#07160D] py-14 text-white flex flex-col justify-center select-none"
    >
      {/* Background Decorative Lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: `linear-gradient(to right, #00B14F 1px, transparent 1px), linear-gradient(to bottom, #00B14F 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        {/* HEADER */}
        <div className="values-header-box text-center">
          <div className="values-badge inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary backdrop-blur-md">
            <Sparkles className="h-4 w-4" /> 04 — PRINSIP & NILAI KAMI
          </div>
          <h2 className="values-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Inovasi Berdampak Nyata bagi<br />
            Masyarakat & Masa Depan
          </h2>
          <p className="values-desc mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Tiga pilar fundamental yang menggerakkan setiap baris kode, teknologi AI, dan operasional Grab di seluruh Asia Tenggara.
          </p>
        </div>

        {/* 3 HERO VALUE CARDS GRID */}
        <div className="values-card-grid mt-14 grid gap-6 md:mt-18 md:grid-cols-3 md:gap-7">
          {VALUES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="value-card-box group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#0E2317]/80 p-7 shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_24px_50px_rgba(0,177,79,0.2)] md:p-8"
              >
                {/* Glow Spot */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-2xl transition-all duration-300 group-hover:bg-primary/25" />

                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.badgeBg} text-white shadow-lg shadow-black/20`}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-extrabold tracking-widest text-primary">
                      {item.tag.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="mt-6 text-2xl font-extrabold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {item.desc}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {item.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs font-semibold text-white/90">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary group-hover:text-emerald-400 transition-colors">
                    Pelajari inisiatif <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM IMPACT BANNER */}
        <div className="values-bottom-banner mt-12 rounded-[24px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
              <Lock className="h-6 w-6" />
            </span>
            <div>
              <h4 className="text-base font-extrabold text-white">Sertifikasi Keamanan & Privasi Standar Global</h4>
              <p className="text-xs text-white/70 mt-0.5">Enkripsi data end-to-end berstandar ISO 27001 dan perlindungan privasi pengguna terverifikasi.</p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-500 active:scale-95"
          >
            Pusat Keamanan Grab
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPinned,
  ShieldCheck,
  Leaf,
  Users,
  UtensilsCrossed,
  Wallet2,
  Car,
  Globe2,
  Building2,
  HeartHandshake,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 38, suffix: 'jt+', label: 'Pengguna aktif bulanan', sub: 'di 8 negara SEA' },
  { value: 500, suffix: '+', label: 'Kota beroperasi', sub: 'dari 2012 - sekarang' },
  { value: 4.8, suffix: '/5', label: 'Rating kepuasan', sub: 'jutaan ulasan verified' },
  { value: 2012, suffix: '', label: 'Tahun berdiri', sub: 'MyTeksi → Grab' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    tag: 'Safety First',
    title: 'Keamanan tanpa kompromi',
    desc: 'Verifikasi mitra, pelacakan real-time, tombol darurat & asuransi perjalanan di setiap ride.',
    accent: 'bg-primary',
  },
  {
    icon: Leaf,
    tag: 'Sustainability',
    title: 'Hijau untuk masa depan',
    desc: 'Armada EV berkembang, rute AI hemat energi & program offset karbon di seluruh SEA.',
    accent: 'bg-emerald-600',
  },
  {
    icon: HeartHandshake,
    tag: 'Empowerment',
    title: 'Peluang untuk semua',
    desc: 'Jutaan mitra pengemudi & UMKM naik kelas lewat finansial inklusif GrabPay & GrabFood.',
    accent: 'bg-[#0A1A12]',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // transisi mulus: About slide dari bawah menutup Hero (parallax sheet)
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
      // hero fade lanjutan saat About sudah mulai masuk (biar tidak patah antara pin end -> about start)
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
      gsap.from('.about-eyebrow', {
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-header', start: 'top 85%' },
      });
      gsap.fromTo('.about-title .line',
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out', clearProps: 'transform',
          scrollTrigger: { trigger: '.about-header', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.from('.about-desc', {
        y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-header', start: 'top 78%' },
      });
      gsap.from('.stat-card', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
      });
      document.querySelectorAll<HTMLElement>('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const isFloat = target % 1 !== 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString();
          },
        });
      });
      gsap.from('.story-media', {
        clipPath: 'inset(12% 12% 12% 12% round 24px)',
        scale: 1.08,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.story-row', start: 'top 80%' },
      });
      gsap.from('.story-text > *', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.story-row', start: 'top 75%' },
      });
      gsap.to('.story-glow', {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: '.story-row', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.from('.value-card', {
        y: 50, opacity: 0, scale: 0.96, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.values-grid', start: 'top 82%' },
      });
      const line = document.querySelector('.timeline-line-active') as HTMLElement;
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1, transformOrigin: 'top center', ease: 'none',
            scrollTrigger: { trigger: '.timeline-wrap', start: 'top 70%', end: 'bottom 65%', scrub: 1 },
          }
        );
      }
      gsap.from('.timeline-item', {
        x: -20, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline-wrap', start: 'top 75%' },
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
      className="relative w-full overflow-clip bg-primary"
      style={{ willChange: 'transform' }}
    >
      {/* top progress - putih biar kontras di hijau */}
      <div className="pointer-events-none sticky top-0 z-20 h-[3px] w-full bg-white/20">
        <div
          className="about-progress h-full w-full origin-left bg-white"
          style={{ transform: 'scaleX(0)' }}
          ref={(el) => {
            if (!el) return;
            gsap.to(el, {
              scaleX: 1, ease: 'none',
              scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
            });
          }}
        />
      </div>

      {/* marquee - putih transparan biar tidak nyatu tapi tetap terlihat */}
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

      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-16 pt-[132px] md:px-10 md:pb-20 md:pt-[176px]">
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
            {/* gambar grab di samping title - lingkaran besar */}
            <div className="about-image shrink-0 overflow-hidden rounded-full border-white/90 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] h-[100px] w-[100px] md:h-[400px] md:w-[400px]">
              <img
                src="/images/grab.png"
                alt="Grab Superapp"
                className="h- w-full object-cover"
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

        {/* STATS - card tetap putih biar kontras di background hijau */}
        <div className="stats-grid mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-card group relative overflow-hidden rounded-[20px] border border-white/20 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] md:p-6"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-xl transition group-hover:bg-primary/[0.14]" />
              <div className="flex items-baseline gap-1">
                <span className="stat-number text-[28px] font-extrabold tracking-tight text-[#0A1A12] md:text-[32px]" data-target={s.value}>
                  0
                </span>
                <span className="text-[18px] font-extrabold text-primary md:text-xl">{s.suffix}</span>
              </div>
              <div className="mt-1 text-sm font-bold leading-tight text-[#0A1A12]">{s.label}</div>
              <div className="text-xs font-medium text-[#5B6B62]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* STORY ROW */}
        <div className="story-row mt-10 grid gap-6 md:mt-14 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:items-center">
          <div className="relative">
            <div className="story-glow pointer-events-none absolute -left-6 -top-6 h-80 w-[320px] rounded-full bg-white/20 blur-[50px] md:h-105 md:w-105" />
            <div className="story-media relative overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-[4/3] w-full bg-[#EEF2EF] p-4 md:aspect-[1.15/1]">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />
                <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full p-6">
                  <path d="M 40 260 C 120 220 180 260 200 160 C 220 60 300 80 360 40" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="14" strokeLinecap="round" />
                  <path d="M 40 260 C 120 220 180 260 200 160 C 220 60 300 80 360 40" fill="none" stroke="#00B14F" strokeWidth="14" strokeLinecap="round" strokeDasharray="8 10" opacity={0.9} />
                  <circle cx="40" cy="260" r="10" fill="#fff" stroke="#00B14F" strokeWidth="4" />
                  <circle cx="360" cy="40" r="10" fill="#00B14F" stroke="#fff" strokeWidth="3" />
                  <g transform="translate(190 150)">
                    <circle r="18" fill="#00B14F" />
                    <circle r="8" fill="#fff" />
                  </g>
                </svg>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <span className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-xs font-bold text-[#0A1A12] shadow-lg border border-black/5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white"><Car className="h-4 w-4" /></span> GrabBike • 2.1km
                  </span>
                  <span className="flex items-center gap-2 rounded-2xl bg-primary px-3 py-2.5 text-xs font-bold text-white shadow-lg">
                    <Globe2 className="h-4 w-4" /> 8 Negara
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white px-4 py-3">
                <span className="text-xs font-extrabold tracking-widest text-[#5B6B62]">KUALA LUMPUR → JAKARTA → SINGAPURA</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">Lihat peta <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </div>

          <div className="story-text">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold tracking-widest text-white border border-white/20">
              <Building2 className="h-4 w-4" /> PERJALANAN KAMI
            </div>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-[30px]">
              Dari satu kota di Malaysia,<br />hingga jutaan perjalanan tiap hari.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-[15px]">
              Grab memulai langkah untuk menyelesaikan masalah transportasi yang tidak aman &amp; tidak efisien. Hari ini,
              kami melayani <b className="text-white">Transport, Delivery, dan Financial Services</b> — membantu orang bergerak, makan, belanja, dan mengelola uang lebih mudah.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { icon: Car, label: 'GrabRide', sub: 'Bike • Car • Premium' },
                { icon: UtensilsCrossed, label: 'GrabFood & Mart', sub: 'Food • Groceries • Courier' },
                { icon: Wallet2, label: 'GrabPay', sub: 'Wallet • PayLater • Insurance' },
              ].map((it) => (
                <div key={it.label} className="rounded-2xl border border-white/20 bg-white px-3 py-3 text-center shadow-sm">
                  <it.icon className="mx-auto h-5 w-5 text-primary" />
                  <div className="mt-1 text-xs font-extrabold leading-tight text-[#0A1A12]">{it.label}</div>
                  <div className="text-[11px] font-medium leading-tight text-[#5B6B62]">{it.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-primary shadow">8 Negara SEA</span>
              <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur">Superapp #1 Asia Tenggara</span>
            </div>
          </div>
        </div>

        {/* VALUES - card putih */}
        <div className="values-grid mt-12 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="value-card group relative overflow-hidden rounded-[24px] border border-white/20 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] md:p-7"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/15 transition" />
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${v.accent} text-white shadow`}>
                <v.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-[11px] font-extrabold tracking-widest text-primary">{v.tag}</div>
              <div className="mt-1 text-[18px] font-extrabold leading-tight text-[#0A1A12]">{v.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6B62]">{v.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#0A1A12]">
                Pelajari <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* TIMELINE - card putih */}
        <div className="timeline-wrap relative mt-12 rounded-[28px] border border-white/20 bg-white p-6 md:mt-14 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold tracking-widest text-[#5B6B62]">TIMELINE GRAB</h4>
            <span className="hidden items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary md:inline-flex"><MapPinned className="h-3.5 w-3.5" /> 2012 — Sekarang</span>
          </div>

          <div className="relative mt-6 flex gap-6 md:gap-8">
            <div className="relative w-[2px] shrink-0 self-stretch bg-black/10">
              <div className="timeline-line-active absolute inset-0 origin-top bg-primary" />
            </div>

            <div className="flex flex-1 flex-col gap-6">
              {[
                { year: '2012', title: 'MyTeksi lahir di KL', desc: 'Aplikasi pemesanan taksi untuk keamanan penumpang, didirikan Anthony Tan & Tan Hooi Ling.' },
                { year: '2016', title: 'Menjadi Grab & ekspansi', desc: 'Rebrand ke Grab, ekspansi ke Indonesia, Singapura, Filipina, Thailand & Vietnam.' },
                { year: '2018', title: 'Superapp terbentuk', desc: 'GrabFood, GrabExpress & GrabPay melengkapi ekosistem harian pengguna.' },
                { year: 'Sekarang', title: '500+ kota, jutaan mitra', desc: 'Fokus pada mobilitas berkelanjutan, finansial inklusif & pemberdayaan UMKM.' },
              ].map((it) => (
                <div key={it.year} className="timeline-item flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(0,177,79,0.15)]" />
                  <div>
                    <div className="text-xs font-extrabold tracking-widest text-primary">{it.year}</div>
                    <div className="text-[15px] font-extrabold text-[#0A1A12]">{it.title}</div>
                    <p className="mt-1 max-w-[560px] text-sm leading-relaxed text-[#5B6B62]">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden w-[280px] shrink-0 md:block">
              <div className="rounded-2xl border border-black/5 bg-[#F5F7F6] p-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0A1A12]"><Users className="h-4 w-4 text-primary" /> Dampak nyata</div>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5B6B62]">
                  <li>• Jutaan penghasilan mitra meningkat</li>
                  <li>• UMKM go-digital via GrabFood/Mart</li>
                  <li>• Akses finansial tanpa rekening bank</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-medium text-white/70">
          Scroll terus untuk eksplor layanan Grab — animasi di atas sudah pakai <b className="text-white">GSAP + ScrollTrigger + Lenis</b> dan responsif di semua device.
        </p>
      </div>
    </section>
  );
}

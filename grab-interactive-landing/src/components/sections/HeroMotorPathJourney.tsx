'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { JOURNEY_STEPS } from '@/lib/constants';
import { useStore } from '@/lib/store';
import { MapPin, Navigation, CheckCircle2, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const stepIcons = { MapPin, Navigation, CheckCircle2 };
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function HeroMotorPathJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<SVGGElement>(null);
  const etaTextRef = useRef<HTMLSpanElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activePathRef.current || !vehicleRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const activePath = activePathRef.current!;
      const vehicle = vehicleRef.current!;
      const len = activePath.getTotalLength();
      gsap.set(activePath, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            const p = self.progress;
            useStore.getState().setMotorProgress(p);
            updateVehicleImmediate(p);

            // Update DOM text langsung tanpa trigger React re-render flicker
            if (etaTextRef.current) {
              etaTextRef.current.textContent = `ETA ${Math.max(1, Math.round(6 - p * 5))} min`;
            }
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${Math.round(p * 100)}% • ${(2.8 - p * 0.8).toFixed(1)} km`;
            }

            // Update step highlight
            const currentIdx = p < 0.35 ? 0 : p < 0.75 ? 1 : 2;
            for (let i = 0; i < 3; i++) {
              const el = document.getElementById(`hero-step-${i}`);
              if (el) {
                if (i === currentIdx) {
                  el.classList.add('bg-primary', 'text-white', 'border-primary');
                  el.classList.remove('bg-surface-container/90', 'border-[var(--theme-border)]');
                } else {
                  el.classList.remove('bg-primary', 'text-white', 'border-primary');
                  el.classList.add('bg-surface-container/90', 'border-[var(--theme-border)]');
                }
              }
            }
          },
        },
      });

      tl.to(activePath, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);

      // vehicle follow path - presisi di lintasan, smoothing ringan
      const xTo = gsap.quickTo(vehicle, 'x', { duration: 0.18, ease: 'power2.out' });
      const yTo = gsap.quickTo(vehicle, 'y', { duration: 0.18, ease: 'power2.out' });
      const rotTo = gsap.quickTo(vehicle, 'rotation', { duration: 0.28, ease: 'power2.out' });

      const updateVehicleImmediate = (progress: number) => {
        const p = Math.max(0, Math.min(1, progress));
        const lenAt = len * p;
        const pt = activePath.getPointAtLength(lenAt);
        
        const pAhead = Math.min(len, lenAt + 12);
        const pt2 = activePath.getPointAtLength(pAhead);
        let angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);

        // 🅿️ Efek Gerakan Parkir saat mendekati titik tujuan (p > 0.88 s/d 1.0)
        if (p > 0.88) {
          const parkProgress = (p - 0.88) / 0.12;
          const roadAngle = angle;
          // Belok halus ke sudut parkir horizontal (0 derajat) di samping titik tujuan
          angle = gsap.utils.interpolate(roadAngle, 0, parkProgress);
        }

        const currentRot = (gsap.getProperty(vehicle, 'rotation') as number) || 0;
        let diff = angle - currentRot;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle = currentRot + diff;

        xTo(pt.x);
        yTo(pt.y);
        rotTo(angle);
      };

      gsap.set(vehicle, { x: 880, y: 120, rotation: 90, transformOrigin: '0px 0px' });
      (tl as unknown as { _targetProgress: number })._targetProgress = 0;
      updateVehicleImmediate(0);

      // Inisialisasi posisi dan opacity card & map blur (jernih tanpa blur di awal)
      gsap.set('#hero-map-layer', { filter: 'none', opacity: 1 });
      gsap.set('#hero-intro', { opacity: 1, y: 0 });
      gsap.set('#center-hint', { opacity: 1, y: 0, xPercent: -50 });
      gsap.set('#on-way-callout', { opacity: 0, scale: 0.92, y: 24 });
      gsap.set('#arrive-popup', { opacity: 0, scale: 0.85, yPercent: -50 });
      gsap.set('#hero-step-0', { opacity: 1, y: 0, scale: 1 });
      gsap.set('#hero-step-1', { opacity: 0.72, y: 0, scale: 1 });
      gsap.set('#hero-step-2', { opacity: 0.72, y: 0, scale: 1 });

      // 1. Intro text & hint hilang begitu mulai scroll (p: 0.08 s/d 0.20)
      tl.to('#hero-intro', { opacity: 0, y: -28, duration: 0.14, ease: 'power2.in' }, 0.08);
      tl.to('#center-hint', { opacity: 0, y: 16, duration: 0.12, ease: 'power2.in' }, 0.08);

      // 2. Card 0 (01 Penjemputan) MENGHILANG saat motor melaju meninggalkan titik awal (p: 0.28)
      tl.to('#hero-step-0', { opacity: 0, y: -18, scale: 0.92, duration: 0.12, ease: 'power2.in' }, 0.28);

      // 3. Card Melintasi Jalur Tercepat (AI Route) & Card 1 aktif di sisi kiri (p: 0.32 s/d 0.62)
      tl.to('#on-way-callout', { opacity: 1, scale: 1, y: 0, duration: 0.14, ease: 'back.out(1.4)' }, 0.32);
      tl.to('#hero-step-1', { opacity: 1, duration: 0.1 }, 0.32);

      // 4. Card AI Route & Card 1 (02 Dalam Perjalanan) MENGHILANG saat melewati rute tengah (p: 0.58 s/d 0.62)
      tl.to('#on-way-callout', { opacity: 0, scale: 0.94, y: -28, duration: 0.14, ease: 'power2.in' }, 0.58);
      tl.to('#hero-step-1', { opacity: 0, y: -18, scale: 0.92, duration: 0.12, ease: 'power2.in' }, 0.62);

      // 5. Card 2 (03 Sampai Tujuan) aktif saat mendekati akhir (p: 0.64)
      tl.to('#hero-step-2', { opacity: 1, duration: 0.1 }, 0.64);

      // 6. Card 2 MENGHILANG saat tiba di titik tujuan akhir (p: 0.86), pop-up muncul, lalu transisi fade out bersih ke background putih
      tl.to('#hero-step-2', { opacity: 0, y: -18, scale: 0.92, duration: 0.14, ease: 'power2.in' }, 0.86);
      tl.to('#arrive-popup', { opacity: 1, scale: 1, yPercent: -50, duration: 0.14, ease: 'back.out(1.5)' }, 0.88);
      tl.to('#hero-map-layer, #arrive-popup, #hero-gps-header', {
        opacity: 0,
        scale: 0.97,
        duration: 0.08,
        ease: 'power2.inOut',
      }, 0.92);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey-trigger"
      className="relative h-[100vh] w-screen overflow-hidden bg-surface"
      style={{ height: '100vh', width: '100vw', willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
      {/* MAP - FULL LAYAR 2D SVG */}
      <div id="hero-map-layer" className="absolute inset-0">
        <div className="absolute inset-0 bg-surface">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, var(--theme-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-grid) 1px, transparent 1px)`, backgroundSize: '56px 56px' }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[80px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
            <path d="M 880,120 C 880,500 120,470 120,850" fill="none" stroke="var(--theme-road-inactive)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={activePathRef} id="route-active" d="M 880,120 C 880,500 120,470 120,850" fill="none" stroke="#00B14F" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 18px rgba(0,177,79,0.5))' }} />
            <circle cx="880" cy="120" r="22" fill="var(--theme-road-dot)" stroke="#00B14F" strokeWidth="7" />
            <circle cx="120" cy="850" r="22" fill="var(--theme-road-dot)" stroke="#00B14F" strokeWidth="7" />
            <circle cx="880" cy="120" r="7" fill="#fff" />
            <circle cx="120" cy="850" r="7" fill="#fff" />
            <g ref={vehicleRef} id="vehicle">
              <g transform="translate(-45 -19.5) scale(1.35)">
                {/* shadow */}
                <ellipse cx="44" cy="38" rx="30" ry="10" fill="rgba(0,0,0,0.18)" />
                {/* wheels */}
                <circle cx="18" cy="28" r="10" fill="#0A0D0B" stroke="#1A1A1A" strokeWidth="2" />
                <circle cx="18" cy="28" r="4" fill="#4A4A4A" />
                <circle cx="70" cy="28" r="10" fill="#0A0D0B" stroke="#1A1A1A" strokeWidth="2" />
                <circle cx="70" cy="28" r="4" fill="#4A4A4A" />
                {/* chassis */}
                <path d="M22 28 L70 28" stroke="#00B14F" strokeWidth="8" strokeLinecap="round" />
                <path d="M30 22 L68 22 L64 14 L38 14 Z" fill="#00B14F" stroke="#008A3E" strokeWidth="1.5" />
                {/* handlebars / front */}
                <path d="M70 28 L82 24" stroke="#DDE5D9" strokeWidth="3" strokeLinecap="round" />
                {/* seat */}
                <rect x="34" y="16" width="18" height="12" rx="3" fill="#111" />
                {/* rider body */}
                <ellipse cx="44" cy="20" rx="10" ry="7" fill="#00B14F" stroke="#008A3E" strokeWidth="1" />
                {/* helm Grab hijau */}
                <circle cx="44" cy="10" r="9" fill="#00B14F" stroke="#008A3E" strokeWidth="1.5" />
                <circle cx="44" cy="10" r="4.5" fill="#00C85A" opacity="0.9" />
                <path d="M38 7 Q44 3 50 7" fill="none" stroke="#fff" strokeWidth="1" opacity="0.8" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* INTRO TEXT - awal, di atas peta, hilang pas scroll */}
      <div id="hero-intro" className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-surface-container px-3.5 py-1.5 text-xs font-bold tracking-widest text-primary shadow-sm" style={{ borderColor: 'var(--theme-border)' }}>
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> GRAB SUPERAPP • INDONESIA
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight text-on-surface md:text-5xl">
          Dari layanan kebutuhan<br />
          sehari-hari hingga peluang<br />
          <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">penghasilan. Satu aplikasi serbabisa.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-on-surface-variant md:text-base">
          Scroll ke bawah — saksikan motor Grab melaju live di peta GPS dari titik jemput hingga tujuan.
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-on-surface-variant">
          <span className="h-[1px] w-8 bg-primary/40" /> Scroll untuk memulai perjalanan <span className="h-[1px] w-8 bg-primary/40" />
        </div>
      </div>

      {/* TOP: GPS HEADER - overlay */}
      <div id="hero-gps-header" className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex justify-center px-4 pt-[18px] md:pt-6 transition-all">
        <div className="flex w-full max-w-[680px] items-center justify-between rounded-2xl border bg-surface-container px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow"><Navigation className="h-5 w-5" /></span>
            <div>
              <div className="text-[11px] font-extrabold tracking-widest text-on-surface-variant">LIVE GPS • GrabBike</div>
              <div className="text-sm font-bold leading-none text-on-surface">Pacific Place → Grand Indonesia</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-bold text-primary">
              <Clock3 className="h-3.5 w-3.5" />
              <span ref={etaTextRef}>ETA 6 min</span>
            </div>
            <div ref={progressTextRef} className="text-xs font-medium text-on-surface-variant">0% • 2.8 km</div>
          </div>
        </div>
      </div>

      {/* ON THE WAY callout - khusus fase 02 di sisi kiri layar */}
      <div
        id="on-way-callout"
        className="pointer-events-none absolute left-4 sm:left-8 md:left-14 top-[30%] md:top-[34%] z-20 w-[90vw] max-w-[430px]"
      >
        <div className="rounded-[20px] border bg-surface-container px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl md:px-6 md:py-5" style={{ borderColor: 'var(--theme-border)' }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-extrabold tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> 02 • AI OPTIMAL ROUTE
          </div>
          <h3 className="mt-2 text-xl font-extrabold leading-tight text-on-surface md:text-2xl">Melintasi Jalur Tercepat</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
            Navigasi AI Grab hindari macet & lampu merah — pilih tikungan paling efisien agar ETA tetap presisi dan baterai hemat.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">Hemat 4 menit</span>
            <span className="rounded-full border bg-surface px-2.5 py-1 text-xs font-bold text-on-surface-variant" style={{ borderColor: 'var(--theme-border)' }}>Tanpa tol</span>
          </div>
        </div>
      </div>

      {/* CENTER HINT */}
      <div id="center-hint" className="pointer-events-none absolute bottom-[108px] left-1/2 z-20 md:bottom-[110px]">
        <div className="flex items-center gap-2 rounded-full border bg-surface-container px-4 py-2 text-xs font-bold text-on-surface-variant shadow-lg backdrop-blur" style={{ borderColor: 'var(--theme-border)' }}>
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(0,177,79,0.8)]" /> Scroll untuk menjalankan motor
        </div>
      </div>

      {/* BOTTOM: 3 STEPS - full width overlay */}
      <div id="hero-bottom-steps" className="absolute bottom-0 left-0 right-0 z-20 flex justify-center px-3 pb-4 md:pb-6 transition-all">
        <div className="flex w-full max-w-[820px] gap-2 md:gap-3">
          {JOURNEY_STEPS.map((s, i) => {
            const Icon = stepIcons[s.badgeIcon as keyof typeof stepIcons] || MapPin;
            const isDefaultActive = i === 0;
            return (
              <div
                key={s.stepId}
                id={`hero-step-${i}`}
                className={cn(
                  'flex flex-1 items-center gap-2.5 rounded-2xl border px-3 py-3 shadow-xl backdrop-blur-xl transition-all md:px-4',
                  isDefaultActive ? 'bg-primary text-white border-primary' : 'bg-surface-container/90 border-[var(--theme-border)] text-on-surface'
                )}
                style={{ borderColor: isDefaultActive ? '#00B14F' : 'var(--theme-border)' }}
              >
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', isDefaultActive ? 'bg-white text-primary' : 'bg-surface text-on-surface-variant')}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className={cn('text-[10px] font-extrabold tracking-widest', isDefaultActive ? 'text-white/80' : 'text-on-surface-variant')}>{s.stepNumber}</div>
                  <div className={cn('truncate text-sm font-bold leading-tight', isDefaultActive ? 'text-white' : 'text-on-surface')}>{s.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ARRIVE POPUP */}
      <div id="arrive-popup" className="pointer-events-none absolute right-4 top-1/2 z-20 md:right-8">
        <div className="flex items-center gap-3 rounded-2xl border bg-surface-container px-5 py-4 shadow-2xl" style={{ borderColor: 'var(--theme-border)' }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><CheckCircle2 className="h-5 w-5" /></span>
          <div>
            <div className="text-sm font-extrabold text-on-surface">Rp 45.000 • Selesai</div>
            <div className="text-xs font-bold text-primary">OVO Payment Success</div>
          </div>
        </div>
      </div>
    </section>
  );
}

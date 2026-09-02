'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.load-logo', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' });
      gsap.from('.load-text', { y: 12, opacity: 0, duration: 0.5, delay: 0.2, ease: 'power3.out' });
      gsap.to('.load-bar', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' });
      gsap.from('.load-dots span', { opacity: 0, stagger: 0.15, repeat: -1, yoyo: true, duration: 0.5 });
    }, rootRef);

    // fake progress 0->100 dalam 1.8s
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setProgress(100);
        // close anim
        setTimeout(() => {
          gsap.to(rootRef.current, {
            yPercent: -100,
            duration: 0.7,
            ease: 'power4.inOut',
            onComplete: () => onDone?.(),
          });
        }, 300);
      } else {
        setProgress(Math.round(p));
      }
    }, 120);

    return () => {
      clearInterval(iv);
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary overflow-hidden"
    >
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[60px]" />

      <div className="relative flex flex-col items-center">
        {/* Logo Grab Putih Resmi */}
        <div className="load-logo flex items-center justify-center">
          <img
            src="/images/assets_grab/grab_logo_putih.png"
            alt="Grab Logo Putih"
            className="h-14 md:h-18 w-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
          />
        </div>
        <div className="load-text mt-5 text-center">
          <p className="text-sm font-extrabold tracking-[0.18em] text-white">SUPERAPP • EVERYDAY</p>
          <p className="load-dots mt-1 flex justify-center gap-1 text-xs font-bold text-white/80">
            <span>•</span><span>•</span><span>•</span> Memuat pengalaman
          </p>
        </div>

        {/* progress bar */}
        <div className="mt-8 w-[220px] md:w-[260px]">
          <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/25">
            <div className="load-bar h-full w-full origin-left scale-x-0 bg-white" />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-bold tracking-widest text-white/90">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 text-[11px] font-medium tracking-wide text-white/60">© 2026 Grab — Satu aplikasi untuk semua kebutuhan</p>
    </div>
  );
}

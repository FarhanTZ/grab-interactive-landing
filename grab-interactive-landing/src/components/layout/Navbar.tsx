'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Car,
  UtensilsCrossed,
  ShoppingCart,
  Package,
  Wallet,
  ArrowUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const NAV_ITEMS = [
  { id: 'ride', label: 'Ride', icon: Car, href: '#journey-trigger' },
  { id: 'food', label: 'Food', icon: UtensilsCrossed, href: '#about' },
  { id: 'mart', label: 'Mart', icon: ShoppingCart, href: '#about' },
  { id: 'express', label: 'Express', icon: Package, href: '#about' },
  { id: 'pay', label: 'Pay', icon: Wallet, href: '#about' },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState<string>('ride');
  const activeService = useStore((s) => s.activeService);
  const setActiveService = useStore((s) => s.setActiveService);
  const motorProgress = useStore((s) => s.motorProgress);

  const heroNavRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLElement>(null);

  // Smooth interpolation transition based directly on motorProgress / arrival
  useLayoutEffect(() => {
    const heroNav = heroNavRef.current;
    const bottomNav = bottomNavRef.current;
    if (!heroNav || !bottomNav) return;

    // Hitung rasio transisi:
    // Selama di Hero (motorProgress < 0.88): ratio = 0 (100% di kiri)
    // Saat motor sampai & About masuk (motorProgress 0.88 s/d 1.0): ratio meluncur mulus 0 -> 1
    const p = Math.max(0, Math.min(1, motorProgress));
    let ratio = 0;
    if (p >= 0.88) {
      ratio = (p - 0.88) / 0.12;
    }

    // Gunakan gsap.to dengan easing halus agar pergerakannya responsif dan super smooth
    gsap.to(heroNav, {
      opacity: 1 - ratio,
      x: -24 * ratio,
      yPercent: -50 + 20 * ratio,
      scale: 1 - 0.15 * ratio,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(bottomNav, {
      opacity: ratio,
      y: 40 * (1 - ratio),
      scale: 0.88 + 0.12 * ratio,
      xPercent: -50,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (ratio > 0.5) {
      heroNav.style.pointerEvents = 'none';
      bottomNav.style.pointerEvents = 'auto';
    } else {
      heroNav.style.pointerEvents = 'auto';
      bottomNav.style.pointerEvents = 'none';
    }
  }, [motorProgress]);

  // Handler untuk scroll lanjutan setelah hero unpin
  useEffect(() => {
    const handleScroll = () => {
      const heroNav = heroNavRef.current;
      const bottomNav = bottomNavRef.current;
      if (!heroNav || !bottomNav) return;

      // Jika sudah scroll jauh di bawah hero (misal scrollY > 3100)
      if (window.scrollY >= 3000) {
        gsap.to(heroNav, { opacity: 0, scale: 0.85, x: -24, duration: 0.2, overwrite: 'auto' });
        gsap.to(bottomNav, { opacity: 1, y: 0, scale: 1, duration: 0.2, overwrite: 'auto' });
        heroNav.style.pointerEvents = 'none';
        bottomNav.style.pointerEvents = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item: (typeof NAV_ITEMS)[number]) => {
    setActiveTab(item.id);
    if (['ride', 'food', 'mart', 'express', 'pay'].includes(item.id)) {
      setActiveService(item.id as any);
    }

    if (item.href === '#journey-trigger') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. HERO VERTICAL DOCK (Sisi Kiri Layar - Aktif di Hero) */}
      <nav
        ref={heroNavRef}
        id="navbar-vertical-hero"
        aria-label="Hero Side Navigation"
        className="fixed left-3 md:left-5 top-1/2 z-50 hidden sm:flex flex-col items-center gap-3 rounded-[30px] border border-black/10 bg-surface-container/90 px-2.5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-2xl dark:border-white/10"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* LOGO 'G' */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Kembali ke atas"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          G
        </button>

        <div className="h-[1px] w-6 bg-black/10 dark:bg-white/15" />

        {/* ITEMS */}
        <div className="flex flex-col items-center gap-2.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurrentActive = activeTab === item.id || activeService === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                title={item.label}
                className="group relative flex flex-col items-center gap-1 rounded-2xl p-1 transition-colors hover:text-primary"
              >
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-all duration-300',
                    isCurrentActive
                      ? 'bg-primary text-white'
                      : 'bg-surface text-on-surface-variant group-hover:bg-primary group-hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className="text-[9px] font-extrabold tracking-widest text-on-surface-variant group-hover:text-primary"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {item.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-[1px] w-6 bg-black/10 dark:bg-white/15" />

        {/* PULSE INDICATOR */}
        <span
          className="h-2 w-2 rounded-full bg-primary animate-pulse"
          title="Live GPS Active"
        />
      </nav>

      {/* 2. ABOUT HORIZONTAL DOCK (Tengah Bawah Layar - Aktif di About) */}
      <nav
        ref={bottomNavRef}
        id="navbar-horizontal-about"
        aria-label="About Bottom Navigation"
        className="fixed bottom-5 md:bottom-7 left-1/2 z-50 flex flex-row items-center gap-1.5 md:gap-2.5 rounded-full border border-black/10 bg-white/95 px-3 py-2 md:px-5 md:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0E1E14]/95 max-w-[95vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* LOGO 'G' */}
        <button
          type="button"
          onClick={scrollToTop}
          title="Kembali ke atas"
          className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          G
        </button>

        <div className="h-5 w-[1px] mx-0.5 bg-black/10 dark:bg-white/15" />

        {/* ITEMS */}
        <div className="flex flex-row items-center gap-1 md:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurrentActive = activeTab === item.id || activeService === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                title={item.label}
                className={cn(
                  'group relative flex flex-row items-center gap-1.5 rounded-full px-2.5 py-1.5 md:px-3.5 md:py-2 text-xs font-bold transition-all duration-300',
                  isCurrentActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-black/5 hover:text-on-surface dark:hover:bg-white/10 dark:hover:text-white'
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <span className="truncate hidden sm:inline-block md:text-xs text-[11px] font-bold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-5 w-[1px] mx-0.5 bg-black/10 dark:bg-white/15" />

        {/* SCROLL TO TOP BUTTON */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-black/5 text-on-surface-variant transition hover:bg-primary hover:text-white dark:bg-white/10"
          title="Scroll ke atas"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </nav>
    </>
  );
}

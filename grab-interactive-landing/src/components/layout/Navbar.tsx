'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Building2,
  Layers,
  ShieldCheck,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  Compass,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const NAV_SECTIONS = [
  { id: 'journey-trigger', label: 'Perjalanan Live', icon: MapPin, href: '#journey-trigger' },
  { id: 'about', label: 'Tentang Grab', icon: Building2, href: '#about' },
  { id: 'intro-timeline', label: 'Histori Perjalanan', icon: Calendar, href: '#intro-timeline' },
  { id: 'perjalanan-kami', label: 'Perjalanan Kami', icon: Layers, href: '#perjalanan-kami' },
  { id: 'layanan-ekosistem', label: 'Layanan & Fitur', icon: Sparkles, href: '#layanan-ekosistem' },
  { id: 'nilai-keamanan', label: 'Nilai & Keamanan', icon: ShieldCheck, href: '#nilai-keamanan' },
  { id: 'direct-grab', label: 'Mulai Grab', icon: ExternalLink, href: '#direct-grab' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('journey-trigger');
  const [isHero, setIsHero] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Sync theme with html[data-theme] and html.dark class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // GSAP Smooth Flight Animation antar posisi Kiri & Bawah
  useEffect(() => {
    if (!navContainerRef.current) return;
    if (window.innerWidth < 768) return; // Mobile always fixed bottom

    const el = navContainerRef.current;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isHero) {
        gsap.set(el, {
          left: 24,
          top: '50%',
          xPercent: 0,
          yPercent: -50,
          y: 0,
        });
      } else {
        gsap.set(el, {
          left: '50%',
          top: '100%',
          xPercent: -50,
          yPercent: -100,
          y: -70,
        });
      }
      return;
    }

    if (isHero) {
      // 🚀 Meluncur mulus dari Bawah ke KIRI (Hero mode)
      gsap.to(el, {
        left: 24,
        top: '50%',
        xPercent: 0,
        yPercent: -50,
        y: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    } else {
      // 🚀 Meluncur mulus dari Kiri ke BAWAH (About & seterusnya)
      gsap.to(el, {
        left: '50%',
        top: '100%',
        xPercent: -50,
        yPercent: -100,
        y: -70,
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [isHero]);

  // Scroll spy presisi dengan perhitungan ScrollTrigger Pin Spacer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Cari batas akhir pin spacer Hero Section (3000px)
      const heroTrigger = ScrollTrigger.getAll().find(
        (t) => t.trigger === document.querySelector('#journey-trigger')
      );
      const pinEnd = heroTrigger ? heroTrigger.end : 3000;
      setIsHero(scrollY < pinEnd - 200);

      const scrollPos = scrollY + 250;
      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const item = NAV_SECTIONS[i];
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🎯 Navigasi Presisi yang Memperhitungkan Virtual Height Pin Spacer GSAP
  const handleNavClick = (href: string) => {
    if (href === '#journey-trigger') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    // Ambil titik ScrollTrigger start yang akurat dari GSAP
    const st = ScrollTrigger.getAll().find(
      (t) => t.trigger === el || t.vars.trigger === el
    );

    if (st && typeof st.start === 'number') {
      window.scrollTo({ top: st.start + 10, behavior: 'smooth' });
    } else {
      const elTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elTop, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed z-50 pointer-events-none inset-0">
      {/* 🌟 GSAP DRIVEN FLUID FLOATING NAVBAR */}
      <div
        ref={navContainerRef}
        className="pointer-events-auto fixed md:fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 w-max max-w-[96vw] md:max-w-none will-change-[transform,left,top]"
      >
        <div
          className={cn(
            'flex items-center justify-between border border-black/10 bg-white/95 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#0A1A12]/95 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
            isHero
              ? 'md:flex-col md:items-center md:gap-3 md:p-3 md:rounded-[32px]'
              : 'md:flex-row md:items-center md:gap-2.5 md:px-4 md:py-2 md:rounded-full',
            // Mobile & Tablet
            'p-1.5 sm:p-2 rounded-full gap-1'
          )}
        >
          {/* LOGO */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Kembali ke atas"
            className="flex items-center gap-2 transition hover:scale-105 active:scale-95 shrink-0"
          >
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-xs sm:text-sm md:text-base font-black text-white shadow-md shadow-primary/30">
              G
            </span>
            {!isHero && (
              <span className="hidden xl:inline text-base font-black tracking-tight text-on-surface animate-in fade-in duration-500">
                Grab
              </span>
            )}
          </button>

          {/* SECTION NAV ITEMS - Horizontal scroll safe on narrow screens */}
          <nav
            className={cn(
              'flex items-center gap-0.5 sm:gap-1 transition-all duration-500 flex-nowrap shrink-0 max-w-[70vw] sm:max-w-none overflow-x-auto no-scrollbar py-0.5',
              isHero ? 'md:flex-col md:gap-2 md:max-w-none md:overflow-visible' : 'md:flex-row md:gap-1'
            )}
          >
            {NAV_SECTIONS.map((item) => {
              const Icon = item.icon;
              const isCurrentActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'group relative flex items-center gap-1.5 rounded-full transition-all duration-300 shrink-0',
                    isHero
                      ? 'p-2 sm:p-2.5 md:p-3 text-xs font-bold'
                      : 'px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-bold',
                    isCurrentActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/25 scale-105'
                      : 'text-on-surface-variant hover:bg-black/5 hover:text-on-surface hover:scale-105 dark:hover:bg-white/10 dark:hover:text-white'
                  )}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Text Label: Tampil di bottom bar desktop besar, atau hover tooltip di sidebar kiri */}
                  {!isHero ? (
                    <span className="hidden md:inline whitespace-nowrap text-xs animate-in fade-in duration-400">{item.label}</span>
                  ) : (
                    <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-xl bg-[#0A1A12] px-3 py-1.5 text-xs font-bold text-white shadow-xl md:group-hover:inline animate-in fade-in duration-200">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* TOMBOL JELAJAHI */}
          <div className={cn('flex items-center transition-all duration-500 shrink-0', isHero ? 'md:pt-1' : '')}>
            <button
              type="button"
              onClick={() => handleNavClick(isHero ? '#about' : '#journey-trigger')}
              className={cn(
                'group relative flex items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/25 transition-all duration-300 hover:bg-emerald-600 hover:scale-110 active:scale-95 cursor-pointer',
                isHero
                  ? 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0'
                  : 'px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-black'
              )}
              title={isHero ? 'Jelajahi Section' : 'Kembali ke Live Journey'}
              aria-label={isHero ? 'Jelajahi Section' : 'Kembali ke Live Journey'}
            >
              {isHero ? (
                <>
                  <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:rotate-45" />
                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-xl bg-[#0A1A12] px-3 py-1.5 text-xs font-bold text-white shadow-xl md:group-hover:inline animate-in fade-in duration-200">
                    Jelajahi
                  </span>
                </>
              ) : (
                <span>Jelajahi</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🌙 FLOATING DARK / LIGHT MODE CONTROLLER (Ditaruh Agak Naik ke Atas) ☀️ */}
      <div className="pointer-events-auto fixed bottom-20 right-4 sm:bottom-24 sm:right-6 md:bottom-24 md:right-8 z-50">
        <button
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={theme === 'light' ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang'}
          aria-label={theme === 'light' ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang'}
          className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#0E1A13]/95 text-[#0A1A12] dark:text-white shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-primary/20 active:scale-95 cursor-pointer"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-rotate-12 text-[#0A1A12]" />
          ) : (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-45 text-amber-400" />
          )}
        </button>
      </div>
    </header>
  );
}

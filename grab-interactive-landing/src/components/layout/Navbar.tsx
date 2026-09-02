'use client';

import { useEffect, useState } from 'react';
import {
  Navigation,
  Building2,
  Layers,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_SECTIONS = [
  { id: 'journey-trigger', label: 'Perjalanan Live', icon: Navigation, href: '#journey-trigger' },
  { id: 'about', label: 'Tentang Grab', icon: Building2, href: '#about' },
  { id: 'perjalanan-kami', label: 'Layanan & Rute', icon: Layers, href: '#perjalanan-kami' },
  { id: 'nilai-keamanan', label: 'Nilai & Keamanan', icon: ShieldCheck, href: '#nilai-keamanan' },
  { id: 'histori-perjalanan', label: 'Histori Perjalanan', icon: Calendar, href: '#histori-perjalanan' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('journey-trigger');

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href === '#journey-trigger') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-7xl flex items-center justify-between rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0A1A12]/90">
        {/* LOGO */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 transition hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white shadow-md shadow-primary/25">
            G
          </span>
          <span className="text-lg font-black tracking-tight text-on-surface">
            Grab
          </span>
        </button>

        {/* SECTION NAV ITEMS */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((item) => {
            const Icon = item.icon;
            const isCurrentActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200',
                  isCurrentActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-black/5 hover:text-on-surface dark:hover:bg-white/10 dark:hover:text-white'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ACTION CTA */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavClick('#about')}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-black text-white shadow-md shadow-primary/25 transition hover:bg-emerald-600 active:scale-95"
          >
            <span>Jelajahi</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Calendar,
  Compass,
  ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'about', number: '02', label: 'Tentang Grab', icon: Sparkles },
  { id: 'perjalanan-kami', number: '03', label: 'Perjalanan', icon: Building2 },
  { id: 'nilai-keamanan', number: '04', label: 'Nilai & Keamanan', icon: ShieldCheck },
  { id: 'histori-perjalanan', number: '05', label: 'Histori Timeline', icon: Calendar },
];

export function StickySectionFocusNav() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Pantau scroll trigger untuk setiap section 2, 3, 4, 5
    const triggers: ScrollTrigger[] = [];

    // Trigger visibilitas floating dock (muncul saat masuk section 2 About)
    const visTrigger = ScrollTrigger.create({
      trigger: '#about',
      start: 'top 60%',
      endTrigger: '#histori-perjalanan',
      end: 'bottom 20%',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
      onLeave: () => setIsVisible(true),
      onEnterBack: () => setIsVisible(true),
    });
    triggers.push(visTrigger);

    // Trigger focus untuk tiap section
    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(sec.id),
        onEnterBack: () => setActiveSection(sec.id),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sticky Section Focus Navigation"
      className="fixed top-4 md:top-5 left-1/2 z-40 -translate-x-1/2 select-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all dark:border-white/15 dark:bg-[#0A1A12]/95">
        <div className="hidden items-center gap-1.5 px-3 py-1 text-xs font-black tracking-wider text-primary sm:flex">
          <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>FOCUS</span>
        </div>

        <div className="hidden h-4 w-[1px] bg-black/10 sm:block dark:bg-white/15" />

        {/* SECTION PILL NODES */}
        <div className="flex items-center gap-1">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isFocused = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleScrollToSection(sec.id)}
                title={`Pindah ke Section ${sec.number}: ${sec.label}`}
                className={cn(
                  'group relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition-all duration-300',
                  isFocused
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'text-on-surface-variant hover:bg-black/5 hover:text-on-surface dark:hover:bg-white/10 dark:hover:text-white'
                )}
              >
                {/* Active Focus Glow Dot */}
                {isFocused && (
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                )}

                <Icon className={cn('h-3.5 w-3.5', isFocused ? 'text-white' : 'text-primary')} />
                
                <span className="font-extrabold">{sec.number}</span>

                {/* Expanded Label on Active Focus */}
                <span
                  className={cn(
                    'transition-all duration-300',
                    isFocused ? 'inline-block max-w-[140px] opacity-100' : 'hidden md:inline-block max-w-[90px] truncate opacity-70'
                  )}
                >
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

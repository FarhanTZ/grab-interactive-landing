'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const setPrefersReducedMotion = useStore((s) => s.setPrefersReducedMotion);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(e.matches);
    };
    onChange(mediaQuery);
    mediaQuery.addEventListener('change', onChange as (e: MediaQueryListEvent) => void);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', onChange as (e: MediaQueryListEvent) => void);
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      lerp: 0.08,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      mediaQuery.removeEventListener('change', onChange as (e: MediaQueryListEvent) => void);
      lenis.off('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [setPrefersReducedMotion]);

  return <>{children}</>;
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function JourneyStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Timeline animasi masuk bersih dan mulus
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.story-main-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }
      );
    }, section);

    // IntersectionObserver: memutar animasi saat section masuk layar
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
      { threshold: 0.2 }
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
      id="perjalanan-kami"
      className="relative z-30 flex h-screen w-full min-h-[600px] items-center justify-center overflow-clip -mt-10 md:-mt-16 rounded-t-[36px] md:rounded-t-[48px] bg-primary text-white shadow-[0_-16px_50px_rgba(0,0,0,0.18)] select-none"
    >
      {/* Main Content Container - Centered */}
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-6 md:px-12 text-center">
        <h2 className="story-main-title max-w-7xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] 2xl:text-[124px] font-black leading-[1.06] tracking-tighter text-white text-balance">
          Dari satu kota di Malaysia, hingga jutaan perjalanan tiap hari.
        </h2>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const TIMELINE_GALLERY_IMAGES = [
  {
    id: 'timeline-img-1',
    src: '/images/assets_grab/grab_timeline1.jpg',
    alt: 'Grab Timeline 2012',
    pos: 'left-[2%] sm:left-[3%] md:left-[5%] top-[8%] sm:top-[10%] md:top-[12%]',
    rotation: -5,
  },
  {
    id: 'timeline-img-2',
    src: '/images/assets_grab/grab_timeline2.jpg',
    alt: 'Grab Timeline 2016',
    pos: 'right-[2%] sm:right-[3%] md:right-[5%] top-[8%] sm:top-[10%] md:top-[12%]',
    rotation: 5,
  },
  {
    id: 'timeline-img-3',
    src: '/images/assets_grab/grab_timeline3.jjpg.jpg',
    alt: 'Grab Timeline 2018',
    pos: 'left-[2%] sm:left-[3%] md:left-[5%] bottom-[8%] sm:bottom-[10%] md:bottom-[12%]',
    rotation: 4,
  },
  {
    id: 'timeline-img-4',
    src: '/images/assets_grab/grab_timeline4.jpg',
    alt: 'Grab Timeline 2024',
    pos: 'right-[2%] sm:right-[3%] md:right-[5%] bottom-[8%] sm:bottom-[10%] md:bottom-[12%]',
    rotation: -4,
  },
];

export function TimelineIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;
    let floatTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      // 🌟 Timeline Entrance: Muncul 1 per 1 secara berurutan tepat saat masuk layar
      tl = gsap.timeline({ paused: true });

      // 1. Grid Background & Teks Timeline + Logo Grab Muncul
      tl.fromTo(
        '.timeline-bg-grid',
        { opacity: 0 },
        { opacity: 0.04, duration: 0.5, ease: 'power2.out' },
        0
      )
        .fromTo(
          '.timeline-title-text',
          { y: -60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
          0.1
        )
        .fromTo(
          logoWrapperRef.current,
          { y: -70, opacity: 0, scale: 0.6 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'back.out(2)',
            onComplete: () => {
              if (logoWrapperRef.current) {
                floatTween = gsap.to(logoWrapperRef.current, {
                  y: -8,
                  duration: 2.6,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut',
                });
              }
            },
          },
          0.2
        );

      // 2. 📸 4 FOTO MUNCUL 1 PERSATU SECARA BERURUTAN (STAGGERED 1 PER 1)
      TIMELINE_GALLERY_IMAGES.forEach((item, idx) => {
        tl?.fromTo(
          `#${item.id}`,
          {
            scale: 0.2,
            opacity: 0,
            y: idx < 2 ? -80 : 80,
            rotate: item.rotation * 3,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotate: item.rotation,
            duration: 0.75,
            ease: 'back.out(1.8)',
          },
          0.45 + idx * 0.22 // Muncul satu per satu dengan jeda jelas
        );
      });
    }, section);

    // 🎯 IntersectionObserver: HANYA memutar animasi saat user tiba di section ini
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
      floatTween?.kill();
      ctx.revert();
    };
  }, []);

  // 🌟 Interaktivitas Hover Logo
  const handleLogoEnter = () => {
    if (!logoWrapperRef.current) return;
    gsap.to(logoWrapperRef.current, {
      scale: 1.12,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleLogoLeave = () => {
    if (!logoWrapperRef.current) return;
    gsap.to(logoWrapperRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="intro-timeline"
      className="relative z-20 flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-[#F8FAF9] dark:bg-[#07130C] py-12 px-6 md:px-12 select-none cursor-default"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      {/* BACKGROUND GRID LINES PERSIS CENTER TIMELINE */}
      <div
        className="timeline-bg-grid pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 📸 4 GAMBAR TIMELINE HISTORIS (HD, ENLARGED, MURNI GAMBAR TANPA CARD/TEKS) 📸 */}
      {TIMELINE_GALLERY_IMAGES.map((item) => (
        <div
          key={item.id}
          id={item.id}
          style={{ opacity: 0, transform: 'scale(0.2)' }}
          className={`absolute ${item.pos} z-20 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30 hover:rotate-0`}
        >
          {/* Murni Gambar HD dengan Rounded & Shadow Halus */}
          <div className="relative h-24 w-36 sm:h-32 sm:w-48 md:h-44 md:w-68 lg:h-56 lg:w-84 xl:h-64 xl:w-[360px] 2xl:h-68 2xl:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 360px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </div>
      ))}

      {/* Centered Large Title Container: Timeline [Grab Logo] */}
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-3 text-center z-10">
        {/* Teks "Timeline" */}
        <h2
          ref={titleRef}
          className="timeline-title-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[130px] font-extrabold tracking-tight text-[#BAC7BF] dark:text-white/20 leading-none"
        >
          Timeline
        </h2>

        {/* Logo Grab (grab_logo.png) Beranimasi */}
        <div
          ref={logoWrapperRef}
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          className="group relative flex items-center justify-center cursor-pointer"
        >
          {/* Ambient Glow Ring on Hover */}
          <div className="pointer-events-none absolute inset-0 -m-6 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

          {/* Kilauan Cahaya Sweep (Specular Sheen Effect) */}
          <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 -translate-x-full group-hover:translate-x-full transition-all duration-1000 group-hover:opacity-100" />

          <Image
            src="/images/assets_grab/grab_logo.png"
            alt="Grab Logo"
            width={380}
            height={145}
            priority
            className="h-16 sm:h-22 md:h-28 lg:h-34 2xl:h-40 w-auto object-contain drop-shadow-[0_12px_28px_rgba(0,177,79,0.25)] transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

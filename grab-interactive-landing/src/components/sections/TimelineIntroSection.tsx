'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_GALLERY_IMAGES = [
  {
    id: 'timeline-img-1',
    src: '/images/assets_grab/grab_timeline1.jpg',
    alt: 'Grab Timeline 2012',
    pos: 'left-[2%] sm:left-[3%] md:left-[4%] top-[6%] sm:top-[8%] md:top-[10%]',
    rotation: -5,
  },
  {
    id: 'timeline-img-2',
    src: '/images/assets_grab/grab_timeline2.jpg',
    alt: 'Grab Timeline 2016',
    pos: 'right-[2%] sm:right-[3%] md:right-[4%] top-[6%] sm:top-[8%] md:top-[10%]',
    rotation: 5,
  },
  {
    id: 'timeline-img-3',
    src: '/images/assets_grab/grab_timeline3.jjpg.jpg',
    alt: 'Grab Timeline 2018',
    pos: 'left-[2%] sm:left-[3%] md:left-[5%] bottom-[5%] sm:bottom-[7%] md:bottom-[8%]',
    rotation: 4,
  },
  {
    id: 'timeline-img-4',
    src: '/images/assets_grab/grab_timeline4.jpg',
    alt: 'Grab Timeline 2024',
    pos: 'right-[2%] sm:right-[3%] md:right-[5%] bottom-[5%] sm:bottom-[7%] md:bottom-[8%]',
    rotation: -4,
  },
];

export function TimelineIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let floatTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      // 🌟 Timeline Scroll Scrubbing: HANYA aktif saat pengguna mulai scroll mendekati section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // 1. Grid Background & Teks Timeline + Logo Grab Muncul
      tl.fromTo(
        '.timeline-bg-grid',
        { opacity: 0 },
        { opacity: 0.04, duration: 0.15, ease: 'none' },
        0
      )
        .fromTo(
          '.timeline-title-text',
          { y: -70, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          logoWrapperRef.current,
          { y: -80, opacity: 0, scale: 0.6 },
          { y: 0, opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
          0.08
        );

      // 2. 📸 4 FOTO MUNCUL 1 PER 1 SECARA SPESIFIK SEIRING SCROLL 📸
      // Foto 1 (0.20 -> 0.38)
      tl.fromTo(
        '#timeline-img-1',
        { scale: 0.1, opacity: 0, y: -100, rotate: -15 },
        { scale: 1, opacity: 1, y: 0, rotate: -5, duration: 0.18, ease: 'back.out(1.8)' },
        0.2
      );

      // Foto 2 (0.40 -> 0.58)
      tl.fromTo(
        '#timeline-img-2',
        { scale: 0.1, opacity: 0, y: -100, rotate: 15 },
        { scale: 1, opacity: 1, y: 0, rotate: 5, duration: 0.18, ease: 'back.out(1.8)' },
        0.4
      );

      // Foto 3 (0.60 -> 0.78)
      tl.fromTo(
        '#timeline-img-3',
        { scale: 0.1, opacity: 0, y: 100, rotate: 15 },
        { scale: 1, opacity: 1, y: 0, rotate: 4, duration: 0.18, ease: 'back.out(1.8)' },
        0.6
      );

      // Foto 4 (0.80 -> 0.98)
      tl.fromTo(
        '#timeline-img-4',
        { scale: 0.1, opacity: 0, y: 100, rotate: -15 },
        { scale: 1, opacity: 1, y: 0, rotate: -4, duration: 0.18, ease: 'back.out(1.8)' },
        0.8
      );

      // Continuous floating lembut untuk logo
      if (logoWrapperRef.current) {
        floatTween = gsap.to(logoWrapperRef.current, {
          y: -8,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, container);

    return () => {
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
    <div
      ref={containerRef}
      id="intro-timeline"
      className="relative z-30 w-full h-[250vh] -mt-10 md:-mt-16"
    >
      {/* Sticky Fullscreen Canvas */}
      <section
        ref={stickyRef}
        className="sticky top-0 flex h-screen min-h-screen w-full items-center justify-center overflow-hidden rounded-t-[36px] md:rounded-t-[48px] bg-[#F8FAF9] dark:bg-[#07130C] py-20 px-6 md:px-12 shadow-[0_-16px_50px_rgba(0,0,0,0.08)] select-none cursor-default"
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
            className={`absolute ${item.pos} z-20 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30 hover:rotate-0`}
          >
            {/* Murni Gambar HD dengan Rounded & Shadow Halus */}
            <div className="relative h-28 w-40 sm:h-36 sm:w-52 md:h-48 md:w-72 lg:h-60 lg:w-88 xl:h-68 xl:w-[380px] 2xl:h-72 2xl:w-[420px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1200px) 380px, 450px"
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
    </div>
  );
}

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function TimelineIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 🌟 1. Melacak scroll fisik mentah
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 🌟 2. useSpring Physics: Menghaluskan putaran roda scroll mouse menjadi aliran 60 FPS yang sangat lembut (Silky Buttery Smooth)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // 1. Grid Background & Header (Aktif, lalu Pudar + Blur Lembut di Akhir Scroll 0.90 -> 1.00)
  const gridOpacity = useTransform(smoothProgress, [0, 0.06, 0.88, 1.0], [0.01, 0.04, 0.04, 0], { clamp: true });
  const titleOpacity = useTransform(smoothProgress, [0, 0.06, 0.88, 1.0], [0.6, 1, 1, 0], { clamp: true });
  const titleScale = useTransform(smoothProgress, [0, 0.06, 0.88, 1.0], [0.96, 1, 1, 0.92], { clamp: true });

  // 🌫️ EFEK BLUR HALUS SAAT AKHIR SCROLL (0.86 -> 1.00)
  const exitBlur = useTransform(
    smoothProgress,
    [0, 0.86, 1.0],
    ['blur(0px)', 'blur(0px)', 'blur(16px)'],
    { clamp: true }
  );

  // 📸 2. FOTO 1 (Kiri Atas): Masuk 0.02->0.16, Tampil Utuh 0.16->0.88, lalu PUDAR & BLUR 0.88->1.00
  const photo1Opacity = useTransform(smoothProgress, [0, 0.02, 0.16, 0.88, 1.0], [0, 0, 1, 1, 0], { clamp: true });
  const photo1Scale = useTransform(smoothProgress, [0, 0.02, 0.16, 0.88, 1.0], [0.25, 0.25, 1, 1, 0.88], { clamp: true });
  const photo1X = useTransform(smoothProgress, [0, 0.02, 0.16, 1.0], [-90, -90, 0, 0], { clamp: true });
  const photo1Y = useTransform(smoothProgress, [0, 0.02, 0.16, 1.0], [-90, -90, 0, 0], { clamp: true });
  const photo1Rotate = useTransform(smoothProgress, [0, 0.02, 0.16, 1.0], [-16, -16, -5, -5], { clamp: true });

  // 📸 3. FOTO 2 (Kanan Atas): Masuk 0.18->0.32, Tampil Utuh 0.32->0.88, lalu PUDAR & BLUR 0.88->1.00
  const photo2Opacity = useTransform(smoothProgress, [0, 0.18, 0.32, 0.88, 1.0], [0, 0, 1, 1, 0], { clamp: true });
  const photo2Scale = useTransform(smoothProgress, [0, 0.18, 0.32, 0.88, 1.0], [0.25, 0.25, 1, 1, 0.88], { clamp: true });
  const photo2X = useTransform(smoothProgress, [0, 0.18, 0.32, 1.0], [90, 90, 0, 0], { clamp: true });
  const photo2Y = useTransform(smoothProgress, [0, 0.18, 0.32, 1.0], [-90, -90, 0, 0], { clamp: true });
  const photo2Rotate = useTransform(smoothProgress, [0, 0.18, 0.32, 1.0], [16, 16, 5, 5], { clamp: true });

  // 📸 4. FOTO 3 (Kiri Bawah): Masuk 0.34->0.48, Tampil Utuh 0.48->0.88, lalu PUDAR & BLUR 0.88->1.00
  const photo3Opacity = useTransform(smoothProgress, [0, 0.34, 0.48, 0.88, 1.0], [0, 0, 1, 1, 0], { clamp: true });
  const photo3Scale = useTransform(smoothProgress, [0, 0.34, 0.48, 0.88, 1.0], [0.25, 0.25, 1, 1, 0.88], { clamp: true });
  const photo3X = useTransform(smoothProgress, [0, 0.34, 0.48, 1.0], [-90, -90, 0, 0], { clamp: true });
  const photo3Y = useTransform(smoothProgress, [0, 0.34, 0.48, 1.0], [90, 90, 0, 0], { clamp: true });
  const photo3Rotate = useTransform(smoothProgress, [0, 0.34, 0.48, 1.0], [16, 16, 4, 4], { clamp: true });

  // 📸 5. FOTO 4 (Kanan Bawah): Masuk 0.50->0.64, Tampil Utuh 0.64->0.88, lalu PUDAR & BLUR 0.88->1.00
  const photo4Opacity = useTransform(smoothProgress, [0, 0.50, 0.64, 0.88, 1.0], [0, 0, 1, 1, 0], { clamp: true });
  const photo4Scale = useTransform(smoothProgress, [0, 0.50, 0.64, 0.88, 1.0], [0.25, 0.25, 1, 1, 0.88], { clamp: true });
  const photo4X = useTransform(smoothProgress, [0, 0.50, 0.64, 1.0], [90, 90, 0, 0], { clamp: true });
  const photo4Y = useTransform(smoothProgress, [0, 0.50, 0.64, 1.0], [90, 90, 0, 0], { clamp: true });
  const photo4Rotate = useTransform(smoothProgress, [0, 0.50, 0.64, 1.0], [-16, -16, -4, -4], { clamp: true });

  return (
    <div
      ref={containerRef}
      id="intro-timeline"
      className="relative z-10 w-full h-[380vh]"
    >
      {/* 🌟 STICKY CANVAS 100VH 1 BIDANG UTUH 🌟 */}
      <section className="sticky top-0 flex h-screen min-h-screen w-full items-center justify-center overflow-hidden bg-[#F8FAF9] dark:bg-[#07130C] py-12 px-6 md:px-12 select-none cursor-default">
        {/* Dynamic Ambient Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        {/* BACKGROUND GRID LINES PERSIS CENTER TIMELINE */}
        <motion.div
          style={{ opacity: gridOpacity, filter: exitBlur }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>

        {/* 📸 1. FOTO 2012 (Kiri Atas) 📸 */}
        <motion.div
          id="timeline-img-1"
          style={{
            opacity: photo1Opacity,
            scale: photo1Scale,
            x: photo1X,
            y: photo1Y,
            rotate: photo1Rotate,
            filter: exitBlur,
          }}
          className="absolute left-[2%] sm:left-[3%] md:left-[5%] top-[8%] sm:top-[10%] md:top-[12%] z-10 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20 hover:rotate-0"
        >
          <div className="relative h-24 w-36 sm:h-32 sm:w-48 md:h-44 md:w-68 lg:h-56 lg:w-84 xl:h-64 xl:w-[360px] 2xl:h-68 2xl:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
            <Image
              src="/images/assets_grab/grab_timeline1.jpg"
              alt="Grab Timeline 2012"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 360px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </motion.div>

        {/* 📸 2. FOTO 2016 (Kanan Atas) 📸 */}
        <motion.div
          id="timeline-img-2"
          style={{
            opacity: photo2Opacity,
            scale: photo2Scale,
            x: photo2X,
            y: photo2Y,
            rotate: photo2Rotate,
            filter: exitBlur,
          }}
          className="absolute right-[2%] sm:right-[3%] md:right-[5%] top-[8%] sm:top-[10%] md:top-[12%] z-10 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20 hover:rotate-0"
        >
          <div className="relative h-24 w-36 sm:h-32 sm:w-48 md:h-44 md:w-68 lg:h-56 lg:w-84 xl:h-64 xl:w-[360px] 2xl:h-68 2xl:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
            <Image
              src="/images/assets_grab/grab_timeline2.jpg"
              alt="Grab Timeline 2016"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 360px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </motion.div>

        {/* 📸 3. FOTO 2018 (Kiri Bawah) 📸 */}
        <motion.div
          id="timeline-img-3"
          style={{
            opacity: photo3Opacity,
            scale: photo3Scale,
            x: photo3X,
            y: photo3Y,
            rotate: photo3Rotate,
            filter: exitBlur,
          }}
          className="absolute left-[2%] sm:left-[3%] md:left-[5%] bottom-[8%] sm:bottom-[10%] md:bottom-[12%] z-10 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20 hover:rotate-0"
        >
          <div className="relative h-24 w-36 sm:h-32 sm:w-48 md:h-44 md:w-68 lg:h-56 lg:w-84 xl:h-64 xl:w-[360px] 2xl:h-68 2xl:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
            <Image
              src="/images/assets_grab/grab_timeline3.jjpg.jpg"
              alt="Grab Timeline 2018"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 360px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </motion.div>

        {/* 📸 4. FOTO 2024 (Kanan Bawah) 📸 */}
        <motion.div
          id="timeline-img-4"
          style={{
            opacity: photo4Opacity,
            scale: photo4Scale,
            x: photo4X,
            y: photo4Y,
            rotate: photo4Rotate,
            filter: exitBlur,
          }}
          className="absolute right-[2%] sm:right-[3%] md:right-[5%] bottom-[8%] sm:bottom-[10%] md:bottom-[12%] z-10 will-change-transform group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20 hover:rotate-0"
        >
          <div className="relative h-24 w-36 sm:h-32 sm:w-48 md:h-44 md:w-68 lg:h-56 lg:w-84 xl:h-64 xl:w-[360px] 2xl:h-68 2xl:w-[400px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:shadow-[0_24px_55px_rgba(0,177,79,0.3)]">
            <Image
              src="/images/assets_grab/grab_timeline4.jpg"
              alt="Grab Timeline 2024"
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1200px) 360px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
          </div>
        </motion.div>

        {/* Centered Large Title Container: Timeline [Grab Logo] */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale, filter: exitBlur }}
          className="relative mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-3 text-center z-10"
        >
          {/* Teks "Timeline" */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[130px] font-extrabold tracking-tight text-[#BAC7BF] dark:text-white/20 leading-none">
            Timeline
          </h2>

          {/* Logo Grab (grab_logo.png) Beranimasi Floating */}
          <div className="group relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
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
        </motion.div>
      </section>
    </div>
  );
}


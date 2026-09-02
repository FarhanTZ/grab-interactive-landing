# Architecture & Tech Stack Document - Interactive Grab Landing Page

## 1. System High-Level Architecture
Sistem landing page ini menggunakan arsitektur modular Next.js App Router yang memadukan Virtual Smooth Scroll, Motion Path SVG Engine, dan Gesture UI.

```
+-------------------------------------------------------------------------+
|                        Next.js 14+ (App Router)                         |
+-------------------------------------------------------------------------+
|                         Global Engine Providers                         |
|   [ SmoothScrollProvider (Lenis) ] <---> [ GSAP Master Ticker Sync ]    |
+-------------------------------------------------------------------------+
|                              Page Shell                                 |
|   [ Adaptive Glass Navbar ]               [ Accessibility Controller ]  |
+-------------------------------------------------------------------------+
|                           Core Section Layer                            |
|  1. HeroMotorPathJourney  --> GSAP ScrollTrigger + MotionPathPlugin     |
|                               (SVG Track + Motor Auto-Rotation + Scrub) |
|  2. AboutSection          --> Brand overview, metrics & ecosystem stats|
|  3. JourneyStorySection   --> Interactive user journey story           |
|  4. ValuesEcosystemSection--> Core pillars, sustainability, & impact    |
|  5. CenterTimelineSection --> Evolution & milestone timeline            |
+-------------------------------------------------------------------------+
|                             Utility Services                            |
|   [ GSAP Cleanups ]    [ Sound FX (Optional) ]    [ State Management ]  |
+-------------------------------------------------------------------------+
```

## 2. Technology Stack & Role Matrix

| Layer | Teknologi | Peran & Tanggung Jawab |
| :--- | :--- | :--- |
| **Framework** | Next.js (React) | App Router, SSR/SSG, Metadata SEO, modul komponen terisolasi. |
| **Styling** | Tailwind CSS | Utility styling, design tokens (`#00B14F`), dynamic responsive layouts. |
| **Virtual Scroll** | Lenis Scroll | Mengatur inersia scroll halus di desktop & mobile, menormalkan wheel event. |
| **Scroll & Motion Path**| GSAP + ScrollTrigger + MotionPathPlugin | Mengontrol motor melintasi garis lintasan SVG, auto-rotate, path filling, dan pinning step. |
| **UI Micro-Animations** | Framer Motion | Shared-element transitions, tabs, cards, dan reveal layout. |
| **Icons** | Lucide React | Ikon sistem yang bersih, konsisten, dan ringan. |

## 3. Directory & File Structure
```
grab-interactive-landing/
├── app/
│   ├── layout.tsx                     # Global layout, fonts, SEO tags
│   ├── page.tsx                       # Master composition page (Client Component)
│   └── globals.css                    # Tailwind imports, base styles, CSS variables
├── components/
│   ├── common/
│   │   ├── Button.tsx                 # Button interaktif dengan efek glow Grab
│   │   ├── Badge.tsx                  # Chip label layanan
│   │   └── Container.tsx              # Container pembatas lebar layar
│   ├── layout/
│   │   ├── LoadingScreen.tsx          # Preloader screen animasi awal
│   │   ├── Navbar.tsx                 # Floating glassmorphism navigation
│   │   ├── Footer.tsx                 # Sticky reveal footer & app download
│   │   └── AccessibilityController.tsx# Kontrol aksesibilitas
│   ├── providers/
│   │   ├── RootProvider.tsx           # Global app context & theme providers
│   │   └── SmoothScrollProvider.tsx   # Ticker connector antara Lenis & GSAP
│   ├── sections/
│   │   ├── HeroMotorPathJourney.tsx   # [UTAMA] Motor melintasi lintasan SVG via scroll
│   │   ├── AboutSection.tsx           # Ringkasan profil, misi, dan data Grab
│   │   ├── JourneyStorySection.tsx    # Alur cerita perjalanan interaktif harian
│   │   ├── ValuesEcosystemSection.tsx # Pilar nilai, sustainability, & footer CTA
│   │   └── CenterTimelineSection.tsx  # Timeline pencapaian dan evolusi inovasi
│   └── svg/
│       ├── GrabMotorcycle.tsx         # Vektor motor, helm hijau, & driver
│       ├── RoadTracks.tsx             # Vektor lintasan jalan SVG presisi
│       └── WebGLShaderBackground.tsx  # Shader background visual
├── hooks/
│   ├── useAnimationHooks.ts           # Custom hooks utilitas animasi
│   └── useReducedMotion.ts            # Aksesibilitas preferensi motion
├── lib/
│   ├── constants.ts                   # Data statis copy text & konfigurasi layanan
│   ├── store.ts                       # State management Zustand
│   └── utils.ts                       # Classnames merger helper
└── types/
    ├── landing.ts                     # Definisi tipe data layanan & step
    └── store.ts                       # Interface state management
```

## 4. Ticker & Motion Pipeline Architecture
1. **Lenis Synchronization:** Lenis menghasilkan nilai posisi scroll virtual `lenis.raf(time * 1000)`.
2. **GSAP Linkage:** `gsap.ticker.add` menjalankan fungsi update Lenis pada tiap frame browser.
3. **MotionPath Execution:** `ScrollTrigger` memetakan progress scroll (`0.0` sampai `1.0`) langsung ke persentase koordinat kurva SVG Bezier (`motionPath.path`) dan `strokeDashoffset` garis jalan.

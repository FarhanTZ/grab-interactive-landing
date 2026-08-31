# Design System & UI/UX Guidelines - Grab Interactive Redesign

## 1. Brand Color Palette (Grab Green Standard)
Palet didesain dengan kontras tinggi bernuansa *Dark Luxury Tech* yang menonjolkan warna hijau ikonik Grab:

### Primary Brand Colors
- **Grab Green (Primary Accent):** `#00B14F` — Warna motor, helm, garis lintasan jalan, tombol CTA, dan active states.
- **Grab Green Dark:** `#008A3E` — Aksen bayangan, garis batas fokus, hover state tombol primer.
- **Grab Green Light Tint:** `#E8F8F0` — Background badge cerah, highlight halus.

### Dark Surface & Backgrounds
- **Pure Dark Base:** `#0A0D0B` — Warna latar belakang utama seluruh landing page.
- **Elevated Card Surface:** `#141A16` — Permukaan kartu Bento Grid dan panel kontrol.
- **Border Stroke:** `rgba(255, 255, 255, 0.08)` — Garis pembatas halus glassmorphism.
- **Road Asphalt Dark:** `#262626` — Warna lintasan jalan sebelum dilewati motor.

### Service Accent Accents
- **GrabFood:** `#FF8800` (Warm Tangerine)
- **GrabMart:** `#00A3FF` (Sky Blue Fresh)
- **GrabExpress:** `#8948FC` (Express Purple)
- **GrabPay:** `#00B14F` (Emerald Green)

## 2. Typography Hierarchy
- **Font Utama:** *Plus Jakarta Sans* / *Inter*
- **Hero Heading:** `44px` - `68px`, ExtraBold (`font-extrabold`), letter-spacing `-0.03em`.
- **Section Heading:** `32px` - `40px`, Bold (`font-bold`), letter-spacing `-0.02em`.
- **Card Title / Step Title:** `18px` - `22px`, SemiBold (`font-semibold`).
- **Body Text:** `15px` - `16px`, Regular, line-height `1.6`, text color `#A1A1AA`.
- **Step Badge & Monospace:** `12px` - `13px`, Bold (`font-mono`), uppercase, tracking `0.08em`.

## 3. Motion System & Physics

### A. Scroll-Driven Motor Path (Hero)
- **Engine:** GSAP `MotionPathPlugin` + `ScrollTrigger`.
- **Scrubbing Weight:** `scrub: 1.2` untuk sensasi momentum inersia yang empuk.
- **Auto-Rotation:** Sudut motor otomatis mengikuti kelengkungan kurva Bezier (`autoRotate: 90`).
- **Path Glow:** Garis hijau yang dilalui memiliki efek *drop-shadow glow* beradius `20px` warna `#00B14F40`.

### B. UI Micro-Transitions (Framer Motion)
- **Spring Tab Pill:** `stiffness: 400`, `damping: 30`.
- **Bento 3D Tilt:** Rotasi maksimal `8deg` pada sumbu X & Y dengan glare highlight radial kursor.
- **Split-Card Expansion:** Durasi `0.4s` dengan easing cubic-bezier `[0.25, 1, 0.5, 1]`.

## 4. Section Blueprint Breakdown

```
+------------------------------------------------------------------------+
| SECTION 1: HERO MOTOR PATH JOURNEY (Pinned Viewport ~3500px scroll)   |
| - Kiri: Narasi 3 Langkah (Pesan -> On The Way -> Sampai)               |
| - Kanan: Lintasan SVG Melengkung + Motor Grab Bergerak + Garis Hijau   |
+------------------------------------------------------------------------+
| SECTION 2: DYNAMIC SERVICE SWITCHER (Ride, Food, Mart, Express)        |
| - Pill tab filter di atas                                              |
| - Mockup UI HP bertransisi mulus dengan ambient background glow       |
+------------------------------------------------------------------------+
| SECTION 3: BENTO GRID EXPLORE (GrabFood & GrabMart)                    |
| - Kartu promo interaktif, top resto filter, live delivery badge        |
+------------------------------------------------------------------------+
| SECTION 4: PARTNER SPLIT-CARD & DRIVER REVENUE CALCULATOR              |
| - Split hover (Mitra Pengemudi vs Mitra Merchant)                      |
| - Slider jam kerja vs estimasi penghasilan                             |
+------------------------------------------------------------------------+
| SECTION 5: FOOTER & APP DOWNLOAD                                       |
| - QR Code scan to download + badge App Store & Play Store              |
+------------------------------------------------------------------------+
```

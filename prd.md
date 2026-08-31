# Product Requirements Document (PRD) - Redesign Interactive Landing Page Grab

## 1. Problem Statement
Landing page Grab saat ini cenderung statis dan berfokus pada informasi satu arah berbasis teks dengan aset visual 2D konvensional:
- **Kurangnya Keterlibatan Langsung:** Pengunjung tidak merasakan simulasi interaktif dari kecepatan dan keandalan armada Grab secara visual saat pertama kali mendarat di halaman.
- **Penyampaian Alur Layanan yang Kering:** Menjelaskan proses order-to-destination (Ride, Food, Mart) hanya lewat bullet points atau kartu statis terasa monoton dan gagal menunjukkan keunggulan ekosistem real-time Grab.
- **Visual Brand yang Kurang Berdampak:** Citra Grab sebagai pelopor mobilitas cerdas di Asia Tenggara belum tercermin optimal dalam pengalaman penjelajahan web.

## 2. Goals & Success Metrics
### Goals
- Mengubah landing page Grab menjadi pengalaman web *story-driven & scroll-interactive* kelas dunia.
- Menjadikan **Hero Motor Scroll Journey** sebagai visual *hook* utama yang mensimulasikan perjalanan armada motor Grab menyusuri lintasan SVG secara dinamis mengikuti scroll user.
- Mengedukasi pengunjung tentang ekosistem Superapp melalui interaktivitas fungsional (Hero Journey, Dynamic Switcher, Bento Grid, dan Partner Calculator).
- Menjaga skor performa Web Vitals tetap optimal (Lighthouse score ≥ 85) dengan frame rate stabil di 60 FPS.

### Success Metrics (KPIs)
- **Time on Page:** Meningkat minimal 50% pada 30 hari pertama pasca-peluncuran.
- **Scroll Engagement:** >70% pengguna menyelesaikan scrolling simulasi lintasan motor hingga masuk ke section ekosistem.
- **CTA Conversion Rate (App Download & Driver/Merchant Registration):** Meningkat 25-30%.
- **Lighthouse Performance Score:** Desktop ≥ 90, Mobile ≥ 85 (FCP < 1.5s, LCP < 2.5s, CLS < 0.05).

## 3. Target User & Personas
1. **Calon Konsumen / Komuter Urban (B2C):**
   - Kebutuhan: Melihat kecepatan penjemputan, transparansi rute, keamanan perjalanan, serta ragam kuliner & belanja instan.
2. **Calon Mitra Pengemudi & Pengantar (B2B - Gig Economy):**
   - Kebutuhan: Simulasi potensi penghasilan harian/mingguan yang transparan dan alur pendaftaran cepat.
3. **Calon Mitra Resto & Ritel (B2B - Merchant):**
   - Kebutuhan: Pertumbuhan pesanan online, jangkauan pelanggan luas, serta integrasi platform yang mulus.

## 4. User Stories
- **Sebagai pengunjung,** saya ingin melihat visual sepeda motor Grab melaju melintasi jalur dinamis saat saya melakukan scroll agar saya langsung memahami keandalan navigasi dan kecepatan penjemputan.
- **Sebagai calon pelanggan,** saya ingin dapat mengganti tampilan layanan (Ride, Food, Mart) secara instan tanpa reload halaman untuk melihat fitur unggulan masing-masing produk.
- **Sebagai pengguna kuliner,** saya ingin mengeksplorasi kategori makanan populer lewat kartu interaktif Bento Grid dengan animasi hover 3D.
- **Sebagai calon mitra driver,** saya ingin menggeser slider jam kerja untuk mengkalkulasi estimasi pendapatan secara langsung.

## 5. Functional Requirements
- **Hero Scroll-Driven Motorcycle Journey (GSAP MotionPath + ScrollTrigger):**
  - Lintasan SVG kustom dengan motor Grab 2D/top-down yang otomatis menempel, berotasi (`autoRotate: true`), dan melaju seiring scroll user.
  - Jalur jalan di belakang motor terisi warna hijau Grab (`#00B14F`) menggunakan teknik `stroke-dashoffset`.
  - Pinning layar dengan pergantian narasi checkpoint bertahap (Titik Jemput -> Jalur Optimal -> Sampai Tujuan).
- **Dynamic Service Switcher:** Tab seleksi interaktif (GrabRide, GrabFood, GrabMart, GrabExpress) dengan animasi shared element layout (`layoutId`) dan transisi warna ambient glow.
- **Interactive Bento Grid:** Grid kuliner & groceries responsif dengan efek 3D cursor tilt, filter kategori dinamis, dan visual preview menu.
- **Expanding Partner Split-Card:** Komponen split 50-50 (Driver vs Merchant) dengan ekspansi hover dan kalkulator pendapatan interaktif.
- **Reduced Motion & Accessibility Switch:** Tombol toggle global untuk mematikan animasi scroll jika diinginkan oleh user.

## 6. Non-Functional Requirements
- **Smoothness & FPS:** Animasi timeline scrubbing dan virtual scroll berjalan stabil di 60 FPS tanpa dropped frames.
- **A11y (Accessibility):** Mendukung penuh standar WCAG AA, navigasi keyboard (Tab, Enter), dan atribut ARIA yang lengkap.
- **Browser Compatibility:** Berjalan konsisten pada Google Chrome, Apple Safari (iOS/macOS), Mozilla Firefox, dan Microsoft Edge.
- **Brand Consistency:** Penggunaan warna resmi Grab Green (`#00B14F`) dan turunan palet gelap premium.

## 7. Scope
### In-Scope
- Landing page satu halaman (One-page architecture) mencakup Hero Motor Journey, Service Switcher, Bento Grid, Partner Calculator, Safety Widgets, dan Footer CTA.
- Integrasi Lenis Scroll, GSAP MotionPathPlugin, ScrollTrigger, dan Framer Motion.
- Aset visual vektor SVG kustom untuk motor, helm Grab, lintasan, dan icon.

### Out-of-Scope
- Transaksi riil payment gateway OVO/GrabPay (hanya antarmuka simulasi).
- Pelacakan GPS live dari perangkat driver aktual.
- Otentikasi dan sistem registrasi native di dalam web (CTA langsung mengarah ke download app / portal registrasi resmi).

# Development Rules, Performance & Coding Standards

## 1. GSAP MotionPath & Animation Rules
1. **GPU Acceleration Only:** Semua animasi motor, lintasan, dan UI wajib digerakkan oleh properti GPU: `transform`, `strokeDashoffset`, dan `opacity`.
2. **Path Auto-Rotation Hygiene:** Nilai `autoRotate` pada motor harus diuji pada kelokan tajam. Gunakan nilai offset yang tepat (`autoRotate: 90` atau `autoRotate: true`) agar roda depan selalu menghadap searah lintasan.
3. **ScrollTrigger Cleanup Standard:**
   ```typescript
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Seluruh timeline, scrollTrigger, dan motionPath didaftarkan di sini
     }, containerRef);

     return () => ctx.revert(); // Membersihkan memory total saat unmount
   }, []);
   ```

## 2. Smooth Scroll & Frame Rate (60 FPS) Rules
1. **No Scroll-Jitter:** Jangan menambahkan native CSS `scroll-behavior: smooth` di file CSS global jika Lenis aktif, karena akan menimbulkan konflik kalkulasi koordinat scroll.
2. **Debounced Resizing:** Event resize layar harus memicu `ScrollTrigger.refresh()` secara efisien tanpa lag visual.
3. **Aset SVG Ringan:** Lintasan SVG dan model motor Grab harus berupa vektor bersih tanpa layer/node path yang tidak diperlukan.

## 3. Accessibility & Usability Rules
1. **Fallback for Reduced Motion:** Jika `prefers-reduced-motion: reduce` aktif:
   - Nonaktifkan pinning `ScrollTrigger`.
   - Lintasan langsung terisi penuh dan motor berada di titik akhir.
   - Tampilkan seluruh step narasi dalam bentuk kartu berdampingan biasa.
2. **Contrast Standard:** Semua teks keterangan di atas warna background `#0A0D0B` wajib memiliki tingkat keterbacaan kontras tinggi (minimal rasio 4.5:1 untuk teks normal).

## 4. TypeScript & Code Standards
1. **Strict Types:** Dilarang keras menggunakan tipe `any`. Semua parameter posisi koordinat, event handler, dan state calculator wajib bertipe eksplisit.
2. **Atomic Component Architecture:** Pisahkan komponen SVG motor (`components/svg/GrabMotorcycle.tsx`) dari komponen container logika (`HeroMotorPathJourney.tsx`) agar mudah di-maintenance.

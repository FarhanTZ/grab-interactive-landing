'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Utensils,
  ShoppingBag,
  Package,
  ClipboardList,
  Car,
  Wallet,
  ShieldCheck,
  Smartphone,
  Receipt,
  Building,
  Gift,
  Trophy,
  Percent,
  Stethoscope,
  Sparkles,
  RotateCcw,
  X,
  CheckCircle2,
  Bike,
  Truck,
  Store,
  Send,
  Landmark,
  Megaphone,
  Map,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceItem {
  id: string;
  name: string;
  category: 'konsumen' | 'pengemudi' | 'merchant' | 'perusahaan';
  categoryLabel: string;
  brandBadge: string;
  desc: string;
  highlights: string[];
  icon: typeof Utensils;
  initialY: number;
  rotation: number;
}

const GRAB_SERVICES: ServiceItem[] = [
  // 🛍️ KONSUMEN - PENGANTARAN & MOBILITAS
  {
    id: 'makanan',
    name: 'Makanan',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Makanan',
    brandBadge: 'GrabFood',
    desc: 'Dapatkan semua makanan favorit dari puluhan ribu resto terdekat diantarkan hangat ke depan pintu Anda.',
    highlights: ['Pilihan resto terlengkap', 'Estimasi tiba akurat & diskon harian', 'Fitur pesan bersama (Group Order)'],
    icon: Utensils,
    initialY: -420,
    rotation: -10,
  },
  {
    id: 'mart',
    name: 'Mart',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Kebutuhan Pokok',
    brandBadge: 'GrabMart',
    desc: 'Temukan semua kebutuhan pokok Anda, sayur segar, dan banyak lagi kebutuhan harian instan.',
    highlights: ['Tiba kilat dalam 30 menit', 'Supermarket & minimarket rekanan resmi', 'Jaminan kesegaran produk 100%'],
    icon: ShoppingBag,
    initialY: -520,
    rotation: 14,
  },
  {
    id: 'pengiriman',
    name: 'Pengiriman',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Kurir Kilat',
    brandBadge: 'GrabExpress',
    desc: 'Kirim paket, dokumen, dan lain-lainnya aman terlindungi dengan asuransi otomatis.',
    highlights: ['Live GPS tracking pengantaran', 'Pilihan Instant & Sameday hemat', 'Asuransi proteksi paket gratis'],
    icon: Package,
    initialY: -460,
    rotation: -14,
  },
  {
    id: 'jastip',
    name: 'Jastip',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Belanja Fleksibel',
    brandBadge: 'GrabJastip',
    desc: 'Dapatkan semua kebutuhan belanja Anda secara fleksibel di mana saja.',
    highlights: ['Belanja fleksibel di toko lokal manapun', 'Driver berbelanja langsung sesuai catatan', 'Nota belanja transparan & terverifikasi'],
    icon: ClipboardList,
    initialY: -580,
    rotation: 18,
  },
  {
    id: 'transportasi',
    name: 'Transportasi',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Mobilitas',
    brandBadge: 'GrabRide & Car',
    desc: 'Pilih beragam kendaraan untuk membawa Anda dari lokasi satu ke lainnya dengan aman.',
    highlights: ['GrabBike kilat anti-macet', 'GrabCar nyaman untuk keluarga', 'Armada mobil & motor listrik ramah lingkungan'],
    icon: Car,
    initialY: -400,
    rotation: -8,
  },
  {
    id: 'pembayaran',
    name: 'Pembayaran',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Keuangan',
    brandBadge: 'GrabPay & OVO',
    desc: 'Pembayaran non-tunai yang aman dan mudah di mana saja.',
    highlights: ['Pembayaran QRIS di jutaan merchant', 'Transaksi instan cepat tanpa repot', 'Keamanan verifikasi biometrik terenkripsi'],
    icon: Wallet,
    initialY: -490,
    rotation: 12,
  },
  {
    id: 'asuransi',
    name: 'Asuransi',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Keuangan',
    brandBadge: 'GrabInsure',
    desc: 'Dapatkan perlindungan setiap hari dengan asuransi yang terjangkau.',
    highlights: ['Premi mulai dari ribuan rupiah', 'Klaim online instan cepat', 'Perlindungan perjalanan & kecelakaan'],
    icon: ShieldCheck,
    initialY: -560,
    rotation: -12,
  },
  {
    id: 'pulsa',
    name: 'Pulsa / Token',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Keuangan',
    brandBadge: 'GrabPulsa',
    desc: 'Selalu terhubung dengan isi ulang pulsa dan token listrik dengan cepat.',
    highlights: ['Semua operator telekomunikasi', 'Token listrik PLN prabayar instan', 'Promo cashback setiap transaksi'],
    icon: Smartphone,
    initialY: -440,
    rotation: 16,
  },
  {
    id: 'tagihan',
    name: 'Pembayaran Tagihan',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Keuangan',
    brandBadge: 'GrabBills',
    desc: 'Bayar semua tagihan tanpa repot dalam satu aplikasi.',
    highlights: ['Tagihan PDAM, Listrik, BPJS, & Internet', 'Fitur pengingat jatuh tempo otomatis', 'Bukti bayar digital resmi'],
    icon: Receipt,
    initialY: -620,
    rotation: -15,
  },
  {
    id: 'hotel',
    name: 'Hotel',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Gaya Hidup',
    brandBadge: 'GrabHotels',
    desc: 'Temukan dan pesan hotel dengan mudah di seluruh destinasi impian.',
    highlights: ['Ribuan pilihan hotel terverifikasi', 'Harga terbaik & diskon eksklusif mitra', 'Konfirmasi instan tanpa biaya tersembunyi'],
    icon: Building,
    initialY: -470,
    rotation: 10,
  },
  {
    id: 'hadiah',
    name: 'Kartu Hadiah',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Gaya Hidup',
    brandBadge: 'GrabGifts',
    desc: 'Kirim kartu hadiah untuk seseorang dengan praktis.',
    highlights: ['Bisa digunakan untuk makanan & transportasi', 'Pilihan desain ucapan personal menarik', 'Kirim instan via WhatsApp atau Email'],
    icon: Gift,
    initialY: -540,
    rotation: -18,
  },
  {
    id: 'reward',
    name: 'Reward',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Loyalty Program',
    brandBadge: 'GrabRewards',
    desc: 'Kumpulkan poin dari tiap transaksi dan rasakan manfaatnya.',
    highlights: ['Poin otomatis bertambah tiap perjalanan/order', 'Tukar kupon belanja, makanan & partner', 'Tingkatan status member Gold & Platinum'],
    icon: Trophy,
    initialY: -430,
    rotation: 14,
  },
  {
    id: 'diskon',
    name: 'Paket Diskon',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Langganan Hemat',
    brandBadge: 'GrabUnlimited',
    desc: 'Makin hemat untuk layanan Grab favorit Anda setiap hari.',
    highlights: ['Voucher gratis ongkir berlimpah', 'Diskon GrabCar & GrabBike setiap waktu', 'Langganan bulanan super hemat'],
    icon: Percent,
    initialY: -610,
    rotation: -10,
  },
  {
    id: 'kesehatan',
    name: 'Kesehatan',
    category: 'konsumen',
    categoryLabel: 'Konsumen • Kesehatan',
    brandBadge: 'GrabHealth',
    desc: 'Konsultasi langsung dengan dokter resmi dan tebus obat instan.',
    highlights: ['Chat dokter spesialis 24/7 terpercaya', 'Tebus resep obat diantar kilat ke rumah', 'Kerjasama resmi bersama Good Doctor'],
    icon: Stethoscope,
    initialY: -500,
    rotation: 12,
  },

  // 🛵 MITRA PENGEMUDI (TINGKATKAN PENGHASILAN)
  {
    id: 'driver-partner',
    name: 'Mitra Pengemudi',
    category: 'pengemudi',
    categoryLabel: 'Mitra Pengemudi',
    brandBadge: 'GrabDriver',
    desc: 'Jadilah bos atas waktu kerja Anda sendiri dengan bergabung menjadi mitra transportasi Grab.',
    highlights: ['Waktu kerja fleksibel bebas atur', 'Bonus performa harian & asuransi gratis', 'Dukungan komunitas & fasilitas berkendara'],
    icon: Bike,
    initialY: -480,
    rotation: -12,
  },
  {
    id: 'delivery-partner',
    name: 'Mitra Pengiriman',
    category: 'pengemudi',
    categoryLabel: 'Mitra Pengemudi',
    brandBadge: 'GrabExpress Kurir',
    desc: 'Lakukan pengiriman barang & pesanan makanan untuk mendapatkan penghasilan tambahan.',
    highlights: ['Orderan kurir & makanan terus mengalir', 'Pencairan dana dompet tunai instan', 'Navigasi rute cerdas GrabMaps terintegrasi'],
    icon: Truck,
    initialY: -550,
    rotation: 15,
  },

  // 🏬 MITRA PENJUAL (KEMBANGKAN BISNIS ANDA)
  {
    id: 'merchant-partner',
    name: 'Mitra Merchant',
    category: 'merchant',
    categoryLabel: 'Mitra Penjual',
    brandBadge: 'GrabMerchant',
    desc: 'Jadilah mitra merchant GrabFood/GrabMart dan tingkatkan penjualan bisnis kuliner Anda.',
    highlights: ['Jangkau jutaan pelanggan setia Grab', 'Aplikasi manajemen pesanan & promosi terpadu', 'Laporan keuangan & analitik penjualan harian'],
    icon: Store,
    initialY: -460,
    rotation: 10,
  },
  {
    id: 'business-delivery',
    name: 'Kirim Paket Bisnis',
    category: 'merchant',
    categoryLabel: 'Mitra Penjual',
    brandBadge: 'GrabExpress Bisnis',
    desc: 'Besar atau kecil, kirim pesanan konsumen Anda dengan lancar dan aman berasuransi.',
    highlights: ['Tarif hemat khusus pengiriman bisnis', 'Pengiriman multi-tujuan (Multi-Stop)', 'Integrasi API pengiriman otomatis'],
    icon: Send,
    initialY: -530,
    rotation: -14,
  },
  {
    id: 'grab-kios',
    name: 'GrabKios',
    category: 'merchant',
    categoryLabel: 'Mitra Penjual',
    brandBadge: 'GrabKios',
    desc: 'Majukan warung Anda dengan digitalisasi transaksi pulsa, tagihan, dan transfer uang.',
    highlights: ['Modal usaha & pinjaman modal terpercaya', 'Jual produk digital pulsa, token & PPOB', 'Komisi keuntungan ekstra setiap transaksi'],
    icon: Landmark,
    initialY: -600,
    rotation: 16,
  },

  // 🏢 LAYANAN PERUSAHAAN (GRABFORBUSINESS)
  {
    id: 'corp-delivery',
    name: 'Pengiriman Korporat',
    category: 'perusahaan',
    categoryLabel: 'Layanan Perusahaan',
    brandBadge: 'GrabForBusiness',
    desc: 'Pengiriman paket sesuai permintaan untuk kebutuhan logistik dan dokumen perusahaan Anda.',
    highlights: ['Layanan kurir instan prioritas kantor', 'Pelacakan dokumen perusahaan real-time', 'SLA waktu antar terjamin berasuransi'],
    icon: Briefcase,
    initialY: -450,
    rotation: -10,
  },
  {
    id: 'corp-gifts',
    name: 'Kartu Hadiah Perusahaan',
    category: 'perusahaan',
    categoryLabel: 'Layanan Perusahaan',
    brandBadge: 'GrabGifts Corporate',
    desc: 'Untuk kebutuhan souvenir, reward karyawan, dan promosi perusahaan Anda.',
    highlights: ['Voucher digital kustom dengan logo perusahaan', 'Cocok untuk reward performa karyawan & klien', 'Distribusi voucher massal dalam 1 klik'],
    icon: Gift,
    initialY: -520,
    rotation: 12,
  },
  {
    id: 'grab-ads',
    name: 'Iklan (GrabAds)',
    category: 'perusahaan',
    categoryLabel: 'Layanan Perusahaan',
    brandBadge: 'GrabAds',
    desc: 'Hubungkan bisnis Anda dengan jutaan pelanggan, online di aplikasi dan offline di armada.',
    highlights: ['Iklan banner & penempatan prioritas dalam aplikasi', 'Branding stiker bodi armada GrabCar & GrabBike', 'Targeting audiens presisi berbasis lokasi real-time'],
    icon: Megaphone,
    initialY: -580,
    rotation: -16,
  },
  {
    id: 'grab-maps',
    name: 'GrabMaps',
    category: 'perusahaan',
    categoryLabel: 'Layanan Perusahaan',
    brandBadge: 'GrabMaps Enterprise',
    desc: 'Platform peta dan navigasi presisi pilihan untuk Asia Tenggara dan sekitarnya.',
    highlights: ['Peta lokal presisi dengan jutaan POI terupdate', 'API routing & geocoding super cepat', 'Dipercaya enterprise & mitra global'],
    icon: Map,
    initialY: -490,
    rotation: 14,
  },
];

const CATEGORIES = [
  { key: 'konsumen', label: 'KONSUMEN' },
  { key: 'pengemudi', label: 'MITRA PENGEMUDI' },
  { key: 'merchant', label: 'MITRA PENJUAL' },
  { key: 'perusahaan', label: 'LAYANAN PERUSAHAAN' },
] as const;

export function ServicesSphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'konsumen' | 'pengemudi' | 'merchant' | 'perusahaan'>('konsumen');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [dropTriggerKey, setDropTriggerKey] = useState<number>(0);

  const filteredServices = GRAB_SERVICES.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline saat section masuk layar
      tl = gsap.timeline({ paused: true });

      tl.fromTo(
        '.sphere-section-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.sphere-filter-btn',
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          '.tech-circle-ball',
          {
            y: (i: number) => filteredServices[i]?.initialY || -450,
            opacity: 0,
            scale: 0.3,
            rotate: (i: number) => (filteredServices[i]?.rotation || 10) * 2,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.95,
            stagger: 0.06,
            ease: 'back.out(2.2)', // Membal saat jatuh lalu diam di tempat
          },
          '-=0.3'
        );
    }, section);

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
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [dropTriggerKey, activeFilter]);

  const handleBallEnter = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    gsap.killTweensOf(target);
    gsap.to(target, {
      y: -20, // Terangkat ke atas saat disentuh / didekati
      scale: 1.16,
      rotate: -4,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const handleBallLeave = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    gsap.killTweensOf(target);
    gsap.to(target, {
      y: 0, // Jatuh/turun kembali ke bawah membal
      scale: 1,
      rotate: 0,
      duration: 0.7,
      ease: 'bounce.out', // Efek gravitasi jatuh membal saat dilepas
    });
  };

  const handleReplayDrop = () => {
    setDropTriggerKey((prev) => prev + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="layanan-ekosistem"
      className="relative z-30 min-h-screen w-full overflow-hidden -mt-10 md:-mt-16 rounded-t-[36px] md:rounded-t-[48px] bg-[#F8FAF9] dark:bg-[#07130C] py-20 md:py-28 flex flex-col justify-between shadow-[0_-18px_55px_rgba(0,0,0,0.12)] select-none"
    >
      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 md:px-10 z-10 flex flex-col justify-between h-full">
        {/* HEADER & FILTER BAR */}
        <div className="sphere-section-header flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-black/8 dark:border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-black tracking-widest text-primary shadow-sm mb-2">
              <Sparkles className="h-3.5 w-3.5" /> 04 — EKOSISTEM LAYANAN
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0A1A12] dark:text-white">
              Fitur &amp; <span className="text-primary">Layanan Terpadu</span> Grab
            </h2>
          </div>

          {/* Filter Pills & Replay Button */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveFilter(cat.key);
                  setDropTriggerKey((prev) => prev + 1);
                }}
                className={cn(
                  'sphere-filter-btn rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer',
                  activeFilter === cat.key
                    ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                    : 'bg-white dark:bg-[#0E1A13] text-[#5B6B62] dark:text-gray-300 border border-black/8 dark:border-white/10 hover:border-primary/40 hover:text-[#0A1A12] dark:hover:text-white'
                )}
              >
                {cat.label}
              </button>
            ))}

            <button
              type="button"
              onClick={handleReplayDrop}
              title="Jatuhkan Ulang Lingkaran"
              aria-label="Jatuhkan Ulang Lingkaran"
              className="p-2 rounded-full bg-white dark:bg-[#0E1A13] text-[#0A1A12] dark:text-white border border-black/8 dark:border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 🌟 PHYSICS BOUNCY DROPPING CIRCLES STAGE (LINGKARAN KECIL JATUH DARI ATAS) 🌟 */}
        <div
          key={dropTriggerKey}
          ref={containerRef}
          className="relative w-full my-auto min-h-[420px] md:min-h-[480px] flex items-center justify-center py-8"
        >
          {/* Circular Stack Grid */}
          <div className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-5 sm:gap-7 lg:gap-9 p-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService?.id === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  onMouseEnter={handleBallEnter}
                  onMouseLeave={handleBallLeave}
                  onTouchStart={handleBallEnter}
                  onTouchEnd={handleBallLeave}
                  className="tech-circle-ball group relative flex flex-col items-center justify-center cursor-pointer will-change-transform"
                >
                  {/* Floating Circular Tech Ball */}
                  <div
                    className={cn(
                      'relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 border-2',
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-xl shadow-primary/40 scale-110 ring-4 ring-primary/30'
                        : 'bg-white dark:bg-[#0E1A13] text-[#0A1A12] dark:text-white border-black/8 dark:border-white/10 shadow-md group-hover:border-primary group-hover:shadow-xl'
                    )}
                  >
                    {/* Glossy radial ambient shine */}
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-transparent to-black/5 opacity-80" />

                    {/* Icon */}
                    <div
                      className={cn(
                        'relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full mb-1 transition-transform duration-300 group-hover:scale-110',
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                      )}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    {/* Service Name */}
                    <span className="relative z-10 text-[10px] sm:text-[11px] md:text-xs font-black tracking-tight text-center truncate max-w-[90%]">
                      {service.name}
                    </span>

                    {/* Brand Badge */}
                    <span
                      className={cn(
                        'absolute -bottom-2 font-mono-tag text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full border shadow-xs transition-colors',
                        isSelected
                          ? 'bg-white text-primary border-primary'
                          : 'bg-primary text-white border-white dark:border-[#0E1A13]'
                      )}
                    >
                      {service.brandBadge}
                    </span>
                  </div>

                  {/* Soft Floor Shadow under ball */}
                  <div className="w-14 sm:w-18 h-2 bg-black/10 dark:bg-white/10 rounded-full blur-[2px] mt-3 group-hover:scale-75 group-hover:opacity-40 transition-all duration-300" />
                </div>
              );
            })}
          </div>

          {/* 🌟 INTERACTIVE MODAL / POPOVER CARD ON CLICK 🌟 */}
          {selectedService && (
            <div className="absolute z-50 bottom-2 sm:bottom-4 max-w-lg w-[92%] p-5 rounded-3xl bg-white dark:bg-[#0E1A13] border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl flex flex-col justify-between animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30">
                    <selectedService.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#0A1A12] dark:text-white">
                      {selectedService.name} • <span className="text-primary">{selectedService.brandBadge}</span>
                    </h4>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5B6B62] dark:text-gray-400">
                      {selectedService.categoryLabel}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#5B6B62] dark:text-gray-300 cursor-pointer"
                  title="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#334155] dark:text-gray-300 mt-3 leading-relaxed">
                {selectedService.desc}
              </p>

              {/* Highlights Checklist */}
              <div className="mt-3 space-y-1.5 bg-[#F8FAF9] dark:bg-black/30 p-3 rounded-2xl border border-black/5 dark:border-white/5">
                {selectedService.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#0A1A12] dark:text-gray-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="flex items-center justify-between text-xs font-bold text-[#5B6B62] dark:text-gray-400 pt-3 border-t border-black/8 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[#0A1A12] dark:text-white">
              {filteredServices.length} LAYANAN EKOSISTEM • SENTUH ATAU KLIK BOLA UNTUK DETAIL
            </span>
          </div>

          <span className="hidden sm:inline">
            GRAB SUPERAPP EKOSISTEM ASIA TENGGARA →
          </span>
        </div>
      </div>
    </section>
  );
}
import { MotorJourneyStep, ServiceDetail, BentoCardItem, DriverCalculatorConfig } from '@/types/landing';
import { ServiceType } from '@/types/landing';

export const APP_NAME = 'Grab';

export const JOURNEY_STEPS: MotorJourneyStep[] = [
  {
    stepId: 'order',
    stepNumber: '01 / TITIK JEMPUT',
    tag: 'Instant Match',
    title: 'Mitra Menerima Pesanan',
    description: 'Sistem alokasi cerdas memilih mitra terdekat dengan standar keamanan tinggi.',
    progressRange: [0.0, 0.35],
    badgeIcon: 'MapPin',
  },
  {
    stepId: 'ontheway',
    stepNumber: '02 / ON THE WAY',
    tag: 'AI Optimal Route',
    title: 'Melintasi Jalur Tercepat',
    description: 'Rute navigasi dinamis menghindari kemacetan untuk estimasi tiba presisi.',
    progressRange: [0.35, 0.7],
    badgeIcon: 'Navigation',
  },
  {
    stepId: 'arrive',
    stepNumber: '03 / SAMPAI TUJUAN',
    tag: 'Safe Arrival',
    title: 'Tiba Tepat Waktu & Aman',
    description: 'Verifikasi perjalanan selesai dan pembayaran otomatis terproses via OVO/GrabPay.',
    progressRange: [0.7, 1.0],
    badgeIcon: 'CheckCircle2',
  },
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'ride',
    label: 'GrabRide',
    badge: 'Mobility',
    headline: 'Tiba Tepat Waktu, Bebas Ribet',
    description: 'Perjalanan aman dan nyaman dengan mitra pengemudi terpercaya. Pesan kendaraan Anda hanya dalam hitungan detik.',
    gradient: 'from-primary to-[#20d866]',
    features: [
      { title: 'Live Tracking', description: 'Lacak lokasi driver secara real-time', icon: 'radar' },
      { title: 'Safe Ride', description: 'Standar keamanan tinggi untuk setiap perjalanan', icon: 'verified_user' },
      { title: 'Instant Match', description: 'Sistem alokasi cerdas dalam hitungan detik', icon: 'two_wheeler' },
    ],
    cta: { label: 'Pesan Sekarang', href: '#' },
  },
  {
    id: 'food',
    label: 'GrabFood',
    badge: 'Delivery',
    headline: 'Makanan Favorit, Tiba Hangat',
    description: 'Jelajahi ribuan restoran lokal. Diantar dengan cepat langsung ke depan pintu Anda.',
    gradient: 'from-[#FF7A00] to-[#FFA800]',
    features: [
      { title: 'Ribuan Restoran', description: 'Pilihan kuliner dari lokal hingga internasional', icon: 'restaurant' },
      { title: 'Fast Delivery', description: 'Antar cepat dengan kurir terdekat', icon: 'delivery_timeline' },
      { title: 'Freshness Guaranteed', description: 'Bahan segar dan standar higiensi tinggi', icon: 'eco' },
    ],
    cta: { label: 'Cari Makan', href: '#' },
  },
  {
    id: 'mart',
    label: 'GrabMart',
    badge: 'Groceries',
    headline: 'Belanja Harian, Tanpa Antre',
    description: 'Pesan kebutuhan sehari-hari, bahan segar, dan obat-obatan. Diantar instan ke rumah Anda.',
    gradient: 'from-[#00A5FF] to-[#00F0FF]',
    features: [
      { title: 'Instant Delivery', description: 'Barang sampai dalam 30 menit', icon: 'flash_on' },
      { title: 'Fresh Produce', description: 'Bahan segar langsung dari petani lokal', icon: 'local_florist' },
      { title: 'Best Price', description: 'Garansi harga terbaik untuk setiap belanjaan', icon: 'sell' },
    ],
    cta: { label: 'Belanja Sekarang', href: '#' },
  },
  {
    id: 'express',
    label: 'GrabExpress',
    badge: 'Courier',
    headline: 'Kirim Barang, Tanpa Repot',
    description: 'Layanan kurir instan untuk mengirim dokumen, paket, dan barang kesehatan. Tracking real-time hingga tiba di tujuan.',
    gradient: 'from-[#8948FC] to-[#A86CFF]',
    features: [
      { title: 'Same-Day Delivery', description: 'Antar semalam hari yang sama', icon: 'delivery_timeline' },
      { title: 'Real-time Tracking', description: 'Lacak paket Anda secara live', icon: 'radar' },
      { title: 'Pickup & Drop-off', description: 'Jemput dan antar fleksibel', icon: 'two_wheeler' },
    ],
    cta: { label: 'Kirim Sekarang', href: '#' },
  },
  {
    id: 'pay',
    label: 'GrabPay',
    badge: 'Finance',
    headline: 'Keuangan Cerdas, Tanpa Ribet',
    description: 'Kelola uang, bayar tagihan, dan kirim uang dengan cepat melalui dompet digital terdepan di Asia Tenggara.',
    gradient: 'from-[#00B14F] to-[#20d866]',
    features: [
      { title: 'Quick Send', description: 'Kirim uang ke teman dalam sekejap', icon: 'wallet' },
      { title: 'Scan & Pay', description: 'Bayar dengan QR di merchant', icon: 'account_balance_wallet' },
      { title: 'Top Up', description: 'Isi ulang saldo instan', icon: 'refresh' },
    ],
    cta: { label: 'Cek Sekarang', href: '#' },
  },
];

export const FLOATING_ICONS: Record<ServiceType, string[]> = {
  ride: ['two_wheeler', 'local_taxi'],
  food: ['lunch_dining', 'ramen_dining'],
  mart: ['shopping_cart', 'local_pharmacy'],
  express: ['local_shipping', 'package'],
  pay: ['account_balance_wallet', 'payment'],
};

export const SERVICE_ACCENT_COLORS: Record<ServiceType, string> = {
  ride: '#00B14F',
  food: '#FF8800',
  mart: '#00A3FF',
  express: '#8948FC',
  pay: '#00B14F',
};

export const BENTO_CARDS: BentoCardItem[] = [
  {
    id: 'food-promo',
    title: 'Weekly Food Sale',
    subtitle: 'Up to 50% off',
    tag: 'Food',
    colSpanDesktop: 'md:col-span-4',
    bgGradient: 'from-[#FF7A00] to-[#FF8800]',
    actionUrl: '#',
    mediaType: 'lottie',
  },
  {
    id: 'mart-fresh',
    title: 'Fresh Produce',
    subtitle: 'Farm to table',
    tag: 'Mart',
    colSpanDesktop: 'md:col-span-4',
    bgGradient: 'from-[#00A3FF] to-[#00F0FF]',
    actionUrl: '#',
    mediaType: 'image',
  },
  {
    id: 'ride-premium',
    title: 'Premium Ride',
    subtitle: '5 min ETA',
    tag: 'Ride',
    colSpanDesktop: 'md:col-span-4',
    bgGradient: 'from-[#00B14F] to-[#20d866]',
    actionUrl: '#',
    mediaType: 'counter',
  },
];

export const DRIVER_CALCULATOR_CONFIG: DriverCalculatorConfig = {
  bikeHourlyRate: 25000,
  carHourlyRate: 50000,
  defaultHoursPerDay: 8,
  defaultDaysPerWeek: 6,
};

export const SAFETY_FEATURES = [
  { id: 'safeentry', label: 'SafeEntry Verification', icon: 'shield' },
  { id: 'emergency', label: 'Emergency Button', icon: 'notifications' },
  { id: 'tts', label: 'Trip Tracking', icon: 'navigation' },
  { id: 'insurance', label: 'Insurance Coverage', icon: 'account_balance_wallet' },
];

export const WEBGL_SHADER = {
  vertexShader: `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,
  fragmentShader: `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    float noise = sin(uv.x * 10.0 + u_time * 0.5) * cos(uv.y * 10.0 + u_time * 0.4);
    noise += sin(uv.x * 20.0 - u_time * 0.3) * 0.5;
    
    vec3 color = vec3(0.04, 0.05, 0.04);
    
    vec3 grabGreen = vec3(0.0, 0.69, 0.31);
    float mask = smoothstep(0.4, 0.6, 0.5 + 0.3 * sin(u_time * 0.2 + uv.x * 3.0 + uv.y * 2.0 + noise));
    color = mix(color, grabGreen * 0.2, mask);
    
    float dist = length(uv - mouse);
    float glow = smoothstep(0.3, 0.0, dist) * 0.15;
    color += grabGreen * glow;
    
    color += vec3(uv.y * 0.05, uv.x * 0.02, uv.y * 0.05);
    
    gl_FragColor = vec4(color, 1.0);
}`,
};

# Data Schema & State Management Contracts - Grab Landing Page

## 1. TypeScript Data Models (`types/landing.ts`)

```typescript
export type ServiceType = 'ride' | 'food' | 'mart' | 'express' | 'pay';

export interface MotorJourneyStep {
  stepId: string;
  stepNumber: string;
  tag: string;
  title: string;
  description: string;
  progressRange: [number, number]; // e.g. [0.0, 0.33]
  badgeIcon: string;
}

export interface ServiceDetail {
  id: ServiceType;
  label: string;
  badge: string;
  headline: string;
  description: string;
  gradient: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  cta: {
    label: string;
    href: string;
  };
}

export interface BentoCardItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  colSpanDesktop: string;
  bgGradient: string;
  actionUrl: string;
  mediaType: 'lottie' | 'image' | 'counter';
}

export interface DriverCalculatorConfig {
  bikeHourlyRate: number; // in IDR
  carHourlyRate: number;  // in IDR
  defaultHoursPerDay: number;
  defaultDaysPerWeek: number;
}
```

## 2. Global Interactive State Store (`types/store.ts`)

```typescript
import { ServiceType } from './landing';

export interface GlobalStoreState {
  // Hero Motor Journey Progress
  motorProgress: number; // 0.0 to 1.0
  activeJourneyStep: number;
  setMotorProgress: (progress: number) => void;
  setActiveJourneyStep: (step: number) => void;

  // Active Service Tab
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;

  // Accessibility
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (enabled: boolean) => void;

  // Driver Calculator Inputs
  calculator: {
    vehicleType: 'bike' | 'car';
    hoursPerDay: number;
    daysPerWeek: number;
  };
  setCalculatorVehicle: (vehicle: 'bike' | 'car') => void;
  setCalculatorHours: (hours: number) => void;
  setCalculatorDays: (days: number) => void;
}
```

## 3. Mock Data Setup Example (`lib/constants.ts`)

```typescript
import { MotorJourneyStep, ServiceDetail } from '@/types/landing';

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
```

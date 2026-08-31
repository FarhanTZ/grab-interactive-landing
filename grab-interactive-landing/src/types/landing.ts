export type ServiceType = 'ride' | 'food' | 'mart' | 'express' | 'pay';

export interface MotorJourneyStep {
  stepId: string;
  stepNumber: string;
  tag: string;
  title: string;
  description: string;
  progressRange: [number, number];
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
  bikeHourlyRate: number;
  carHourlyRate: number;
  defaultHoursPerDay: number;
  defaultDaysPerWeek: number;
}
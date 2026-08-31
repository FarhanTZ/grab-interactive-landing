import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

export function useReducedMotion() {
  const { prefersReducedMotion, setPrefersReducedMotion } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion && mounted;
}

export function useMotorJourneyProgress() {
  const { motorProgress, setMotorProgress } = useStore();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const journeyEl = document.getElementById('journey-trigger');
          if (!journeyEl) return;
          const rect = journeyEl.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollable = Math.abs(rect.height) - viewportHeight;
          const scrolled = Math.min(
            Math.max((viewportHeight - rect.top) / totalScrollable, 0),
            1,
          );
          setMotorProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [setMotorProgress]);

  return motorProgress;
}

export function useEarningsCalculator() {
  const {
    calculator,
    setCalculatorVehicle,
    setCalculatorHours,
    setCalculatorDays,
  } = useStore();
  const { bikeHourlyRate, carHourlyRate } = useEarningsCalculatorConfig();

  const hourlyRate = calculator.vehicleType === 'bike' ? bikeHourlyRate : carHourlyRate;
  const dailyEarnings = hourlyRate * calculator.hoursPerDay;
  const weeklyEarnings = dailyEarnings * calculator.daysPerWeek;

  return {
    calculator,
    hourlyRate,
    dailyEarnings,
    weeklyEarnings,
    setCalculatorVehicle,
    setCalculatorHours,
    setCalculatorDays,
  };
}

export function useEarningsCalculatorConfig() {
  return { bikeHourlyRate: 25000, carHourlyRate: 50000 };
}
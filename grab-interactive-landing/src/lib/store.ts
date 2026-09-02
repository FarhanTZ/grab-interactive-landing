import { create } from 'zustand';
import { GlobalStoreState } from '@/types/store';

export const useStore = create<GlobalStoreState>((set) => ({
  // Hero Motor Journey
  motorProgress: 0,
  activeJourneyStep: 0,
  setMotorProgress: (progress) => set({ motorProgress: progress }),
  setActiveJourneyStep: (step) => set({ activeJourneyStep: step }),

  // Active Service Tab
  activeService: 'ride',
  setActiveService: (service) => set({ activeService: service }),

  // Accessibility
  prefersReducedMotion: false,
  setPrefersReducedMotion: (enabled) => set({ prefersReducedMotion: enabled }),

  // Driver Calculator
  calculator: {
    vehicleType: 'bike',
    hoursPerDay: 8,
    daysPerWeek: 6,
  },
  setCalculatorVehicle: (vehicle) =>
    set((state) => ({
      calculator: { ...state.calculator, vehicleType: vehicle },
    })),
  setCalculatorHours: (hours) =>
    set((state) => ({
      calculator: { ...state.calculator, hoursPerDay: hours },
    })),
  setCalculatorDays: (days) =>
    set((state) => ({
      calculator: { ...state.calculator, daysPerWeek: days },
    })),
  resetAll: () =>
    set({
      motorProgress: 0,
      activeJourneyStep: 0,
      activeService: 'ride',
    }),
}));
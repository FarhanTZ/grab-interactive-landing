import { ServiceType } from './landing';

export interface GlobalStoreState {
  // Hero Motor Journey Progress
  motorProgress: number;
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
  resetAll: () => void;
}
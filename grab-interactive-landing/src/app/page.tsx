import { HeroMotorPathJourney } from '@/components/sections/HeroMotorPathJourney';
import { AboutSection } from '@/components/sections/AboutSection';

export default function HomePage() {
  return (
    <main className="relative">
      <HeroMotorPathJourney />
      <AboutSection />
    </main>
  );
}

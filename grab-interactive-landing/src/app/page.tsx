'use client';

import { useState } from 'react';
import { HeroMotorPathJourney } from '@/components/sections/HeroMotorPathJourney';
import { AboutSection } from '@/components/sections/AboutSection';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <main className="relative">
        <HeroMotorPathJourney />
        <AboutSection />
      </main>
    </>
  );
}

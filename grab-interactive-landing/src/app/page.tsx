'use client';

import { useState } from 'react';
import { HeroMotorPathJourney } from '@/components/sections/HeroMotorPathJourney';
import { AboutSection } from '@/components/sections/AboutSection';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <Navbar />
      <main className="relative">
        <HeroMotorPathJourney />
        <AboutSection />
      </main>
    </>
  );
}

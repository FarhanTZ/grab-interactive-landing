'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroMotorPathJourney } from '@/components/sections/HeroMotorPathJourney';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneyStorySection } from '@/components/sections/JourneyStorySection';
import { ValuesEcosystemSection } from '@/components/sections/ValuesEcosystemSection';
import { CenterTimelineSection } from '@/components/sections/CenterTimelineSection';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLoaded = () => {
    setLoaded(true);
    // Refresh ScrollTrigger setelah loading screen selesai
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoaded} />}
      <Navbar />
      <main className="relative">
        <HeroMotorPathJourney />
        <AboutSection />
        <JourneyStorySection />
        <ValuesEcosystemSection />
        <CenterTimelineSection />
      </main>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/lib/store';
import { HeroMotorPathJourney } from '@/components/sections/HeroMotorPathJourney';
import { AboutSection } from '@/components/sections/AboutSection';
import { TimelineIntroSection } from '@/components/sections/TimelineIntroSection';
import { TimelineTransitionSection } from '@/components/sections/TimelineTransitionSection';
import { CenterTimelineSection } from '@/components/sections/CenterTimelineSection';
import { JourneyStorySection } from '@/components/sections/JourneyStorySection';
import { ServicesSphereSection } from '@/components/sections/ServicesSphereSection';
import { ValuesEcosystemSection } from '@/components/sections/ValuesEcosystemSection';
import { DirectGrabSection } from '@/components/sections/DirectGrabSection';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 🛡️ 1. Reset posisi scroll dan disable automatic scroll restoration setiap reload
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      ScrollTrigger.clearScrollMemory('manual');
      window.scrollTo(0, 0);

      // Reset store global
      useStore.getState().resetAll();

      // Reset scroll saat halaman ditutup / direload
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  const handleLoaded = () => {
    setLoaded(true);

    // 🛡️ 2. Kembalikan ke paling atas dan refresh seluruh animasi GSAP dari nol
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      useStore.getState().resetAll();
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);

      setTimeout(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
      }, 150);
    });
  };

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoaded} />}
      <Navbar />
      <main className="relative">
        <HeroMotorPathJourney />
        <AboutSection />
        <TimelineIntroSection />
        <TimelineTransitionSection />
        <CenterTimelineSection />
        <JourneyStorySection />
        <ServicesSphereSection />
        <ValuesEcosystemSection />
        <DirectGrabSection />
      </main>
    </>
  );
}

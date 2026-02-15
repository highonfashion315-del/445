import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import { Header } from './components/Header';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { EcosystemSection } from './sections/EcosystemSection';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { WhyUsSection } from './sections/WhyUsSection';
import { ProcessSection } from './sections/ProcessSection';
import { AuthoritySection } from './sections/AuthoritySection';
import { CTASection } from './sections/CTASection';
import { FooterSection } from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-dark min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <ProblemSection />
        <EcosystemSection />
        <CaseStudiesSection />
        <WhyUsSection />
        <ProcessSection />
        <AuthoritySection />
        <CTASection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;

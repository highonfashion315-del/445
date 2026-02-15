import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, Zap, Shield, Clock, TrendingUp, Lock, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  { icon: Zap, text: 'Custom-built systems (not templates)' },
  { icon: Shield, text: 'White-label & enterprise ready' },
  { icon: Clock, text: 'Rapid deployment (7–10 days)' },
  { icon: TrendingUp, text: 'Ongoing optimization' },
  { icon: Lock, text: 'Built for scale' },
  { icon: Globe, text: 'Secure & reliable infrastructure' },
];

const comparisonItems = [
  { generic: 'Generic chatbot', nexus: 'Intelligent AI system integrated into your business' },
  { generic: 'One-size-fits-all', nexus: 'Custom-built for your workflow' },
  { generic: 'Basic Q&A only', nexus: 'Full lead qualification & conversion' },
  { generic: 'No CRM integration', nexus: 'Deep CRM & tool connectivity' },
];

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!section || !leftPanel || !rightPanel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Entrance (0% - 30%)
      scrollTl
        .fromTo(
          leftPanel,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          rightPanel,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.05
        );

      // Settle (30% - 70%) - hold

      // Exit (70% - 100%)
      scrollTl
        .fromTo(
          leftPanel,
          { x: 0, opacity: 1 },
          { x: '-25vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightPanel,
          { x: 0, opacity: 1 },
          { x: '25vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center z-50"
    >
      <div className="w-full max-w-[1400px] px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Panel - Why Us */}
        <div
          ref={leftPanelRef}
          className="glass-card w-full lg:w-[46vw] lg:max-w-[640px] p-8 lg:p-12"
        >
          <span className="label-mono mb-6 block">WHY US</span>
          
          <h2 className="font-display font-bold text-display-3 text-gray-light mb-6">
            We Don't Sell Bots.
            <br />
            <span className="text-gradient">We Build Revenue Infrastructure.</span>
          </h2>
          
          <div className="space-y-4">
            {differentiators.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-violet" />
                </div>
                <span className="text-gray-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Panel - Comparison */}
        <div
          ref={rightPanelRef}
          className="glass-card w-full lg:w-[42vw] lg:max-w-[560px] p-8 lg:p-10"
        >
          <h3 className="font-display font-semibold text-xl text-gray-light mb-6 text-center">
            The Difference
          </h3>
          
          <div className="space-y-4">
            {comparisonItems.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <X size={16} className="text-red-400 flex-shrink-0" />
                  <span className="text-gray-text/60 line-through">{item.generic}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-light font-medium">{item.nexus}</span>
                </div>
                {i < comparisonItems.length - 1 && (
                  <div className="border-b border-white/5 pt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

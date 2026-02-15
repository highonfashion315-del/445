import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneOff, Clock, TrendingDown, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const headline = headlineRef.current;

    if (!section || !leftPanel || !rightPanel || !headline) return;

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
          { x: '-60vw', opacity: 0, rotateY: 18 },
          { x: 0, opacity: 1, rotateY: 0, ease: 'power2.out' },
          0
        )
        .fromTo(
          rightPanel,
          { x: '60vw', opacity: 0, scale: 1.06 },
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          headline.querySelectorAll('.line'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' },
          0.08
        );

      // Settle (30% - 70%) - hold position

      // Exit (70% - 100%)
      scrollTl
        .fromTo(
          leftPanel,
          { x: 0, opacity: 1 },
          { x: '-28vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightPanel,
          { x: 0, opacity: 1 },
          { x: '28vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineLines = [
    "Most Businesses Don't Have",
    "a Lead Problem.",
    "They Have a Response Speed Problem."
  ];

  const problems = [
    {
      icon: Clock,
      text: 'Leads go cold in 5 minutes',
    },
    {
      icon: PhoneOff,
      text: 'Missed calls = lost revenue',
    },
    {
      icon: TrendingDown,
      text: 'Slow replies kill conversions',
    },
    {
      icon: Users,
      text: 'Manual follow-ups never scale',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center z-20"
    >
      <div className="w-full max-w-[1400px] px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Panel - Text */}
        <div
          ref={leftPanelRef}
          className="glass-card w-full lg:w-[44vw] lg:max-w-[640px] p-8 lg:p-12"
          style={{ perspective: '1000px' }}
        >
          <span className="label-mono mb-6 block">THE PROBLEM</span>
          
          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-3 text-gray-light mb-8"
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="line block">
                {line}
              </span>
            ))}
          </h2>
          
          <div className="space-y-4 mb-8">
            {problems.map((problem, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center flex-shrink-0">
                  <problem.icon size={18} className="text-violet" />
                </div>
                <span className="text-gray-text">{problem.text}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <p className="text-lg font-display font-semibold text-gray-light">
              If you are not responding instantly, your competitor is.
            </p>
          </div>
        </div>
        
        {/* Right Panel - Visual */}
        <div
          ref={rightPanelRef}
          className="glass-card w-full lg:w-[42vw] lg:max-w-[720px] h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden"
        >
          <div className="glow-cyan" />
          
          {/* Visual representation of missed opportunities */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central clock */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-2 border-violet/30 flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-violet/20 flex items-center justify-center">
                  <Clock size={48} className="text-violet animate-pulse-slow" />
                </div>
              </div>
              
              {/* Orbiting missed calls */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <PhoneOff size={14} className="text-red-400" />
                </div>
              </div>
              
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <TrendingDown size={14} className="text-orange-400" />
                </div>
              </div>
            </div>
            
            {/* Stats floating around */}
            <div className="absolute top-8 right-8 glass-card-sm px-4 py-2 animate-float">
              <span className="text-red-400 font-mono text-sm">-73% leads lost</span>
            </div>
            <div className="absolute bottom-8 left-8 glass-card-sm px-4 py-2 animate-float-delayed">
              <span className="text-orange-400 font-mono text-sm">5 min response time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

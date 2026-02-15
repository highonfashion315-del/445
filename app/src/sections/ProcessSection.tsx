import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Strategy Call',
    description: 'We analyze your business and identify automation gaps.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Custom AI Build',
    description: 'We design and deploy your AI system.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Optimize',
    description: 'We monitor, refine, and scale performance.',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timeline = timelineRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !timeline || !cards) return;

    const cardElements = cards.querySelectorAll('.step-card');

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
          header,
          { y: '-10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          timeline,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          cardElements,
          { y: '70vh', opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            ease: 'power2.out',
          },
          0.1
        );

      // Settle (30% - 70%) - hold

      // Exit (70% - 100%)
      scrollTl
        .fromTo(
          header,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          timeline,
          { scaleX: 1, opacity: 1 },
          { scaleX: 0.2, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardElements,
          { y: 0, opacity: 1 },
          {
            y: '-30vh',
            opacity: 0,
            stagger: 0.06,
            ease: 'power2.in',
          },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-pinned flex flex-col items-center justify-center z-[60]"
    >
      <div ref={headerRef} className="text-center mb-12 lg:mb-16 px-6">
        <span className="label-mono mb-4 block">OUR PROCESS</span>
        <h2 className="font-display font-bold text-display-2 text-gray-light">
          How It Works
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-[1000px] px-6 lg:px-12 mb-8">
        <div ref={timelineRef} className="timeline-line w-full origin-center" />
        
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-card glass-card-sm p-6 lg:p-8 text-center relative"
            >
              {/* Connector dot */}
              <div className="hidden md:block absolute -top-[calc(1rem+2px)] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet shadow-glow" />
              
              <span className="step-number">{step.number}</span>
              
              <div className="w-14 h-14 rounded-2xl bg-violet/10 flex items-center justify-center mx-auto mb-4">
                <step.icon size={28} className="text-violet" />
              </div>
              
              <h3 className="font-display font-semibold text-xl text-gray-light mb-2">
                {step.title}
              </h3>
              
              <p className="text-gray-text text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Phone, DollarSign, ShoppingCart, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    icon: TrendingUp,
    industry: 'Solar Company (USA)',
    headline: 'Increased Qualified Appointments by 41% in 60 Days',
    stats: [
      'AI handled 1,200+ WhatsApp inquiries',
      'Reduced missed calls by 73%',
      'Generated $94,000 in additional closed revenue in 3 months',
    ],
    quote: 'The AI literally works better than our receptionist.',
    color: 'violet',
  },
  {
    icon: Phone,
    industry: 'Home Services (HVAC)',
    headline: 'From 18% Response Rate to 92%',
    stats: [
      'AI answered every inbound call',
      'Automated booking system',
      'Saved 1,500+ staff hours annually',
    ],
    quote: null,
    color: 'cyan',
  },
  {
    icon: DollarSign,
    industry: 'Marketing Agency',
    headline: 'Added AI Retainers Without Hiring Developers',
    stats: [
      'Sold AI automation as premium upsell',
      'Increased client LTV by 37%',
      'Zero technical team required',
    ],
    quote: null,
    color: 'violet',
  },
  {
    icon: ShoppingCart,
    industry: 'E-commerce Brand',
    headline: 'Recovered 28% of Abandoned Leads',
    stats: [
      'Automated WhatsApp follow-ups',
      'AI FAQ handling',
      '3.4x ROI in 90 days',
    ],
    quote: null,
    color: 'cyan',
  },
];

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.case-card');

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
          cardElements,
          { y: '60vh', opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.05
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
          cardElements,
          { y: 0, opacity: 1 },
          {
            y: '-30vh',
            opacity: 0,
            stagger: 0.04,
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
      id="results"
      className="section-pinned flex flex-col items-center justify-center z-40"
    >
      <div ref={headerRef} className="text-center mb-8 lg:mb-10 px-6">
        <span className="label-mono mb-4 block">CASE STUDIES</span>
        <h2 className="font-display font-bold text-display-2 text-gray-light">
          Real Results From<br />Real Workflows
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 px-6 lg:px-12 max-w-[1200px] w-full"
      >
        {caseStudies.map((study, i) => (
          <div
            key={i}
            className="case-card glass-card p-6 lg:p-8 relative overflow-hidden group hover:border-violet/30 transition-all duration-300"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                study.color === 'violet'
                  ? 'from-violet/10 to-transparent'
                  : 'from-cyan/10 to-transparent'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    study.color === 'violet' ? 'bg-violet/10' : 'bg-cyan/10'
                  }`}
                >
                  <study.icon
                    size={24}
                    className={study.color === 'violet' ? 'text-violet' : 'text-cyan'}
                  />
                </div>
                <div>
                  <span
                    className={`font-mono text-xs uppercase tracking-wider ${
                      study.color === 'violet' ? 'text-violet' : 'text-cyan'
                    }`}
                  >
                    {study.industry}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-gray-light mt-1">
                    {study.headline}
                  </h3>
                </div>
              </div>

              {/* Stats */}
              <ul className="space-y-2 mb-4">
                {study.stats.map((stat, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-text">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        study.color === 'violet' ? 'bg-violet' : 'bg-cyan'
                      }`}
                    />
                    {stat}
                  </li>
                ))}
              </ul>

              {/* Quote */}
              {study.quote && (
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-start gap-3">
                    <Quote size={16} className="text-violet/50 flex-shrink-0 mt-1" />
                    <p className="text-sm text-gray-text italic">"{study.quote}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

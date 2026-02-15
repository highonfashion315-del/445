import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeuralNetwork } from '../components/NeuralNetwork';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const bullets = bulletsRef.current;

    if (!section || !card || !headline || !subheadline || !cta || !bullets) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl
        .fromTo(
          card,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          headline.querySelectorAll('.word'),
          { opacity: 0, y: 24, rotateX: 18 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          subheadline,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          bullets.querySelectorAll('li'),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          cta,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([card, headline, subheadline, cta, bullets.querySelectorAll('li')], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(
          card,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          subheadline,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          bullets,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: '-4vh', opacity: 0, ease: 'power2.in' },
          0.76
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineWords = 'Turn Your Business Into a 24/7 AI-Powered Revenue Machine'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center z-10"
    >
      <NeuralNetwork />
      
      <div
        ref={cardRef}
        className="glass-card w-[min(92vw,1200px)] h-[min(70vh,600px)] mt-16 flex flex-col lg:flex-row overflow-hidden"
      >
        <div className="glow-violet" />
        
        {/* Left Content */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center relative z-10">
          <h1
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-gray-light mb-6"
            style={{ perspective: '1000px' }}
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>
          
          <p
            ref={subheadlineRef}
            className="text-gray-text text-base lg:text-lg max-w-lg mb-8 leading-relaxed"
          >
            We build intelligent AI Chatbots, Voice Agents, and Automation Systems that capture, 
            qualify, and convert leads automatically — while you focus on growth.
          </p>
          
          <ul ref={bulletsRef} className="space-y-3 mb-8">
            {[
              'Never miss a lead again',
              'Automate bookings & follow-ups',
              'Replace manual admin work',
              'Scale without hiring more staff',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-text">
                <span className="w-5 h-5 rounded-full bg-violet/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-violet" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button onClick={scrollToContact} className="btn-primary flex items-center justify-center gap-2">
              Deploy AI In My Business
              <ArrowRight size={16} />
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              Book Strategy Call
            </button>
          </div>
          
          <p className="text-xs text-gray-text/60 mt-4">
            Free 20-min audit • No commitment
          </p>
        </div>
        
        {/* Right Visual */}
        <div className="hidden lg:block flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-transparent to-cyan/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Central orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet to-violet-dark blur-sm animate-pulse-slow" />
              </div>
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan shadow-glow" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-violet shadow-glow" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
                <div className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-gray-light/50" />
              </div>
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                <circle cx="128" cy="128" r="80" fill="none" stroke="rgba(123, 97, 255, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="128" cy="128" r="110" fill="none" stroke="rgba(123, 97, 255, 0.1)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

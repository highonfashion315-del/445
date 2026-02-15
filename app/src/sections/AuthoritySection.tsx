import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sun,
  Home,
  Megaphone,
  ShoppingBag,
  Clock,
  Languages,
  Database,
  ShieldCheck,
  Server,
  Lock,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { icon: Sun, name: 'Solar' },
  { icon: Home, name: 'Home Services' },
  { icon: Megaphone, name: 'Agencies' },
  { icon: ShoppingBag, name: 'E-commerce' },
];

const capabilities = [
  { icon: Clock, text: '24/7 uptime' },
  { icon: Languages, text: 'Multilingual capable' },
  { icon: Database, text: 'CRM integrations' },
  { icon: ShieldCheck, text: 'Secure data handling' },
];

const trustIndicators = [
  { icon: Server, text: 'Enterprise-grade infrastructure' },
  { icon: Lock, text: 'Encrypted systems' },
  { icon: Globe, text: 'Global-ready deployment' },
];

export function AuthoritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const elements = content.querySelectorAll('.animate-in');

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
      scrollTl.fromTo(
        elements,
        { y: '40vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'power2.out',
        },
        0
      );

      // Settle (30% - 70%) - hold

      // Exit (70% - 100%)
      scrollTl.fromTo(
        elements,
        { y: 0, opacity: 1 },
        {
          y: '-20vh',
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
      className="section-pinned flex items-center justify-center z-[70]"
    >
      <div
        ref={contentRef}
        className="w-full max-w-[1000px] px-6 lg:px-12 text-center"
      >
        <span className="label-mono mb-6 block animate-in">AUTHORITY</span>
        
        <h2 className="font-display font-bold text-display-2 text-gray-light mb-12 animate-in">
          Built For Businesses That Want To<br />
          <span className="text-gradient">Dominate Their Market</span>
        </h2>

        {/* Industries */}
        <div className="mb-12 animate-in">
          <p className="text-gray-text text-sm mb-4">Works across industries</p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="glass-card-sm px-5 py-3 flex items-center gap-3"
              >
                <industry.icon size={18} className="text-violet" />
                <span className="text-gray-light text-sm font-medium">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-12 animate-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="glass-card-sm p-4 flex flex-col items-center gap-3"
              >
                <cap.icon size={22} className="text-cyan" />
                <span className="text-gray-text text-sm">{cap.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="animate-in">
          <div className="flex flex-wrap justify-center gap-6">
            {trustIndicators.map((indicator, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-text/60">
                <indicator.icon size={14} className="text-violet/60" />
                <span className="text-xs">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

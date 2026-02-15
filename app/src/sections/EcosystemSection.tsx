import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare,
  Phone,
  Workflow,
  Users,
  Receipt,
  Star,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Instant WhatsApp & website lead qualification with CRM sync.',
    color: 'from-violet/20 to-violet/5',
  },
  {
    icon: Phone,
    title: 'Voice AI Agents',
    description: 'Human-like AI answering calls, booking appointments, and handling inquiries 24/7.',
    color: 'from-cyan/20 to-cyan/5',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Connect your CRM, forms, payments, and internal tools seamlessly.',
    color: 'from-violet/20 to-violet/5',
  },
  {
    icon: Users,
    title: 'Lead Nurturing',
    description: 'Automated WhatsApp & email sequences that convert cold leads.',
    color: 'from-cyan/20 to-cyan/5',
  },
  {
    icon: Receipt,
    title: 'Finance Automation',
    description: 'Invoices, reminders, reporting — fully automated.',
    color: 'from-violet/20 to-violet/5',
  },
  {
    icon: Star,
    title: 'Review Growth Engine',
    description: 'Automatically request and filter reviews to boost reputation.',
    color: 'from-cyan/20 to-cyan/5',
  },
];

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const cardElements = cards.querySelectorAll('.service-card');

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
          { y: '-12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          cardElements,
          { y: '80vh', opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.06,
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
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardElements,
          { y: 0, opacity: 1 },
          {
            y: '-40vh',
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
      id="services"
      className="section-pinned flex flex-col items-center justify-center z-30"
    >
      <div ref={headerRef} className="text-center mb-8 lg:mb-12 px-6">
        <span className="label-mono mb-4 block">OUR SERVICES</span>
        <h2 className="font-display font-bold text-display-2 text-gray-light">
          The AI Infrastructure That<br />Runs Your Business For You
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-6 lg:px-12 max-w-[1200px] w-full"
      >
        {services.map((service, i) => (
          <div
            key={i}
            className="service-card group h-full"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 transition-colors">
                <service.icon size={24} className="text-violet" />
              </div>
              
              <h3 className="font-display font-semibold text-xl text-gray-light mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-text text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

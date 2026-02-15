import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll('.animate-in'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 lg:py-20 z-[90] bg-dark border-t border-white/5"
    >
      <div className="w-full max-w-[1200px] px-6 lg:px-12 mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="animate-in flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet to-violet-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-display font-bold text-2xl text-gray-light">
              NexusAI
            </span>
          </div>
          
          {/* Tagline */}
          <p className="animate-in text-gray-text mb-8">
            AI infrastructure for modern teams.
          </p>
          
          {/* Links */}
          <nav className="animate-in flex flex-wrap justify-center gap-6 lg:gap-8 mb-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Book Call
            </button>
            <button
              onClick={() => alert('Privacy Policy coming soon')}
              className="text-sm text-gray-text hover:text-gray-light transition-colors"
            >
              Privacy
            </button>
          </nav>
          
          {/* Copyright */}
          <p className="animate-in text-xs text-gray-text/50">
            © 2026 NexusAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

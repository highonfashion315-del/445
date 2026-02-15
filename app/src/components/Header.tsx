import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet to-violet-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-light">
                NexusAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('services')} className="nav-link">
                Services
              </button>
              <button onClick={() => scrollToSection('results')} className="nav-link">
                Results
              </button>
              <button onClick={() => scrollToSection('process')} className="nav-link">
                Process
              </button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-xs py-3 px-6"
              >
                Book Strategy Call
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-light"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0B0F]/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-2xl font-display text-gray-light hover:text-violet transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('results')}
            className="text-2xl font-display text-gray-light hover:text-violet transition-colors"
          >
            Results
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-2xl font-display text-gray-light hover:text-violet transition-colors"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-2xl font-display text-gray-light hover:text-violet transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary mt-4"
          >
            Book Strategy Call
          </button>
        </div>
      </div>
    </>
  );
}

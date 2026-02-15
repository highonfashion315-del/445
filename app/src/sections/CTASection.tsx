import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Flowing section - animate on scroll
      gsap.fromTo(
        left,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        right,
        { x: '10vw', opacity: 0, rotateY: 10 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 z-[80] bg-dark"
    >
      <div className="w-full max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={leftRef}>
            <span className="label-mono mb-6 block">GET STARTED</span>
            
            <h2 className="font-display font-bold text-display-2 text-gray-light mb-6">
              Your Competitor Is Probably Testing AI Right Now.
            </h2>
            
            <p className="text-gray-text text-lg mb-8">
              The question is — will you lead your market or react too late?
            </p>
            
            <div className="space-y-4 mb-8">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Book Strategy Call
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary w-full sm:w-auto block sm:inline-block ml-0 sm:ml-4"
              >
                Deploy AI In My Business
              </button>
            </div>
            
            <div className="glass-card-sm p-4 inline-block">
              <p className="text-sm text-gray-text">
                <span className="text-violet font-mono">Limited slots:</span> We onboard only{' '}
                <span className="text-gray-light font-semibold">8 businesses per month</span> due to custom builds.
              </p>
            </div>
          </div>
          
          {/* Right Form */}
          <div ref={rightRef} id="contact-form">
            <div className="glass-card p-8 lg:p-10">
              <h3 className="font-display font-semibold text-2xl text-gray-light mb-2">
                Ready to automate your growth?
              </h3>
              <p className="text-gray-text text-sm mb-6">
                Tell us what you're building. We'll reply within 24 hours with a plan and next steps.
              </p>
              
              {submitStatus === 'success' ? (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <CheckCircle size={20} className="text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">Message sent!</p>
                    <p className="text-green-400/70 text-sm">We'll be in touch within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-text mb-1.5">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-text mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-text mb-1.5">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-text mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your business and what you'd like to automate..."
                      className="w-full resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        Request a Call
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20 mt-4">
                  <AlertCircle size={20} className="text-red-400" />
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

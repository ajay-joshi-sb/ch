
import { useEffect, useRef } from 'react';
import CTAButton from './CTAButton';
import VoiceDemo from './VoiceDemo';
import { CheckCircle, PhoneCall, Calendar, Shield } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 pb-20 overflow-hidden blue-gradient-bg"
    >
      <div className="absolute inset-0 noise-bg"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50">
            AI Inbound Voice Agents for Home Service &amp; Franchise Businesses
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance reveal-on-scroll text-white" style={{ transitionDelay: '100ms' }}>
            Never Miss Another<br />
            <span className="text-gradient">Service Call Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 text-balance reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            Our AI-powered voice agents answer calls, qualify leads, and book appointments 24/7, so your home service business converts more leads into booked jobs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
            <CTAButton 
              variant="primary" 
              size="lg" 
              icon
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book A Free Demo
            </CTAButton>
            <CTAButton 
              variant="subtle" 
              size="lg"
              onClick={() => {
                const demoSection = document.querySelector('.container .max-w-5xl');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Try Voice Demo
            </CTAButton>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center mb-16 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
            <div className="bg-black/20 p-5 rounded-lg border border-brand-700/30">
              <div className="flex flex-col items-center">
                <PhoneCall className="w-8 h-8 text-brand-500 mb-3" />
                <span className="text-md font-medium text-white">24/7 Call Answering</span>
                <p className="text-sm text-gray-400 mt-2">Never miss another potential customer</p>
              </div>
            </div>
            <div className="bg-black/20 p-5 rounded-lg border border-brand-700/30">
              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-brand-500 mb-3" />
                <span className="text-md font-medium text-white">Automated Scheduling</span>
                <p className="text-sm text-gray-400 mt-2">Book jobs directly into your calendar</p>
              </div>
            </div>
            <div className="bg-black/20 p-5 rounded-lg border border-brand-700/30">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-brand-500 mb-3" />
                <span className="text-md font-medium text-white">Higher Conversion</span>
                <p className="text-sm text-gray-400 mt-2">Convert more calls into jobs</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 max-w-5xl mx-auto reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
          <VoiceDemo />
        </div>
      </div>
    </section>
  );
};

export default Hero;

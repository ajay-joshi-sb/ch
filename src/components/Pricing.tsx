
import { useEffect, useRef } from 'react';
import PricingCalculator from './PricingCalculator';
import CTAButton from './CTAButton';

const Pricing = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = pricingRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="pricing" ref={pricingRef} className="py-16 md:py-20 bg-darkblue">
      <div className="responsive-container">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <span className="feature-tag reveal-on-scroll">
            Pricing Calculator
          </span>
          <h2 className="section-heading reveal-on-scroll">
            Calculate Your <span className="text-gradient">ROI</span>
          </h2>
          <p className="section-subheading reveal-on-scroll">
            Use our calculator to see how much your business could save with AI-powered call handling.
          </p>
        </div>
        
        <div className="reveal-on-scroll">
          <PricingCalculator />
        </div>

        
      </div>
    </section>
  );
};

export default Pricing;

import { useEffect, useRef } from "react";
import PricingCalculator from "./PricingCalculator";
import CTAButton from "./CTAButton";

const Pricing = () => {
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = pricingRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="pricing"
      ref={pricingRef}
      className="py-16 md:py-20 bg-background"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-accent-foreground bg-accent/10 rounded-full reveal-on-scroll border border-accent/30">
            Pricing Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground text-balance reveal-on-scroll">
            Calculate Your <span className="text-accent">ROI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal-on-scroll">
            Use our calculator to see how much your business could save with
            AI-powered call handling.
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
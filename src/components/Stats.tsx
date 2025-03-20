
import { useEffect, useRef } from 'react';

const StatCard = ({ text }: { text: string }) => (
  <div className="stat-card reveal-on-scroll">
    {text}
  </div>
);

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = statsRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={statsRef} className="py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard text="95% Call Answer Rate" />
          <StatCard text="35% More Booked Jobs" />
          <StatCard text="60% Reduced Response Time" />
          <StatCard text="1000+ Service Businesses" />
        </div>
      </div>
    </section>
  );
};

export default Stats;


import { useEffect, useRef } from 'react';
import { PhoneCall, Calendar, Clock, UserPlus, ShieldCheck, Plug, Bolt, Wrench, Bot, Gauge } from 'lucide-react';
import CTAButton from './CTAButton';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-xl h-full reveal-on-scroll">
    <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-display font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = featuresRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="features" ref={featuresRef} className="py-20 bg-darkblue">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50">
            Designed for Home Service &amp; Franchise Businesses
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-balance reveal-on-scroll text-white">
            AI Voice Agents That <span className="text-gradient">Convert More Calls</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            Our inbound call handling solution is specifically designed for plumbers, HVAC technicians, roofers, electricians, and franchises to convert more leads into booked jobs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={<PhoneCall className="h-6 w-6 text-brand-500" />}
            title="24/7 Call Answering"
            description="Our AI voice agents answer every call instantly, ensuring you never miss another job opportunity, even after hours."
          />
          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-brand-500" />}
            title="Direct Scheduling"
            description="Book appointments instantly into your preferred scheduling system with real-time availability checks."
          />
          <FeatureCard
            icon={<UserPlus className="h-6 w-6 text-brand-500" />}
            title="Lead Qualification"
            description="Automatically collect service details, location, and requirements to prepare your team for every job."
          />
          <FeatureCard
            icon={<Plug className="h-6 w-6 text-brand-500" />}
            title="Seamless Integrations"
            description="Works directly with your existing tools like HouseCallPro, ServiceTitan, Jobber, Acculynx, and more."
          />
          <FeatureCard
            icon={<Bolt className="h-6 w-6 text-brand-500" />}
            title="Instant Responses"
            description="No hold times means happier customers who are more likely to book with your business."
          />
          <FeatureCard
            icon={<Bot className="h-6 w-6 text-brand-500" />}
            title="Industry-Trained AI"
            description="Our voice agents understand home service terminology, pricing, and common customer issues."
          />
        </div>
        
        {/* CTA Section */}
        <div className="text-center reveal-on-scroll">
          <CTAButton 
            variant="primary" 
            size="lg" 
            icon
            className="mx-auto"
          >
            Book A Demo Today
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default Features;

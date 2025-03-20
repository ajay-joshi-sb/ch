import { useEffect, useRef } from 'react';
import { PhoneCall, Calendar, Clock, UserPlus, ShieldCheck, Plug, Bolt, Wrench, Bot, Gauge } from 'lucide-react';
import CTAButton from './CTAButton';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-xl h-full reveal-on-scroll transition-all duration-500 opacity-0 transform translate-y-8">
    <div className="w-14 h-14 rounded-full bg-brand-500/20 flex items-center justify-center mb-4">
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const elements = featuresRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      if (elements) {
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="features" ref={featuresRef} className="py-24 bg-darkblue relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-700/10 rounded-full filter blur-3xl"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50 shadow-glow">
            Trusted by Home Service &amp; Franchise Businesses
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-balance reveal-on-scroll text-white leading-tight">
            AI Voice Agents That <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">Convert More Calls</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto reveal-on-scroll leading-relaxed">
            Our inbound call handling solution is specifically designed for plumbers, HVAC technicians, roofers, electricians, and franchises to convert more leads into booked jobs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
            description="Works flawlessly with your existing tools including HouseCallPro, ServiceTitan, Jobber, Acculynx, and more."
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

        {/* Integration Partners Section - Enhanced */}
        <div className="py-8 px-6 bg-brand-900/30 rounded-2xl border border-brand-700/30 backdrop-blur-sm max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-8 text-center text-white reveal-on-scroll">
            Seamlessly Integrates With Different Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "HouseCallPro", logo: "hcp-logo.svg" },
              { name: "ServiceTitan", logo: "st-logo.svg" },
              { name: "Jobber", logo: "jobber-logo.svg" },
              { name: "Acculynx", logo: "acculynx-logo.svg" },
              { name: "CallRail", logo: "callrail-logo.svg" },
            ].map((partner, index) => (
              <div key={partner.name} className="flex flex-col items-center justify-center reveal-on-scroll">
                <div className="h-1 text-brand-300 font-semibold text-center">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Uncommented and Enhanced */}
        <div className="mt-20 text-center reveal-on-scroll">
          <CTAButton 
            variant="primary" 
            size="lg" 
            icon
            className="mx-auto shadow-glow hover:shadow-glow-intense transition-all duration-300"
          >
            Book A Demo Today
          </CTAButton>
          <p className="text-sm text-brand-300 mt-4 opacity-80">No commitment required • 15-minute setup</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
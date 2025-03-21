import { useEffect, useRef } from 'react';
import { PhoneCall, Calendar, UserPlus, Plug, Bolt, Bot } from 'lucide-react';
import CTAButton from './CTAButton';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-card p-5 rounded-xl h-full reveal-on-scroll transition-all duration-500 opacity-0 transform translate-y-8 hover:translate-y-0 hover:shadow-lg group border border-border hover:border-primary/30">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-display font-semibold mb-3 text-center group-hover:text-primary transition-colors duration-300">{title}</h3>
    <p className="text-muted-foreground text-center text-sm leading-relaxed">{description}</p>
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
    <section id="features" ref={featuresRef} className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-primary/20 to-transparent opacity-80"></div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium text-primary bg-primary/10 rounded-full reveal-on-scroll border border-primary/20">
            Trusted by Home Service &amp; Franchise Businesses
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-5 text-balance reveal-on-scroll leading-tight">
            AI Voice Agents That <span className="text-primary">Convert More Calls</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto reveal-on-scroll leading-relaxed">
            Our inbound call handling solution is designed for plumbers, HVAC technicians, roofers, electricians, and franchises to convert more leads into booked jobs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16 px-2 md:px-6">
          <FeatureCard
            icon={<PhoneCall className="h-5 w-5 text-primary" />}
            title="24/7 Call Answering"
            description="Answer every call instantly, never miss another job opportunity."
          />
          <FeatureCard
            icon={<Calendar className="h-5 w-5 text-primary" />}
            title="Direct Scheduling"
            description="Book appointments instantly with real-time availability checks."
          />
          <FeatureCard
            icon={<UserPlus className="h-5 w-5 text-primary" />}
            title="Lead Qualification"
            description="Collect service details to prepare your team for every job."
          />
          <FeatureCard
            icon={<Plug className="h-5 w-5 text-primary" />}
            title="Seamless Integrations"
            description="Works with HouseCallPro, ServiceTitan, Jobber, and more."
          />
          <FeatureCard
            icon={<Bolt className="h-5 w-5 text-primary" />}
            title="Instant Responses"
            description="No hold times means happier customers who book more often."
          />
          <FeatureCard
            icon={<Bot className="h-5 w-5 text-primary" />}
            title="Industry-Trained AI"
            description="Our AI understands home service terminology and pricing."
          />
        </div>

        <div className="mt-12 text-center reveal-on-scroll bg-card/50 py-10 px-6 rounded-2xl border border-border backdrop-blur-sm max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-6">Ready to Convert More Calls?</h3>
          <CTAButton 
            variant="primary" 
            size="md" 
            icon
            className="mx-auto shadow-glow hover:shadow-glow-intense transition-all duration-300 hover:scale-105"
          >
            Book A Demo Today
          </CTAButton>
          <p className="text-xs text-primary/80 mt-4">No commitment required • 15-minute setup</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
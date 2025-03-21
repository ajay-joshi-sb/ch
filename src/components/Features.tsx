import { useEffect, useRef } from 'react';
import { PhoneCall, Calendar, UserPlus, Plug, Bolt, Bot } from 'lucide-react';
import CTAButton from './CTAButton';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-card p-5 rounded-xl h-full reveal-on-scroll transition-all duration-500 opacity-0 transform translate-y-8 hover:translate-y-0 hover:shadow-glow-sm group border border-brand-700/20 hover:border-brand-500/30">
    <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-brand-500/20 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-display font-semibold mb-3 text-white text-center group-hover:text-brand-400 transition-colors duration-300">{title}</h3>
    <p className="text-gray-300 text-center text-sm leading-relaxed">{description}</p>
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
    <section id="features" ref={featuresRef} className="py-16 bg-darkblue relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-brand-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-brand-700/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-brand-900/20 to-transparent opacity-80"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50 shadow-glow backdrop-blur-sm">
            Trusted by Home Service &amp; Franchise Businesses
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-5 text-balance reveal-on-scroll text-white leading-tight">
            AI Voice Agents That <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600">Convert More Calls</span>
          </h2>
          <p className="text-base text-gray-300 max-w-lg mx-auto reveal-on-scroll leading-relaxed">
            Our inbound call handling solution is designed for plumbers, HVAC technicians, roofers, electricians, and franchises to convert more leads into booked jobs.
          </p>
        </div>
        
        {/* Enhanced feature grid with hover effects */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16 px-2 md:px-6">
          <FeatureCard
            icon={<PhoneCall className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="24/7 Call Answering"
            description="Answer every call instantly, never miss another job opportunity."
          />
          <FeatureCard
            icon={<Calendar className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="Direct Scheduling"
            description="Book appointments instantly with real-time availability checks."
          />
          <FeatureCard
            icon={<UserPlus className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="Lead Qualification"
            description="Collect service details to prepare your team for every job."
          />
          <FeatureCard
            icon={<Plug className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="Seamless Integrations"
            description="Works with HouseCallPro, ServiceTitan, Jobber, and more."
          />
          <FeatureCard
            icon={<Bolt className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="Instant Responses"
            description="No hold times means happier customers who book more often."
          />
          <FeatureCard
            icon={<Bot className="h-5 w-5 text-brand-500 group-hover:text-brand-400" />}
            title="Industry-Trained AI"
            description="Our AI understands home service terminology and pricing."
          />
        </div>

        

        {/* Enhanced CTA Section */}
        <div className="mt-12 text-center reveal-on-scroll bg-brand-900/20 py-10 px-6 rounded-2xl border border-brand-700/20 backdrop-blur-sm max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-6 text-white">Ready to Convert More Calls?</h3>
          <CTAButton 
            variant="primary" 
            size="md" 
            icon
            className="mx-auto shadow-glow hover:shadow-glow-intense transition-all duration-300 hover:scale-105"
          >
            Book A Demo Today
          </CTAButton>
          <p className="text-xs text-brand-300 mt-4 opacity-80">No commitment required • 15-minute setup</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
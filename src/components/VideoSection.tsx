
import { useEffect, useRef } from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react';
import CTAButton from './CTAButton';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const openVideo = () => {
    // Replace with actual video URL when available
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    window.open(videoUrl, '_blank');
  };

  return (
    <section id="video" ref={sectionRef} className="py-20 bg-gradient-to-b from-darkblue to-black/90">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50">
            See Our AI Voice Agent in Action
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-balance reveal-on-scroll text-white">
            How Our <span className="text-gradient">AI Voice Agents</span> Convert Calls into Bookings
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            Watch a demonstration of how our AI voice agents handle real customer calls, qualify leads, and schedule appointments in real-time.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto reveal-on-scroll">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-brand-700/50 group">
            {/* Video thumbnail - replace with actual thumbnail when available */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/70 flex items-center justify-center cursor-pointer group-hover:from-black/30 group-hover:to-black/80 transition-all duration-300"
              onClick={openVideo}
            >
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <PlayCircle className="w-20 h-20 text-brand-500 opacity-90 group-hover:opacity-100" />
                <span className="block mt-4 text-white font-medium">Watch Demo Video</span>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1599971437030-00b0fc3025cb?q=80&w=1000&auto=format&fit=crop" 
              alt="AI Voice Agent Demo"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-black/20 p-6 rounded-lg border border-brand-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Our AI answers calls immediately, 24/7</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Understands customer needs through natural conversation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Qualifies leads by asking relevant questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Books appointments directly into your scheduling system</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-brand-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Business Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Never miss another opportunity, even after hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Reduce overhead costs for call handling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Increase conversion rates by 35% on average</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Get detailed insights from every call</span>
                </li>
              </ul>
            </div>
          </div>
           */}
          <div className="mt-10 text-center">
            <CTAButton 
              variant="primary" 
              size="lg" 
              icon
              className="mx-auto"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More About Our AI Voice Agents
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

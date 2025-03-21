import { useEffect, useRef } from 'react';
import { PlayCircle } from 'lucide-react';
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
    <section 
      id="video" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-primary-950 to-background/90"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary-300 bg-primary-900/40 rounded-full reveal-on-scroll border border-primary-700/50">
            See Our AI Voice Agent in Action
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-balance reveal-on-scroll text-foreground">
            How Our <span className="text-gradient">AI Voice Agents</span> Convert Calls into Bookings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal-on-scroll">
            Watch a demonstration of how our AI voice agents handle real customer calls, qualify leads, and schedule appointments in real-time.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto reveal-on-scroll">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-background/40 border border-primary-700/50 group">
            {/* Video thumbnail - replace with actual thumbnail when available */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/70 flex items-center justify-center cursor-pointer group-hover:from-background/30 group-hover:to-background/80 transition-all duration-300"
              onClick={openVideo}
            >
              <div className="transform transition-all duration-300 group-hover:scale-110">
                <PlayCircle className="w-20 h-20 text-primary-500 opacity-90 group-hover:opacity-100" />
                <span className="block mt-4 text-foreground font-medium">Watch Demo Video</span>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1599971437030-00b0fc3025cb?q=80&w=1000&auto=format&fit=crop" 
              alt="AI Voice Agent Demo"
              className="w-full h-full object-cover"
            />
          </div>
          
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
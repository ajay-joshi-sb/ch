import { useEffect, useRef, useState } from 'react';
import { PlayCircle, CheckCircle, X } from 'lucide-react';
import CTAButton from './CTAButton';

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
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
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  const closeVideo = () => {
    setIsVideoPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <section id="video" ref={sectionRef} className="w-full bg-gradient-to-b from-[#282850] to-[#323264] text-white py-20 relative overflow-hidden">
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
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/30 border border-brand-700/50 group">
            {isVideoPlaying ? (
              <div className="absolute inset-0 z-50">
                <button 
                  onClick={closeVideo} 
                  className="absolute top-4 right-4 text-white z-60 hover:text-brand-500 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                <video
                  ref={videoRef}
                  src="https://storage.googleapis.com/pipeline-generator-website-data/Consistent%20Call%20Center%20Experience.mp4"
                  className="absolute inset-0 w-full h-full object-contain"
                  poster="/thumbnail_1.png"
                  controls
                  autoPlay
                  preload="metadata"
                ></video>
              </div>
            ) : (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group-hover:from-black/30 group-hover:to-black/80 transition-all duration-300"
                onClick={openVideo}
              >
                <div className="transform transition-all duration-300 group-hover:scale-110 text-center">
                  <PlayCircle className="w-20 h-20 text-brand-500 opacity-90 group-hover:opacity-100 mx-auto" />
                  <span className="block mt-4 text-white font-medium text-center">
                    Watch Demo Video
                  </span>
                </div>
                
                <img 
                  src="/thumbnail_1.png" 
                  alt="AI Voice Agent Demo"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
              </div>
            )}
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

import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import VideoSection from '../components/VideoSection';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import ProcessSteps from '../components/ProcessSteps';
import FAQ from '../components/FAQ';
import VoiceAgent from '@/components/VoiceAgent';
import VoiceDemo from '@/components/VoiceDemo';

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      
      reveals.forEach((reveal) => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 50;
        
        if (revealTop < window.innerHeight - revealPoint) {
          reveal.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount for elements in viewport
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-darkblue">
      <NavBar />
      <main>
      <VoiceAgent />
      <VoiceDemo />
      <Features />
      {/* <VideoSection /> */}
      <Testimonials />
      <Pricing />
      <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
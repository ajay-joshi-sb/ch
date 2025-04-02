
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Another booking for Location 105! It was smooth. Even when the customer asked about foundation repair, the response was perfect!",
    author: "Alicia B",
    title: "Franchise Call Center Operations Manager",
    rating: 5
  },
  {
    id: 2,
    quote: "We got our first 2 bookings already! Cool thing that the tracking changes we working too. Good stuff guys!",
    author: "Eric K",
    title: "Founder & Owner",
    rating: 5
  }
];

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const showPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const showNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
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
    
    const elements = testimonialsRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Auto-advance testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      showNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="testimonials" ref={testimonialsRef} className="w-full bg-gradient-to-b from-[#323264] to-[#3c3c78] text-white py-20 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-100 bg-brand-700/30 rounded-full reveal-on-scroll">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white text-balance reveal-on-scroll">
            Trusted by <span className="text-gradient">Home Service Leaders</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            See how contractors, plumbers, HVAC companies and more are transforming their customer service with Pipeline Generator.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-8 sm:p-10 shadow-elevated overflow-hidden reveal-on-scroll">
            <div className="flex flex-col items-center">
              <div className="flex mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-500" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-display text-center mb-8 text-white text-balance">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-brand-300">{testimonials[activeIndex].author}</p>
                <p className="text-gray-400 text-sm">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2 reveal-on-scroll">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-brand-600' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={showPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-black/40 text-white rounded-full p-2 shadow-subtle hover:bg-black/60 transition-all focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={showNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-black/40 text-white rounded-full p-2 shadow-subtle hover:bg-black/60 transition-all focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        
      </div>
    </section>
  );
};

export default Testimonials;

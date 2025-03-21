import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "PipelineGenerator's AI voice agent has improved our customer response time by 80% and increased booked appointments by 35% within two months.",
    author: "Sarah Johnson",
    title: "Owner, Johnson Plumbing Services",
    rating: 5
  },
  {
    id: 2,
    quote: "Their seamless integration with ServiceTitan has transformed how we handle after-hours calls. We never miss a lead now, even at 2 AM.",
    author: "Michael Chen",
    title: "Operations Manager, Chen HVAC Solutions",
    rating: 5
  },
  {
    id: 3,
    quote: "The call qualification feature has eliminated wasted trips. Our technicians now arrive at jobs knowing exactly what to expect.",
    author: "Jessica Williams",
    title: "CEO, Williams Electrical Contractors",
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

  useEffect(() => {
    const interval = setInterval(() => {
      showNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full reveal-on-scroll border border-primary/30">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground text-balance reveal-on-scroll">
            Trusted by <span className="text-primary">Home Service Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal-on-scroll">
            See how contractors, plumbers, HVAC companies and more are transforming their customer service with PipelineGenerator.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-8 sm:p-10 shadow-lg overflow-hidden reveal-on-scroll border border-border">
            <div className="flex flex-col items-center">
              <div className="flex mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
                {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-muted" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-display text-center mb-8 text-foreground text-balance">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-primary">{testimonials[activeIndex].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[activeIndex].title}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2 reveal-on-scroll">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={showPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background/40 text-foreground rounded-full p-2 shadow-lg hover:bg-accent transition-all focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={showNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background/40 text-foreground rounded-full p-2 shadow-lg hover:bg-accent transition-all focus:outline-none"
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
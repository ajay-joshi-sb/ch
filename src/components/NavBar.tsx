import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import CTAButton from './CTAButton';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-primary-950/95 backdrop-blur-md shadow-lg border-b border-primary-900/50" 
          : "bg-primary-950/80 backdrop-blur-md"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="/favicon.ico" 
                alt="PipelineGenerator Logo" 
                className="h-8 w-8 mr-2"
              />
              <span className="text-2xl font-display font-semibold text-foreground">
                PipelineGenerator
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Pricing
            </a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <CTAButton variant="primary" size="sm">
              Get Started
            </CTAButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden absolute left-0 right-0 bg-primary-950 shadow-lg overflow-hidden transition-all duration-300 ease-in-out border-b border-primary-900/50",
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pt-2 pb-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-foreground hover:text-foreground/80 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-foreground hover:text-foreground/80 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-foreground hover:text-foreground/80 transition-colors py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </nav>
            <div className="pt-2">
              <CTAButton variant="primary" className="w-full justify-center">
                Get Started
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
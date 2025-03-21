import React, { useState } from "react";

const ServiceCallOpportunity = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobileNumber) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Mobile number submitted:", mobileNumber);
      setSubmitted(true);
      setMobileNumber("");
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-theme-primary to-theme-primary-dark text-theme-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12 pt-8">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-theme-secondary-foreground bg-theme-secondary/20 rounded-full reveal-on-scroll border border-theme-secondary/30">
            AI-Powered Voice Agents for Home Service & Franchise Businesses
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 text-theme-foreground leading-tight">
            Never Miss Another
          </h1>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-accent max-w-4xl mx-auto leading-tight">
            Service Call Opportunity
          </p>
        </div>

        {/* Phone Section */}
        <div className="flex justify-center mb-0">
          <div className="relative">
            {/* Phone device frame with flat bottom */}
            <div className="relative w-72 sm:w-80 md:w-96 h-[480px] rounded-t-[3rem] rounded-b-none bg-theme-card shadow-lg overflow-hidden transition-all hover:scale-[1.02] duration-500">
              {/* Bottom fade overlay - more gradual fade */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-theme-card-foreground/20 to-transparent z-20 pointer-events-none"></div>
              
              {/* Light reflection overlay for realism */}
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-br from-theme-white/20 to-transparent pointer-events-none z-20"></div>

              {/* Phone bezel with flat bottom */}
              <div className="absolute inset-0 rounded-t-[3rem] rounded-b-none border-[12px] border-b-[10px] border-theme-muted pointer-events-none shadow-inner">
                {/* Inner bezel highlight for realism */}
                <div className="absolute inset-[-1px] rounded-t-[2.7rem] rounded-b-none border border-theme-white/10 pointer-events-none"></div>
              </div>

              {/* Side buttons with highlights */}
              <div className="absolute right-[-2px] top-28 w-[4px] h-12 bg-theme-muted rounded-l-md shadow-inner">
                <div className="absolute inset-y-0 left-0 w-[1px] bg-theme-white/10"></div>
              </div>
              <div className="absolute left-[-2px] top-24 w-[4px] h-8 bg-theme-muted rounded-r-md shadow-inner">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-theme-white/10"></div>
              </div>
              <div className="absolute left-[-2px] top-36 w-[4px] h-8 bg-theme-muted rounded-r-md shadow-inner">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-theme-white/10"></div>
              </div>

              {/* Phone screen content with flat bottom */}
              <div className="absolute inset-0 rounded-t-[2.75rem] rounded-b-none bg-gradient-to-br from-theme-background to-theme-background-secondary overflow-hidden">
                {/* Black notch with subtle details */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-8 bg-theme-black rounded-b-2xl z-10 flex items-center justify-center shadow-md">
                  {/* Subtle camera element */}
                  <div className="w-2 h-2 rounded-full bg-theme-black border border-theme-gray-800 mr-10 shadow-inner overflow-hidden">
                    <div className="w-1 h-1 rounded-full bg-theme-gray-700/30 absolute top-0.5 left-0.5"></div>
                  </div>
                </div>

                {/* Screen overlays for realism */}
                <div className="absolute inset-0 bg-gradient-to-br from-theme-black/5 to-theme-black/20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-bl from-theme-white/10 to-transparent pointer-events-none rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-theme-black/10 to-transparent pointer-events-none"></div>

                {/* Main content container */}
                <div className="pt-12 px-6 h-full flex flex-col">
                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-5 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-theme-primary to-theme-primary-light rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-theme-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-theme-white font-semibold text-sm md:text-base">
                          Pipeline Generator AI
                        </div>
                        <div className="text-theme-success text-xs font-medium flex items-center">
                          <span className="w-2 h-2 bg-theme-success rounded-full mr-1 animate-pulse"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="w-10 h-10 bg-theme-destructive rounded-full flex items-center justify-center shadow-lg hover:bg-theme-destructive/90 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-theme-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-theme-success rounded-full flex items-center justify-center shadow-lg hover:bg-theme-success/90 transition-colors relative">
                        <div className="absolute inset-0 rounded-full animate-ping bg-theme-success/40"></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-theme-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="absolute top-2 w-full flex justify-between px-8 text-xs text-theme-white/80">
                    <div>10:42</div>
                    <div className="flex space-x-1">
                      <div className="flex items-center">
                        <div className="h-2.5 w-1 bg-theme-white/60 rounded-sm"></div>
                        <div className="h-3 w-1 bg-theme-white/80 rounded-sm ml-0.5"></div>
                        <div className="h-3.5 w-1 bg-theme-white rounded-sm ml-0.5"></div>
                        <div className="h-4 w-1 bg-theme-white rounded-sm ml-0.5"></div>
                      </div>
                      <div className="ml-1">5G</div>
                      <div className="flex items-center ml-1">
                        <div className="w-5 h-3 border border-theme-white/80 rounded-sm relative">
                          <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-theme-white/80 rounded-sm m-[1px]"></div>
                          <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[1px] h-[6px] bg-theme-white/80"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form container with enhanced glass effect */}
                  <div className="bg-theme-card/80 rounded-2xl p-5 shadow-lg border border-theme-border backdrop-blur-sm flex-1 flex flex-col mt-2 relative overflow-hidden">
                    {/* Glass reflections */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-theme-white/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-theme-primary/20 blur-xl rounded-full pointer-events-none"></div>
                    
                    <div className="flex-1 flex flex-col justify-center relative z-10">
                      <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">
                        Try it{" "}
                        <span className="text-gradient">
                          for yourself
                        </span>
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="Enter Mobile Here"
                            className="w-full py-3 px-5 rounded-xl bg-theme-input/30 backdrop-blur-sm border-2 border-theme-input text-center text-lg text-theme-white placeholder-theme-muted-foreground focus:outline-none focus:border-theme-ring focus:ring-2 focus:ring-theme-ring/50 transition-all shadow-inner"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            disabled={isSubmitting || submitted}
                            required
                          />
                          {submitted && (
                            <div className="absolute inset-0 flex items-center justify-center bg-theme-success rounded-xl text-theme-white font-medium animate-fade-in space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-theme-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>We'll call you shortly!</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || submitted || !mobileNumber}
                          className={`w-full py-3 px-5 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            !mobileNumber || isSubmitting || submitted
                              ? "bg-theme-muted/50 cursor-not-allowed"
                              : "bg-gradient-to-r from-theme-accent to-theme-accent-light hover:opacity-90 active:scale-95 shadow-lg"
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-theme-white/80 border-t-transparent rounded-full animate-spin"></div>
                              <span>Connecting...</span>
                            </div>
                          ) : (
                            "Get Started Now"
                          )}
                        </button>
                      </form>
                    </div>
                    
                    {/* Reduced space at bottom */}
                    <div className="h-10"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reduced multi-layer fade-out effect with shorter height */}
            <div className="relative h-16 w-full">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-theme-primary-dark to-theme-primary-darker"></div>
              <div className="absolute top-8 left-0 right-0 h-8 bg-theme-primary-darker"></div>
            </div>
          </div>
        </div>

        {/* Stats Section - Reduced top margin */}
        <div className="mt-0">
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 text-theme-white">
            Trusted by 850+ Businesses Worldwide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { value: "+2,890,000$", label: "New Revenue Generated" },
              { value: "+3,400", label: "Qualified Meetings Booked" },
              { value: "+25M$", label: "Sales Pipeline Created" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-theme-card/30 border border-theme-border rounded-2xl p-6 transform transition-all hover:scale-[1.03] duration-300 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-theme-white">
                  {stat.value}
                </div>
                <div className="text-theme-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .text-gradient {
          background: linear-gradient(to right, var(--theme-accent), var(--theme-accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ServiceCallOpportunity;
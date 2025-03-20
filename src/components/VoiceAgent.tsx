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
    <div className="w-full bg-gradient-to-b from-[#0a1425] to-[#071018] text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12 pt-8">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50">
            AI-Powered Voice Agents for Home Service & Franchise Businesses
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
            Never Miss Another
          </h1>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 max-w-4xl mx-auto leading-tight">
            Service Call Opportunity
          </p>
        </div>

        {/* Phone Section */}
        <div className="flex justify-center mb-10 lg:mb-16">
          <div className="relative">
            {/* Phone device frame with fade effect */}
            <div className="relative w-72 sm:w-80 md:w-96 h-[480px] rounded-[3rem] bg-[#1a1a1a] shadow-[0_0_60px_rgba(59,130,246,0.3)] overflow-hidden transition-all hover:scale-[1.02] duration-500">
              {/* Bottom fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent z-20 pointer-events-none"></div>

              {/* Phone bezel */}
              <div className="absolute inset-0 rounded-[3rem] border-[12px] border-[#111111] pointer-events-none shadow-inner"></div>

              {/* Side buttons */}
              <div className="absolute right-[-2px] top-28 w-[4px] h-12 bg-[#111111] rounded-l-md shadow-inner"></div>
              <div className="absolute left-[-2px] top-24 w-[4px] h-8 bg-[#111111] rounded-r-md shadow-inner"></div>
              <div className="absolute left-[-2px] top-36 w-[4px] h-8 bg-[#111111] rounded-r-md shadow-inner"></div>

              {/* Phone screen content */}
              <div className="absolute inset-0 rounded-[2.75rem] bg-gradient-to-bl from-[#152238] to-[#0b1423] overflow-hidden">
                {/* Black notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-8 bg-black rounded-b-2xl z-10 flex items-center justify-center shadow-md">
                  <div className="w-4 h-4 bg-black rounded-full border-[1px] border-gray-700 mr-2"></div>
                  <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                </div>

                {/* Screen overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-bl from-blue-400/10 to-transparent pointer-events-none rounded-bl-full"></div>

                {/* Main content container */}
                <div className="pt-12 px-6 h-full flex flex-col">
                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-6 px-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
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
                        <div className="text-white font-semibold text-sm md:text-base">
                          Pipeline Generator AI
                        </div>
                        <div className="text-green-400 text-xs font-medium flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                          Online
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
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
                      <button className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 transition-colors relative">
                        <div className="absolute inset-0 rounded-full animate-ping bg-green-500/30"></div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
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
                  <div className="absolute top-2 w-full flex justify-between px-8 text-xs text-white/80">
                    <div>10:42</div>
                    <div className="flex space-x-1">
                      <div className="flex items-center">
                        <div className="h-2.5 w-1 bg-white/60 rounded-sm"></div>
                        <div className="h-3 w-1 bg-white/80 rounded-sm ml-0.5"></div>
                        <div className="h-3.5 w-1 bg-white rounded-sm ml-0.5"></div>
                        <div className="h-4 w-1 bg-white rounded-sm ml-0.5"></div>
                      </div>
                      <div className="ml-1">5G</div>
                      <div className="flex items-center ml-1">
                        <div className="w-5 h-3 border border-white/80 rounded-sm relative">
                          <div className="absolute right-0 top-0 bottom-0 w-3/4 bg-white/80 rounded-sm m-[1px]"></div>
                          <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[1px] h-[6px] bg-white/80"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form container */}
                  <div className="bg-gradient-to-b from-[#183052]/90 to-[#0a1425]/90 rounded-2xl p-6 shadow-lg border border-blue-900/30 backdrop-blur-sm flex-1 flex flex-col mt-2">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-semibold text-center mb-6">
                        Try it{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                          Free
                        </span>{" "}
                        Today
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            className="w-full py-3 px-5 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 text-center text-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all shadow-inner"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            disabled={isSubmitting || submitted}
                            required
                          />
                          {submitted && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/95 rounded-xl text-white font-medium animate-fade-in space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
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
                              ? "bg-blue-700/40 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-95 shadow-lg"
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
                              <span>Connecting...</span>
                            </div>
                          ) : (
                            "Get Started Now"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone shadow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/30 rounded-full blur-md"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-10 lg:mt-16">
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-8 text-white">
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
                className="bg-blue-800/40 border border-blue-700/30 rounded-2xl p-6 transform transition-all hover:scale-[1.03] duration-300 shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center reveal-on-scroll">
            <div className="h-12 text-brand-300 font-semibold">
              HouseCallPro
            </div>
          </div>
          <div className="flex items-center justify-center reveal-on-scroll">
            <div className="h-12 text-brand-300 font-semibold">
              ServiceTitan
            </div>
          </div>
          <div className="flex items-center justify-center reveal-on-scroll">
            <div className="h-12 text-brand-300 font-semibold">Jobber</div>
          </div>
          <div className="flex items-center justify-center reveal-on-scroll">
            <div className="h-12 text-brand-300 font-semibold">Acculynx</div>
          </div>
          <div className="flex items-center justify-center reveal-on-scroll">
            <div className="h-12 text-brand-300 font-semibold">CallRail</div>
          </div>
        </div> */}
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
      `}</style>
    </div>
  );
};

export default ServiceCallOpportunity;

import React, { useState, useEffect } from "react";

const ServiceCallOpportunity = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Comprehensive list of country codes
  const countryCodes = [
    { code: "+1", country: "United States" },
    { code: "+1", country: "Canada" },
    { code: "+7", country: "Russia" },
    { code: "+20", country: "Egypt" },
    { code: "+27", country: "South Africa" },
    { code: "+30", country: "Greece" },
    { code: "+31", country: "Netherlands" },
    { code: "+32", country: "Belgium" },
    { code: "+33", country: "France" },
    { code: "+34", country: "Spain" },
    { code: "+36", country: "Hungary" },
    { code: "+39", country: "Italy" },
    { code: "+40", country: "Romania" },
    { code: "+41", country: "Switzerland" },
    { code: "+43", country: "Austria" },
    { code: "+44", country: "United Kingdom" },
    { code: "+45", country: "Denmark" },
    { code: "+46", country: "Sweden" },
    { code: "+47", country: "Norway" },
    { code: "+48", country: "Poland" },
    { code: "+49", country: "Germany" },
    { code: "+51", country: "Peru" },
    { code: "+52", country: "Mexico" },
    { code: "+54", country: "Argentina" },
    { code: "+55", country: "Brazil" },
    { code: "+56", country: "Chile" },
    { code: "+57", country: "Colombia" },
    { code: "+58", country: "Venezuela" },
    { code: "+60", country: "Malaysia" },
    { code: "+61", country: "Australia" },
    { code: "+62", country: "Indonesia" },
    { code: "+63", country: "Philippines" },
    { code: "+64", country: "New Zealand" },
    { code: "+65", country: "Singapore" },
    { code: "+66", country: "Thailand" },
    { code: "+81", country: "Japan" },
    { code: "+82", country: "South Korea" },
    { code: "+84", country: "Vietnam" },
    { code: "+86", country: "China" },
    { code: "+90", country: "Turkey" },
    { code: "+91", country: "India" },
    { code: "+92", country: "Pakistan" },
    { code: "+93", country: "Afghanistan" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+95", country: "Myanmar" },
    { code: "+98", country: "Iran" },
    { code: "+212", country: "Morocco" },
    { code: "+213", country: "Algeria" },
    { code: "+216", country: "Tunisia" },
    { code: "+218", country: "Libya" },
    { code: "+220", country: "Gambia" },
    { code: "+221", country: "Senegal" },
    { code: "+222", country: "Mauritania" },
    { code: "+223", country: "Mali" },
    { code: "+234", country: "Nigeria" },
    { code: "+254", country: "Kenya" },
    { code: "+255", country: "Tanzania" },
    { code: "+256", country: "Uganda" },
    { code: "+260", country: "Zambia" },
    { code: "+263", country: "Zimbabwe" },
    { code: "+351", country: "Portugal" },
    { code: "+352", country: "Luxembourg" },
    { code: "+353", country: "Ireland" },
    { code: "+358", country: "Finland" },
    { code: "+359", country: "Bulgaria" },
    { code: "+370", country: "Lithuania" },
    { code: "+371", country: "Latvia" },
    { code: "+372", country: "Estonia" },
    { code: "+380", country: "Ukraine" },
    { code: "+420", country: "Czech Republic" },
    { code: "+421", country: "Slovakia" },
    { code: "+880", country: "Bangladesh" },
    { code: "+886", country: "Taiwan" },
    { code: "+960", country: "Maldives" },
    { code: "+961", country: "Lebanon" },
    { code: "+962", country: "Jordan" },
    { code: "+963", country: "Syria" },
    { code: "+964", country: "Iraq" },
    { code: "+965", country: "Kuwait" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+967", country: "Yemen" },
    { code: "+968", country: "Oman" },
    { code: "+970", country: "Palestine" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+972", country: "Israel" },
    { code: "+973", country: "Bahrain" },
    { code: "+974", country: "Qatar" },
    { code: "+975", country: "Bhutan" },
    { code: "+976", country: "Mongolia" },
    { code: "+977", country: "Nepal" },
    { code: "+992", country: "Tajikistan" },
    { code: "+993", country: "Turkmenistan" },
    { code: "+994", country: "Azerbaijan" },
    { code: "+995", country: "Georgia" },
    { code: "+998", country: "Uzbekistan" },
  ];

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(countryCodes);
    } else {
      const filtered = countryCodes.filter(
        country => 
          country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.includes(searchTerm)
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm]);

  // Initialize filtered countries on component mount
  useEffect(() => {
    setFilteredCountries(countryCodes);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.country-selector')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Phone number validation function
  const isValidPhoneNumber = (number) => {
    // Check if it's exactly 10 digits (excluding country code)
    return /^\d{10}$/.test(number);
  };

  // Handle phone number input
  const handlePhoneInput = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 10 digits
    const limitedInput = input.slice(0, 10);
    setMobileNumber(limitedInput);
    
    // Clear any previous errors when user edits
    if (error) setError("");
  };

  // Handle country code selection
  const selectCountryCode = (code, country) => {
    setCountryCode(code);
    setShowDropdown(false);
    setSearchTerm("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!mobileNumber) {
      setError("Please enter a phone number");
      return;
    }
    
    if (!isValidPhoneNumber(mobileNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Combine country code and phone number
    const formattedNumber = `${countryCode}${mobileNumber}`;

    setIsSubmitting(true);
    setError("");

    try {
      // Make the API call to the specified endpoint
      const response = await fetch('https://us-central1-aiagents-7777.cloudfunctions.net/lead_contact_now_retellai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: "pipelinegenerator",
          contact_number: formattedNumber
        }),
        
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Call initiated:", data);
      
      // Show success state
      setSubmitted(true);
      setMobileNumber("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error("API error:", error);
      setError("Sorry, we couldn't connect your call. Please try again later.");
      setIsSubmitting(false);
    }
  };

  // Check if the form can be submitted
  const isFormValid = mobileNumber.length === 10 && countryCode;

  return (
    <div className="w-full bg-gradient-to-b from-[#0c1a34] to-[#0a1425] text-white pt-16">
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
        <div className="flex justify-center mb-0">
          <div className="relative">
            {/* Phone device frame with brighter colors */}
            <div className="relative w-72 sm:w-80 md:w-96 h-[480px] rounded-t-[3rem] rounded-b-none bg-[#1a1a1a] shadow-[0_0_60px_rgba(59,130,246,0.4)] overflow-hidden transition-all hover:scale-[1.02] duration-500">
              {/* Improved bottom fade overlay - more gradual fade */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0a1425] via-[#0a1425]/60 to-transparent z-20 pointer-events-none"></div>
              
              {/* Enhanced light reflection overlay for realism */}
              <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20"></div>

              {/* Improved Phone bezel with flat bottom */}
              <div className="absolute inset-0 rounded-t-[3rem] rounded-b-none border-[12px] border-b-[10px] border-[#111111] pointer-events-none shadow-inner">
                {/* Inner bezel highlight for realism */}
                <div className="absolute inset-[-1px] rounded-t-[2.7rem] rounded-b-none border border-white/10 pointer-events-none"></div>
              </div>

              {/* Improved Side buttons with highlights */}
              <div className="absolute right-[-2px] top-28 w-[4px] h-12 bg-[#0a0a0a] rounded-l-md shadow-inner">
                <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10"></div>
              </div>
              <div className="absolute left-[-2px] top-24 w-[4px] h-8 bg-[#0a0a0a] rounded-r-md shadow-inner">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10"></div>
              </div>
              <div className="absolute left-[-2px] top-36 w-[4px] h-8 bg-[#0a0a0a] rounded-r-md shadow-inner">
                <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10"></div>
              </div>

              {/* Phone screen content with brighter background */}
              <div className="absolute inset-0 rounded-t-[2.75rem] rounded-b-none bg-gradient-to-bl from-[#1a3156] to-[#0e1d36] overflow-hidden">
                {/* Improved Black notch with subtle details */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-8 bg-black rounded-b-2xl z-10 flex items-center justify-center shadow-md">
                  {/* Subtle camera element */}
                  <div className="w-2 h-2 rounded-full bg-black border border-gray-800 mr-10 shadow-inner overflow-hidden">
                    <div className="w-1 h-1 rounded-full bg-gray-700/30 absolute top-0.5 left-0.5"></div>
                  </div>
                </div>

                {/* Enhanced Screen overlays for realism with brighter highlights */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-bl from-blue-400/20 to-transparent pointer-events-none rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>

                {/* Main content container */}
                <div className="pt-12 px-6 h-full flex flex-col">
                  {/* Status bar with better spacing for visible icons */}
                  <div className="absolute top-2 w-full flex justify-between px-7 text-xs text-white/90">
                    <div>10:42</div>
                    <div className="flex space-x-2 items-center mr-10">
                      <div className="flex items-center">
                        <div className="h-2.5 w-1 bg-white/70 rounded-sm"></div>
                        <div className="h-3 w-1 bg-white/80 rounded-sm ml-0.5"></div>
                        <div className="h-3.5 w-1 bg-white/90 rounded-sm ml-0.5"></div>
                        <div className="h-4 w-1 bg-white rounded-sm ml-0.5"></div>
                      </div>
                      <div className="ml-1">5G</div>
                      <div className="ml-2 flex items-center">
                        <div className="w-6 h-3 border border-white/90 rounded-sm relative">
                          <div className="absolute left-0 top-0 bottom-0 w-4/5 bg-green-400 rounded-sm m-[1px]"></div>
                          <div className="absolute -right-px top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-white/90 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top bar - brighter colors */}
                  <div className="flex justify-between items-center mb-5 px-2 mt-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
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
                      <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-400 transition-colors">
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
                      <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors relative">
                        <div className="absolute inset-0 rounded-full animate-ping bg-green-400/40"></div>
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

                  {/* Form container with enhanced brighter glass effect */}
                  <div className="bg-gradient-to-b from-[#214070]/90 to-[#102040]/90 rounded-2xl p-5 shadow-lg border border-blue-500/30 backdrop-blur-sm flex-1 flex flex-col mt-2 relative overflow-hidden">
                    {/* Glass reflections - brighter */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-400/20 blur-xl rounded-full pointer-events-none"></div>
                    
                    <div className="flex-1 flex flex-col justify-center relative z-10">
                      <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">
                        Try it{" "}
                        <span className="bg-gradient-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent">
                          for yourself
                        </span>
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Country code selector and phone number input - brighter */}
                        <div className="relative">
                          <div className="flex flex-col space-y-2">
                            {/* Country code selector with improved brightness */}
                            <div className="relative country-selector">
                              <div 
                                className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/15 backdrop-blur-sm border-2 border-blue-400/40 text-white focus:outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 transition-all shadow-inner cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <div className="flex items-center">
                                  <div className="w-8 flex justify-center font-medium">{countryCode}</div>
                                  <span className="ml-3 text-gray-200 truncate max-w-[150px]">
                                    {countryCodes.find(c => c.code === countryCode)?.country}
                                  </span>
                                </div>
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-5 w-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              
                              {/* Country dropdown with brighter styling */}
                              {showDropdown && (
                                <div className="absolute z-30 mt-1 w-full rounded-xl bg-[#102040] border-2 border-blue-400/40 shadow-xl max-h-60 overflow-y-auto">
                                  <div className="sticky top-0 bg-[#102040] border-b border-blue-400/40 p-2 z-10">
                                    <div className="relative">
                                      <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                      </svg>
                                      <input
                                        type="text"
                                        placeholder="Search countries..."
                                        className="w-full py-2 pl-10 pr-3 rounded-lg bg-white/15 border border-blue-400/40 text-white focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/30"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="py-1">
                                    {filteredCountries.map((country, index) => (
                                      <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-blue-500/30 cursor-pointer flex justify-between items-center transition-colors"
                                        onClick={() => selectCountryCode(country.code, country.country)}
                                      >
                                        <div className="flex items-center">
                                          <span className="text-white truncate">{country.country}</span>
                                          {countryCode === country.code && (
                                            <svg 
                                              xmlns="http://www.w3.org/2000/svg" 
                                              className="h-4 w-4 text-blue-300 ml-2" 
                                              viewBox="0 0 20 20" 
                                              fill="currentColor"
                                            >
                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                          )}
                                        </div>
                                        <span className="text-gray-200 font-mono">{country.code}</span>
                                      </div>
                                    ))}
                                    {filteredCountries.length === 0 && (
                                      <div className="px-4 py-3 text-gray-300 text-center">No countries found</div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Phone number input - enhanced brighter styling */}
                            <input
                              type="tel"
                              placeholder="Enter 10-digit phone number"
                              className="w-full py-3 px-4 rounded-xl bg-white/15 backdrop-blur-sm border-2 border-blue-400/40 text-white placeholder-gray-300 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/30 transition-all shadow-inner"
                              value={mobileNumber}
                              onChange={handlePhoneInput}
                              disabled={isSubmitting || submitted}
                              required
                            />
                          </div>
                          
                          {error && (
                            <div className="text-red-300 text-sm mt-1 text-center">
                              {error}
                            </div>
                          )}
                          
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
                        
                        {/* Enhanced button with brighter colors */}
                        <button
                          type="submit"
                          disabled={isSubmitting || submitted || !isFormValid}
                          className={`w-full py-3 px-5 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            !isFormValid || isSubmitting || submitted
                              ? "bg-blue-600/40 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 hover:shadow-blue-500/30 hover:shadow-xl active:scale-95 shadow-lg"
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white/90 border-t-transparent rounded-full animate-spin"></div>
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
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a1425]/80 to-[#0a1425]/10"></div>
              <div className="absolute top-8 left-0 right-0 h-8 bg-[#0a1425]"></div>
            </div>
          </div>
        </div>

        {/* Stats Section - Enhanced with subtle animations */}
        <div className="mt-0">
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 text-white">
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
                className="bg-blue-800/40 border border-blue-700/30 rounded-2xl p-6 transform transition-all hover:scale-[1.03] hover:shadow-blue-700/10 hover:shadow-lg duration-300"
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
      </div>

      {/* Enhanced Animations */}
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

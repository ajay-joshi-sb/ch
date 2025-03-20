import { useState, useEffect } from 'react';
import { Calculator, Building2, Phone, Calendar } from 'lucide-react';
import CTAButton from './CTAButton';

interface CalculatorInputs {
  callsPerMonth: number;
  locations: number;
  afterHours: boolean;
  integration: string;
}

const PricingCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    callsPerMonth: 100,
    locations: 1,
    afterHours: true,
    integration: 'housecall'
  });
  
  const [savings, setSavings] = useState({
    monthly: 0,
    annual: 0,
    roi: 0
  });

  // Calculate savings based on inputs
  const calculateSavings = () => {
    // Base calculations
    const avgCallValue = 250; // Average revenue per converted call
    const conversionRate = 0.35; // 35% conversion rate with AI
    const standardConversionRate = 0.2; // 20% standard conversion rate
    
    // Calculate potential revenue
    const monthlyCallsValue = inputs.callsPerMonth * avgCallValue;
    const aiRevenue = monthlyCallsValue * conversionRate;
    const standardRevenue = monthlyCallsValue * standardConversionRate;
    
    // Calculate monthly savings
    const monthlySavings = aiRevenue - standardRevenue;
    
    // Adjust for multiple locations
    const locationMultiplier = Math.max(1, inputs.locations * 0.9); // 10% efficiency gain per location
    
    // Adjust for after hours
    const afterHoursMultiplier = inputs.afterHours ? 1.25 : 1;
    
    const finalMonthlySavings = monthlySavings * locationMultiplier * afterHoursMultiplier;
    
    setSavings({
      monthly: Math.round(finalMonthlySavings),
      annual: Math.round(finalMonthlySavings * 12),
      roi: Math.round((finalMonthlySavings * 12) / (inputs.callsPerMonth * 12 * 2)) // Assuming $2 per call cost
    });
  };

  useEffect(() => {
    calculateSavings();
  }, [inputs]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-black/20 rounded-2xl p-8 border border-brand-700/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Calculate Your Savings
              </h3>
              <p className="text-gray-300">
                Use our calculator to estimate your potential savings with PipelineGenerator's AI voice agents.
              </p>
            </div>

            <div className="space-y-6">
              {/* Calls per month */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Average Monthly Calls
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={inputs.callsPerMonth}
                    onChange={(e) => setInputs(prev => ({ ...prev, callsPerMonth: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-brand-900 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <span className="text-white font-medium min-w-[80px]">{inputs.callsPerMonth}</span>
                </div>
              </div>

              {/* Number of locations */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Number of Locations
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={inputs.locations}
                    onChange={(e) => setInputs(prev => ({ ...prev, locations: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-brand-900 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <span className="text-white font-medium min-w-[80px]">{inputs.locations}</span>
                </div>
              </div>

              {/* After hours support */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.afterHours}
                    onChange={(e) => setInputs(prev => ({ ...prev, afterHours: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm font-medium text-gray-200">
                    Include After-Hours Support
                  </span>
                </label>
              </div>

              {/* Integration type */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Preferred Integration
                </label>
                <select
                  value={inputs.integration}
                  onChange={(e) => setInputs(prev => ({ ...prev, integration: e.target.value }))}
                  className="w-full bg-black/30 border border-brand-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="housecall">HouseCall Pro</option>
                  <option value="servicetitan">ServiceTitan</option>
                  <option value="jobber">Jobber</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:border-l lg:border-brand-700/50 lg:pl-12">
            <div className="mb-8">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Your Estimated Savings
              </h3>
              <p className="text-gray-300">
                Based on your inputs, here's how much you could save with our AI voice agents.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-brand-900/30 rounded-xl p-6 border border-brand-700/50">
                  <div className="text-brand-400 mb-2">Monthly Savings</div>
                  <div className="text-3xl font-bold text-white">
                    ${savings.monthly.toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-brand-900/30 rounded-xl p-6 border border-brand-700/50">
                  <div className="text-brand-400 mb-2">Annual Savings</div>
                  <div className="text-3xl font-bold text-white">
                    ${savings.annual.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-brand-600/20 rounded-xl p-6 border border-brand-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-5 w-5 text-brand-400" />
                  <h4 className="text-lg font-medium text-white">ROI Analysis</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Return on Investment</span>
                    <span className="text-white font-medium">{savings.roi}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Calls Handled Annually</span>
                    <span className="text-white font-medium">
                      {(inputs.callsPerMonth * 12).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Locations Supported</span>
                    <span className="text-white font-medium">{inputs.locations}</span>
                  </div>
                </div>
              </div>

              <CTAButton 
                variant="primary" 
                size="lg"
                className="w-full"
                icon
              >
                Get Started Now
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
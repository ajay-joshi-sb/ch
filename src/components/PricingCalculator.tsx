import { useState, useEffect } from "react";
import { Calculator, Calendar, DollarSign, BarChart3 } from "lucide-react";
import CTAButton from "./CTAButton";

const PricingCalculator = () => {
  // Fixed rates
  const MISSED_CALL_RATE = 20; // 20%
  const CONVERSION_RATE = 30; // 30%

  const [inputs, setInputs] = useState({
    monthlyCallVolume: 200,
    averageTicketValue: 300,
    currentCallCenterCost: 2500,
  });

  const [results, setResults] = useState({
    addedMonthlyRevenue: 0,
    monthlyCostSavings: 0,
    totalMonthlyBenefit: 0,
    annualImpact: 0,
  });

  // Calculate results based on inputs
  const calculateResults = () => {
    // Calculate missed calls per month using fixed rate
    const missedCallsPerMonth = Math.round(
      inputs.monthlyCallVolume * (MISSED_CALL_RATE / 100)
    );

    // Assume AI recovers 80% of missed calls
    const recoveredCalls = Math.round(missedCallsPerMonth * 0.8);

    // Calculate added revenue from recovered calls using fixed conversion rate
    const convertedCalls = recoveredCalls * (CONVERSION_RATE / 100);
    const addedMonthlyRevenue = Math.round(
      convertedCalls * inputs.averageTicketValue
    );

    // Calculate cost savings (assume 70% reduction in call handling costs)
    const monthlyCostSavings = Math.round(inputs.currentCallCenterCost * 0.7);

    // Calculate total monthly benefit
    const totalMonthlyBenefit = addedMonthlyRevenue + monthlyCostSavings;

    // Calculate annual impact
    const annualImpact = totalMonthlyBenefit * 12;

    setResults({
      addedMonthlyRevenue,
      monthlyCostSavings,
      totalMonthlyBenefit,
      annualImpact,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 rounded-xl p-5 border border-slate-700/50 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column - Business Parameters */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700/50">
              <Calculator className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-bold text-white">
                Business Parameters
              </h3>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Monthly Call Volume */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Monthly Call Volume
                    </label>
                    <div className="text-blue-500 font-medium">
                      {inputs.monthlyCallVolume} calls
                    </div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={inputs.monthlyCallVolume}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        monthlyCallVolume: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50</span>
                    <span>1,000</span>
                  </div>
                </div>

                {/* Average Ticket Value */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Average Ticket Value
                    </label>
                    <div className="text-blue-500 font-medium">
                      ${inputs.averageTicketValue}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="25"
                    value={inputs.averageTicketValue}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        averageTicketValue: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$100</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Current Call Center Cost */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Current Monthly Cost
                    </label>
                    <div className="text-blue-500 font-medium">
                      ${inputs.currentCallCenterCost}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="100"
                    value={inputs.currentCallCenterCost}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        currentCallCenterCost: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$100,000</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <div className="flex items-center text-xs text-gray-300">
                  <BarChart3 className="h-4 w-4 text-blue-400 mr-2" />
                  Based on{" "}
                  <span className="text-blue-400 font-medium mx-1">
                    20% missed calls
                  </span>{" "}
                  and
                  <span className="text-blue-400 font-medium mx-1">
                    30% conversion rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="flex flex-col h-full lg:border-l lg:border-slate-700/50 lg:pl-5">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700/50">
              <Calendar className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-bold text-white">ROI Results</h3>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Added Monthly Revenue */}
                <div className="bg-green-900/20 rounded-lg p-3 border border-green-700/30">
                  <h4 className="text-sm font-medium text-green-500 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    New Revenue
                  </h4>
                  <div className="text-lg font-bold text-green-400 mt-1">
                    ${results.addedMonthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Recovered calls</p>
                </div>

                {/* Monthly Cost Savings */}
                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-700/30">
                  <h4 className="text-sm font-medium text-blue-500 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Cost Savings
                  </h4>
                  <div className="text-lg font-bold text-blue-400 mt-1">
                    ${results.monthlyCostSavings.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">70% reduction</p>
                </div>
              </div>

              {/* Total Monthly Benefit */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-base font-medium text-white">
                  Total Monthly Benefit
                </h4>
                <div className="text-2xl font-bold text-blue-400 mt-1">
                  ${results.totalMonthlyBenefit.toLocaleString()}
                </div>

                <div className="bg-blue-900/20 rounded-lg p-3 mt-3 border border-blue-700/30">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium text-white">
                      Annual Impact
                    </h5>
                    <div className="text-xl font-bold text-blue-400">
                      ${results.annualImpact.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <a href="https://calendly.com/pipeline-generator/inbound" target="_blank">
                <CTAButton
                  variant="primary"
                  size="lg"
                  className="w-full mt-4"
                  icon
                >
                  Get Custom ROI Analysis
                </CTAButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;

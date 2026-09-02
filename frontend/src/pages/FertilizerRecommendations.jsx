import { useState } from 'react';
import { 
  Droplet, 
  Sprout, 
  AlertTriangle,
  CheckCircle,
  Bot,
  Sun,
  Wind,
  Thermometer
} from 'lucide-react';

const FertilizerRecommendations = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    growthStage: '',
    soilType: '',
    region: '',
    previousCrop: ''
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // Validate required fields
    if (!formData.cropType || !formData.growthStage || !formData.soilType) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock recommendations based on inputs
      const mockRecommendations = {
        primaryFertilizer: {
          name: 'Urea (46-0-0)',
          quantity: '50 kg/acre',
          applicationTime: 'At tillering stage',
          method: 'Top dressing'
        },
        secondaryFertilizers: [
          {
            name: 'DAP (18-46-0)',
            quantity: '25 kg/acre',
            applicationTime: 'At sowing',
            method: 'Basal application'
          },
          {
            name: 'MOP (0-0-60)',
            quantity: '20 kg/acre',
            applicationTime: 'At panicle initiation',
            method: 'Top dressing'
          }
        ],
        micronutrients: [
          {
            name: 'Zinc Sulphate',
            quantity: '5 kg/acre',
            applicationTime: 'With first irrigation',
            method: 'Soil application'
          },
          {
            name: 'Borax',
            quantity: '2 kg/acre',
            applicationTime: 'At flowering stage',
            method: 'Foliar spray'
          }
        ],
        applicationSchedule: [
          {
            stage: 'Land Preparation',
            timing: '7 days before sowing',
            fertilizers: ['DAP (18-46-0) - 25 kg/acre'],
            notes: 'Apply and mix well with soil'
          },
          {
            stage: 'Sowing',
            timing: 'At time of sowing',
            fertilizers: ['DAP (18-46-0) - 25 kg/acre'],
            notes: 'Place below seed level'
          },
          {
            stage: 'Tillering',
            timing: '25-30 days after sowing',
            fertilizers: ['Urea (46-0-0) - 30 kg/acre'],
            notes: 'Apply in standing crop'
          },
          {
            stage: 'Panicle Initiation',
            timing: '60-65 days after sowing',
            fertilizers: ['Urea (46-0-0) - 20 kg/acre', 'MOP (0-0-60) - 20 kg/acre'],
            notes: 'Split application recommended'
          }
        ],
        tips: [
          'Apply fertilizers in moist soil for better absorption',
          'Avoid application during high wind speeds',
          'Split nitrogen application reduces losses',
          'Organic manure improves fertilizer efficiency'
        ],
        expectedOutcome: {
          yieldIncrease: '15-20%',
          costBenefitRatio: '1:3.5',
          qualityImprovement: 'Better grain quality'
        }
      };
      
      setRecommendations(mockRecommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getGrowthStageOptions = () => {
    switch (formData.cropType.toLowerCase()) {
      case 'wheat':
        return ['Seedling', 'Tillering', 'Jointing', 'Booting', 'Flowering', 'Grain Filling', 'Maturity'];
      case 'rice':
        return ['Seedling', 'Tillering', 'Panicle Initiation', 'Flowering', 'Grain Filling', 'Maturity'];
      case 'sugarcane':
        return ['Germination', 'Tillering', 'Grand Growth', 'Maturity', 'Ripening'];
      default:
        return ['Early', 'Mid', 'Late'];
    }
  };

  const getSoilTypeOptions = () => [
    'Alluvial', 'Black Cotton', 'Red Laterite', 'Sandy', 'Loamy', 'Saline/Alkaline'
  ];

  const getRegionOptions = () => [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 
    'Maharashtra', 'Andhra Pradesh', 'Tamil Nadu', 'West Bengal'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Fertilizer Recommendations
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Get personalized fertilizer plans based on your crop and soil conditions
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Enter Farm Details
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Crop Type <span className="text-red-500">*</span>
              </label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Crop Type</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="maize">Maize</option>
                <option value="cotton">Cotton</option>
                <option value="pulses">Pulses</option>
                <option value="oilseeds">Oilseeds</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Growth Stage <span className="text-red-500">*</span>
              </label>
              <select
                name="growthStage"
                value={formData.growthStage}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Growth Stage</option>
                {getGrowthStageOptions().map(stage => (
                  <option key={stage} value={stage.toLowerCase()}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Soil Type <span className="text-red-500">*</span>
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Soil Type</option>
                {getSoilTypeOptions().map(soil => (
                  <option key={soil} value={soil.toLowerCase().replace(/\s+/g, '')}>
                    {soil}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Region
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Region</option>
                {getRegionOptions().map(region => (
                  <option key={region} value={region.toLowerCase().replace(/\s+/g, '')}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Previous Crop
            </label>
            <select
              name="previousCrop"
              value={formData.previousCrop}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Previous Crop (Optional)</option>
              <option value="">None (Fallow)</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="pulses">Pulses</option>
              <option value="oilseeds">Oilseeds</option>
            </select>
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isLoading ? 'bg-gray-400' : ''
              }`}
            >
              {isLoading ? 'Generating...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {recommendations && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Fertilizer Plan
            </h2>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              <Bot className="mr-2 h-4 w-4" />
              Save Plan
            </button>
          </div>
          
          {/* Primary Fertilizer */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <Droplet className="h-4 w-4 text-green-500" />
              Primary Fertilizer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fertilizer</p>
                <p className="font-medium text-gray-900 dark:text-white">{recommendations.primaryFertilizer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                <p className="font-medium text-gray-900 dark:text-white">{recommendations.primaryFertilizer.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Application</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {recommendations.primaryFertilizer.applicationTime}<br/>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{recommendations.primaryFertilizer.method}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Secondary Fertilizers */}
          {recommendations.secondaryFertilizers.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Sprout className="h-4 w-4 text-green-500" />
                Secondary Fertilizers
              </h3>
              <div className="space-y-3">
                {recommendations.secondaryFertilizers.map((fert, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{fert.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{fert.quantity}</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {fert.applicationTime} • {fert.method}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Micronutrients */}
          {recommendations.micronutrients.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Micronutrients
              </h3>
              <div className="space-y-3">
                {recommendations.micronutrients.map((micro, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{micro.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{micro.quantity}</p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {micro.applicationTime} • {micro.method}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Application Schedule */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-blue-500" />
              Application Schedule
            </h3>
            <div className="space-y-3">
              {recommendations.applicationSchedule.map((schedule, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-4 border-l-4 border-green-500 dark:border-green-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{schedule.stage}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.timing}</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {schedule.fertilizers.map(f => f).join(', ')}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {schedule.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tips and Expected Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Bot className="h-4 w-4 text-purple-500" />
                Expert Tips
              </h3>
              <div className="space-y-2">
                {recommendations.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="mt-1 h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Expected Outcome
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Yield Increase</p>
                  <p className="font-medium text-gray-900 dark:text-white">{recommendations.expectedOutcome.yieldIncrease}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cost Benefit</p>
                  <p className="font-medium text-gray-900 dark:text-white">{recommendations.expectedOutcome.costBenefitRatio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quality</p>
                  <p className="font-medium text-gray-900 dark:text-white">{recommendations.expectedOutcome.qualityImprovement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendations;
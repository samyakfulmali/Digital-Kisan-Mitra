import { useState } from 'react';
import { 
  Image, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  Loader,
  Activity,
  Bot
} from 'lucide-react';

const DiseaseDetection = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setError(null);
      setImageUrl(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageUrl) {
      setError('Please upload an image first');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate API call to AI model
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate results - in real app this would come from backend AI model
      const mockResults = {
        disease: Math.random() > 0.7 ? 'Healthy' : 
                 Math.random() > 0.4 ? 'Leaf Rust' : 
                 'Powdery Mildew',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        severity: Math.random() > 0.8 ? 'High' : 
                  Math.random() > 0.5 ? 'Medium' : 'Low',
        affectedArea: Math.floor(Math.random() * 40) + 10, // 10-50%
        recommendations: [
          'Apply fungicide treatment within 48 hours',
          'Ensure proper drainage to prevent moisture buildup',
          'Remove affected leaves to prevent spread',
          'Monitor crop regularly for early detection'
        ]
      };
      
      setResults(mockResults);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageUrl(null);
    setResults(null);
    setError(null);
  };

  if (!imageUrl && !results) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Crop Disease Detection
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl">
            Upload a photo of your crop leaves to get instant AI-powered disease diagnosis
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-border">
          <label 
            htmlFor="file-upload"
            className="cursor-pointer"
          >
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Uploaded crop leaf" 
                className="max-w-xs rounded-lg shadow-md mb-4"
              />
            ) : (
              <>
                <Upload className="h-10 w-10 mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Supported formats: JPG, PNG (Max 5MB)
                </p>
              </>
            )}
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mt-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !imageUrl}
              className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                isAnalyzing ? 'bg-gray-400' : ''
              }`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
            </button>
            
            {imageUrl && !isAnalyzing && (
              <button
                onClick={handleReset}
                className="ml-3 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        
        {/* How it works */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Activity className="h-8 w-8 mb-3 text-green-500" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">1. Upload Image</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Take or upload a clear photo of affected crop leaves
              </p>
            </div>
            <div>
              <Bot className="h-8 w-8 mb-3 text-blue-500" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">2. AI Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our deep learning model analyzes the image for disease patterns
              </p>
            </div>
            <div>
              <CheckCircle className="h-8 w-8 mb-3 text-purple-500" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">3. Get Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive instant diagnosis with treatment recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analysis Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {imageUrl ? 'Analysis completed' : 'No image uploaded'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            New Analysis
          </button>
        </div>
      </div>

      {/* Image and Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <img 
            src={imageUrl} 
            alt="Analyzed crop leaf" 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Diagnosis
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  results.disease === 'Healthy' 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : results.disease === 'Leaf Rust' 
                      ? 'bg-orange-50 dark:bg-orange-900/20' 
                      : 'bg-purple-50 dark:bg-purple-900/20'
                }`}>
                  {results.disease === 'Healthy' ? (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  ) : results.disease === 'Leaf Rust' ? (
                    <AlertTriangle className="text-orange-500 w-5 h-5" />
                  ) : (
                    <Bot className="text-purple-500 w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${
                    results.disease === 'Healthy' 
                      ? 'text-green-600' 
                      : results.disease === 'Leaf Rust' 
                        ? 'text-orange-600' 
                        : 'text-purple-600'
                  }`}>
                    {results.disease}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confidence: {results.confidence}%
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Severity</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {results.severity}
                    <span className={`ml-1 px-2 py-0.5 text-xs rounded ${
                      results.severity === 'High' 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        : results.severity === 'Medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                          : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    }`}>
                      {results.severity}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Area Affected</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {results.affectedArea}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {results.recommendations && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Treatment Recommendations
              </h2>
              <div className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                    <p className="text-gray-900 dark:text-white">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
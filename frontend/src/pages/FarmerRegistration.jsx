import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, MapPin, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await fetch('http://localhost:5000/api/farmers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage(data.message);
        setIsSubmitting(false);
        // Redirect to dashboard after successful registration
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // Handle validation errors
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ submit: data.message || 'Registration failed' });
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen">
        {/* Image Side */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-green-50 to green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600/20 dark:bg-green-600/30 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="text-green-500 dark:text-green-400 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Digital Kisan Mitra
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
              Empowering farmers with AI-powered insights for better yields and sustainable farming
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-200">
                <MapPin className="mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Local farming guidance</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-200">
                <Phone className="mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Expert advice on demand</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-200">
                <CheckCircle className="mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
                <span>Data-driven decisions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-12">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Farmer Registration
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of farmers benefiting from smart agriculture
              </p>
            </div>

            {successMessage && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg mb-6 flex items-start space-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="village" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Village / Location
                </label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className={`block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.village ? 'border-red-500' : ''}`}
                  placeholder="Enter your village or location"
                  required
                />
                {errors.village && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.village}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                {isSubmitting ? 'Registering...' : 'Register Farmer'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already registered?{" "}
                <span className="text-green-600 hover:text-green-800 dark:hover:text-green-300 cursor-pointer">
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const RegisterPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    farmSize: '',
    cropsGrown: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);
    setLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDontMatch') || 'Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const response = await authAPI.register(formData);
      setSuccess(true);
      // Auto login after successful registration
      login(response.data.user);
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || t('registrationError') || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mb-4">{t('farmerRegistration')}</h2>
          <p className="text-sm text-gray-600">{t('createAccount') || 'Create your account to access farming assistance'}</p>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
            {t('registrationSuccess') || 'Registration successful! Please login.'}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('mobileNumber')}
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your mobile number"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('farmSize')}
              </label>
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                className="input w-full"
                placeholder="Farm size in acres"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('address')}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter your address"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('city')}
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input w-full"
                placeholder="City"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('state')}
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="input w-full"
                placeholder="State"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('pincode')}
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="input w-full"
                placeholder="PIN Code"
                pattern="[0-9]{6}"
                title="Please enter a valid 6-digit PIN code"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('cropsGrown')}
            </label>
            <input
              type="text"
              name="cropsGrown"
              value={formData.cropsGrown}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g., Rice, Wheat, Vegetables"
            />
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full"
              placeholder="Create a password"
              required
              minLength="6"
            />
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input w-full"
              placeholder="Confirm your password"
              required
              minLength="6"
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? t('registering') || 'Registering...' : t('register')}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <div className="text-center mt-4">
          <p className="text-sm">
            {t('alreadyHaveAccount')} {' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              {t('signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
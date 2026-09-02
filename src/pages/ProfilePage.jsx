import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFarmerProfile } from '../hooks';
import { farmerAPI } from '../services/api';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { profile, loading, error } = useFarmerProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useState(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        mobileNumber: profile.mobileNumber || '',
        email: profile.email || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
        farmSize: profile.farmSize || '',
        cropsGrown: profile.cropsGrown || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);
    setIsLoading(true);
    
    try {
      const response = await farmerAPI.updateProfile(formData);
      setFormSuccess(true);
      // Update profile in context would happen here
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (err) {
      setFormError(err.response?.data?.message || t('profileUpdateError') || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);
    setIsLoading(true);
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFormError(t('passwordsDontMatch') || 'Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      await farmerAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setFormSuccess(true);
      // Reset password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordChange(false);
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (err) {
      setFormError(err.response?.data?.message || t('passwordChangeError') || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-140px)] items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-12 h-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('error')}</h2>
          <p className="text-gray-600">{error}</p>
          <Link to="/dashboard" className="btn btn-outline mt-4">
            {t('backToDashboard')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('profile')}</h1>
        <p className="text-gray-600 max-w-md text-center">
          {t('profileSubtitle') || 'Manage your personal information and preferences'}
        </p>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                className="input w-full"
                required
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('mobileNumber')}
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber || ''}
                onChange={handleChange}
                className="input w-full"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </form>
          
          {formSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
              {t('profileUpdated') || 'Profile updated successfully'}
            </div>
          )}
          
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              {formError}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('address')}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="input w-full"
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
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('state')}
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('pincode')}
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode || ''}
                  onChange={handleChange}
                  className="input w-full"
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit PIN code"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('farmSize')}
              </label>
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize || ''}
                onChange={handleChange}
                className="input w-full"
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('cropsGrown')}
              </label>
              <input
                type="text"
                name="cropsGrown"
                value={formData.cropsGrown || ''}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </form>
          
          <div className="flex justify-end">
            <button
              type="submit"
              form="profile-form"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? t('saving') || 'Saving...' : t('saveChanges')}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">{t('changePassword')}</h2>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {showPasswordChange ? t('hide') || 'Hide' : t('changePassword')}
          </button>
        </div>
        {showPasswordChange && (
          <div className="card-body">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('currentPassword')}
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newPassword')}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="input w-full"
                  required
                  minLength="6"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input w-full"
                  required
                  minLength="6"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? t('changing') || 'Changing...' : t('saveChanges')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
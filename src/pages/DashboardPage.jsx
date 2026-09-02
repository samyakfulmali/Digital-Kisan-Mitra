import { useTranslation } from 'react-i18next';
import { useDashboardStats, useCrops, useWeather, useMandiPrices, useFarmerProfile } from '../hooks';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { crops, loading: cropsLoading } = useCrops();
  const { weather, forecast, loading: weatherLoading } = useWeather(''); // Would use farmer's location in real app
  const { prices, loading: mandiLoading } = useMandiPrices({ limit: 5 });
  const { profile, loading: profileLoading } = useFarmerProfile();
  
  const userName = profile?.name || t('farmer');

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{t('welcomeBack', { name: userName })}</h1>
        <p className="text-gray-600 max-w-md text-center">
          {t('dashboardSubtitle') || 'Get insights and manage your farm efficiently'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Crops */}
        <div className="card">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-medium text-gray-600">{t('totalCrops')}</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCrops || crops.length || 0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-primary-50 text-primary-600 rounded-lg">
              {/* Crop icon */}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Active Irrigation */}
        <div className="card">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-medium text-gray-600">{t('activeIrrigation')}</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.activeIrrigation || 0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 110-4 2 2 0 010 4zm6 8a2 2 0 100-4 2 2 0 000 4zM3 8l8 4 8-4M3 16l8-4 8 4"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        <div className="card">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-medium text-gray-600">{t('weatherAlert')}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {weather?.temperature ? `${Math.round(weather.temperature)}°C` : '--'}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-yellow-50 text-yellow-600 rounded-lg">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Market Update */}
        <div className="card">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-medium text-gray-600">{t('marketUpdate')}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {prices.length > 0 ? `₹${prices[0]?.price?.toFixed(2)}` : '--'}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center bg-green-50 text-green-600 rounded-lg">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-800">{t('recentActivity')}</h2>
          <Link to="/crops" className="text-sm text-primary-600 hover:text-primary-700">
            {t('viewAll')} {t('crops')}
          </Link>
        </div>
        <div className="card-body">
          {cropsLoading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-8 h-8"></div>
            </div>
          ) : crops.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noRecentActivity') || 'No recent activity'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {crops.slice(0, 3).map((crop) => (
                <div key={crop.id} className="flex items-center space-x-4 p-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{crop.name}</h4>
                    <p className="text-sm text-gray-500">
                      {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {new Date(crop.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/crops" className="card hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 ml-4">{t('cropManagement')}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {t('manageYourCrops') || 'Add, edit, and track your crops'}
            </p>
          </div>
        </Link>
        
        <Link to="/weather" className="card hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 110-4 2 2 0 010 4zm6 8a2 2 0 100-4 2 2 0 000 4zM3 8l8 4 8-4M3 16l8-4 8 4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 ml-4">{t('weather')}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {t('weatherForecast') || 'Get accurate weather forecasts for your farm'}
            </p>
          </div>
        </Link>
        
        <Link to="/mandi" className="card hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 ml-4">{t('mandiPrices')}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {t('checkMarketPrices') || 'Check latest market prices for your crops'}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
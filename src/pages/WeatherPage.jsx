import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeather } from '../hooks';

const WeatherPage = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const { weather, forecast, loading, error } = useWeather(location);
  
  // Convert temperature units
  const celsiusToFahrenheit = (c) => (c * 9/5) + 32;
  
  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    if (!condition) return '🌤️';
    const lower = condition.toLowerCase();
    if (lower.includes('clear')) return '☀️';
    if (lower.includes('cloud')) return '☁️';
    if (lower.includes('rain') || lower.includes('drizzle')) return '🌧️';
    if (lower.includes('thunderstorm')) return '⛈️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('mist') || lower.includes('fog') || lower.includes('haze')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('weather')}</h1>
        <p className="text-gray-600 max-w-md text-center">
          {t('weatherSubtitle') || 'Get accurate weather forecasts for your farm'}
        </p>
      </div>

      {/* Location Controls */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={useCurrentLocation}
                  onChange={(e) => setUseCurrentLocation(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                {t('useCurrentLocation')}
              </label>
            </div>
            
            {!useCurrentLocation && (
              <div className="flex w-full max-w-md">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && setLocation(e.target.value)}
                  className="input flex-1"
                  placeholder="Enter city or location"
                />
                <button
                  onClick={() => setLocation(location)}
                  className="btn btn-primary ml-2"
                >
                  {t('search')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Weather */}
      {weather && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-800">{t('currentWeather')}</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 text-center">
              <div>
                <div className="text-4xl font-bold">{getWeatherIcon(weather.condition)}</div>
                <p className="text-sm text-gray-600">{weather.condition || t('unknown')}</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">
                  {Math.round(weather.temperature)}°C
                  <span className="text-sm text-gray-500 ml-2">
                    ({Math.round(celsiusToFahrenheit(weather.temperature))}°F)
                  </span>
                </div>
                <p className="text-sm text-gray-600">{t('temperature')}</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{weather.humidity}%</div>
                <p className="text-sm text-gray-600">{t('humidity')}</p>
              </div>
              <div>
                <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
                <p className="text-sm text-gray-600">{t('windSpeed')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-800">{t('forecast')}</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {forecast.map((day, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getWeatherIcon(day.condition)}</div>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">
                          {index === 0 ? t('today') : index === 1 ? t('tomorrow') : new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                        </p>
                        <p className="text-sm text-gray-500">{day.condition || t('unknown')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-right">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">
                          {Math.round(day.maxTemp)}°C/<br className="hidden sm:inline" />{Math.round(day.minTemp)}°C
                        </p>
                        <p className="text-sm text-gray-500">{t('highLow')}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {day.precipitationChance}% {t('precipitationChance')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {(!weather || loading) && (
        <div className="card">
          <div className="card-body">
            <div className="flex h-64 items-center justify-center">
              <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-8 h-8"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !weather && (
        <div className="card">
          <div className="card-body">
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => {
                  if (useCurrentLocation) {
                    // Try to get current location again
                  } else {
                    setLocation(location);
                  }
                }}
                className="btn btn-outline"
              >
                {t('retry')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
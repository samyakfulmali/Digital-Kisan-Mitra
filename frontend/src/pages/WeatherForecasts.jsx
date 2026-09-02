import { useState, useEffect } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Snowflake, 
  Wind, 
  Droplet, 
  Thermometer, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const WeatherForecasts = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock current weather
        setCurrentWeather({
          temperature: 28,
          feelsLike: 30,
          humidity: 65,
          pressure: 1012,
          windSpeed: 12,
          windDirection: 'SW',
          condition: 'partly-cloudy',
          visibility: 10,
          uvIndex: 6,
          lastUpdated: new Date()
        });
        
        // Mock hourly forecast (next 24 hours)
        const hourly = [];
        for (let i = 0; i < 24; i++) {
          const hour = new Date();
          hour.setHours(hour.getHours() + i);
          hourly.push({
            time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
            condition: ['sunny', 'partly-cloudy', 'cloudy', 'light-rain'][Math.floor(Math.random() * 4)],
            precipitation: Math.floor(Math.random() * 20) // 0-20%
          });
        }
        setHourlyForecast(hourly);
        
        // Mock daily forecast (next 7 days)
        const daily = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
          const day = new Date();
          day.setDate(day.getDate() + i);
          daily.push({
            day: days[day.getDay()],
            date: day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            high: Math.floor(Math.random() * 10) + 30, // 30-40°C
            low: Math.floor(Math.random() * 10) + 20,  // 20-30°C
            condition: ['sunny', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm'][Math.floor(Math.random() * 5)],
            precipitation: Math.floor(Math.random() * 100) // 0-100%
          });
        }
        setDailyForecast(daily);
        
        // Mock weather alerts
        setAlerts([
          {
            id: 1,
            title: 'Heavy Rainfall Warning',
            description: 'Expect heavy rainfall (50-75mm) in the next 24 hours',
            severity: 'moderate',
            issued: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
          }
        ]);
        
      } catch (err) {
        setError('Failed to fetch weather data. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Get user location (simulated)
    setLocation('Punjab, India');
    fetchWeatherData();
  }, []);

  const getConditionIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <CloudSun className="h-5 w-5" />;
      case 'partly-cloudy': return <CloudSun className="h-5 w-5" />;
      case 'cloudy': return <CloudSun className="h-5 w-5" />;
      case 'light-rain': return <CloudRain className="h-5 w-5" />;
      case 'rain': return <CloudRain className="h-5 w-5" />;
      case 'thunderstorm': return <CloudRain className="h-5 w-5" />;
      case 'snow': return <Snowflake className="h-5 w-5" />;
      default: return <CloudSun className="h-5 w-5" />;
    }
  };

  const getConditionText = (condition) => {
    switch (condition) {
      case 'sunny': return 'Sunny';
      case 'partly-cloudy': return 'Partly Cloudy';
      case 'cloudy': return 'Cloudy';
      case 'light-rain': return 'Light Rain';
      case 'rain': return 'Rain';
      case 'thunderstorm': return 'Thunderstorm';
      case 'snow': return 'Snow';
      default: return condition;
    }
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  if (isLoading && !currentWeather && hourlyForecast.length === 0) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Weather Forecasts
        </h1>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Update
          </button>
        </div>
      </div>

      {/* Current Weather */}
      {currentWeather && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-4xl font-bold">
                {currentWeather.temperature}°C
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                  {getConditionText(currentWeather.condition)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Feels like {currentWeather.feelsLike}°C
                </p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{currentWeather.humidity}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {currentWeather.windSpeed} km/h {getWindDirection(225)} // SW as example
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <div>
              <p>Pressure</p>
              <p className="font-medium">{currentWeather.pressure} hPa</p>
              <Thermometer className="h-4 w-4 mt-1" />
            </div>
            <div>
              <p>Visibility</p>
              <p className="font-medium">{currentWeather.visibility} km</p>
              <Droplet className="h-4 w-4 mt-1 text-blue-500" />
            </div>
            <div>
              <p>UV Index</p>
              <p className="font-medium">{currentWeather.uvIndex}</p>
              <AlertTriangle className="h-4 w-4 mt-1 text-yellow-500" />
            </div>
            <div>
              <p>Last Updated</p>
              <p className="font-medium text-xs">
                {currentWeather.lastUpdated.toLocaleTimeString()}
              </p>
              <RefreshCw className="h-4 w-4 mt-1" />
            </div>
          </div>
        </div>
      )}

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Weather Alerts
            </h2>
            <button
              onClick={() => {}}
              className="text-sm text-green-600 hover:text-green-800 dark:hover:text-green-300"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      {alert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {alert.description}
                    </p>
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">
                    {alert.severity.toUpperCase()}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Issued: {new Date(alert.issued).toLocaleString()} |
                  Expires: {new Date(alert.expires).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hourly Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hourly Forecast
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[600px] space-x-3">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex-shrink-0 w-24">
                <div className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{hour.time}</p>
                  <div className="h-6 w-6 mx-auto mb-2">
                    {getConditionIcon(hour.condition)}
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{hour.temperature}°C</p>
                  {hour.precipitation > 0 && (
                    <p className="text-xs text-blue-500 mt-1">
                      {hour.precipitation}% chance
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            7-Day Forecast
          </h2>
        </div>
        
        <div className="space-y-3">
          {dailyForecast.map((day, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-center min-w-16">
                  <p className="font-medium text-gray-900 dark:text-white">{day.day}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{day.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getConditionIcon(day.condition)}
                </div>
                <div className="flex-1 space-x-4">
                  <div className="flex-1 text-right">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{day.high}°</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">High</p>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{day.low}°</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Low</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{day.precipitation}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Precipitation</p>
                <Droplet className="h-4 w-4 mt-1 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecasts;
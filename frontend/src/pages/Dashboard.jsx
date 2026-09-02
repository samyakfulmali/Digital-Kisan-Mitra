import { useState, useEffect } from 'react';
import { 
  Sprout, 
  Image, 
  Droplet, 
  CloudSun, 
  Truck, 
  Thermometer, 
  BarChart2, 
  MessageSquare,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    crops: 0,
    diseasesDetected: 0,
    fertilizerRecommendations: 0,
    weatherAlerts: 0,
    mandiUpdates: 0,
    irrigationSchedules: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    humidity: '--',
    rainfall: '--',
    condition: 'Loading...'
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for charts
  const cropData = [
    { name: 'Jan', wheat: 40, rice: 24, sugarcane: 18 },
    { name: 'Feb', wheat: 30, rice: 13, sugarcane: 24 },
    { name: 'Mar', wheat: 20, rice: 34, sugarcane: 22 },
    { name: 'Apr', wheat: 27, rice: 43, sugarcane: 25 },
    { name: 'May', wheat: 20, rice: 34, sugarcane: 22 },
    { name: 'Jun', wheat: 40, rice: 24, sugarcane: 18 },
    { name: 'Jul', wheat: 30, rice: 13, sugarcane: 24 },
  ];

  useEffect(() => {
    // Simulate API calls
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate fetching stats
      setTimeout(() => {
        setStats({
          crops: 5,
          diseasesDetected: 2,
          fertilizerRecommendations: 8,
          weatherAlerts: 1,
          mandiUpdates: 3,
          irrigationSchedules: 4
        });
        
        // Simulate recent activity
        setRecentActivity([
          {
            id: 1,
            type: 'disease',
            title: 'Potential disease detected in wheat crop',
            time: '2 hours ago',
            icon: <Image className="h-4 w-4 text-red-500" />,
            color: 'red'
          },
          {
            id: 2,
            type: 'weather',
            title: 'Heavy rainfall expected in your region',
            time: '4 hours ago',
            icon: <CloudSun className="h-4 w-4 text-yellow-500" />,
            color: 'yellow'
          },
          {
            id: 3,
            type: 'market',
            title: 'Wheat prices increased by 5% in mandi',
            time: '1 day ago',
            icon: <Truck className="h-4 w-4 text-green-500" />,
            color: 'green'
          }
        ]);
        
        // Simulate weather data
        setWeatherData({
          temperature: '28°C',
          humidity: '65%',
          rainfall: '2.1mm',
          condition: 'Partly Cloudy'
        });
        
        setIsLoading(false);
      }, 1500);
    };

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col items-center text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back, Farmer!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl">
          Here's an overview of your farm activities and insights
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Crops Managed</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">Updated today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.crops}</p>
        </div>

        <div className="stat-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Image className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Disease Alerts</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">{stats.diseasesDetected} new</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.diseasesDetected}</p>
        </div>

        <div className="stat-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Fertilizer Tips</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">{stats.fertilizerRecommendations} this week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.fertilizerRecommendations}</p>
        </div>
      </div>

      {/* Weather Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Weather Update
          </h2>
          <button className="text-sm text-green-600 hover:text-green-800 dark:hover:text-green-300">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weatherData.temperature}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weatherData.humidity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rainfall</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weatherData.rainfall}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Condition</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white capitalize">{weatherData.condition}</p>
          </div>
        </div>
        
        {weatherData.condition.toLowerCase().includes('rain') && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Consider delaying irrigation due to expected rainfall</span>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-sm text-green-600 hover:text-green-800 dark:hover:text-green-300">
            View All
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading activity...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {activity.icon}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button 
          onClick={() => {}} 
          className="quick-action bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Image className="mx-auto h-6 w-6 mb-3 text-green-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Crop Disease Detection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Upload leaf photo for instant analysis</p>
        </button>
        
        <button 
          onClick={() => {}} 
          className="quick-action bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Droplet className="mx-auto h-6 w-6 mb-3 text-blue-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fertilizer Advisor</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized fertilizer recommendations</p>
        </button>
        
        <button 
          onClick={() => {}} 
          className="quick-action bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <CloudSun className="mx-auto h-6 w-6 mb-3 text-yellow-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Weather Forecast</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get 7-day forecast and alerts</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
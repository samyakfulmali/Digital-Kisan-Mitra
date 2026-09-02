import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  Image, 
  Droplet, 
  CloudSun, 
  Truck, 
  Thermometer, 
  BarChart2, 
  MessageSquare, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex-shrink-0 flex items-center px-4 py-6 border-b dark:border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🌱</span>
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            Kisan Mitra
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 flex-1 overflow-y-auto">
          <div className="px-4">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              MAIN
            </p>
          </div>
          
          <div className="mt-6 space-y-2">
            <Link to="/" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <LayoutDashboard className="mr-3 h-4 w-4 flex-shrink-0" />
              Dashboard
            </Link>

            <Link to="/crop-management" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <Sprout className="mr-3 h-4 w-4 flex-shrink-0" />
              Crop Management
            </Link>

            <Link to="/disease-detection" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <Image className="mr-3 h-4 w-4 flex-shrink-0" />
              Disease Detection
            </Link>

            <Link to="/fertilizer" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <Droplet className="mr-3 h-4 w-4 flex-shrink-0" />
              Fertilizer
            </Link>

            <Link to="/weather" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <CloudSun className="mr-3 h-4 w-4 flex-shrink-0" />
              Weather
            </Link>

            <Link to="/mandi" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <Truck className="mr-3 h-4 w-4 flex-shrink-0" />
              Mandi Prices
            </Link>

            <Link to="/irrigation" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <Thermometer className="mr-3 h-4 w-4 flex-shrink-0" />
              Irrigation
            </Link>

            <Link to="/analytics" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              activeClassName="bg-green-50 dark:bg-gray-900/50 text-green-600 dark:text-green-400"
            >
              <BarChart2 className="mr-3 h-4 w-4 flex-shrink-0" />
              Analytics
            </Link>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="px-4 pt-4 pb-8 space-y-2">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            MORE
          </div>
          
          <div className="space-y-1">
            <Link to="/chatbot" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              <MessageSquare className="mr-3 h-4 w-4 flex-shrink-0" />
              AI Chatbot
            </Link>

            <Link to="/settings" 
              className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              <Settings className="mr-3 h-4 w-4 flex-shrink-0" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
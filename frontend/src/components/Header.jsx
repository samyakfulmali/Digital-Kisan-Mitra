import { useState } from 'react';
import { Menu, Sun, Moon, Globe, User, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // en, hi, mr

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' }
  ];

  return (
    <header className={`header bg-white dark:bg-gray-800 shadow-md ${isDarkMode ? 'dark:border-b-gray-700' : 'border-b'} `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🌱</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Digital Kisan Mitra
          </h1>
        </div>

        {/* Navigation and Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => {}}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.name}
              <span className="ml-1 text-xs">▼</span>
            </button>
            {/* Language dropdown would go here */}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Bell className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <User className="text-white text-sm" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Farmer Name</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/crop-management" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Crop Management
            </Link>
            <Link to="/disease-detection" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Disease Detection
            </Link>
            <Link to="/fertilizer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Fertilizer
            </Link>
            <Link to="/weather" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Weather
            </Link>
            <Link to="/mandi" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Mandi Prices
            </Link>
            <Link to="/irrigation" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Irrigation
            </Link>
            <Link to="/analytics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              Analytics
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
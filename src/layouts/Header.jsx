import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 7h4m6-4v4m3-4H9m8 3v4m-9 4h.002M7 11h10m-9 4v4m4 0h4m-3-3v4m3 3l4-4m0 0l-4-4m4 4H7m4 4v4"></path>
                </svg>
              </div>
              <span className="self-center text-xl font-semibold text-gray-800">{t('appName')}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                <Globe className="h-4 w-4" />
                <span>{t('selectLanguage')}</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-20">
                <button onClick={() => i18n.changeLanguage('en')} className="flex w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t('english')}</span>
                </button>
                <button onClick={() => i18n.changeLanguage('hi')} className="flex w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t('hindi')}</span>
                </button>
                <button onClick={() => i18n.changeLanguage('mr')} className="flex w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  <span>{t('marathi')}</span>
                </button>
              </div>
            </div>
            
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name?.split(' ')[0] || ''}</span>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="mr-2 h-4 w-4" /> {t('profile')}
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  {t('login')}
                </Link>
                <Link to="/register" className="btn btn-primary">
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
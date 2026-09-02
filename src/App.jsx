import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CropManagementPage from './pages/CropManagementPage';
import WeatherPage from './pages/WeatherPage';
import MandiPricePage from './pages/MandiPricePage';

function App() {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={[
                <Navigate to="/dashboard" replace />,
                <DashboardPage />
              ]} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/crops" element={<CropManagementPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/mandi" element={<MandiPricePage />} />
              
              {/* 404 page */}
              <Route path="*" element={
                <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-6 py-12">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('404') || 'Page Not Found'}</h1>
                  <p className="text-gray-600 mb-6">{t('pageNotFound') || 'The page you are looking for does not exist.'}</p>
                  <button onClick={() => window.history.back()} className="btn btn-outline">
                    {t('goBack') || 'Go Back'}
                  </button>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
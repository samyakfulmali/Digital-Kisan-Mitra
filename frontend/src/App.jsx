import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FarmerRegistration from './pages/FarmerRegistration';
import CropManagement from './pages/CropManagement';
import DiseaseDetection from './pages/DiseaseDetection';
import FertilizerRecommendations from './pages/FertilizerRecommendations';
import WeatherForecasts from './pages/WeatherForecasts';
import MandiPrices from './pages/MandiPrices';
import IrrigationReminders from './pages/IrrigationReminders';
import FarmRecordsAnalytics from './pages/FarmRecordsAnalytics';
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/register" element={<FarmerRegistration />} />
            
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crop-management" element={<CropManagement />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/fertilizer" element={<FertilizerRecommendations />} />
              <Route path="/weather" element={<WeatherForecasts />} />
              <Route path="/mandi" element={<MandiPrices />} />
              <Route path="/irrigation" element={<IrrigationReminders />} />
              <Route path="/analytics" element={<FarmRecordsAnalytics />} />
            </Route>
          </Routes>
          
          {/* Global AI Chatbot */}
          <AIChatbot />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
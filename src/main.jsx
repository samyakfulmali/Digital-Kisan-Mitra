import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// i18n setup
import i18n from './i18n'
import { useEffect } from 'react'

// Set document language based on current i18n language
function LanguageDetector() {
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
  }, [i18n.language]);
  
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageDetector />
    <App />
  </React.StrictMode>
)
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    app: {
      title: 'Digital Kisan Mitra',
      tagline: 'Smart Farming Assistant'
    },
    nav: {
      dashboard: 'Dashboard',
      cropManagement: 'Crop Management',
      diseaseDetection: 'Disease Detection',
      fertilizer: 'Fertilizer',
      weather: 'Weather',
      mandi: 'Mandi Prices',
      irrigation: 'Irrigation',
      analytics: 'Analytics',
      chatbot: 'AI Chatbot',
      settings: 'Settings'
    },
    auth: {
      register: 'Register',
      login: 'Login',
      name: 'Full Name',
      phone: 'Phone Number',
      village: 'Village / Location',
      submit: 'Register Farmer',
      success: 'Farmer registered successfully!',
      alreadyRegistered: 'Already registered? Login here'
    },
    dashboard: {
      welcome: 'Welcome Back, Farmer!',
      subtitle: 'Here is an overview of your farm activities and insights',
      cropsManaged: 'Crops Managed',
      diseaseAlerts: 'Disease Alerts',
      fertilizerTips: 'Fertilizer Tips',
      weatherUpdate: 'Weather Update',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      temperature: 'Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall',
      condition: 'Condition'
    },
    crops: {
      title: 'Crop Management',
      addCrop: 'Add Crop',
      editCrop: 'Edit Crop',
      name: 'Crop Name',
      variety: 'Variety',
      plantingDate: 'Planting Date',
      expectedHarvest: 'Expected Harvest',
      area: 'Area (acres)',
      status: 'Status',
      statusOptions: {
        planning: 'Planning',
        planting: 'Planting',
        growing: 'Growing',
        harvested: 'Harvested'
      },
      health: 'Health',
      noCrops: 'No crops added yet'
    },
    disease: {
      title: 'AI Crop Disease Detection',
      subtitle: 'Upload a photo of your crop leaves to get instant AI-powered disease diagnosis',
      upload: 'Click to upload or drag and drop',
      analyze: 'Analyze Image',
      reset: 'Reset',
      diagnosis: 'Diagnosis',
      confidence: 'Confidence',
      severity: 'Severity',
      affectedArea: 'Area Affected',
      recommendations: 'Treatment Recommendations',
      healthy: 'Healthy',
      leafRust: 'Leaf Rust',
      powderyMildew: 'Powdery Mildew'
    },
    fertilizer: {
      title: 'Fertilizer Recommendations',
      subtitle: 'Get personalized fertilizer plans based on your crop and soil conditions',
      cropType: 'Crop Type',
      growthStage: 'Growth Stage',
      soilType: 'Soil Type',
      region: 'Region',
      previousCrop: 'Previous Crop',
      getRecommendations: 'Get Recommendations',
      primaryFertilizer: 'Primary Fertilizer',
      secondaryFertilizers: 'Secondary Fertilizers',
      micronutrients: 'Micronutrients',
      applicationSchedule: 'Application Schedule',
      expertTips: 'Expert Tips',
      expectedOutcome: 'Expected Outcome'
    },
    weather: {
      title: 'Weather Forecasts',
      currentWeather: 'Current Weather',
      hourlyForecast: 'Hourly Forecast',
      dailyForecast: '7-Day Forecast',
      weatherAlerts: 'Weather Alerts',
      temperature: 'Temperature',
      humidity: 'Humidity',
      wind: 'Wind',
      pressure: 'Pressure',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      precipitation: 'Precipitation',
      high: 'High',
      low: 'Low'
    },
    mandi: {
      title: 'Live Mandi Prices',
      search: 'Search commodity, variety, or mandi...',
      refresh: 'Refresh Prices',
      sortBy: 'Sort by:',
      name: 'Name',
      price: 'Price',
      change: 'Change',
      priceTrends: 'Price Trends (Last 30 Days)',
      commodity: 'Commodity',
      variety: 'Variety',
      mandi: 'Mandi'
    },
    irrigation: {
      title: 'Irrigation Reminders',
      addSchedule: 'Add Schedule',
      aiSuggestions: 'AI Suggestions',
      field: 'Field Name',
      crop: 'Crop Type',
      variety: 'Variety',
      date: 'Date',
      time: 'Time',
      duration: 'Duration (hours)',
      waterAmount: 'Water Amount (mm)',
      method: 'Method',
      priority: 'Priority',
      notes: 'Notes',
      methods: {
        drip: 'Drip Irrigation',
        sprinkler: 'Sprinkler',
        flood: 'Flood Irrigation',
        pivot: 'Center Pivot',
        manual: 'Manual'
      },
      priorities: {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      },
      status: {
        pending: 'Pending',
        completed: 'Completed'
      }
    },
    analytics: {
      title: 'Farm Records & Analytics',
      totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses',
      netProfit: 'Net Profit',
      activeFields: 'Active Fields',
      yieldTrends: 'Yield Trends',
      expenseBreakdown: 'Expense Breakdown',
      monthlyProfit: 'Monthly Profit/Loss',
      cropPerformance: 'Crop Performance',
      recentTransactions: 'Recent Transactions',
      addRecord: 'Add Record',
      timeframe: 'Timeframe'
    },
    chatbot: {
      title: 'AI Farming Assistant',
      placeholder: 'Ask me anything about farming...',
      send: 'Send',
      welcome: 'Hello! I am your AI farming assistant. How can I help you today?',
      thinking: 'Thinking...'
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      close: 'Close',
      submit: 'Submit',
      update: 'Update',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      print: 'Print',
      share: 'Share',
      language: 'Language',
      english: 'English',
      hindi: 'Hindi',
      marathi: 'Marathi'
    }
  },
  hi: {
    app: {
      title: 'डिजिटल किसान मित्र',
      tagline: 'स्मार्ट फार्मिंग असिस्टेंट'
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      cropManagement: 'फसल प्रबंधन',
      diseaseDetection: 'रोग पहचान',
      fertilizer: 'उर्वरक',
      weather: 'मौसम',
      mandi: 'मंडी भाव',
      irrigation: 'सिंचाई',
      analytics: 'विश्लेषण',
      chatbot: 'AI चैटबॉट',
      settings: 'सेटिंग्स'
    },
    auth: {
      register: 'पंजीकरण',
      login: 'लॉगिन',
      name: 'पूरा नाम',
      phone: 'फोन नंबर',
      village: 'गांव / स्थान',
      submit: 'किसान पंजीकृत करें',
      success: 'किसान सफलतापूर्वक पंजीकृत!',
      alreadyRegistered: 'पहले से पंजीकृत हैं? यहां लॉगिन करें'
    },
    dashboard: {
      welcome: 'वापसी पर स्वागत है, किसान!',
      subtitle: 'आपकी कृषि गतिविधियों और अंतर्दृष्टि का अवलोकन',
      cropsManaged: 'प्रबंधित फसलें',
      diseaseAlerts: 'रोग अलर्ट',
      fertilizerTips: 'उर्वरक सुझाव',
      weatherUpdate: 'मौसम अपडेट',
      recentActivity: 'हाल की गतिविधि',
      quickActions: 'त्वरित कार्य',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      rainfall: 'वर्षा',
      condition: 'स्थिति'
    },
    crops: {
      title: 'फसल प्रबंधन',
      addCrop: 'फसल जोड़ें',
      editCrop: 'फसल संपादित करें',
      name: 'फसल का नाम',
      variety: 'किस्म',
      plantingDate: 'बुवाई की तारीख',
      expectedHarvest: 'अपेक्षित कटाई',
      area: 'क्षेत्र (एकड़)',
      status: 'स्थिति',
      statusOptions: {
        planning: 'योजना',
        planting: 'बुवाई',
        growing: 'बढ़ रही',
        harvested: 'काटी गई'
      },
      health: 'स्वास्थ्य',
      noCrops: 'कोई फसल नहीं जोड़ी गई'
    },
    disease: {
      title: 'AI फसल रोग पहचान',
      subtitle: 'अपनी फसल के पत्तों की फोटो अपलोड करें और तत्काल AI-संचालित रोग निदान प्राप्त करें',
      upload: 'अपलोड करने के लिए क्लिक करें या ड्रैग करें',
      analyze: 'छवि विश्लेषण करें',
      reset: 'रीसेट',
      diagnosis: 'निदान',
      confidence: 'आत्मविश्वास',
      severity: 'गंभीरता',
      affectedArea: 'प्रभावित क्षेत्र',
      recommendations: 'उपचार सिफारिशें',
      healthy: 'स्वस्थ',
      leafRust: 'पत्ती जंग',
      powderyMildew: 'पाउडरी मिल्ड्यू'
    },
    fertilizer: {
      title: 'उर्वरक सिफारिशें',
      subtitle: 'अपनी फसल और मिट्टी की स्थिति के आधार पर व्यक्तिगत उर्वरक योजनाएं प्राप्त करें',
      cropType: 'फसल का प्रकार',
      growthStage: 'विकास चरण',
      soilType: 'मिट्टी का प्रकार',
      region: 'क्षेत्र',
      previousCrop: 'पिछली फसल',
      getRecommendations: 'सिफारिशें प्राप्त करें',
      primaryFertilizer: 'प्राथमिक उर्वरक',
      secondaryFertilizers: 'द्वितीयक उर्वरक',
      micronutrients: 'सूक्ष्म पोषक तत्व',
      applicationSchedule: 'आवेदन अनुसूची',
      expertTips: 'विशेषज्ञ सुझाव',
      expectedOutcome: 'अपेक्षित परिणाम'
    },
    weather: {
      title: 'मौसम पूर्वानुमान',
      currentWeather: 'वर्तमान मौसम',
      hourlyForecast: 'प्रति घंटा पूर्वानुमान',
      dailyForecast: '7-दिन पूर्वानुमान',
      weatherAlerts: 'मौसम अलर्ट',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      wind: 'हवा',
      pressure: 'दबाव',
      visibility: 'दृश्यता',
      uvIndex: 'यूवी सूचकांक',
      precipitation: 'वर्षा',
      high: 'उच्च',
      low: 'निम्न'
    },
    mandi: {
      title: 'लाइव मंडी भाव',
      search: 'कमोडिटी, किस्म या मंडी खोजें...',
      refresh: 'भाव ताज़ा करें',
      sortBy: 'क्रमबद्ध करें:',
      name: 'नाम',
      price: 'भाव',
      change: 'परिवर्तन',
      priceTrends: 'भाव रुझान (पिछले 30 दिन)',
      commodity: 'कमोडिटी',
      variety: 'किस्म',
      mandi: 'मंडी'
    },
    irrigation: {
      title: 'सिंचाई अनुस्मारक',
      addSchedule: 'अनुसूची जोड़ें',
      aiSuggestions: 'AI सुझाव',
      field: 'क्षेत्र का नाम',
      crop: 'फसल का प्रकार',
      variety: 'किस्म',
      date: 'तारीख',
      time: 'समय',
      duration: 'अवधि (घंटे)',
      waterAmount: 'पानी की मात्रा (मिमी)',
      method: 'विधि',
      priority: 'प्राथमिकता',
      notes: 'नोट्स',
      methods: {
        drip: 'ड्रिप सिंचाई',
        sprinkler: 'स्प्रिंकलर',
        flood: 'बाढ़ सिंचाई',
        pivot: 'सेंटर पिवट',
        manual: 'मैनुअल'
      },
      priorities: {
        low: 'कम',
        medium: 'मध्यम',
        high: 'उच्च'
      },
      status: {
        pending: 'लंबित',
        completed: 'पूर्ण'
      }
    },
    analytics: {
      title: 'फार्म रिकॉर्ड और विश्लेषण',
      totalIncome: 'कुल आय',
      totalExpenses: 'कुल खर्च',
      netProfit: 'शुद्ध लाभ',
      activeFields: 'सक्रिय खेत',
      yieldTrends: 'उपज रुझान',
      expenseBreakdown: 'खर्च विवरण',
      monthlyProfit: 'मासिक लाभ/हानि',
      cropPerformance: 'फसल प्रदर्शन',
      recentTransactions: 'हाल के लेनदेन',
      addRecord: 'रिकॉर्ड जोड़ें',
      timeframe: 'समय सीमा'
    },
    chatbot: {
      title: 'AI कृषि सहायक',
      placeholder: 'कृषि के बारे में कुछ भी पूछें...',
      send: 'भेजें',
      welcome: 'नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      thinking: 'सोच रहा हूं...'
    },
    common: {
      save: 'सहेजें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      confirm: 'पुष्टि करें',
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      success: 'सफलता',
      close: 'बंद करें',
      submit: 'जमा करें',
      update: 'अपडेट करें',
      add: 'जोड़ें',
      search: 'खोजें',
      filter: 'फिल्टर',
      export: 'निर्यात करें',
      import: 'आयात करें',
      print: 'प्रिंट करें',
      share: 'साझा करें',
      language: 'भाषा',
      english: 'अंग्रेज़ी',
      hindi: 'हिंदी',
      marathi: 'मराठी'
    }
  },
  mr: {
    app: {
      title: 'डिजिटल किसान मित्र',
      tagline: 'स्मार्ट फार्मिंग असिस्टेंट'
    },
    nav: {
      dashboard: 'डॅशबोर्ड',
      cropManagement: 'पीक व्यवस्थापन',
      diseaseDetection: 'आजार ओळख',
      fertilizer: 'खत',
      weather: 'हवामान',
      mandi: 'मंडी भाव',
      irrigation: 'पाणी पुरवठा',
      analytics: 'विश्लेषण',
      chatbot: 'AI चॅटबॉट',
      settings: 'सेटिंग्ज'
    },
    auth: {
      register: 'नोंदणी',
      login: 'लॉगिन',
      name: 'पूर्ण नाव',
      phone: 'फोन नंबर',
      village: 'गाव / स्थान',
      submit: 'शेतकरी नोंदणी करा',
      success: 'शेतकरी यशस्वीरित्या नोंदणीकृत!',
      alreadyRegistered: 'आधीपासून नोंदणीकृत आहात? यथे लॉगिन करा'
    },
    dashboard: {
      welcome: 'परत स्वागत आहे, शेतकरी!',
      subtitle: 'तुमच्या शेती क्रियाकलाप आणि अंतर्दृष्टीचा आढावा',
      cropsManaged: 'व्यवस्थापीत पीके',
      diseaseAlerts: 'आजार सावधान',
      fertilizerTips: 'खत सूचना',
      weatherUpdate: 'हवामान अद्यतन',
      recentActivity: 'सामयिक गतिविधी',
      quickActions: 'त्वरित कृती',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      rainfall: 'पाऊस',
      condition: 'स्थिती'
    },
    crops: {
      title: 'पीक व्यवस्थापन',
      addCrop: 'पीक जोडा',
      editCrop: 'पीक संपादित करा',
      name: 'पीकाचे नाव',
      variety: 'जात',
      plantingDate: 'पेरणीची तारीख',
      expectedHarvest: 'अपेक्षित कापणी',
      area: 'क्षेत्र (एकड)',
      status: 'स्थिती',
      statusOptions: {
        planning: 'योजना',
        planting: 'पेरणी',
        growing: 'वाढत आहे',
        harvested: 'कापलेले'
      },
      health: 'आरोग्य',
      noCrops: 'कधीही पीक जोडले नाही'
    },
    disease: {
      title: 'AI पीक आजार ओळख',
      subtitle: 'तुमच्या पीकाचे पाने अपलोड करा आणि तात्काळ AI-चालित आजार निदान मिळवा',
      upload: 'अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग करा',
      analyze: 'प्रतिमा विश्लेषण करा',
      reset: 'रिसेट',
      diagnosis: 'निदान',
      confidence: 'आत्मविश्वास',
      severity: 'तीव्रता',
      affectedArea: 'प्रभावित क्षेत्र',
      recommendations: 'उपचार शिफारसी',
      healthy: 'निरोगी',
      leafRust: 'पान जंग',
      powderyMildew: 'पावडरी मिल्ड्यू'
    },
    fertilizer: {
      title: 'खत शिफारसी',
      subtitle: 'तुमच्या पीक आणि माती स्थितीनुसार वैयक्तिक खत योजना मिळवा',
      cropType: 'पीक प्रकार',
      growthStage: 'वाढ चरण',
      soilType: 'माती प्रकार',
      region: 'क्षेत्र',
      previousCrop: 'मागील पीक',
      getRecommendations: 'शिफारसी मिळवा',
      primaryFertilizer: 'प्राथमिक खत',
      secondaryFertilizers: 'द्वितीयक खत',
      micronutrients: 'सूक्ष्म पोषक तत्व',
      applicationSchedule: 'लागू करण्याची योजना',
      expertTips: 'तज्ज्ञ सूचना',
      expectedOutcome: 'अपेक्षित निकाल'
    },
    weather: {
      title: 'हवामान अंदाज',
      currentWeather: 'वर्तमान हवामान',
      hourlyForecast: 'तासभर अंदाज',
      dailyForecast: '७-दिवस अंदाज',
      weatherAlerts: 'हवामान सावधान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      wind: 'वारा',
      pressure: 'दबाव',
      visibility: 'दृश्यमानता',
      uvIndex: 'UV सूचकांक',
      precipitation: 'पाऊस',
      high: 'उच्च',
      low: 'कमी'
    },
    mandi: {
      title: 'लाइव मंडी भाव',
      search: 'कमोडिटी, जात किंवा मंडी शोधा...',
      refresh: 'भाव ताजे करा',
      sortBy: 'क्रमवारी:',
      name: 'नाव',
      price: 'भाव',
      change: 'बदल',
      priceTrends: 'भाव ट्रेंड (शेवटचे ३० दिवस)',
      commodity: 'कमोडिटी',
      variety: 'जात',
      mandi: 'मंडी'
    },
    irrigation: {
      title: 'पाणी पुरवठा आठवण',
      addSchedule: 'वेळेपत्रक जोडा',
      aiSuggestions: 'AI सूचना',
      field: 'शेताचे नाव',
      crop: 'पीक प्रकार',
      variety: 'जात',
      date: 'तारीख',
      time: 'वेळ',
      duration: 'कालावधी (तास)',
      waterAmount: 'पाण्याची प्रमाण (मिमी)',
      method: 'पद्धत',
      priority: 'प्राधान्य',
      notes: 'टीप',
      methods: {
        drip: 'ड्रिप सिंचन',
        sprinkler: 'स्प्रिंकलर',
        flood: 'पूर सिंचन',
        pivot: 'सेंटर पिव्होट',
        manual: 'मॅन्युअल'
      },
      priorities: {
        low: 'कमी',
        medium: 'मध्यम',
        high: 'उच्च'
      },
      status: {
        pending: 'प्रलंबित',
        completed: 'पूर्ण'
      }
    },
    analytics: {
      title: 'शेत रेकॉर्ड आणि विश्लेषण',
      totalIncome: 'एकूण उत्पन्न',
      totalExpenses: 'एकूण खर्च',
      netProfit: 'निव्वल नफा',
      activeFields: 'सक्रिय शेत',
      yieldTrends: 'उत्पादन ट्रेंड',
      expenseBreakdown: 'खर्च तपशील',
      monthlyProfit: 'मासिक नफा/तोटा',
      cropPerformance: 'पीक कार्यक्षमता',
      recentTransactions: 'सामयिक व्यवहार',
      addRecord: 'रेकॉर्ड जोडा',
      timeframe: 'कालावधी'
    },
    chatbot: {
      title: 'AI शेती सहाय्यक',
      placeholder: 'शेतीबाबत काहीच विचारा...',
      send: 'पाठवा',
      welcome: 'नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. आज मी तुमची कशी मदत करू शकतो?',
      thinking: 'विचार करत आहे...'
    },
    common: {
      save: 'जतन करा',
      cancel: 'रद्द करा',
      edit: 'संपादित करा',
      delete: 'हटवा',
      confirm: 'पुष्टी करा',
      loading: 'लोड होत आहे...',
      error: 'एक त्रुटी आली',
      success: 'यश',
      close: 'बंद करा',
      submit: 'सादर करा',
      update: 'अपडेट करा',
      add: 'जोडा',
      search: 'शोधा',
      filter: 'फिल्टर',
      export: 'निर्यात करा',
      import: 'आयात करा',
      print: 'प्रिंट करा',
      share: 'शेअर करा',
      language: 'भाषा',
      english: 'इंग्रजी',
      hindi: 'हिंदी',
      marathi: 'मराठी'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('kisan-mitra-language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('kisan-mitra-language', lang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return path; // fallback to key
      }
    }
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
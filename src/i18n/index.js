import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    // Common
    appName: "Digital Kisan Mitra",
    welcome: "Welcome Back",
    selectLanguage: "Select Language",
    english: "English",
    hindi: "Hindi",
    marathi: "Marathi",
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",
    dashboard: "Dashboard",
    crops: "My Crops",
    weather: "Weather",
    mandi: "Mandi Prices",
    analytics: "Analytics",
    settings: "Settings",
    home: "Home",
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    add: "Add",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    viewDetails: "View Details",
    
    // Auth
    farmerRegistration: "Farmer Registration",
    farmerLogin: "Farmer Login",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    address: "Address",
    city: "City",
    state: "State",
    pincode: "PIN Code",
    farmSize: "Farm Size (in acres)",
    cropsGrown: "Crops Grown",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUp: "Sign Up",
    signIn: "Sign In",
    
    // Dashboard
    welcomeBack: "Welcome back, {name}!",
    totalCrops: "Total Crops",
    activeIrrigation: "Active Irrigation",
    weatherAlert: "Weather Alert",
    marketUpdate: "Market Update",
    recentActivity: "Recent Activity",
    noRecentActivity: "No recent activity",
    viewAll: "View All",
    
    // Crop Management
    addCrop: "Add New Crop",
    editCrop: "Edit Crop",
    cropName: "Crop Name",
    plantingDate: "Planting Date",
    expectedHarvest: "Expected Harvest Date",
    area: "Area (acres)",
    variety: "Variety",
    status: "Status",
    planting: "Planting",
    growing: "Growing",
    readyForHarvest: "Ready for Harvest",
    harvested: "Harvested",
    harvest: "Harvest",
    lastUpdated: "Last Updated",
    
    // Weather
    currentWeather: "Current Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    precipitation: "Precipitation",
    forecast: "Forecast",
    today: "Today",
    tomorrow: "Tomorrow",
    next3Days: "Next 3 Days",
    next7Days: "Next 7 Days",
    
    // Mandi Prices
    mandiPrices: "Mandi Prices",
    selectCrop: "Select Crop",
    selectMarket: "Select Market",
    price: "Price",
    unit: "Unit",
    market: "Market",
    lastUpdated: "Last Updated",
    priceTrend: "Price Trend",
    increasing: "Increasing",
    decreasing: "Decreasing",
    stable: "Stable",
    
    // Profile
    profileInfo: "Profile Information",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    notificationPreferences: "Notification Preferences",
    languagePreferences: "Language Preferences",
    saveChanges: "Save Changes",
    
    // Messages
    success: "Success!",
    error: "Error occurred",
    registrationSuccess: "Registration successful! Please login.",
    loginSuccess: "Login successful!",
    logoutSuccess: "Logged out successfully",
    profileUpdated: "Profile updated successfully",
    cropAdded: "Crop added successfully",
    cropUpdated: "Crop updated successfully",
    cropDeleted: "Crop deleted successfully",
    enterValidMobile: "Please enter a valid mobile number",
    passwordsDontMatch: "Passwords don't match",
    fillAllFields: "Please fill all required fields"
  }
};

// Hindi translations
const hi = {
  translation: {
    // Common
    appName: "डिजिटल किसान मित्र",
    welcome: "स्वागत है",
    selectLanguage: "भाषा चुनें",
    english: "अंग्रेजी",
    hindi: "हिंदी",
    marathi: "मराठी",
    login: "लॉग इन",
    register: "पंजीकरण",
    logout: "लॉग आउट",
    profile: "प्रोफाइल",
    dashboard: "डैशबोर्ड",
    crops: "मेरी फसलें",
    weather: "मौसम",
    mandi: "मंडी कीमतें",
    analytics: "विश्लेषण",
    settings: "सेटिंग्स",
    home: "होम",
    loading: "लोड हो रहा है...",
    submit: "제출",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएँ",
    save: "सहेजें",
    add: "जोड़ें",
    search: "खोजें",
    filter: "फ़िल्टर",
    sort: "क्रमबद्ध करें",
    viewDetails: "विवरण देखें",
    
    // Auth
    farmerRegistration: "किसान पंजीकरण",
    farmerLogin: "किसान लॉग इन",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    email: "ईमेल पता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    address: "पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिन कोड",
    farmSize: "फार्म का आकार (एकड़ में)",
    cropsGrown: "उगाई जाने वाली फसलें",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    signUp: "साइन अप",
    signIn: "साइन इन",
    
    // Dashboard
    welcomeBack: "स्वागत है वापस, {name}!",
    totalCrops: "कुल फसलें",
    activeIrrigation: "सक्रिय सिंचाई",
    weatherAlert: "मौसम चेतावनी",
    marketUpdate: "बाजार अपडेट",
    recentActivity: "हाल की गतिविधि",
    noRecentActivity: "कोई हाल की गतिविधि नहीं",
    viewAll: "सभी देखें",
    
    // Crop Management
    addCrop: "नई फसल जोड़ें",
    editCrop: "फसल संपादित करें",
    cropName: "फसल का नाम",
    plantingDate: "बुआई की तारीख",
    expectedHarvest: "उम्मीद की गई कटाई तारीख",
    area: "क्षेत्र (एकड़)",
    variety: "जैविक विविधता",
    status: "स्थिति",
    planting: "बुआई",
    growing: "विकास",
    readyForHarvest: "कटाई के लिए तैयार",
    harvested: "कटाई की गई",
    harvest: "कटाई करें",
    lastUpdated: "अंतिम अपडेट",
    
    // Weather
    currentWeather: "वर्तमान मौसम",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    precipitation: "वर्षा",
    forecast: "पूर्वानुमान",
    today: "आज",
    tomorrow: "कल",
    next3Days: "अगले 3 दिन",
    next7Days: "अगले 7 दिन",
    
    // Mandi Prices
    mandiPrices: "मंडी कीमतें",
    selectCrop: "फसल चुनें",
    selectMarket: "बाजार चुनें",
    price: "कीमत",
    unit: "इकाई",
    market: "बाजार",
    lastUpdated: "अंतिम अपडेट",
    priceTrend: "कीमत प्रवृत्ति",
    increasing: "बढ़ रही है",
    decreasing: "घट रही है",
    stable: "स्थिर",
    
    // Profile
    profileInfo: "प्रोफ़ाइल जानकारी",
    updateProfile: "प्रोफ़ाइल अपडेट करें",
    changePassword: "पासवर्ड बदलें",
    notificationPreferences: "अधिसूचना वरीयताएँ",
    languagePreferences: "भाषा वरीयताएँ",
    saveChanges: "परिवर्तन सहेजें",
    
    // Messages
    success: "सफलता!",
    error: "त्रुटि हुई",
    registrationSuccess: "पंजीकरण सफल! कृपया लॉग इन करें।",
    loginSuccess: "लॉग इन सफल!",
    logoutSuccess: "सफलतापूर्वक लॉग आउट",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई",
    cropAdded: "फसल सफलतापूर्वक जोड़ी गई",
    cropUpdated: "फसल सफलतापूर्वक अपडेट की गई",
    cropDeleted: "फसल सफलतापूर्वक हटाई गई",
    enterValidMobile: "कृपया एक वैध मोबाइल नंबर दर्ज करें",
    passwordsDontMatch: "पासवर्ड मेल नहीं खाते",
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें"
  }
};

// Marathi translations
const mr = {
  translation: {
    // Common
    appName: "डिजिटल शेती मित्र",
    welcome: "स्वागत आहे",
    selectLanguage: "भाषा निवडा",
    english: "इंग्रजी",
    hindi: "हिंदी",
    marathi: "मराठी",
    login: "लॉग इन",
    register: "चيريणी",
    logout: "लॉग आउट",
    profile: "प्रोफाइल",
    dashboard: "डॅशबोर्ड",
    crops: "माझी पिके",
    weather: "हवामान",
    mandi: "मंडी भाव",
    analytics: "विश्लेषण",
    settings: "सेटिंग्ज़",
    home: "होम",
    loading: "लोड होत आहे...",
    submit: "सबमिट",
    cancel: "रद्द करा",
    edit: "編集する",
    delete: " حذف करने ",
    save: "जतना",
    add: "जोडा",
    search: "शोधा",
    filter: "फिल्टर",
    sort: "क्रमबद्ध करा",
    viewDetails: "तपशील पहा",
    
    // Auth
    farmerRegistration: "शेतकरी चेरीणी",
    farmerLogin: "शेतकरी लॉग इन",
    fullName: "पूर्ण नाव",
    mobileNumber: "मोबाइल क्रमांक",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड確認",
    address: "पत्ता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिन कोड",
    farmSize: "शेताचा आकार (एक्‍रात)",
    cropsGrown: "उगवलेली पिके",
    rememberMe: "मला माहिती रखा",
    forgotPassword: "पासवर्ड भूलेला?",
    dontHaveAccount: "खाते नाही?",
    alreadyHaveAccount: "आलेडेखील खाता आहे?",
    signUp: "नोंदणी करा",
    signIn: "प्रवेश करा",
    
    // Dashboard
    welcomeBack: "परत स्वागत आहे, {name}!",
    totalCrops: "एकूण पिके",
    activeIrrigation: "सक्रिय सिंचाई",
    weatherAlert: "हवामान चेतावनी",
    marketUpdate: "बाजार अद्ययावत",
    recentActivity: "कालजीरी गती",
    noRecentActivity: "कोईं कालजीरी गती नाही",
    viewAll: "सर्वा पहा",
    
    // Crop Management
    addCrop: "नवीन पिक जोडा",
    editCrop: "पिक संपादित करा",
    cropName: "पिकाचे नाव",
    plantingDate: "बुवाई तारीख",
    expectedHarvest: "आशापेक्षित काटनी तारीख",
    area: "क्षेत्र (एक्‍र)",
    variety: "जैत्रिक वैशिष्ट्य",
    status: "स्थिती",
    planting: "बुवाई",
    growing: "वृद्धी",
    readyForHarvest: "काटण्यास तयार",
    harvested: "काटली गeli",
    harvest: "काटा",
    lastUpdated: "शेवटचा अद्ययावत",
    
    // Weather
    currentWeather: "सध्या हवामान",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "हवेचा वेग",
    precipitation: "पाऊस",
    forecast: "अंदाज",
    today: "आज",
    tomorrow: "उद्या",
    next3Days: "पुढचे 3 दिवस",
    next7Days: "पुढचे 7 दिवस",
    
    // Mandi Prices
    mandiPrices: "मंडी भाव",
    selectCrop: "पिक निवडा",
    selectMarket: "बाजार निवडा",
    price: "भाव",
    unit: "एकक",
    market: "बाजार",
    lastUpdated: "शेवटचा अद्ययावत",
    priceTrend: "भाव प्रवाह",
    increasing: "वाढीत आहे",
    decreasing: "घातते आहे",
    stable: "स्थिर",
    
    // Profile
    profileInfo: "प्रोफाइल माहिती",
    updateProfile: "प्रोफाइल अद्ययावत करा",
    changePassword: "पासवर्ड बदल",
    notificationPreferences: "सूचना प्राधान्ये",
    languagePreferences: "भाषा प्राधान्ये",
    saveChanges: "बदल जतना",
    
    // Messages
    success: "यश!",
    error: "त्रुटी झाली",
    registrationSuccess: "चरीणी यशस्वी! कृपया लॉग इन करा.",
    loginSuccess: "लॉग इन यशस्वी!",
    logoutSuccess: "यशस्वीपणे लॉग आउट",
    profileUpdated: "प्रोफाइल यशस्वीरित्या अद्ययावत केली गेली",
    cropAdded: "पिक यशस्वीरित्या जोडली गeli",
    cropUpdated: "पिक यशस्वीरित्या अद्ययावत केली गeli",
    cropDeleted: "पिक यशस्वीरित्या हटविली गeli",
    enterValidMobile: "कृपया एक वैध मोबाइल क्रमांक ट입 করా",
    passwordsDontMatch: "पासवर्ड जुळत नाहीत",
    fillAllFields: "कृपया सर्व आवश्यक फील्ड्स भरा"
  }
};

const resources = {
  en: en,
  hi: hi,
  mr: mr
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
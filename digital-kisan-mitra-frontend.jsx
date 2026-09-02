import React, { useState } from "react";
import {
  Home,
  Sprout,
  Camera,
  LineChart as LineChartIcon,
  MessageCircle,
  CloudSun,
  Droplets,
  Wind,
  ChevronRight,
  ChevronLeft,
  Upload,
  Send,
  Bell,
  Globe,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Pencil,
  LogOut,
  Leaf,
  BellRing,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');";

const COLORS = {
  bg: "#FBF7EE",
  ink: "#1C2318",
  muted: "#8B8471",
  forest: "#22402C",
  forestDeep: "#152A1C",
  gold: "#D99A3C",
  goldSoft: "#F1D9A7",
  soil: "#6E4A2E",
  sky: "#3F7691",
  clay: "#B5522F",
  claySoft: "#F2D9CE",
  line: "#E4DCC8",
  card: "#FFFFFF",
};

const SHADOW = "0 1px 2px rgba(21,42,28,0.05), 0 10px 24px -16px rgba(21,42,28,0.22)";

const LANGS = {
  en: {
    appName: "Digital Kisan Mitra",
    tagline: "Your farm, understood — in Marathi, Hindi or English.",
    getStarted: "Get started",
    onboardTitle: "Set up your farm profile",
    onboardSub: "Takes under a minute. You can edit this anytime.",
    fullName: "Full name",
    village: "Village / plot location",
    landSize: "Land size (acres)",
    phone: "Phone number",
    primaryCrop: "Primary crop",
    createProfile: "Create profile",
    subtitle: (v) => `${v} plot`,
    weather: "Today's weather",
    quickActions: "Quick actions",
    diagnose: "Diagnose crop",
    market: "Mandi prices",
    irrigate: "Irrigation",
    chatbot: "Ask Kisan Mitra",
    myCrops: "My crops",
    viewAll: "View all",
    home: "Home",
    crops: "Crops",
    diagnoseTab: "Diagnose",
    marketTab: "Market",
    chat: "Chat",
    uploadPhoto: "Upload a leaf photo",
    uploadHint: "Clear photo, natural light, single leaf against a plain background",
    takePhoto: "Take photo",
    chooseFile: "Choose from gallery",
    recentChecks: "Recent checks",
    marketTitle: "Mandi Prices — Pune APMC",
    updated: "Updated 40 min ago",
    chatPlaceholder: "Type your farming question…",
    chatHint: 'Try: "When should I sow soybean this season?"',
    overview: "Overview",
    analytics: "Analytics",
    profile: "Profile",
    editProfile: "Edit profile",
    logOut: "Log out",
    fields: "Fields",
    farmDetails: "Farm details",
    irrigationTitle: "Irrigation",
    soilMoisture: "Soil moisture",
    nextIrrigation: "Next scheduled irrigation",
    smartAlerts: "Smart irrigation alerts",
    smartAlertsSub: "Get notified when soil moisture drops below threshold",
    fieldStatus: "Field status",
    revenue: "Revenue",
    expense: "Expense",
    netProfit: "Net profit (6 mo)",
    farmRecords: "Farm records",
    recordsSub: "Season-wise income and expenses",
  },
  hi: {
    appName: "डिजिटल किसान मित्र",
    tagline: "आपका खेत, अब समझा जाएगा — मराठी, हिंदी या अंग्रेज़ी में।",
    getStarted: "शुरू करें",
    onboardTitle: "अपनी खेत प्रोफ़ाइल बनाएं",
    onboardSub: "एक मिनट से भी कम समय। बाद में बदल सकते हैं।",
    fullName: "पूरा नाम",
    village: "गांव / खेत का स्थान",
    landSize: "भूमि (एकड़)",
    phone: "फोन नंबर",
    primaryCrop: "मुख्य फसल",
    createProfile: "प्रोफ़ाइल बनाएं",
    subtitle: (v) => `${v} खेत`,
    weather: "आज का मौसम",
    quickActions: "त्वरित सेवाएं",
    diagnose: "फसल जांच",
    market: "मंडी भाव",
    irrigate: "सिंचाई",
    chatbot: "किसान मित्र से पूछें",
    myCrops: "मेरी फसलें",
    viewAll: "सभी देखें",
    home: "होम",
    crops: "फसलें",
    diagnoseTab: "जांच",
    marketTab: "मंडी",
    chat: "चैट",
    uploadPhoto: "पत्ती की फोटो अपलोड करें",
    uploadHint: "साफ फोटो, प्राकृतिक रोशनी, सादे पृष्ठभूमि पर एक पत्ती",
    takePhoto: "फोटो लें",
    chooseFile: "गैलरी से चुनें",
    recentChecks: "हाल की जांच",
    marketTitle: "मंडी भाव — पुणे एपीएमसी",
    updated: "40 मिनट पहले अपडेट",
    chatPlaceholder: "अपना सवाल लिखें…",
    chatHint: 'उदाहरण: "इस मौसम में सोयाबीन कब बोएं?"',
    overview: "अवलोकन",
    analytics: "विश्लेषण",
    profile: "प्रोफ़ाइल",
    editProfile: "प्रोफ़ाइल संपादित करें",
    logOut: "लॉग आउट",
    fields: "खेत",
    farmDetails: "खेत विवरण",
    irrigationTitle: "सिंचाई",
    soilMoisture: "मिट्टी की नमी",
    nextIrrigation: "अगली निर्धारित सिंचाई",
    smartAlerts: "स्मार्ट सिंचाई अलर्ट",
    smartAlertsSub: "नमी सीमा से कम होने पर सूचना पाएं",
    fieldStatus: "खेत की स्थिति",
    revenue: "आय",
    expense: "खर्च",
    netProfit: "शुद्ध लाभ (6 माह)",
    farmRecords: "खेत रिकॉर्ड",
    recordsSub: "सीज़न-वार आय और खर्च",
  },
  mr: {
    appName: "डिजिटल किसान मित्र",
    tagline: "तुमचं शेत, आता समजेल — मराठी, हिंदी किंवा इंग्रजीत.",
    getStarted: "सुरू करा",
    onboardTitle: "तुमची शेत प्रोफाइल तयार करा",
    onboardSub: "एक मिनिटापेक्षा कमी वेळ लागतो. नंतर बदलता येईल.",
    fullName: "पूर्ण नाव",
    village: "गाव / शेताचे ठिकाण",
    landSize: "जमीन (एकर)",
    phone: "फोन नंबर",
    primaryCrop: "मुख्य पीक",
    createProfile: "प्रोफाइल तयार करा",
    subtitle: (v) => `${v} शेत`,
    weather: "आजचे हवामान",
    quickActions: "जलद सेवा",
    diagnose: "पीक तपासणी",
    market: "बाजार भाव",
    irrigate: "पाणी व्यवस्थापन",
    chatbot: "किसान मित्रला विचारा",
    myCrops: "माझी पिके",
    viewAll: "सर्व पहा",
    home: "मुख्यपृष्ठ",
    crops: "पिके",
    diagnoseTab: "तपासणी",
    marketTab: "बाजार",
    chat: "चॅट",
    uploadPhoto: "पानाचा फोटो अपलोड करा",
    uploadHint: "स्पष्ट फोटो, नैसर्गिक प्रकाश, साध्या पार्श्वभूमीवर एक पान",
    takePhoto: "फोटो काढा",
    chooseFile: "गॅलरीतून निवडा",
    recentChecks: "अलीकडील तपासण्या",
    marketTitle: "बाजार भाव — पुणे एपीएमसी",
    updated: "40 मिनिटांपूर्वी अपडेट",
    chatPlaceholder: "तुमचा प्रश्न लिहा…",
    chatHint: 'उदा: "या हंगामात सोयाबीन कधी पेरावे?"',
    overview: "आढावा",
    analytics: "विश्लेषण",
    profile: "प्रोफाइल",
    editProfile: "प्रोफाइल संपादित करा",
    logOut: "लॉग आउट",
    fields: "शेत",
    farmDetails: "शेत तपशील",
    irrigationTitle: "पाणी व्यवस्थापन",
    soilMoisture: "जमिनीतील ओलावा",
    nextIrrigation: "पुढील नियोजित पाणी",
    smartAlerts: "स्मार्ट सिंचन सूचना",
    smartAlertsSub: "ओलावा कमी झाल्यास सूचना मिळवा",
    fieldStatus: "शेताची स्थिती",
    revenue: "उत्पन्न",
    expense: "खर्च",
    netProfit: "निव्वळ नफा (6 महिने)",
    farmRecords: "शेत नोंदी",
    recordsSub: "हंगामनिहाय उत्पन्न आणि खर्च",
  },
};

const CROP_OPTIONS = ["Soybean", "Cotton", "Tur", "Sugarcane", "Onion", "Wheat"];

const CROPS = [
  { name: "Soybean", area: "1.2 acre", stage: "Flowering", health: "Good", color: COLORS.forest, moisture: 62 },
  { name: "Cotton", area: "0.8 acre", stage: "Boll formation", health: "Watch", color: COLORS.gold, moisture: 38 },
  { name: "Tur (Pigeon pea)", area: "0.4 acre", stage: "Vegetative", health: "Good", color: COLORS.forest, moisture: 55 },
];

const MANDI = [
  { crop: "Soybean", price: "4,320", unit: "quintal", trend: "up", change: "+2.1%" },
  { crop: "Cotton", price: "7,150", unit: "quintal", trend: "down", change: "-0.8%" },
  { crop: "Tur", price: "9,800", unit: "quintal", trend: "up", change: "+1.4%" },
  { crop: "Onion", price: "1,640", unit: "quintal", trend: "down", change: "-3.2%" },
];

const RECORDS = [
  { month: "Apr", revenue: 18500, expense: 12000 },
  { month: "May", revenue: 21000, expense: 13500 },
  { month: "Jun", revenue: 15800, expense: 17200 },
  { month: "Jul", revenue: 26400, expense: 14800 },
  { month: "Aug", revenue: 31200, expense: 16100 },
  { month: "Sep", revenue: 27800, expense: 15300 },
];

const CHAT_SEED = [
  { from: "bot", text: "Namaste! I'm Kisan Mitra. Ask me about crops, weather, pests, or prices." },
];

export default function DigitalKisanMitra() {
  const [stage, setStage] = useState("splash"); // splash | onboarding | app
  const [tab, setTab] = useState("home");
  const [overlay, setOverlay] = useState(null); // null | profile | irrigation
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [diagStage, setDiagStage] = useState("upload");
  const [chatLog, setChatLog] = useState(CHAT_SEED);
  const [chatInput, setChatInput] = useState("");
  const [cropsView, setCropsView] = useState("overview"); // overview | analytics
  const [smartAlerts, setSmartAlerts] = useState(true);

  const [form, setForm] = useState({
    name: "",
    village: "",
    land: "",
    phone: "",
    crop: CROP_OPTIONS[0],
  });

  const t = LANGS[lang];
  const farmerName = form.name.trim() || "Ganesh";
  const village = form.village.trim() || "Kothrud";
  const land = form.land.trim() || "2.4";
  const initials = farmerName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatLog((c) => [...c, { from: "user", text: chatInput.trim() }]);
    setChatInput("");
    setTimeout(() => {
      setChatLog((c) => [
        ...c,
        {
          from: "bot",
          text: "For soybean in this soil, sow within the first week after a good 75mm+ rain — usually mid to late June.",
        },
      ]);
    }, 550);
  };

  const runDiagnosis = () => {
    setDiagStage("loading");
    setTimeout(() => setDiagStage("result"), 1200);
  };

  return (
    <div
      style={{
        background: "#EFEAD9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "24px 12px",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>
      <div
        style={{
          width: 390,
          minHeight: 780,
          background: COLORS.bg,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(21,42,28,0.25)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          border: `1px solid ${COLORS.line}`,
        }}
      >
        {stage === "splash" && <SplashScreen t={t} onStart={() => setStage("onboarding")} />}

        {stage === "onboarding" && (
          <OnboardingScreen
            t={t}
            form={form}
            setForm={setForm}
            onDone={() => setStage("app")}
          />
        )}

        {stage === "app" && (
          <>
            {/* Top bar */}
            <div style={{ background: COLORS.forestDeep, color: "#fff", padding: "18px 20px 20px", position: "relative" }}>
              {overlay ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={() => setOverlay(null)}
                    style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600 }}>
                    {overlay === "profile" ? t.profile : t.irrigationTitle}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, lineHeight: 1.15 }}>
                      {(lang === "en" ? "Namaste, " : lang === "hi" ? "नमस्ते, " : "नमस्कार, ") + farmerName}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
                      {village} · {t.subtitle(land + " acres")}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <button
                      onClick={() => setLangOpen((v) => !v)}
                      style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 20, color: "#fff", padding: "6px 10px", display: "flex", alignItems: "center", gap: 5, fontSize: 12, cursor: "pointer" }}
                    >
                      <Globe size={13} />
                      {lang.toUpperCase()}
                    </button>
                    <Bell size={18} strokeWidth={1.6} />
                    <button
                      onClick={() => setOverlay("profile")}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: COLORS.gold,
                        color: COLORS.forestDeep,
                        border: "none",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {initials}
                    </button>
                  </div>
                </div>
              )}

              {langOpen && !overlay && (
                <div style={{ position: "absolute", right: 20, top: 54, background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", zIndex: 10 }}>
                  {["en", "hi", "mr"].map((code) => (
                    <div
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setLangOpen(false);
                      }}
                      style={{ padding: "9px 18px", fontSize: 13, color: COLORS.ink, cursor: "pointer", background: lang === code ? COLORS.goldSoft : "#fff" }}
                    >
                      {code === "en" ? "English" : code === "hi" ? "हिंदी" : "मराठी"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", paddingBottom: overlay ? 24 : 90 }}>
              {overlay === "profile" && (
                <ProfileScreen t={t} farmerName={farmerName} village={village} land={land} phone={form.phone} crop={form.crop} initials={initials} />
              )}
              {overlay === "irrigation" && (
                <IrrigationScreen t={t} smartAlerts={smartAlerts} setSmartAlerts={setSmartAlerts} />
              )}

              {!overlay && tab === "home" && (
                <HomeScreen t={t} setTab={setTab} setOverlay={setOverlay} />
              )}
              {!overlay && tab === "crops" && (
                <CropsScreen t={t} view={cropsView} setView={setCropsView} />
              )}
              {!overlay && tab === "diagnose" && (
                <DiagnoseScreen t={t} stage={diagStage} onUpload={runDiagnosis} onReset={() => setDiagStage("upload")} />
              )}
              {!overlay && tab === "market" && <MarketScreen t={t} />}
              {!overlay && tab === "chat" && (
                <ChatScreen t={t} log={chatLog} input={chatInput} setInput={setChatInput} onSend={sendChat} />
              )}
            </div>

            {/* Bottom nav */}
            {!overlay && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${COLORS.line}`, display: "flex", justifyContent: "space-around", padding: "10px 6px 14px" }}>
                <NavItem icon={Home} label={t.home} active={tab === "home"} onClick={() => setTab("home")} />
                <NavItem icon={Sprout} label={t.crops} active={tab === "crops"} onClick={() => setTab("crops")} />
                <NavItem icon={Camera} label={t.diagnoseTab} active={tab === "diagnose"} onClick={() => setTab("diagnose")} />
                <NavItem icon={LineChartIcon} label={t.marketTab} active={tab === "market"} onClick={() => setTab("market")} />
                <NavItem icon={MessageCircle} label={t.chat} active={tab === "chat"} onClick={() => setTab("chat")} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SplashScreen({ t, onStart }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", background: `linear-gradient(180deg, ${COLORS.forestDeep}, ${COLORS.forest})`, color: "#fff", minHeight: 780 }}>
      <div style={{ width: 76, height: 76, borderRadius: 22, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
        <Leaf size={36} color={COLORS.forestDeep} strokeWidth={1.8} />
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>
        {t.appName}
      </div>
      <div style={{ fontSize: 13.5, opacity: 0.8, textAlign: "center", marginTop: 12, lineHeight: 1.6, maxWidth: 260 }}>
        {t.tagline}
      </div>
      <button
        onClick={onStart}
        style={{ marginTop: 40, background: COLORS.gold, color: COLORS.forestDeep, border: "none", borderRadius: 14, padding: "14px 40px", fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}
      >
        {t.getStarted}
      </button>
    </div>
  );
}

function OnboardingScreen({ t, form, setForm, onDone }) {
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const inputStyle = {
    width: "100%",
    border: `1px solid ${COLORS.line}`,
    borderRadius: 12,
    padding: "12px 14px",
    fontSize: 13.5,
    outline: "none",
    background: "#fff",
    color: COLORS.ink,
    boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: COLORS.ink, marginBottom: 6, display: "block" };

  return (
    <div style={{ flex: 1, padding: "34px 24px", minHeight: 780, display: "flex", flexDirection: "column" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, color: COLORS.ink }}>{t.onboardTitle}</div>
      <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>{t.onboardSub}</div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>{t.fullName}</label>
          <input style={inputStyle} value={form.name} onChange={update("name")} placeholder="e.g. Ganesh Patil" />
        </div>
        <div>
          <label style={labelStyle}>{t.village}</label>
          <input style={inputStyle} value={form.village} onChange={update("village")} placeholder="e.g. Kothrud" />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>{t.landSize}</label>
            <input style={inputStyle} value={form.land} onChange={update("land")} placeholder="2.4" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>{t.phone}</label>
            <input style={inputStyle} value={form.phone} onChange={update("phone")} placeholder="98xxxxxxxx" />
          </div>
        </div>
        <div>
          <label style={labelStyle}>{t.primaryCrop}</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CROP_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setForm((f) => ({ ...f, crop: c }))}
                style={{
                  border: `1px solid ${form.crop === c ? COLORS.forest : COLORS.line}`,
                  background: form.crop === c ? COLORS.forest : "#fff",
                  color: form.crop === c ? "#fff" : COLORS.ink,
                  borderRadius: 20,
                  padding: "7px 14px",
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <button
        onClick={onDone}
        style={{ background: COLORS.forest, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 24 }}
      >
        {t.createProfile}
      </button>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", color: active ? COLORS.forest : "#9C9585", width: 60 }}>
      <div style={{ width: 34, height: 26, borderRadius: 10, background: active ? COLORS.goldSoft : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={19} strokeWidth={active ? 2.2 : 1.6} />
      </div>
      <span style={{ fontSize: 10.5, fontWeight: active ? 600 : 400 }}>{label}</span>
    </button>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "22px 20px 10px" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16.5, fontWeight: 600, color: COLORS.ink }}>{children}</div>
      {action && (
        <button onClick={onAction} style={{ background: "none", border: "none", color: COLORS.soil, fontSize: 12.5, display: "flex", alignItems: "center", gap: 2, cursor: "pointer" }}>
          {action} <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

function HomeScreen({ t, setTab, setOverlay }) {
  return (
    <div>
      <div style={{ margin: "18px 20px 0" }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.sky}, #2E5A72)`, borderRadius: 20, padding: "18px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: SHADOW }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{t.weather}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600, marginTop: 2 }}>29°C</div>
            <div style={{ fontSize: 12.5, opacity: 0.9, marginTop: 2 }}>Partly cloudy · Rain likely by evening</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <CloudSun size={40} strokeWidth={1.3} />
            <div style={{ fontSize: 11.5, marginTop: 8, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
              <Droplets size={12} /> 68%
            </div>
            <div style={{ fontSize: 11.5, marginTop: 3, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
              <Wind size={12} /> 11 km/h
            </div>
          </div>
        </div>
      </div>

      <SectionTitle>{t.quickActions}</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "0 20px" }}>
        <QuickAction icon={Camera} label={t.diagnose} bg={COLORS.forest} onClick={() => setTab("diagnose")} />
        <QuickAction icon={LineChartIcon} label={t.market} bg={COLORS.clay} onClick={() => setTab("market")} />
        <QuickAction icon={Droplets} label={t.irrigate} bg={COLORS.sky} onClick={() => setOverlay("irrigation")} />
        <QuickAction icon={MessageCircle} label={t.chatbot} bg={COLORS.gold} onClick={() => setTab("chat")} />
      </div>

      <SectionTitle action={t.viewAll} onAction={() => setTab("crops")}>
        {t.myCrops}
      </SectionTitle>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 20px 6px" }}>
        {CROPS.map((c) => (
          <div key={c.name} style={{ minWidth: 148, background: COLORS.card, borderRadius: 16, padding: 14, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: c.color, marginBottom: 10 }} />
            <div style={{ fontWeight: 600, fontSize: 13.5, color: COLORS.ink }}>{c.name}</div>
            <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>{c.area}</div>
            <div style={{ fontSize: 11.5, color: COLORS.forest, marginTop: 6 }}>{c.stage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, bg, onClick }) {
  return (
    <button onClick={onClick} style={{ background: bg, border: "none", borderRadius: 16, padding: "16px 14px", color: "#fff", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 20, boxShadow: SHADOW }}>
      <Icon size={20} strokeWidth={1.7} />
      <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{label}</span>
    </button>
  );
}

function CropsScreen({ t, view, setView }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "22px 20px 14px" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16.5, fontWeight: 600, color: COLORS.ink }}>
          {view === "overview" ? t.myCrops : t.farmRecords}
        </div>
        <div style={{ display: "flex", background: "#EFEAD9", borderRadius: 20, padding: 3 }}>
          {[
            { k: "overview", label: t.overview },
            { k: "analytics", label: t.analytics },
          ].map((o) => (
            <button
              key={o.k}
              onClick={() => setView(o.k)}
              style={{
                border: "none",
                borderRadius: 18,
                padding: "6px 12px",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                background: view === o.k ? COLORS.forest : "transparent",
                color: view === o.k ? "#fff" : COLORS.ink,
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {view === "overview" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 20px" }}>
          {CROPS.map((c) => (
            <div key={c.name} style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                <Sprout size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5, color: COLORS.ink }}>{c.name}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                  {c.area} · {c.stage}
                </div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: c.health === "Good" ? "#E4F0E5" : COLORS.goldSoft, color: c.health === "Good" ? COLORS.forest : "#8A5A16" }}>
                {c.health}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ margin: "0 20px" }}>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>{t.recordsSub}</div>

          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <StatCard label={t.revenue} value="₹1,40,700" color={COLORS.forest} />
            <StatCard label={t.expense} value="₹88,900" color={COLORS.clay} />
          </div>
          <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, padding: "16px 10px 6px" }}>
            <div style={{ padding: "0 10px 12px", fontSize: 12.5, fontWeight: 600, color: COLORS.ink, display: "flex", alignItems: "center", gap: 6 }}>
              <BarChart3 size={14} color={COLORS.soil} /> {t.netProfit}: <span style={{ color: COLORS.forest }}>₹51,800</span>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <LineChart data={RECORDS} margin={{ top: 4, right: 14, left: -14, bottom: 0 }}>
                <CartesianGrid stroke={COLORS.line} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: COLORS.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: COLORS.muted }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: `1px solid ${COLORS.line}`, fontSize: 12 }}
                  labelStyle={{ color: COLORS.ink, fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="revenue" stroke={COLORS.forest} strokeWidth={2.5} dot={{ r: 3 }} name={t.revenue} />
                <Line type="monotone" dataKey="expense" stroke={COLORS.clay} strokeWidth={2.5} dot={{ r: 3 }} name={t.expense} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, color: COLORS.muted }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 600, color, marginTop: 3, fontFamily: "'Fraunces', serif" }}>{value}</div>
    </div>
  );
}

function DiagnoseScreen({ t, stage, onUpload, onReset }) {
  return (
    <div style={{ padding: "22px 20px" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: COLORS.ink }}>{t.diagnose}</div>

      {stage === "upload" && (
        <>
          <div style={{ marginTop: 18, border: `2px dashed ${COLORS.line}`, borderRadius: 18, padding: "34px 20px", textAlign: "center", background: COLORS.card, boxShadow: SHADOW }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: COLORS.goldSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Camera size={24} color={COLORS.soil} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 14.5, color: COLORS.ink }}>{t.uploadPhoto}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>{t.uploadHint}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={onUpload} style={{ flex: 1, background: COLORS.forest, color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {t.takePhoto}
              </button>
              <button onClick={onUpload} style={{ flex: 1, background: "#fff", color: COLORS.forest, border: `1.5px solid ${COLORS.forest}`, borderRadius: 12, padding: "11px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Upload size={14} /> {t.chooseFile}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 26, fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{t.recentChecks}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            {[
              { crop: "Cotton", issue: "Leaf curl — mild", when: "2 days ago", ok: false },
              { crop: "Soybean", issue: "Healthy", when: "5 days ago", ok: true },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${COLORS.line}`, boxShadow: SHADOW }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: r.ok ? "#E4F0E5" : COLORS.goldSoft, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{r.crop}</div>
                  <div style={{ fontSize: 11.5, color: r.ok ? COLORS.forest : "#8A5A16" }}>{r.issue}</div>
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{r.when}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {stage === "loading" && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ width: 60, height: 60, margin: "0 auto", borderRadius: "50%", border: `4px solid ${COLORS.goldSoft}`, borderTopColor: COLORS.forest, animation: "spin 0.9s linear infinite" }} />
          <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
          <div style={{ marginTop: 18, fontSize: 13.5, color: COLORS.ink, fontWeight: 500 }}>Analysing leaf photo…</div>
        </div>
      )}

      {stage === "result" && (
        <div style={{ marginTop: 18 }}>
          <div style={{ background: COLORS.card, borderRadius: 18, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, overflow: "hidden" }}>
            <div style={{ height: 150, background: `linear-gradient(135deg, ${COLORS.forest}, #375C40)` }} />
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.goldSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13 }}>⚠️</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.ink }}>Early blight detected</div>
              </div>
              <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 4 }}>Confidence: 87% · Cotton, boll stage</div>

              <div style={{ marginTop: 16, fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>Recommended action</div>
              <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12.5, color: "#4E4A3C", lineHeight: 1.7 }}>
                <li>Remove and destroy affected lower leaves</li>
                <li>Apply copper-based fungicide within 2 days</li>
                <li>Avoid overhead irrigation until resolved</li>
                <li>Re-check in 5–7 days</li>
              </ul>
            </div>
          </div>
          <button onClick={onReset} style={{ marginTop: 14, width: "100%", background: "none", border: `1.5px solid ${COLORS.forest}`, color: COLORS.forest, borderRadius: 12, padding: "11px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Check another leaf
          </button>
        </div>
      )}
    </div>
  );
}

function MarketScreen({ t }) {
  return (
    <div style={{ padding: "22px 20px" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: COLORS.ink }}>{t.marketTitle}</div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 4 }}>{t.updated}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
        {MANDI.map((m) => (
          <div key={m.crop} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.card, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, borderRadius: 14, padding: "13px 16px" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{m.crop}</div>
              <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>per {m.unit}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.ink }}>₹{m.price}</div>
              <div style={{ fontSize: 11.5, marginTop: 2, display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end", color: m.trend === "up" ? COLORS.forest : COLORS.clay }}>
                {m.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {m.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatScreen({ t, log, input, setInput, onSend }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "18px 20px 8px", fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: COLORS.ink }}>{t.chatbot}</div>
      <div style={{ padding: "0 20px", fontSize: 12, color: COLORS.muted }}>{t.chatHint}</div>

      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {log.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === "bot" ? "flex-start" : "flex-end",
              maxWidth: "80%",
              background: m.from === "bot" ? COLORS.card : COLORS.forest,
              color: m.from === "bot" ? COLORS.ink : "#fff",
              border: m.from === "bot" ? `1px solid ${COLORS.line}` : "none",
              boxShadow: m.from === "bot" ? SHADOW : "none",
              borderRadius: 16,
              padding: "10px 14px",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, padding: "10px 16px 4px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder={t.chatPlaceholder}
          style={{ flex: 1, border: `1px solid ${COLORS.line}`, borderRadius: 20, padding: "10px 16px", fontSize: 13, outline: "none", background: COLORS.card }}
        />
        <button onClick={onSend} style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.forest, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ t, farmerName, village, land, phone, crop, initials }) {
  return (
    <div style={{ padding: "22px 20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: COLORS.forestDeep }}>
          {initials}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: COLORS.ink, marginTop: 12 }}>{farmerName}</div>
        <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={12} /> {village}
        </div>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, padding: 4 }}>
        <InfoRow icon={Phone} label={t.phone} value={phone || "—"} />
        <InfoRow icon={MapPin} label={t.village} value={village} />
        <InfoRow icon={Sprout} label={t.landSize} value={`${land} acres`} />
        <InfoRow icon={Leaf} label={t.primaryCrop} value={crop} last />
      </div>

      <button style={{ marginTop: 16, width: "100%", background: COLORS.forest, color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Pencil size={14} /> {t.editProfile}
      </button>
      <button style={{ marginTop: 10, width: "100%", background: "none", color: COLORS.clay, border: `1.5px solid ${COLORS.claySoft}`, borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <LogOut size={14} /> {t.logOut}
      </button>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, last }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: last ? "none" : `1px solid ${COLORS.line}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "#EFEAD9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={COLORS.soil} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: COLORS.muted }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.ink, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

function IrrigationScreen({ t, smartAlerts, setSmartAlerts }) {
  const avgMoisture = Math.round(CROPS.reduce((a, c) => a + c.moisture, 0) / CROPS.length);
  return (
    <div style={{ padding: "22px 20px" }}>
      <div style={{ background: COLORS.card, borderRadius: 18, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <MoistureGauge value={avgMoisture} />
        <div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>{t.soilMoisture}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: COLORS.ink, marginTop: 2 }}>{avgMoisture}%</div>
          <div style={{ fontSize: 11.5, color: avgMoisture < 45 ? COLORS.clay : COLORS.forest, marginTop: 4, fontWeight: 600 }}>
            {avgMoisture < 45 ? "Below optimal range" : "Within optimal range"}
          </div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${COLORS.sky}, #2E5A72)`, borderRadius: 16, padding: "14px 16px", color: "#fff", display: "flex", alignItems: "center", gap: 12, marginTop: 12, boxShadow: SHADOW }}>
        <Calendar size={20} strokeWidth={1.6} />
        <div>
          <div style={{ fontSize: 11.5, opacity: 0.85 }}>{t.nextIrrigation}</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1 }}>Tomorrow, 6:30 AM — Cotton field</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.line}`, boxShadow: SHADOW, padding: "14px 16px", marginTop: 14 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <BellRing size={18} color={COLORS.soil} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{t.smartAlerts}</div>
            <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2, maxWidth: 200, lineHeight: 1.4 }}>{t.smartAlertsSub}</div>
          </div>
        </div>
        <button
          onClick={() => setSmartAlerts((v) => !v)}
          style={{ width: 42, height: 24, borderRadius: 14, border: "none", background: smartAlerts ? COLORS.forest : "#D8D2BF", position: "relative", cursor: "pointer", flexShrink: 0 }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: smartAlerts ? 21 : 3, transition: "left 0.15s ease" }} />
        </button>
      </div>

      <div style={{ marginTop: 22, fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{t.fieldStatus}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
        {CROPS.map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.card, borderRadius: 14, padding: "12px 14px", border: `1px solid ${COLORS.line}`, boxShadow: SHADOW }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: c.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{c.name}</div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 1 }}>{c.area}</div>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: c.moisture < 45 ? COLORS.clay : COLORS.forest }}>{c.moisture}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoistureGauge({ value }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
      <circle cx="40" cy="40" r={r} fill="none" stroke={COLORS.line} strokeWidth="8" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke={value < 45 ? COLORS.clay : COLORS.sky}
        strokeWidth="8"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <foreignObject x="20" y="30" width="40" height="20">
        <Droplets size={18} color={COLORS.sky} style={{ margin: "0 auto", display: "block" }} />
      </foreignObject>
    </svg>
  );
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kisan-mitra';
const JWT_SECRET = process.env.JWT_SECRET || 'kisan-mitra-secret-key-2024';

// Try MongoDB, fall back to in-memory storage if MongoDB unavailable
let useMongoDB = false;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 2000 })
  .then(() => {
    useMongoDB = true;
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.log('⚠️  MongoDB not available, using in-memory storage');
    console.log('   To use MongoDB: install MongoDB and set MONGODB_URI in .env');
    useMongoDB = false;
  });

// ============ MODELS ============
const farmerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  pincode: String,
  farmSize: Number,
  cropsGrown: String,
  preferredLanguage: { type: String, default: 'en' },
  createdAt: { type: Date, default: Date.now }
});

const cropSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  name: { type: String, required: true },
  variety: String,
  area: Number,
  plantingDate: Date,
  expectedHarvest: Date,
  status: { type: String, enum: ['planting', 'growing', 'readyForHarvest', 'harvested'], default: 'planting' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// In-memory storage fallback
const memoryDB = {
  farmers: [],
  crops: [],
  nextFarmerId: 1,
  nextCropId: 1
};

const Farmer = mongoose.model('Farmer', farmerSchema);
const Crop = mongoose.model('Crop', cropSchema);

// ============ MIDDLEWARE ============
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============ ROUTES ============

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, mobileNumber, email, password, address, city, state, pincode, farmSize, cropsGrown } = req.body;
    if (!fullName || !mobileNumber || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let farmer;
    if (useMongoDB) {
      const existing = await Farmer.findOne({ mobileNumber });
      if (existing) return res.status(400).json({ success: false, message: 'Mobile number already registered' });
      farmer = await Farmer.create({ fullName, mobileNumber, email, password: hashedPassword, address, city, state, pincode, farmSize, cropsGrown });
    } else {
      const existing = memoryDB.farmers.find(f => f.mobileNumber === mobileNumber);
      if (existing) return res.status(400).json({ success: false, message: 'Mobile number already registered' });
      farmer = { _id: memoryDB.nextFarmerId++, fullName, mobileNumber, email, password: hashedPassword, address, city, state, pincode, farmSize, cropsGrown, createdAt: new Date() };
      memoryDB.farmers.push(farmer);
    }
    const token = jwt.sign({ id: farmer._id }, JWT_SECRET, { expiresIn: '30d' });
    const farmerData = { ...farmer.toObject ? farmer.toObject() : farmer };
    delete farmerData.password;
    res.json({ success: true, data: { user: farmerData, token } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    let farmer;
    if (useMongoDB) {
      farmer = await Farmer.findOne({ mobileNumber });
    } else {
      farmer = memoryDB.farmers.find(f => f.mobileNumber === mobileNumber);
    }
    if (!farmer) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, farmer.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: farmer._id }, JWT_SECRET, { expiresIn: '30d' });
    const farmerData = { ...(farmer.toObject ? farmer.toObject() : farmer) };
    delete farmerData.password;
    res.json({ success: true, data: { user: farmerData, token } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

// Farmer Profile Routes
app.get('/api/farmer/profile', authMiddleware, async (req, res) => {
  try {
    let farmer;
    if (useMongoDB) {
      farmer = await Farmer.findById(req.userId);
    } else {
      farmer = memoryDB.farmers.find(f => f._id == req.userId);
    }
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
    const farmerData = { ...(farmer.toObject ? farmer.toObject() : farmer) };
    delete farmerData.password;
    res.json({ success: true, data: farmerData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/farmer/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    let farmer;
    if (useMongoDB) {
      farmer = await Farmer.findByIdAndUpdate(req.userId, updates, { new: true });
    } else {
      const idx = memoryDB.farmers.findIndex(f => f._id == req.userId);
      if (idx >= 0) {
        memoryDB.farmers[idx] = { ...memoryDB.farmers[idx], ...updates };
        farmer = memoryDB.farmers[idx];
      }
    }
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
    const farmerData = { ...(farmer.toObject ? farmer.toObject() : farmer) };
    delete farmerData.password;
    res.json({ success: true, data: farmerData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/farmer/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let farmer;
    if (useMongoDB) {
      farmer = await Farmer.findById(req.userId);
    } else {
      farmer = memoryDB.farmers.find(f => f._id == req.userId);
    }
    if (!farmer) return res.status(404).json({ success: false, message: 'Farmer not found' });
    const valid = await bcrypt.compare(currentPassword, farmer.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    const hashed = await bcrypt.hash(newPassword, 10);
    if (useMongoDB) {
      farmer.password = hashed;
      await farmer.save();
    } else {
      const idx = memoryDB.farmers.findIndex(f => f._id == req.userId);
      memoryDB.farmers[idx].password = hashed;
    }
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Crop Routes
app.get('/api/crops', authMiddleware, async (req, res) => {
  try {
    let crops;
    if (useMongoDB) {
      crops = await Crop.find({ farmerId: req.userId }).sort({ createdAt: -1 });
    } else {
      crops = memoryDB.crops.filter(c => c.farmerId == req.userId);
    }
    res.json({ success: true, data: crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/crops', authMiddleware, async (req, res) => {
  try {
    const { name, variety, area, plantingDate, expectedHarvest, status } = req.body;
    let crop;
    if (useMongoDB) {
      crop = await Crop.create({ farmerId: req.userId, name, variety, area, plantingDate, expectedHarvest, status });
    } else {
      crop = { _id: memoryDB.nextCropId++, farmerId: req.userId, name, variety, area, plantingDate, expectedHarvest, status: status || 'planting', createdAt: new Date(), updatedAt: new Date() };
      memoryDB.crops.push(crop);
    }
    res.json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/crops/:id', authMiddleware, async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    let crop;
    if (useMongoDB) {
      crop = await Crop.findOneAndUpdate({ _id: req.params.id, farmerId: req.userId }, updates, { new: true });
    } else {
      const idx = memoryDB.crops.findIndex(c => c._id == req.params.id && c.farmerId == req.userId);
      if (idx >= 0) {
        memoryDB.crops[idx] = { ...memoryDB.crops[idx], ...updates };
        crop = memoryDB.crops[idx];
      }
    }
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/crops/:id', authMiddleware, async (req, res) => {
  try {
    if (useMongoDB) {
      await Crop.findOneAndDelete({ _id: req.params.id, farmerId: req.userId });
    } else {
      const idx = memoryDB.crops.findIndex(c => c._id == req.params.id && c.farmerId == req.userId);
      if (idx >= 0) memoryDB.crops.splice(idx, 1);
    }
    res.json({ success: true, message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/crops/:id/harvest', authMiddleware, async (req, res) => {
  try {
    let crop;
    if (useMongoDB) {
      crop = await Crop.findOneAndUpdate({ _id: req.params.id, farmerId: req.userId }, { status: 'harvested', updatedAt: new Date() }, { new: true });
    } else {
      const idx = memoryDB.crops.findIndex(c => c._id == req.params.id && c.farmerId == req.userId);
      if (idx >= 0) {
        memoryDB.crops[idx].status = 'harvested';
        memoryDB.crops[idx].updatedAt = new Date();
        crop = memoryDB.crops[idx];
      }
    }
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, data: crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Weather Routes
app.get('/api/weather/current', (req, res) => {
  const { location } = req.query;
  res.json({
    success: true,
    data: {
      temperature: 28 + Math.floor(Math.random() * 10),
      humidity: 60 + Math.floor(Math.random() * 30),
      windSpeed: 5 + Math.floor(Math.random() * 15),
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      precipitation: Math.floor(Math.random() * 5),
      location: location || 'Pune, Maharashtra',
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/api/weather/forecast', (req, res) => {
  const { days = 7 } = req.query;
  const forecast = [];
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorms'];
  for (let i = 0; i < parseInt(days); i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    forecast.push({
      date: date.toISOString(),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      minTemp: 18 + Math.floor(Math.random() * 8),
      maxTemp: 28 + Math.floor(Math.random() * 10),
      humidity: 55 + Math.floor(Math.random() * 35),
      windSpeed: 5 + Math.floor(Math.random() * 20),
      precipitationChance: Math.floor(Math.random() * 100)
    });
  }
  res.json({ success: true, data: forecast });
});

app.get('/api/weather/alerts', (req, res) => {
  res.json({
    success: true,
    data: [
      { type: 'rain', message: 'Heavy rain expected in next 48 hours', severity: 'medium' },
      { type: 'temperature', message: 'Temperature drop expected this weekend', severity: 'low' }
    ]
  });
});

// Mandi Price Routes
app.get('/api/mandi/prices', (req, res) => {
  const { crop, market } = req.query;
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Onion', 'Tomato', 'Potato', 'Soybean'];
  const markets = ['Mumbai', 'Delhi', 'Pune', 'Nashik', 'Bangalore', 'Chennai', 'Kolkata'];
  const units = { Rice: 'quintal', Wheat: 'quintal', Cotton: 'quintal', Sugarcane: 'quintal', Onion: 'quintal', Tomato: 'quintal', Potato: 'quintal', Soybean: 'quintal' };
  const basePrices = { Rice: 2200, Wheat: 2400, Cotton: 6500, Sugarcane: 350, Onion: 1800, Tomato: 1200, Potato: 900, Soybean: 4200 };
  
  const prices = [];
  const cropList = crop ? [crop] : crops;
  const marketList = market ? [market] : markets;
  
  cropList.forEach(c => {
    marketList.forEach(m => {
      const basePrice = basePrices[c] || 2000;
      const variation = (Math.random() - 0.5) * 0.2;
      const price = basePrice * (1 + variation);
      const change = (Math.random() - 0.5) * 100;
      prices.push({
        id: `${c}-${m}`,
        cropId: c.toLowerCase(),
        cropName: c,
        marketId: m.toLowerCase(),
        marketName: `${m} Mandi`,
        price: Math.round(price * 100) / 100,
        unit: units[c] || 'quintal',
        change: Math.round(change * 100) / 100,
        changePercent: Math.round((change / basePrice) * 10000) / 100,
        updatedAt: new Date().toISOString()
      });
    });
  });
  res.json({ success: true, data: prices });
});

app.get('/api/mandi/markets', (req, res) => {
  const markets = [
    { id: 'mumbai', name: 'Mumbai Mandi', state: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi Mandi', state: 'Delhi' },
    { id: 'pune', name: 'Pune Mandi', state: 'Maharashtra' },
    { id: 'nashik', name: 'Nashik Mandi', state: 'Maharashtra' },
    { id: 'bangalore', name: 'Bangalore Mandi', state: 'Karnataka' },
    { id: 'chennai', name: 'Chennai Mandi', state: 'Tamil Nadu' },
    { id: 'kolkata', name: 'Kolkata Mandi', state: 'West Bengal' }
  ];
  res.json({ success: true, data: markets });
});

app.get('/api/mandi/crops', (req, res) => {
  const crops = [
    { id: 'rice', name: 'Rice' },
    { id: 'wheat', name: 'Wheat' },
    { id: 'cotton', name: 'Cotton' },
    { id: 'sugarcane', name: 'Sugarcane' },
    { id: 'onion', name: 'Onion' },
    { id: 'tomato', name: 'Tomato' },
    { id: 'potato', name: 'Potato' },
    { id: 'soybean', name: 'Soybean' }
  ];
  res.json({ success: true, data: crops });
});

app.get('/api/mandi/price-history', (req, res) => {
  const { cropId, marketId } = req.query;
  const history = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString(),
      price: 2000 + Math.floor(Math.random() * 500)
    });
  }
  res.json({ success: true, data: history });
});

// Analytics Routes
app.get('/api/analytics/dashboard', authMiddleware, async (req, res) => {
  try {
    let totalCrops, activeCrops;
    if (useMongoDB) {
      totalCrops = await Crop.countDocuments({ farmerId: req.userId });
      activeCrops = await Crop.countDocuments({ farmerId: req.userId, status: { $in: ['planting', 'growing'] } });
    } else {
      const farmerCrops = memoryDB.crops.filter(c => c.farmerId == req.userId);
      totalCrops = farmerCrops.length;
      activeCrops = farmerCrops.filter(c => ['planting', 'growing'].includes(c.status)).length;
    }
    res.json({
      success: true,
      data: {
        totalCrops,
        activeCrops,
        totalArea: 0,
        activeIrrigation: 0,
        upcomingHarvests: 0
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/analytics/crop-yield', authMiddleware, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/analytics/expenses', authMiddleware, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/analytics/irrigation', authMiddleware, (req, res) => {
  res.json({ success: true, data: [] });
});

// Notification Routes
app.get('/api/notifications', authMiddleware, (req, res) => {
  res.json({ success: true, data: [] });
});

app.put('/api/notifications/:id/read', authMiddleware, (req, res) => {
  res.json({ success: true, message: 'Marked as read' });
});

app.put('/api/notifications/read-all', authMiddleware, (req, res) => {
  res.json({ success: true, message: 'All marked as read' });
});

app.get('/api/notifications/unread-count', authMiddleware, (req, res) => {
  res.json({ success: true, data: { count: 0 } });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Kisan Mitra API is running', database: useMongoDB ? 'MongoDB' : 'In-Memory' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌾 Digital Kisan Mitra Backend running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`💾 Database: ${useMongoDB ? 'MongoDB' : 'In-Memory (no MongoDB required)'}\n`);
});
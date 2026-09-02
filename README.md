# 🌾 Digital Kisan Mitra - Smart Farming Assistant

Complete full-stack application for Indian farmers.

## Quick Start (No Build Tools Needed!)

The frontend is a single HTML file that works without any build process - just open it in a browser!

### Option 1: Use the self-contained HTML (Easiest)

1. Open `public/index.html` directly in your browser, OR
2. Serve it with any static file server (e.g., Python, Node, etc.)

### Option 2: Run with Node.js Backend

#### Prerequisites
- Node.js (v16+)
- MongoDB (optional - works without it using in-memory storage)

#### Setup
1. Install Node.js from https://nodejs.org
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend:
   ```bash
   npm start
   ```
4. Open the frontend:
   - The backend serves the frontend at http://localhost:5000
   - OR open `public/index.html` directly

## Project Structure

```
Digital-KIsan-Mitra/
├── public/
│   └── index.html          # Complete frontend (single file, no build needed)
├── server.js               # Express backend with MongoDB
├── package.json            # Backend dependencies
├── .env                    # Environment variables
└── README.md              # This file
```

## Features

✅ **Complete Frontend** (in public/index.html)
- Farmer registration & login
- Profile management
- Dashboard with stats
- Crop management (CRUD)
- Weather forecasts
- Mandi (market) prices
- Multilingual: English, Hindi, Marathi
- Responsive design with Tailwind CSS (CDN)

✅ **Complete Backend** (server.js)
- Express.js REST API
- MongoDB with in-memory fallback
- JWT authentication
- All endpoints for the frontend

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new farmer
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Profile
- `GET /api/farmer/profile` - Get profile
- `PUT /api/farmer/profile` - Update profile
- `PUT /api/farmer/change-password` - Change password

### Crops
- `GET /api/crops` - List all crops
- `POST /api/crops` - Add new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Weather
- `GET /api/weather/current?location=Pune` - Current weather
- `GET /api/weather/forecast?days=7` - Forecast

### Mandi Prices
- `GET /api/mandi/prices?crop=Rice&market=Mumbai` - Get prices
- `GET /api/mandi/markets` - List markets
- `GET /api/mandi/crops` - List crops

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats

## Test Credentials

After registration, you can login with the mobile number and password you used.

## Tech Stack

**Frontend:**
- React 18 (via CDN)
- Tailwind CSS (via CDN)
- Babel Standalone (for JSX in browser)
- Single HTML file - no build process!

**Backend:**
- Node.js + Express
- MongoDB (Mongoose) with in-memory fallback
- JWT authentication
- bcrypt for password hashing
- CORS enabled

## Environment Variables

Create a `.env` file (already included):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kisan-mitra
JWT_SECRET=kisan-mitra-secret-key-2024
```

## Notes

- The frontend works WITHOUT the backend (it will show errors on API calls but UI is fully functional)
- The backend works WITHOUT MongoDB (uses in-memory storage)
- All data is reset when backend restarts (in-memory mode)
- For production, set up MongoDB and change JWT_SECRET

## License

MIT

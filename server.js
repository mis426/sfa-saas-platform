const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json());

// Dynamic CORS Resolution for Vercel & Localhost
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.) or any origin in production
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Preflight OPTIONS handler
app.options('*', cors());

// Global API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saas_monetization_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// Dynamic Safe Route Importing (Prevents crash if a route file is missing)
const sfaPath = path.join(__dirname, 'routes', 'sfa.js');
const authPath = path.join(__dirname, 'routes', 'auth.js');

if (fs.existsSync(sfaPath)) {
  const sfaRoutes = require('./routes/sfa');
  const checkTenantStatus = require('./middleware/checkTenantStatus');
  app.use('/api/sfa', checkTenantStatus, sfaRoutes);
}

if (fs.existsSync(authPath)) {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
} else {
  console.warn('⚠️ Warning: routes/auth.js not found. Checking root router fallback...');
}

// Health Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'Healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.get('/', (req, res) => {
  res.send('🚀 SFA SaaS Backend Server Live');
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('System Exception:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Secure SFA Enterprise Server live on port ${PORT}`);
});
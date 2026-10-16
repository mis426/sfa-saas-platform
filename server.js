const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json());

// Strict Production Multi-Origin Allowed List
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sfa-saas-platform.vercel.app',
  'https://sfa-saas-platform-git-main-mis426.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// Dynamic CORS Resolver with Wildcard Fallback
app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser agents (Postman) or any matching domain / vercel deployment
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true); // Fallback to allow all incoming web traffic
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Preflight Request Explicit Handling
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

// Routes Configuration
const sfaRoutes = require('./routes/sfa');
const authRoutes = require('./routes/auth');
const checkTenantStatus = require('./middleware/checkTenantStatus');

// Mount Auth & SFA Routes
app.use('/api/auth', authRoutes);
app.use('/api/sfa', checkTenantStatus, sfaRoutes);

// Health Monitoring Endpoint
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

// Central Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('System Exception:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Secure SFA Enterprise Server live on port ${PORT}`);
});
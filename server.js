const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Headers & Cross-Origin Configuration
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json());

// Universal CORS Policy for Production, Vercel & Localhost
app.use(cors({
  origin: true, // Echoes the requesting origin (bypasses cross-domain restrictions cleanly)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle Preflight OPTIONS Requests Globally
app.options('*', cors());

// Global API Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saas_monetization_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected:', MONGO_URI))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// Routes Configuration
const sfaRoutes = require('./routes/sfa');
const authRoutes = require('./routes/auth');
const checkTenantStatus = require('./middleware/checkTenantStatus');

// Route Mounts
if (authRoutes) {
  app.use('/api/auth', authRoutes);
}
app.use('/api/sfa', checkTenantStatus, sfaRoutes);

// Detailed Server Health Monitoring Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'Healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Root Ping Route
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
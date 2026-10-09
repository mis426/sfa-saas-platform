const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Headers & CORS
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Global API Rate Limiter (Prevents DDoS)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saas_monetization_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected:', MONGO_URI))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// Routes
const sfaRoutes = require('./routes/sfa');
const checkTenantStatus = require('./middleware/checkTenantStatus');

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

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('System Exception:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Secure SFA Enterprise Server live on port ${PORT}`);
});
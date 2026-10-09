const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Direct express middleware export
const helmetConfig = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false // Local development CORS issues se bachne ke liye
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many login attempts, please try again later.' }
});

module.exports = { helmetConfig, apiLimiter, authLimiter };
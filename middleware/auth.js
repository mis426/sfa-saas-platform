const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Authorization header (e.g. "Bearer <token>")
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.replace('Bearer ', '') 
    : authHeader;

  // Check if no token provided
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No authorization token provided.' });
  }

  try {
    // Verify token using JWT Secret from .env
    const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user payload to req object
    // Payload contains: id, email, role, and clientId (for tenant users)
    req.user = decoded;

    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    
    return res.status(401).json({ error: 'Invalid token. Authorization denied.' });
  }
};
const jwt = require('jsonwebtoken');

// Authentication Check
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Contains id, clientId, role
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid authentication token.' });
  }
};

// Role Access Restriction Guard
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access forbidden. Role '${req.user?.role}' lacks necessary permissions.` 
      });
    }
    next();
  };
};
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // verifyToken middleware req.user set karta hai (jisme role hota hai)
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access Denied! Aapke paas is action ko perform karne ki permission nahi hai.' 
      });
    }
    next();
  };
};

module.exports = checkRole;
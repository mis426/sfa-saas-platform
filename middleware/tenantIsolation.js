module.exports = (req, res, next) => {
  if (req.user && req.user.role !== 'superadmin') {
    if (!req.user.clientId) {
      return res.status(403).json({ error: 'Tenant context missing. Access denied.' });
    }
    req.tenantFilter = { clientId: req.user.clientId };
  } else {
    req.tenantFilter = {}; // Superadmin can view all
  }
  next();
};
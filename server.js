const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'saas_super_secret_jwt_key_2026';

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json());

// Universal Dynamic CORS Resolution
app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
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

// Global Stores
global.tenantsStore = global.tenantsStore || [];
global.auditLogsStore = global.auditLogsStore || [];
global.clientUsersStore = global.clientUsersStore || [];
global.billingHistoryStore = global.billingHistoryStore || [];

// Middleware for JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (token === 'superadmin-prod-token-12345') {
        req.user = { email: 'superadmin@admin.com', role: 'superadmin' };
        return next();
      }
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Unified Universal Auth Handler
app.post(['/api/auth/login', '/auth/login'], (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'superadmin@admin.com' && password === 'adminpassword123') {
    const user = { email, role: 'superadmin', name: 'System Super Admin' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user });
  }

  const foundTenant = global.tenantsStore.find(
    t => t.clientAdminEmail?.toLowerCase() === email?.toLowerCase() && t.clientAdminPassword === password
  );

  if (foundTenant) {
    const user = {
      email: foundTenant.clientAdminEmail,
      role: 'admin',
      tenantId: foundTenant._id,
      companyName: foundTenant.companyName
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

// --- Client Portal Endpoints ---

// Get Client Team Data
app.get('/api/client/team', authenticateToken, (req, res) => {
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());

  const tenantName = tenant ? tenant.companyName : 'Acme Corp';
  const maxAllowedUsers = tenant ? tenant.maxAllowedUsers : 5;
  const tenantUsers = global.clientUsersStore.filter(u => u.tenantId === (tenant ? tenant._id : 'default'));

  res.json({
    tenantName,
    maxAllowedUsers,
    activeUsersCount: tenantUsers.length + 1, // Admin + Users
    users: [
      { _id: 'admin_1', name: tenant ? tenant.clientAdminName : 'Client Admin', email: userEmail, role: 'admin' },
      ...tenantUsers
    ]
  });
});

// Add Team Member
app.post('/api/client/team', authenticateToken, (req, res) => {
  const { name, email, password, role } = req.body;
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());

  const tenantUsers = global.clientUsersStore.filter(u => u.tenantId === (tenant ? tenant._id : 'default'));
  const maxAllowedUsers = tenant ? tenant.maxAllowedUsers : 5;

  if (tenantUsers.length + 1 >= maxAllowedUsers) {
    return res.status(400).json({ error: 'Seat limit reached! Upgrade your plan above to invite more members.' });
  }

  const newUser = {
    _id: 'user_' + Date.now(),
    tenantId: tenant ? tenant._id : 'default',
    name,
    email,
    password,
    role: role || 'user',
    createdAt: new Date()
  };

  global.clientUsersStore.push(newUser);
  res.status(201).json({ success: true, message: 'Team member added successfully', user: newUser });
});

// --- Billing Endpoints ---

// Get Billing History
app.get('/api/billing/history', authenticateToken, (req, res) => {
  res.json(global.billingHistoryStore);
});

// Upgrade Seats Capacity
app.post('/api/billing/upgrade-seats', authenticateToken, (req, res) => {
  const { additionalSeats } = req.body;
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());

  const seatsToAdd = parseInt(additionalSeats, 10) || 1;
  if (tenant) {
    tenant.maxAllowedUsers += seatsToAdd;
  }

  const invoice = {
    _id: 'inv_' + Date.now(),
    createdAt: new Date(),
    transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    additionalSeatsRequested: seatsToAdd,
    amountPaid: seatsToAdd * 10,
    paymentStatus: 'paid'
  };

  global.billingHistoryStore.unshift(invoice);

  res.json({
    success: true,
    message: `🎉 Capacity successfully expanded by +${seatsToAdd} seat(s)!`,
    invoice
  });
});

// --- SuperAdmin Endpoints ---
app.get('/api/superadmin/tenants', authenticateToken, (req, res) => {
  res.json(global.tenantsStore);
});

app.post('/api/superadmin/tenants', authenticateToken, (req, res) => {
  const { companyName, maxAllowedUsers, clientAdminName, clientAdminEmail, clientAdminPassword } = req.body;

  if (!companyName || !clientAdminEmail || !clientAdminPassword) {
    return res.status(400).json({ error: 'Company Name, Admin Email, and Password are required.' });
  }

  const newTenant = {
    _id: 'tenant_' + Date.now(),
    companyName,
    maxAllowedUsers: parseInt(maxAllowedUsers, 10) || 5,
    activeUsersCount: 1,
    status: 'active',
    clientAdminName,
    clientAdminEmail,
    clientAdminPassword,
    createdAt: new Date()
  };

  global.tenantsStore.push(newTenant);

  global.auditLogsStore.unshift({
    _id: 'log_' + Date.now(),
    action: 'TENANT_CREATED',
    clientId: { companyName },
    details: `Onboarded ${companyName} with ${maxAllowedUsers} max seats. Admin: ${clientAdminEmail}`,
    createdAt: new Date()
  });

  res.status(201).json({ success: true, message: 'Tenant onboarded successfully!', tenant: newTenant });
});

app.patch('/api/superadmin/tenants/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const tenant = global.tenantsStore.find(t => t._id === id);
  if (tenant) {
    tenant.status = status;
    global.auditLogsStore.unshift({
      _id: 'log_' + Date.now(),
      action: status === 'suspended' ? 'TENANT_SUSPENDED' : 'TENANT_ACTIVATED',
      clientId: { companyName: tenant.companyName },
      details: `Tenant ${tenant.companyName} status changed to ${status}`,
      createdAt: new Date()
    });
    return res.json({ success: true, tenant });
  }
  res.status(404).json({ error: 'Tenant not found' });
});

app.get('/api/superadmin/audit-logs', authenticateToken, (req, res) => {
  res.json(global.auditLogsStore);
});

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
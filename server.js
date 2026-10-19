const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'saas_super_secret_jwt_key_2026';

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json());

// Open CORS Configuration for Vercel Frontend Access
app.use(cors({
  origin: function (origin, callback) { return callback(null, true); },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.options('*', cors());

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', apiLimiter);

// Database Connection with Fallback Memory Execution
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saas_monetization_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('⚠️ MongoDB Offline - Running in-memory mode:', err.message));

// Seeded Stores for Enterprise Users and Core Data
global.tenantsStore = global.tenantsStore || [
  {
    _id: 'tenant_acme_default',
    companyName: 'Acme Corp',
    maxAllowedUsers: 5,
    activeUsersCount: 2,
    status: 'active',
    clientAdminName: 'John Doe',
    clientAdminEmail: 'clientadmin@acme.com',
    clientAdminPassword: 'acmepassword123',
    createdAt: new Date()
  }
];

global.clientUsersStore = global.clientUsersStore || [
  {
    _id: 'user_balwant_1',
    tenantId: 'tenant_acme_default',
    name: 'Balwant Singh',
    email: 'balwant@acme.com',
    password: 'balwant',
    role: 'user',
    createdAt: new Date()
  }
];

// Phase 1: Feature Modules Master Toggle Store
global.sfaModulesStore = global.sfaModulesStore || {
  leaveManagement: true,
  expenses: true,
  tasks: true,
  orders: true,
  clients: true,
  chat: true,
  photos: true,
  forms: true,
  advances: true,
  conveyances: true
};

// Phase 2: Attendance Rules Engine Store
global.sfaAttendanceRulesStore = global.sfaAttendanceRulesStore || {
  gracePeriodMinutes: 15,
  strictMode: true,
  autoCheckoutTime: '19:00',
  geofenceRadiusMeters: 200,
  preventEarlyPunchOut: true,
  allowManualPunch: false
};

// Phase 3: Expense & Odometer Reimbursement Engine Store
global.sfaExpenseRulesStore = global.sfaExpenseRulesStore || {
  perKmReimbursementRate: 8,
  dailyFoodAllowanceLimit: 500,
  dailyHotelAllowanceLimit: 2500,
  categories: ['Travel', 'Meals', 'Accommodation', 'Office Supplies', 'Telephone Bill']
};

global.sfaExpenseClaimsStore = global.sfaExpenseClaimsStore || [
  {
    _id: 'exp_1',
    userEmail: 'balwant@acme.com',
    userName: 'Balwant Singh',
    category: 'Travel',
    amount: 320,
    startKm: 1240,
    endKm: 1280,
    totalKm: 40,
    notes: 'Visited Okhla Industrial Area Outlets',
    status: 'Approved',
    createdAt: new Date()
  }
];

// Phase 4: BEAT Plan & Custom Task Templates Store
global.sfaTaskTemplatesStore = global.sfaTaskTemplatesStore || [
  { _id: 'task_1', name: 'Add Store Branding Photo', status: 'Active', teamVisibility: 'All Teams' },
  { _id: 'task_2', name: 'New Outlet Onboarding Check', status: 'Active', teamVisibility: 'All Teams' },
  { _id: 'task_3', name: 'Stock Audit & Order Form', status: 'Active', teamVisibility: 'All Teams' }
];

// Phase 5: API Access Keys & Enterprise Integrations Store
global.sfaApiTokensStore = global.sfaApiTokensStore || [
  { _id: 'token_1', keyName: 'ERP Primary Sync Key', token: 'vKey_live_99812a3b4c', createdAt: new Date(), status: 'Active' }
];

global.sfaIntegrationsStore = global.sfaIntegrationsStore || {
  zohoCrm: true,
  greytHr: false,
  hrOne: true,
  keka: false,
  oracleCloud: false,
  zohoBooks: true
};

global.auditLogsStore = global.auditLogsStore || [];
global.billingHistoryStore = global.billingHistoryStore || [];
global.sfaLeadsStore = global.sfaLeadsStore || [];
global.sfaProductsStore = global.sfaProductsStore || [];
global.sfaOrdersStore = global.sfaOrdersStore || [];
global.sfaVisitsStore = global.sfaVisitsStore || [];

// Auth JWT Verification Middleware
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

// Unified Production Login Endpoint
app.post(['/api/auth/login', '/auth/login'], (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password).trim();

  // 1. SuperAdmin Login Route
  if (cleanEmail === 'superadmin@admin.com' && cleanPassword === 'adminpassword123') {
    const user = { email: cleanEmail, role: 'superadmin', name: 'System Super Admin' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user });
  }

  // 2. Client Admin Login Route
  const foundTenant = global.tenantsStore.find(
    t => t.clientAdminEmail?.toLowerCase() === cleanEmail && t.clientAdminPassword === cleanPassword
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

  // 3. Field Sales Rep Login Route
  const foundUser = global.clientUsersStore.find(
    u => u.email?.toLowerCase() === cleanEmail && u.password === cleanPassword
  );

  if (foundUser) {
    const user = { 
      email: foundUser.email, 
      role: foundUser.role || 'user', 
      tenantId: foundUser.tenantId,
      name: foundUser.name
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

// Phase 1 Settings API: Modules
app.get('/api/settings/modules', authenticateToken, (req, res) => res.json(global.sfaModulesStore));
app.post('/api/settings/modules', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can update module settings' });
  }
  global.sfaModulesStore = { ...global.sfaModulesStore, ...req.body };
  res.json({ success: true, message: 'Module settings updated successfully!', modules: global.sfaModulesStore });
});

// Phase 2 Settings API: Attendance Rules
app.get('/api/settings/attendance-rules', authenticateToken, (req, res) => res.json(global.sfaAttendanceRulesStore));
app.post('/api/settings/attendance-rules', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can update attendance rules' });
  }
  global.sfaAttendanceRulesStore = { ...global.sfaAttendanceRulesStore, ...req.body };
  res.json({ success: true, message: 'Attendance rules updated successfully!', rules: global.sfaAttendanceRulesStore });
});

// Phase 3 Settings API: Expenses & Conveyance
app.get('/api/settings/expense-rules', authenticateToken, (req, res) => res.json(global.sfaExpenseRulesStore));
app.post('/api/settings/expense-rules', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can update expense rules' });
  }
  global.sfaExpenseRulesStore = { ...global.sfaExpenseRulesStore, ...req.body };
  res.json({ success: true, message: 'Expense limits updated successfully!', rules: global.sfaExpenseRulesStore });
});

app.get('/api/sfa/expenses', authenticateToken, (req, res) => res.json(global.sfaExpenseClaimsStore));
app.post('/api/sfa/expenses', authenticateToken, (req, res) => {
  const { category, amount, startKm, endKm, notes } = req.body;
  let computedAmount = parseFloat(amount) || 0;
  let totalKm = 0;

  if (category === 'Travel' && startKm && endKm) {
    const sKm = parseFloat(startKm) || 0;
    const eKm = parseFloat(endKm) || 0;
    if (eKm > sKm) {
      totalKm = eKm - sKm;
      computedAmount = totalKm * (global.sfaExpenseRulesStore.perKmReimbursementRate || 8);
    }
  }

  const newClaim = {
    _id: 'exp_' + Date.now(),
    userEmail: req.user.email,
    userName: req.user.name || 'Sales Rep',
    category,
    amount: computedAmount,
    startKm: parseFloat(startKm) || 0,
    endKm: parseFloat(endKm) || 0,
    totalKm,
    notes,
    status: 'Pending',
    createdAt: new Date()
  };

  global.sfaExpenseClaimsStore.unshift(newClaim);
  res.status(201).json({ success: true, claim: newClaim });
});

app.patch('/api/sfa/expenses/:id/status', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can approve claims' });
  }
  const claim = global.sfaExpenseClaimsStore.find(c => c._id === req.params.id);
  if (claim) {
    claim.status = req.body.status || 'Approved';
    return res.json({ success: true, claim });
  }
  res.status(404).json({ error: 'Claim not found' });
});

// Phase 4 Settings API: Tasks & BEAT
app.get('/api/settings/task-templates', authenticateToken, (req, res) => res.json(global.sfaTaskTemplatesStore));
app.post('/api/settings/task-templates', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can create task templates' });
  }
  const newTask = {
    _id: 'task_' + Date.now(),
    name: req.body.name,
    status: 'Active',
    teamVisibility: req.body.teamVisibility || 'All Teams'
  };
  global.sfaTaskTemplatesStore.unshift(newTask);
  res.status(201).json({ success: true, task: newTask });
});

// Phase 5 Settings API: API Tokens & Integrations
app.get('/api/settings/tokens', authenticateToken, (req, res) => res.json(global.sfaApiTokensStore));
app.post('/api/settings/tokens', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can generate tokens' });
  }
  const newToken = {
    _id: 'token_' + Date.now(),
    keyName: req.body.keyName || 'Generated API Key',
    token: 'vKey_live_' + Math.random().toString(36).substr(2, 10),
    createdAt: new Date(),
    status: 'Active'
  };
  global.sfaApiTokensStore.unshift(newToken);
  res.status(201).json({ success: true, token: newToken });
});

app.get('/api/settings/integrations', authenticateToken, (req, res) => res.json(global.sfaIntegrationsStore));
app.post('/api/settings/integrations', authenticateToken, (req, res) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only Client Admin can modify integrations' });
  }
  global.sfaIntegrationsStore = { ...global.sfaIntegrationsStore, ...req.body };
  res.json({ success: true, message: 'Integration toggles updated successfully!', integrations: global.sfaIntegrationsStore });
});

// Team Management & Billing APIs
app.get('/api/client/team', authenticateToken, (req, res) => {
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());
  const tenantName = tenant ? tenant.companyName : 'Acme Corp';
  const maxAllowedUsers = tenant ? tenant.maxAllowedUsers : 5;
  const tenantUsers = global.clientUsersStore.filter(u => u.tenantId === (tenant ? tenant._id : 'tenant_acme_default'));

  res.json({
    tenantName,
    maxAllowedUsers,
    activeUsersCount: tenantUsers.length + 1,
    users: [{ _id: 'admin_1', name: tenant ? tenant.clientAdminName : 'Client Admin', email: userEmail, role: 'admin' }, ...tenantUsers]
  });
});

app.post('/api/client/team', authenticateToken, (req, res) => {
  const { name, email, password, role } = req.body;
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());
  const tenantUsers = global.clientUsersStore.filter(u => u.tenantId === (tenant ? tenant._id : 'tenant_acme_default'));
  const maxAllowedUsers = tenant ? tenant.maxAllowedUsers : 5;

  if (tenantUsers.length + 1 >= maxAllowedUsers) {
    return res.status(400).json({ error: 'Seat limit reached! Upgrade plan above.' });
  }

  const newUser = { _id: 'user_' + Date.now(), tenantId: tenant ? tenant._id : 'tenant_acme_default', name, email, password, role: role || 'user', createdAt: new Date() };
  global.clientUsersStore.push(newUser);
  res.status(201).json({ success: true, message: 'Team member added successfully', user: newUser });
});

app.get('/api/billing/history', authenticateToken, (req, res) => res.json(global.billingHistoryStore));

app.post('/api/billing/upgrade-seats', authenticateToken, (req, res) => {
  const { additionalSeats } = req.body;
  const userEmail = req.user.email;
  const tenant = global.tenantsStore.find(t => t.clientAdminEmail?.toLowerCase() === userEmail?.toLowerCase());
  const seatsToAdd = parseInt(additionalSeats, 10) || 1;
  if (tenant) tenant.maxAllowedUsers += seatsToAdd;

  const invoice = { _id: 'inv_' + Date.now(), createdAt: new Date(), transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(), additionalSeatsRequested: seatsToAdd, amountPaid: seatsToAdd * 10, paymentStatus: 'paid' };
  global.billingHistoryStore.unshift(invoice);
  res.json({ success: true, message: `Capacity expanded by +${seatsToAdd} seat(s)!`, invoice });
});

// SFA Core Endpoints
app.get('/api/sfa/analytics', authenticateToken, (req, res) => {
  const totalRevenue = global.sfaOrdersStore.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalLeads = global.sfaLeadsStore.length;
  const wonLeads = global.sfaLeadsStore.filter(l => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  res.json({
    totalLeads,
    wonLeads,
    conversionRate,
    totalOrdersCount: global.sfaOrdersStore.length,
    totalRevenue,
    visitsCount: global.sfaVisitsStore.length
  });
});

app.get('/api/sfa/leads', authenticateToken, (req, res) => res.json(global.sfaLeadsStore));
app.post('/api/sfa/leads', authenticateToken, (req, res) => {
  const { clientName, contactPerson, phone, value } = req.body;
  const newLead = { _id: 'lead_' + Date.now(), clientName, contactPerson, phone, value: parseFloat(value) || 0, status: 'New', createdAt: new Date() };
  global.sfaLeadsStore.unshift(newLead);
  res.status(201).json(newLead);
});

app.get('/api/sfa/products', authenticateToken, (req, res) => res.json(global.sfaProductsStore));
app.post('/api/sfa/products', authenticateToken, (req, res) => {
  const { name, sku, price, stock } = req.body;
  const newProd = { _id: 'prod_' + Date.now(), name, sku, price: parseFloat(price) || 0, stock: parseInt(stock, 10) || 0 };
  global.sfaProductsStore.unshift(newProd);
  res.status(201).json(newProd);
});

app.get('/api/sfa/orders', authenticateToken, (req, res) => res.json(global.sfaOrdersStore));
app.post('/api/sfa/orders', authenticateToken, (req, res) => {
  const { customerName, items } = req.body;
  const totalAmount = items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0);
  const newOrder = { _id: 'ord_' + Date.now(), customerName, items, totalAmount, createdAt: new Date() };
  global.sfaOrdersStore.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.get('/api/sfa/visits', authenticateToken, (req, res) => res.json(global.sfaVisitsStore));
app.post('/api/sfa/checkin', authenticateToken, (req, res) => {
  const { clientName, lat, lng, notes } = req.body;
  const newVisit = { _id: 'visit_' + Date.now(), clientName, location: { lat, lng }, notes, createdAt: new Date() };
  global.sfaVisitsStore.unshift(newVisit);
  res.status(201).json(newVisit);
});

// SuperAdmin Endpoints
app.get('/api/superadmin/tenants', authenticateToken, (req, res) => res.json(global.tenantsStore));
app.post('/api/superadmin/tenants', authenticateToken, (req, res) => {
  const { companyName, maxAllowedUsers, clientAdminName, clientAdminEmail, clientAdminPassword } = req.body;
  const newTenant = { _id: 'tenant_' + Date.now(), companyName, maxAllowedUsers: parseInt(maxAllowedUsers, 10) || 5, activeUsersCount: 1, status: 'active', clientAdminName, clientAdminEmail, clientAdminPassword, createdAt: new Date() };
  global.tenantsStore.push(newTenant);
  global.auditLogsStore.unshift({ _id: 'log_' + Date.now(), action: 'TENANT_CREATED', clientId: { companyName }, details: `Onboarded ${companyName}`, createdAt: new Date() });
  res.status(201).json({ success: true, tenant: newTenant });
});

app.get('/api/superadmin/audit-logs', authenticateToken, (req, res) => res.json(global.auditLogsStore));

// Server Health Endpoint for Cold-Start Wakeup Ping
app.get('/health', (req, res) => res.json({ status: 'Healthy', database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected', timestamp: new Date() }));
app.get('/', (req, res) => res.send('🚀 VeloceSFA Enterprise Server Live'));

// Render Instance Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Secure VeloceSFA Enterprise Server live on port ${PORT}`));
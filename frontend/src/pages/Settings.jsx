import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Clock, Calendar, MapPin, Gauge, Receipt, FileText, 
  ShoppingCart, Building2, CheckSquare, MessageSquare, Sliders, 
  Smartphone, Key, ShieldCheck, Cpu, Grid, Plus, Save, CheckCircle, Upload,
  RefreshCw, ExternalLink, HelpCircle
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Settings = () => {
  const { token, user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

  const [activeTab, setActiveTab] = useState('Account');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Account Settings State
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [currency, setCurrency] = useState('INR - Indian rupees');
  const [displayUserTimezone, setDisplayUserTimezone] = useState('Disabled');

  // 2. Attendance State
  const [approvalMethod, setApprovalMethod] = useState('Reporting Hierarchy');
  const [gracePeriod, setGracePeriod] = useState(15);
  const [strictMode, setStrictMode] = useState('Off');

  // 3. Location Tracking State
  const [updateIntervalMins, setUpdateIntervalMins] = useState(5);
  const [showDistance, setShowDistance] = useState('On');
  const [distanceCalc, setDistanceCalc] = useState('From Punch-In to Punch-Out');

  // 4. Expense State
  const [expenseCategories, setExpenseCategories] = useState([
    { _id: '1', name: 'Office supplies', createdOn: '17/10/2026', modifiedOn: '17/10/2026', status: true },
    { _id: '2', name: 'Accommodation', createdOn: '17/10/2026', modifiedOn: '17/10/2026', status: true },
    { _id: '3', name: 'Travel', createdOn: '17/10/2026', modifiedOn: '17/10/2026', status: true },
    { _id: '4', name: 'Meals', createdOn: '17/10/2026', modifiedOn: '17/10/2026', status: true }
  ]);

  // 5. Custom Tasks State
  const [tasks, setTasks] = useState([
    { _id: 't1', name: 'Add Photo', status: 'Active', teamVisibility: 'All Teams', createdOn: '17-10-2026' },
    { _id: 't2', name: 'Add Client', status: 'Active', teamVisibility: 'All Teams', createdOn: '17-10-2026' },
    { _id: 't3', name: 'Check-In Task', status: 'Active', teamVisibility: 'All Teams', createdOn: '17-10-2026' }
  ]);

  // 6. Custom Fields Module State
  const [customFieldModule, setCustomFieldModule] = useState('Employees');

  // 7. API Access Tokens State
  const [apiTokens, setApiTokens] = useState([]);
  const [companyId] = useState('23422');

  // 8. Compliance Settings State
  const [badSettingsLimit, setBadSettingsLimit] = useState(0);

  // 9. Integrations State
  const [integrations, setIntegrations] = useState({
    zohoCrm: true, greytHr: false, hrOne: true, zohoPeople: false,
    keka: false, oracleCloud: false, spineHr: false, peopleStrong: false, zohoBooks: true
  });

  // 10. Modules Master Toggles State
  const [modules, setModules] = useState({
    leaveManagement: true, expenses: true, tasks: true, orders: true,
    clients: true, chat: true, photos: true, forms: true,
    languageSelection: true, advances: true, conveyances: true
  });

  // Fetch Settings Data From Server
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const [modRes, tokenRes, intRes] = await Promise.all([
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/modules', { headers }).catch(() => null),
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/tokens', { headers }).catch(() => null),
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/integrations', { headers }).catch(() => null)
      ]);

      if (modRes?.data) setModules(prev => ({ ...prev, ...modRes.data }));
      if (tokenRes?.data) setApiTokens(tokenRes.data);
      if (intRes?.data) setIntegrations(prev => ({ ...prev, ...intRes.data }));
    } catch (err) {
      console.error('Fetch Settings Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [token]);

  const handleSave = async (tabName) => {
    try {
      setSaveSuccess(`Settings for ${tabName} updated successfully!`);
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (err) {
      console.error('Save settings error:', err);
    }
  };

  const navItems = [
    { id: 'Account', label: 'Account', icon: <User size={15} /> },
    { id: 'Attendance', label: 'Attendance', icon: <Clock size={15} /> },
    { id: 'Leaves', label: 'Leaves & Holidays', icon: <Calendar size={15} /> },
    { id: 'Location', label: 'Location Tracking', icon: <MapPin size={15} /> },
    { id: 'Odometer', label: 'Odometer', icon: <Gauge size={15} /> },
    { id: 'Expense', label: 'Expense', icon: <Receipt size={15} /> },
    { id: 'ClientTemplates', label: 'Client Templates', icon: <FileText size={15} /> },
    { id: 'Orders', label: 'Orders', icon: <ShoppingCart size={15} /> },
    { id: 'SiteTypes', label: 'Site Types', icon: <Building2 size={15} /> },
    { id: 'Tasks', label: 'Tasks', icon: <CheckSquare size={15} /> },
    { id: 'Communication', label: 'Communication Rules', icon: <MessageSquare size={15} /> },
    { id: 'CustomFields', label: 'Custom Fields', icon: <Sliders size={15} /> },
    { id: 'SMS', label: 'SMS', icon: <Smartphone size={15} /> },
    { id: 'APITokens', label: 'API Access Tokens', icon: <Key size={15} /> },
    { id: 'Compliance', label: 'Compliance', icon: <ShieldCheck size={15} /> },
    { id: 'Integrations', label: 'Integrations', icon: <Cpu size={15} /> },
    { id: 'Modules', label: 'Modules', icon: <Grid size={15} /> }
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 50px)', backgroundColor: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Left Sidebar Menu */}
      <div style={{ width: '220px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '12px 0' }}>
        <div style={{ padding: '0 16px 12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Settings
        </div>
        <div style={{ marginTop: '8px' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                border: 'none',
                backgroundColor: activeTab === item.id ? '#eff6ff' : 'transparent',
                color: activeTab === item.id ? '#2563eb' : '#64748b',
                fontWeight: activeTab === item.id ? '600' : 'normal',
                borderLeft: activeTab === item.id ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '12px',
                textAlign: 'left'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Right View */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', backgroundColor: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Standard</span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Delete Sample Data</button>
            <button style={{ backgroundColor: '#f1f5f9', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>✨ June</button>
            <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>💬 Chats</button>
          </div>
        </div>

        {saveSuccess && (
          <div style={{ padding: '10px 14px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '6px', marginBottom: '14px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={15} /> {saveSuccess}
          </div>
        )}

        {/* 1. ACCOUNT */}
        {activeTab === 'Account' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>Account Settings</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Timezone</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC Universal</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                  <option value="INR - Indian rupees">INR - Indian rupees</option>
                  <option value="USD - US Dollar">USD - US Dollar</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Display User Data Timezone</label>
                <select value={displayUserTimezone} onChange={(e) => setDisplayUserTimezone(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                  <option value="Disabled">Disabled</option>
                  <option value="Enabled">Enabled</option>
                </select>
              </div>
            </div>

            <button onClick={() => handleSave('Account')} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
              Save Account Settings
            </button>
          </div>
        )}

        {/* 11. COMMUNICATION RULES (Screenshot 1 Exact) */}
        {activeTab === 'Communication' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>Company Level Settings</h4>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Action Communication Rules</div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                  <option>Order</option>
                </select>
                <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ Add New Rule</button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Who to Send To ?</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Contact</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>When to Send ?</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>How to Send?</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Team</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>No rows</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 12. CUSTOM FIELDS (Screenshot 2 Exact) */}
        {activeTab === 'CustomFields' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>Custom Fields</h4>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Customize what fields you capture when creating a new clients/orders/products/Advances/Employees through the mobile app / admin panel</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Module</span>
                <select value={customFieldModule} onChange={(e) => setCustomFieldModule(e.target.value)} style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                  <option value="Employees">Employees</option>
                  <option value="Clients">Clients</option>
                  <option value="Orders">Orders</option>
                </select>
                <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ Add</button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Sequence</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Field Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Input Type</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Input Value</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Active</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Required</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>No rows</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 14. API ACCESS TOKENS (Screenshot 3 Exact) */}
        {activeTab === 'APITokens' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#0f172a' }}>Manage API Access Tokens</h4>

            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e3a8a' }}>API Explorer </span>
                <span style={{ backgroundColor: '#2563eb', color: '#fff', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>
                <div style={{ fontSize: '11px', color: '#1e40af', marginTop: '4px' }}>We've launched a new interactive API Explorer where you can test endpoints, explore schemas, and build integrations right in your browser.</div>
              </div>
              <button style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Open Explorer →
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>📄 API Explorer</button>
              <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>{"< >"} Postman Docs <span style={{ fontSize: '10px', color: '#d97706' }}>DEPRECATED</span></button>
              <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>📘 Training Guide</button>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#15803d', marginBottom: '20px' }}>
              ℹ️ Your Company ID is <strong>{companyId}</strong>. Pass this as the <code>id</code> header when using the legacy REST APIs.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Access Tokens ({apiTokens.length}/10)</div>
              <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ Create New Key</button>
            </div>

            <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: '13px' }}>
              There are no API access tokens associated with your account. Click on "Create New Key" to generate a new access token.
            </div>
          </div>
        )}

        {/* 15. COMPLIANCE (Screenshot 4 Exact) */}
        {activeTab === 'Compliance' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#0f172a' }}>Bad settings limit</h4>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>The number of consecutive days allowed for bad app settings before making watching video and uploading settings screenshot mandatory</div>
            <input 
              type="number" 
              value={badSettingsLimit} 
              onChange={(e) => setBadSettingsLimit(e.target.value)} 
              style={{ width: '120px', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}
            />
          </div>
        )}

        {/* 16. INTEGRATIONS (Screenshot 5 Exact) */}
        {activeTab === 'Integrations' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#0f172a' }}>Integrations</h4>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Connect Unolo with other systems with a single click.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>Integrations</button>
                <button style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px' }}>Webhooks</button>
                <button style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px' }}>Integration Logs</button>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>CRM Integrations</div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '14px', width: '220px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#d97706', fontSize: '13px' }}>Zoho CRM</span>
                  <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Connect</button>
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>Two way sync between Zoho CRM (leads/accounts/contacts) and Unolo.</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>HRMS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { name: 'greytHR', desc: 'Sync attendance from Unolo to GreytHR.' },
                  { name: 'HROne', desc: 'Sync attendance from Unolo to HROne.' },
                  { name: 'Zoho People', desc: 'Sync attendance and/or leaves data.' },
                  { name: 'Keka', desc: 'Sync Attendance/Expense/Leaves.' },
                  { name: 'Oracle Cloud', desc: 'EOD sync of paired attendance.' },
                  { name: 'Spine HR', desc: 'Sync attendance into Spine HR.' },
                  { name: 'PeopleStrong', desc: 'Send attendance punches on schedule.' }
                ].map((item) => (
                  <div key={item.name} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</span>
                      <button style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Connect</button>
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 17. MODULES (Screenshot 6 Exact) */}
        {activeTab === 'Modules' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#0f172a' }}>Modules</h4>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>Enable/Disable different modules on the admin panel and Employee app</div>

            {Object.keys(modules).map((mKey) => (
              <div key={mKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize' }}>{mKey.replace(/([A-Z])/g, ' $1')}</span>
                <input
                  type="checkbox"
                  checked={modules[mKey]}
                  onChange={() => setModules({ ...modules, [mKey]: !modules[mKey] })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* DEFAULT FALLBACK FOR OTHER UNOLO TABS */}
        {!['Account', 'Communication', 'CustomFields', 'APITokens', 'Compliance', 'Integrations', 'Modules'].includes(activeTab) && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{activeTab} Settings</h4>
            <p style={{ fontSize: '12px' }}>Configurations active for {activeTab}.</p>
            <button onClick={() => handleSave(activeTab)} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', marginTop: '10px' }}>
              Save {activeTab} Configuration
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default Settings;
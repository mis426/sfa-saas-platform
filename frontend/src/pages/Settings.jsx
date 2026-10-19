import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const Settings = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

  const [activeSubTab, setActiveSubTab] = useState('modules');
  
  // State 1: Modules
  const [modules, setModules] = useState({
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
  });

  // State 2: Attendance Rules
  const [attendanceRules, setAttendanceRules] = useState({
    gracePeriodMinutes: 15,
    strictMode: true,
    autoCheckoutTime: '19:00',
    geofenceRadiusMeters: 200,
    preventEarlyPunchOut: true,
    allowManualPunch: false
  });

  // State 3: Expense & Conveyance Rules
  const [expenseRules, setExpenseRules] = useState({
    perKmReimbursementRate: 8,
    dailyFoodAllowanceLimit: 500,
    dailyHotelAllowanceLimit: 2500,
    categories: ['Travel', 'Meals', 'Accommodation', 'Office Supplies', 'Telephone Bill']
  });

  const [newCat, setNewCat] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [modRes, attRes, expRes] = await Promise.all([
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/modules', { headers }).catch(() => ({ data: modules })),
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/attendance-rules', { headers }).catch(() => ({ data: attendanceRules })),
        axios.get('https://sfa-saas-platform.onrender.com/api/settings/expense-rules', { headers }).catch(() => ({ data: expenseRules }))
      ]);

      if (modRes.data) setModules(modRes.data);
      if (attRes.data) setAttendanceRules(attRes.data);
      if (expRes.data) setExpenseRules(expRes.data);
    } catch (err) {
      console.error('Fetch settings error:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggleModule = (key) => {
    if (!isAdmin) return;
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveModules = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://sfa-saas-platform.onrender.com/api/settings/modules', modules, { headers: { Authorization: `Bearer ${token}` } });
      setMsg({ type: 'success', text: '🎉 Module configuration saved successfully!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to save settings.' });
    } finally { setSaving(false); }
  };

  const handleSaveAttendanceRules = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://sfa-saas-platform.onrender.com/api/settings/attendance-rules', attendanceRules, { headers: { Authorization: `Bearer ${token}` } });
      setMsg({ type: 'success', text: '🎉 Attendance rules saved successfully!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to save attendance rules.' });
    } finally { setSaving(false); }
  };

  const handleSaveExpenseRules = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://sfa-saas-platform.onrender.com/api/settings/expense-rules', expenseRules, { headers: { Authorization: `Bearer ${token}` } });
      setMsg({ type: 'success', text: '🎉 Expense & Odometer rules updated!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to save expense limits.' });
    } finally { setSaving(false); }
  };

  const handleAddCategory = () => {
    if (!newCat.trim()) return;
    setExpenseRules({ ...expenseRules, categories: [...expenseRules.categories, newCat.trim()] });
    setNewCat('');
  };

  const moduleList = [
    { key: 'leaveManagement', label: 'Leave Management', desc: 'Enable/Disable leave requests & balance tracking' },
    { key: 'expenses', label: 'Expenses Claim', desc: 'Allow field reps to claim TA/DA & daily expenses' },
    { key: 'tasks', label: 'Tasks & BEAT Plan', desc: 'Smarter field coverage & route assignment' },
    { key: 'orders', label: 'Order Booking System', desc: 'Primary & Secondary order booking catalog' },
    { key: 'clients', label: 'Clients & Outlets', desc: 'Retailer & Distributor mapping directory' },
    { key: 'chat', label: 'Internal Team Chat', desc: 'In-app field communication & broadcasts' },
    { key: 'photos', label: 'Photo Audit Captures', desc: 'Mandatory store branding & visit image uploads' },
    { key: 'forms', label: 'Custom Survey Forms', desc: 'Store feedback and audit questionnaires' },
    { key: 'advances', label: 'Advance Payment Claims', desc: 'Request advance field operational funds' },
    { key: 'conveyances', label: 'Odometer & Travel Allowance', desc: 'Automatic KM calculation and daily conveyance' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Settings Sub-Menu Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '20px 12px' }}>
        <h3 style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '16px', paddingLeft: '8px', fontWeight: 'bold' }}>Settings</h3>
        {[
          { id: 'modules', label: '🎛️ Feature Modules' },
          { id: 'attendance', label: '⏰ Attendance Rules' },
          { id: 'expenses', label: '💸 Expense & Conveyance' },
          { id: 'api', label: '🔑 API Access Tokens' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveSubTab(tab.id); setMsg({ type: '', text: '' }); }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeSubTab === tab.id ? '#e0f2fe' : 'transparent',
              color: activeSubTab === tab.id ? '#0284c7' : '#475569',
              fontWeight: activeSubTab === tab.id ? 'bold' : 'normal',
              cursor: 'pointer',
              marginBottom: '4px',
              fontSize: '13px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Workspace Panel */}
      <div style={{ flex: 1, padding: '32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {msg.text && (
            <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '20px', backgroundColor: msg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: msg.type === 'success' ? '#16a34a' : '#dc2626', fontSize: '13px' }}>
              {msg.text}
            </div>
          )}

          {/* TAB 1: FEATURE MODULES */}
          {activeSubTab === 'modules' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>Platform Modules Control</h1>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                    Enable/Disable different modules on the admin panel and Employee App.
                  </p>
                </div>
                {isAdmin && (
                  <button onClick={handleSaveModules} disabled={saving} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </button>
                )}
              </div>

              <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {moduleList.map((m, idx) => (
                  <div key={m.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: idx === moduleList.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>{m.label}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{m.desc}</div>
                    </div>

                    <div
                      onClick={() => handleToggleModule(m.key)}
                      style={{
                        width: '46px',
                        height: '24px',
                        backgroundColor: modules[m.key] ? '#2563eb' : '#cbd5e1',
                        borderRadius: '12px',
                        padding: '2px',
                        cursor: isAdmin ? 'pointer' : 'not-allowed',
                        transition: 'background-color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justify: modules[m.key] ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 2: ATTENDANCE & GEO-FENCE RULES */}
          {activeSubTab === 'attendance' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>Attendance & Compliance Rules</h1>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                    Configure punching grace periods, auto checkout times, and geo-fence strict boundaries.
                  </p>
                </div>
                {isAdmin && (
                  <button onClick={handleSaveAttendanceRules} disabled={saving} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    {saving ? 'Saving...' : 'Save Attendance Rules'}
                  </button>
                )}
              </div>

              <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Grace Period (Minutes)</label>
                    <input 
                      type="number" 
                      value={attendanceRules.gracePeriodMinutes} 
                      onChange={(e) => setAttendanceRules({...attendanceRules, gracePeriodMinutes: parseInt(e.target.value, 10) || 0})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Geo-fence Boundary Radius (Meters)</label>
                    <input 
                      type="number" 
                      value={attendanceRules.geofenceRadiusMeters} 
                      onChange={(e) => setAttendanceRules({...attendanceRules, geofenceRadiusMeters: parseInt(e.target.value, 10) || 0})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Auto Sign-Out Time</label>
                    <input 
                      type="time" 
                      value={attendanceRules.autoCheckoutTime} 
                      onChange={(e) => setAttendanceRules({...attendanceRules, autoCheckoutTime: e.target.value})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: isAdmin ? 'pointer' : 'not-allowed' }}>
                    <input 
                      type="checkbox" 
                      checked={attendanceRules.strictMode} 
                      onChange={(e) => setAttendanceRules({...attendanceRules, strictMode: e.target.checked})}
                      disabled={!isAdmin}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>Geo-Fence Strict Mode (Reject punch-in if outside store boundary)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: isAdmin ? 'pointer' : 'not-allowed' }}>
                    <input 
                      type="checkbox" 
                      checked={attendanceRules.preventEarlyPunchOut} 
                      onChange={(e) => setAttendanceRules({...attendanceRules, preventEarlyPunchOut: e.target.checked})}
                      disabled={!isAdmin}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>Prevent Early Punch-Out before shift completion</span>
                  </label>
                </div>

              </div>
            </>
          )}

          {/* TAB 3: EXPENSE & ODOMETER CONVEYANCE RULES */}
          {activeSubTab === 'expenses' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>Expense & Conveyance Rules</h1>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                    Set daily reimbursement limits, Odometer per-KM conveyance rate, and allowed categories.
                  </p>
                </div>
                {isAdmin && (
                  <button onClick={handleSaveExpenseRules} disabled={saving} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                    {saving ? 'Saving...' : 'Save Expense Rules'}
                  </button>
                )}
              </div>

              <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Per-KM Rate (₹ / KM)</label>
                    <input 
                      type="number" 
                      value={expenseRules.perKmReimbursementRate} 
                      onChange={(e) => setExpenseRules({...expenseRules, perKmReimbursementRate: parseFloat(e.target.value) || 0})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Daily Food Limit (₹)</label>
                    <input 
                      type="number" 
                      value={expenseRules.dailyFoodAllowanceLimit} 
                      onChange={(e) => setExpenseRules({...expenseRules, dailyFoodAllowanceLimit: parseFloat(e.target.value) || 0})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px' }}>Daily Hotel Limit (₹)</label>
                    <input 
                      type="number" 
                      value={expenseRules.dailyHotelAllowanceLimit} 
                      onChange={(e) => setExpenseRules({...expenseRules, dailyHotelAllowanceLimit: parseFloat(e.target.value) || 0})}
                      disabled={!isAdmin}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#0f172a' }}>Expense Categories</h3>
                  
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <input 
                        type="text" 
                        placeholder="Add New Category (e.g., Toll Tax)" 
                        value={newCat} 
                        onChange={(e) => setNewCat(e.target.value)} 
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                      />
                      <button onClick={handleAddCategory} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add</button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {expenseRules.categories.map((c, idx) => (
                      <span key={idx} style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #cbd5e1' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default Settings;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const Settings = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

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

  const [activeSubTab, setActiveSubTab] = useState('modules');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchModules = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('https://sfa-saas-platform.onrender.com/api/settings/modules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModules(res.data);
    } catch (err) {
      console.error('Fetch modules error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleToggle = (key) => {
    if (!isAdmin) return;
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveModules = async () => {
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'https://sfa-saas-platform.onrender.com/api/settings/modules',
        modules,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg({ type: 'success', text: '🎉 Module configuration saved successfully!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
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
        <h3 style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', marginBottom: '16px', paddingLeft: '8px', fontWeight: 'bold' }}>Settings</h3>
        {[
          { id: 'modules', label: '🎛️ Feature Modules' },
          { id: 'attendance', label: '⏰ Attendance Rules' },
          { id: 'tracking', label: '📍 Location Tracking' },
          { id: 'expenses', label: '💸 Expense Limits' },
          { id: 'api', label: '🔑 API Access Tokens' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
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

      {/* Main Settings Body */}
      <div style={{ flex: 1, padding: '32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>Platform Modules Control</h1>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
                Enable/Disable different modules on the admin panel and Employee App.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={handleSaveModules}
                disabled={saving}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            )}
          </div>

          {msg.text && (
            <div style={{ padding: '12px', borderRadius: '6px', marginBottom: '20px', backgroundColor: msg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: msg.type === 'success' ? '#16a34a' : '#dc2626', fontSize: '13px' }}>
              {msg.text}
            </div>
          )}

          {/* Module List Toggles */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            {moduleList.map((m, idx) => (
              <div
                key={m.key}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: idx === moduleList.length - 1 ? 'none' : '1px solid #f1f5f9'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>{m.label}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{m.desc}</div>
                </div>

                <div
                  onClick={() => handleToggle(m.key)}
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
                    justifyContent: modules[m.key] ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Settings;
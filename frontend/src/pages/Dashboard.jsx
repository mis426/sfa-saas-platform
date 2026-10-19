import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');

  const employees = [
    { id: 1, name: 'Sample User 2', code: '(8290)', status: 'Punched Out : Last Friday at 8:24 PM', mode: 'Manual', location: 'Rai Vihar Ph-2 Colony, Semra, Gorakhpur', time: '3 days ago', battery: '85%', gps: 'On', compliance: 'Compliant', site: 'Base Site' },
    { id: 2, name: 'Sample User 1', code: '(20)', status: 'Punched Out : Last Friday at 8:11 PM', mode: 'Manual', location: 'Pitampura, New Delhi', time: '3 days ago', battery: '92%', gps: 'On', compliance: 'Compliant', site: 'Base Site' },
    { id: 3, name: 'Sample User 3', code: '(PPL15M/038)', status: 'Punched Out : Last Friday at 8:43 PM', mode: 'Manual', location: 'Q4CJ+5C2, Humnabad, Karnataka 585330', time: '3 days ago', battery: '48%', gps: 'On', compliance: 'Warning', site: 'External Site' },
    { id: 4, name: 'Sample User 5', code: '', status: 'Punched In : Last Friday at 11:46 AM', mode: 'Manual', location: 'Tansen Road, Hazira, Birla Nagar, Gwalior', time: '3 days ago', battery: '64%', gps: 'On', compliance: 'Compliant', site: 'Base Site' },
    { id: 5, name: 'Sample User 4', code: '(11535)', status: 'Punched Out : Last Friday at 6:16 PM', mode: 'Manual', location: '6X3J+F42, Kappagal, Karnataka 583103', time: '3 days ago', battery: '30%', gps: 'Off', compliance: 'Non-Compliant', site: 'External Site' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f1f5f9', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '12px', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
      <div style={{ width: '190px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px', fontWeight: 'bold', fontSize: '13px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>U</div>
          Unolo SFA
        </div>

        <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {[
            { name: 'Dashboard', icon: '📊' },
            { name: 'Attendance', icon: '📋' },
            { name: 'Leaves', icon: '📅' },
            { name: 'Organization', icon: '👥' },
            { name: 'Tasks', icon: '☑️' },
            { name: 'Targets', icon: '🎯' },
            { name: 'Form', icon: '📝' },
            { name: 'Order', icon: '🛒' },
            { name: 'Expenses', icon: '💳' },
            { name: 'Clients & Sites', icon: '🏢' },
            { name: 'Reports', icon: '📈' },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => { setActiveSidebar(item.name); if (item.name === 'Dashboard') setActiveTab('Overview'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                color: activeSidebar === item.name ? '#2563eb' : '#64748b',
                backgroundColor: activeSidebar === item.name ? '#eff6ff' : 'transparent',
                borderLeft: activeSidebar === item.name ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: activeSidebar === item.name ? '600' : '400'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}

          <div style={{ margin: '12px 0', borderTop: '1px solid #f1f5f9' }} />

          <div onClick={() => navigate('/sfa')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', color: '#0284c7', cursor: 'pointer', fontWeight: 'bold' }}>
            <span>💳</span>
            <span>Licenses & Billing</span>
          </div>

          <div onClick={() => navigate('/superadmin')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', color: '#7c3aed', cursor: 'pointer', fontWeight: 'bold' }}>
            <span>🛡️</span>
            <span>SuperAdmin Hub</span>
          </div>

          <div onClick={() => navigate('/settings')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>
            <span>⚙️</span>
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        
        {/* TOP HEADER BAR */}
        <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '11px', color: '#0f172a', letterSpacing: '0.5px' }}>MICRO FOOTWEAR</span>
            <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#475569', fontSize: '10px', padding: '1px 6px', borderRadius: '4px' }}>Standard</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', color: '#334155', cursor: 'pointer' }}>Delete Sample Data</button>
            <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>✨ June</span>
            <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', color: '#334155', cursor: 'pointer' }}>💬 Chats</button>
            <span style={{ color: '#2563eb', fontWeight: '500' }}>clientadmin@acme.com</span>
            <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>

        {/* SUB-HEADER TABS (Only Visible When Active Sidebar is Dashboard) */}
        {activeSidebar === 'Dashboard' && (
          <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', gap: '20px', flexShrink: 0 }}>
            {['Overview', 'Live Location', 'Timeline', 'Card View', 'Compliance Status', 'Site Attendance'].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 0',
                  color: activeTab === tab ? '#2563eb' : '#64748b',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                {tab === 'Overview' && '📊 '}
                {tab === 'Live Location' && '📍 '}
                {tab === 'Timeline' && '⏳ '}
                {tab === 'Card View' && '📇 '}
                {tab === 'Compliance Status' && '🛡️ '}
                {tab === 'Site Attendance' && '🏢 '}
                {tab}
              </div>
            ))}
          </div>
        )}

        {/* MAIN DYNAMIC CONTENT DISPLAY */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
            {activeSidebar === 'Dashboard' ? `Realtime Dashboard — ${activeTab}` : activeSidebar}
          </div>

          {/* DASHBOARD - OVERVIEW TAB */}
          {activeSidebar === 'Dashboard' && activeTab === 'Overview' && (
            <>
              {/* ROW 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                  <div style={{ color: '#475569', fontWeight: 'bold', marginBottom: '12px', fontSize: '11px' }}>Real Time Status 🛈</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '140px', height: '70px', overflow: 'hidden' }}>
                      <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '16px solid #ef4444', borderTopColor: '#22c55e', transform: 'rotate(-45deg)', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginTop: '-25px', textAlign: 'center' }}>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>5</span>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>All Employees</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '12px', fontSize: '10px', fontWeight: 'bold' }}>
                      <span style={{ color: '#22c55e' }}>● 1 Punched In</span>
                      <span style={{ color: '#ef4444' }}>● 4 Punched Out</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px', flex: 1 }}>
                    <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px' }}>Punched In (Inactive) Employees 🛈</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', textAlign: 'center', marginTop: '8px' }}>1</div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px', flex: 1 }}>
                    <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px' }}>Staffing Strength 🛈</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', textAlign: 'center', marginTop: '8px' }}>1 / 5</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                  <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px', marginBottom: '12px' }}>Teamwise Attendance</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', color: '#64748b' }}>
                    <span>Default</span>
                    <span style={{ fontWeight: 'bold', color: '#0f172a' }}>● 1  ● 4</span>
                  </div>
                </div>
              </div>

              {/* ROW 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Employees (5)</span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '6px 4px' }}>Employee</th>
                        <th style={{ padding: '6px 4px' }}>Attendance</th>
                        <th style={{ padding: '6px 4px' }}>Last Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '8px 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: '#bae6fd', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px' }}>SU</div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</div>
                              <div style={{ color: '#94a3b8', fontSize: '9px' }}>{emp.code}</div>
                            </div>
                          </td>
                          <td style={{ padding: '8px 4px' }}>
                            <div style={{ color: emp.status.includes('Punched In') ? '#16a34a' : '#0f172a', fontWeight: '500' }}>{emp.status}</div>
                            <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '0 4px', borderRadius: '2px', fontSize: '8px', color: '#64748b' }}>{emp.mode}</span>
                          </td>
                          <td style={{ padding: '8px 4px' }}>
                            <div style={{ color: '#334155' }}>{emp.location}</div>
                            <div style={{ color: '#94a3b8', fontSize: '8px' }}>{emp.time}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Off Duty Employees (0)</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: '#94a3b8' }}>No Data found</div>
                </div>
              </div>
            </>
          )}

          {/* DASHBOARD - OTHER REALTIME TABS */}
          {activeSidebar === 'Dashboard' && activeTab === 'Live Location' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>📍 Field Sales Rep Live GPS Map Pins</div>
              <div style={{ height: '320px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '24px' }}>🗺️</div>
                <div style={{ fontWeight: 'bold', color: '#0f172a', marginTop: '8px' }}>Realtime GPS Tracking Active</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>5 Field Sales Representatives mapped</div>
              </div>
            </div>
          )}

          {/* SIDEBAR SECTIONS FUNCTIONALITY */}
          {activeSidebar !== 'Dashboard' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a', marginBottom: '12px' }}>
                {activeSidebar} Management Module
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <p style={{ margin: 0, color: '#334155' }}>
                  Aap abhi <strong>{activeSidebar}</strong> section view kar rahe hain. Trial mode ke liye is module ke live records aur controls active hain.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
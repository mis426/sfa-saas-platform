import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const [filterStatus, setFilterStatus] = useState('All');

  const employees = [
    { id: 1, name: 'Sample User 2', code: '(8290)', status: 'Punched Out : Last Friday at 8:24 PM', isPunchedIn: false, location: 'Rai Vihar Ph-2 Colony, Semra, Gorakhpur', time: '3 days ago', battery: '41%', lat: 26.7606, lng: 83.3732 },
    { id: 2, name: 'Sample User 1', code: '(20)', status: 'Punched Out : Last Friday at 8:11 PM', isPunchedIn: false, location: 'Pitampura, New Delhi', time: '3 days ago', battery: '92%', lat: 28.6990, lng: 77.1384 },
    { id: 3, name: 'Sample User 3', code: '(PPL15M/038)', status: 'Punched Out : Last Friday at 8:43 PM', isPunchedIn: false, location: 'Q4CJ+5C2, Humnabad, Karnataka 585330', time: '3 days ago', battery: '80%', lat: 17.7088, lng: 77.1320 },
    { id: 4, name: 'Sample User 5', code: '', status: 'Punched In : Last Friday at 11:46 AM', isPunchedIn: true, location: 'Tansen Road, Hazira, Birla Nagar, Gwalior', time: '3 days ago', battery: '88%', lat: 26.2183, lng: 78.1828 },
    { id: 5, name: 'Sample User 4', code: '(11535)', status: 'Punched Out : Last Friday at 6:16 PM', isPunchedIn: false, location: '6X3J+F42, Kappagal, Karnataka 583103', time: '3 days ago', battery: '37%', lat: 15.1394, lng: 76.9214 },
  ];

  const filteredEmployees = employees.filter(e => {
    if (filterStatus === 'Punched In') return e.isPunchedIn;
    if (filterStatus === 'Punched Out') return !e.isPunchedIn;
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f1f5f9', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '12px', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
      <div style={{ width: '180px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
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

        {/* SUB-HEADER TABS */}
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

        {/* MAIN DISPLAY AREA */}
        {activeTab === 'Live Location' ? (
          /* UNOLO EXACT LIVE LOCATION FULL MAP PANEL */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            
            {/* TOP MAP CONTROLS BAR */}
            <div style={{ height: '36px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
              <div style={{ fontWeight: 'bold', color: '#334155', fontSize: '11px' }}>Employees ({filteredEmployees.length})</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '2px', borderRadius: '4px' }}>
                  {['All', 'Punched In', 'Punched Out'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      style={{
                        padding: '2px 8px',
                        border: 'none',
                        borderRadius: '3px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: filterStatus === st ? (st === 'Punched In' ? '#16a34a' : st === 'Punched Out' ? '#ef4444' : '#2563eb') : 'transparent',
                        color: filterStatus === st ? '#fff' : '#64748b'
                      }}
                    >
                      {st === 'All' ? `👥 All Employees` : st === 'Punched In' ? `🟢 Punched In (${employees.filter(e=>e.isPunchedIn).length})` : `🔴 Punched Out (${employees.filter(e=>!e.isPunchedIn).length})`}
                    </button>
                  ))}
                </div>

                <label style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> Show Clients
                </label>
                <label style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> Show Sites
                </label>
              </div>
            </div>

            {/* SPLIT VIEW: LEFT EMPLOYEE DRAWER & RIGHT REAL MAP */}
            <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
              
              {/* LEFT FLOATING EMPLOYEE LIST DRAWER */}
              <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', overflowY: 'auto', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                  <input type="text" placeholder="🔍 Search Employees..." style={{ width: '100%', padding: '4px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '10px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ flex: 1 }}>
                  {filteredEmployees.map(emp => (
                    <div key={emp.id} style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <div style={{ width: '26px', height: '26px', backgroundColor: '#bae6fd', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px' }}>SU</div>
                          <div>
                            <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '11px' }}>{emp.name}</div>
                            <div style={{ color: '#94a3b8', fontSize: '9px' }}>{emp.code}</div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#16a34a' }}>🔋 {emp.battery}</span>
                        </div>
                      </div>

                      <div style={{ margin: '6px 0 4px 0', fontSize: '9.5px', color: emp.isPunchedIn ? '#16a34a' : '#ef4444', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{emp.status}</span>
                        <button onClick={() => setActiveTab('Timeline')} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '3px', padding: '2px 6px', fontSize: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Timeline ➔</button>
                      </div>

                      <div style={{ color: '#64748b', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        📍 {emp.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT MAP CANVAS INTEGRATION */}
              <div style={{ flex: 1, backgroundColor: '#e2e8f0', position: 'relative' }}>
                <iframe
                  title="Unolo Realtime Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?q=20.5937,78.9629&z=5&output=embed"
                  style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                ></iframe>

                {/* VISUAL PINS OVERLAY */}
                {filteredEmployees.map((e, idx) => (
                  <div
                    key={e.id}
                    style={{
                      position: 'absolute',
                      top: `${25 + idx * 12}%`,
                      left: `${35 + (idx % 3) * 15}%`,
                      backgroundColor: e.isPunchedIn ? '#22c55e' : '#ef4444',
                      color: '#ffffff',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>📍 {e.name}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        ) : (
          /* STANDARD OVERVIEW WORKSPACE PANEL */
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
              Realtime Dashboard — <span style={{ color: '#2563eb' }}>{activeTab}</span>
            </div>

            {/* OVERVIEW CONTENT BLOCK */}
            {activeTab === 'Overview' && (
              <>
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
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px', flex: 1 }}>
                      <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px' }}>Punched In (Inactive) Employees</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', textAlign: 'center', marginTop: '8px' }}>1</div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px', flex: 1 }}>
                      <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px' }}>Staffing Strength</div>
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
              </>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
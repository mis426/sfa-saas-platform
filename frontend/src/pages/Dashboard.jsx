import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Card View');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const [cardSearch, setCardSearch] = useState('');
  const [cardStatusFilter, setCardStatusFilter] = useState('All');

  const employees = [
    { id: 1, name: 'Sample User 2', code: '(8290)', phone: '+918565856862', status: 'Punched OUT : Last Friday at 8:24 PM', isPunchedIn: false, location: 'RaiVihar Ph-2 Colony, Semra, Gorakhpur', time: '3 days ago', battery: '41%', lat: 26.7606, lng: 83.3732 },
    { id: 2, name: 'Sample User 1', code: '(20)', phone: '+919212552247', status: 'Punched OUT : Last Friday at 8:11 PM', isPunchedIn: false, location: 'Pitampura, New Delhi', time: '3 days ago', battery: '27%', lat: 28.6990, lng: 77.1384 },
    { id: 3, name: 'Sample User 3', code: '(PPL15M/058)', phone: '+919686456811', status: 'Punched OUT : Last Friday at 6:43 PM', isPunchedIn: false, location: 'Q4CJ+5C2, Humnabad, Karnataka 585330, India', time: '3 days ago', battery: '92%', lat: 17.7088, lng: 77.1320 },
    { id: 4, name: 'Sample User 5', code: '', phone: '+919753510787', status: 'Punched IN : Last Friday at 11:46 AM', isPunchedIn: true, location: 'Tansen Road, Hazira, Birla Nagar, Gwalior', time: '3 days ago', battery: '88%', lat: 26.2183, lng: 78.1828 },
    { id: 5, name: 'Sample User 4', code: '(11535)', phone: '+919342611383', status: 'Punched OUT : Last Friday at 6:16 PM', isPunchedIn: false, location: '6X3J+F42, Kappagal, Karnataka 583103, India', time: '3 days ago', battery: '37%', lat: 15.1394, lng: 76.9214 },
  ];

  const filteredCardEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(cardSearch.toLowerCase()) || 
                          emp.phone.includes(cardSearch) || 
                          emp.location.toLowerCase().includes(cardSearch.toLowerCase());
    if (cardStatusFilter === 'Punched In') return matchesSearch && emp.isPunchedIn;
    if (cardStatusFilter === 'Punched Out') return matchesSearch && !emp.isPunchedIn;
    return matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '12px', overflow: 'hidden' }}>
      
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
              onClick={() => { setActiveSidebar(item.name); if (item.name === 'Dashboard') setActiveTab('Card View'); }}
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

      {/* 2. MAIN WORKSPACE AREA */}
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

        {/* MAIN CARD VIEW TAB CONTENT */}
        {activeTab === 'Card View' ? (
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* TOP CARD CONTROLS ROW */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employees ({filteredCardEmployees.length})</span>
                <div style={{ marginTop: '6px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search Here..."
                    value={cardSearch}
                    onChange={(e) => setCardSearch(e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', width: '180px' }}
                  />
                </div>
              </div>

              {/* STAT BADGES & FILTER DROPDOWNS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setCardStatusFilter('All')}
                  style={{ backgroundColor: cardStatusFilter === 'All' ? '#2563eb' : '#eff6ff', color: cardStatusFilter === 'All' ? '#fff' : '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  5 All Employees
                </button>
                <button
                  onClick={() => setCardStatusFilter('Punched In')}
                  style={{ backgroundColor: cardStatusFilter === 'Punched In' ? '#16a34a' : '#f0fdf4', color: cardStatusFilter === 'Punched In' ? '#fff' : '#16a34a', border: '1px solid #16a34a', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  1 Punched In
                </button>
                <button
                  onClick={() => setCardStatusFilter('Punched Out')}
                  style={{ backgroundColor: cardStatusFilter === 'Punched Out' ? '#ef4444' : '#fef2f2', color: cardStatusFilter === 'Punched Out' ? '#fff' : '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  4 Punched Out
                </button>

                <div style={{ borderLeft: '1px solid #cbd5e1', height: '20px', margin: '0 4px' }} />

                <select style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', color: '#475569' }}>
                  <option>Battery: All</option>
                </select>

                <select style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', color: '#475569' }}>
                  <option>GPS: All</option>
                </select>

                <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 6px', fontSize: '10px', cursor: 'pointer' }}>
                  🌪️
                </button>
              </div>
            </div>

            {/* UNOLO PIXEL-EXACT CARD GRID (3 COLUMNS) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginTop: '4px' }}>
              {filteredCardEmployees.map((emp) => (
                <div
                  key={emp.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    borderLeft: emp.isPunchedIn ? '4px solid #16a34a' : '4px solid #ef4444',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* CARD HEADER: AVATAR, NAME, CODE, PHONE & BATTERY */}
                  <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: '#cbd5e1', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px' }}>
                        SU
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '12px' }}>{emp.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '10px' }}>{emp.code}</div>
                        <div style={{ color: '#475569', fontSize: '10px', marginTop: '2px' }}>{emp.phone}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: emp.isPunchedIn ? '#16a34a' : '#d97706' }}>
                        🔋 {emp.battery}
                      </span>
                      <span style={{ color: '#16a34a', fontSize: '10px' }}>📍</span>
                    </div>
                  </div>

                  {/* PUNCH STATUS BAR WITH TIMELINE BUTTON */}
                  <div style={{
                    backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2',
                    padding: '6px 14px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <span style={{ color: emp.isPunchedIn ? '#16a34a' : '#dc2626', fontWeight: 'bold', fontSize: '10px' }}>
                      {emp.status}
                    </span>
                    <button
                      onClick={() => setActiveTab('Timeline')}
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      Timeline 🔗
                    </button>
                  </div>

                  {/* LOCATION ADDRESS FOOTER */}
                  <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '10px' }}>
                    <span>📍</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.location}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* OTHER TABS FALLBACK WORKSPACE */
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>
              Realtime Dashboard — <span style={{ color: '#2563eb' }}>{activeTab}</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
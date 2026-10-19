import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Site Attendance');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');

  // Filters & Search States
  const [filterStatus, setFilterStatus] = useState('All');
  const [cardSearch, setCardSearch] = useState('');
  const [complianceSearch, setComplianceSearch] = useState('');
  const [siteEmpSearch, setSiteEmpSearch] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sample User 1',
      code: '(20)',
      phone: '+919212552247',
      status: 'Punched Out',
      isPunchedIn: false,
      location: 'Pitampura, New Delhi',
      time: '3 days ago',
      battery: '92%',
      lat: 28.6990,
      lng: 77.1384,
      site: '-',
      sitePool: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 2,
      name: 'Sample User 2',
      code: '(8290)',
      phone: '+918565856862',
      status: 'Punched Out',
      isPunchedIn: false,
      location: 'Rai Vihar Ph-2 Colony, Semra, Gorakhpur',
      time: '3 days ago',
      battery: '41%',
      lat: 26.7606,
      lng: 83.3732,
      site: '-',
      sitePool: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 3,
      name: 'Sample User 3',
      code: '(PPL15M/058)',
      phone: '+919686456811',
      status: 'Punched Out',
      isPunchedIn: false,
      location: 'Q4CJ+5C2, Humnabad, Karnataka 585330',
      time: '3 days ago',
      battery: '80%',
      lat: 17.7088,
      lng: 77.1320,
      site: '-',
      sitePool: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 4,
      name: 'Sample User 4',
      code: '(11535)',
      phone: '+919342611383',
      status: 'Punched Out',
      isPunchedIn: false,
      location: '6X3J+F42, Kappagal, Karnataka 583103',
      time: '3 days ago',
      battery: '37%',
      lat: 15.1394,
      lng: 76.9214,
      site: '-',
      sitePool: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 5,
      name: 'Sample User 5',
      code: '',
      phone: '+919753510787',
      status: 'Punched In',
      isPunchedIn: true,
      location: 'Tansen Road, Hazira, Birla Nagar, Gwalior',
      time: '3 days ago',
      battery: '88%',
      lat: 26.2183,
      lng: 78.1828,
      site: '-',
      sitePool: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','bad','bad','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderStatusBlocks = (statusArray) => (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {statusArray.map((st, idx) => (
        <div
          key={idx}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '1px',
            backgroundColor: st === 'good' ? '#22c55e' : st === 'bad' ? '#ef4444' : '#cbd5e1'
          }}
        />
      ))}
    </div>
  );

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

        {/* SUB-HEADER TABS */}
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

        {/* DYNAMIC CONTENT AREA */}
        {activeSidebar === 'Dashboard' ? (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Realtime Dashboard — Overview</div>
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
              </div>
            )}

            {/* LIVE LOCATION TAB */}
            {activeTab === 'Live Location' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '36px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#334155', fontSize: '11px' }}>Employees (5)</div>
                </div>
                <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
                  <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', overflowY: 'auto' }}>
                    {employees.map(emp => (
                      <div key={emp.id} style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{emp.name}</div>
                        <div style={{ fontSize: '9.5px', color: emp.isPunchedIn ? '#16a34a' : '#ef4444', margin: '2px 0' }}>{emp.status}</div>
                        <div style={{ color: '#64748b', fontSize: '9px' }}>📍 {emp.location}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, backgroundColor: '#e2e8f0' }}>
                    <iframe title="Map" width="100%" height="100%" frameBorder="0" src="https://maps.google.com/maps?q=20.5937,78.9629&z=5&output=embed" />
                  </div>
                </div>
              </div>
            )}

            {/* TIMELINE TAB */}
            {activeTab === 'Timeline' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>⏳ Datewise Punch Timeline Feed</div>
                {employees.map(e => (
                  <div key={e.id} style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', borderLeft: '3px solid #2563eb', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                    <strong>{e.name}</strong> - <span>{e.status}</span>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{e.location}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CARD VIEW TAB */}
            {activeTab === 'Card View' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {employees.map((emp) => (
                    <div key={emp.id} style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', borderLeft: emp.isPunchedIn ? '4px solid #16a34a' : '4px solid #ef4444' }}>
                      <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</div>
                          <div style={{ color: '#475569', fontSize: '10px' }}>{emp.phone}</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a' }}>🔋 {emp.battery}</span>
                      </div>
                      <div style={{ padding: '6px 12px', backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2', fontSize: '10px', fontWeight: 'bold', color: emp.isPunchedIn ? '#16a34a' : '#dc2626' }}>
                        {emp.status}
                      </div>
                      <div style={{ padding: '10px 12px', fontSize: '10px', color: '#475569' }}>📍 {emp.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMPLIANCE STATUS TAB */}
            {activeTab === 'Compliance Status' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '8px' }}>Employee</th>
                        <th style={{ padding: '8px' }}>App Version</th>
                        <th style={{ padding: '8px' }}>App Setting</th>
                        <th style={{ padding: '8px' }}>Location Setting</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px', fontWeight: 'bold' }}>{emp.name}</td>
                          <td style={{ padding: '8px', color: '#64748b' }}>{emp.appVersion}</td>
                          <td style={{ padding: '8px' }}>{renderStatusBlocks(emp.appSettings)}</td>
                          <td style={{ padding: '8px' }}>{renderStatusBlocks(emp.locSettings)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 6: SITE ATTENDANCE (PIXEL-EXACT UNOLO IMPLEMENTATION) */}
            {activeTab === 'Site Attendance' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* TOP SPLIT: DONUT CHART BLOCK & EMPLOYEES GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
                  
                  {/* LEFT CHART CARD */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Site Attendance (5)</span>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', color: '#475569' }}><option>0m</option></select>
                        <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', cursor: 'pointer' }}>🔄</button>
                      </div>
                    </div>

                    {/* PIE / DONUT GRAPH CANVAS */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px', position: 'relative' }}>
                      <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '50%', background: 'conic-gradient(#ef4444 0% 80%, #818cf8 80% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'absolute', color: '#ffffff', fontWeight: 'bold', fontSize: '10px', top: '25%', left: '20%' }}>80.00%</div>
                        <div style={{ position: 'absolute', color: '#ffffff', fontWeight: 'bold', fontSize: '9px', bottom: '25%', right: '15%' }}>20.00%</div>
                      </div>
                    </div>

                    {/* COUNT STATS LEGEND BAR */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px', textAlign: 'center', fontSize: '9px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#16a34a', fontSize: '12px' }}>● 0</div>
                        <div style={{ color: '#64748b' }}>At Site (Base)</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#d97706', fontSize: '12px' }}>● 0</div>
                        <div style={{ color: '#64748b' }}>At Site (Not Base)</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#6366f1', fontSize: '12px' }}>● 1</div>
                        <div style={{ color: '#64748b' }}>Not at any Site</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#ef4444', fontSize: '12px' }}>● 4</div>
                        <div style={{ color: '#64748b' }}>Punched Out</div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT EMPLOYEES GRID TABLE */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employees (5)</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                        <input type="text" placeholder="🔍 Search Here" value={siteEmpSearch} onChange={(e) => setSiteEmpSearch(e.target.value)} style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '100px' }} />
                        <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', cursor: 'pointer' }}>📥</button>
                      </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <th style={{ padding: '6px 8px' }}>Employee Name</th>
                            <th style={{ padding: '6px 8px' }}>Site</th>
                            <th style={{ padding: '6px 8px' }}>Site Pool</th>
                            <th style={{ padding: '6px 8px' }}>Team Name</th>
                            <th style={{ padding: '6px 8px' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.filter(e => e.name.toLowerCase().includes(siteEmpSearch.toLowerCase())).map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '8px', fontWeight: 'bold', color: '#334155' }}>{emp.name} {emp.code}</td>
                              <td style={{ padding: '8px', color: '#64748b' }}>{emp.site}</td>
                              <td style={{ padding: '8px', color: '#64748b' }}>{emp.sitePool}</td>
                              <td style={{ padding: '8px', color: '#64748b' }}>{emp.teamName}</td>
                              <td style={{ padding: '8px' }}>
                                <span style={{
                                  backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2',
                                  color: emp.isPunchedIn ? '#16a34a' : '#ef4444',
                                  border: `1px solid ${emp.isPunchedIn ? '#bbf7d0' : '#fecaca'}`,
                                  padding: '2px 8px',
                                  borderRadius: '10px',
                                  fontWeight: 'bold',
                                  fontSize: '9px'
                                }}>
                                  {emp.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* BOTTOM SITE (0) GRID BLOCK */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Site (0)</span>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input type="text" placeholder="🔍 Search Here" style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '120px' }} />
                      
                      <div style={{ display: 'flex', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                        <button style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '3px 10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>≡ Site</button>
                        <button style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', padding: '3px 10px', fontSize: '10px', cursor: 'pointer' }}>Site Pool</button>
                      </div>

                      <div style={{ display: 'flex', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                        <button style={{ backgroundColor: '#22c55e', color: '#fff', border: 'none', padding: '3px 10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>≡ List View</button>
                        <button style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', padding: '3px 10px', fontSize: '10px', cursor: 'pointer' }}>🗺️ Map View</button>
                      </div>

                      <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', cursor: 'pointer' }}>📥</button>
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '8px' }}>Site Name</th>
                        <th style={{ padding: '8px' }}>Total</th>
                        <th style={{ padding: '8px' }}>At Site (Base)</th>
                        <th style={{ padding: '8px' }}>Not At Site (Base)</th>
                        <th style={{ padding: '8px' }}>Expected</th>
                        <th style={{ padding: '8px' }}>At Site (Not Base)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', fontSize: '11px' }}>
                          No Data found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </>
        ) : (
          /* SIDEBAR SECTIONS */
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
            <h3 style={{ margin: 0, color: '#0f172a' }}>{activeSidebar} Module</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Active operational view for trial clients.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
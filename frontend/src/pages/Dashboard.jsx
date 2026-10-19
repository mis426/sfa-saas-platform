import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Compliance Status');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');
  const [complianceSearch, setComplianceSearch] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sample User 2',
      code: '(8290)',
      phone: '+918565856862',
      status: 'Punched OUT : Last Friday at 8:24 PM',
      isPunchedIn: false,
      location: 'RaiVihar Ph-2 Colony, Semra, Gorakhpur',
      battery: '41%',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      appGood: 5, appBad: 0, appNoData: 14,
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 2,
      name: 'Sample User 1',
      code: '(20)',
      phone: '+919212552247',
      status: 'Punched OUT : Last Friday at 8:11 PM',
      isPunchedIn: false,
      location: 'Pitampura, New Delhi',
      battery: '27%',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
      appGood: 4, appBad: 1, appNoData: 14,
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 3,
      name: 'Sample User 3',
      code: '(PPL15M/058)',
      phone: '+919686456811',
      status: 'Punched OUT : Last Friday at 6:43 PM',
      isPunchedIn: false,
      location: 'Q4CJ+5C2, Humnabad, Karnataka 585330',
      battery: '92%',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      appGood: 5, appBad: 0, appNoData: 14,
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 4,
      name: 'Sample User 5',
      code: '',
      phone: '+919753510787',
      status: 'Punched IN : Last Friday at 11:46 AM',
      isPunchedIn: true,
      location: 'Tansen Road, Hazira, Birla Nagar, Gwalior',
      battery: '88%',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','bad','bad','good','none','none','none','none'],
      appGood: 1, appBad: 4, appNoData: 14,
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
      locGood: 4, locBad: 1, locNoData: 14
    },
    {
      id: 5,
      name: 'Sample User 4',
      code: '(11535)',
      phone: '+919342611383',
      status: 'Punched OUT : Last Friday at 6:16 PM',
      isPunchedIn: false,
      location: '6X3J+F42, Kappagal, Karnataka 583103',
      battery: '37%',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','good','good','good','none','none','none','none'],
      appGood: 4, appBad: 1, appNoData: 14,
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locGood: 5, locBad: 0, locNoData: 14
    },
  ];

  const filteredComplianceEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(complianceSearch.toLowerCase()) ||
    emp.code.toLowerCase().includes(complianceSearch.toLowerCase())
  );

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
              onClick={() => { setActiveSidebar(item.name); if (item.name === 'Dashboard') setActiveTab('Compliance Status'); }}
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

        {/* MAIN COMPLIANCE TAB CONTENT AREA */}
        {activeTab === 'Compliance Status' ? (
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* ROW 1: TOP 2 SUMMARY CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>0</span>
                <div>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold', marginBottom: '8px' }}>
                    No of People having bad app settings yesterday
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button disabled style={{ backgroundColor: '#e2e8f0', color: '#94a3b8', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '10px', cursor: 'not-allowed' }}>Notify All</button>
                    <button disabled style={{ backgroundColor: '#e2e8f0', color: '#94a3b8', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '10px', cursor: 'not-allowed' }}>View Names</button>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>0</span>
                <div>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold', marginBottom: '8px' }}>
                    No of People having bad location settings yesterday
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button disabled style={{ backgroundColor: '#e2e8f0', color: '#94a3b8', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '10px', cursor: 'not-allowed' }}>Notify All</button>
                    <button disabled style={{ backgroundColor: '#e2e8f0', color: '#94a3b8', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '10px', cursor: 'not-allowed' }}>View Names</button>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: HEADER TITLE, LEGENDS & DATE RANGE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Compliance Status</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10px', color: '#475569' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🟢 <strong>Good</strong> 🛈</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔴 <strong>Bad</strong> 🛈</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⬛ <strong>No Data</strong> 🛈</span>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 10px', fontSize: '10px', color: '#334155', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  01-10-2026 to 19-10-2026 📅
                </div>
              </div>
            </div>

            {/* SEARCH INPUT */}
            <div style={{ width: '220px' }}>
              <input
                type="text"
                placeholder="🔍 Search Employee Here.."
                value={complianceSearch}
                onChange={(e) => setComplianceSearch(e.target.value)}
                style={{ width: '100%', padding: '5px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', boxSizing: 'border-box' }}
              />
            </div>

            {/* ROW 3: COMPLIANCE MATRIX TABLE */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px 12px', width: '18%' }}>Employee</th>
                    <th style={{ padding: '8px 12px', width: '14%' }}>App Version</th>
                    <th style={{ padding: '8px 12px', width: '34%' }}>App Setting</th>
                    <th style={{ padding: '8px 12px', width: '34%' }}>Location Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplianceEmployees.map((emp) => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* EMPLOYEE COLUMN */}
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '9px' }}>{emp.code}</div>
                      </td>

                      {/* APP VERSION COLUMN */}
                      <td style={{ padding: '10px 12px', color: '#64748b' }}>
                        {emp.appVersion}
                      </td>

                      {/* APP SETTING COLUMN */}
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {renderStatusBlocks(emp.appSettings)}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.appGood}</span>
                            <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.appBad}</span>
                            <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.appNoData}</span>
                            <button style={{ backgroundColor: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '9px', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '4px' }}>Notify</button>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION SETTING COLUMN */}
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {renderStatusBlocks(emp.locSettings)}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.locGood}</span>
                            <span style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.locBad}</span>
                            <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', fontSize: '9px' }}>{emp.locNoData}</span>
                            <button style={{ backgroundColor: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '9px', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '4px' }}>Notify</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* FALLBACK OTHER TABS */
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
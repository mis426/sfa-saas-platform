import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');

  // Filter & Search States across all tabs
  const [filterStatus, setFilterStatus] = useState('All');
  const [cardSearch, setCardSearch] = useState('');
  const [complianceSearch, setComplianceSearch] = useState('');
  const [siteEmpSearch, setSiteEmpSearch] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sample User 2',
      code: '(8290)',
      phone: '+918565856862',
      status: 'Punched Out : Last Friday at 8:24 PM',
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
      appGood: 5, appBad: 0, appNoData: 14,
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 2,
      name: 'Sample User 1',
      code: '(20)',
      phone: '+919212552247',
      status: 'Punched Out : Last Friday at 8:11 PM',
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
      appGood: 4, appBad: 1, appNoData: 14,
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 3,
      name: 'Sample User 3',
      code: '(PPL15M/038)',
      phone: '+919686456811',
      status: 'Punched Out : Last Friday at 8:43 PM',
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
      appGood: 5, appBad: 0, appNoData: 14,
      locGood: 5, locBad: 0, locNoData: 14
    },
    {
      id: 4,
      name: 'Sample User 5',
      code: '',
      phone: '+919753510787',
      status: 'Punched In : Last Friday at 11:46 AM',
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
      appGood: 1, appBad: 4, appNoData: 14,
      locGood: 4, locBad: 1, locNoData: 14
    },
    {
      id: 5,
      name: 'Sample User 4',
      code: '(11535)',
      phone: '+919342611383',
      status: 'Punched Out : Last Friday at 6:16 PM',
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
      appGood: 4, appBad: 1, appNoData: 14,
      locGood: 5, locBad: 0, locNoData: 14
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

        {/* DYNAMIC CONTENT AREA FOR ALL 6 TABS */}
        {activeSidebar === 'Dashboard' ? (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Realtime Dashboard</div>

                {/* ROW 1: Status Gauge, Punched In, Staffing, Teamwise */}
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

                {/* ROW 2: Employees Grid & Off Duty */}
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
                              <div style={{ color: emp.isPunchedIn ? '#16a34a' : '#0f172a', fontWeight: '500' }}>{emp.status}</div>
                              <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '0 4px', borderRadius: '2px', fontSize: '8px', color: '#64748b' }}>Manual</span>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: '#94a3b8' }}>
                      No Data found
                    </div>
                  </div>
                </div>

                {/* ROW 3: KPI METRICS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {[
                    { label: 'Forms Filled', count: '0', change: '↑0%' },
                    { label: 'Photos Uploaded', count: '0', change: '↑0%' },
                    { label: 'New Clients', count: '0', change: '↑0%' },
                    { label: 'Orders Submitted', count: '0', change: '↑0%' },
                  ].map((kpi) => (
                    <div key={kpi.label} style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                      <div style={{ color: '#475569', fontSize: '10px', fontWeight: 'bold' }}>{kpi.label}</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: '4px 0' }}>
                        {kpi.count} <span style={{ color: '#22c55e', fontSize: '10px', fontWeight: 'normal' }}>{kpi.change}</span>
                      </div>
                      <button style={{ backgroundColor: '#f1f5f9', border: 'none', borderRadius: '3px', padding: '2px 6px', fontSize: '9px', color: '#64748b' }}>0 Yesterday</button>
                    </div>
                  ))}
                </div>

                {/* ROW 4: HOURS & EXPENSES */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Daily Average Working Hours</span>
                      <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Month</option></select>
                    </div>
                    <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '10px 0', borderBottom: '1px solid #cbd5e1' }}>
                      {[0,0,0,0,0,0,0,0,0,0,0,8,7,10,11,9,10,0,0,0,0,0,0].map((h, idx) => (
                        <div key={idx} style={{ flex: 1, height: `${(h / 12) * 100}%`, backgroundColor: '#2563eb', borderRadius: '2px 2px 0 0' }} />
                      ))}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Expense Overview</span>
                      <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Month</option></select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '140px' }}>
                      <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>
                        100%
                      </div>
                      <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div><span style={{ color: '#64748b' }}>Total Expenses:</span> <strong style={{ color: '#0f172a' }}>₹3620.00 (18)</strong></div>
                        <div><span style={{ color: '#22c55e' }}>● Approved Expenses:</span> <strong style={{ color: '#0f172a' }}>₹3620.00 (18)</strong></div>
                        <div><span style={{ color: '#2563eb' }}>● Paid Out:</span> <strong style={{ color: '#0f172a' }}>₹0 (0)</strong></div>
                        <div><span style={{ color: '#eab308' }}>● Pending Expenses:</span> <strong style={{ color: '#0f172a' }}>₹0 (0)</strong></div>
                        <div><span style={{ color: '#ef4444' }}>● Rejected Expenses:</span> <strong style={{ color: '#0f172a' }}>₹0 (0)</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. LIVE LOCATION TAB */}
            {activeTab === 'Live Location' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ height: '36px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
                  <div style={{ fontWeight: 'bold', color: '#334155', fontSize: '11px' }}>
                    Employees ({employees.filter(e => filterStatus === 'All' ? true : filterStatus === 'Punched In' ? e.isPunchedIn : !e.isPunchedIn).length})
                  </div>
                  
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
                          {st === 'All' ? '👥 All' : st === 'Punched In' ? '🟢 Punched In (1)' : '🔴 Punched Out (4)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', overflowY: 'auto', zIndex: 10 }}>
                    {employees.filter(e => filterStatus === 'All' ? true : filterStatus === 'Punched In' ? e.isPunchedIn : !e.isPunchedIn).map(emp => (
                      <div key={emp.id} style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '11px', color: '#0f172a' }}>{emp.name}</strong>
                          <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#16a34a' }}>🔋 {emp.battery}</span>
                        </div>
                        <div style={{ fontSize: '9.5px', color: emp.isPunchedIn ? '#16a34a' : '#ef4444', margin: '4px 0', fontWeight: 'bold' }}>{emp.status}</div>
                        <div style={{ color: '#64748b', fontSize: '9px' }}>📍 {emp.location}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ flex: 1, backgroundColor: '#e2e8f0', position: 'relative' }}>
                    <iframe
                      title="Unolo Realtime Map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src="https://maps.google.com/maps?q=20.5937,78.9629&z=5&output=embed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. TIMELINE TAB */}
            {activeTab === 'Timeline' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>⏳ Datewise Punch Timeline Feed</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {employees.map(e => (
                    <div key={e.id} style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', borderLeft: '3px solid #2563eb', border: '1px solid #e2e8f0' }}>
                      <strong style={{ color: '#0f172a' }}>{e.name}</strong> - <span style={{ color: '#64748b' }}>{e.status}</span>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Location: {e.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CARD VIEW TAB */}
            {activeTab === 'Card View' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employees (5)</span>
                  <input type="text" placeholder="🔍 Search Here..." value={cardSearch} onChange={(e) => setCardSearch(e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px', width: '180px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {employees.filter(e => e.name.toLowerCase().includes(cardSearch.toLowerCase())).map((emp) => (
                    <div key={emp.id} style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', borderLeft: emp.isPunchedIn ? '4px solid #16a34a' : '4px solid #ef4444', overflow: 'hidden' }}>
                      <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '12px' }}>{emp.name}</div>
                          <div style={{ color: '#475569', fontSize: '10px' }}>{emp.phone}</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a' }}>🔋 {emp.battery}</span>
                      </div>
                      <div style={{ backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: emp.isPunchedIn ? '#16a34a' : '#dc2626', fontWeight: 'bold', fontSize: '10px' }}>{emp.status}</span>
                        <button onClick={() => setActiveTab('Timeline')} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '3px', padding: '2px 6px', fontSize: '9px', cursor: 'pointer' }}>Timeline 🔗</button>
                      </div>
                      <div style={{ padding: '10px 12px', color: '#475569', fontSize: '10px' }}>📍 {emp.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. COMPLIANCE STATUS TAB */}
            {activeTab === 'Compliance Status' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>0</span>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>No of People having bad app settings yesterday</div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>0</span>
                    <div style={{ fontSize: '11px', color: '#475569', fontWeight: 'bold' }}>No of People having bad location settings yesterday</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Compliance Status</span>
                  <input type="text" placeholder="🔍 Search Employee.." value={complianceSearch} onChange={(e) => setComplianceSearch(e.target.value)} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '180px' }} />
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '8px 12px' }}>Employee</th>
                        <th style={{ padding: '8px 12px' }}>App Version</th>
                        <th style={{ padding: '8px 12px' }}>App Setting</th>
                        <th style={{ padding: '8px 12px' }}>Location Setting</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.filter(e => e.name.toLowerCase().includes(complianceSearch.toLowerCase())).map((emp) => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>{emp.appVersion}</td>
                          <td style={{ padding: '10px 12px' }}>{renderStatusBlocks(emp.appSettings)}</td>
                          <td style={{ padding: '10px 12px' }}>{renderStatusBlocks(emp.locSettings)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. SITE ATTENDANCE TAB */}
            {activeTab === 'Site Attendance' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
                  
                  {/* Left Donut Chart Block */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Site Attendance (5)</span>
                      <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>0m</option></select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px' }}>
                      <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '50%', background: 'conic-gradient(#ef4444 0% 80%, #818cf8 80% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'absolute', color: '#ffffff', fontWeight: 'bold', fontSize: '10px', top: '25%', left: '20%' }}>80.00%</div>
                        <div style={{ position: 'absolute', color: '#ffffff', fontWeight: 'bold', fontSize: '9px', bottom: '25%', right: '15%' }}>20.00%</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '12px', textAlign: 'center', fontSize: '9px' }}>
                      <div><div style={{ fontWeight: 'bold', color: '#16a34a', fontSize: '12px' }}>● 0</div><div style={{ color: '#64748b' }}>At Site (Base)</div></div>
                      <div><div style={{ fontWeight: 'bold', color: '#d97706', fontSize: '12px' }}>● 0</div><div style={{ color: '#64748b' }}>At Site (Not Base)</div></div>
                      <div><div style={{ fontWeight: 'bold', color: '#6366f1', fontSize: '12px' }}>● 1</div><div style={{ color: '#64748b' }}>Not at any Site</div></div>
                      <div><div style={{ fontWeight: 'bold', color: '#ef4444', fontSize: '12px' }}>● 4</div><div style={{ color: '#64748b' }}>Punched Out</div></div>
                    </div>
                  </div>

                  {/* Right Employees Grid Table */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employees (5)</span>
                      <input type="text" placeholder="🔍 Search Here" value={siteEmpSearch} onChange={(e) => setSiteEmpSearch(e.target.value)} style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '100px' }} />
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                            <th style={{ padding: '6px 8px' }}>Employee Name</th>
                            <th style={{ padding: '6px 8px' }}>Site</th>
                            <th style={{ padding: '6px 8px' }}>Team Name</th>
                            <th style={{ padding: '6px 8px' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.filter(e => e.name.toLowerCase().includes(siteEmpSearch.toLowerCase())).map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '8px', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                              <td style={{ padding: '8px', color: '#64748b' }}>{emp.site}</td>
                              <td style={{ padding: '8px', color: '#64748b' }}>{emp.teamName}</td>
                              <td style={{ padding: '8px' }}>
                                <span style={{ backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2', color: emp.isPunchedIn ? '#16a34a' : '#ef4444', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '9px' }}>
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

                {/* Bottom Site Grid */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px', marginBottom: '12px' }}>Site (0)</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '8px' }}>Site Name</th>
                        <th style={{ padding: '8px' }}>Total</th>
                        <th style={{ padding: '8px' }}>At Site (Base)</th>
                        <th style={{ padding: '8px' }}>Not At Site (Base)</th>
                        <th style={{ padding: '8px' }}>Expected</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>No Data found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </>
        ) : (
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
            <h3 style={{ margin: 0, color: '#0f172a' }}>{activeSidebar} Module</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Active operational view for trial mode.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
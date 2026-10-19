import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSidebar, setActiveSidebar] = useState('Dashboard');

  const employees = [
    { id: 1, name: 'Sample User 2', code: '(8290)', status: 'Punched Out : Last Friday at 8:24 PM', mode: 'Manual', location: 'Rai Vihar Ph-2 Colony, Semra, Gorakhpur', time: '3 days ago' },
    { id: 2, name: 'Sample User 1', code: '(20)', status: 'Punched Out : Last Friday at 8:11 PM', mode: 'Manual', location: 'Pitampura, New Delhi', time: '3 days ago' },
    { id: 3, name: 'Sample User 3', code: '(PPL15M/038)', status: 'Punched Out : Last Friday at 8:43 PM', mode: 'Manual', location: 'Q4CJ+5C2, Humnabad, Karnataka 585330, India', time: '3 days ago' },
    { id: 4, name: 'Sample User 5', code: '', status: 'Punched In : Last Friday at 11:46 AM', mode: 'Manual', location: 'Tansen Road, Hazira, Birla Nagar, Gwalior', time: '3 days ago' },
    { id: 5, name: 'Sample User 4', code: '(11535)', status: 'Punched Out : Last Friday at 6:16 PM', mode: 'Manual', location: '6X3J+F42, Kappagal, Karnataka 583103, India', time: '3 days ago' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f1f5f9', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '12px', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
      <div style={{ width: '180px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px', fontWeight: 'bold', fontSize: '13px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>U</div>
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
              onClick={() => setActiveSidebar(item.name)}
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

          {[
            { name: 'June', icon: '✨' },
            { name: 'Support', icon: '🎧' },
            { name: 'Settings', icon: '⚙️', action: () => navigate('/settings') },
          ].map((item) => (
            <div
              key={item.name}
              onClick={item.action || (() => setActiveSidebar(item.name))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAIN CONTENT AREA */}
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
            <span style={{ position: 'relative', cursor: 'pointer' }}>
              🔔<span style={{ position: 'absolute', top: '-4px', right: '-6px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', fontSize: '9px', padding: '1px 4px' }}>0</span>
            </span>
            <span style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer' }}>mis@actionlifestyle.com</span>
            <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>

        {/* DASHBOARD TAB SUB-BAR */}
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

        {/* MAIN DASHBOARD CONTENT (SCROLLABLE GRID) */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Realtime Dashboard</div>

          {/* ROW 1: Real Time Status Gauge, Punched In/Strength, Teamwise Attendance */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', gap: '16px' }}>
            
            {/* Real Time Status Gauge */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontWeight: 'bold', marginBottom: '12px', fontSize: '11px' }}>
                <span>Real Time Status 🛈</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

            {/* Punched In (Inactive) & Staffing Strength */}
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

            {/* Teamwise Attendance */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
              <div style={{ color: '#475569', fontWeight: 'bold', fontSize: '11px', marginBottom: '12px' }}>Teamwise Attendance</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', color: '#64748b' }}>
                <span>Default</span>
                <span style={{ fontWeight: 'bold', color: '#0f172a' }}>● 1  ● 4</span>
              </div>
            </div>

          </div>

          {/* ROW 2: Employees (5) Table & Off Duty Employees (0) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '16px' }}>
            
            {/* Active Employees List Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Employees (5)</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                  <input type="text" placeholder="🔍 Search Here" style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }} />
                </div>
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

            {/* Off Duty Employees */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Off Duty Employees (0)</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select style={{ padding: '2px 4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                  <select style={{ padding: '2px 4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                  <input type="text" placeholder="🔍 Search Here" style={{ padding: '2px 4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '80px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: '#94a3b8', fontSize: '11px' }}>
                No Data found
              </div>
            </div>

          </div>

          {/* ROW 3: KPI Stat Cards Grid */}
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

          {/* ROW 4: Expense Overview & Daily Working Hours Chart */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '16px' }}>
            
            {/* Daily Average Working Hours */}
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

            {/* Expense Overview Pie/Legend Block */}
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

      </div>

    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('Attendance');

  // Sub-tabs State
  const [activeDashboardTab, setActiveDashboardTab] = useState('Overview');
  const [activeAttendanceTab, setActiveAttendanceTab] = useState('Overview');
  const [showLegend, setShowLegend] = useState(true);

  // Search States
  const [attendanceSearch, setAttendanceSearch] = useState('');
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
      punchedInTime: 'Last Friday at 9:21 AM',
      punchedOutTime: 'Last Friday at 8:24 PM',
      inFrom: 'NA',
      outFrom: 'NA',
      mode: 'Manual',
      isPunchedIn: false,
      location: 'Rai Vihar Ph-2 Colony, Semra, Gorakhpur',
      time: '3 days ago',
      battery: '41%',
      site: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 2,
      name: 'Sample User 1',
      code: '(20)',
      phone: '+919212552247',
      status: 'Punched Out : Last Friday at 8:11 PM',
      punchedInTime: 'Last Friday at 9:47 AM',
      punchedOutTime: 'Last Friday at 8:11 PM',
      inFrom: 'NA',
      outFrom: 'NA',
      mode: 'Manual',
      isPunchedIn: false,
      location: 'Pitampura, New Delhi',
      time: '3 days ago',
      battery: '92%',
      site: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 3,
      name: 'Sample User 3',
      code: '(PPL15M/058)',
      phone: '+919686456811',
      status: 'Punched Out : Last Friday at 8:43 PM',
      punchedInTime: 'Last Friday at 8:58 AM',
      punchedOutTime: 'Last Friday at 8:43 PM',
      inFrom: 'NA',
      outFrom: 'NA',
      mode: 'Manual',
      isPunchedIn: false,
      location: 'Q4CJ+5C2, Humnabad, Karnataka 585330',
      time: '3 days ago',
      battery: '80%',
      site: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
    {
      id: 4,
      name: 'Sample User 5',
      code: '',
      phone: '+919753510787',
      status: 'Punched In : Last Friday at 11:46 AM',
      punchedInTime: 'Last Friday at 11:46 AM',
      punchedOutTime: '-',
      inFrom: 'NA',
      outFrom: '-',
      mode: '',
      isPunchedIn: true,
      location: 'Tansen Road, Hazira, Birla Nagar, Gwalior',
      time: '3 days ago',
      battery: '88%',
      site: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','bad','bad','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','bad','good','none','none','none','none'],
    },
    {
      id: 5,
      name: 'Sample User 4',
      code: '(11535)',
      phone: '+919342611383',
      status: 'Punched Out : Last Friday at 6:16 PM',
      punchedInTime: 'Last Friday at 9:08 AM',
      punchedOutTime: 'Last Friday at 6:16 PM',
      inFrom: 'NA',
      outFrom: 'NA',
      mode: 'Manual',
      isPunchedIn: false,
      location: '6X3J+F42, Kappagal, Karnataka 583103',
      time: '3 days ago',
      battery: '37%',
      site: '-',
      teamName: 'Default',
      appVersion: 'Not Available',
      appSettings: ['none','none','none','none','none','none','none','none','none','none','none','bad','good','good','good','none','none','none','none'],
      locSettings: ['none','none','none','none','none','none','none','none','none','none','none','good','good','good','good','none','none','none','none'],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f1f5f9', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '11px', overflow: 'hidden' }}>
      
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
              onClick={() => {
                setActiveSidebar(item.name);
                if (item.name === 'Dashboard') setActiveDashboardTab('Overview');
                if (item.name === 'Attendance') setActiveAttendanceTab('Overview');
              }}
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
            <span style={{ color: '#2563eb', fontWeight: '500' }}>MIS@ACTIONLIFESTYLE.COM</span>
            <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>

        {/* SUB-HEADER TABS FOR DASHBOARD */}
        {activeSidebar === 'Dashboard' && (
          <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', gap: '20px', flexShrink: 0 }}>
            {['Overview', 'Live Location', 'Timeline', 'Card View', 'Compliance Status', 'Site Attendance'].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveDashboardTab(tab)}
                style={{
                  padding: '10px 0',
                  color: activeDashboardTab === tab ? '#2563eb' : '#64748b',
                  fontWeight: activeDashboardTab === tab ? 'bold' : 'normal',
                  borderBottom: activeDashboardTab === tab ? '2px solid #2563eb' : '2px solid transparent',
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

        {/* SUB-HEADER TABS FOR ATTENDANCE */}
        {activeSidebar === 'Attendance' && (
          <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Overview', 'Shifts', 'Attendance Muster', 'Roster', 'Regularisation Request', 'Attendance Punches'].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveAttendanceTab(tab)}
                  style={{
                    padding: '10px 0',
                    color: activeAttendanceTab === tab ? '#2563eb' : '#64748b',
                    fontWeight: activeAttendanceTab === tab ? 'bold' : 'normal',
                    borderBottom: activeAttendanceTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '11px'
                  }}
                >
                  {tab === 'Overview' && '📊 '}
                  {tab === 'Shifts' && '⏱️ '}
                  {tab === 'Attendance Muster' && '✏️ '}
                  {tab === 'Roster' && '📅 '}
                  {tab === 'Regularisation Request' && '👤 '}
                  {tab === 'Attendance Punches' && '🎫 '}
                  {tab}
                </div>
              ))}
            </div>

            <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer' }}>🌪️</button>
          </div>
        )}

        {/* 3. WORKSPACE CONTAINER */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ATTENDANCE SECTION */}
          {activeSidebar === 'Attendance' && (
            <>
              {/* SUB TAB 1: OVERVIEW */}
              {activeAttendanceTab === 'Overview' && (
                <>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Overview</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                      <div style={{ color: '#475569', fontWeight: 'bold', marginBottom: '12px', fontSize: '11px' }}>Real time Status (5) 🛈</div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '160px', height: '80px', overflow: 'hidden' }}>
                          <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '18px solid #ef4444', borderTopColor: '#22c55e', transform: 'rotate(-45deg)', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ marginTop: '-30px', textAlign: 'center' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>5</span>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>All Employees</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px', fontSize: '10px', fontWeight: 'bold' }}>
                          <span style={{ color: '#22c55e' }}>● 1 Punched In</span>
                          <span style={{ color: '#ef4444' }}>● 4 Punched Out</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#475569', fontSize: '11px' }}>Off Duty Employees</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                          <input type="text" placeholder="🔍 Search Here" style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '100px' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', color: '#94a3b8', fontSize: '11px' }}>
                        No Data found
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '11px' }}>Attendance Overview</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>Present</option></select>
                          <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Week</option></select>
                          <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '9px' }}>%</button>
                        </div>
                      </div>
                      <div style={{ height: '120px', borderLeft: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                        {['19-10', '20-10', '21-10', '22-10', '23-10', '24-10', '25-10'].map(dt => (
                          <span key={dt} style={{ fontSize: '9px', color: '#64748b' }}>{dt}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '11px' }}>Average Working Hours</span>
                        <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Week</option></select>
                      </div>
                      <div style={{ height: '120px', borderLeft: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                        {['19-10', '20-10', '21-10', '22-10', '23-10', '24-10', '25-10'].map(dt => (
                          <span key={dt} style={{ fontSize: '9px', color: '#64748b' }}>{dt}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employee List (5)</span>
                      <input type="text" placeholder="🔍 Search Employee" value={attendanceSearch} onChange={(e) => setAttendanceSearch(e.target.value)} style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '160px' }} />
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                          <th style={{ padding: '8px' }}>Employee</th>
                          <th style={{ padding: '8px' }}>Punched In</th>
                          <th style={{ padding: '8px' }}>Punched Out</th>
                          <th style={{ padding: '8px' }}>Location</th>
                          <th style={{ padding: '8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.filter(e => e.name.toLowerCase().includes(attendanceSearch.toLowerCase())).map((emp) => (
                          <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '26px', height: '26px', backgroundColor: '#bae6fd', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px' }}>SU</div>
                              <div>
                                <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</div>
                                <div style={{ color: '#94a3b8', fontSize: '9px' }}>{emp.code}</div>
                              </div>
                            </td>
                            <td style={{ padding: '10px 8px' }}>{emp.punchedInTime}</td>
                            <td style={{ padding: '10px 8px' }}>{emp.punchedOutTime}</td>
                            <td style={{ padding: '10px 8px' }}>{emp.location}</td>
                            <td style={{ padding: '10px 8px' }}>
                              <span style={{ backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2', color: emp.isPunchedIn ? '#16a34a' : '#ef4444', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '9px' }}>
                                {emp.isPunchedIn ? 'Punched In' : 'Punched Out'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* SUB TAB 2: SHIFTS */}
              {activeAttendanceTab === 'Shifts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b' }}>Create Shifts</div>
                      <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>Note: When a roster and a shift exist for the same day for the same employee, the roster takes priority.</div>
                    </div>
                    <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>+ Add Shift</button>
                  </div>

                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '10px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Employee</th>
                          <th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map(emp => (
                          <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                            {[1,2,3,4,5,6].map(i => (
                              <td key={i} style={{ padding: '8px' }}>
                                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>default ✕</span>
                              </td>
                            ))}
                            <td style={{ padding: '8px', color: '#94a3b8' }}>Weekly Off</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB TAB 3: ATTENDANCE MUSTER */}
              {activeAttendanceTab === 'Attendance Muster' && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b', marginBottom: '12px' }}>Attendance Muster</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', textAlign: 'center' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '6px', textAlign: 'left' }}>Employee Name</th>
                          {['12 Oct','13 Oct','14 Oct','15 Oct','16 Oct','17 Oct','18 Oct','19 Oct'].map(d => <th key={d}>{d}</th>)}
                          <th style={{ color: '#16a34a' }}>Present</th><th style={{ color: '#ef4444' }}>Absent</th><th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((emp, i) => (
                          <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                            <td>-</td><td>-</td><td>-</td>
                            <td style={{ color: '#16a34a', fontWeight: 'bold' }}>5</td>
                            <td style={{ color: '#ef4444', fontWeight: 'bold' }}>0</td>
                            <td style={{ fontWeight: 'bold' }}>5</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB TAB 4: ROSTER */}
              {activeAttendanceTab === 'Roster' && (
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b', marginBottom: '12px' }}>Rosters</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '9px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Employee</th>
                        {['Thu (01-10)','Fri (02-10)','Sat (03-10)','Sun (04-10)','Mon (05-10)','Tue (06-10)','Wed (07-10)'].map(d => <th key={d}>{d}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(emp => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                          {[1,2,3,4,5,6,7].map(i => (
                            <td key={i} style={{ padding: '8px' }}><div style={{ border: '1px dashed #cbd5e1', height: '22px' }} /></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB TAB 5: REGULARISATION REQUEST */}
              {activeAttendanceTab === 'Regularisation Request' && (
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Regularisation Request (0)</span>
                  <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>No rows</div>
                </div>
              )}

              {/* SUB TAB 6: ATTENDANCE PUNCHES */}
              {activeAttendanceTab === 'Attendance Punches' && (
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Attendance Punches (0)</span>
                  <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>No rows</div>
                </div>
              )}
            </>
          )}

          {/* DASHBOARD SECTION */}
          {activeSidebar === 'Dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Realtime Dashboard</div>
              
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
            </div>
          )}

          {/* FALLBACK FOR OTHER SIDEBAR MODULES */}
          {activeSidebar !== 'Dashboard' && activeSidebar !== 'Attendance' && (
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: 0, color: '#0f172a' }}>{activeSidebar} Module</h3>
              <p style={{ color: '#64748b', marginTop: '8px' }}>Active operational view for trial mode.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
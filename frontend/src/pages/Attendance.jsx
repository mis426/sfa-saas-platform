import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [showLegend, setShowLegend] = useState(true);

  const employees = [
    {
      id: 1,
      name: 'Sample User 2',
      code: '(8290)',
      punchedIn: 'Last Friday at 9:21 AM',
      inFrom: 'NA',
      punchedOut: 'Last Friday at 8:24 PM',
      outFrom: 'NA',
      mode: 'Manual',
      location: 'RaiVihar Ph-2 Colony,Semra,Gorakhpur',
      locTime: 'Last Friday at 8:24 PM',
      isPunchedIn: false
    },
    {
      id: 2,
      name: 'Sample User 1',
      code: '(20)',
      punchedIn: 'Last Friday at 9:47 AM',
      inFrom: 'NA',
      punchedOut: 'Last Friday at 8:11 PM',
      outFrom: 'NA',
      mode: 'Manual',
      location: 'Pitampura,New Delhi',
      locTime: 'Last Friday at 8:11 PM',
      isPunchedIn: false
    },
    {
      id: 3,
      name: 'Sample User 3',
      code: '(PPL15M/058)',
      punchedIn: 'Last Friday at 8:58 AM',
      inFrom: 'NA',
      punchedOut: 'Last Friday at 8:43 PM',
      outFrom: 'NA',
      mode: 'Manual',
      location: 'Q4CJ+5C2, Humnabad, Karnataka 585330, India',
      locTime: 'Last Friday at 8:43 PM',
      isPunchedIn: false
    },
    {
      id: 4,
      name: 'Sample User 5',
      code: '',
      punchedIn: 'Last Friday at 11:46 AM',
      inFrom: 'NA',
      punchedOut: '-',
      outFrom: '-',
      mode: '',
      location: 'Tansen Road,Hazira,Birla Nagar,Gwalior',
      locTime: 'Last Friday at 12:27 PM',
      isPunchedIn: true
    },
    {
      id: 5,
      name: 'Sample User 4',
      code: '(11535)',
      punchedIn: 'Last Friday at 9:08 AM',
      inFrom: 'NA',
      punchedOut: 'Last Friday at 6:16 PM',
      outFrom: 'NA',
      mode: 'Manual',
      location: '6X3J+F42, Kappagal, Karnataka 583103, India',
      locTime: 'Last Friday at 6:16 PM',
      isPunchedIn: false
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '11px', overflow: 'hidden' }}>
      
      {/* 1. LEFT SIDEBAR */}
      <div style={{ width: '180px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px', fontWeight: 'bold', fontSize: '13px', color: '#1e293b', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>U</div>
          Unolo SFA
        </div>

        <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {[
            { name: 'Dashboard', icon: '📊', route: '/dashboard' },
            { name: 'Attendance', icon: '📋', route: '/attendance', active: true },
            { name: 'Leaves', icon: '📅', route: '/dashboard' },
            { name: 'Organization', icon: '👥', route: '/dashboard' },
            { name: 'Tasks', icon: '☑️', route: '/dashboard' },
            { name: 'Targets', icon: '🎯', route: '/dashboard' },
            { name: 'Form', icon: '📝', route: '/dashboard' },
            { name: 'Order', icon: '🛒', route: '/dashboard' },
            { name: 'Expenses', icon: '💳', route: '/dashboard' },
            { name: 'Clients & Sites', icon: '🏢', route: '/dashboard' },
            { name: 'Reports', icon: '📈', route: '/dashboard' },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.route)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                color: item.active ? '#2563eb' : '#64748b',
                backgroundColor: item.active ? '#eff6ff' : 'transparent',
                borderLeft: item.active ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: item.active ? '600' : '400'
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

        {/* SUB-HEADER TABS FOR ATTENDANCE */}
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Overview', 'Shifts', 'Attendance Muster', 'Roster', 'Regularisation Request', 'Attendance Punches'].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                style={{
                  padding: '10px 0',
                  color: activeSubTab === tab ? '#2563eb' : '#64748b',
                  fontWeight: activeSubTab === tab ? 'bold' : 'normal',
                  borderBottom: activeSubTab === tab ? '2px solid #2563eb' : '2px solid transparent',
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

        {/* DYNAMIC CONTENT CONTAINER */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* 1. OVERVIEW SUB TAB */}
          {activeSubTab === 'Overview' && (
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
                        <td style={{ padding: '10px 8px' }}>{emp.punchedIn}</td>
                        <td style={{ padding: '10px 8px' }}>{emp.punchedOut}</td>
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

          {/* 2. SHIFTS SUB TAB */}
          {activeSubTab === 'Shifts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b' }}>Create Shifts</div>
                  <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>Note: When a roster and a shift exist for the same day for the same employee, the roster takes priority.</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px' }}>📤</button>
                  <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px' }}>📥</button>
                  <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>+ Add Shift</button>
                </div>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '6px', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>⚙️</span>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#166534', fontSize: '10px' }}>default</div>
                  <div style={{ color: '#15803d', fontSize: '9px' }}>10:00 AM - 06:00 PM</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Shifts</div>
                    <div style={{ color: '#2563eb', fontSize: '9px' }}>To assign a shift to an employee, drag a shift to a slot</div>
                  </div>
                  <input type="text" placeholder="🔍 Search Here.." style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '160px' }} />
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '10px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Employee</th>
                      <th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <div style={{ width: '22px', height: '22px', backgroundColor: '#bae6fd', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold' }}>SU</div>
                            <div>{emp.name} <span style={{ color: '#94a3b8', fontSize: '8px' }}>{emp.code}</span></div>
                          </div>
                        </td>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d, i) => (
                          <td key={i} style={{ padding: '8px' }}>
                            <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px dashed #bbf7d0', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '9px' }}>default ✕</span>
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

          {/* 3. ATTENDANCE MUSTER SUB TAB */}
          {activeSubTab === 'Attendance Muster' && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b' }}>Attendance Muster</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '10px' }}>📥 Download</button>
                    <input type="text" placeholder="🔍 Search" style={{ padding: '3px 8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '10px', width: '120px' }} />
                    <span style={{ border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>01-10-2026 to 19-10-2026 📅</span>
                    <button onClick={() => setShowLegend(!showLegend)} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>Legend</button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Employee Name</th>
                        {['12 Oct','13 Oct','14 Oct','15 Oct','16 Oct','17 Oct','18 Oct','19 Oct'].map(d => <th key={d} style={{ padding: '6px' }}>{d}</th>)}
                        <th style={{ padding: '6px', color: '#16a34a' }}>Present</th>
                        <th style={{ padding: '6px', color: '#ef4444' }}>Absent</th>
                        <th style={{ padding: '6px' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, i) => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                          <td style={{ padding: '8px', color: '#16a34a', fontWeight: 'bold' }}>P : {i === 0 ? 'A' : '-'}</td>
                          <td style={{ padding: '8px', color: i === 1 ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>{i === 1 ? 'A : -' : 'P : -'}</td>
                          <td style={{ padding: '8px', color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                          <td style={{ padding: '8px', color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                          <td style={{ padding: '8px', color: '#16a34a', fontWeight: 'bold' }}>P : -</td>
                          <td style={{ padding: '8px' }}>-</td>
                          <td style={{ padding: '8px' }}>-</td>
                          <td style={{ padding: '8px' }}>-</td>
                          <td style={{ padding: '8px', color: '#16a34a', fontWeight: 'bold' }}>{i === 0 ? '4.5' : i === 1 ? '4' : '5'}</td>
                          <td style={{ padding: '8px', color: '#ef4444', fontWeight: 'bold' }}>{i === 0 ? '0.5' : i === 1 ? '1' : '0'}</td>
                          <td style={{ padding: '8px', fontWeight: 'bold' }}>5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RIGHT LEGEND SIDEBAR */}
              {showLegend && (
                <div style={{ width: '180px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '12px' }}>
                    <span>Legend</span>
                    <span onClick={() => setShowLegend(false)} style={{ cursor: 'pointer', color: '#94a3b8' }}>✕</span>
                  </div>
                  {[
                    { name: 'Present', tag: 'P', color: '#f0fdf4', text: '#16a34a' },
                    { name: 'Absent', tag: 'A', color: '#fef2f2', text: '#ef4444' },
                    { name: 'Weekly Off', tag: 'WO', color: '#f1f5f9', text: '#64748b' },
                    { name: 'Public Holiday', tag: 'PH', color: '#eff6ff', text: '#2563eb' },
                    { name: 'On Leave', tag: 'L', color: '#fef3c7', text: '#b45309' },
                  ].map(lg => (
                    <div key={lg.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f8fafc' }}>
                      <span style={{ color: '#475569' }}>{lg.name}</span>
                      <span style={{ backgroundColor: lg.color, color: lg.text, padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold' }}>{lg.tag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. ROSTER SUB TAB */}
          {activeSubTab === 'Roster' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1e293b' }}>Create Rosters</div>
                  <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>Note: When a roster and a shift exist for the same day for the same employee, the roster takes priority.</div>
                </div>
                <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>+ Add Roster</button>
              </div>

              <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', padding: '8px 12px', borderRadius: '6px', width: 'fit-content' }}>
                <span style={{ fontWeight: 'bold', color: '#b45309', fontSize: '10px' }}>☀️ Weekly Off</span>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Rosters</span>
                  <input type="text" placeholder="🔍 Search Here.." style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '140px' }} />
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '9px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '6px', textAlign: 'left' }}>Employee</th>
                        {['Thu (01-10)','Fri (02-10)','Sat (03-10)','Sun (04-10)','Mon (05-10)','Tue (06-10)','Wed (07-10)'].map(d => <th key={d} style={{ padding: '6px' }}>{d}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(emp => (
                        <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{emp.name} {emp.code}</td>
                          {[1,2,3,4,5,6,7].map(i => (
                            <td key={i} style={{ padding: '8px' }}>
                              <div style={{ border: '1px dashed #cbd5e1', height: '22px', borderRadius: '4px' }} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. REGULARISATION REQUEST SUB TAB */}
          {activeSubTab === 'Regularisation Request' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#1e293b' }}>Regularisation Request (0)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="text" placeholder="🔍 Search Here.." style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '140px' }} />
                  <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}><option>All</option></select>
                  <span style={{ border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>01-10-2026 to 19-10-2026 📅</span>
                  <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px' }}>📥</button>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px' }}>Employee Name</th>
                    <th style={{ padding: '8px' }}>Date</th>
                    <th style={{ padding: '8px' }}>Session</th>
                    <th style={{ padding: '8px' }}>From</th>
                    <th style={{ padding: '8px' }}>To</th>
                    <th style={{ padding: '8px' }}>Team</th>
                    <th style={{ padding: '8px' }}>Reason</th>
                    <th style={{ padding: '8px' }}>Status</th>
                    <th style={{ padding: '8px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                      No rows
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 6. ATTENDANCE PUNCHES SUB TAB */}
          {activeSubTab === 'Attendance Punches' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#1e293b' }}>Attendance Punches (0)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="text" placeholder="🔍 Search Here.." style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '140px' }} />
                  <span style={{ border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>01/10/2026 - 19/10/2026 📅</span>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '8px' }}>Employee Name</th>
                    <th style={{ padding: '8px' }}>Event Type</th>
                    <th style={{ padding: '8px' }}>Punch Type</th>
                    <th style={{ padding: '8px' }}>Address</th>
                    <th style={{ padding: '8px' }}>Attendance Site Name</th>
                    <th style={{ padding: '8px' }}>Event Occurred At</th>
                    <th style={{ padding: '8px' }}>Date</th>
                    <th style={{ padding: '8px' }}>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
                      No rows
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Attendance;
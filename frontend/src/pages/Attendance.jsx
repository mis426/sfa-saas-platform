import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [attendanceSearch, setAttendanceSearch] = useState('');

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
      location: 'RaiVihar Ph-2 Colony, Semra, Gorakhpur',
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
      location: 'Pitampura, New Delhi',
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
      location: 'Tansen Road, Hazira, Birla Nagar, Gwalior',
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

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
    emp.code.toLowerCase().includes(attendanceSearch.toLowerCase())
  );

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
            <span style={{ color: '#2563eb', fontWeight: '500' }}>clientadmin@acme.com</span>
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
                {tab === 'Attendance Muster' && '📜 '}
                {tab === 'Roster' && '📅 '}
                {tab === 'Regularisation Request' && '📝 '}
                {tab === 'Attendance Punches' && '📍 '}
                {tab}
              </div>
            ))}
          </div>

          <button style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer' }}>🌪️</button>
        </div>

        {/* ATTENDANCE OVERVIEW WORKSPACE CONTENT */}
        {activeSubTab === 'Overview' ? (
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e293b' }}>Overview</div>

            {/* ROW 1: REAL TIME STATUS GAUGE & OFF DUTY EMPLOYEES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Real Time Status */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                <div style={{ color: '#475569', fontWeight: 'bold', marginBottom: '12px', fontSize: '11px' }}>Real time Status (5) 🛈</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

              {/* Off Duty Employees */}
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

            {/* ROW 2: ATTENDANCE OVERVIEW CHART & AVERAGE WORKING HOURS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Attendance Overview Chart Box */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '11px' }}>Attendance Overview</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>Present</option></select>
                    <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Week</option></select>
                    <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '9px', cursor: 'pointer' }}>%</button>
                  </div>
                </div>

                <div style={{ height: '120px', borderLeft: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                  {['19-10', '20-10', '21-10', '22-10', '23-10', '24-10', '25-10'].map(dt => (
                    <span key={dt} style={{ fontSize: '9px', color: '#64748b', marginBottom: '-16px' }}>{dt}</span>
                  ))}
                  <div style={{ position: 'absolute', top: '10px', left: '-25px', fontSize: '8px', color: '#94a3b8' }}>100%</div>
                  <div style={{ position: 'absolute', top: '50px', left: '-20px', fontSize: '8px', color: '#94a3b8' }}>50%</div>
                  <div style={{ position: 'absolute', top: '90px', left: '-15px', fontSize: '8px', color: '#94a3b8' }}>0%</div>
                </div>
              </div>

              {/* Average Working Hours Chart Box */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '11px' }}>Average Working Hours</span>
                  <select style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>This Week</option></select>
                </div>

                <div style={{ height: '120px', borderLeft: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                  {['19-10', '20-10', '21-10', '22-10', '23-10', '24-10', '25-10'].map(dt => (
                    <span key={dt} style={{ fontSize: '9px', color: '#64748b', marginBottom: '-16px' }}>{dt}</span>
                  ))}
                  <div style={{ position: 'absolute', top: '10px', left: '-15px', fontSize: '8px', color: '#94a3b8' }}>4</div>
                  <div style={{ position: 'absolute', top: '40px', left: '-15px', fontSize: '8px', color: '#94a3b8' }}>3</div>
                  <div style={{ position: 'absolute', top: '70px', left: '-15px', fontSize: '8px', color: '#94a3b8' }}>2</div>
                  <div style={{ position: 'absolute', top: '100px', left: '-15px', fontSize: '8px', color: '#94a3b8' }}>0</div>
                </div>
              </div>

            </div>

            {/* ROW 3: EMPLOYEE LIST (5) GRID TABLE */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '12px' }}>Employee List (5)</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search Employee"
                    value={attendanceSearch}
                    onChange={(e) => setAttendanceSearch(e.target.value)}
                    style={{ padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px', width: '160px' }}
                  />
                  <select style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '10px' }}><option>All</option></select>
                </div>
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
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {/* Employee Info */}
                      <td style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '26px', height: '26px', backgroundColor: '#bae6fd', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '9px' }}>SU</div>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{emp.name}</div>
                          <div style={{ color: '#94a3b8', fontSize: '9px' }}>{emp.code}</div>
                        </div>
                      </td>

                      {/* Punched In */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ color: '#0f172a', fontWeight: '500' }}>{emp.punchedIn}</div>
                        <div style={{ color: '#94a3b8', fontSize: '9px' }}>From: {emp.inFrom}</div>
                      </td>

                      {/* Punched Out */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ color: '#0f172a', fontWeight: '500' }}>{emp.punchedOut}</div>
                        {emp.mode && (
                          <div style={{ marginTop: '2px' }}>
                            <span style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', color: '#b45309', padding: '1px 5px', borderRadius: '3px', fontSize: '8px', fontWeight: 'bold' }}>{emp.mode}</span>
                          </div>
                        )}
                      </td>

                      {/* Location */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ color: '#334155' }}>{emp.location}</div>
                        <div style={{ color: '#94a3b8', fontSize: '8px' }}>{emp.locTime}</div>
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{
                          backgroundColor: emp.isPunchedIn ? '#f0fdf4' : '#fef2f2',
                          color: emp.isPunchedIn ? '#16a34a' : '#ef4444',
                          border: `1px solid ${emp.isPunchedIn ? '#bbf7d0' : '#fecaca'}`,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          fontSize: '9px'
                        }}>
                          {emp.isPunchedIn ? 'Punched In' : 'Punched Out'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* OTHER ATTENDANCE SUB TABS */
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
            <h3 style={{ margin: 0, color: '#0f172a' }}>{activeSubTab} Sub-Module</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Operational view for trial mode.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Attendance;
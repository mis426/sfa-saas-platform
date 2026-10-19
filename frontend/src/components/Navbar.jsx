import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Hide global navbar on dashboard page to prevent double top bar
  if (location.pathname === '/dashboard') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <div style={{ height: '42px', backgroundColor: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px' }}>SaaS Enterprise</span>
        <span style={{ backgroundColor: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontSize: '10px' }}>🎯 SFA Hub</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user && <span>👤 <strong>{user.email}</strong> ({user.role})</span>}
        <Link to="/settings" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>⚙️ Settings</Link>
        <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;